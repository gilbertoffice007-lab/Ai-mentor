from pydantic import BaseModel
from typing import List, Optional

class RoadmapSkillSchema(BaseModel):
    id: str
    name: str
    category: str
    status: str = "locked" # locked | in_progress | completed
    level: str = "Intermediate"

class RoadmapTaskItemSchema(BaseModel):
    id: str
    title: str
    description: Optional[str] = None
    durationMinutes: Optional[int] = 60
    estimatedHours: Optional[int] = 1
    completed: bool = False
    resourceLink: Optional[str] = None
    module: Optional[str] = None
    type: Optional[str] = "exercise"

class RoadmapStageSchema(BaseModel):
    id: int
    stageNumber: int
    title: str = ""
    subtitle: Optional[str] = None
    description: str
    estimatedDuration: Optional[str] = "4 Weeks"
    durationWeeks: Optional[int] = 4
    progressPercentage: Optional[int] = 0
    completionPercentage: Optional[int] = 0
    status: Optional[str] = "locked" # locked | in_progress | completed
    isLocked: Optional[bool] = False
    isCurrent: Optional[bool] = False
    skillsCovered: List[str] = []
    skills: List[RoadmapSkillSchema] = []
    tasks: List[RoadmapTaskItemSchema] = []
    requiredProject: Optional[str] = None
    keyTopics: List[str] = []
    projects: List[str] = []
    features: List[str] = []

class RoadmapResponseSchema(BaseModel):
    careerTitle: str
    currentStage: int
    overallProgress: int
    stages: List[RoadmapStageSchema]
