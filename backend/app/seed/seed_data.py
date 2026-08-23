"""
Seed data repository for CareerPath AI Mentor Python backend.
Contains rich domain definitions, RIASEC assessment questions, daily tasks, stages, internships, and jobs.
"""

DOMAINS = [
    {
        "id": "comp-sci",
        "name": "Computer Science & Engineering",
        "icon": "Code2",
        "description": "Architect scalable distributed backends, silky reactive client experiences, machine learning workflows, and robust cloud infrastructure.",
        "color": "#3b82f6",
        "popularCareers": ["Full Stack Developer", "AI & Machine Learning Engineer", "Cloud & DevOps Architect", "Data Scientist"],
        "requiredSkills": ["Python", "TypeScript", "React", "FastAPI", "PostgreSQL", "Docker", "Algorithms"],
        "careerGrowth": "+24% YoY",
        "difficulty": "Challenging",
        "educationRequirement": "B.Tech / B.S. in Computer Science or Software Engineering",
        "careers": [
            {
                "id": "fullstack-dev",
                "title": "Full Stack Developer",
                "field": "Software Development",
                "domainId": "comp-sci",
                "description": "Master end-to-end web engineering from component architecture to async API microservices and database clustering.",
                "skillsRequired": ["React 19", "TypeScript", "FastAPI / Node.js", "PostgreSQL", "Tailwind CSS", "Docker", "REST & GraphQL"],
                "learningDuration": "6 Months (4 Stages)",
                "averageDifficulty": "Intermediate",
                "growthRate": "+24% YoY",
                "avgSalary": "$95,000 - $145,000",
                "typicalProjects": ["Full Stack SaaS Platform", "Collaborative Real-Time Workspace", "AI Developer Agent"],
                "internshipRoles": ["Software Engineering Intern", "Full Stack Intern", "Frontend Intern"],
                "jobRoles": ["Junior Software Engineer", "Full Stack Engineer", "Web Applications Developer"],
                "recommendedEducation": "B.Tech / B.S. in CS or related technical degree",
                "color": "#3b82f6"
            },
            {
                "id": "ai-engineer",
                "title": "AI & Machine Learning Engineer",
                "field": "Artificial Intelligence",
                "domainId": "comp-sci",
                "description": "Develop and deploy deep neural architectures, LLM reasoning pipelines, RAG systems, and computer vision models.",
                "skillsRequired": ["Python", "PyTorch", "TensorFlow", "Google GenAI SDK", "LangChain", "Vector Databases", "FastAPI"],
                "learningDuration": "8 Months (4 Stages)",
                "averageDifficulty": "Advanced",
                "growthRate": "+38% YoY",
                "avgSalary": "$115,000 - $180,000",
                "typicalProjects": ["Multi-Modal RAG Assistant", "Real-Time Object Detection Pipeline", "Autonomous Research Agent"],
                "internshipRoles": ["AI Research Intern", "Applied ML Intern", "Data Science Intern"],
                "jobRoles": ["AI Engineer", "Machine Learning Specialist", "LLM Solutions Architect"],
                "recommendedEducation": "B.Tech CS / M.S. in Artificial Intelligence or Data Science",
                "color": "#8b5cf6"
            },
            {
                "id": "cloud-devops",
                "title": "Cloud & DevOps Architect",
                "field": "Cloud Systems",
                "domainId": "comp-sci",
                "description": "Design resilient multi-cloud architectures, CI/CD automation pipelines, Kubernetes clusters, and security infrastructure.",
                "skillsRequired": ["Linux", "Docker", "Kubernetes", "Terraform", "Google Cloud / AWS", "GitHub Actions", "Prometheus"],
                "learningDuration": "6 Months (4 Stages)",
                "averageDifficulty": "Intermediate",
                "growthRate": "+28% YoY",
                "avgSalary": "$105,000 - $160,000",
                "typicalProjects": ["Zero-Downtime Multi-Region Pipeline", "GitOps Kubernetes Cluster", "Serverless Microservices Platform"],
                "internshipRoles": ["Cloud Engineering Intern", "DevOps Intern", "Site Reliability Intern"],
                "jobRoles": ["DevOps Engineer", "Cloud Infrastructure Specialist", "Site Reliability Engineer (SRE)"],
                "recommendedEducation": "B.Tech in CS / Information Technology",
                "color": "#06b6d4"
            }
        ]
    },
    {
        "id": "data-science",
        "name": "Data Science & Analytics",
        "icon": "BarChart3",
        "description": "Transform massive datasets into strategic intelligence through statistical modeling, visual storytelling, and predictive analytics.",
        "color": "#10b981",
        "popularCareers": ["Data Analyst", "Business Intelligence Engineer", "Quantitative Researcher"],
        "requiredSkills": ["Python", "SQL", "Pandas", "Tableau / PowerBI", "Statistical Modeling"],
        "careerGrowth": "+21% YoY",
        "difficulty": "Moderate",
        "educationRequirement": "B.S. in Statistics, Mathematics, or CS",
        "careers": []
    }
]

RIASEC_QUESTIONS = [
    {
        "id": 1,
        "question": "When approaching a complex technical challenge, what energizes you most?",
        "scenario": "You are given complete autonomy on a new software initiative.",
        "category": "I",
        "options": [
            {"label": "Algorithmic Architecture", "description": "Investigating performance bottlenecks, memory optimization, and data structures.", "type": "I", "points": 4},
            {"label": "Hands-on Hardware & Systems", "description": "Configuring bare-metal servers, network protocols, and Linux kernels.", "type": "R", "points": 4},
            {"label": "Creative UI & Interaction", "description": "Crafting fluid animations, aesthetic visual hierarchies, and user delight.", "type": "A", "points": 4},
            {"label": "Product Strategy & Leadership", "description": "Defining user value proposition, driving engineering velocity, and pitching to stakeholders.", "type": "E", "points": 4}
        ]
    },
    {
        "id": 2,
        "question": "Which activity would you choose for a weekend hackathon project?",
        "scenario": "A 36-hour sprint with an open theme.",
        "category": "E",
        "options": [
            {"label": "Autonomous AI Agent", "description": "Building an LLM multi-step reasoning agent with RAG search.", "type": "I", "points": 4},
            {"label": "Interactive 3D Web Experience", "description": "Using Three.js, WebGL, and custom typography.", "type": "A", "points": 4},
            {"label": "EdTech Peer Tutoring Platform", "description": "Connecting junior students with verified peer mentors.", "type": "S", "points": 4},
            {"label": "FinTech Automated Ledger", "description": "Strict transactional validation, double-entry bookkeeping, and schema integrity.", "type": "C", "points": 4}
        ]
    },
    {
        "id": 3,
        "question": "How do you prefer to collaborate within an engineering team?",
        "scenario": "Your squad is shipping a high-priority quarterly milestone.",
        "category": "S",
        "options": [
            {"label": "Mentorship & Code Reviews", "description": "Guiding junior engineers, pair programming, and fostering psychological safety.", "type": "S", "points": 4},
            {"label": "Technical Project Owner", "description": "Setting roadmap milestones, removing blockers, and coordinating team goals.", "type": "E", "points": 4},
            {"label": "Deep Autonomous Problem Solver", "description": "Taking the hardest isolated technical component and writing clean, tested code.", "type": "I", "points": 4},
            {"label": "CI/CD & Process Auditor", "description": "Ensuring 100% test coverage, strict lint rules, and automated release gates.", "type": "C", "points": 4}
        ]
    }
]

SAMPLE_ROADMAP_STAGES = [
    {
        "id": 1,
        "stageNumber": 1,
        "title": "Stage 1: Core Foundations & Algorithmic Thinking",
        "subtitle": "Computer Science Foundations & Basic Web",
        "description": "Establish unbreakable fundamentals in data structures, time complexity analysis, modern JavaScript/TypeScript, and Git workflows.",
        "estimatedDuration": "4 Weeks",
        "durationWeeks": 4,
        "progressPercentage": 100,
        "completionPercentage": 100,
        "status": "completed",
        "isLocked": False,
        "isCurrent": False,
        "skillsCovered": ["TypeScript Fundamentals", "Data Structures & Big-O", "Git & Semantic Versioning", "DOM & Async JS"],
        "tasks": [
            {"id": "t1-1", "title": "Array & Hash Table Algorithmic Patterns", "completed": True, "estimatedHours": 2, "resourceLink": "https://leetcode.com"},
            {"id": "t1-2", "title": "TypeScript Interfaces & Strict Type Generics", "completed": True, "estimatedHours": 3, "resourceLink": "https://typescriptlang.org"},
            {"id": "t1-3", "title": "Git Branching, Rebase, & Pull Request Etiquette", "completed": True, "estimatedHours": 2, "resourceLink": "https://github.com"}
        ],
        "requiredProject": "Interactive Algorithmic Visualizer & Task Manager",
        "keyTopics": ["Two-pointer techniques", "TypeScript strict mode", "Semantic Git commits"]
    },
    {
        "id": 2,
        "stageNumber": 2,
        "title": "Stage 2: Modern Frontend Architecture & API Design",
        "subtitle": "Component Design & Full-Stack Integration",
        "description": "Build high-performance client applications with React 19, Tailwind CSS, custom hooks, state stores, and robust RESTful Python FastAPI services.",
        "estimatedDuration": "6 Weeks",
        "durationWeeks": 6,
        "progressPercentage": 72,
        "completionPercentage": 72,
        "status": "in_progress",
        "isLocked": False,
        "isCurrent": True,
        "skillsCovered": ["React 19 Hooks & Memoization", "Tailwind CSS Utility Design", "Python FastAPI REST APIs", "SQLAlchemy & SQLite/PostgreSQL"],
        "tasks": [
            {"id": "t2-1", "title": "Build Dynamic Kanban Task Planner with Drag and Drop", "completed": True, "estimatedHours": 3},
            {"id": "t2-2", "title": "Implement Fast Async CRUD Endpoints in FastAPI", "completed": True, "estimatedHours": 4},
            {"id": "t2-3", "title": "State Management with Zustand & React Context", "completed": False, "estimatedHours": 3},
            {"id": "t2-4", "title": "Integrate Google Gemini API for Contextual AI Mentoring", "completed": False, "estimatedHours": 4}
        ],
        "requiredProject": "DevPulse — Developer Productivity & Learning Platform",
        "keyTopics": ["React component lifecycle", "FastAPI Pydantic validation", "SQLAlchemy async sessions"]
    },
    {
        "id": 3,
        "stageNumber": 3,
        "title": "Stage 3: Distributed Systems, Databases, & Cloud Deployment",
        "subtitle": "Microservices, Security, & DevOps",
        "description": "Scale systems with PostgreSQL indexing, Redis caching, Docker containerization, CI/CD automation, and cloud deployments.",
        "estimatedDuration": "6 Weeks",
        "durationWeeks": 6,
        "progressPercentage": 0,
        "completionPercentage": 0,
        "status": "locked",
        "isLocked": True,
        "isCurrent": False,
        "skillsCovered": ["PostgreSQL Advanced Indexing", "Docker & Multi-Stage Builds", "Redis Cache Invalidation", "Cloud Deployment (GCP / AWS)"],
        "tasks": [
            {"id": "t3-1", "title": "Database Schema Normalization & Query Tuning", "completed": False, "estimatedHours": 3},
            {"id": "t3-2", "title": "Containerize Full Stack App with Docker Compose", "completed": False, "estimatedHours": 4}
        ],
        "requiredProject": "Cloud-Native Scalable SaaS with Multi-Tenant RBAC",
        "keyTopics": ["ACID transactions", "Docker networking", "Automated deployment pipelines"]
    }
]

SAMPLE_DAILY_TASKS = [
    {
        "id": "dt-1",
        "date": "2026-08-23",
        "stageId": 2,
        "dayNumber": 17,
        "goalTitle": "Master React Performance & Cloud Architecture",
        "title": "Implement Memoization & Custom Hooks in React 19",
        "category": "Frontend",
        "description": "Optimize component re-render boundaries using useMemo, useCallback, and React compiler patterns.",
        "estimatedMinutes": 45,
        "difficulty": "Medium",
        "resourceLink": "https://react.dev/reference/react/useMemo",
        "status": "in_progress",
        "skillTag": "React 19",
        "xpReward": 120
    },
    {
        "id": "dt-2",
        "date": "2026-08-23",
        "stageId": 2,
        "dayNumber": 17,
        "goalTitle": "Master React Performance & Cloud Architecture",
        "title": "Build Async FastAPI Router with Pydantic v2 Schemas",
        "category": "Backend",
        "description": "Create clean type-safe endpoint schemas with input validation, error handling, and dependency injection.",
        "estimatedMinutes": 50,
        "difficulty": "Medium",
        "resourceLink": "https://fastapi.tiangolo.com",
        "status": "pending",
        "skillTag": "Python FastAPI",
        "xpReward": 150
    },
    {
        "id": "dt-3",
        "date": "2026-08-23",
        "stageId": 2,
        "dayNumber": 17,
        "goalTitle": "Master React Performance & Cloud Architecture",
        "title": "Solve 2 LeetCode Medium Sliding Window Problems",
        "category": "DSA",
        "description": "Practice 'Longest Substring Without Repeating Characters' and 'Minimum Window Substring'.",
        "estimatedMinutes": 40,
        "difficulty": "Hard",
        "resourceLink": "https://leetcode.com",
        "status": "pending",
        "skillTag": "Algorithms",
        "xpReward": 180
    }
]

SAMPLE_PROJECTS = [
    {
        "id": "proj-1",
        "title": "DevPulse — Developer Productivity & Learning Platform",
        "stage": 2,
        "stageNumber": 2,
        "tier": "Tier 2 Full Stack",
        "difficulty": "Medium (2-3 weeks)",
        "durationWeeks": 3,
        "estimatedDays": 21,
        "description": "Architect a dynamic Kanban task planner with semester-aware rescheduling logic and interactive performance analytics.",
        "skills": ["React 19", "TypeScript", "Python FastAPI", "Tailwind CSS", "Recharts"],
        "requirements": [
            "Interactive drag-and-drop task boards",
            "Semester workload redistribution algorithm",
            "Verified coding analytics with Recharts"
        ],
        "expectedOutcome": "Production-ready developer dashboard with automated test coverage and clean API documentation.",
        "techStack": ["React 19", "TypeScript", "Python FastAPI", "PostgreSQL", "Tailwind CSS"],
        "status": "in_progress",
        "progressPercentage": 75,
        "repoUrl": "https://github.com/gilbertraj/devpulse",
        "liveDemoUrl": "https://devpulse.preview.app",
        "milestones": [
            {"id": "m1", "week": 1, "title": "UI Wireframing & Component Architecture", "deliverable": "Responsive layouts with Tailwind", "completed": True},
            {"id": "m2", "week": 2, "title": "FastAPI REST API & Database Integration", "deliverable": "Async endpoints with validation", "completed": True},
            {"id": "m3", "week": 3, "title": "AI Mentor & Dynamic Rescheduling Logic", "deliverable": "Gemini AI integration & smart algorithms", "completed": False}
        ]
    },
    {
        "id": "proj-2",
        "title": "CodeStream — Real-Time Collaborative Sandbox",
        "stage": 3,
        "stageNumber": 3,
        "tier": "Tier 3 Advanced",
        "difficulty": "Large (4+ weeks)",
        "durationWeeks": 4,
        "estimatedDays": 28,
        "description": "Engineered a low-latency collaborative code editor with live syntax highlighting, AST parsing, and sandboxed execution.",
        "skills": ["WebSockets", "Docker", "Python", "FastAPI", "Redis"],
        "techStack": ["React", "Python FastAPI", "WebSockets", "Docker", "Redis"],
        "status": "completed",
        "progressPercentage": 100,
        "repoUrl": "https://github.com/gilbertraj/codestream",
        "milestones": [
            {"id": "cs-m1", "title": "WebSocket synchronization engine", "completed": True},
            {"id": "cs-m2", "title": "Dockerized isolated container runner", "completed": True}
        ]
    }
]

SAMPLE_TECH_NEWS = [
    {
        "id": "news-1",
        "title": "Python 3.13 Releases Experimental JIT Compiler and Free-Threaded Mode",
        "summary": "The latest Python release introduces substantial concurrency enhancements with no-GIL builds and improved runtime execution speeds.",
        "source": "Python Software Foundation",
        "category": "Backend & Systems",
        "date": "Today",
        "url": "https://python.org",
        "tags": ["Python", "JIT", "Concurrency"],
        "readTime": "4 min read"
    },
    {
        "id": "news-2",
        "title": "React 19 Standardizes Actions, Optimistic Updates, and Server Components",
        "summary": "Engineering teams adopting React 19 report cleaner form handling, built-in async transitions, and unified metadata APIs.",
        "source": "React Core Team",
        "category": "Frontend",
        "date": "Yesterday",
        "url": "https://react.dev",
        "tags": ["React 19", "JavaScript", "Web Dev"],
        "readTime": "3 min read"
    }
]

SAMPLE_EVENTS = [
    {
        "id": "ev-1",
        "title": "Global Student AI & Cloud Hackathon 2026",
        "organizer": "Google Developers Group",
        "category": "Hackathon",
        "date": "Sep 15 - 17, 2026",
        "location": "Online / Virtual",
        "isOnline": True,
        "tags": ["AI", "Cloud", "Gemini API", "FastAPI"],
        "prizePool": "$25,000 USD",
        "registrationOpen": True,
        "link": "https://hackathons.dev"
    },
    {
        "id": "ev-2",
        "title": "Tech Summit: Scaling Microservices with Python & Kubernetes",
        "organizer": "Cloud Native Computing Foundation",
        "category": "Tech Conference",
        "date": "Oct 05, 2026",
        "location": "San Francisco, CA & Streamed",
        "isOnline": True,
        "tags": ["Architecture", "Kubernetes", "FastAPI"],
        "registrationOpen": True,
        "link": "https://cncf.io"
    }
]

SAMPLE_INTERNSHIPS = [
    {
        "id": "int-1",
        "company": "Stripe",
        "role": "Software Engineering Intern (Summer 2027)",
        "location": "San Francisco, CA / Remote",
        "isRemote": True,
        "duration": "12 Weeks (Summer)",
        "stipend": "$54 / hour + Housing",
        "deadline": "Rolling Applications",
        "skillsRequired": ["React", "TypeScript", "Python / Ruby", "SQL", "API Design"],
        "requiredSkills": ["React", "TypeScript", "Python", "SQL"],
        "eligibility": "B.Tech / B.S. graduating Dec 2026 - Jun 2028",
        "description": "Join the Core Payments team to architect financial infrastructure handling millions of transactions per minute with four nines reliability.",
        "matchScore": 96,
        "status": "none"
    },
    {
        "id": "int-2",
        "company": "Google",
        "role": "STEP Engineering Intern",
        "location": "Mountain View, CA",
        "isRemote": False,
        "duration": "12 Weeks",
        "stipend": "$50 / hour + Housing Stipend",
        "deadline": "Oct 30, 2026",
        "skillsRequired": ["C++", "Python", "Data Structures", "Algorithms"],
        "requiredSkills": ["Python", "Data Structures", "Algorithms"],
        "eligibility": "1st or 2nd year undergraduate students in CS",
        "description": "Collaborate on production engineering teams with dedicated 1-on-1 mentorship from Google Senior Staff Engineers.",
        "matchScore": 92,
        "status": "none"
    }
]

SAMPLE_JOBS = [
    {
        "id": "job-1",
        "company": "Vercel",
        "title": "Junior Full Stack Engineer",
        "position": "Junior Full Stack Engineer",
        "location": "Remote (US / Global)",
        "jobType": "Full-time",
        "experience": "0 - 2 Years",
        "salary": "$115,000 - $145,000",
        "salaryRange": "$115,000 - $145,000",
        "skills": ["Next.js", "React", "TypeScript", "Node.js / Python", "Edge Functions"],
        "skillsRequired": ["Next.js", "React", "TypeScript", "Python"],
        "matchScore": 95,
        "description": "Develop developer-first deployment workflows and real-time observability telemetry across Vercel infrastructure.",
        "responsibilities": [
            "Ship performant web interfaces and backend microservices",
            "Collaborate on open-source frameworks and tooling",
            "Maintain 99.99% reliability on critical user deployment flows"
        ],
        "requirements": [
            "Strong command of modern TypeScript, React, and REST/GraphQL APIs",
            "Demonstrated passion via personal projects and open-source contributions"
        ],
        "postedDaysAgo": 2,
        "status": "none"
    }
]

SAMPLE_PLACEMENT_QUESTIONS = [
    {
        "id": "pq-1",
        "category": "DSA",
        "subCategory": "Arrays & Two Pointers",
        "title": "Two Sum II — Input Array Is Sorted",
        "difficulty": "Medium",
        "companies": ["Amazon", "Google", "Microsoft", "Meta"],
        "description": "Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number.",
        "question": "Return the indices of the two numbers, index1 and index2, added by one as an integer array [index1, index2] of length 2.",
        "codeTemplate": "def twoSum(numbers: list[int], target: int) -> list[int]:\n    # Write your optimal O(N) two-pointer solution\n    left = 0\n    right = len(numbers) - 1\n    while left < right:\n        curr_sum = numbers[left] + numbers[right]\n        if curr_sum == target:\n            return [left + 1, right + 1]\n        elif curr_sum < target:\n            left += 1\n        else:\n            right -= 1\n    return []\n",
        "starterCode": "def twoSum(numbers: list[int], target: int) -> list[int]:\n    left = 0\n    right = len(numbers) - 1\n    while left < right:\n        curr_sum = numbers[left] + numbers[right]\n        if curr_sum == target:\n            return [left + 1, right + 1]\n        elif curr_sum < target:\n            left += 1\n        else:\n            right -= 1\n    return []\n",
        "testCases": [
            {"input": "numbers = [2,7,11,15], target = 9", "output": "[1, 2]"},
            {"input": "numbers = [2,3,4], target = 6", "output": "[1, 3]"},
            {"input": "numbers = [-1,0], target = -1", "output": "[1, 2]"}
        ],
        "completed": False
    }
]

DEFAULT_USER = {
    "id": "usr-101",
    "fullName": "Gilbert Raj",
    "email": "gilbertraj800@gmail.com",
    "educationLevel": "Undergraduate B.Tech CS",
    "currentYear": "3rd Year (Semester 5)",
    "country": "United States",
    "phone": "+1 (555) 234-8900",
    "domainId": "comp-sci",
    "careerId": "fullstack-dev",
    "careerTitle": "Full Stack Developer",
    "currentStage": 2,
    "overallProgress": 72,
    "totalHoursLearned": 148,
    "currentStreakDays": 14,
    "xpPoints": 2450,
    "semesterName": "Fall Semester 2026",
    "semesterStartDate": "2026-08-01",
    "semesterEndDate": "2026-12-15",
    "availableHoursPerDay": 3.0,
    "availableDaysPerWeek": 6,
    "skillLevel": "Intermediate",
    "riasecResult": {
        "scores": {"R": 12, "I": 24, "A": 10, "S": 18, "E": 20, "C": 14},
        "dominantCode": "I-E-S",
        "personalityTitle": "The Investigative Strategic Leader",
        "description": "You blend deep algorithmic curiosity (Investigative) with initiative and technical leadership (Enterprising).",
        "strengths": [
            "Deconstructing complex architectures into clean components",
            "Translating ambiguous product visions into executable technical roadmaps",
            "Mentoring junior peers while driving high-standard engineering delivery",
            "Rapidly mastering modern React, TypeScript, and cloud technologies"
        ],
        "workStyle": "Autonomous deep-work sprints combined with cross-functional collaborative alignment.",
        "recommendedDomain": "Computer Science",
        "recommendedField": "Software Development & AI",
        "recommendations": [
            {
                "careerId": "fullstack-dev",
                "title": "Full Stack Developer",
                "field": "Software Development",
                "domainId": "comp-sci",
                "matchScore": 96,
                "reason": "Direct convergence of your investigative problem solving and desire to build end-to-end user-facing products.",
                "demandGrowth": "+24% YoY",
                "averageSalary": "$95,000 - $145,000",
                "keySkills": ["React", "TypeScript", "Node.js", "PostgreSQL", "Docker"]
            }
        ]
    },
    "notifications": [
        {
            "id": "notif-1",
            "title": "Daily Goal Ready 🎯",
            "message": "Day 17 tasks are queued for Stage 2: Full Stack Development.",
            "type": "task",
            "date": "10 mins ago",
            "read": False
        },
        {
            "id": "notif-2",
            "title": "Milestone Unlocked 🚀",
            "message": "You reached 72% completion in Stage 2 Development. Keep up the streak!",
            "type": "milestone",
            "date": "2 hours ago",
            "read": False
        }
    ]
}

DEFAULT_RESUME = {
    "personalInfo": {
        "fullName": "Gilbert Raj",
        "email": "gilbertraj800@gmail.com",
        "phone": "+1 (555) 234-8900",
        "location": "San Francisco, CA",
        "linkedin": "https://linkedin.com/in/gilbertraj",
        "github": "https://github.com/gilbertraj",
        "portfolio": "https://gilbertraj.dev"
    },
    "summary": "Dedicated Full Stack Software Engineering student specializing in React 19, TypeScript, Python FastAPI, PostgreSQL, and scalable systems. Proven track record of developing responsive web applications and high-throughput APIs.",
    "education": [
        {
            "institution": "University School of Engineering & Technology",
            "degree": "Bachelor of Technology (B.Tech)",
            "field": "Computer Science and Engineering",
            "startYear": "2023",
            "endYear": "2027",
            "grade": "3.88 / 4.0 GPA"
        }
    ],
    "skills": [
        {"category": "Frontend", "items": ["React 19", "TypeScript", "Tailwind CSS", "Next.js", "Zustand"]},
        {"category": "Backend & Cloud", "items": ["Python", "FastAPI", "Node.js", "PostgreSQL", "Supabase", "Docker"]},
        {"category": "Tools & AI", "items": ["Gemini API", "Git & GitHub", "REST APIs", "Vite", "Postman"]}
    ],
    "experience": [
        {
            "title": "Frontend Engineering Intern",
            "company": "TechNovation Labs",
            "location": "Remote",
            "startDate": "May 2025",
            "endDate": "Aug 2025",
            "current": False,
            "description": [
                "Engineered responsive customer analytics dashboard in React & TypeScript, boosting page speed index by 38%.",
                "Authored modular UI components and integrated RESTful endpoints with complete type safety.",
                "Wrote end-to-end integration tests, elevating codebase reliability across core user funnels."
            ]
        }
    ],
    "projects": [
        {
            "name": "DevPulse — Developer Productivity & Learning Platform",
            "techStack": "React 19, TypeScript, Python FastAPI, Tailwind CSS, Recharts",
            "description": "Architected dynamic Kanban task planner with semester-aware rescheduling logic and interactive performance analytics.",
            "link": "https://github.com/gilbertraj/devpulse"
        }
    ],
    "certifications": [
        {
            "name": "Google Cloud Associate Cloud Engineer",
            "issuer": "Google Cloud",
            "date": "2025",
            "credentialUrl": "https://cloud.google.com"
        }
    ],
    "achievements": [
        "Winner (1st Place) — Inter-College 36-Hour Hackathon 2025 out of 120 teams",
        "Solved 250+ algorithmic challenges on LeetCode with top 10% global ranking"
    ],
    "templateId": "modern-tech"
}

DEFAULT_DEV_PROFILE = {
    "username": "gilbertraj",
    "fullName": "Gilbert Raj",
    "avatarUrl": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    "title": "Full Stack Engineer & AI Explorer",
    "bio": "Turning complex logic into silky smooth digital experiences. Building at the intersection of modern React, Python FastAPI microservices, and Generative AI.",
    "careerGoal": "Seeking Software Engineering Internships & Full-Time New Grad Roles for 2026/2027.",
    "location": "San Francisco, CA / Open to Remote",
    "githubHandle": "gilbertraj",
    "linkedinHandle": "gilbertraj",
    "website": "https://gilbertraj.dev",
    "education": "B.Tech in Computer Science, Year 3",
    "badges": [
        {"id": "b1", "name": "14-Day Study Streak 🔥", "icon": "Flame", "description": "Consistently completed daily learning tasks for two straight weeks", "unlockedAt": "Yesterday"},
        {"id": "b2", "name": "Stage 1 Graduate 🎓", "icon": "Award", "description": "100% completed Foundation stage logic and core projects", "unlockedAt": "2 weeks ago"},
        {"id": "b3", "name": "Full Stack Craftsman ⚡", "icon": "Code", "description": "Built production-grade async microservices with FastAPI", "unlockedAt": "1 month ago"}
    ],
    "topSkills": [
        {"name": "React 19 & TypeScript", "level": 92},
        {"name": "Python & FastAPI", "level": 90},
        {"name": "PostgreSQL & Supabase", "level": 84},
        {"name": "Google Gemini API", "level": 82}
    ],
    "pinnedProjects": ["proj-1", "proj-2"],
    "activityHeatmap": [{"date": f"2026-08-{i+1:02d}", "count": (i % 5) + 1} for i in range(23)],
    "certifications": ["Google Cloud Associate Cloud Engineer", "Meta Front-End Professional"],
    "stats": {
        "tasksCompleted": 48,
        "hoursLearned": 148,
        "streakDays": 14,
        "projectsFinished": 4
    }
}
