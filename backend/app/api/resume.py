from fastapi import APIRouter, Depends
from app.schemas.resume import ResumeDataSchema
from app.api.deps import get_store, DataStore

router = APIRouter(prefix="/resume", tags=["Resume & ATS Builder"])

@router.get("", response_model=ResumeDataSchema)
async def get_resume(store: DataStore = Depends(get_store)):
    return store.resume

@router.put("", response_model=ResumeDataSchema)
async def update_resume(resume_data: ResumeDataSchema, store: DataStore = Depends(get_store)):
    store.resume = resume_data.model_dump()
    return store.resume
