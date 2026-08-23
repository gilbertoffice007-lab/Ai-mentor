from pydantic import BaseModel
from typing import List, Optional, Dict, Any

class MentorChatRequest(BaseModel):
    message: str
    context: Optional[Dict[str, Any]] = None

class MentorChatResponse(BaseModel):
    reply: str
    suggestions: List[str] = []
    timestamp: str
    actionLink: Optional[Dict[str, str]] = None

class ResumeReviewRequest(BaseModel):
    resume: Optional[Dict[str, Any]] = None
    targetRole: Optional[str] = "Full Stack Developer"

class ResumeReviewResponse(BaseModel):
    feedback: str
    atsScore: int
    strengths: List[str]
    improvementTips: List[str]
