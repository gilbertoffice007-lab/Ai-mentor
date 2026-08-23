from fastapi import APIRouter, Depends, HTTPException
from app.schemas.user import UserProfileSchema, LoginRequest, RegisterRequest, UpdateProfileRequest
from app.api.deps import get_store, DataStore

router = APIRouter(prefix="/auth", tags=["Authentication & Profile"])

@router.get("/profile", response_model=UserProfileSchema)
async def get_profile(store: DataStore = Depends(get_store)):
    return store.user

@router.post("/login")
async def login(req: LoginRequest, store: DataStore = Depends(get_store)):
    store.user["email"] = req.email
    return {"success": True, "user": store.user}

@router.post("/register")
async def register(req: RegisterRequest, store: DataStore = Depends(get_store)):
    store.user["fullName"] = req.fullName
    store.user["email"] = req.email
    if req.educationLevel:
        store.user["educationLevel"] = req.educationLevel
    if req.currentYear:
        store.user["currentYear"] = req.currentYear
    if req.country:
        store.user["country"] = req.country
    if req.phone:
        store.user["phone"] = req.phone
    return {"success": True, "user": store.user, "redirect": "/personality-test"}

@router.put("/profile", response_model=UserProfileSchema)
async def update_profile(req: UpdateProfileRequest, store: DataStore = Depends(get_store)):
    updates = req.model_dump(exclude_unset=True)
    store.user.update(updates)
    return store.user
