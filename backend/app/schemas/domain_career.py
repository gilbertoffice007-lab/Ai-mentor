from pydantic import BaseModel
from typing import List, Optional, Tuple

class CareerPathSchema(BaseModel):
    id: str
    title: str
    field: str
    domainId: str
    description: str
    skillsRequired: List[str] = []
    learningDuration: str = "6 Months"
    averageDifficulty: str = "Intermediate"
    growthRate: str = "+24% YoY"
    avgSalary: str = "$95,000 - $145,000"
    typicalProjects: List[str] = []
    internshipRoles: List[str] = []
    jobRoles: List[str] = []
    recommendedEducation: str = "B.Tech / B.S. in CS or related"
    color: str = "#3b82f6"

class DomainCategorySchema(BaseModel):
    id: str
    name: str
    icon: str
    description: str
    color: str
    popularCareers: List[str] = []
    requiredSkills: List[str] = []
    careerGrowth: str = "+22%"
    difficulty: str = "Moderate"
    educationRequirement: str = "Bachelor's Degree"
    careers: List[CareerPathSchema] = []

class CareerSelectRequest(BaseModel):
    domainId: str
    careerId: str
    careerTitle: str
