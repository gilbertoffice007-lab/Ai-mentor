from fastapi import APIRouter, Depends
from app.schemas.mentor import MentorChatRequest, MentorChatResponse, ResumeReviewRequest, ResumeReviewResponse
from app.api.deps import get_store, DataStore
from app.services.gemini_ai import ask_mentor_ai, review_resume_ai

router = APIRouter(prefix="/mentor", tags=["24/7 AI Career Mentor & ATS Evaluator"])

@router.post("/chat", response_model=MentorChatResponse)
async def chat_with_mentor(req: MentorChatRequest, store: DataStore = Depends(get_store)):
    response = await ask_mentor_ai(req.message, store.user)
    return response

@router.post("/review-resume", response_model=ResumeReviewResponse)
async def review_resume(req: ResumeReviewRequest, store: DataStore = Depends(get_store)):
    target_role = req.targetRole or store.user.get("careerTitle", "Full Stack Developer")
    resume_payload = req.resume or store.resume
    review = await review_resume_ai(resume_payload, target_role)
    return review
