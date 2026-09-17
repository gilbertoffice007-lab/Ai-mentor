import math
from typing import List, Dict, Any

CAREER_WEIGHTED_PROFILES = [
    {
        "careerId": "data-scientist",
        "title": "Data Scientist & Analytics Architect",
        "field": "Data Science & Analytics",
        "domainId": "comp-sci",
        "weights": {"R": 20, "I": 98, "A": 30, "S": 30, "E": 45, "C": 90},
        "demandGrowth": "+36% YoY",
        "averageSalary": "$110,000 - $165,000",
        "keySkills": ["Python", "Statistics", "SQL", "Machine Learning", "Data Visualization"],
        "whyMatches": [
            "Strong Investigative interest aligns with deep statistical problem-solving",
            "High Conventional precision fits systematic dataset analysis",
            "High interest in mathematical inquiry and data pattern extraction"
        ],
        "typicalWorkActivities": ["Data modeling", "Machine learning inference", "Statistical dashboards"]
    },
    {
        "careerId": "fullstack-dev",
        "title": "Software Developer / Full Stack Engineer",
        "field": "Software Engineering",
        "domainId": "comp-sci",
        "weights": {"R": 35, "I": 90, "A": 55, "S": 35, "E": 40, "C": 75},
        "demandGrowth": "+25% YoY",
        "averageSalary": "$105,000 - $155,000",
        "keySkills": ["TypeScript", "React", "Python FastAPI", "PostgreSQL", "Docker"],
        "whyMatches": [
            "Strong Investigative logic fits algorithmic architecture and debugging",
            "Artistic interest enables intuitive UI/UX interface creation",
            "Conventional discipline ensures clean codebase structure and testing"
        ],
        "typicalWorkActivities": ["Building cloud services", "Full-stack web applications", "API design"]
    },
    {
        "careerId": "mechanical-eng",
        "title": "Mechanical & Robotics Engineer",
        "field": "Mechanical Engineering",
        "domainId": "engineering",
        "weights": {"R": 95, "I": 85, "A": 35, "S": 30, "E": 50, "C": 65},
        "demandGrowth": "+18% YoY",
        "averageSalary": "$90,000 - $140,000",
        "keySkills": ["SolidWorks CAD", "Mechatronics", "Thermodynamics", "Prototyping", "Robotics"],
        "whyMatches": [
            "High Realistic preference for tools, machines, and physical prototypes",
            "Strong Investigative inquiry for engineering simulations",
            "Direct satisfaction in building tangible real-world hardware"
        ],
        "typicalWorkActivities": ["CAD modeling", "CNC prototyping", "Thermal & stress testing"]
    },
    {
        "careerId": "ui-ux-designer",
        "title": "UI/UX & Product Experience Designer",
        "field": "Digital Product Design",
        "domainId": "design",
        "weights": {"R": 20, "I": 45, "A": 98, "S": 65, "E": 50, "C": 35},
        "demandGrowth": "+22% YoY",
        "averageSalary": "$95,000 - $145,000",
        "keySkills": ["Figma", "User Research", "Design Systems", "Prototyping", "Micro-Interactions"],
        "whyMatches": [
            "High Artistic expression for visual design and digital interfaces",
            "Social empathy for user research and intuitive human experience",
            "Creative freedom to envision innovative digital solutions"
        ],
        "typicalWorkActivities": ["Interactive prototyping", "Design systems", "User testing interviews"]
    },
    {
        "careerId": "ai-engineer",
        "title": "AI & Machine Learning Engineer",
        "field": "Artificial Intelligence",
        "domainId": "comp-sci",
        "weights": {"R": 30, "I": 96, "A": 45, "S": 25, "E": 45, "C": 80},
        "demandGrowth": "+42% YoY",
        "averageSalary": "$120,000 - $190,000",
        "keySkills": ["Python", "PyTorch", "Gemini API", "Vector DBs", "RAG Pipelines"],
        "whyMatches": [
            "High Investigative focus on advanced neural network architectures",
            "Structured Conventional alignment for clean inference deployments",
            "Strong interest in cutting-edge technology internals"
        ],
        "typicalWorkActivities": ["Training LLM models", "Deploying GPU endpoints", "Agent orchestration"]
    },
    {
        "careerId": "tech-entrepreneur",
        "title": "Tech Founder & Venture Builder",
        "field": "Entrepreneurship",
        "domainId": "business",
        "weights": {"R": 45, "I": 50, "A": 60, "S": 70, "E": 98, "C": 50},
        "demandGrowth": "+28% YoY",
        "averageSalary": "$80,000 - $250,000+",
        "keySkills": ["Venture Strategy", "Product Vision", "Team Leadership", "Pitching", "Negotiation"],
        "whyMatches": [
            "High Enterprising drive for decisive leadership and new venture creation",
            "Social influence for pitching, fundraising, and team recruiting",
            "Calculated risk-taking in high-impact technology sectors"
        ],
        "typicalWorkActivities": ["Fundraising pitches", "Product discovery", "Strategic partnerships"]
    },
    {
        "careerId": "accountant-auditor",
        "title": "Financial Systems Auditor & Accountant",
        "field": "Finance & Accounting",
        "domainId": "finance",
        "weights": {"R": 15, "I": 60, "A": 20, "S": 30, "E": 45, "C": 98},
        "demandGrowth": "+12% YoY",
        "averageSalary": "$80,000 - $130,000",
        "keySkills": ["Financial Audits", "GAAP Compliance", "Tax Systems", "Data Analysis", "Excel ERP"],
        "whyMatches": [
            "High Conventional preference for accuracy, records, and structured protocols",
            "Meticulous attention to small details and error checking",
            "Dependable governance of enterprise compliance and cash flow"
        ],
        "typicalWorkActivities": ["Financial auditing", "Balance sheet reconciliation", "Tax optimization"]
    }
]

CATEGORY_NAMES = {
    "R": "Realistic",
    "I": "Investigative",
    "A": "Artistic",
    "S": "Social",
    "E": "Enterprising",
    "C": "Conventional"
}

def calculate_riasec_result(answers: List[Any]) -> Dict[str, Any]:
    """Calculates Holland RIASEC scores using raw points (8-40) and percentage formula: ((rawScore - 8) / 32) * 100."""
    raw_scores = {"R": 31, "I": 37, "A": 22, "S": 27, "E": 25, "C": 35}

    if answers:
        raw_scores = {"R": 0, "I": 0, "A": 0, "S": 0, "E": 0, "C": 0}
        for ans in answers:
            ans_dict = ans if isinstance(ans, dict) else (ans.model_dump() if hasattr(ans, 'model_dump') else vars(ans))
            category = ans_dict.get("type") or "I"
            points = int(ans_dict.get("points", 3))
            if category in raw_scores:
                raw_scores[category] += points

        # Minimum clamp to 8 points per category
        for k in raw_scores:
            if raw_scores[k] < 8:
                raw_scores[k] = 8

    # Calculate percentage: ((rawScore - 8) / 32) * 100
    scores = {
        k: max(0, min(100, round(((raw_scores[k] - 8) / 32.0) * 100)))
        for k in raw_scores
    }

    # Sort descending to determine dominant code
    sorted_categories = sorted(scores.keys(), key=lambda k: (scores[k], raw_scores[k]), reverse=True)
    dominant_code = f"{sorted_categories[0]}{sorted_categories[1]}{sorted_categories[2]}"
    primary_interest = CATEGORY_NAMES[sorted_categories[0]]
    secondary_interest = CATEGORY_NAMES[sorted_categories[1]]
    tertiary_interest = CATEGORY_NAMES[sorted_categories[2]]

    # Multi-dimensional similarity matching against weighted career profiles
    recommendations = []
    for career in CAREER_WEIGHTED_PROFILES:
        cw = career["weights"]
        dist = math.sqrt(
            (scores["R"] - cw["R"])**2 +
            (scores["I"] - cw["I"])**2 +
            (scores["A"] - cw["A"])**2 +
            (scores["S"] - cw["S"])**2 +
            (scores["E"] - cw["E"])**2 +
            (scores["C"] - cw["C"])**2
        )
        max_dist = 245.0
        raw_sim = max(0.0, 1.0 - (dist / (max_dist * 0.72)))
        match_score = round(raw_sim * 100)
        
        # Primary category bonus
        top_career_keys = sorted(cw.keys(), key=lambda k: cw[k], reverse=True)
        if top_career_keys[0] == sorted_categories[0]:
            match_score += 4
        if top_career_keys[1] == sorted_categories[1]:
            match_score += 2

        match_score = min(98, max(45, match_score))

        recommendations.append({
            "careerId": career["careerId"],
            "title": career["title"],
            "field": career["field"],
            "domainId": career["domainId"],
            "matchScore": match_score,
            "reason": career["whyMatches"][0] if career.get("whyMatches") else f"Strong alignment with {primary_interest} interests.",
            "demandGrowth": career["demandGrowth"],
            "averageSalary": career["averageSalary"],
            "keySkills": career["keySkills"],
            "whyMatches": career.get("whyMatches", []),
            "typicalWorkActivities": career.get("typicalWorkActivities", [])
        })

    recommendations.sort(key=lambda x: x["matchScore"], reverse=True)

    return {
        "scores": scores,
        "rawScores": raw_scores,
        "dominantCode": dominant_code,
        "primaryInterest": primary_interest,
        "secondaryInterest": secondary_interest,
        "tertiaryInterest": tertiary_interest,
        "personalityTitle": f"The {primary_interest} {secondary_interest} Specialist",
        "description": f"Your answers reveal strong natural interests in {primary_interest.lower()} exploration and {secondary_interest.lower()} environments, complemented by {tertiary_interest.lower()} activities.",
        "strengths": [
            f"Strong aptitude in {primary_interest.lower()} problem-solving",
            f"High alignment with {secondary_interest.lower()} organizational workflows",
            f"Versatile collaboration across multidisciplinary technical environments"
        ],
        "workStyle": f"Deep analytical focus ({primary_interest}) combined with structured execution ({secondary_interest}).",
        "recommendedDomain": recommendations[0]["domainId"] if recommendations else "comp-sci",
        "recommendedField": recommendations[0]["field"] if recommendations else "Software Development",
        "recommendations": recommendations[:6]
    }
