# CareerPath AI Mentor — Python FastAPI Backend

An end-to-end, production-grade backend service powering the **CareerPath AI Mentor** platform. Built with **Python 3.11+**, **FastAPI**, **Pydantic v2**, **SQLAlchemy**, and the **Google GenAI SDK**.

---

## 🛠️ Architecture & Features

- **⚡ Fast Async REST API**: High-throughput FastAPI endpoints with automatic OpenAPI v3 interactive Swagger documentation (`/docs`) and ReDoc (`/redoc`).
- **🤖 24/7 AI Career Mentor & ATS Evaluator**: Integrated with Google Gemini 2.5 Flash for contextual mentorship prompts, career stage coaching, and deep ATS resume audits.
- **🧠 Psychometric RIASEC Engine**: Holland Code scoring algorithm mapping student personality profiles to matching software engineering and tech careers.
- **📅 Semester Rebalancing Algorithm**: Adaptive study load redistribution when students miss daily tasks or face exam schedules.
- **💻 Algorithmic Coding Sandbox**: Python execution and test-case evaluator for campus placement preparation.
- **🗄️ Flexible Data Persistence**: Zero-configuration asynchronous SQLite out of the box with drop-in support for PostgreSQL and Supabase.
- **🧪 Automated Pytest Suite**: Full test coverage for authentication, personality assessment, tasks, and core services.

---

## 🚀 Quick Start (Local)

### 1. Prerequisites
- Python 3.10+ installed
- Pip or Virtualenv

### 2. Setup Virtual Environment
```bash
cd backend
python3 -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 3. Configure Environment
```bash
cp .env.example .env
# Edit .env and optionally supply your GEMINI_API_KEY
```

### 4. Run the Backend
```bash
python run.py
```
Or directly via Uvicorn:
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

- **API Base URL**: `http://localhost:8000`
- **Interactive Swagger Docs**: `http://localhost:8000/docs`
- **ReDoc Documentation**: `http://localhost:8000/redoc`

---

## 🐳 Docker Deployment

### Run with Docker Compose
```bash
docker-compose up --build
```

---

## 🧪 Running Tests

```bash
pytest
```

---

## 📡 API Endpoints Overview

| Category | Method | Endpoint | Description |
| :--- | :--- | :--- | :--- |
| **Auth & Profile** | `GET` | `/api/auth/profile` | Retrieve student profile & semester stats |
| | `PUT` | `/api/auth/profile` | Update profile, goal hours & skill level |
| **Personality** | `GET` | `/api/personality/questions` | Get RIASEC psychometric questions |
| | `POST` | `/api/personality/complete` | Submit assessment & calculate dominant code |
| **Roadmaps** | `GET` | `/api/roadmap` | Get 4-stage adaptive learning curriculum |
| **Tasks** | `GET` | `/api/tasks/today` | Fetch daily queue with XP rewards |
| | `POST` | `/api/tasks/{id}/complete` | Mark task completed and claim XP |
| | `POST` | `/api/tasks/reschedule` | Rebalance curriculum across remaining weeks |
| **Projects** | `GET` | `/api/projects` | Get tier-graded real-world projects |
| | `POST` | `/api/projects/{id}/start` | Start project repository track |
| | `POST` | `/api/projects/{id}/milestones/{mid}/complete` | Check off milestone deliverable |
| **Resume & ATS** | `GET` | `/api/resume` | Fetch ATS-structured resume data |
| | `PUT` | `/api/resume` | Save resume modifications & achievements |
| **AI Mentor** | `POST` | `/api/mentor/chat` | 24/7 contextual career coaching via Gemini |
| | `POST` | `/api/mentor/review-resume` | ATS scoring & actionable suggestions |
| **Placement** | `GET` | `/api/placement/questions` | Campus placement & DSA questions |
| | `POST` | `/api/placement/submit-code` | Sandboxed Python code evaluation |
| **Opportunities** | `GET` | `/api/internships` | Curated student internship listings |
| | `GET` | `/api/jobs` | Verified new-grad tech roles |
