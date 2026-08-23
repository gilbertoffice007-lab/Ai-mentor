from fastapi import APIRouter, Depends
from typing import Dict, Any
from app.config import settings
from app.api.deps import get_store, DataStore

router = APIRouter(prefix="/supabase", tags=["Cloud Synchronization"])

@router.get("/status")
async def get_status():
    has_supabase = bool(settings.SUPABASE_URL and settings.SUPABASE_ANON_KEY)
    return {
        "configured": has_supabase,
        "connected": True,
        "message": "Python FastAPI backend active with persistent state storage." if not has_supabase else "Supabase cloud client active.",
        "url": settings.SUPABASE_URL or "Local SQLite / FastAPI State Store"
    }

@router.post("/sync/push")
async def sync_push(payload: Dict[str, Any], store: DataStore = Depends(get_store)):
    if "user" in payload:
        store.user.update(payload["user"])
    if "tasks" in payload:
        store.tasks = payload["tasks"]
    if "resume" in payload:
        store.resume = payload["resume"]
    if "devProfile" in payload:
        store.dev_profile = payload["devProfile"]
    return {"success": True, "message": "State pushed successfully to backend."}

@router.get("/sync/pull")
async def sync_pull(store: DataStore = Depends(get_store)):
    return {
        "user": store.user,
        "tasks": store.tasks,
        "resume": store.resume,
        "devProfile": store.dev_profile,
        "projects": store.projects,
        "internships": store.internships,
        "jobs": store.jobs
    }
