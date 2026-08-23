from pydantic import BaseModel
from typing import List, Optional

class ProjectMilestoneSchema(BaseModel):
    id: str
    week: Optional[int] = 1
    title: str
    description: Optional[str] = None
    deliverable: Optional[str] = None
    dayTarget: Optional[int] = 7
    completed: bool = False
    deliverables: Optional[List[str]] = []

class ProjectItemSchema(BaseModel):
    id: str
    title: str
    stage: Optional[int] = 2
    stageNumber: Optional[int] = 2
    tier: Optional[str] = "Tier 2"
    difficulty: Optional[str] = "Intermediate"
    durationWeeks: Optional[int] = 3
    estimatedDays: Optional[int] = 21
    description: str
    skills: Optional[List[str]] = []
    requirements: Optional[List[str]] = []
    expectedOutcome: Optional[str] = None
    techStack: List[str] = []
    status: str = "not_started" # not_started | in_progress | completed
    progressPercentage: int = 0
    milestones: List[ProjectMilestoneSchema] = []
    repoUrl: Optional[str] = None
    liveDemoUrl: Optional[str] = None
