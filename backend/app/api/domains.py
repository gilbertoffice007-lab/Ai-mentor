from fastapi import APIRouter, Depends, HTTPException
from typing import List
from app.schemas.domain_career import DomainCategorySchema, CareerPathSchema, CareerSelectRequest
from app.api.deps import get_store, DataStore
import time

router = APIRouter(prefix="", tags=["Domains & Career Pathways"])

@router.get("/domains", response_model=List[DomainCategorySchema])
async def get_domains(store: DataStore = Depends(get_store)):
    return store.domains

@router.get("/domains/{domain_id}", response_model=DomainCategorySchema)
async def get_domain(domain_id: str, store: DataStore = Depends(get_store)):
    for domain in store.domains:
        if domain["id"] == domain_id:
            return domain
    if store.domains:
        return store.domains[0]
    raise HTTPException(status_code=404, detail="Domain not found")

@router.get("/careers", response_model=List[CareerPathSchema])
async def get_all_careers(store: DataStore = Depends(get_store)):
    all_careers = []
    for d in store.domains:
        all_careers.extend(d.get("careers", []))
    return all_careers

@router.post("/career/select")
async def select_career(req: CareerSelectRequest, store: DataStore = Depends(get_store)):
    store.user["domainId"] = req.domainId
    store.user["careerId"] = req.careerId
    store.user["careerTitle"] = req.careerTitle
    
    store.user.setdefault("notifications", []).insert(0, {
        "id": f"notif-{int(time.time()*1000)}",
        "title": "Career Pathway Selected 🎯",
        "message": f"You are actively pursuing the '{req.careerTitle}' roadmap.",
        "type": "system",
        "date": "Just now",
        "read": False
    })
    return {"success": True, "user": store.user}
