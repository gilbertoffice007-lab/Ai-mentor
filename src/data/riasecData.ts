import {
  RIASECCategoryKey,
  RIASECQuestion,
  RIASECQuestionOption,
  RIASECScore,
  RIASECInterpretationLevel,
  RIASECCategoryDetail,
  CareerRecommendation,
  PersonalityResult
} from '../types';

export const RIASEC_OPTIONS: RIASECQuestionOption[] = [
  { label: 'Strongly Dislike', emoji: '😣', points: 1 },
  { label: 'Dislike', emoji: '😕', points: 2 },
  { label: 'Neutral', emoji: '😐', points: 3 },
  { label: 'Like', emoji: '🙂', points: 4 },
  { label: 'Strongly Like', emoji: '🤩', points: 5 },
];

export interface RIASECCategoryMeta {
  code: RIASECCategoryKey;
  name: string;
  fullName: string;
  emoji: string;
  icon: string;
  badgeColor: string;
  barColor: string;
  textColor: string;
  borderColor: string;
  bgGradient: string;
  description: string;
  summary: string;
  workActivities: string[];
  preferredEnvironments: string[];
  strengths: string[];
  sampleCareers: string[];
}

export const RIASEC_CATEGORIES_META: Record<RIASECCategoryKey, RIASECCategoryMeta> = {
  R: {
    code: 'R',
    name: 'Realistic',
    fullName: 'Realistic (Doers)',
    emoji: '⚙️',
    icon: 'Wrench',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    barColor: 'from-amber-500 to-orange-500',
    textColor: 'text-amber-400',
    borderColor: 'border-amber-500/30',
    bgGradient: 'from-amber-950/40 via-slate-900 to-slate-950',
    description:
      'You enjoy practical problem-solving, technology, engineering, tools, physical prototypes, and real-world hands-on projects.',
    summary: 'Practical, hands-on, mechanical, physical, and concrete problem-solving.',
    workActivities: [
      'Operating, testing, and assembling hardware systems and electronic equipment',
      'Diagnosing mechanical malfunctions and implementing hands-on repairs',
      'Fabricating physical prototypes and working with tangible tools',
      'Deploying hardware infrastructure and real-world engineering solutions'
    ],
    preferredEnvironments: [
      'Engineering workshops, robotics labs, and makerspaces',
      'Field sites, manufacturing facilities, and test benches',
      'Autonomous technical workspaces with physical equipment'
    ],
    strengths: [
      'Hands-on spatial reasoning and physical troubleshooting',
      'Direct execution and turning theoretical blueprints into tangible reality',
      'High technical endurance and practical tool proficiency'
    ],
    sampleCareers: ['Mechanical Engineer', 'Robotics Engineer', 'Civil Engineer', 'Hardware Systems Specialist']
  },
  I: {
    code: 'I',
    name: 'Investigative',
    fullName: 'Investigative (Thinkers)',
    emoji: '🔬',
    icon: 'Brain',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    barColor: 'from-cyan-500 to-blue-500',
    textColor: 'text-cyan-400',
    borderColor: 'border-cyan-500/30',
    bgGradient: 'from-cyan-950/40 via-slate-900 to-slate-950',
    description:
      'You enjoy exploring ideas, solving complex problems, analyzing data and information, and understanding how systems work internally.',
    summary: 'Analytical, intellectual, scientific, data-driven, and exploratory inquiry.',
    workActivities: [
      'Formulating hypotheses, running controlled experiments, and testing edge cases',
      'Analyzing large quantitative datasets to extract underlying mathematical patterns',
      'Deconstructing complex algorithmic architectures down to first principles',
      'Conducting scientific literature reviews and discovering root causes'
    ],
    preferredEnvironments: [
      'Quiet research labs, computational centers, and deep-focus sanctuaries',
      'Data-driven tech companies and research institutes',
      'Autonomous environments that reward curiosity and analytical rigor'
    ],
    strengths: [
      'Deep logical reasoning and mathematical problem-solving',
      'Synthesizing abstract data models into predictive conclusions',
      'Unyielding persistence when unraveling intricate puzzles'
    ],
    sampleCareers: ['Data Scientist', 'AI/ML Engineer', 'Software Developer', 'Bioinformatics Researcher']
  },
  A: {
    code: 'A',
    name: 'Artistic',
    fullName: 'Artistic (Creators)',
    emoji: '🎨',
    icon: 'Palette',
    badgeColor: 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30',
    barColor: 'from-fuchsia-500 to-pink-500',
    textColor: 'text-fuchsia-400',
    borderColor: 'border-fuchsia-500/30',
    bgGradient: 'from-fuchsia-950/40 via-slate-900 to-slate-950',
    description:
      'You enjoy creating new designs, visualizing concepts, expressing original ideas through media, and working with creative autonomy.',
    summary: 'Creative, expressive, original, visual, and innovative design thinking.',
    workActivities: [
      'Crafting intuitive user interfaces, visual design systems, and animations',
      'Developing original multimedia, digital content, and interactive narratives',
      'Brainstorming unconventional approaches to user experience and storytelling',
      'Transforming abstract emotions or messages into compelling visual form'
    ],
    preferredEnvironments: [
      'Dynamic creative studios, design labs, and multimedia ateliers',
      'Flexible, open spaces with minimal bureaucratic constraints',
      'Workplaces that prioritize aesthetic excellence and creative freedom'
    ],
    strengths: [
      'Exceptional visual communication and aesthetic intuition',
      'Divergent thinking and innovative out-of-the-box solution design',
      'Empathetic user-centric perspective and artistic expression'
    ],
    sampleCareers: ['UI/UX Designer', 'Creative Director', 'Game Designer', 'Frontend Visual Architect']
  },
  S: {
    code: 'S',
    name: 'Social',
    fullName: 'Social (Helpers)',
    emoji: '🤝',
    icon: 'Users',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    barColor: 'from-emerald-500 to-teal-500',
    textColor: 'text-emerald-400',
    borderColor: 'border-emerald-500/30',
    bgGradient: 'from-emerald-950/40 via-slate-900 to-slate-950',
    description:
      'You enjoy helping others, explaining difficult concepts, mentoring peers, collaborating in teams, and building meaningful human connections.',
    summary: 'Interpersonal, empathetic, collaborative, educational, and service-oriented.',
    workActivities: [
      'Mentoring, coaching, and teaching peers to help them master complex topics',
      'Active listening, mediating team challenges, and providing empathetic support',
      'Organizing community initiatives and facilitating collaborative group sessions',
      'Advocating for student and user welfare in team decisions'
    ],
    preferredEnvironments: [
      'Interactive learning environments, collaborative workshops, and campuses',
      'People-centric organizations and community hubs',
      'Supportive teams where knowledge sharing and mutual growth are prioritized'
    ],
    strengths: [
      'Empathetic interpersonal communication and conflict resolution',
      'Translating intricate ideas into accessible, encouraging learning steps',
      'Fostering trust, camaraderie, and team alignment'
    ],
    sampleCareers: ['Teacher / Academic Mentor', 'Instructional Designer', 'Counselor', 'Community Lead']
  },
  E: {
    code: 'E',
    name: 'Enterprising',
    fullName: 'Enterprising (Persuaders)',
    emoji: '🚀',
    icon: 'TrendingUp',
    badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    barColor: 'from-indigo-500 to-purple-500',
    textColor: 'text-indigo-400',
    borderColor: 'border-indigo-500/30',
    bgGradient: 'from-indigo-950/40 via-slate-900 to-slate-950',
    description:
      'You enjoy taking leadership, persuading others, setting ambitious goals, making strategic decisions, and launching impactful ventures.',
    summary: 'Leadership, strategic, entrepreneurial, persuasive, and goal-driven execution.',
    workActivities: [
      'Pitching visions, negotiating strategic agreements, and inspiring stakeholders',
      'Defining high-level product goals and driving cross-functional milestone delivery',
      'Assessing market opportunities, taking calculated risks, and launching initiatives',
      'Motivating team members and steering projects through ambiguity'
    ],
    preferredEnvironments: [
      'Fast-paced startup headquarters and executive strategy boardrooms',
      'Competitive, high-growth business incubators and venture hubs',
      'Dynamic project spaces where bold initiative and results are celebrated'
    ],
    strengths: [
      'Decisive strategic judgment under uncertainty',
      'Persuasive storytelling, public speaking, and team mobilization',
      'High ambition, resilience, and commercial acumen'
    ],
    sampleCareers: ['Tech Entrepreneur', 'Product Manager', 'Venture Strategist', 'Engineering Manager']
  },
  C: {
    code: 'C',
    name: 'Conventional',
    fullName: 'Conventional (Organizers)',
    emoji: '📊',
    icon: 'CheckSquare',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    barColor: 'from-blue-500 to-slate-400',
    textColor: 'text-blue-400',
    borderColor: 'border-blue-500/30',
    bgGradient: 'from-blue-950/40 via-slate-900 to-slate-950',
    description:
      'You prefer organized environments, structured tasks, attention to detail, accuracy, planning, and working systematically with data and records.',
    summary: 'Systematic, methodical, accurate, detail-oriented, and structured organization.',
    workActivities: [
      'Establishing structured file architectures, schedules, and standard workflows',
      'Auditing records, reconciling accounts, and verifying data accuracy',
      'Tracking compliance with rigorous technical and operational standards',
      'Managing databases, spreadsheets, and systematic documentation pipelines'
    ],
    preferredEnvironments: [
      'Well-organized corporate offices, compliance teams, and operations centers',
      'Structured environments with clear documentation and reliable schedules',
      'Data-centric spaces where accuracy and quality assurance are valued'
    ],
    strengths: [
      'Meticulous precision and acute error detection',
      'Organizing unstructured chaos into clear, orderly, repeatable frameworks',
      'Reliability, dependability, and structured project execution'
    ],
    sampleCareers: ['Accountant / Auditor', 'Database Administrator', 'Financial Analyst', 'Operations Architect']
  }
};

// Raw 48 questions organized into categories (8 per category)
// Exact questions from specification:
const RAW_RIASEC_QUESTIONS: Record<RIASECCategoryKey, string[]> = {
  R: [
    'I enjoy working with machines or electronic devices.',
    'I like building or assembling things.',
    'I enjoy repairing things when they stop working.',
    'I would enjoy working with tools and equipment.',
    'I prefer practical activities over theoretical discussions.',
    'I like creating physical models or prototypes.',
    'I enjoy understanding how mechanical or technical systems work.',
    'I would enjoy working on real-world engineering projects.'
  ],
  I: [
    'I enjoy solving difficult problems.',
    'I like understanding why something happens.',
    'I enjoy experimenting with different solutions.',
    'I like analyzing data to find patterns.',
    'I enjoy mathematics and logical reasoning.',
    'I would enjoy conducting scientific research.',
    'I like learning how technology works internally.',
    'I enjoy investigating questions that do not have obvious answers.'
  ],
  A: [
    'I enjoy creating new designs.',
    'I like drawing, visualizing, or designing things.',
    'I enjoy creating stories, videos, or digital content.',
    'I prefer having freedom to decide how I complete a task.',
    'I like experimenting with new creative ideas.',
    'I enjoy designing websites or application interfaces.',
    'I like expressing my ideas through art, media, or design.',
    'I would enjoy a career where creativity is important.'
  ],
  S: [
    'I enjoy helping others solve their problems.',
    'I like explaining difficult concepts to other people.',
    'I enjoy teaching or mentoring others.',
    'I like working as part of a team.',
    'I enjoy listening to people\'s problems and concerns.',
    'I would like a career where I interact with people regularly.',
    'I enjoy organizing activities for a group.',
    'I feel satisfied when I help someone improve.'
  ],
  E: [
    'I enjoy taking leadership roles in group activities.',
    'I like convincing people about my ideas.',
    'I enjoy making important decisions.',
    'I would like to start my own business.',
    'I enjoy presenting ideas in front of people.',
    'I like setting goals and motivating others.',
    'I enjoy negotiating and solving disagreements.',
    'I would like to manage a team or organization.'
  ],
  C: [
    'I enjoy organizing information systematically.',
    'I like working with numbers and records.',
    'I pay attention to small details.',
    'I prefer tasks with clear instructions.',
    'I enjoy maintaining organized files and documents.',
    'I like creating schedules and following plans.',
    'I enjoy checking information for errors.',
    'I prefer structured work environments.'
  ]
};

// Build interleaved 48 questions (R1, I1, A1, S1, E1, C1, R2, I2, A2...)
// This ensures a natural, smooth, balanced psychometric experience with zero category clumping.
export const RIASEC_48_QUESTIONS: RIASECQuestion[] = (() => {
  const categories: RIASECCategoryKey[] = ['R', 'I', 'A', 'S', 'E', 'C'];
  const questions: RIASECQuestion[] = [];
  let idCounter = 1;

  for (let round = 0; round < 8; round++) {
    for (const cat of categories) {
      questions.push({
        id: idCounter,
        question: RAW_RIASEC_QUESTIONS[cat][round],
        prompt: 'How much would you enjoy doing this?',
        category: cat,
        categoryIndex: round + 1,
        options: RIASEC_OPTIONS.map(opt => ({
          ...opt,
          type: cat
        }))
      });
      idCounter++;
    }
  }

  return questions;
})();

export interface CareerRIASECProfile {
  id: string;
  title: string;
  field: string;
  domainId: string;
  weights: RIASECScore;
  demandGrowth: string;
  averageSalary: string;
  keySkills: string[];
  typicalWorkActivities: string[];
  recommendedLearningPath: string[];
  education: string;
  difficulty: string;
  summary: string;
}

export const CAREER_PROFILES: CareerRIASECProfile[] = [
  {
    id: 'data-scientist',
    title: 'Data Scientist & Analytics Architect',
    field: 'Data Science & Analytics',
    domainId: 'comp-sci',
    weights: { R: 20, I: 98, A: 30, S: 30, E: 45, C: 90 },
    demandGrowth: '+36% YoY (Very High)',
    averageSalary: '$110,000 - $165,000',
    keySkills: ['Python', 'Statistics & Math', 'SQL / Snowflake', 'Machine Learning', 'Data Visualization', 'Pandas'],
    typicalWorkActivities: [
      'Cleaning and engineering complex multi-source datasets',
      'Training predictive models and neural regression pipelines',
      'Synthesizing statistical discoveries into interactive executive dashboards',
      'A/B testing hypotheses to optimize algorithmic performance'
    ],
    recommendedLearningPath: [
      'Stage 1: Python & Applied Linear Algebra / Probability',
      'Stage 2: Advanced SQL, Pandas & Exploratory Data Analysis',
      'Stage 3: Machine Learning Algorithms & Scikit-Learn',
      'Stage 4: Deep Learning, PyTorch & Production Model Serving'
    ],
    education: 'Bachelor or Master in Data Science, Computer Science, Statistics, or Math',
    difficulty: 'Challenging',
    summary: 'Discovers actionable patterns within vast datasets through statistical inquiry and machine learning.'
  },
  {
    id: 'software-dev',
    title: 'Software Developer / Engineer',
    field: 'Software Engineering',
    domainId: 'comp-sci',
    weights: { R: 35, I: 90, A: 55, S: 35, E: 40, C: 75 },
    demandGrowth: '+25% YoY (High)',
    averageSalary: '$105,000 - $155,000',
    keySkills: ['TypeScript', 'React', 'Node.js', 'System Design', 'PostgreSQL', 'Git & CI/CD'],
    typicalWorkActivities: [
      'Designing clean, maintainable, modular software architectures',
      'Implementing high-throughput REST and GraphQL APIs',
      'Debugging subtle edge-case issues across full-stack applications',
      'Writing automated unit, integration, and end-to-end tests'
    ],
    recommendedLearningPath: [
      'Stage 1: Data Structures, Algorithms & Core Programming',
      'Stage 2: Full-Stack Web Development (React & Node.js)',
      'Stage 3: Database Optimization & Microservices Architecture',
      'Stage 4: Cloud Infrastructure & Scalable System Design'
    ],
    education: 'BS in Computer Science, Software Engineering, or equivalent project portfolio',
    difficulty: 'Moderate',
    summary: 'Designs, builds, and maintains scalable digital platforms, applications, and core systems.'
  },
  {
    id: 'mechanical-eng',
    title: 'Mechanical & Robotics Engineer',
    field: 'Mechanical Engineering',
    domainId: 'engineering',
    weights: { R: 95, I: 85, A: 35, S: 30, E: 50, C: 65 },
    demandGrowth: '+18% YoY (Steady)',
    averageSalary: '$90,000 - $140,000',
    keySkills: ['CAD (SolidWorks/AutoCAD)', 'Thermodynamics', 'Mechatronics', 'Rapid Prototyping', 'MATLAB', 'Finite Element Analysis'],
    typicalWorkActivities: [
      'Drafting precision 3D CAD mechanical assemblies and blueprints',
      'Fabricating physical prototypes with 3D printers and CNC machines',
      'Conducting stress, thermal, and fluid dynamics simulations',
      'Testing mechanical stress limits on physical test fixtures'
    ],
    recommendedLearningPath: [
      'Stage 1: Engineering Mechanics & Applied Calculus',
      'Stage 2: CAD Modeling, Materials Science & Kinematics',
      'Stage 3: Mechatronics, Sensors & Embedded Control',
      'Stage 4: Robotic Actuation & Manufacturing Production'
    ],
    education: 'Bachelor of Engineering in Mechanical or Mechatronics Engineering',
    difficulty: 'Challenging',
    summary: 'Invents, models, and tests physical machines, robotics, propulsion systems, and hardware devices.'
  },
  {
    id: 'ui-ux-designer',
    title: 'UI/UX & Product Experience Designer',
    field: 'Digital Product Design',
    domainId: 'design',
    weights: { R: 20, I: 45, A: 98, S: 65, E: 50, C: 35 },
    demandGrowth: '+22% YoY (High)',
    averageSalary: '$95,000 - $145,000',
    keySkills: ['Figma', 'User Research & Personas', 'Design Systems', 'Interactive Prototyping', 'Wireframing', 'Usability Testing'],
    typicalWorkActivities: [
      'Conducting empathetic user interviews and uncovering pain points',
      'Crafting high-fidelity interactive prototypes in Figma',
      'Establishing unified multi-platform design tokens and components',
      'Partnering with engineering to verify design fidelity in production'
    ],
    recommendedLearningPath: [
      'Stage 1: Design Principles, Visual Hierarchy & Typography',
      'Stage 2: Wireframing, User Flows & Figma Component Systems',
      'Stage 3: User Research Methodologies & Usability Testing',
      'Stage 4: Advanced Micro-Interactions & Portfolio Showcases'
    ],
    education: 'Degree in HCI, Graphic Design, Digital Media, or Design Bootcamp',
    difficulty: 'Moderate',
    summary: 'Transforms complex human workflows into sleek, intuitive, and visually stunning digital products.'
  },
  {
    id: 'teacher-mentor',
    title: 'Academic Educator & Learning Specialist',
    field: 'Education & Mentorship',
    domainId: 'education',
    weights: { R: 15, I: 55, A: 55, S: 98, E: 60, C: 60 },
    demandGrowth: '+14% YoY (Steady)',
    averageSalary: '$65,000 - $105,000',
    keySkills: ['Curriculum Design', 'Active Pedagogy', 'Public Speaking', 'Empathy & Mentoring', 'Educational Technology', 'Assessment Design'],
    typicalWorkActivities: [
      'Designing engaging, step-by-step interactive learning modules',
      'Delivering inspiring lectures and leading workshop discussions',
      'Mentoring individual students to overcome learning hurdles',
      'Evaluating student growth and adapting teaching strategies'
    ],
    recommendedLearningPath: [
      'Stage 1: Domain Subject Mastery & Cognitive Psychology',
      'Stage 2: Instructional Design & Curriculum Architecture',
      'Stage 3: EdTech Platforms & Interactive Classroom Delivery',
      'Stage 4: Mentorship Leadership & Educational Leadership'
    ],
    education: 'Bachelor/Master in Education or Subject Specialty with Teaching Certification',
    difficulty: 'Moderate',
    summary: 'Empowers students and professionals by deconstructing difficult subjects into transformative learning journeys.'
  },
  {
    id: 'tech-entrepreneur',
    title: 'Tech Founder & Venture Builder',
    field: 'Entrepreneurship & Innovation',
    domainId: 'business',
    weights: { R: 45, I: 50, A: 60, S: 70, E: 98, C: 50 },
    demandGrowth: '+28% YoY (Very High)',
    averageSalary: 'Equity & $80,000 - $250,000+',
    keySkills: ['Product Strategy', 'Venture Capital Pitching', 'Team Leadership', 'Market Discovery', 'Negotiation', 'Agile Execution'],
    typicalWorkActivities: [
      'Identifying underserved market opportunities and formulating solutions',
      'Pitching venture capitalists and angel investors for seed funding',
      'Recruiting world-class engineering, design, and growth talent',
      'Navigating critical company pivots and steering revenue growth'
    ],
    recommendedLearningPath: [
      'Stage 1: Customer Discovery, MVP Prototyping & Lean Startup',
      'Stage 2: Business Models, Unit Economics & Pitch Deck Creation',
      'Stage 3: High-Growth Team Building & Product Management',
      'Stage 4: Scaling Operations, Funding Rounds & Market Expansion'
    ],
    education: 'Any discipline; self-driven entrepreneurial track record',
    difficulty: 'Challenging',
    summary: 'Builds innovative ventures from zero to one by uniting talent, vision, capital, and relentless execution.'
  },
  {
    id: 'accountant-auditor',
    title: 'Accountant & Financial Systems Auditor',
    field: 'Accounting & Finance',
    domainId: 'finance',
    weights: { R: 15, I: 60, A: 20, S: 30, E: 45, C: 98 },
    demandGrowth: '+12% YoY (Steady)',
    averageSalary: '$80,000 - $130,000',
    keySkills: ['Financial Modeling', 'GAAP / IFRS Compliance', 'Tax Law', 'Auditing Protocols', 'Excel & ERP Systems', 'Risk Assessment'],
    typicalWorkActivities: [
      'Preparing precision balance sheets, income statements, and cash flows',
      'Auditing corporate financial transactions for regulatory compliance',
      'Designing automated spreadsheet workflows and internal controls',
      'Advising leadership on tax optimization and risk mitigation'
    ],
    recommendedLearningPath: [
      'Stage 1: Principles of Financial & Managerial Accounting',
      'Stage 2: Corporate Taxation, GAAP Standards & Auditing',
      'Stage 3: Enterprise ERP Systems & Advanced Financial Modeling',
      'Stage 4: CPA / ACCA Certification & Forensic Audit'
    ],
    education: 'BS in Accounting, Finance, or Business Administration (CPA preferred)',
    difficulty: 'Challenging',
    summary: 'Maintains absolute financial integrity and systematic compliance through meticulous records analysis.'
  },
  {
    id: 'ai-engineer',
    title: 'AI & Machine Learning Engineer',
    field: 'Artificial Intelligence',
    domainId: 'comp-sci',
    weights: { R: 30, I: 96, A: 45, S: 25, E: 45, C: 80 },
    demandGrowth: '+42% YoY (Ultra High)',
    averageSalary: '$120,000 - $190,000',
    keySkills: ['PyTorch', 'LLMs & Prompt Systems', 'Vector Databases', 'Python', 'MLOps & Triton', 'FastAPI'],
    typicalWorkActivities: [
      'Architecting Retrieval-Augmented Generation (RAG) agent ecosystems',
      'Fine-tuning open-source foundation models on domain datasets',
      'Deploying low-latency inference endpoints on cloud GPU clusters',
      'Benchmarking model accuracy, latency, and token efficiency'
    ],
    recommendedLearningPath: [
      'Stage 1: Linear Algebra, Calculus & Python for Scientific Computing',
      'Stage 2: Deep Learning Topologies & PyTorch Framework',
      'Stage 3: LLM Engineering, LangChain & Vector Embeddings',
      'Stage 4: MLOps, Quantization & Production Model Scaling'
    ],
    education: 'BS/MS in Computer Science, Artificial Intelligence, or Applied Mathematics',
    difficulty: 'Challenging',
    summary: 'Builds intelligent agents, neural networks, and generative AI systems that solve complex automated reasoning tasks.'
  },
  {
    id: 'cybersecurity-analyst',
    title: 'Cybersecurity & Penetration Testing Specialist',
    field: 'Information Security',
    domainId: 'comp-sci',
    weights: { R: 45, I: 92, A: 25, S: 30, E: 45, C: 88 },
    demandGrowth: '+33% YoY (Very High)',
    averageSalary: '$105,000 - $160,000',
    keySkills: ['Network Security', 'Wireshark & Burp Suite', 'Ethical Hacking', 'Linux Hardening', 'SIEM & SOC Tools', 'Incident Response'],
    typicalWorkActivities: [
      'Executing simulated ethical penetration tests on cloud environments',
      'Auditing network packet streams and security logs for intrusion attempts',
      'Hardening Linux server clusters and configuring zero-trust firewalls',
      'Drafting incident mitigation reports and remediation roadmaps'
    ],
    recommendedLearningPath: [
      'Stage 1: Networking Fundamentals (TCP/IP, OSI) & Linux Administration',
      'Stage 2: Threat Detection, Cryptography & Security Operations',
      'Stage 3: Web Application Penetration Testing & OWASP Top 10',
      'Stage 4: Cloud Security, Red Team Operations & CISSP Prep'
    ],
    education: 'BS in Cybersecurity, Computer Networks, or Computer Science',
    difficulty: 'Challenging',
    summary: 'Defends digital infrastructure and discovers critical vulnerabilities through offensive and defensive security.'
  },
  {
    id: 'cloud-devops',
    title: 'Cloud Systems & DevOps Architect',
    field: 'Infrastructure & Cloud',
    domainId: 'comp-sci',
    weights: { R: 55, I: 85, A: 30, S: 35, E: 45, C: 85 },
    demandGrowth: '+29% YoY (Very High)',
    averageSalary: '$115,000 - $170,000',
    keySkills: ['Kubernetes & Docker', 'Terraform (IaC)', 'AWS / Google Cloud', 'CI/CD Pipelines', 'Prometheus & Grafana', 'Bash Scripting'],
    typicalWorkActivities: [
      'Authoring declarative Terraform scripts to automate cloud infrastructure',
      'Orchestrating microservices across resilient multi-node Kubernetes clusters',
      'Building zero-downtime automated deployment pipelines in GitHub Actions',
      'Configuring real-time telemetry, log aggregation, and automated alerting'
    ],
    recommendedLearningPath: [
      'Stage 1: Linux Command Line, Networking & Containerization (Docker)',
      'Stage 2: Cloud Core Services (AWS/GCP/Azure) & Networking',
      'Stage 3: Infrastructure as Code (Terraform) & Kubernetes Orchestration',
      'Stage 4: Site Reliability Engineering, Observability & Chaos Testing'
    ],
    education: 'Degree in Computer Science, Information Technology, or Cloud Certifications',
    difficulty: 'Challenging',
    summary: 'Engineers reliable, automated, auto-scaling cloud architectures and continuous integration pipelines.'
  },
  {
    id: 'product-manager',
    title: 'Digital Product Manager (PM)',
    field: 'Product Management',
    domainId: 'business',
    weights: { R: 25, I: 65, A: 60, S: 75, E: 92, C: 70 },
    demandGrowth: '+24% YoY (High)',
    averageSalary: '$110,000 - $165,000',
    keySkills: ['Product Strategy', 'Agile & Scrum', 'User Story Mapping', 'Data-Driven Decision Making', 'Cross-Team Alignment', 'Feature Prioritization'],
    typicalWorkActivities: [
      'Defining product vision, success metrics, and quarterly roadmaps',
      'Translating ambiguous business goals into granular engineering user stories',
      'Analyzing user funnel metrics to identify conversion bottlenecks',
      'Leading sprint retrospectives and unblocking cross-functional dependencies'
    ],
    recommendedLearningPath: [
      'Stage 1: Agile Methodologies, User Personas & Product Analytics',
      'Stage 2: Technical Literacy for PMs (APIs, Databases, Architecture)',
      'Stage 3: Business Models, Pricing & Go-To-Market Execution',
      'Stage 4: Executive Stakeholder Management & Multi-Product Portfolio'
    ],
    education: 'Bachelor in Business, Computer Science, Engineering, or MBA',
    difficulty: 'Moderate',
    summary: 'Steers products from concept to launch by uniting customer empathy, business strategy, and engineering execution.'
  },
  {
    id: 'financial-quant',
    title: 'Quantitative Financial Analyst',
    field: 'Quantitative Finance',
    domainId: 'finance',
    weights: { R: 15, I: 92, A: 20, S: 25, E: 70, C: 95 },
    demandGrowth: '+20% YoY (High)',
    averageSalary: '$125,000 - $210,000',
    keySkills: ['Stochastic Calculus', 'Python / C++', 'Algorithmic Trading', 'Time-Series Modeling', 'Risk Management', 'SQL'],
    typicalWorkActivities: [
      'Developing mathematical models to price complex derivatives',
      'Backtesting algorithmic trading strategies against tick-level historical data',
      'Optimizing portfolio asset allocations to maximize Sharpe ratio',
      'Ensuring strict compliance with capital risk exposure guidelines'
    ],
    recommendedLearningPath: [
      'Stage 1: Multivariable Calculus, Linear Algebra & Probability Theory',
      'Stage 2: Python / C++ for High-Performance Scientific Computing',
      'Stage 3: Financial Econometrics, Time-Series & Derivative Pricing',
      'Stage 4: Algorithmic Execution, Backtesting & Quantitative Risk'
    ],
    education: 'Bachelor or Master in Quantitative Finance, Mathematics, Physics, or CS',
    difficulty: 'Advanced',
    summary: 'Applies rigorous mathematical theory, statistics, and high-speed computing to financial markets and risk modeling.'
  }
];

export function calculateRIASECScores(responses: Record<number | string, number>): PersonalityResult {
  const rawScores: RIASECScore = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
  const questionCounts: RIASECScore = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };

  // Calculate raw scores based on question definitions
  RIASEC_48_QUESTIONS.forEach(q => {
    const answerVal = Number(responses[q.id]) || 3;
    const cat = q.category;
    rawScores[cat] += answerVal;
    questionCounts[cat] += 1;
  });

  // Calculate percentage: ((rawScore - 8) / 32) * 100
  // Clamped between 0 and 100
  const scores: RIASECScore = {
    R: Math.min(100, Math.max(0, Math.round(((rawScores.R - 8) / 32) * 100))),
    I: Math.min(100, Math.max(0, Math.round(((rawScores.I - 8) / 32) * 100))),
    A: Math.min(100, Math.max(0, Math.round(((rawScores.A - 8) / 32) * 100))),
    S: Math.min(100, Math.max(0, Math.round(((rawScores.S - 8) / 32) * 100))),
    E: Math.min(100, Math.max(0, Math.round(((rawScores.E - 8) / 32) * 100))),
    C: Math.min(100, Math.max(0, Math.round(((rawScores.C - 8) / 32) * 100)))
  };

  const getLevel = (score: number): RIASECInterpretationLevel => {
    if (score >= 80) return 'Very strong preference';
    if (score >= 60) return 'Strong preference';
    if (score >= 40) return 'Moderate preference';
    return 'Lower preference';
  };

  // Sort categories descending
  const categoriesList: RIASECCategoryKey[] = ['R', 'I', 'A', 'S', 'E', 'C'];
  const sortedCategories = [...categoriesList].sort((a, b) => {
    if (scores[b] !== scores[a]) return scores[b] - scores[a];
    return rawScores[b] - rawScores[a];
  });

  const dominantCode = `${sortedCategories[0]}${sortedCategories[1]}${sortedCategories[2]}`;
  const primaryKey = sortedCategories[0];
  const secondaryKey = sortedCategories[1];
  const tertiaryKey = sortedCategories[2];

  const primaryInterest = RIASEC_CATEGORIES_META[primaryKey].name;
  const secondaryInterest = RIASEC_CATEGORIES_META[secondaryKey].name;
  const tertiaryInterest = RIASEC_CATEGORIES_META[tertiaryKey].name;

  // Build category details for all 6 dimensions
  const categoryDetails: RIASECCategoryDetail[] = sortedCategories.map(catKey => {
    const meta = RIASEC_CATEGORIES_META[catKey];
    const scoreVal = scores[catKey];
    const rawVal = rawScores[catKey];
    return {
      code: catKey,
      name: meta.name,
      fullName: meta.fullName,
      icon: meta.icon,
      rawScore: rawVal,
      score: scoreVal,
      level: getLevel(scoreVal),
      badgeColor: meta.badgeColor,
      barColor: meta.barColor,
      description: meta.description,
      summary: meta.summary,
      workActivities: meta.workActivities,
      preferredEnvironments: meta.preferredEnvironments,
      sampleCareers: meta.sampleCareers
    };
  });

  // Synthesize personality description & strengths
  const primaryMeta = RIASEC_CATEGORIES_META[primaryKey];
  const secondaryMeta = RIASEC_CATEGORIES_META[secondaryKey];
  const tertiaryMeta = RIASEC_CATEGORIES_META[tertiaryKey];

  const personalityTitle = `The ${primaryMeta.name} ${secondaryMeta.name} ${
    tertiaryMeta.code === 'R'
      ? 'Builder'
      : tertiaryMeta.code === 'I'
      ? 'Strategist'
      : tertiaryMeta.code === 'A'
      ? 'Innovator'
      : tertiaryMeta.code === 'S'
      ? 'Mentor'
      : tertiaryMeta.code === 'E'
      ? 'Leader'
      : 'Architect'
  }`;

  const description = `Your answers reveal a natural inclination toward ${primaryInterest.toLowerCase()} inquiry and ${secondaryInterest.toLowerCase()} environments, reinforced by strong ${tertiaryInterest.toLowerCase()} preferences. You excel when working on challenging problems that allow you to combine structured thinking, creative insight, and purposeful execution.`;

  const strengths = [
    `Primary ${primaryMeta.name} strength: ${primaryMeta.strengths[0]}`,
    `Secondary ${secondaryMeta.name} capability: ${secondaryMeta.strengths[1] || secondaryMeta.strengths[0]}`,
    `Complementary ${tertiaryMeta.name} trait: ${tertiaryMeta.strengths[0]}`,
    'High adaptability across dynamic, multidisciplinary technical problem domains'
  ];

  const workStyle = `A balanced blend of deep-focus analytical work (${primaryInterest}) supported by ${secondaryInterest.toLowerCase()} organization and active ${tertiaryInterest.toLowerCase()} collaboration.`;

  // Career Matching Logic:
  // Calculate similarity between student's 6 RIASEC scores and each career's 6 RIASEC weights
  const recommendations: CareerRecommendation[] = CAREER_PROFILES.map(career => {
    const cw = career.weights;
    // Euclidean distance in 6D space
    const diffR = scores.R - cw.R;
    const diffI = scores.I - cw.I;
    const diffA = scores.A - cw.A;
    const diffS = scores.S - cw.S;
    const diffE = scores.E - cw.E;
    const diffC = scores.C - cw.C;

    const distance = Math.sqrt(
      diffR * diffR +
      diffI * diffI +
      diffA * diffA +
      diffS * diffS +
      diffE * diffE +
      diffC * diffC
    );

    // Max theoretical distance = sqrt(6 * 100^2) ≈ 244.95
    // Normalize to 0-100 percentage with realistic curve
    const maxDist = 245;
    const rawSim = Math.max(0, 1 - distance / (maxDist * 0.72));
    let matchScore = Math.round(rawSim * 100);

    // Bonus for sharing primary or secondary interest
    const topCareerKeys = (['R', 'I', 'A', 'S', 'E', 'C'] as RIASECCategoryKey[]).sort(
      (a, b) => cw[b] - cw[a]
    );
    if (topCareerKeys[0] === primaryKey) matchScore += 4;
    if (topCareerKeys[1] === secondaryKey) matchScore += 2;

    // Clamp matchScore between 45 and 98
    matchScore = Math.min(98, Math.max(45, matchScore));

    // Build personalized "Why this matches" bullet points
    const whyMatches: string[] = [];
    if (scores[topCareerKeys[0]] >= 60) {
      whyMatches.push(`Strong ${RIASEC_CATEGORIES_META[topCareerKeys[0]].name} interest (${scores[topCareerKeys[0]]}%) matches the core analytical demands`);
    }
    if (scores[topCareerKeys[1]] >= 50) {
      whyMatches.push(`Strong ${RIASEC_CATEGORIES_META[topCareerKeys[1]].name} alignment (${scores[topCareerKeys[1]]}%) fits the daily work environment`);
    }
    whyMatches.push(`High enjoyment of ${topCareerKeys[0] === 'I' ? 'analytical problem-solving and investigation' : topCareerKeys[0] === 'R' ? 'practical technology and engineering' : topCareerKeys[0] === 'A' ? 'creative innovation and design' : topCareerKeys[0] === 'S' ? 'collaboration and mentoring' : topCareerKeys[0] === 'E' ? 'leadership and strategic initiatives' : 'organized planning and precision'}`);
    whyMatches.push(`Strong alignment with ${career.field} industry skill trajectory`);

    return {
      careerId: career.id,
      title: career.title,
      field: career.field,
      domainId: career.domainId,
      matchScore,
      reason: whyMatches[0] || career.summary,
      demandGrowth: career.demandGrowth,
      averageSalary: career.averageSalary,
      keySkills: career.keySkills,
      whyMatches,
      typicalWorkActivities: career.typicalWorkActivities,
      recommendedLearningPath: career.recommendedLearningPath,
      riasecWeights: career.weights,
      education: career.education,
      difficulty: career.difficulty
    };
  })
    // Sort careers by match score descending
    .sort((a, b) => b.matchScore - a.matchScore)
    // Take top 6-8 recommendations
    .slice(0, 8);

  const recommendedDomain = recommendations[0]?.domainId || 'comp-sci';
  const recommendedField = recommendations[0]?.field || 'Software Engineering';

  return {
    userId: 'current_student',
    assessmentId: 'riasec_career_interest_48',
    scores,
    rawScores,
    dominantCode,
    primaryInterest,
    secondaryInterest,
    tertiaryInterest,
    personalityTitle,
    description,
    strengths,
    workStyle,
    recommendedDomain,
    recommendedField,
    categoryDetails,
    recommendations,
    responses,
    completedAt: new Date().toISOString()
  };
}
