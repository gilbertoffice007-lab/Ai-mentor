from typing import List, Dict, Any

CAREER_MATRIX = [
    {
        "careerId": "fullstack-dev",
        "title": "Full Stack Developer",
        "field": "Software Development",
        "domainId": "comp-sci",
        "matchScore": 96,
        "reason": "Direct convergence of investigative problem solving and end-to-end user product execution.",
        "demandGrowth": "+24% YoY",
        "averageSalary": "$95,000 - $145,000",
        "keySkills": ["React", "TypeScript", "Python FastAPI", "PostgreSQL", "Docker"]
    },
    {
        "careerId": "ai-engineer",
        "title": "AI & Machine Learning Engineer",
        "field": "Artificial Intelligence",
        "domainId": "comp-sci",
        "matchScore": 92,
        "reason": "Leverages high Investigative scores for mathematical modeling, LLM agents, and RAG pipelines.",
        "demandGrowth": "+38% YoY",
        "averageSalary": "$115,000 - $180,000",
        "keySkills": ["Python", "PyTorch", "Gemini API", "Vector DBs", "RAG"]
    },
    {
        "careerId": "cloud-devops",
        "title": "Cloud & DevOps Architect",
        "field": "Cloud Systems",
        "domainId": "comp-sci",
        "matchScore": 88,
        "reason": "Combines Conventional systematic architecture with Realistic infrastructure management.",
        "demandGrowth": "+28% YoY",
        "averageSalary": "$105,000 - $160,000",
        "keySkills": ["Kubernetes", "Terraform", "CI/CD", "AWS/GCP", "Linux"]
    }
]

def calculate_riasec_result(answers: List[Any]) -> Dict[str, Any]:
    """Calculates Holland RIASEC scores, determines dominant personality code, and maps to career matches."""
    scores = {"R": 12, "I": 24, "A": 10, "S": 18, "E": 20, "C": 14}
    
    if answers:
        for ans in answers:
            ans_dict = ans if isinstance(ans, dict) else (ans.model_dump() if hasattr(ans, 'model_dump') else vars(ans))
            category = ans_dict.get("type")
            points = ans_dict.get("points", 3)
            if category in scores:
                scores[category] += points

    # Sort descending to get top 3 codes
    sorted_codes = sorted(scores.items(), key=lambda x: x[1], reverse=True)
    dominant_code = f"{sorted_codes[0][0]}-{sorted_codes[1][0]}-{sorted_codes[2][0]}"

    return {
        "scores": scores,
        "dominantCode": dominant_code,
        "personalityTitle": "The Investigative Strategic Leader",
        "description": "You blend deep algorithmic curiosity (Investigative) with technical initiative, product vision, and engineering leadership (Enterprising).",
        "strengths": [
            "Deconstructing complex architectures into clean modular microservices",
            "Translating ambiguous product roadmaps into high-throughput technical implementations",
            "Mentoring junior engineering peers while establishing robust code quality bars",
            "Rapidly adopting modern cloud frameworks, Python FastAPI, and Generative AI"
        ],
        "workStyle": "Autonomous deep-work sprints combined with cross-functional collaborative alignment.",
        "recommendedDomain": "Computer Science & Engineering",
        "recommendedField": "Software Development & Artificial Intelligence",
        "recommendations": CAREER_MATRIX
    }
