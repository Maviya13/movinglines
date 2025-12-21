from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import ChatPromptTemplate
from langchain.schema.output_parser import StrOutputParser
import re
import logging

from app.config import get_settings
from app.prompts.manim_prompt import MANIM_SYSTEM_PROMPT
from app.prompts.enhancement_prompt import ENHANCEMENT_SYSTEM_PROMPT
from app.prompts.repair_prompt import REPAIR_SYSTEM_PROMPT
from app.services.pinecone_service import get_relevant_examples, format_examples_for_context

logger = logging.getLogger(__name__)
settings = get_settings()

MANIM_USER_PROMPT = """Create a Manim animation for: {user_prompt}

REQUIREMENTS:
1. Output ONLY Python code - no markdown, no explanations
2. Class must be named `GeneratedScene`
3. Title at TOP, content BELOW (no overlaps!)
4. Use modern Manim CE syntax (no deprecated functions)
5. Keep animation between 10-30 seconds total
6. Choose correct Scene type: Scene (2D), ThreeDScene (3D), MovingCameraScene (camera control)

Begin with `from manim import *` immediately:"""



def get_llm():
    return ChatGoogleGenerativeAI(
        model="gemini-2.0-flash-exp",
        google_api_key=settings.google_api_key,
        temperature=0.7
    )


def extract_code(text: str) -> str:
    """Extract Python code from LLM response."""
    # Try to find Python code blocks first
    code_match = re.search(r'```python\n(.*?)```', text, re.DOTALL)
    if code_match:
        return code_match.group(1).strip()
    
    # Try generic code blocks
    code_match = re.search(r'```\n(.*?)```', text, re.DOTALL)
    if code_match:
        return code_match.group(1).strip()
    
    # If no code blocks found, try to extract the code section
    # Look for lines starting with 'from manim import' or 'class GeneratedScene'
    lines = text.split('\n')
    code_lines = []
    in_code = False
    
    for line in lines:
        if line.strip().startswith('from ') or line.strip().startswith('class GeneratedScene'):
            in_code = True
        if in_code:
            code_lines.append(line)
    
    if code_lines:
        return '\n'.join(code_lines).strip()
    
    # Fallback to entire text
    return text.strip()


async def enhance_user_prompt(user_prompt: str) -> str:
    """Enhance user prompt to be more suitable for Manim generation."""
    try:
        llm = get_llm()
        
        prompt = ChatPromptTemplate.from_messages([
            ("system", ENHANCEMENT_SYSTEM_PROMPT),
            ("human", "{user_prompt}")
        ])
        
        chain = prompt | llm | StrOutputParser()
        
        enhanced_prompt = await chain.ainvoke({"user_prompt": user_prompt})
        logger.info(f"[LLM] Enhanced prompt: {enhanced_prompt[:100]}...")
        return enhanced_prompt.strip()
    except Exception as e:
        logger.error(f"[LLM] Error enhancing prompt: {e}")
        # Fallback to original prompt if enhancement fails
        return user_prompt


async def repair_manim_script(code: str, error_log: str) -> str:
    """Repair broken Manim code using the LLM."""
    try:
        logger.info(f"[LLM] Attempting to repair script based on error:\n{error_log[:200]}...")
        llm = get_llm()
        
        prompt = ChatPromptTemplate.from_messages([
            ("system", REPAIR_SYSTEM_PROMPT),
            ("human", "CODE:\n{code}\n\nERROR:\n{error_log}")
        ])
        
        chain = prompt | llm | StrOutputParser()
        
        repaired_code = await chain.ainvoke({"code": code, "error_log": error_log})
        return extract_code(repaired_code)
    except Exception as e:
        logger.error(f"[LLM] Error repairing script: {e}")
        # If repair fails, return original code to avoid downstream crashes (though it will likely fail again)
        return code


async def generate_manim_script(user_prompt: str) -> str:
    """Generate Manim script from user prompt using RAG."""
    logger.info(f"[LLM] Generating script for: {user_prompt[:100]}...")
    
    # Step 1: Enhance the prompt
    enhanced_prompt_text = await enhance_user_prompt(user_prompt)
    
    # Step 2: Retrieve relevant examples from Pinecone
    logger.info("[LLM] Querying Pinecone for relevant examples...")
    examples = await get_relevant_examples(enhanced_prompt_text, top_k=5)
    context = format_examples_for_context(examples)
    logger.info(f"[LLM] Retrieved {len(examples)} examples for context")
    
    # Step 3: Build the prompt with context
    llm = get_llm()
    
    system_prompt_with_context = MANIM_SYSTEM_PROMPT.format(context=context)
    user_prompt_formatted = MANIM_USER_PROMPT.format(user_prompt=enhanced_prompt_text)
    
    prompt = ChatPromptTemplate.from_messages([
        ("system", system_prompt_with_context),
        ("human", user_prompt_formatted)
    ])
    
    # Step 4: Generate the script
    chain = prompt | llm | StrOutputParser()
    
    logger.info("[LLM] Calling Gemini...")
    result = await chain.ainvoke({})
    
    code = extract_code(result)
    logger.info(f"[LLM] Generated {len(code)} characters of code")
    
    return code

