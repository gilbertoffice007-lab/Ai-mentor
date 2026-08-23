from pydantic import BaseModel
from typing import List, Optional

class BadgeSchema(BaseModel):
    id: str
    name: str
    icon: str
    description: str
    unlockedAt: str

class TopSkillSchema(BaseModel):
    name: str
    level: int

class ActivityHeatmapSchema(BaseModel):
    date: str
    count: int

class DeveloperStatsSchema(BaseModel):
    tasksCompleted: int
    hoursLearned: int
    streakDays: int
    projectsFinished: int

class DeveloperProfileSchema(BaseModel):
    username: str
    fullName: str
    avatarUrl: str
    title: str
    bio: str
    careerGoal: str
    location: str
    githubHandle: str
    linkedinHandle: str
    website: str
    education: str
    badges: List[BadgeSchema] = []
    topSkills: List[TopSkillSchema] = []
    pinnedProjects: List[str] = []
    activityHeatmap: List[ActivityHeatmapSchema] = []
    certifications: List[str] = []
    stats: DeveloperStatsSchema
