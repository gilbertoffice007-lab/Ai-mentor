from fastapi import APIRouter, Depends
from typing import Dict, Any
from app.schemas.dev_profile import DeveloperProfileSchema
from app.api.deps import get_store, DataStore

router = APIRouter(prefix="/developer-profile", tags=["Public Developer Profile"])

@router.get("", response_model=DeveloperProfileSchema)
async def get_developer_profile(store: DataStore = Depends(get_store)):
    return store.dev_profile

@router.put("", response_model=DeveloperProfileSchema)
async def update_developer_profile(profile_data: Dict[str, Any], store: DataStore = Depends(get_store)):
    store.dev_profile.update(profile_data)
    return store.dev_profile
