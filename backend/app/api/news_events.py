from fastapi import APIRouter, Depends
from typing import List, Dict, Any
from app.api.deps import get_store, DataStore

router = APIRouter(prefix="", tags=["Tech News, Events & Notifications"])

@router.get("/news")
async def get_tech_news(store: DataStore = Depends(get_store)):
    return store.tech_news

@router.get("/events")
async def get_career_events(store: DataStore = Depends(get_store)):
    return store.events

@router.get("/notifications")
async def get_notifications(store: DataStore = Depends(get_store)):
    return store.user.get("notifications", [])

@router.post("/notifications/read")
async def mark_notifications_read(store: DataStore = Depends(get_store)):
    for notif in store.user.get("notifications", []):
        notif["read"] = True
    return {"success": True, "message": "All notifications marked as read."}
