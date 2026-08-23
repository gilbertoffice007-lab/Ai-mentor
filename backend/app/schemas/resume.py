from pydantic import BaseModel
from typing import List, Optional

class ResumePersonalInfoSchema(BaseModel):
    fullName: str
    email: str
    phone: str
    location: str
    linkedin: Optional[str] = ""
    github: Optional[str] = ""
    portfolio: Optional[str] = ""

class ResumeEducationSchema(BaseModel):
    institution: str
    degree: str
    field: str
    startYear: str
    endYear: str
    grade: Optional[str] = ""

class ResumeSkillCategorySchema(BaseModel):
    category: str
    items: List[str]

class ResumeExperienceSchema(BaseModel):
    title: str
    company: str
    location: str
    startDate: str
    endDate: str
    current: bool = False
    description: List[str]

class ResumeProjectSchema(BaseModel):
    name: str
    techStack: str
    description: str
    link: Optional[str] = None

class ResumeCertificationSchema(BaseModel):
    name: str
    issuer: str
    date: str
    credentialUrl: Optional[str] = ""

class ResumeDataSchema(BaseModel):
    personalInfo: ResumePersonalInfoSchema
    summary: str
    education: List[ResumeEducationSchema] = []
    skills: List[ResumeSkillCategorySchema] = []
    experience: List[ResumeExperienceSchema] = []
    projects: List[ResumeProjectSchema] = []
    certifications: Optional[List[ResumeCertificationSchema]] = []
    achievements: Optional[List[str]] = []
    templateId: Optional[str] = "modern-tech"
