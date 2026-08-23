from fastapi import APIRouter, Depends, HTTPException
from typing import List
from app.schemas.project import ProjectItemSchema
from app.api.deps import get_store, DataStore
import time

router = APIRouter(prefix="/projects", tags=["Real-World Projects"])

@router.get("", response_model=List[ProjectItemSchema])
async def get_projects(store: DataStore = Depends(get_store)):
    return store.projects

@router.get("/{project_id}", response_model=ProjectItemSchema)
async def get_project(project_id: str, store: DataStore = Depends(get_store)):
    for p in store.projects:
        if p["id"] == project_id:
            return p
    if store.projects:
        return store.projects[0]
    raise HTTPException(status_code=404, detail="Project not found")

@router.post("/{project_id}/start")
async def start_project(project_id: str, store: DataStore = Depends(get_store)):
    for p in store.projects:
        if p["id"] == project_id:
            p["status"] = "in_progress"
            store.user.setdefault("notifications", []).insert(0, {
                "id": f"notif-{int(time.time()*1000)}",
                "title": "Project Started 🚀",
                "message": f"You started building '{p['title']}'. Complete milestones for verified XP!",
                "type": "milestone",
                "date": "Just now",
                "read": False
            })
            return {"success": True, "project": p}
    raise HTTPException(status_code=404, detail="Project not found")

@router.post("/{project_id}/milestones/{milestone_id}/complete")
async def complete_milestone(project_id: str, milestone_id: str, store: DataStore = Depends(get_store)):
    for p in store.projects:
        if p["id"] == project_id:
            for m in p.get("milestones", []):
                if m["id"] == milestone_id:
                    m["completed"] = True
                    completed_count = sum(1 for ms in p["milestones"] if ms.get("completed"))
                    p["progressPercentage"] = round((completed_count / len(p["milestones"])) * 100)
                    if p["progressPercentage"] == 100:
                        p["status"] = "completed"
                        store.user["xpPoints"] += 500
                        store.user.setdefault("notifications", []).insert(0, {
                            "id": f"notif-{int(time.time()*1000)}",
                            "title": "Project Completed! 🏆",
                            "message": f"Congratulations on shipping '{p['title']}'! 500 XP awarded.",
                            "type": "milestone",
                            "date": "Just now",
                            "read": False
                        })
                    return {"success": True, "project": p}
    raise HTTPException(status_code=404, detail="Milestone or project not found")
