from fastapi import APIRouter, Depends
from app.schemas.roadmap import RoadmapResponseSchema
from app.api.deps import get_store, DataStore

router = APIRouter(prefix="/roadmap", tags=["Adaptive Roadmap"])

@router.get("", response_model=RoadmapResponseSchema)
async def get_roadmap(store: DataStore = Depends(get_store)):
    return {
        "careerTitle": store.user.get("careerTitle", "Full Stack Developer"),
        "currentStage": store.user.get("currentStage", 2),
        "overallProgress": store.user.get("overallProgress", 72),
        "stages": store.stages
    }
