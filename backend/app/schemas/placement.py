from pydantic import BaseModel
from typing import List, Optional, Any

class PlacementTestCase(BaseModel):
    input: str
    output: str

class PlacementQuestionSchema(BaseModel):
    id: str
    category: str # Aptitude | DSA | Technical | HR
    subCategory: Optional[str] = None
    title: str
    difficulty: str # Easy | Medium | Hard
    companies: List[str] = []
    description: Optional[str] = None
    question: Optional[str] = None
    codeTemplate: Optional[str] = None
    options: Optional[List[str]] = None
    correctAnswer: Optional[int] = None
    explanation: Optional[str] = None
    codeSnippet: Optional[str] = None
    starterCode: Optional[str] = None
    testCases: Optional[List[PlacementTestCase]] = None
    completed: Optional[bool] = False

class CodeSubmitRequest(BaseModel):
    questionId: str
    code: str
    language: Optional[str] = "python"

class CodeEvaluationResult(BaseModel):
    success: bool
    passed: bool
    testResults: List[dict]
    runtimeMs: float
    memoryMb: float
    stdout: Optional[str] = None
    error: Optional[str] = None
