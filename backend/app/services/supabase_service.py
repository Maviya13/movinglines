import os
import uuid
import jwt
from datetime import datetime
from fastapi import HTTPException, Header
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

_supabase_client: Client = None

def get_supabase() -> Client:
    global _supabase_client
    if _supabase_client is None:
        url = os.getenv("SUPABASE_URL")
        key = os.getenv("SUPABASE_SERVICE_ROLE_KEY") or os.getenv("SUPABASE_KEY") or os.getenv("SUPABASE_ANON_KEY")
        print(f"[Supabase] URL: {url[:30] if url else None}...")
        print(f"[Supabase] Using key starting with: {key[:5] if key else None}...") # Log key prefix for debugging
        if url and key:
            _supabase_client = create_client(url, key)
        else:
            raise ValueError("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or ANON_KEY) must be set")
    return _supabase_client

async def get_current_user(authorization: str = Header(None)) -> str:
    """Extract and validate user from JWT token."""
    if not authorization:
        raise HTTPException(status_code=401, detail="Authorization header required")
    
    try:
        token = authorization.replace("Bearer ", "")
        # Decode JWT without verification to get user_id (Supabase handles auth)
        payload = jwt.decode(token, options={"verify_signature": False})
        user_id = payload.get("sub")
        if user_id:
            return user_id
        raise HTTPException(status_code=401, detail="Invalid token")
    except jwt.DecodeError as e:
        raise HTTPException(status_code=401, detail=f"Invalid token format")
    except Exception as e:
        print(f"Auth error: {e}")
        raise HTTPException(status_code=401, detail=f"Invalid token: {str(e)}")

async def ensure_user_exists(user_id: str) -> None:
    """Ensure user exists in public.users table, creating if necessary."""
    client = get_supabase()
    
    try:
        # Check if user exists
        result = client.table("users").select("id").eq("id", user_id).execute()
        
        if not result.data:
            # User doesn't exist, get email from auth.users
            auth_user = client.auth.admin.get_user_by_id(user_id)
            email = auth_user.user.email if auth_user and auth_user.user else f"{user_id}@unknown.com"
            
            # Create user record
            client.table("users").insert({
                "id": user_id,
                "email": email,
                "created_at": datetime.utcnow().isoformat(),
                "updated_at": datetime.utcnow().isoformat()
            }).execute()
            
            print(f"[Supabase] Created user record for {user_id} ({email})")
    except Exception as e:
        print(f"[Supabase] Error ensuring user exists: {e}")
        # Continue anyway - the error will surface on video insert if user still doesn't exist


async def upload_video(video_path: str, user_id: str, prompt: str) -> str:
    """Upload video to Supabase storage and save metadata."""
    client = get_supabase()
    bucket = os.getenv("SUPABASE_BUCKET", "manim-videos")
    
    # Ensure user exists in public.users
    await ensure_user_exists(user_id)
    
    video_id = str(uuid.uuid4())
    file_name = f"{user_id}/{video_id}.mp4"
    
    # Upload to storage
    with open(video_path, "rb") as f:
        client.storage.from_(bucket).upload(
            file_name,
            f,
            {"content-type": "video/mp4"}
        )
    
    # Get public URL
    video_url = client.storage.from_(bucket).get_public_url(file_name)
    
    # Save metadata to database
    client.table("videos").insert({
        "id": video_id,
        "user_id": user_id,
        "prompt": prompt,
        "video_url": video_url,
        "bucket_path": file_name,
        "created_at": datetime.utcnow().isoformat()
    }).execute()
    
    return video_url

def create_chat_in_db(user_id: str, title: str) -> str:
    """Create a new chat session."""
    client = get_supabase()
    chat_id = str(uuid.uuid4())
    
    client.table("chats").insert({
        "id": chat_id,
        "user_id": user_id,
        "title": title,
        "created_at": datetime.utcnow().isoformat(),
        "updated_at": datetime.utcnow().isoformat()
    }).execute()
    
    return chat_id

def get_user_chats_from_db(user_id: str):
    """Get all chats for a user."""
    client = get_supabase()
    result = client.table("chats").select("*").eq("user_id", user_id).order("created_at", desc=True).execute()
    return result.data

def delete_chat_from_db(chat_id: str, user_id: str) -> bool:
    """Delete a chat session and its associated tasks."""
    client = get_supabase()
    
    # Verify ownership
    chat = client.table("chats").select("*").eq("id", chat_id).eq("user_id", user_id).single().execute()
    
    if not chat.data:
        raise HTTPException(status_code=404, detail="Chat not found")
    
    # Delete chat
    client.table("chats").delete().eq("id", chat_id).execute()
    
    return True

def get_chat_tasks_from_db(chat_id: str, user_id: str):
    """Get all tasks for a specific chat."""
    client = get_supabase()
    
    # Verify ownership
    chat = client.table("chats").select("id").eq("id", chat_id).eq("user_id", user_id).single().execute()
    if not chat.data:
        raise HTTPException(status_code=404, detail="Chat not found")

    # Fetch tasks
    result = client.table("tasks").select("*").eq("chat_id", chat_id).order("created_at", desc=True).execute()
    return result.data

async def get_user_videos(user_id: str) -> list:
    """Get all videos for a user."""
    client = get_supabase()
    
    print(f"[Supabase] Fetching videos for User ID: {user_id}")
    
    response = client.table("videos").select("*").eq("user_id", user_id).order("created_at", desc=True).execute()
    
    print(f"[Supabase] Found {len(response.data)} videos")
    return response.data

async def delete_video(video_id: str, user_id: str) -> bool:
    """Delete a video from storage and database."""
    client = get_supabase()
    bucket = os.getenv("SUPABASE_BUCKET", "manim-videos")
    
    # Verify ownership
    video = client.table("videos").select("*").eq("id", video_id).eq("user_id", user_id).single().execute()
    
    if not video.data:
        raise HTTPException(status_code=404, detail="Video not found")
    
    # Delete from storage
    file_name = f"{user_id}/{video_id}.mp4"
    client.storage.from_(bucket).remove([file_name])
    
    # Delete from database
    client.table("videos").delete().eq("id", video_id).execute()
    
    return True
