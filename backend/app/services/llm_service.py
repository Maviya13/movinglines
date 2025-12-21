from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import ChatPromptTemplate
from langchain.schema.output_parser import StrOutputParser
import re
import logging

from app.config import get_settings
from app.prompts.manim_prompt import MANIM_SYSTEM_PROMPT, MANIM_USER_PROMPT
from app.services.pinecone_service import get_relevant_examples, format_examples_for_context

logger = logging.getLogger(__name__)
settings = get_settings()


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


async def generate_manim_script(user_prompt: str) -> str:
    """Generate Manim script from user prompt using RAG."""
    logger.info(f"[LLM] Generating script for: {user_prompt[:100]}...")
    
    # Step 1: Retrieve relevant examples from Pinecone
    logger.info("[LLM] Querying Pinecone for relevant examples...")
    examples = await get_relevant_examples(user_prompt, top_k=5)
    context = format_examples_for_context(examples)
    logger.info(f"[LLM] Retrieved {len(examples)} examples for context")
    
    # Step 2: Build the prompt with context
    llm = get_llm()
    
    system_prompt_with_context = MANIM_SYSTEM_PROMPT.format(context=context)
    user_prompt_formatted = MANIM_USER_PROMPT.format(user_prompt=user_prompt)
    
    prompt = ChatPromptTemplate.from_messages([
        ("system", system_prompt_with_context),
        ("human", user_prompt_formatted)
    ])
    
    # Step 3: Generate the script
    chain = prompt | llm | StrOutputParser()
    
    logger.info("[LLM] Calling Gemini...")
    result = await chain.ainvoke({})
    
    code = extract_code(result)
    logger.info(f"[LLM] Generated {len(code)} characters of code")
    
    return code

