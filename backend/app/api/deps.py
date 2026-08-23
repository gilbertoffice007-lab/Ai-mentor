import json
from typing import Dict, Any, List
from app.seed.seed_data import (
    DOMAINS, RIASEC_QUESTIONS, SAMPLE_ROADMAP_STAGES, SAMPLE_DAILY_TASKS,
    SAMPLE_PROJECTS, SAMPLE_TECH_NEWS, SAMPLE_EVENTS, SAMPLE_INTERNSHIPS,
    SAMPLE_JOBS, SAMPLE_PLACEMENT_QUESTIONS, DEFAULT_USER, DEFAULT_RESUME, DEFAULT_DEV_PROFILE
)

# In-memory fast store synchronized with DB/Seed
class DataStore:
    def __init__(self):
        self.user: Dict[str, Any] = dict(DEFAULT_USER)
        self.domains: List[Dict[str, Any]] = list(DOMAINS)
        self.riasec_questions: List[Dict[str, Any]] = list(RIASEC_QUESTIONS)
        self.stages: List[Dict[str, Any]] = list(SAMPLE_ROADMAP_STAGES)
        self.tasks: List[Dict[str, Any]] = list(SAMPLE_DAILY_TASKS)
        self.projects: List[Dict[str, Any]] = list(SAMPLE_PROJECTS)
        self.tech_news: List[Dict[str, Any]] = list(SAMPLE_TECH_NEWS)
        self.events: List[Dict[str, Any]] = list(SAMPLE_EVENTS)
        self.internships: List[Dict[str, Any]] = list(SAMPLE_INTERNSHIPS)
        self.jobs: List[Dict[str, Any]] = list(SAMPLE_JOBS)
        self.placement_questions: List[Dict[str, Any]] = list(SAMPLE_PLACEMENT_QUESTIONS)
        self.resume: Dict[str, Any] = dict(DEFAULT_RESUME)
        self.dev_profile: Dict[str, Any] = dict(DEFAULT_DEV_PROFILE)

    def reset_to_defaults(self):
        self.__init__()

data_store = DataStore()

def get_store() -> DataStore:
    return data_store
