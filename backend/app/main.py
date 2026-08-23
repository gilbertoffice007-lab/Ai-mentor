from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from app.config import settings
from app.api import api_router
from app.database import engine, Base

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Initializes database schema and warm caches on startup."""
    print("=" * 60)
    print(f"🚀 {settings.APP_NAME} Initializing...")
    print(f"⚙️  Environment: {settings.APP_ENV} | Debug: {settings.DEBUG}")
    print(f"🗄️  Database: {settings.DATABASE_URL.split('///')[-1]}")
    print("=" * 60)
    
    # Create DB tables if needed
    try:
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
        print("✅ Database tables verified and ready.")
    except Exception as e:
        print(f"⚠️  Database initialization note: {e}")
        
    yield
    
    print("🛑 Shutting down CareerPath AI Mentor backend gracefully.")

app = FastAPI(
    title=settings.APP_NAME,
    description="End-to-End AI-Powered Career Mentorship Platform API built with Python, FastAPI, SQLAlchemy, and Google GenAI SDK.",
    version="2.5.0",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
    lifespan=lifespan
)

# CORS Middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include main unified API router
app.include_router(api_router)

@app.get("/", tags=["Health"])
async def root():
    return {
        "name": settings.APP_NAME,
        "version": "2.5.0",
        "status": "healthy",
        "docs": "/docs",
        "redoc": "/redoc"
    }

@app.get("/api/health", tags=["Health"])
async def health_check():
    return {
        "status": "ok",
        "service": settings.APP_NAME,
        "env": settings.APP_ENV
    }

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={
            "error": "Internal Server Error",
            "message": str(exc),
            "path": request.url.path
        }
    )
