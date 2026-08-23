from fastapi import APIRouter, Depends, HTTPException
from app.schemas.daily_task import DailyTasksResponse, DailyTaskSchema, RescheduleRequest
from app.api.deps import get_store, DataStore
from app.services.scheduler import rebalance_student_curriculum
import datetime
import time

router = APIRouter(prefix="/tasks", tags=["Daily Goals & Tasks"])

@router.get("/today", response_model=DailyTasksResponse)
async def get_today_tasks(store: DataStore = Depends(get_store)):
    return {
        "date": datetime.date.today().isoformat(),
        "stageId": store.user.get("currentStage", 2),
        "dayNumber": 17,
        "goalTitle": "Master React Performance & Cloud Architecture",
        "tasks": store.tasks
    }

@router.post("/{task_id}/complete")
async def complete_task(task_id: str, store: DataStore = Depends(get_store)):
    for task in store.tasks:
        if task["id"] == task_id:
            task["status"] = "completed"
            store.user["xpPoints"] += task.get("xpReward", 100)
            store.user["totalHoursLearned"] += max(1, round(task.get("estimatedMinutes", 60) / 60))
            store.user["overallProgress"] = min(100, store.user.get("overallProgress", 72) + 2)
            return {"success": True, "task": task, "user": store.user}
    raise HTTPException(status_code=404, detail="Task not found")

@router.post("/{task_id}/skip")
async def skip_task(task_id: str, store: DataStore = Depends(get_store)):
    for task in store.tasks:
        if task["id"] == task_id:
            task["status"] = "skipped"
            return {"success": True, "task": task}
    raise HTTPException(status_code=404, detail="Task not found")

@router.post("/reschedule")
async def reschedule_tasks(req: RescheduleRequest, store: DataStore = Depends(get_store)):
    rebalanced = rebalance_student_curriculum(store.tasks, req.missedDaysCount, req.remainingWeeks)
    store.tasks = rebalanced
    store.user.setdefault("notifications", []).insert(0, {
        "id": f"notif-{int(time.time()*1000)}",
        "title": "Coursework Readjusted ⚡",
        "message": f"Re-balanced study tasks across your remaining {req.remainingWeeks} semester weeks.",
        "type": "system",
        "date": "Just now",
        "read": False
    })
    return {"success": True, "tasks": store.tasks}
