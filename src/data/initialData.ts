import { DomainCategory, RIASECQuestion, CareerEvent, TechNewsItem, InternshipItem, JobListing, PlacementQuestion, RoadmapStage, DailyTask, ProjectItem } from '../types';

export const DOMAINS: DomainCategory[] = [
  {
    id: 'comp-sci',
    name: 'Computer Science',
    icon: 'Terminal',
    description: 'Design algorithms, architecture, intelligence systems, and cutting-edge software platforms shaping our digital world.',
    color: '#3b82f6',
    popularCareers: ['Full Stack Developer', 'AI Engineer', 'Data Scientist', 'Cybersecurity Engineer', 'Cloud Architect', 'Mobile App Developer'],
    requiredSkills: ['Algorithms & Data Structures', 'Modern JavaScript/TypeScript', 'Python', 'System Architecture', 'Database Systems', 'Cloud & DevOps'],
    careerGrowth: '+26% (Very High)',
    difficulty: 'Moderate',
    educationRequirement: 'B.Tech/BS in CS, BCA, or equivalent self-paced degree',
    careers: [
      {
        id: 'fullstack-dev',
        title: 'Full Stack Developer',
        field: 'Software Development',
        domainId: 'comp-sci',
        description: 'Build complete web and cloud software architectures from dynamic frontends to scalable backend microservices and databases.',
        skillsRequired: ['React', 'TypeScript', 'Node.js/FastAPI', 'PostgreSQL', 'Docker', 'REST & GraphQL APIs', 'Tailwind CSS'],
        learningDuration: '6 - 9 Months',
        averageDifficulty: 'Intermediate',
        growthRate: '+24% YoY',
        avgSalary: '$95,000 - $145,000',
        typicalProjects: ['Full-Stack E-Commerce SaaS', 'Real-Time AI Collaborative Canvas', 'Student Task & Learning Management System', 'Microservices API Gateway'],
        internshipRoles: ['Full Stack Engineering Intern', 'Web Platform Intern', 'Frontend Systems Intern'],
        jobRoles: ['Junior Full Stack Engineer', 'Full Stack Developer', 'Software Engineer II', 'Tech Lead'],
        recommendedEducation: 'Bachelor in Computer Science, Information Science, or Software Engineering',
        color: '#3b82f6',
        position3D: [0, 2.5, 0],
      },
      {
        id: 'ai-engineer',
        title: 'AI & Machine Learning Engineer',
        field: 'Artificial Intelligence',
        domainId: 'comp-sci',
        description: 'Design neural networks, LLM agent architectures, computer vision pipelines, and deploy inference systems.',
        skillsRequired: ['Python', 'PyTorch/TensorFlow', 'LLMs & Prompt Engineering', 'LangChain', 'Vector DBs', 'FastAPI', 'Math & Statistics'],
        learningDuration: '8 - 12 Months',
        averageDifficulty: 'Advanced',
        growthRate: '+38% YoY',
        avgSalary: '$115,000 - $180,000',
        typicalProjects: ['RAG Knowledge Assistant', 'Autonomous Multi-Agent Researcher', 'Real-Time Computer Vision Detector', 'AI Voice Transcription Engine'],
        internshipRoles: ['AI Research Intern', 'ML Applied Engineering Intern', 'Data Science Intern'],
        jobRoles: ['Associate AI Engineer', 'Machine Learning Engineer', 'AI Platform Architect'],
        recommendedEducation: 'BS/MS in CS, Data Science, or Mathematics',
        color: '#8b5cf6',
        position3D: [2.5, 1.2, 0],
      },
      {
        id: 'data-scientist',
        title: 'Data Scientist & Analytics Architect',
        field: 'Data & Analytics',
        domainId: 'comp-sci',
        description: 'Extract statistical insights, model business trends, train predictive machine learning models, and build visual dashboards.',
        skillsRequired: ['Python', 'Pandas & NumPy', 'SQL/Snowflake', 'Scikit-Learn', 'PowerBI/Tableau', 'Statistical Hypothesis Testing'],
        learningDuration: '6 - 10 Months',
        averageDifficulty: 'Intermediate',
        growthRate: '+28% YoY',
        avgSalary: '$100,000 - $150,000',
        typicalProjects: ['Customer Churn Predictive Pipeline', 'Financial Fraud Anomaly Detection', 'Market Sentiment Dashboard', 'A/B Experimentation Engine'],
        internshipRoles: ['Data Analytics Intern', 'Business Intelligence Intern', 'Quantitative Analytics Intern'],
        jobRoles: ['Data Analyst', 'Data Scientist', 'Senior Analytics Engineer'],
        recommendedEducation: 'Degree in Statistics, CS, or Applied Mathematics',
        color: '#06b6d4',
        position3D: [2.0, -1.8, 1.2],
      },
      {
        id: 'cybersecurity-eng',
        title: 'Cybersecurity & Pentesting Engineer',
        field: 'Information Security',
        domainId: 'comp-sci',
        description: 'Protect enterprise infrastructure, execute vulnerability assessments, detect threats, and configure cryptosystems.',
        skillsRequired: ['Network Protocols (TCP/IP, OSI)', 'Linux Hardening', 'Wireshark & Burp Suite', 'Ethical Hacking', 'OWASP Top 10', 'SIEM Tools'],
        learningDuration: '7 - 11 Months',
        averageDifficulty: 'Advanced',
        growthRate: '+32% YoY',
        avgSalary: '$105,000 - $160,000',
        typicalProjects: ['Web Vulnerability Scanner', 'Zero Trust Network Simulation', 'Automated Penetration Test Suite', 'Encrypted Secure Vault API'],
        internshipRoles: ['SOC Analyst Intern', 'Security Engineering Intern', 'Vulnerability Assessment Trainee'],
        jobRoles: ['Junior Security Analyst', 'Cybersecurity Specialist', 'Penetration Tester', 'SecOps Lead'],
        recommendedEducation: 'BS in Cybersecurity, Computer Networks, or CS',
        color: '#ef4444',
        position3D: [-2.2, 1.5, 1.0],
      },
      {
        id: 'cloud-devops',
        title: 'Cloud & DevOps Architect',
        field: 'Infrastructure & Cloud',
        domainId: 'comp-sci',
        description: 'Automate continuous deployment pipelines, manage Kubernetes clusters, provision multi-cloud systems with Terraform.',
        skillsRequired: ['Docker & Kubernetes', 'AWS / Google Cloud', 'Terraform & IaC', 'GitHub Actions CI/CD', 'Prometheus & Grafana', 'Linux Shell'],
        learningDuration: '6 - 9 Months',
        averageDifficulty: 'Intermediate',
        growthRate: '+27% YoY',
        avgSalary: '$110,000 - $165,000',
        typicalProjects: ['Zero-Downtime Microservices Pipeline', 'Multi-Region Kubernetes Auto-Scaler', 'Infrastructure as Code Cloud Fleet', 'Automated Disaster Recovery Engine'],
        internshipRoles: ['DevOps Intern', 'Cloud Support Intern', 'Site Reliability Intern'],
        jobRoles: ['Junior DevOps Engineer', 'Site Reliability Engineer (SRE)', 'Cloud Architect'],
        recommendedEducation: 'Degree in CS, Cloud Computing, or IT Systems',
        color: '#10b981',
        position3D: [-2.0, -1.5, -1.0],
      },
      {
        id: 'mobile-dev',
        title: 'Mobile Application Engineer',
        field: 'Mobile Development',
        domainId: 'comp-sci',
        description: 'Craft native and cross-platform mobile experiences for iOS and Android with smooth animations and offline sync.',
        skillsRequired: ['React Native / Flutter', 'Swift / Kotlin', 'Mobile UX Patterns', 'Local SQLite & Room', 'Push Notifications & App Store CI'],
        learningDuration: '5 - 8 Months',
        averageDifficulty: 'Intermediate',
        growthRate: '+20% YoY',
        avgSalary: '$90,000 - $138,000',
        typicalProjects: ['Fitness & Workout Tracker App', 'Peer-to-Peer Marketplace App', 'Offline First Smart Notes', 'Social Media Audio Rooms'],
        internshipRoles: ['Mobile App Intern', 'iOS/Android Trainee', 'React Native Intern'],
        jobRoles: ['Mobile Developer', 'iOS Engineer', 'Android Engineer', 'Lead Mobile Architect'],
        recommendedEducation: 'BS in CS, Software Engineering, or Mobile Computing',
        color: '#f59e0b',
        position3D: [0, -2.5, 0.8],
      }
    ]
  },
  {
    id: 'eng-tech',
    name: 'Engineering & Technology',
    icon: 'Cpu',
    description: 'Pioneer robotics, embedded microcontrollers, renewable energy grids, mechanical innovations, and aerospace systems.',
    color: '#6366f1',
    popularCareers: ['Robotics Engineer', 'Embedded Systems Developer', 'Electrical Grid Specialist', 'Renewable Energy Engineer', 'Aerospace Avionics'],
    requiredSkills: ['Circuit Design & Simulation', 'C/C++ & MicroPython', 'CAD Modeling (SolidWorks/AutoCAD)', 'Thermodynamics & Control Theory', 'MATLAB/Simulink'],
    careerGrowth: '+18% (High)',
    difficulty: 'Challenging',
    educationRequirement: 'B.E./B.Tech in Mechanical, Electrical, Mechatronics, or Electronics',
    careers: [
      {
        id: 'robotics-eng',
        title: 'Robotics & Automation Engineer',
        field: 'Mechatronics',
        domainId: 'eng-tech',
        description: 'Design autonomous robots, kinematics controllers, sensor fusion networks, and industrial automated manufacturing arms.',
        skillsRequired: ['ROS2 (Robot Operating System)', 'C++', 'Python', 'Kinematics & Dynamics', 'Sensors (LiDAR, IMU, Cameras)', 'Embedded Linux'],
        learningDuration: '9 - 14 Months',
        averageDifficulty: 'Advanced',
        growthRate: '+25% YoY',
        avgSalary: '$100,000 - $155,000',
        typicalProjects: ['Autonomous Mobile Robot Navigation', '6-DOF Robotic Arm Inverse Kinematics Controller', 'Drone Obstacle Avoidance System'],
        internshipRoles: ['Robotics Hardware Intern', 'Control Systems Intern', 'Automation Test Trainee'],
        jobRoles: ['Robotics Engineer', 'Autonomous Systems Developer', 'Mechatronics Specialist'],
        recommendedEducation: 'B.Tech/MS in Robotics, Mechatronics, or Electrical Engineering',
        color: '#6366f1',
        position3D: [1.8, 2.0, 0],
      },
      {
        id: 'embedded-eng',
        title: 'Embedded Systems & IoT Architect',
        field: 'Hardware & IoT',
        domainId: 'eng-tech',
        description: 'Program low-level microcontrollers (ARM, ESP32, STM32), real-time operating systems (FreeRTOS), and IoT telemetry devices.',
        skillsRequired: ['Embedded C', 'STM32 / ESP32', 'FreeRTOS', 'SPI / I2C / UART protocols', 'PCB Design in KiCAD', 'BLE & MQTT'],
        learningDuration: '7 - 10 Months',
        averageDifficulty: 'Advanced',
        growthRate: '+21% YoY',
        avgSalary: '$95,000 - $140,000',
        typicalProjects: ['Smart Industrial IoT Sensor Gateway', 'Wearable Health Monitor Firmware', 'Automotive CAN-Bus Telemetry Logger'],
        internshipRoles: ['Embedded Firmware Intern', 'Hardware Validation Intern', 'IoT Systems Trainee'],
        jobRoles: ['Firmware Engineer', 'Embedded Software Engineer', 'IoT Device Architect'],
        recommendedEducation: 'Degree in Electrical & Electronics or Computer Engineering',
        color: '#4f46e5',
        position3D: [-1.8, -1.8, 1.2],
      }
    ]
  },
  {
    id: 'commerce-finance',
    name: 'Commerce & Finance',
    icon: 'TrendingUp',
    description: 'Master quantitative markets, fintech algorithmic protocols, corporate valuation, investment banking, and accounting intelligence.',
    color: '#10b981',
    popularCareers: ['Financial Analyst', 'FinTech Solutions Architect', 'Investment Banking Analyst', 'Quantitative Trader', 'Risk Management Director'],
    requiredSkills: ['Financial Modeling & DCF Valuation', 'Python for Finance (Quant)', 'SQL & PowerBI', 'Corporate Accounting', 'Portfolio Optimization'],
    careerGrowth: '+15% (Steady & Lucrative)',
    difficulty: 'Moderate',
    educationRequirement: 'B.Com, BBA Finance, CFA, or BS in Quantitative Economics',
    careers: [
      {
        id: 'fin-analyst',
        title: 'Financial Analyst & Valuation Specialist',
        field: 'Corporate Finance',
        domainId: 'commerce-finance',
        description: 'Evaluate business balance sheets, construct predictive financial models, forecast revenue multiples, and advise M&A transactions.',
        skillsRequired: ['Financial Modeling', 'Excel Macros & VBA', 'Corporate Finance', 'Valuation Methodologies', 'SQL', 'Bloomberg Terminal basics'],
        learningDuration: '6 - 9 Months',
        averageDifficulty: 'Intermediate',
        growthRate: '+16% YoY',
        avgSalary: '$85,000 - $135,000',
        typicalProjects: ['3-Statement Discounted Cash Flow Valuation', 'LBO M&A Acquisition Analysis', 'Quarterly Corporate Earnings Dashboard'],
        internshipRoles: ['Financial Advisory Intern', 'Equity Research Analyst Intern', 'Valuation Trainee'],
        jobRoles: ['Junior Financial Analyst', 'Equity Research Associate', 'Investment Banking Analyst'],
        recommendedEducation: 'B.Com / BBA / Economics / CFA Charterholder track',
        color: '#10b981',
        position3D: [2.2, 0, 1.5],
      },
      {
        id: 'fintech-dev',
        title: 'Fintech & Algorithmic Trading Developer',
        field: 'Quantitative Finance',
        domainId: 'commerce-finance',
        description: 'Build algorithmic trading bots, automated settlement gateways, risk hedging engines, and DeFi protocols.',
        skillsRequired: ['Python', 'Pandas & NumPy', 'Backtesting Frameworks (Backtrader)', 'Financial APIs', 'C++ for Low Latency', 'Time Series Forecasting'],
        learningDuration: '8 - 12 Months',
        averageDifficulty: 'Advanced',
        growthRate: '+29% YoY',
        avgSalary: '$120,000 - $190,000',
        typicalProjects: ['High-Frequency Backtesting Engine', 'Automated Crypto Arbitrage Bot', 'Credit Risk Scoring Engine'],
        internshipRoles: ['Quantitative Research Intern', 'Fintech Platform Intern'],
        jobRoles: ['Quant Developer', 'Fintech Software Engineer', 'Algorithmic Strategist'],
        recommendedEducation: 'Quantitative Finance, CS, or Applied Mathematics',
        color: '#059669',
        position3D: [-2.0, 1.2, -1.0],
      }
    ]
  },
  {
    id: 'biz-management',
    name: 'Business & Management',
    icon: 'Briefcase',
    description: 'Steer enterprise product roadmaps, lead agile teams, drive venture strategy, and orchestrate global supply chain ecosystems.',
    color: '#f59e0b',
    popularCareers: ['Product Manager', 'Management Consultant', 'Growth Marketing Strategist', 'Operations & Supply Chain Lead', 'Venture Capital Associate'],
    requiredSkills: ['Product Strategy & Roadmapping', 'User Research & Metrics (AARRR)', 'Agile/Scrum Leadership', 'Stakeholder Communication', 'Financial Forecasting'],
    careerGrowth: '+19% (High Demand)',
    difficulty: 'Moderate',
    educationRequirement: 'BBA, MBA, Engineering + Management, or Economics',
    careers: [
      {
        id: 'product-manager',
        title: 'Product Manager (Tech & AI)',
        field: 'Product Management',
        domainId: 'biz-management',
        description: 'Lead the vision, strategy, design requirements, and launch lifecycle of digital technology products that solve user pain points.',
        skillsRequired: ['Product Roadmapping (Jira/Linear)', 'User Journey Mapping', 'A/B Testing & Data Analytics', 'SQL & Wireframing', 'Agile Scrum Leadership'],
        learningDuration: '5 - 8 Months',
        averageDifficulty: 'Intermediate',
        growthRate: '+22% YoY',
        avgSalary: '$105,000 - $160,000',
        typicalProjects: ['Comprehensive Product PRD & User Flows', 'Feature Launch Growth Strategy', 'AI Feature Spec & Usability Metrics'],
        internshipRoles: ['Associate Product Manager Intern', 'Product Operations Intern', 'UX Strategy Trainee'],
        jobRoles: ['Associate Product Manager (APM)', 'Product Manager', 'Senior PM', 'VP of Product'],
        recommendedEducation: 'Any Bachelor Degree + Product Certification / MBA',
        color: '#f59e0b',
        position3D: [0, 2.2, -1.8],
      }
    ]
  },
  {
    id: 'design-creative',
    name: 'Design & Creative Arts',
    icon: 'Palette',
    description: 'Shape human-computer interfaces, design motion branding, create 3D worlds, game experiences, and design systems.',
    color: '#ec4899',
    popularCareers: ['UI/UX Product Designer', '3D Motion & Game Artist', 'Design Systems Architect', 'Brand Identity Director', 'AR/VR Spatial Designer'],
    requiredSkills: ['Figma & Component Design Systems', 'User Research & Usability Testing', 'Wireframing & Prototyping', 'Typography & Color Theory', 'Micro-interactions'],
    careerGrowth: '+17% (High)',
    difficulty: 'Moderate',
    educationRequirement: 'B.Des, Fine Arts, Visual Communication, or Self-Taught Portfolio',
    careers: [
      {
        id: 'ui-ux-designer',
        title: 'UI/UX & Product Designer',
        field: 'Digital Product Design',
        domainId: 'design-creative',
        description: 'Conduct user research, synthesize wireframes, build interactive Figma prototypes, and establish scalable design systems.',
        skillsRequired: ['Figma & FigJam', 'Design Systems & Tokens', 'Interaction Design & Micro-animations', 'User Journey Mapping', 'Usability Testing'],
        learningDuration: '4 - 7 Months',
        averageDifficulty: 'Beginner',
        growthRate: '+20% YoY',
        avgSalary: '$85,000 - $130,000',
        typicalProjects: ['Complete Mobile Banking Redesign', 'SaaS Analytics Design System (100+ components)', 'Accessible Healthcare Mobile Interface'],
        internshipRoles: ['UI/UX Design Intern', 'Product Design Trainee', 'Visual Design Intern'],
        jobRoles: ['Junior UX Designer', 'Product Designer', 'Lead UI/UX Architect'],
        recommendedEducation: 'Bachelor of Design (B.Des) or strong portfolio',
        color: '#ec4899',
        position3D: [1.8, -1.2, 1.8],
      }
    ]
  },
  {
    id: 'med-healthcare',
    name: 'Medicine & Healthcare',
    icon: 'Activity',
    description: 'Transform clinical therapies, health informatics, telemedicine systems, genomic research, and medical robotics.',
    color: '#14b8a6',
    popularCareers: ['Bioinformatics Scientist', 'Health Informatics Specialist', 'Clinical Research Associate', 'Biomedical Engineer', 'Telehealth Systems Lead'],
    requiredSkills: ['Biomedical Data Analysis', 'Python & R for Genomics', 'Clinical Trial Protocols', 'HIPAA Compliance & EHR Systems', 'Biostatistics'],
    careerGrowth: '+22% (Critical Demand)',
    difficulty: 'Challenging',
    educationRequirement: 'MBBS, B.Pharm, B.Tech Bioinformatics, or BS Health Sciences',
    careers: [
      {
        id: 'health-informatics',
        title: 'Health Informatics & AI Specialist',
        field: 'Digital Health',
        domainId: 'med-healthcare',
        description: 'Bridge medical science and software systems to build electronic health records, diagnostic assistance models, and clinical pipelines.',
        skillsRequired: ['EHR/EMR Standards (FHIR, HL7)', 'Python & Pandas', 'Medical Image Processing', 'Healthcare Privacy (HIPAA)', 'SQL & Biostats'],
        learningDuration: '7 - 11 Months',
        averageDifficulty: 'Advanced',
        growthRate: '+24% YoY',
        avgSalary: '$90,000 - $142,000',
        typicalProjects: ['FHIR Medical Records Interoperability API', 'Diagnostic X-Ray Anomaly Classifier', 'Patient Vitals Real-Time Monitor'],
        internshipRoles: ['Healthcare Data Intern', 'Clinical Informatics Trainee'],
        jobRoles: ['Health Data Analyst', 'Health Informatics Specialist', 'Clinical Systems Director'],
        recommendedEducation: 'Bioinformatics, Health Sciences, or CS with Bio minor',
        color: '#14b8a6',
        position3D: [-2.0, 0.5, 2.0],
      }
    ]
  },
  {
    id: 'info-tech',
    name: 'Information Technology',
    icon: 'Server',
    description: 'Deploy enterprise networks, database clusters, virtualization environments, and global IT infrastructure.',
    color: '#0284c7',
    popularCareers: ['IT Systems Administrator', 'Database Administrator', 'Network Solutions Architect', 'Enterprise Solutions Consultant'],
    requiredSkills: ['Cisco CCNA/Networking', 'Linux & Windows Server', 'SQL Server & Oracle DB', 'Active Directory', 'Virtualization (VMware/Hyper-V)'],
    careerGrowth: '+14% (Stable)',
    difficulty: 'Beginner',
    educationRequirement: 'BCA, B.Sc IT, B.Tech IT, or Industry Certifications',
    careers: [
      {
        id: 'sysadmin',
        title: 'IT Systems & Network Administrator',
        field: 'Enterprise Systems',
        domainId: 'info-tech',
        description: 'Configure corporate networks, maintain servers, manage firewalls, user directories, and ensure 99.99% uptime.',
        skillsRequired: ['Linux / Bash', 'Cisco Switching & Routing', 'DNS/DHCP/VPN', 'Active Directory / Okta', 'Virtualization'],
        learningDuration: '4 - 7 Months',
        averageDifficulty: 'Beginner',
        growthRate: '+12% YoY',
        avgSalary: '$75,000 - $115,000',
        typicalProjects: ['Enterprise Active Directory Domain Setup', 'Automated Server Patching Suite', 'Secure Multi-VLAN Corporate Network'],
        internshipRoles: ['IT Support Intern', 'Junior Network Admin Trainee'],
        jobRoles: ['Systems Administrator', 'Network Engineer', 'IT Operations Manager'],
        recommendedEducation: 'Degree in Information Technology or Network Certifications',
        color: '#0284c7',
        position3D: [1.2, -2.2, -1.2],
      }
    ]
  },
  {
    id: 'science-research',
    name: 'Science & Research',
    icon: 'Microscope',
    description: 'Investigate fundamental physics, synthetic biology, nanotechnology, environmental modeling, and quantum computation.',
    color: '#8b5cf6',
    popularCareers: ['Quantum Computing Researcher', 'Computational Biologist', 'Materials Scientist', 'Environmental Data Modeler'],
    requiredSkills: ['Scientific Computing (SciPy/NumPy)', 'Quantum Circuits (Qiskit)', 'Lab Instrumentation & Protocols', 'Statistical Modeling', 'Academic Writing'],
    careerGrowth: '+15%',
    difficulty: 'Challenging',
    educationRequirement: 'B.Sc, M.Sc, Ph.D. in Physics, Chemistry, Biology, or Mathematics',
    careers: [
      {
        id: 'quantum-researcher',
        title: 'Quantum Computing Algorithm Scientist',
        field: 'Quantum Physics & CS',
        domainId: 'science-research',
        description: 'Design quantum algorithms (Shor, Grover, VQE), simulate quantum states on NISQ hardware, and explore error-mitigation protocols.',
        skillsRequired: ['Quantum Mechanics', 'Qiskit / Cirq', 'Linear Algebra', 'Python & C++', 'Quantum Error Correction'],
        learningDuration: '10 - 16 Months',
        averageDifficulty: 'Advanced',
        growthRate: '+30% YoY',
        avgSalary: '$120,000 - $185,000',
        typicalProjects: ['Variational Quantum Eigensolver for Molecular Simulation', 'Quantum Key Distribution Simulator', 'Quantum Teleportation Protocol'],
        internshipRoles: ['Quantum Software Intern', 'Scientific Computing Trainee'],
        jobRoles: ['Quantum Algorithm Developer', 'Research Scientist', 'Quantum Systems Lead'],
        recommendedEducation: 'Physics, CS, or Applied Mathematics with Quantum coursework',
        color: '#8b5cf6',
        position3D: [0, 0, 2.5],
      }
    ]
  },
  {
    id: 'law-justice',
    name: 'Law & Governance',
    icon: 'Scale',
    description: 'Specialize in cyber law, corporate intellectual property, privacy litigation, international trade compliance, and legal tech.',
    color: '#d97706',
    popularCareers: ['Cyber & Tech Law Counsel', 'Corporate IP Attorney', 'Data Privacy Officer (GDPR/CCPA)', 'Legal Tech Solutions Consultant'],
    requiredSkills: ['Contract Law & Drafting', 'Cybercrime Jurisprudence', 'Intellectual Property Protection', 'Regulatory Compliance', 'Legal Case Research'],
    careerGrowth: '+13%',
    difficulty: 'Moderate',
    educationRequirement: 'LL.B, B.A. LL.B, or Juris Doctor (JD)',
    careers: [
      {
        id: 'cyber-lawyer',
        title: 'Cyber & Privacy Legal Counsel',
        field: 'Technology Law',
        domainId: 'law-justice',
        description: 'Advise startups and enterprises on data privacy laws (GDPR/DPDP), AI ethics compliance, SaaS terms, and cyber breaches.',
        skillsRequired: ['Data Privacy Law', 'Software Licensing (Open Source & SaaS)', 'AI Regulation & Compliance', 'Incident Response Legalities', 'Case Briefing'],
        learningDuration: '6 - 10 Months',
        averageDifficulty: 'Intermediate',
        growthRate: '+20% YoY',
        avgSalary: '$95,000 - $155,000',
        typicalProjects: ['Enterprise AI & Privacy Compliance Framework', 'Cross-Border SaaS Master Services Agreement', 'Cyber Incident Breach Protocol'],
        internshipRoles: ['Legal Intern (Tech Practice)', 'Privacy Policy Trainee'],
        jobRoles: ['Associate Legal Counsel', 'Data Privacy Officer', 'Senior Tech Counsel'],
        recommendedEducation: 'LL.B or Law Degree with Cyber/IP specialization',
        color: '#d97706',
        position3D: [-1.2, 2.2, -1.5],
      }
    ]
  },
  {
    id: 'arts-humanities',
    name: 'Arts & Humanities',
    icon: 'BookOpen',
    description: 'Enrich global culture through interactive storytelling, digital journalism, philosophical ethics, and digital media production.',
    color: '#a855f7',
    popularCareers: ['Technical Writer & Content Strategist', 'Game Narrative Designer', 'Digital Archivist', 'UX Writer & Content Architect'],
    requiredSkills: ['Creative & Technical Writing', 'Information Architecture', 'Editorial Strategy', 'Content Management Systems', 'Cultural Research'],
    careerGrowth: '+11%',
    difficulty: 'Beginner',
    educationRequirement: 'B.A. in English, Journalism, Philosophy, History, or Literature',
    careers: [
      {
        id: 'tech-writer',
        title: 'Technical Writer & API Documentation Architect',
        field: 'Technical Communications',
        domainId: 'arts-humanities',
        description: 'Translate intricate engineering code, developer APIs, and cloud concepts into crystal-clear documentation and interactive guides.',
        skillsRequired: ['Markdown & Docs-as-Code (Git)', 'API Documentation (Swagger/OpenAPI)', 'Docusaurus/Sphinx', 'Developer Usability', 'Grammar & Clarity'],
        learningDuration: '4 - 6 Months',
        averageDifficulty: 'Beginner',
        growthRate: '+15% YoY',
        avgSalary: '$80,000 - $125,000',
        typicalProjects: ['Full Developer API Reference Portal', 'Interactive CLI Getting Started Guide', 'Cloud Deployment Troubleshooting Bible'],
        internshipRoles: ['Technical Content Intern', 'Developer Docs Trainee'],
        jobRoles: ['Junior Technical Writer', 'API Documentation Specialist', 'Lead Content Architect'],
        recommendedEducation: 'Humanities, English, Communications, or CS minor',
        color: '#a855f7',
        position3D: [2.0, -1.0, -1.8],
      }
    ]
  },
  {
    id: 'education-teaching',
    name: 'Education & EdTech',
    icon: 'GraduationCap',
    description: 'Revolutionize modern pedagogy, instructional design systems, AI tutoring platforms, and STEM curricula.',
    color: '#059669',
    popularCareers: ['Instructional Designer', 'EdTech Product Specialist', 'Corporate Learning & Development Manager', 'STEM Curriculum Developer'],
    requiredSkills: ['Curriculum Design (ADDIE Model)', 'Learning Management Systems (Canvas/Moodle)', 'Gamification & Engagement', 'Assessment Creation'],
    careerGrowth: '+14%',
    difficulty: 'Beginner',
    educationRequirement: 'B.Ed, Master in Education, Instructional Design, or Subject Degree',
    careers: [
      {
        id: 'instructional-designer',
        title: 'EdTech Instructional Designer',
        field: 'Instructional Engineering',
        domainId: 'education-teaching',
        description: 'Design immersive digital courses, interactive quizzes, adaptive learning pathways, and multimedia educational simulations.',
        skillsRequired: ['ADDIE & Bloom Taxonomy', 'Articulate 360 / Storyline', 'LMS Platforms', 'Micro-Learning Principles', 'Video Lesson Production'],
        learningDuration: '4 - 7 Months',
        averageDifficulty: 'Beginner',
        growthRate: '+18% YoY',
        avgSalary: '$78,000 - $120,000',
        typicalProjects: ['Interactive Coding Bootcamp Curriculum', 'Corporate Security Gamified Onboarding Module', 'Adaptive Math Mastery Simulator'],
        internshipRoles: ['Curriculum Development Intern', 'EdTech Content Trainee'],
        jobRoles: ['Instructional Designer', 'Learning Experience Designer (LXD)', 'Director of Curriculum'],
        recommendedEducation: 'Education, Psychology, Communications, or EdTech certification',
        color: '#059669',
        position3D: [-1.5, -2.0, -1.5],
      }
    ]
  },
  {
    id: 'media-comms',
    name: 'Media & Communication',
    icon: 'Video',
    description: 'Broadcast digital narratives, direct podcast productions, execute social growth campaigns, and orchestrate brand PR.',
    color: '#e11d48',
    popularCareers: ['Digital Media Producer', 'Public Relations Strategist', 'Podcast & Audio Engineer', 'Brand Communications Director'],
    requiredSkills: ['Video Editing (Premiere/DaVinci)', 'Storyboarding & Production', 'Social Media Analytics', 'Media Ethics & Press Relations', 'Audio Engineering'],
    careerGrowth: '+12%',
    difficulty: 'Beginner',
    educationRequirement: 'B.A. Mass Communication, Media Studies, or Film & Digital Arts',
    careers: [
      {
        id: 'digital-media-producer',
        title: 'Digital Media & Tech Producer',
        field: 'Digital Broadcasting',
        domainId: 'media-comms',
        description: 'Produce high-production tech journalism videos, podcasts, interactive webinars, and viral educational content.',
        skillsRequired: ['Premiere Pro / After Effects', 'Audio Mastering (Audition)', 'Storyboarding & Scriptwriting', 'YouTube SEO & Growth Algorithms', 'Camera & Lighting'],
        learningDuration: '4 - 7 Months',
        averageDifficulty: 'Beginner',
        growthRate: '+16% YoY',
        avgSalary: '$75,000 - $118,000',
        typicalProjects: ['10-Part Tech Documentary Mini-Series', 'Weekly Developer Tech Podcast Show', 'Brand Product Launch Showcase Reel'],
        internshipRoles: ['Video Production Intern', 'Media Content Trainee'],
        jobRoles: ['Media Producer', 'Creative Content Lead', 'Head of Video Production'],
        recommendedEducation: 'Mass Media, Film Production, or Digital Arts',
        color: '#e11d48',
        position3D: [0, -1.8, -2.2],
      }
    ]
  }
];

export const RIASEC_QUESTIONS: RIASECQuestion[] = [
  {
    id: 1,
    question: 'When starting a new project, which activity makes you feel most energized and accomplished?',
    scenario: 'You have a free weekend with zero obligations and full access to tools and resources.',
    category: 'I',
    options: [
      { label: 'Building or repairing physical hardware, machinery, or tangible structures', description: 'Hands-on construction and direct physical creation', type: 'R', points: 3 },
      { label: 'Solving a complex algorithmic or scientific puzzle from scratch', description: 'Deep intellectual challenge and abstract problem solving', type: 'I', points: 3 },
      { label: 'Designing an aesthetic visual interface, animation, or music piece', description: 'Creative expression and artistic innovation', type: 'A', points: 3 },
      { label: 'Mentoring, tutoring, or organizing a study group to help peers succeed', description: 'Empowering others through guidance and teaching', type: 'S', points: 3 },
      { label: 'Pitching a new startup idea, negotiating deals, and leading the team', description: 'Strategic leadership and persuasive influence', type: 'E', points: 3 },
      { label: 'Organizing structured data, optimizing budgets, and auditing systematic workflows', description: 'Methodical organization and meticulous accuracy', type: 'C', points: 3 }
    ]
  },
  {
    id: 2,
    question: 'How do you prefer to approach a broken or malfunctioning system?',
    scenario: 'An important application or machine has stopped working right before a major deadline.',
    category: 'R',
    options: [
      { label: 'Physically open the hardware, inspect the wiring, and replace faulty components', description: 'Practical and tactile troubleshooting', type: 'R', points: 3 },
      { label: 'Analyze logs, isolate mathematical edge cases, and debug the underlying algorithms', description: 'Hypothesis testing and deductive reasoning', type: 'I', points: 3 },
      { label: 'Re-imagine how the user interacts with it to prevent confusing errors entirely', description: 'Human-centered creative redesign', type: 'A', points: 3 },
      { label: 'Gather the affected users, understand their frustration, and comfort their immediate needs', description: 'Empathetic communication and support', type: 'S', points: 3 },
      { label: 'Rally key engineers, delegate responsibilities, and coordinate the crisis response', description: 'Decisive command and resource management', type: 'E', points: 3 },
      { label: 'Follow standard operating checklists and document the incident report step by step', description: 'Rule-driven compliance and documentation', type: 'C', points: 3 }
    ]
  },
  {
    id: 3,
    question: 'What kind of work environment enables your best focus and flow?',
    scenario: 'Picture your dream workspace five years into your professional career.',
    category: 'I',
    options: [
      { label: 'An engineering workshop with 3D printers, oscilloscopes, and physical tools', description: 'Tactile, high-activity workshop', type: 'R', points: 3 },
      { label: 'A quiet research lab with dual monitors analyzing data models and algorithms', description: 'Autonomous, analytical sanctuary', type: 'I', points: 3 },
      { label: 'A vibrant studio filled with sketchpads, design moodboards, and creative canvases', description: 'Inspiring, aesthetic creative space', type: 'A', points: 3 },
      { label: 'A collaborative open classroom or community space filled with interactive discussions', description: 'Social, people-centric environment', type: 'S', points: 3 },
      { label: 'A dynamic executive boardroom or fast-paced startup command center', description: 'High-stakes, entrepreneurial arena', type: 'E', points: 3 },
      { label: 'A well-structured corporate office with clean dashboards and organized databases', description: 'Predictable, organized, and reliable', type: 'C', points: 3 }
    ]
  },
  {
    id: 4,
    question: 'Which of the following topics would you most enjoy learning on a Saturday morning?',
    scenario: 'You are offered a free masterclass in any subject of your choice.',
    category: 'A',
    options: [
      { label: 'Microcontroller circuit fabrication and drone assembly', description: 'Applied engineering and electronics', type: 'R', points: 3 },
      { label: 'Quantum computing principles and machine learning neural topologies', description: 'Advanced science and computational theory', type: 'I', points: 3 },
      { label: 'Color psychology, 3D typography, and cinematic lighting', description: 'Visual aesthetics and design philosophy', type: 'A', points: 3 },
      { label: 'Interpersonal psychology and cross-cultural communication techniques', description: 'Human behavior and counseling skills', type: 'S', points: 3 },
      { label: 'Venture capital valuation and viral product growth mechanics', description: 'Business strategy and market dynamics', type: 'E', points: 3 },
      { label: 'Tax structuring, compliance audits, and database query optimization', description: 'Financial precision and structured protocols', type: 'C', points: 3 }
    ]
  },
  {
    id: 5,
    question: 'In a group project, which role do you naturally gravitate toward?',
    scenario: 'A college hackathon team is assembling to build a groundbreaking prototype in 36 hours.',
    category: 'E',
    options: [
      { label: 'The Hardware/Builder Lead: assembling components and testing physical rigs', description: 'Direct physical execution', type: 'R', points: 3 },
      { label: 'The Core Architect: writing the most challenging algorithms and backends', description: 'Intellectual heavy lifting', type: 'I', points: 3 },
      { label: 'The UX Designer: crafting the visual look, feel, and brand personality', description: 'Artistic direction and aesthetic polish', type: 'A', points: 3 },
      { label: 'The Community Coordinator: facilitating team morale and handling user testing', description: 'Team harmony and user empathy', type: 'S', points: 3 },
      { label: 'The Team Lead & Pitcher: driving the strategy and delivering the demo pitch to judges', description: 'Leadership, charisma, and vision', type: 'E', points: 3 },
      { label: 'The Project Controller: tracking milestones, deliverables, and repo guidelines', description: 'Timeline management and standards', type: 'C', points: 3 }
    ]
  },
  {
    id: 6,
    question: 'What definition of "success" resonates most deeply with you?',
    scenario: 'Reflecting on your life 15 years from now.',
    category: 'S',
    options: [
      { label: 'Having built tangible, functional machines or structures used by thousands daily', description: 'Tangible craftsmanship', type: 'R', points: 3 },
      { label: 'Having discovered a breakthrough insight or solved a profound theoretical problem', description: 'Intellectual legacy and discovery', type: 'I', points: 3 },
      { label: 'Having created original works of beauty or design that moved millions emotionally', description: 'Cultural and creative impact', type: 'A', points: 3 },
      { label: 'Having directly transformed and elevated the lives, health, or careers of other people', description: 'Humanitarian service and mentorship', type: 'S', points: 3 },
      { label: 'Having founded a thriving enterprise, generated massive economic value, and led hundreds', description: 'Commercial triumph and enterprise scale', type: 'E', points: 3 },
      { label: 'Having established flawless, secure, and rock-solid systems that run with 100% precision', description: 'Systemic reliability and governance', type: 'C', points: 3 }
    ]
  }
];

export const SAMPLE_ROADMAP_STAGES: RoadmapStage[] = [
  {
    id: 1,
    stageNumber: 1,
    title: 'Stage 1 — Foundation & Core Logic',
    subtitle: 'Master the building blocks of computing, syntax, and algorithmic logic.',
    description: 'Build an unshakeable foundation in core programming, version control, semantic web architecture, and clean code hygiene.',
    estimatedDuration: '4 - 6 Weeks',
    completionPercentage: 100,
    isLocked: false,
    isCurrent: false,
    keyTopics: ['Programming Fundamentals', 'HTML5 & Modern CSS3', 'JavaScript ES6+', 'Git Version Control & GitHub Flow', 'Data Types & Control Flow'],
    features: ['Interactive Syntax Drills', 'Git Branching Sandbox', 'Foundational Micro-Projects'],
    projects: ['Interactive Command-Line Tool', 'Responsive Personal Portfolio', 'Dynamic Calculator App'],
    skills: [
      { id: 's1', name: 'JavaScript ES6+', category: 'Languages', status: 'completed', level: 'Intermediate' },
      { id: 's2', name: 'Semantic HTML & CSS', category: 'Frontend', status: 'completed', level: 'Intermediate' },
      { id: 's3', name: 'Git & GitHub Flow', category: 'DevOps', status: 'completed', level: 'Basic' },
      { id: 's4', name: 'Data Structures 101', category: 'CS Core', status: 'completed', level: 'Basic' }
    ],
    tasks: [
      { id: 't1', title: 'Learn Flexbox & Modern CSS Grid', description: 'Deep dive into 2D layout mechanisms and responsive breakpoints.', durationMinutes: 45, completed: true, type: 'concept' },
      { id: 't2', title: 'Master JavaScript Promises & Async/Await', description: 'Understand the event loop, microtask queue, and asynchronous fetching.', durationMinutes: 60, completed: true, type: 'concept' },
      { id: 't3', title: 'Build Responsive Navigation Bar', description: 'Create accessible, keyboard-friendly nav with mobile hamburger drawer.', durationMinutes: 90, completed: true, type: 'exercise' }
    ]
  },
  {
    id: 2,
    stageNumber: 2,
    title: 'Stage 2 — Development & Modern Frameworks',
    subtitle: 'Engineer scalable applications using modern component ecosystems.',
    description: 'Transition from basic scripts to robust single-page applications, backend APIs, relational database modeling, and state machines.',
    estimatedDuration: '8 - 10 Weeks',
    completionPercentage: 72,
    isLocked: false,
    isCurrent: true,
    keyTopics: ['React 19 & Hooks', 'TypeScript Strict Mode', 'FastAPI / Node.js Backend', 'PostgreSQL & ORM Modeling', 'JWT & OAuth Authentication', 'State Management'],
    features: ['Full-Stack Integration Playground', 'API Endpoint Design', 'Database Schema Generator'],
    projects: ['Real-Time Collaborative Notes App', 'Multi-Vendor Marketplace API', 'Student Learning Tracker SaaS'],
    skills: [
      { id: 's5', name: 'React 19 & Hooks', category: 'Frontend', status: 'in_progress', level: 'Intermediate' },
      { id: 's6', name: 'TypeScript', category: 'Languages', status: 'in_progress', level: 'Intermediate' },
      { id: 's7', name: 'FastAPI / Express', category: 'Backend', status: 'in_progress', level: 'Intermediate' },
      { id: 's8', name: 'PostgreSQL Relational DB', category: 'Database', status: 'in_progress', level: 'Basic' }
    ],
    tasks: [
      { id: 't4', title: 'Implement Custom React Hooks for Data Fetching', description: 'Create reusable useQuery pattern with caching and error retry states.', durationMinutes: 50, completed: true, type: 'exercise' },
      { id: 't5', title: 'Design Normalized PostgreSQL Database Schema', description: 'Construct tables, foreign keys, and indexes for a SaaS platform.', durationMinutes: 75, completed: true, type: 'concept' },
      { id: 't6', title: 'Build Secure JWT Token Rotation Middleware', description: 'Implement HttpOnly cookies, refresh tokens, and CSRF protection.', durationMinutes: 80, completed: false, type: 'project' },
      { id: 't7', title: 'Implement Tailwind Grid Dashboard with Dark Mode', description: 'Style an adaptive analytics view using CSS variables and Tailwind classes.', durationMinutes: 60, completed: false, type: 'exercise' }
    ]
  },
  {
    id: 3,
    stageNumber: 3,
    title: 'Stage 3 — Advanced Architecture & AI Integration',
    subtitle: 'Deploy enterprise-grade systems with LLMs, caching, and CI/CD pipelines.',
    description: 'Elevate software to production scale: microservices, vector databases, RAG systems, Docker containerization, and cloud deployment.',
    estimatedDuration: '6 - 8 Weeks',
    completionPercentage: 15,
    isLocked: false,
    isCurrent: false,
    keyTopics: ['Microservices & Event-Driven Architecture', 'Gemini AI & LLM Agents', 'Vector Embeddings & RAG', 'Docker & Kubernetes Containers', 'Redis Caching & Rate Limiting', 'CI/CD Cloud Deployments'],
    features: ['AI Agent Builder', 'Cloud Infrastructure Workbench', 'Performance Profiler'],
    projects: ['AI Document Research Agent with Vector DB', 'High-Throughput E-Commerce Microservices', 'Automated DevOps CI/CD Pipeline'],
    skills: [
      { id: 's9', name: 'LLM & Gemini API', category: 'AI/ML', status: 'in_progress', level: 'Basic' },
      { id: 's10', name: 'Docker & Containers', category: 'DevOps', status: 'locked', level: 'Basic' },
      { id: 's11', name: 'Redis Caching', category: 'Backend', status: 'locked', level: 'Basic' },
      { id: 's12', name: 'System Architecture', category: 'Architecture', status: 'locked', level: 'Intermediate' }
    ],
    tasks: [
      { id: 't8', title: 'Setup Gemini AI Context Streaming Endpoint', description: 'Configure SSE endpoint to stream responses with token buffer.', durationMinutes: 60, completed: true, type: 'exercise' },
      { id: 't9', title: 'Implement Vector Embeddings Similarity Search', description: 'Store embeddings in PostgreSQL pgvector and perform cosine queries.', durationMinutes: 90, completed: false, type: 'project' },
      { id: 't10', title: 'Write Dockerfile and Multi-Stage Container Build', description: 'Optimize container image from 1.2GB down to 65MB Alpine runtime.', durationMinutes: 45, completed: false, type: 'exercise' }
    ]
  },
  {
    id: 4,
    stageNumber: 4,
    title: 'Stage 4 — Professional Profile & Portfolio',
    subtitle: 'Transform your code into an irresistible engineering brand.',
    description: 'Construct a world-class developer portfolio, polish GitHub open-source contributions, craft an ATS-optimized resume, and publish project case studies.',
    estimatedDuration: '3 - 4 Weeks',
    completionPercentage: 0,
    isLocked: false,
    isCurrent: false,
    keyTopics: ['GitHub Profile Architecture', 'Interactive Developer Portfolio', 'ATS-Optimized Resume Builder', 'Technical Case Study Writing', 'LinkedIn Personal Branding'],
    features: ['Live Resume Export (PDF)', 'GitHub Activity Heatmap Sync', 'Interactive Case Study Editor'],
    projects: ['Modern 3D Interactive Portfolio', 'Open-Source Library Contribution', 'Technical Architecture Deep-Dive Article'],
    skills: [
      { id: 's13', name: 'Developer Branding', category: 'Career', status: 'locked', level: 'Basic' },
      { id: 's14', name: 'Technical Writing', category: 'Communication', status: 'locked', level: 'Basic' },
      { id: 's15', name: 'Open Source Contribution', category: 'Engineering', status: 'locked', level: 'Basic' }
    ],
    tasks: [
      { id: 't11', title: 'Generate Automated ATS-Compliant Resume', description: 'Highlight measurable metric impact (e.g. reduced load time by 42%).', durationMinutes: 60, completed: false, type: 'concept' },
      { id: 't12', title: 'Publish Live Demo and Documentation for Pinned Projects', description: 'Write comprehensive README with architectural diagrams.', durationMinutes: 90, completed: false, type: 'project' }
    ]
  },
  {
    id: 5,
    stageNumber: 5,
    title: 'Stage 5 — Career Preparation & Placement Drills',
    subtitle: 'Conquer aptitude exams, DSA live coding, and technical interviews.',
    description: 'Rigorous drills across quantitative reasoning, Data Structures & Algorithms (LeetCode Medium/Hard), System Design interviews, and HR behavioral scenarios.',
    estimatedDuration: '4 - 6 Weeks',
    completionPercentage: 0,
    isLocked: false,
    isCurrent: false,
    keyTopics: ['Quantitative & Logical Aptitude', 'DSA: Graphs, Trees & Dynamic Programming', 'System Design: Scalability & Load Balancing', 'Mock Technical Interviews with AI', 'STAR Behavioral Framework'],
    features: ['Interactive Code Sandbox with Testcases', 'AI Mock Interview Simulator', 'Aptitude Timed Exam Engine'],
    projects: ['Top 100 DSA Problems Mastery', 'System Design Blueprint (e.g. Design Netflix/Uber)', 'Mock Interview Recordings'],
    skills: [
      { id: 's16', name: 'Data Structures & Algorithms', category: 'CS Core', status: 'locked', level: 'Advanced' },
      { id: 's17', name: 'System Design', category: 'Architecture', status: 'locked', level: 'Intermediate' },
      { id: 's18', name: 'Behavioral Communication', category: 'Soft Skills', status: 'locked', level: 'Intermediate' }
    ],
    tasks: [
      { id: 't13', title: 'Master Binary Tree Traversals & Recursion', description: 'Solve Inorder, Preorder, Postorder, and Lowest Common Ancestor.', durationMinutes: 90, completed: false, type: 'exercise' },
      { id: 't14', title: 'Conduct AI-Powered Behavioral Interview Drill', description: 'Practice STAR answers for conflict resolution and leadership.', durationMinutes: 45, completed: false, type: 'concept' }
    ]
  },
  {
    id: 6,
    stageNumber: 6,
    title: 'Stage 6 — Job Launch & Placement Matching',
    subtitle: 'Land verified high-growth internships and full-time software engineering roles.',
    description: 'Automate job matching based on your skill graph, track recruiter applications, prepare company-specific test rounds, and negotiate top-tier compensation offers.',
    estimatedDuration: 'Ongoing',
    completionPercentage: 0,
    isLocked: false,
    isCurrent: false,
    keyTopics: ['AI Match Percentage Scoring', 'Direct Recruiter Referrals', 'Application Pipeline Management', 'Offer Negotiation Strategy', 'First 90 Days Onboarding Success'],
    features: ['Match % Job Engine', '1-Click Application Tracker', 'Offer Letter Analyzer'],
    projects: ['Target 30 High-Match Company Applications', 'Take-Home Coding Challenge Submissions'],
    skills: [
      { id: 's19', name: 'Salary Negotiation', category: 'Career', status: 'locked', level: 'Basic' },
      { id: 's20', name: 'Take-Home Project Execution', category: 'Engineering', status: 'locked', level: 'Advanced' }
    ],
    tasks: [
      { id: 't15', title: 'Apply to Top 5 Matched Full Stack Roles (90%+ Match)', description: 'Customize cover notes and verify required portfolio demo links.', durationMinutes: 60, completed: false, type: 'exercise' }
    ]
  }
];

export const SAMPLE_DAILY_TASKS: DailyTask[] = [
  {
    id: 'dt-1',
    date: '2026-08-20',
    stageId: 2,
    dayNumber: 17,
    goalTitle: 'Master React Performance & Memoization',
    title: 'Learn React useMemo & useCallback with Visual Profiler',
    description: 'Understand referential equality, render cycles, and when to optimize component subtree re-renders using Chrome React DevTools Profiler.',
    estimatedMinutes: 45,
    difficulty: 'Medium',
    resourceLink: 'https://react.dev/reference/react/useMemo',
    videoLink: 'https://youtube.com',
    docLink: 'https://react.dev',
    status: 'completed',
    skillTag: 'React 19',
    xpReward: 100
  },
  {
    id: 'dt-2',
    date: '2026-08-20',
    stageId: 2,
    dayNumber: 17,
    goalTitle: 'Build Fast API Microservice Endpoints',
    title: 'Implement Pydantic Validation & Async DB Session in FastAPI',
    description: 'Define strict request/response schemas, dependency injection for database sessions, and asynchronous CRUD operations.',
    estimatedMinutes: 60,
    difficulty: 'Medium',
    resourceLink: 'https://fastapi.tiangolo.com/tutorial/sql-databases/',
    videoLink: 'https://youtube.com',
    docLink: 'https://fastapi.tiangolo.com',
    status: 'in_progress',
    skillTag: 'FastAPI / Python',
    xpReward: 120
  },
  {
    id: 'dt-3',
    date: '2026-08-20',
    stageId: 2,
    dayNumber: 17,
    goalTitle: 'PostgreSQL Relational Mastery',
    title: 'Write Complex SQL Aggregations & Window Functions',
    description: 'Practice PARTITION BY, ROW_NUMBER(), and multi-table JOINs to generate weekly active student cohort analytics.',
    estimatedMinutes: 45,
    difficulty: 'Hard',
    resourceLink: 'https://www.postgresql.org/docs/current/tutorial-window.html',
    videoLink: 'https://youtube.com',
    docLink: 'https://www.postgresql.org/docs/',
    status: 'pending',
    skillTag: 'PostgreSQL',
    xpReward: 150
  },
  {
    id: 'dt-4',
    date: '2026-08-20',
    stageId: 2,
    dayNumber: 17,
    goalTitle: 'Full-Stack Practical Project',
    title: 'Build Interactive Kanban Task Board with Drag & Drop',
    description: 'Construct a responsive board where cards update their status column in real time and persist to the database.',
    estimatedMinutes: 90,
    difficulty: 'Hard',
    resourceLink: 'https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API',
    videoLink: 'https://youtube.com',
    docLink: 'https://developer.mozilla.org',
    status: 'pending',
    skillTag: 'Full Stack',
    xpReward: 200
  }
];

export const SAMPLE_PROJECTS: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'DevPulse — Developer Learning & Task Management System',
    stage: 2,
    difficulty: 'Medium (2-3 weeks)',
    durationWeeks: 3,
    description: 'A full-stack task manager and study tracker engineered with React, FastAPI, PostgreSQL, and JWT authentication.',
    skills: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Tailwind CSS', 'Docker'],
    requirements: [
      'User registration & JWT authentication with token refresh',
      'CRUD for tasks, tags, estimated hours, and completion milestones',
      'Visual progress charts with Recharts',
      'Responsive dark/light mode interface'
    ],
    expectedOutcome: 'A portfolio-grade web app deployed on cloud with live demo link and test coverage.',
    techStack: ['React 19', 'TypeScript', 'FastAPI', 'SQLAlchemy', 'PostgreSQL', 'Vite'],
    status: 'in_progress',
    progressPercentage: 65,
    milestones: [
      { id: 'm1', week: 1, title: 'Database Schema & Auth API', description: 'Setup PostgreSQL migrations, password hashing, and login endpoints.', completed: true, deliverables: ['API specs', 'Auth routes'] },
      { id: 'm2', week: 2, title: 'Frontend UI & State Management', description: 'Design Kanban board, task creation modals, and filter states.', completed: true, deliverables: ['Interactive dashboard', 'Task CRUD'] },
      { id: 'm3', week: 3, title: 'Analytics & Cloud Deployment', description: 'Integrate study streak calculation, Dockerfile, and live cloud deployment.', completed: false, deliverables: ['Live URL', 'GitHub repo README'] }
    ]
  },
  {
    id: 'proj-2',
    title: 'CogniSearch — Multi-Agent AI Document Assistant with RAG',
    stage: 3,
    difficulty: 'Large (4+ weeks)',
    durationWeeks: 4,
    description: 'Upload PDF textbooks or API docs, generate vector embeddings, and query an intelligent Gemini AI researcher for sourced answers.',
    skills: ['Python', 'Gemini API', 'Vector DB (pgvector)', 'LangChain', 'FastAPI', 'React'],
    requirements: [
      'Document chunking and vector embedding generation',
      'Cosine similarity semantic retrieval',
      'Server-Sent Events (SSE) streaming AI mentor responses',
      'Exact page citation and text highlighter'
    ],
    expectedOutcome: 'An enterprise-grade generative AI tool showcasing deep understanding of embeddings, prompt design, and latency optimization.',
    techStack: ['Gemini 3.7 Flash', 'pgvector', 'FastAPI', 'React', 'TypeScript'],
    status: 'not_started',
    progressPercentage: 0,
    milestones: [
      { id: 'm4', week: 1, title: 'Document Parsing & Vector Pipeline', description: 'PDF text extraction and embedding generation.', completed: false, deliverables: ['Embedding script', 'pgvector schema'] },
      { id: 'm5', week: 2, title: 'RAG Query Engine & Context Builder', description: 'Context window compression and prompt template.', completed: false, deliverables: ['Retrieval API'] },
      { id: 'm6', week: 3, title: 'Streaming Chat Interface', description: 'React streaming message bubble with code syntax highlighting.', completed: false, deliverables: ['Chat UI'] },
      { id: 'm7', week: 4, title: 'Evaluation & Benchmarking', description: 'Measure retrieval precision and hallucination metrics.', completed: false, deliverables: ['Benchmark report'] }
    ]
  },
  {
    id: 'proj-3',
    title: 'AuraShop — High-Concurrency E-Commerce Microservices',
    stage: 2,
    difficulty: 'Medium (2-3 weeks)',
    durationWeeks: 3,
    description: 'A modular online marketplace featuring catalog search, shopping cart with optimistic UI updates, and Stripe mock checkout.',
    skills: ['React', 'Node.js/Express', 'PostgreSQL', 'Redis', 'Stripe API'],
    requirements: [
      'Product catalog with faceted category & price filters',
      'Persistent cart with instant price calculation',
      'Stripe checkout webhook integration',
      'Inventory concurrency management with Redis locks'
    ],
    expectedOutcome: 'A complete commercial platform ready for production traffic.',
    techStack: ['React', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Redis'],
    status: 'completed',
    progressPercentage: 100,
    milestones: [
      { id: 'm8', week: 1, title: 'Catalog & Search Indexing', description: 'Product grid with debounced search.', completed: true, deliverables: ['Search UI'] },
      { id: 'm9', week: 2, title: 'Cart & Checkout Pipeline', description: 'Cart reducer and Stripe session creation.', completed: true, deliverables: ['Checkout workflow'] },
      { id: 'm10', week: 3, title: 'Order History & Admin Dashboard', description: 'Admin management of inventory and order statuses.', completed: true, deliverables: ['Admin portal'] }
    ]
  }
];

export const SAMPLE_TECH_NEWS: TechNewsItem[] = [
  {
    id: 'n1',
    title: 'Google Introduces Next-Gen Gemini 3.7 Flash with Hybrid Reasoning',
    summary: 'The new Gemini 3.7 Flash model blends instant responsiveness with scalable reasoning tokens, revolutionizing coding assistants and real-time agent workflows.',
    source: 'Google DeepMind Tech',
    date: 'August 18, 2026',
    url: 'https://ai.google.dev',
    tags: ['AI', 'Gemini', 'LLMs', 'Engineering'],
    readTime: '4 min read'
  },
  {
    id: 'n2',
    title: 'React 19 Server Actions & Dynamic Asset Loading Adopted Across 60% of Fortune 500',
    summary: 'Enterprise engineering teams report a 45% reduction in frontend bundle footprints after adopting standard React Server Components and fine-grained hooks.',
    source: 'TechCrunch Enterprise',
    date: 'August 17, 2026',
    url: 'https://react.dev',
    tags: ['React', 'Frontend', 'TypeScript', 'Web'],
    readTime: '3 min read'
  },
  {
    id: 'n3',
    title: 'FastAPI 0.120 Adds Native Asynchronous Streaming & Zero-Copy Serializers',
    summary: 'Python continues its dominance in backend AI microservices with unprecedented throughput leaps utilizing Rust-powered serialization engines under the hood.',
    source: 'Python Developer Journal',
    date: 'August 15, 2026',
    tags: ['Python', 'FastAPI', 'Backend', 'Performance'],
    readTime: '5 min read',
    url: 'https://fastapi.tiangolo.com'
  },
  {
    id: 'n4',
    title: 'Global Tech Hiring Index 2026: Full-Stack & AI Engineers Lead Demand with 34% Growth',
    summary: 'Recruiters prioritize candidates with tangible full-stack project portfolios and proven system design problem-solving abilities over static GPA metrics.',
    source: 'HackerRank Insights',
    date: 'August 12, 2026',
    tags: ['Careers', 'Placements', 'Hiring', 'Software'],
    readTime: '6 min read',
    url: 'https://hackerrank.com'
  }
];

export const SAMPLE_EVENTS: CareerEvent[] = [
  {
    id: 'ev-1',
    title: 'Global AI & Web Innovation Hackathon 2026',
    organizer: 'Google Developer Student Clubs & DevPost',
    category: 'Hackathon',
    date: 'September 5 - 7, 2026',
    location: 'Virtual / Worldwide',
    isOnline: true,
    tags: ['AI Agents', 'Full Stack', 'Cloud Run', 'Open Source'],
    link: 'https://devpost.com',
    prizePool: '$45,000 in Prizes & Fast-Track Interviews',
    registrationOpen: true
  },
  {
    id: 'ev-2',
    title: 'International Full-Stack Summit & System Design Conference',
    organizer: 'React & Cloud Architecture Forum',
    category: 'Tech Conference',
    date: 'September 18, 2026',
    location: 'San Francisco, CA & Online Livestream',
    isOnline: true,
    tags: ['Microservices', 'React 19', 'Kubernetes', 'Database Scaling'],
    link: 'https://eventbrite.com',
    registrationOpen: true
  },
  {
    id: 'ev-3',
    title: 'Mastering FAANG Placement Coding & System Design Webinar',
    organizer: 'CareerPath AI Masterclass Series',
    category: 'Webinar',
    date: 'August 28, 2026',
    location: 'Online Live Masterclass',
    isOnline: true,
    tags: ['DSA', 'System Design', 'Mock Interview', 'Campus Placements'],
    link: 'https://careerpath.ai/events/masterclass',
    registrationOpen: true
  },
  {
    id: 'ev-4',
    title: 'CodeSprint 2026: Inter-College Algorithm Championship',
    organizer: 'National Coding League',
    category: 'Coding Competition',
    date: 'September 12, 2026',
    location: 'Online Timed Arena',
    isOnline: true,
    tags: ['Competitive Programming', 'Algorithms', 'Speed Coding'],
    link: 'https://leetcode.com',
    prizePool: '$10,000 + Tech Internship Offers',
    registrationOpen: true
  }
];

export const SAMPLE_INTERNSHIPS: InternshipItem[] = [
  {
    id: 'intern-1',
    company: 'Stripe',
    role: 'Software Engineering Intern — Full Stack Platform',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=60',
    location: 'San Francisco, CA / Remote',
    isRemote: true,
    duration: '3 Months (Summer 2026)',
    stipend: '$8,500 / Month + Mentorship',
    deadline: 'September 30, 2026',
    requiredSkills: ['React', 'TypeScript', 'Ruby/Python', 'REST APIs', 'SQL'],
    eligibility: 'Penultimate year students in CS, Engineering, or self-taught developers with strong projects',
    description: 'Collaborate with world-class engineers building developer-first payment infrastructure handling billions in volume.',
    matchScore: 94,
    status: 'none'
  },
  {
    id: 'intern-2',
    company: 'Datadog',
    role: 'Cloud & Backend Systems Engineering Intern',
    logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&auto=format&fit=crop&q=60',
    location: 'New York, NY / Hybrid',
    isRemote: false,
    duration: '4 Months',
    stipend: '$7,800 / Month + Relocation',
    deadline: 'October 15, 2026',
    requiredSkills: ['Go/Python', 'PostgreSQL', 'Docker', 'Distributed Systems'],
    eligibility: 'Undergraduate or Master students graduating in 2027',
    description: 'Design high-throughput telemetry ingestion pipelines and monitor cloud infrastructure metrics at massive scale.',
    matchScore: 88,
    status: 'saved'
  },
  {
    id: 'intern-3',
    company: 'Figma',
    role: 'Frontend Experience Engineering Intern',
    logo: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=100&auto=format&fit=crop&q=60',
    location: 'San Francisco, CA / Hybrid',
    isRemote: false,
    duration: '3 Months',
    stipend: '$8,200 / Month',
    deadline: 'October 1, 2026',
    requiredSkills: ['React', 'TypeScript', 'WebAssembly/C++', 'Canvas/WebGL', 'CSS Architecture'],
    eligibility: 'Passion for UI craft, design tools, and high-performance browser rendering engines',
    description: 'Shape the collaborative creative canvas used by millions of designers and engineers every day.',
    matchScore: 91,
    status: 'none'
  }
];

export const SAMPLE_JOBS: JobListing[] = [
  {
    id: 'job-1',
    company: 'Vercel',
    position: 'Junior Full Stack Engineer (Next.js & Cloud)',
    location: 'Remote (Global)',
    jobType: 'Full-time',
    experience: '0 - 2 Years (Fresh Graduates Welcome)',
    salary: '$110,000 - $135,000 + Equity',
    skills: ['React', 'TypeScript', 'Node.js', 'Next.js', 'Edge Middleware', 'Tailwind CSS'],
    matchScore: 96,
    description: 'Join the team enabling millions of developers to build the modern web with instant deployments and serverless edge functions.',
    responsibilities: [
      'Build performant UI dashboards and developer tooling',
      'Optimize edge runtime APIs for low latency',
      'Write clean, accessible, and well-tested TypeScript code',
      'Collaborate with open-source contributors'
    ],
    requirements: [
      'Strong grasp of modern React hooks and async data patterns',
      'Demonstrated portfolio of full-stack projects on GitHub',
      'Familiarity with SQL/NoSQL databases and REST/GraphQL APIs',
      'Excellent written communication'
    ],
    postedDaysAgo: 2,
    status: 'saved'
  },
  {
    id: 'job-2',
    company: 'Scale AI',
    position: 'Associate AI Platform Engineer',
    location: 'San Francisco, CA / Hybrid',
    jobType: 'Full-time',
    experience: '0 - 1 Year',
    salary: '$125,000 - $155,000 + Equity',
    skills: ['Python', 'FastAPI', 'PostgreSQL', 'Docker', 'LLM Fine-Tuning', 'React'],
    matchScore: 92,
    description: 'Help build the foundational data and model infrastructure powering the next generation of frontier AI models.',
    responsibilities: [
      'Design reliable data ingestion workflows for model evaluation',
      'Build internal review tools using React and FastAPI',
      'Implement automated quality benchmarks'
    ],
    requirements: [
      'Proficiency in Python and full-stack web frameworks',
      'Understanding of machine learning pipelines and vector search',
      'B.Tech/BS in CS or equivalent strong problem solving skills'
    ],
    postedDaysAgo: 4,
    status: 'none'
  },
  {
    id: 'job-3',
    company: 'Linear',
    position: 'Product Software Engineer',
    location: 'Remote',
    jobType: 'Full-time',
    experience: '1 - 3 Years',
    salary: '$130,000 - $160,000 + Equity',
    skills: ['TypeScript', 'React', 'Node.js', 'SQLite/IndexedDB', 'WebSocket Sync'],
    matchScore: 89,
    description: 'Craft magical, instant, keyboard-first productivity software for high-performing engineering teams.',
    responsibilities: [
      'Build silky smooth 60fps interactive UI components',
      'Implement conflict-free local-first real-time data sync',
      'Refine UI animations and micro-interactions'
    ],
    requirements: [
      'Extreme attention to visual detail and performance profiling',
      'Strong TypeScript skills and deep understanding of browser internals'
    ],
    postedDaysAgo: 6,
    status: 'none'
  }
];

export const SAMPLE_PLACEMENT_QUESTIONS: PlacementQuestion[] = [
  {
    id: 'apt-1',
    category: 'Aptitude',
    subCategory: 'Quantitative Reasoning',
    title: 'Work & Time Efficiency',
    difficulty: 'Medium',
    question: 'Alice can complete a software module in 12 days, and Bob can complete the same module in 18 days. If they work together with a senior engineer Charlie, they finish the entire module in 4 days. How many days would Charlie take to complete the module alone?',
    options: ['9 days', '8 days', '10 days', '7.5 days'],
    correctAnswer: 0,
    explanation: "Alice's 1-day work = 1/12, Bob's 1-day work = 1/18. Combined 1-day work of Alice + Bob = 1/12 + 1/18 = 5/36. Since Alice + Bob + Charlie = 1/4 = 9/36, Charlie's 1-day work = 9/36 - 5/36 = 4/36 = 1/9. Therefore, Charlie alone takes 9 days."
  },
  {
    id: 'apt-2',
    category: 'Aptitude',
    subCategory: 'Logical Reasoning',
    title: 'Data Flow & Binary Logic',
    difficulty: 'Easy',
    question: 'In a server farm of 5 machines (A, B, C, D, E), A is faster than B but slower than C. D is faster than E but slower than B. Which machine is the fastest and which is the slowest?',
    options: ['C is fastest, E is slowest', 'A is fastest, D is slowest', 'C is fastest, D is slowest', 'B is fastest, E is slowest'],
    correctAnswer: 0,
    explanation: 'From the conditions: C > A > B and B > D > E. Combining both inequalities: C > A > B > D > E. Hence C is the fastest server and E is the slowest.'
  },
  {
    id: 'dsa-1',
    category: 'DSA',
    subCategory: 'Arrays & Two Pointers',
    title: 'Two Sum II — Input Array Is Sorted',
    difficulty: 'Easy',
    question: 'Given a 1-indexed array of integers `numbers` that is already sorted in non-decreasing order, find two numbers such that they add up to a specific `target` number. Return the indices [index1, index2] (1-based). Your solution must use O(1) additional space.',
    starterCode: `function twoSum(numbers: number[], target: number): number[] {
  let left = 0;
  let right = numbers.length - 1;
  while (left < right) {
    const sum = numbers[left] + numbers[right];
    if (sum === target) {
      return [left + 1, right + 1];
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }
  return [];
}`,
    explanation: 'Using two pointers (one at the start, one at the end), we check the sum. If the sum is smaller than target, increment left. If greater, decrement right. Time Complexity: O(N), Space Complexity: O(1).',
    testCases: [
      { input: 'numbers = [2,7,11,15], target = 9', output: '[1, 2]' },
      { input: 'numbers = [2,3,4], target = 6', output: '[1, 3]' },
      { input: 'numbers = [-1,0], target = -1', output: '[1, 2]' }
    ]
  },
  {
    id: 'dsa-2',
    category: 'DSA',
    subCategory: 'Dynamic Programming & Memoization',
    title: 'Climbing Stairs with Variable Leaps',
    difficulty: 'Medium',
    question: 'You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?',
    starterCode: `function climbStairs(n: number): number {
  if (n <= 2) return n;
  let prev2 = 1;
  let prev1 = 2;
  for (let i = 3; i <= n; i++) {
    const current = prev1 + prev2;
    prev2 = prev1;
    prev1 = current;
  }
  return prev1;
}`,
    explanation: 'This problem follows the Fibonacci recurrence relation dp[i] = dp[i-1] + dp[i-2]. By maintaining only the last two values, we achieve O(N) time and O(1) space.',
    testCases: [
      { input: 'n = 2', output: '2' },
      { input: 'n = 3', output: '3' },
      { input: 'n = 5', output: '8' }
    ]
  },
  {
    id: 'tech-1',
    category: 'Technical',
    subCategory: 'System Architecture & Database Indexing',
    title: 'Explain Database Indexing (B-Tree vs Hash) and When to Use Them',
    difficulty: 'Medium',
    question: 'How do B-Tree indexes work in relational databases like PostgreSQL, why are they logarithmic O(log N), and why are they preferred over Hash indexes for range queries (`WHERE age BETWEEN 20 AND 30`)?',
    explanation: 'B-Trees maintain a balanced, sorted multi-way tree structure on disk blocks. Because the leaf nodes are connected via a doubly linked list in sorted order, finding range predicates (BETWEEN, <, >) requires finding the starting key in O(log N) and simply traversing the sequential leaf chain. Hash indexes only support exact equality (=) via hash lookups and cannot support range sorting.'
  },
  {
    id: 'hr-1',
    category: 'HR',
    subCategory: 'Behavioral & Situational',
    title: 'Tell Me About a Time You Faced a Critical Technical Disagreement',
    difficulty: 'Easy',
    question: 'Describe a situation where you and a teammate had conflicting opinions on an architecture design or code review. How did you handle the situation and what was the outcome?',
    explanation: 'Apply the STAR method: Situation (describe the project & deadlock), Task (your role in delivering quality), Action (listen actively, build objective benchmark prototypes/A-B data tests, focus on user impact rather than ego), Result (consensus achieved, timely launch with zero regressions).'
  }
];
