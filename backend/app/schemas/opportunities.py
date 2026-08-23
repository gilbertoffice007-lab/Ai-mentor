from pydantic import BaseModel
from typing import List, Optional

class InternshipItemSchema(BaseModel):
    id: str
    company: str
    companyLogo: Optional[str] = None
    role: str
    logo: Optional[str] = None
    domainId: Optional[str] = None
    location: str
    isRemote: Optional[bool] = False
    duration: str
    stipend: str
    deadline: Optional[str] = None
    skillsRequired: List[str] = []
    requiredSkills: List[str] = []
    eligibility: Optional[str] = None
    description: str
    matchScore: int = 90
    status: Optional[str] = "none" # applied | saved | none

class JobListingSchema(BaseModel):
    id: str
    company: str
    companyLogo: Optional[str] = None
    title: Optional[str] = None
    position: Optional[str] = None
    location: str
    jobType: Optional[str] = "Full-time"
    experience: Optional[str] = "0-2 Years"
    salary: Optional[str] = "$110,000 - $145,000"
    salaryRange: Optional[str] = None
    skills: List[str] = []
    skillsRequired: List[str] = []
    matchScore: int = 90
    description: str
    responsibilities: List[str] = []
    requirements: List[str] = []
    postedDaysAgo: Optional[int] = 2
    status: Optional[str] = "none" # applied | saved | interviewing | none
