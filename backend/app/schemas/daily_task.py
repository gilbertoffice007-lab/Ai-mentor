from pydantic import BaseModel
from typing import List, Optional

class DailyTaskSchema(BaseModel):
    id: str
    date: Optional[str] = None
    stageId: Optional[int] = 2
    dayNumber: Optional[int] = 17
    goalTitle: Optional[str] = None
    title: str
    category: Optional[str] = "coding"
    description: Optional[str] = ""
    estimatedMinutes: int = 45
    difficulty: str = "Medium" # Easy | Medium | Hard
    resourceLink: Optional[str] = None
    videoLink: Optional[str] = None
    docLink: Optional[str] = None
    status: str = "pending" # pending | in_progress | completed | skipped
    skillTag: Optional[str] = None
    xpReward: int = 100

class DailyTasksResponse(BaseModel):
    date: str
    stageId: int
    dayNumber: int
    goalTitle: str
    tasks: List[DailyTaskSchema]

class RescheduleRequest(BaseModel):
    missedDaysCount: int = 2
    remainingWeeks: int = 8
