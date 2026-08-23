from pydantic import BaseModel
from typing import List, Optional
from app.schemas.user import PersonalityResultSchema, RIASECScoreSchema, CareerRecommendationSchema

class RIASECOptionSchema(BaseModel):
    label: Optional[str] = None
    description: Optional[str] = None
    text: Optional[str] = None
    type: str # R | I | A | S | E | C
    points: int = 3

class RIASECQuestionSchema(BaseModel):
    id: int
    question: str
    scenario: Optional[str] = None
    category: Optional[str] = None
    type: Optional[str] = None
    options: List[RIASECOptionSchema] = []

class AssessmentAnswer(BaseModel):
    id: int
    type: str
    points: int = 3

class CompleteAssessmentRequest(BaseModel):
    answers: Optional[List[AssessmentAnswer]] = None
