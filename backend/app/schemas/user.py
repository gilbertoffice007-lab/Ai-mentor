from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any

class RIASECScoreSchema(BaseModel):
    R: int = 0
    I: int = 0
    A: int = 0
    S: int = 0
    E: int = 0
    C: int = 0

class CareerRecommendationSchema(BaseModel):
    careerId: str
    title: str
    field: str
    domainId: str
    matchScore: int
    reason: str
    demandGrowth: str
    averageSalary: str
    keySkills: List[str]

class PersonalityResultSchema(BaseModel):
    scores: RIASECScoreSchema
    dominantCode: str
    personalityTitle: str
    description: str
    strengths: List[str]
    workStyle: str
    recommendedDomain: str
    recommendedField: str
    recommendations: List[CareerRecommendationSchema]

class NotificationSchema(BaseModel):
    id: str
    title: str
    message: str
    type: str = "system" # task | milestone | event | job | system
    date: str = "Just now"
    read: bool = False

class UserProfileSchema(BaseModel):
    id: str
    fullName: str
    email: str
    educationLevel: str
    currentYear: str
    country: str
    phone: Optional[str] = None
    domainId: str
    careerId: str
    careerTitle: str
    currentStage: int
    overallProgress: int
    totalHoursLearned: int
    currentStreakDays: int
    xpPoints: int
    semesterName: str
    semesterStartDate: str
    semesterEndDate: str
    availableHoursPerDay: float
    availableDaysPerWeek: int
    skillLevel: str
    riasecResult: Optional[PersonalityResultSchema] = None
    notifications: List[NotificationSchema] = []

class LoginRequest(BaseModel):
    email: str
    password: Optional[str] = None

class RegisterRequest(BaseModel):
    fullName: str
    email: str
    educationLevel: Optional[str] = "Undergraduate B.Tech CS"
    currentYear: Optional[str] = "3rd Year (Semester 5)"
    country: Optional[str] = "United States"
    phone: Optional[str] = None

class UpdateProfileRequest(BaseModel):
    fullName: Optional[str] = None
    email: Optional[str] = None
    educationLevel: Optional[str] = None
    currentYear: Optional[str] = None
    country: Optional[str] = None
    phone: Optional[str] = None
    semesterName: Optional[str] = None
    availableHoursPerDay: Optional[float] = None
    availableDaysPerWeek: Optional[int] = None
    skillLevel: Optional[str] = None
