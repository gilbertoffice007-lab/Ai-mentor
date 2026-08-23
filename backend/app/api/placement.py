from fastapi import APIRouter, Depends
from typing import List
from app.schemas.placement import PlacementQuestionSchema, CodeSubmitRequest, CodeEvaluationResult
from app.api.deps import get_store, DataStore
from app.services.code_executor import evaluate_python_dsa_code

router = APIRouter(prefix="/placement", tags=["Placement Preparation & Coding Sandbox"])

@router.get("/questions", response_model=List[PlacementQuestionSchema])
async def get_placement_questions(store: DataStore = Depends(get_store)):
    return store.placement_questions

@router.post("/submit-code", response_model=CodeEvaluationResult)
async def submit_placement_code(req: CodeSubmitRequest, store: DataStore = Depends(get_store)):
    result = evaluate_python_dsa_code(req.code)
    if result.get("passed"):
        store.user["xpPoints"] += 200
        for q in store.placement_questions:
            if q["id"] == req.questionId:
                q["completed"] = True
    return result
