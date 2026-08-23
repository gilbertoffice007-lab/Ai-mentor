from fastapi import APIRouter, Depends
from typing import List
from app.schemas.personality import RIASECQuestionSchema, CompleteAssessmentRequest
from app.schemas.user import PersonalityResultSchema
from app.api.deps import get_store, DataStore
from app.services.riasec_calculator import calculate_riasec_result

router = APIRouter(prefix="/personality", tags=["Psychometric Assessment"])

@router.get("/questions", response_model=List[RIASECQuestionSchema])
async def get_questions(store: DataStore = Depends(get_store)):
    return store.riasec_questions

@router.post("/complete")
async def complete_assessment(req: CompleteAssessmentRequest, store: DataStore = Depends(get_store)):
    result = calculate_riasec_result(req.answers or [])
    store.user["riasecResult"] = result
    return {"success": True, "result": result}

@router.get("/result")
async def get_result(store: DataStore = Depends(get_store)):
    return store.user.get("riasecResult")
