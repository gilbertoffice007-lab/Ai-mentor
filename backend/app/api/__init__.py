from fastapi import APIRouter
from app.api.auth import router as auth_router
from app.api.personality import router as personality_router
from app.api.domains import router as domains_router
from app.api.roadmap import router as roadmap_router
from app.api.tasks import router as tasks_router
from app.api.projects import router as projects_router
from app.api.resume import router as resume_router
from app.api.dev_profile import router as dev_profile_router
from app.api.opportunities import router as opportunities_router
from app.api.placement import router as placement_router
from app.api.news_events import router as news_events_router
from app.api.analytics import router as analytics_router
from app.api.mentor import router as mentor_router
from app.api.supabase_sync import router as supabase_sync_router

api_router = APIRouter(prefix="/api")

api_router.include_router(auth_router)
api_router.include_router(personality_router)
api_router.include_router(domains_router)
api_router.include_router(roadmap_router)
api_router.include_router(tasks_router)
api_router.include_router(projects_router)
api_router.include_router(resume_router)
api_router.include_router(dev_profile_router)
api_router.include_router(opportunities_router)
api_router.include_router(placement_router)
api_router.include_router(news_events_router)
api_router.include_router(analytics_router)
api_router.include_router(mentor_router)
api_router.include_router(supabase_sync_router)
