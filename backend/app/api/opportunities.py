from fastapi import APIRouter, Depends, HTTPException
from typing import List
from app.schemas.opportunities import InternshipItemSchema, JobListingSchema
from app.api.deps import get_store, DataStore
import time

router = APIRouter(prefix="", tags=["Internships & Jobs"])

@router.get("/internships", response_model=List[InternshipItemSchema])
async def get_internships(store: DataStore = Depends(get_store)):
    return store.internships

@router.post("/internships/{item_id}/apply")
async def apply_internship(item_id: str, store: DataStore = Depends(get_store)):
    for item in store.internships:
        if item["id"] == item_id:
            item["status"] = "applied"
            store.user.setdefault("notifications", []).insert(0, {
                "id": f"notif-{int(time.time()*1000)}",
                "title": "Internship Application Sent 📤",
                "message": f"Applied for '{item['role']}' at {item['company']}. Developer profile attached.",
                "type": "job",
                "date": "Just now",
                "read": False
            })
            return {"success": True, "internship": item}
    raise HTTPException(status_code=404, detail="Internship not found")

@router.post("/internships/{item_id}/save")
async def save_internship(item_id: str, store: DataStore = Depends(get_store)):
    for item in store.internships:
        if item["id"] == item_id:
            item["status"] = "saved"
            return {"success": True, "internship": item}
    raise HTTPException(status_code=404, detail="Internship not found")

@router.get("/jobs", response_model=List[JobListingSchema])
async def get_jobs(store: DataStore = Depends(get_store)):
    return store.jobs

@router.post("/jobs/{item_id}/apply")
async def apply_job(item_id: str, store: DataStore = Depends(get_store)):
    for item in store.jobs:
        if item["id"] == item_id:
            item["status"] = "applied"
            job_title = item.get("title") or item.get("position") or "Software Engineer"
            store.user.setdefault("notifications", []).insert(0, {
                "id": f"notif-{int(time.time()*1000)}",
                "title": "Job Application Dispatched 💼",
                "message": f"Applied for '{job_title}' at {item['company']}.",
                "type": "job",
                "date": "Just now",
                "read": False
            })
            return {"success": True, "job": item}
    raise HTTPException(status_code=404, detail="Job not found")

@router.post("/jobs/{item_id}/save")
async def save_job(item_id: str, store: DataStore = Depends(get_store)):
    for item in store.jobs:
        if item["id"] == item_id:
            item["status"] = "saved"
            return {"success": True, "job": item}
    raise HTTPException(status_code=404, detail="Job not found")
