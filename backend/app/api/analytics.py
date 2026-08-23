from fastapi import APIRouter, Depends
from typing import Dict, Any
from app.api.deps import get_store, DataStore

router = APIRouter(prefix="/analytics", tags=["Performance Analytics"])

@router.get("/dashboard")
async def get_dashboard_analytics(store: DataStore = Depends(get_store)):
    user = store.user
    return {
        "overallProgress": user.get("overallProgress", 72),
        "weeklyLearningHours": [
            {"day": "Mon", "hours": 2.5},
            {"day": "Tue", "hours": 3.0},
            {"day": "Wed", "hours": 2.0},
            {"day": "Thu", "hours": 3.5},
            {"day": "Fri", "hours": 1.5},
            {"day": "Sat", "hours": 4.5},
            {"day": "Sun", "hours": 2.0}
        ],
        "skillProficiencies": [
            {"subject": "React & Frontend", "A": 90, "fullMark": 100},
            {"subject": "Python & FastAPI", "A": 88, "fullMark": 100},
            {"subject": "Databases & SQL", "A": 84, "fullMark": 100},
            {"subject": "Algorithms & DSA", "A": 78, "fullMark": 100},
            {"subject": "Cloud & DevOps", "A": 80, "fullMark": 100}
        ],
        "taskStats": {
            "completedThisWeek": 16,
            "totalHours": user.get("totalHoursLearned", 148),
            "streak": user.get("currentStreakDays", 14),
            "xp": user.get("xpPoints", 2450)
        }
    }
