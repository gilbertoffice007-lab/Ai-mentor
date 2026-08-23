export type RoadmapStage = {
  title: string
  desc: string
  skills: string[]
}

export type Sub = {
  id: string
  name: string
  icon: string
  overview: string
  why: string
  careers: string[]
  skills: string[]
  tools: string[]
  roadmap?: RoadmapStage[]
}

export type Field = {
  id: string
  name: string
  tag: string
  icon: string
  shape: string
  theme: {
    accent: string
    accent2: string
    bg: string
    bg2: string
  }
  overview: {
    what: string
    learn: string[]
    skills: string[]
    careers: string[]
    industries: string[]
    higher: string[]
    roadmap: string
    suitable: string
  }
  roadmap: RoadmapStage[]
  subs: Sub[]
}

const SHAPES = {
  hexagon: 'polygon(25% 2%, 75% 2%, 100% 50%, 75% 98%, 25% 98%, 0% 50%)',
  circle: 'circle(49% at 50% 50%)',
  diamond: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
  octagon: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
  shield: 'polygon(50% 0%, 100% 16%, 100% 60%, 50% 100%, 0% 60%, 0% 16%)',
  heptagon: 'polygon(50% 0%, 91% 21%, 100% 62%, 74% 96%, 26% 96%, 0% 62%, 9% 21%)',
  organic: 'polygon(21% 4%, 79% 0%, 100% 34%, 91% 81%, 55% 100%, 14% 91%, 0% 44%)',
  gem: 'polygon(50% 0%, 100% 38%, 50% 100%, 0% 38%)',
  book: 'polygon(7% 5%, 93% 0%, 93% 93%, 50% 100%, 7% 93%)',
  rectoct: 'polygon(13% 0%, 87% 0%, 100% 13%, 100% 87%, 87% 100%, 13% 100%, 0% 87%, 0% 13%)',
  leaf: 'polygon(50% 0%, 90% 24%, 97% 66%, 50% 100%, 3% 66%, 10% 24%)',
  blade: 'polygon(19% 0%, 100% 9%, 83% 100%, 0% 90%)',
}

export const ROOT_SHAPE = SHAPES.hexagon

export const ROOT_THEME = {
  accent: '#22d3ee',
  accent2: '#818cf8',
  bg: '#03060f',
  bg2: '#0a1c33',
}

export const ROOT_OVERVIEW = {
  what: 'FIELDS is a holographic index of the entire career landscape — twelve primary domains that together cover almost every professional path available after school.',
  learn: [
    'How the twelve major career domains differ in daily work and mindset',
    'Which entrance exams, degrees and licences gate each domain',
    'How subjects you enjoy today map onto real professions',
    'Where domains overlap, so a switch later stays possible',
  ],
  skills: ['Self-assessment', 'Research', 'Long-term planning', 'Decision making'],
  careers: [
    'Every path below sits inside one of the twelve fields',
    'Most fields offer both a practice track and a research track',
    'Several fields also open into entrepreneurship',
  ],
  industries: ['Technology', 'Healthcare', 'Finance', 'Public service', 'Creative industries', 'Education', 'Primary sector', 'Sport'],
  higher: ['Bachelor degrees', 'Professional certifications', 'Postgraduate specialisation', 'Doctoral research'],
  roadmap: 'Choose a field → choose a path inside it → follow that path’s six-stage roadmap.',
  suitable:
    'Start here if you are unsure. Rotate the orbit, read a few fields, and open the one that keeps pulling you back.',
}

/* ------------------------------------------------------------------ */

const engineering: Field = {
  id: 'engineering',
  name: 'Engineering & Technology',
  tag: 'Build systems that scale',
  icon: 'Cpu',
  shape: SHAPES.hexagon,
  theme: { accent: '#22d3ee', accent2: '#3b82f6', bg: '#03080f', bg2: '#062033' },
  overview: {
    what: 'Engineering applies mathematics and physical science to design, build and maintain the machines, structures, circuits and software that modern life runs on.',
    learn: [
      'Core mathematics, physics and computation',
      'Design thinking, modelling and simulation',
      'Materials, systems and manufacturing processes',
      'Project execution, safety standards and documentation',
    ],
    skills: ['Analytical reasoning', 'Modelling & simulation', 'Programming', 'Systems thinking', 'Technical communication', 'Prototyping'],
    careers: ['Design Engineer', 'Software Engineer', 'Project Engineer', 'R&D Engineer', 'Site / Field Engineer', 'Technical Consultant'],
    industries: ['IT & software', 'Manufacturing', 'Infrastructure', 'Energy & power', 'Automotive & aerospace', 'Semiconductors'],
    higher: ['M.Tech / M.E.', 'MS abroad', 'MBA for technical management', 'PhD research', 'GATE-based PSU entry'],
    roadmap: 'Maths & physics base → core branch subjects → hands-on projects → specialisation → internships → placement or higher study.',
    suitable: 'Suits people who like taking things apart, reasoning quantitatively, and seeing a design become real.',
  },
  roadmap: [
    { title: 'Foundation', desc: 'Lock down calculus, mechanics, and basic programming — every branch leans on them.', skills: ['Calculus', 'Physics', 'Intro coding'] },
    { title: 'Core Concepts', desc: 'Work through the branch core: theory, derivations, and standard problem sets.', skills: ['Branch core theory', 'Problem solving'] },
    { title: 'Develop Skills', desc: 'Move from theory to build: labs, CAD/code, measurement and iteration.', skills: ['Lab work', 'CAD / coding', 'Debugging'] },
    { title: 'Specialise', desc: 'Pick a niche and go deep enough to be interviewed on it.', skills: ['Electives', 'Certifications'] },
    { title: 'Real-World Experience', desc: 'Internships, hackathons, inter-college competitions and a capstone project.', skills: ['Internship', 'Team projects'] },
    { title: 'Career Launch', desc: 'Portfolio and resume, aptitude and technical interview prep, GATE or campus placement.', skills: ['Interview prep', 'Portfolio'] },
  ],
  subs: [
    {
      id: 'cse',
      name: 'Computer Science / IT / Software',
      icon: 'Code2',
      overview:
        'Computer Science studies computation itself — algorithms, data, languages and systems — and applies it to build software, platforms and intelligent systems.',
      why: 'The widest employment surface of any engineering branch, the fastest feedback loop between learning and building, and a career you can start from a laptop.',
      careers: ['Software Developer', 'Web / Full-Stack Developer', 'Data Scientist', 'AI / ML Engineer', 'Cybersecurity Analyst', 'Cloud & DevOps Engineer', 'System Architect'],
      skills: ['Programming', 'Data structures & algorithms', 'Databases', 'Web technologies', 'System design', 'AI / ML fundamentals'],
      tools: ['Python', 'TypeScript', 'Git', 'PostgreSQL', 'Docker', 'AWS / Vercel'],
      roadmap: [
        { title: 'Foundation', desc: 'One language end to end, plus discrete maths and how a computer actually executes code.', skills: ['Python or C++', 'Discrete maths', 'Linux basics'] },
        { title: 'Core Concepts', desc: 'Data structures, algorithms, operating systems, networks and databases.', skills: ['DSA', 'OS', 'DBMS', 'Networks'] },
        { title: 'Develop Skills', desc: 'Ship real projects — a full-stack app, an API, a small data pipeline — and use Git like a professional.', skills: ['Full-stack build', 'Git & code review', 'Testing'] },
        { title: 'Specialise', desc: 'Choose one: web platforms, ML, security, cloud infrastructure or systems.', skills: ['Depth track', 'Domain certification'] },
        { title: 'Real-World Experience', desc: 'Internship, open-source contributions, hackathons and a deployed product with real users.', skills: ['Internship', 'Open source', 'Deployment'] },
        { title: 'Career Launch', desc: 'DSA interview grind, system-design rounds, GitHub portfolio and referrals.', skills: ['DSA interviews', 'System design', 'Networking'] },
      ],
    },
    {
      id: 'mech',
      name: 'Mechanical Engineering',
      icon: 'Cog',
      overview:
        'Mechanical Engineering deals with forces, motion, heat and materials — designing and manufacturing everything from engines and turbines to robotics and HVAC systems.',
      why: 'The most transferable core engineering branch: it feeds automotive, aerospace, energy, manufacturing, robotics and PSU recruitment alike.',
      careers: ['Design Engineer', 'Manufacturing Engineer', 'Thermal Engineer', 'Robotics Engineer', 'Quality / QA Engineer', 'Maintenance Manager'],
      skills: ['Statics & dynamics', 'Thermodynamics', 'CAD / CAE modelling', 'Manufacturing processes', 'Materials science', 'Tolerance & GD&T'],
      tools: ['SolidWorks', 'AutoCAD', 'ANSYS', 'CATIA', 'MATLAB'],
      roadmap: [
        { title: 'Foundation', desc: 'Engineering mechanics, thermodynamics and drawing conventions.', skills: ['Mechanics', 'Thermo', 'Engineering drawing'] },
        { title: 'Core Concepts', desc: 'Strength of materials, fluid mechanics, heat transfer and machine design.', skills: ['SOM', 'Fluids', 'Machine design'] },
        { title: 'Develop Skills', desc: 'Become fluent in CAD and run your first FEA/CFD studies on your own models.', skills: ['CAD', 'FEA', 'Workshop practice'] },
        { title: 'Specialise', desc: 'Thermal, design, manufacturing, automotive or robotics — pick one lane.', skills: ['Electives', 'Software certification'] },
        { title: 'Real-World Experience', desc: 'Plant internship, SAE/Formula-style team, and a fabricated working prototype.', skills: ['Shop-floor internship', 'Student team'] },
        { title: 'Career Launch', desc: 'Design-calculation interviews, GATE for PSUs and M.Tech, and a project portfolio with drawings.', skills: ['GATE', 'Technical interview'] },
      ],
    },
    {
      id: 'civil',
      name: 'Civil Engineering',
      icon: 'Building2',
      overview:
        'Civil Engineering plans, designs and builds the physical public realm — buildings, bridges, highways, dams, water systems and urban infrastructure.',
      why: 'Infrastructure spending is long-cycle and government-backed, so demand is steady and the work is visible for decades.',
      careers: ['Structural Engineer', 'Site / Project Engineer', 'Transportation Engineer', 'Geotechnical Engineer', 'Urban Planner', 'Construction Manager'],
      skills: ['Structural analysis', 'Surveying', 'Concrete & steel design', 'Estimation & costing', 'Project scheduling', 'Code compliance'],
      tools: ['AutoCAD', 'STAAD.Pro', 'Revit / BIM', 'ETABS', 'Primavera'],
      roadmap: [
        { title: 'Foundation', desc: 'Mechanics of solids, surveying and construction materials.', skills: ['Mechanics', 'Surveying', 'Materials'] },
        { title: 'Core Concepts', desc: 'Structural analysis, RCC and steel design, geotechnics and fluid mechanics.', skills: ['Structural analysis', 'RCC design', 'Soil mechanics'] },
        { title: 'Develop Skills', desc: 'Draft and analyse a real structure; learn estimation, BIM and site vocabulary.', skills: ['CAD & BIM', 'Estimation', 'Site reading'] },
        { title: 'Specialise', desc: 'Structures, transportation, geotech, water resources or construction management.', skills: ['Electives', 'Software depth'] },
        { title: 'Real-World Experience', desc: 'Live site internship, quantity survey work and a design-and-detail capstone.', skills: ['Site internship', 'Survey camp'] },
        { title: 'Career Launch', desc: 'GATE, PSU and state engineering-service exams, or consultancy interviews with a drawing portfolio.', skills: ['GATE / PSU exams', 'Drawing portfolio'] },
      ],
    },
    {
      id: 'eee',
      name: 'Electrical Engineering',
      icon: 'Zap',
      overview:
        'Electrical Engineering covers generation, transmission, control and utilisation of electrical power, along with machines, drives and industrial automation.',
      why: 'Electrification, renewables, EVs and grid modernisation are all expanding at once, and PSU recruitment for electrical engineers stays strong.',
      careers: ['Power Systems Engineer', 'Electrical Design Engineer', 'Automation / PLC Engineer', 'Renewable Energy Engineer', 'Testing & Commissioning Engineer', 'Energy Auditor'],
      skills: ['Circuit theory', 'Electrical machines', 'Power systems', 'Control systems', 'Power electronics', 'Load calculation'],
      tools: ['MATLAB / Simulink', 'ETAP', 'AutoCAD Electrical', 'PLC / SCADA', 'PSpice'],
    },
    {
      id: 'ece',
      name: 'Electronics & Communication',
      icon: 'Radio',
      overview:
        'ECE spans analog and digital electronics, embedded systems, signal processing and the communication networks that carry data across the world.',
      why: 'It sits at the hardware–software boundary, which means both chip design and firmware roles stay open to you.',
      careers: ['Embedded Systems Engineer', 'VLSI Design Engineer', 'RF / Communication Engineer', 'IoT Engineer', 'Signal Processing Engineer', 'Test & Validation Engineer'],
      skills: ['Analog & digital circuits', 'Microcontrollers', 'Signals & systems', 'Verilog / VHDL', 'Communication theory', 'PCB design'],
      tools: ['Verilog', 'Cadence / Synopsys', 'Arduino / STM32', 'KiCad', 'MATLAB'],
    },
    {
      id: 'chemical',
      name: 'Chemical Engineering',
      icon: 'FlaskConical',
      overview:
        'Chemical Engineering scales chemistry into industry — designing reactors, separation units and continuous processes that convert raw materials into products safely.',
      why: 'Process skills transfer across petrochemicals, pharma, food, fertilisers, specialty chemicals and increasingly green hydrogen and batteries.',
      careers: ['Process Engineer', 'Production Engineer', 'Process Safety Engineer', 'Quality Control Engineer', 'Plant Operations Manager', 'R&D Engineer'],
      skills: ['Mass & energy balances', 'Thermodynamics', 'Reaction engineering', 'Transport phenomena', 'Process control', 'HAZOP & safety'],
      tools: ['Aspen Plus', 'HYSYS', 'MATLAB', 'P&ID standards', 'DCS systems'],
    },
    {
      id: 'aero',
      name: 'Aerospace Engineering',
      icon: 'Rocket',
      overview:
        'Aerospace Engineering designs aircraft, spacecraft, propulsion and control systems that operate under extreme aerodynamic and structural loads.',
      why: 'Space is now commercial as well as national — launch vehicles, satellites, drones and defence aviation are all hiring.',
      careers: ['Aerodynamics Engineer', 'Propulsion Engineer', 'Structures & Loads Engineer', 'Avionics Engineer', 'Flight Test Engineer', 'Satellite Systems Engineer'],
      skills: ['Aerodynamics', 'Flight mechanics', 'Propulsion', 'Composite structures', 'CFD', 'Control systems'],
      tools: ['ANSYS Fluent', 'CATIA', 'MATLAB / Simulink', 'XFLR5', 'Python'],
    },
    {
      id: 'biomed',
      name: 'Biomedical Engineering',
      icon: 'HeartPulse',
      overview:
        'Biomedical Engineering applies engineering to medicine — imaging systems, implants, prosthetics, diagnostics and hospital instrumentation.',
      why: 'A rare blend of biology and engineering, with growth in medical devices, wearables and clinical AI.',
      careers: ['Medical Device Engineer', 'Clinical Engineer', 'Biomechanics Engineer', 'Imaging Systems Engineer', 'Regulatory Affairs Specialist', 'Rehabilitation Engineer'],
      skills: ['Human physiology', 'Biomaterials', 'Biosignal processing', 'Instrumentation', 'Medical imaging', 'Regulatory standards'],
      tools: ['MATLAB', 'LabVIEW', 'SolidWorks', 'Python', 'COMSOL'],
    },
    {
      id: 'auto',
      name: 'Automobile Engineering',
      icon: 'Car',
      overview:
        'Automobile Engineering focuses on vehicle design, powertrains, chassis and vehicle dynamics — increasingly centred on electric and software-defined vehicles.',
      why: 'The EV transition has reset the industry, so new entrants can specialise in batteries, motors and vehicle software from day one.',
      careers: ['Vehicle Design Engineer', 'Powertrain Engineer', 'EV / Battery Engineer', 'Vehicle Dynamics Engineer', 'Service & Diagnostics Manager', 'Homologation Engineer'],
      skills: ['IC engines & EV powertrains', 'Vehicle dynamics', 'CAD & packaging', 'Battery systems', 'NVH basics', 'Automotive standards'],
      tools: ['CATIA', 'ANSYS', 'GT-Suite', 'CANoe', 'MATLAB'],
    },
  ],
}

const medical: Field = {
  id: 'medical',
  name: 'Medical & Healthcare',
  tag: 'Care as a profession',
  icon: 'Stethoscope',
  shape: SHAPES.circle,
  theme: { accent: '#fb7185', accent2: '#f472b6', bg: '#0d0409', bg2: '#33081c' },
  overview: {
    what: 'Healthcare covers diagnosis, treatment, rehabilitation and prevention of disease across allopathic, traditional and allied systems of medicine.',
    learn: [
      'Human anatomy, physiology and pathology',
      'Diagnostics, pharmacology and clinical reasoning',
      'Patient communication and medical ethics',
      'Supervised clinical practice under licensed professionals',
    ],
    skills: ['Clinical reasoning', 'Empathy & communication', 'Precision under pressure', 'Sustained memory work', 'Ethical judgement', 'Teamwork'],
    careers: ['Physician', 'Surgeon', 'Dentist', 'Nurse', 'Pharmacist', 'Physiotherapist', 'Public Health Officer'],
    industries: ['Hospitals', 'Clinics & diagnostics', 'Pharmaceuticals', 'Public health', 'Medical research', 'Health technology'],
    higher: ['MD / MS', 'DNB & super-specialisation', 'M.Pharm / Pharm.D', 'MPH', 'PhD in biomedical science'],
    roadmap: 'Biology-heavy school stream → entrance exam → long licensed degree → internship → registration → practice or specialisation.',
    suitable: 'Suits patient, resilient people who can carry responsibility for another person’s wellbeing and study for years.',
  },
  roadmap: [
    { title: 'Foundation', desc: 'Biology, chemistry and physics at school level, plus entrance-exam preparation.', skills: ['Biology', 'Chemistry', 'Entrance prep'] },
    { title: 'Core Concepts', desc: 'Pre-clinical science: anatomy, physiology, biochemistry and pathology.', skills: ['Anatomy', 'Physiology', 'Pathology'] },
    { title: 'Develop Skills', desc: 'Clinical postings — history taking, examination, and procedure practice under supervision.', skills: ['Clinical exam', 'Case presentation'] },
    { title: 'Specialise', desc: 'Choose a discipline and prepare for the postgraduate entrance in it.', skills: ['PG entrance', 'Subject depth'] },
    { title: 'Real-World Experience', desc: 'Compulsory internship, rotations, emergency duty and residency.', skills: ['Internship', 'Residency'] },
    { title: 'Career Launch', desc: 'Council registration, then hospital practice, private setup, or academics and research.', skills: ['Registration', 'Practice setup'] },
  ],
  subs: [
    {
      id: 'mbbs',
      name: 'MBBS',
      icon: 'Stethoscope',
      overview:
        'MBBS is the primary allopathic medical degree — five and a half years including internship — that licenses you to practise as a physician.',
      why: 'The broadest medical licence there is, with respect, stability, and every specialisation from surgery to radiology opening from it.',
      careers: ['General Physician', 'Surgeon', 'Paediatrician', 'Radiologist', 'Anaesthesiologist', 'Public Health Specialist', 'Medical Researcher'],
      skills: ['Diagnostic reasoning', 'Patient examination', 'Pharmacology', 'Emergency management', 'Medical ethics', 'Record keeping'],
      tools: ['Stethoscope & clinical kit', 'Diagnostic imaging', 'EMR systems', 'PubMed', 'Clinical guidelines'],
      roadmap: [
        { title: 'Foundation', desc: 'Physics, chemistry and biology mastered to entrance standard; sit NEET-UG.', skills: ['NEET prep', 'Biology depth'] },
        { title: 'Core Concepts', desc: 'Pre- and para-clinical years: anatomy, physiology, biochemistry, pathology, pharmacology, microbiology.', skills: ['Anatomy', 'Pharmacology', 'Microbiology'] },
        { title: 'Develop Skills', desc: 'Ward postings — take histories, examine patients, present cases, assist procedures.', skills: ['History taking', 'Clinical skills'] },
        { title: 'Specialise', desc: 'Identify your branch during clinicals and prepare for NEET-PG / INI-CET.', skills: ['NEET-PG prep', 'Branch choice'] },
        { title: 'Real-World Experience', desc: 'Compulsory rotating internship, casualty duty, then MD/MS residency.', skills: ['Internship', 'Residency'] },
        { title: 'Career Launch', desc: 'Medical council registration, consultancy in a hospital, private practice, or academic medicine.', skills: ['NMC registration', 'Consultancy'] },
      ],
    },
    {
      id: 'bds',
      name: 'BDS',
      icon: 'Smile',
      overview:
        'BDS is the professional dental degree covering oral anatomy, restorative dentistry, oral surgery and orthodontics across five years including internship.',
      why: 'Clear licensed practice, strong scope for an independent clinic early in your career, and highly procedural hands-on work.',
      careers: ['Dental Surgeon', 'Orthodontist', 'Endodontist', 'Oral & Maxillofacial Surgeon', 'Periodontist', 'Dental Clinic Owner'],
      skills: ['Manual dexterity', 'Oral diagnosis', 'Restorative technique', 'Radiographic reading', 'Patient management', 'Sterilisation protocol'],
      tools: ['Dental chair & handpieces', 'Intraoral radiography', 'CAD/CAM dentistry', 'Impression materials'],
    },
    {
      id: 'nursing',
      name: 'Nursing',
      icon: 'HeartHandshake',
      overview:
        'Nursing (B.Sc / GNM) trains you to deliver and coordinate direct patient care — monitoring, medication, procedures, recovery and patient education.',
      why: 'Global shortage, fast employment after graduation, strong overseas mobility and a clear ladder into specialist and administrative roles.',
      careers: ['Staff Nurse', 'ICU / Critical Care Nurse', 'Nurse Educator', 'Nursing Superintendent', 'Community Health Nurse', 'Nurse Practitioner'],
      skills: ['Patient monitoring', 'Medication administration', 'Wound & post-op care', 'Emergency response', 'Documentation', 'Compassionate communication'],
      tools: ['Vitals monitors', 'Infusion pumps', 'Hospital information systems', 'Care protocols'],
      roadmap: [
        { title: 'Foundation', desc: 'Science stream basics plus B.Sc Nursing admission and nursing fundamentals.', skills: ['Biology', 'Nursing foundations'] },
        { title: 'Core Concepts', desc: 'Medical-surgical nursing, pharmacology, microbiology, obstetrics and paediatrics.', skills: ['Med-surg nursing', 'Pharmacology'] },
        { title: 'Develop Skills', desc: 'Clinical rotations: injections, catheterisation, dressing, vitals, patient handover.', skills: ['Clinical procedures', 'Handover'] },
        { title: 'Specialise', desc: 'Critical care, cardiac, oncology, paediatric or operation-theatre nursing.', skills: ['Specialty certification', 'BLS / ACLS'] },
        { title: 'Real-World Experience', desc: 'Internship year, night duty, ICU exposure and rural community postings.', skills: ['Internship', 'ICU rotation'] },
        { title: 'Career Launch', desc: 'Nursing council registration, hospital recruitment, or overseas licensing exams like NCLEX / OET.', skills: ['Registration', 'NCLEX / OET'] },
      ],
    },
    {
      id: 'pharmacy',
      name: 'Pharmacy',
      icon: 'Pill',
      overview:
        'Pharmacy covers drug chemistry, formulation, dispensing and pharmacovigilance — spanning community practice, industry and clinical pharmacy.',
      why: 'One degree opens three very different routes: retail/hospital dispensing, pharmaceutical manufacturing, or regulatory and clinical research.',
      careers: ['Hospital Pharmacist', 'Clinical Pharmacist', 'Formulation Scientist', 'Regulatory Affairs Associate', 'Medical Science Liaison', 'Quality Assurance Officer'],
      skills: ['Pharmacology', 'Pharmaceutics & formulation', 'Drug interaction analysis', 'GMP & quality systems', 'Dispensing accuracy', 'Documentation'],
      tools: ['HPLC & analytical instruments', 'Pharmacopoeias', 'LIMS', 'Regulatory dossiers'],
    },
    {
      id: 'physio',
      name: 'Physiotherapy',
      icon: 'Activity',
      overview:
        'Physiotherapy (BPT) restores movement and function through assessment, manual therapy, exercise prescription and rehabilitation.',
      why: 'Non-pharmacological, highly hands-on, and in demand across sports, orthopaedics, neuro-rehab and elderly care.',
      careers: ['Musculoskeletal Physiotherapist', 'Sports Physiotherapist', 'Neuro Rehabilitation Therapist', 'Cardiopulmonary Physiotherapist', 'Rehab Centre Owner', 'Ergonomics Consultant'],
      skills: ['Functional assessment', 'Manual therapy', 'Exercise prescription', 'Electrotherapy', 'Gait analysis', 'Patient motivation'],
      tools: ['Goniometer', 'TENS / ultrasound therapy', 'Rehab equipment', 'Gait analysis software'],
    },
    {
      id: 'ayurveda',
      name: 'Ayurveda',
      icon: 'Flower2',
      overview:
        'BAMS trains practitioners in Ayurvedic diagnosis, herbal pharmacology and panchakarma alongside modern anatomy and physiology.',
      why: 'Formally recognised practice with growing demand in wellness, chronic-care management and integrative medicine.',
      careers: ['Ayurvedic Physician', 'Panchakarma Specialist', 'Wellness Consultant', 'Ayurvedic Pharmacologist', 'Researcher in AYUSH', 'Clinic Owner'],
      skills: ['Ayurvedic diagnosis', 'Herbal pharmacology', 'Panchakarma technique', 'Diet & lifestyle planning', 'Sanskrit terminology', 'Patient counselling'],
      tools: ['Classical texts', 'Herbal formulary', 'Panchakarma setup', 'AYUSH guidelines'],
    },
    {
      id: 'homeopathy',
      name: 'Homeopathy',
      icon: 'Droplets',
      overview:
        'BHMS covers homeopathic materia medica, repertory and case-taking together with conventional medical sciences.',
      why: 'Independent practice is possible early, consultations are detailed and patient-centred, and setup costs are low.',
      careers: ['Homeopathic Physician', 'Consultant Homeopath', 'Materia Medica Lecturer', 'Clinic Owner', 'AYUSH Medical Officer', 'Researcher'],
      skills: ['Detailed case taking', 'Repertorisation', 'Materia medica recall', 'Patient counselling', 'Chronic case management', 'Clinical record keeping'],
      tools: ['Repertory software', 'Materia medica', 'Case registers'],
    },
    {
      id: 'siddha',
      name: 'Siddha',
      icon: 'Sparkles',
      overview:
        'BSMS teaches the Siddha system — pulse-based diagnosis, mineral and herbal preparations, and traditional therapeutic regimens.',
      why: 'A specialised, regionally strong system with government dispensary roles and little competition compared to mainstream medicine.',
      careers: ['Siddha Physician', 'Government AYUSH Medical Officer', 'Siddha Pharmacologist', 'Lecturer', 'Wellness Consultant', 'Researcher'],
      skills: ['Naadi (pulse) diagnosis', 'Herbo-mineral preparation', 'Traditional therapeutics', 'Tamil medical texts', 'Patient assessment'],
      tools: ['Classical Siddha texts', 'Preparation equipment', 'AYUSH protocols'],
    },
    {
      id: 'unani',
      name: 'Unani',
      icon: 'Moon',
      overview:
        'BUMS covers Unani medicine — temperament-based diagnosis, regimental therapy and pharmacopoeial formulations — with modern medical basics.',
      why: 'Recognised AYUSH stream with government service routes, teaching posts and independent clinical practice.',
      careers: ['Unani Physician', 'AYUSH Medical Officer', 'Regimental Therapy Specialist', 'Lecturer', 'Drug Formulation Researcher', 'Clinic Owner'],
      skills: ['Mizaj assessment', 'Ilaj-bil-tadbeer', 'Unani pharmacology', 'Arabic / Urdu texts', 'Clinical diagnosis'],
      tools: ['Unani pharmacopoeia', 'Regimental therapy setup', 'Clinical registers'],
    },
    {
      id: 'naturopathy',
      name: 'Naturopathy & Yoga',
      icon: 'Leaf',
      overview:
        'BNYS combines naturopathic therapeutics — diet, hydrotherapy, fasting, massage — with structured yoga therapy and modern medical fundamentals.',
      why: 'Rides directly on the preventive-health and wellness boom, with resorts, corporate wellness and lifestyle clinics all recruiting.',
      careers: ['Naturopathy Physician', 'Yoga Therapist', 'Wellness Centre Consultant', 'Lifestyle Medicine Coach', 'Corporate Wellness Trainer', 'Spa & Retreat Director'],
      skills: ['Yoga therapy', 'Diet & fasting therapy', 'Hydrotherapy', 'Massage & manipulative therapy', 'Lifestyle counselling', 'Stress management'],
      tools: ['Hydrotherapy units', 'Yoga props', 'Diet planning tools', 'Body composition analysers'],
    },
  ],
}

const commerce: Field = {
  id: 'commerce',
  name: 'Commerce & Finance',
  tag: 'Move capital intelligently',
  icon: 'Landmark',
  shape: SHAPES.diamond,
  theme: { accent: '#fbbf24', accent2: '#a3e635', bg: '#0b0904', bg2: '#2b2005' },
  overview: {
    what: 'Commerce and finance deal with how money is recorded, audited, regulated, raised and invested — the accounting and capital layer under every business.',
    learn: [
      'Accounting standards and financial reporting',
      'Taxation, audit and corporate law',
      'Valuation, markets and risk',
      'Financial modelling and analysis',
    ],
    skills: ['Numerical accuracy', 'Analytical reasoning', 'Regulatory literacy', 'Excel & modelling', 'Ethical judgement', 'Client communication'],
    careers: ['Chartered Accountant', 'Company Secretary', 'Investment Banker', 'Financial Analyst', 'Auditor', 'Risk Manager'],
    industries: ['Audit & advisory firms', 'Banking', 'Capital markets', 'Corporate finance teams', 'Insurance', 'Fintech'],
    higher: ['CA / CS / CMA', 'CFA & FRM', 'M.Com', 'MBA Finance', 'Actuarial fellowship'],
    roadmap: 'Commerce base → professional exam track → articleship or analyst role → domain specialisation → senior finance leadership.',
    suitable: 'Suits detail-oriented, disciplined people who enjoy rules, numbers and long exam-driven qualifications with high payoff.',
  },
  roadmap: [
    { title: 'Foundation', desc: 'Accounting fundamentals, business mathematics and economics.', skills: ['Accounting', 'Business maths', 'Economics'] },
    { title: 'Core Concepts', desc: 'Financial reporting, cost accounting, taxation and corporate law.', skills: ['Financial reporting', 'Taxation', 'Law'] },
    { title: 'Develop Skills', desc: 'Advanced Excel, financial modelling, and one accounting or analytics tool.', skills: ['Excel', 'Modelling', 'Tally / ERP'] },
    { title: 'Specialise', desc: 'Audit, direct tax, valuation, treasury, equity research or risk.', skills: ['Domain electives', 'Certification'] },
    { title: 'Real-World Experience', desc: 'Articleship or finance internship with live clients, closings and filings.', skills: ['Articleship', 'Live filings'] },
    { title: 'Career Launch', desc: 'Clear the final professional exam, then firm placement, industry role or independent practice.', skills: ['Final exams', 'Placement'] },
  ],
  subs: [
    {
      id: 'ca',
      name: 'CA (Chartered Accountancy)',
      icon: 'Calculator',
      overview:
        'Chartered Accountancy is a three-stage professional qualification — Foundation, Intermediate, Final — plus articleship, covering audit, taxation and financial reporting.',
      why: 'A statutory qualification with signing authority: high credibility, independent practice rights and strong industry demand.',
      careers: ['Statutory Auditor', 'Tax Consultant', 'CFO / Finance Controller', 'Forensic Auditor', 'Internal Audit Lead', 'Practising CA'],
      skills: ['Financial reporting', 'Audit & assurance', 'Direct & indirect tax', 'Corporate law', 'Costing', 'Excel & analytics'],
      tools: ['Tally / SAP', 'Advanced Excel', 'GST & income-tax portals', 'Audit software'],
      roadmap: [
        { title: 'Foundation', desc: 'Register and clear CA Foundation: accounting, law, maths and economics.', skills: ['CA Foundation', 'Accounting basics'] },
        { title: 'Core Concepts', desc: 'Intermediate groups — advanced accounting, audit, taxation, costing and law.', skills: ['CA Inter', 'Taxation', 'Audit'] },
        { title: 'Develop Skills', desc: 'Articleship: real audits, GST and TDS filings, ROC work and client handling.', skills: ['Articleship', 'Filings', 'Client work'] },
        { title: 'Specialise', desc: 'Pick electives and a practice line — indirect tax, international tax, valuation or forensic audit.', skills: ['Electives', 'Practice focus'] },
        { title: 'Real-World Experience', desc: 'Lead audit assignments, handle assessments, manage juniors during articleship.', skills: ['Assignment ownership', 'Assessments'] },
        { title: 'Career Launch', desc: 'Clear CA Final, get membership, then join a firm, go into industry, or start practice.', skills: ['CA Final', 'ICAI membership'] },
      ],
    },
    {
      id: 'cs',
      name: 'CS (Company Secretary)',
      icon: 'FileSignature',
      overview:
        'Company Secretaryship trains you in corporate governance, secretarial compliance, securities law and board procedure.',
      why: 'Every sizeable company legally needs this expertise, and the role sits close to the board with excellent visibility.',
      careers: ['Company Secretary', 'Compliance Officer', 'Governance Consultant', 'Legal & Secretarial Manager', 'Practising CS', 'Corporate Advisor'],
      skills: ['Company law', 'Securities regulation', 'Board & meeting procedure', 'Drafting resolutions', 'Compliance calendars', 'Stakeholder communication'],
      tools: ['MCA portal', 'SEBI filings', 'Compliance management software', 'Drafting templates'],
    },
    {
      id: 'cma',
      name: 'CMA',
      icon: 'PieChart',
      overview:
        'Cost and Management Accountancy focuses on costing, budgeting, performance measurement and internal decision support rather than statutory audit.',
      why: 'Manufacturing, infrastructure and services all need cost control, and CMAs are the specialists who own that number.',
      careers: ['Cost Accountant', 'Management Accountant', 'FP&A Analyst', 'Cost Auditor', 'Pricing Manager', 'Business Controller'],
      skills: ['Cost accounting', 'Budgeting & variance analysis', 'Performance management', 'Strategic cost control', 'Costing software', 'Reporting'],
      tools: ['SAP CO', 'Advanced Excel', 'Power BI', 'ERP costing modules'],
    },
    {
      id: 'banking',
      name: 'Banking',
      icon: 'Building',
      overview:
        'Banking careers span retail and corporate banking, credit appraisal, treasury operations and regulatory compliance inside banks and NBFCs.',
      why: 'Structured entry through competitive exams, strong job security, and a clear promotion ladder into credit and branch leadership.',
      careers: ['Probationary Officer', 'Credit Analyst', 'Relationship Manager', 'Treasury Officer', 'Branch Manager', 'Risk & Compliance Officer'],
      skills: ['Credit appraisal', 'Financial statement analysis', 'KYC & regulation', 'Customer relationship management', 'Product knowledge', 'Quantitative aptitude'],
      tools: ['Core banking systems', 'Excel', 'Credit scoring models', 'RBI circulars'],
    },
    {
      id: 'finance',
      name: 'Finance',
      icon: 'TrendingUp',
      overview:
        'Corporate and market finance covers capital raising, valuation, budgeting, treasury and financial strategy for organisations.',
      why: 'Directly tied to how decisions get made at the top — and it pays for analytical depth rather than seniority alone.',
      careers: ['Financial Analyst', 'Corporate Finance Associate', 'FP&A Manager', 'Treasury Analyst', 'Investment Banking Analyst', 'CFO track'],
      skills: ['Financial modelling', 'Valuation (DCF, comps)', 'Capital budgeting', 'Working capital management', 'Data analysis', 'Presentation'],
      tools: ['Excel', 'Bloomberg / Capital IQ', 'Power BI', 'Python for finance'],
    },
    {
      id: 'investment',
      name: 'Investment',
      icon: 'LineChart',
      overview:
        'Investment careers analyse securities and allocate capital — equity research, portfolio management, wealth advisory and private markets.',
      why: 'Merit-visible work: your analysis is measured against the market, and strong performers move up very fast.',
      careers: ['Equity Research Analyst', 'Portfolio Manager', 'Wealth Manager', 'Private Equity Analyst', 'Fund Accountant', 'Quant Analyst'],
      skills: ['Security analysis', 'Portfolio theory', 'Sector research', 'Risk management', 'Modelling', 'Behavioural discipline'],
      tools: ['Bloomberg Terminal', 'Excel', 'Python / R', 'Screener tools'],
    },
    {
      id: 'bcom',
      name: 'B.Com',
      icon: 'BookOpen',
      overview:
        'B.Com is the flexible three-year commerce degree covering accounting, business law, economics and taxation — often paired with a professional course.',
      why: 'Low-risk, broad base that keeps CA, CS, MBA, banking exams and analytics all open at once.',
      careers: ['Accounts Executive', 'Tax Assistant', 'Audit Associate', 'Banking Officer', 'Business Analyst', 'Entrepreneur'],
      skills: ['Bookkeeping', 'Business law', 'GST fundamentals', 'Excel', 'Economics', 'Business communication'],
      tools: ['Tally', 'Excel', 'GST portal', 'QuickBooks / Zoho Books'],
    },
    {
      id: 'mcom',
      name: 'M.Com',
      icon: 'GraduationCap',
      overview:
        'M.Com deepens commerce theory — advanced accounting, financial management and research methods — and is the academic route in commerce.',
      why: 'The cleanest path to lectureship, NET/JRF and commerce research, while still adding weight to corporate finance roles.',
      careers: ['Assistant Professor', 'Research Scholar', 'Financial Analyst', 'Senior Accountant', 'Academic Content Specialist', 'Government Commerce Officer'],
      skills: ['Advanced accounting', 'Financial management', 'Research methodology', 'Statistics', 'Academic writing', 'Teaching'],
      tools: ['SPSS', 'Excel', 'Reference managers', 'Journal databases'],
    },
    {
      id: 'actuarial',
      name: 'Actuarial Science',
      icon: 'Sigma',
      overview:
        'Actuarial science prices risk mathematically — mortality, insurance liabilities, pensions and reserves — through a sequence of professional exams.',
      why: 'Extremely high scarcity value: few people finish the exams, and qualified actuaries are paid accordingly.',
      careers: ['Actuarial Analyst', 'Pricing Actuary', 'Reserving Actuary', 'Pension Consultant', 'Risk Modeller', 'Chief Actuary'],
      skills: ['Probability & statistics', 'Survival models', 'Financial mathematics', 'Programming', 'Risk modelling', 'Exam stamina'],
      tools: ['R', 'Python', 'Excel / VBA', 'Prophet / actuarial software'],
      roadmap: [
        { title: 'Foundation', desc: 'Strong probability, calculus and statistics; clear the first actuarial exams.', skills: ['Probability', 'Statistics', 'CS/CM papers'] },
        { title: 'Core Concepts', desc: 'Financial mathematics, survival models, contingencies and business economics.', skills: ['Contingencies', 'Financial maths'] },
        { title: 'Develop Skills', desc: 'Build models in R/Python and Excel; learn insurance data structures.', skills: ['R / Python', 'Model building'] },
        { title: 'Specialise', desc: 'Life, general insurance, health, pensions or enterprise risk.', skills: ['Specialist papers', 'Domain reading'] },
        { title: 'Real-World Experience', desc: 'Actuarial analyst role — pricing runs, reserving cycles and regulatory reporting.', skills: ['Analyst role', 'Reserving cycle'] },
        { title: 'Career Launch', desc: 'Complete fellowship exams, gain practising certification, move into signing-actuary roles.', skills: ['Fellowship', 'Certification'] },
      ],
    },
  ],
}

const management: Field = {
  id: 'management',
  name: 'Management',
  tag: 'Lead people and outcomes',
  icon: 'Briefcase',
  shape: SHAPES.octagon,
  theme: { accent: '#a855f7', accent2: '#c084fc', bg: '#08040f', bg2: '#22083a' },
  overview: {
    what: 'Management is the discipline of organising people, money and processes so an organisation reliably produces results.',
    learn: [
      'Strategy, marketing, finance and operations fundamentals',
      'Organisational behaviour and people management',
      'Data-driven decision making',
      'Case-based problem solving and negotiation',
    ],
    skills: ['Leadership', 'Communication', 'Analytical decision making', 'Negotiation', 'Prioritisation', 'Stakeholder management'],
    careers: ['Business Analyst', 'Marketing Manager', 'HR Manager', 'Operations Manager', 'Product Manager', 'Consultant'],
    industries: ['Consulting', 'FMCG & retail', 'Technology', 'Banking & financial services', 'Hospitality', 'Logistics'],
    higher: ['MBA / PGDM', 'Executive MBA', 'Specialised masters', 'PhD in management'],
    roadmap: 'Business fundamentals → functional depth → internship → specialisation → leadership role → general management.',
    suitable: 'Suits people who prefer coordinating and persuading over solitary technical work, and who like ambiguity.',
  },
  roadmap: [
    { title: 'Foundation', desc: 'Business basics: accounting, economics, statistics and communication.', skills: ['Economics', 'Statistics', 'Communication'] },
    { title: 'Core Concepts', desc: 'Marketing, finance, operations, strategy and organisational behaviour.', skills: ['Strategy', 'Marketing', 'Operations'] },
    { title: 'Develop Skills', desc: 'Case competitions, live consulting projects, data tools and public speaking.', skills: ['Case solving', 'Excel & BI', 'Presenting'] },
    { title: 'Specialise', desc: 'Commit to one function and build measurable proof in it.', skills: ['Functional depth', 'Certification'] },
    { title: 'Real-World Experience', desc: 'Summer internship with a real P&L or campaign, plus leadership of a college body.', skills: ['Internship', 'Team leadership'] },
    { title: 'Career Launch', desc: 'Placement interviews, guesstimates, CV storytelling and alumni networking.', skills: ['Interviews', 'Networking'] },
  ],
  subs: [
    {
      id: 'bba',
      name: 'BBA',
      icon: 'Briefcase',
      overview:
        'BBA is a three-year undergraduate business degree giving early exposure to marketing, finance, HR and operations with practical projects.',
      why: 'Starts your management training three years earlier than most, and makes an MBA or family-business entry much smoother.',
      careers: ['Management Trainee', 'Sales Executive', 'Business Development Associate', 'Marketing Coordinator', 'HR Assistant', 'Entrepreneur'],
      skills: ['Business communication', 'Marketing basics', 'Financial literacy', 'Team coordination', 'Excel', 'Presentation'],
      tools: ['Excel', 'Canva', 'CRM basics', 'Google Analytics'],
    },
    {
      id: 'mba',
      name: 'MBA',
      icon: 'Award',
      overview:
        'The MBA is a two-year graduate management degree built on case method, functional specialisation and a summer internship.',
      why: 'The strongest single career accelerator in business: it resets your role, salary band and network simultaneously.',
      careers: ['Management Consultant', 'Product Manager', 'Investment Banking Associate', 'Brand Manager', 'Operations Lead', 'General Manager'],
      skills: ['Strategic thinking', 'Financial analysis', 'Leadership', 'Negotiation', 'Data-driven decisions', 'Structured communication'],
      tools: ['Excel', 'Power BI / Tableau', 'SQL basics', 'Case frameworks'],
      roadmap: [
        { title: 'Foundation', desc: 'Build quant, verbal and logic for CAT/GMAT while gaining early work experience.', skills: ['CAT / GMAT prep', 'Work experience'] },
        { title: 'Core Concepts', desc: 'First-year core: marketing, finance, operations, HR, strategy, economics.', skills: ['Core courses', 'Case method'] },
        { title: 'Develop Skills', desc: 'Case competitions, club leadership, analytics tools and consulting-style structuring.', skills: ['Frameworks', 'Analytics', 'Public speaking'] },
        { title: 'Specialise', desc: 'Choose a major and stack electives plus certifications behind it.', skills: ['Major electives', 'Certification'] },
        { title: 'Real-World Experience', desc: 'Summer internship with a defined business problem and a converted PPO if possible.', skills: ['Summer internship', 'Live project'] },
        { title: 'Career Launch', desc: 'Final placements: guesstimates, case interviews, CV narrative and alumni referrals.', skills: ['Case interviews', 'Placement prep'] },
      ],
    },
    {
      id: 'marketing',
      name: 'Marketing',
      icon: 'Megaphone',
      overview:
        'Marketing understands demand and shapes it — research, positioning, brand, pricing, channels and performance campaigns.',
      why: 'Results are measurable and public, digital skills compound fast, and creativity plus analytics both count.',
      careers: ['Brand Manager', 'Digital Marketing Manager', 'Performance Marketer', 'Market Research Analyst', 'Growth Manager', 'CMO track'],
      skills: ['Consumer insight', 'Brand positioning', 'Campaign analytics', 'Copy & content', 'SEO / SEM', 'Budget management'],
      tools: ['Google Ads', 'GA4', 'Meta Ads Manager', 'HubSpot', 'Figma'],
    },
    {
      id: 'hr',
      name: 'Human Resources (HR)',
      icon: 'Users',
      overview:
        'HR builds and maintains the workforce — hiring, compensation, performance, employee relations and organisational culture.',
      why: 'People decisions determine company outcomes; HR gives you influence over them with strong work-life balance.',
      careers: ['Talent Acquisition Specialist', 'HR Business Partner', 'Compensation & Benefits Analyst', 'L&D Manager', 'Employee Relations Lead', 'CHRO track'],
      skills: ['Interviewing & assessment', 'Labour law basics', 'Compensation structuring', 'Conflict resolution', 'HR analytics', 'Empathy'],
      tools: ['Workday / SAP SuccessFactors', 'LinkedIn Recruiter', 'Excel', 'ATS platforms'],
    },
    {
      id: 'mgmt-finance',
      name: 'Finance',
      icon: 'Coins',
      overview:
        'Finance within management focuses on allocating capital, planning budgets and steering business performance from the numbers.',
      why: 'The function closest to the CEO’s decisions, with a direct route to controller and CFO roles.',
      careers: ['FP&A Analyst', 'Corporate Development Associate', 'Treasury Manager', 'Business Finance Partner', 'Investor Relations Manager', 'CFO track'],
      skills: ['Financial modelling', 'Budget planning', 'Variance analysis', 'Valuation', 'Business partnering', 'Reporting'],
      tools: ['Excel', 'SAP / Oracle', 'Power BI', 'Anaplan'],
    },
    {
      id: 'operations',
      name: 'Operations',
      icon: 'Workflow',
      overview:
        'Operations designs and improves how work actually flows — supply chain, capacity, quality, cost and delivery reliability.',
      why: 'Every efficiency gain is visible on the bottom line, and process skills transfer across manufacturing, e-commerce and services.',
      careers: ['Supply Chain Analyst', 'Operations Manager', 'Logistics Lead', 'Process Excellence Consultant', 'Plant Manager', 'COO track'],
      skills: ['Process mapping', 'Inventory & demand planning', 'Lean / Six Sigma', 'Vendor management', 'Data analysis', 'Cost control'],
      tools: ['SAP MM/PP', 'Excel', 'Minitab', 'Power BI', 'WMS platforms'],
    },
    {
      id: 'hotel',
      name: 'Hotel Management',
      icon: 'Hotel',
      overview:
        'Hotel management covers hospitality operations — front office, food and beverage, housekeeping, revenue management and guest experience.',
      why: 'Global mobility, early hands-on responsibility, and skills that transfer into cruise lines, aviation and luxury retail.',
      careers: ['Front Office Manager', 'F&B Manager', 'Executive Chef track', 'Revenue Manager', 'Guest Relations Manager', 'General Manager'],
      skills: ['Guest service excellence', 'F&B operations', 'Revenue management', 'Team scheduling', 'Hygiene & safety standards', 'Multilingual communication'],
      tools: ['Opera PMS', 'POS systems', 'Channel managers', 'Excel'],
    },
    {
      id: 'event',
      name: 'Event Management',
      icon: 'PartyPopper',
      overview:
        'Event management plans and executes conferences, weddings, launches and festivals — budgets, vendors, logistics and on-site delivery.',
      why: 'High-energy, project-based work with fast feedback, and an easy route into running your own agency.',
      careers: ['Event Planner', 'Production Manager', 'Sponsorship Manager', 'Wedding Planner', 'Brand Activation Lead', 'Agency Founder'],
      skills: ['Project planning', 'Vendor negotiation', 'Budgeting', 'Crisis handling', 'Client management', 'Creative conceptualisation'],
      tools: ['Project management tools', 'Excel budgets', 'CAD floor plans', 'Ticketing platforms'],
    },
  ],
}

const law: Field = {
  id: 'law',
  name: 'Law',
  tag: 'Argue, draft, defend',
  icon: 'Scale',
  shape: SHAPES.shield,
  theme: { accent: '#fb923c', accent2: '#f59e0b', bg: '#0d0703', bg2: '#331704' },
  overview: {
    what: 'Law is the study and practice of the rules that bind society — interpreting statutes, advising clients, drafting agreements and litigating disputes.',
    learn: [
      'Constitutional, civil, criminal and corporate law',
      'Legal research, drafting and interpretation',
      'Advocacy, evidence and procedure',
      'Ethics and professional responsibility',
    ],
    skills: ['Legal research', 'Precise drafting', 'Oral advocacy', 'Logical reasoning', 'Reading at volume', 'Client counselling'],
    careers: ['Litigator', 'Corporate Lawyer', 'Judicial Officer', 'Legal Advisor', 'Public Prosecutor', 'Legal Academic'],
    industries: ['Law firms', 'Courts & judiciary', 'Corporate legal teams', 'Government', 'NGOs & policy', 'Compliance'],
    higher: ['LLM', 'Judicial service exams', 'PhD in law', 'Specialised diplomas', 'Company Secretaryship'],
    roadmap: 'Law entrance → LLB → internships in chambers and firms → bar enrolment → practice area specialisation.',
    suitable: 'Suits argumentative, precise readers who can absorb dense text and stay composed under challenge.',
  },
  roadmap: [
    { title: 'Foundation', desc: 'Legal aptitude, logical reasoning, English and general knowledge for the entrance.', skills: ['CLAT prep', 'Reasoning', 'Current affairs'] },
    { title: 'Core Concepts', desc: 'Constitution, contracts, torts, criminal law and procedural codes.', skills: ['Constitutional law', 'Contracts', 'CrPC / CPC'] },
    { title: 'Develop Skills', desc: 'Moot courts, legal research databases, drafting petitions and client interviews.', skills: ['Mooting', 'Drafting', 'Legal research'] },
    { title: 'Specialise', desc: 'Choose litigation, corporate, criminal, IP, tax or policy work.', skills: ['Practice area', 'Seminar papers'] },
    { title: 'Real-World Experience', desc: 'Chamber and firm internships, legal-aid clinics, published notes and case observation.', skills: ['Internships', 'Legal aid'] },
    { title: 'Career Launch', desc: 'Bar enrolment and AIBE, then firm recruitment, independent practice or judicial exams.', skills: ['AIBE', 'Bar enrolment'] },
  ],
  subs: [
    {
      id: 'llb',
      name: 'LLB',
      icon: 'Scale',
      overview:
        'LLB is the professional law degree — five years after school or three years after graduation — that qualifies you to enrol as an advocate.',
      why: 'The gateway to every legal role: litigation, corporate practice, judiciary and policy all require it.',
      careers: ['Advocate', 'Corporate Legal Associate', 'Legal Researcher', 'Public Prosecutor', 'Judicial Service Aspirant', 'Compliance Officer'],
      skills: ['Statutory interpretation', 'Drafting & pleading', 'Advocacy', 'Case analysis', 'Legal writing', 'Client handling'],
      tools: ['SCC Online / Manupatra', 'Bare Acts', 'Drafting formats', 'Court e-filing portals'],
      roadmap: [
        { title: 'Foundation', desc: 'Clear CLAT/AILET or a university law entrance; build reading speed and current-affairs depth.', skills: ['CLAT / AILET', 'Reading speed'] },
        { title: 'Core Concepts', desc: 'Constitutional law, contracts, torts, IPC, CrPC, CPC and evidence.', skills: ['Substantive law', 'Procedure'] },
        { title: 'Develop Skills', desc: 'Moot courts, client counselling competitions, drafting exercises and database research.', skills: ['Mooting', 'Drafting', 'Research'] },
        { title: 'Specialise', desc: 'Corporate, criminal, constitutional, IP, tax or arbitration — build a niche.', skills: ['Electives', 'Niche internships'] },
        { title: 'Real-World Experience', desc: 'Senior-counsel chambers, law-firm internships, legal aid and observing live trials.', skills: ['Chamber internship', 'Trial observation'] },
        { title: 'Career Launch', desc: 'Enrol with the bar, clear AIBE, then join a firm, start practice, or attempt judiciary.', skills: ['AIBE', 'Placement / practice'] },
      ],
    },
    {
      id: 'llm',
      name: 'LLM',
      icon: 'BookMarked',
      overview:
        'LLM is a postgraduate law degree offering deep specialisation and research training in a chosen branch of law.',
      why: 'Necessary for legal academia and highly valued for niche advisory work and international practice.',
      careers: ['Legal Academic', 'Policy Researcher', 'Specialist Counsel', 'International Law Advisor', 'Judicial Clerk', 'Think-tank Analyst'],
      skills: ['Advanced legal research', 'Comparative law', 'Academic writing', 'Doctrinal analysis', 'Teaching', 'Policy drafting'],
      tools: ['HeinOnline', 'Westlaw', 'Citation managers', 'Law journals'],
    },
    {
      id: 'corporate-law',
      name: 'Corporate Law',
      icon: 'Building2',
      overview:
        'Corporate law advises companies on transactions, governance and regulation — M&A, fundraising, contracts and compliance.',
      why: 'The highest-paying private legal track, with structured firm careers and international exposure.',
      careers: ['M&A Associate', 'General Counsel', 'Securities Law Specialist', 'Contract Manager', 'Compliance Head', 'Transaction Advisor'],
      skills: ['Contract drafting', 'Due diligence', 'Companies Act & SEBI regulation', 'Negotiation', 'Deal structuring', 'Risk assessment'],
      tools: ['Data rooms', 'Contract lifecycle tools', 'Manupatra', 'MCA / SEBI portals'],
    },
    {
      id: 'criminal-law',
      name: 'Criminal Law',
      icon: 'Gavel',
      overview:
        'Criminal law deals with offences, prosecution and defence — bail, trial strategy, evidence and sentencing.',
      why: 'Courtroom-heavy, socially consequential work where reputation builds fast on trial performance.',
      careers: ['Criminal Defence Advocate', 'Public Prosecutor', 'Legal Aid Counsel', 'Cybercrime Specialist', 'Judicial Officer', 'Forensic Legal Consultant'],
      skills: ['Trial advocacy', 'Evidence law', 'Cross-examination', 'Bail drafting', 'Case investigation', 'Composure'],
      tools: ['Bare Acts (BNS/BNSS)', 'Case law databases', 'Forensic reports', 'Court records'],
    },
    {
      id: 'civil-law',
      name: 'Civil Law',
      icon: 'FileText',
      overview:
        'Civil law resolves private disputes — property, contracts, family matters, succession and recovery suits.',
      why: 'Steady, document-driven practice with long-term client relationships and predictable independent income.',
      careers: ['Civil Litigation Advocate', 'Property Law Specialist', 'Family Law Practitioner', 'Arbitration Counsel', 'Legal Consultant', 'Mediator'],
      skills: ['Pleading & drafting', 'Property title analysis', 'Limitation & procedure', 'Negotiation', 'Client counselling', 'Documentation'],
      tools: ['CPC commentaries', 'Land records portals', 'Drafting formats', 'Case databases'],
    },
    {
      id: 'judiciary',
      name: 'Judiciary',
      icon: 'Landmark',
      overview:
        'The judicial services route places law graduates on the bench as civil judges through highly competitive state examinations.',
      why: 'Prestige, security, and the ability to decide rather than argue — with a defined promotion path to higher courts.',
      careers: ['Civil Judge (Junior Division)', 'Judicial Magistrate', 'District Judge', 'Additional District Judge', 'Tribunal Member', 'High Court Judge track'],
      skills: ['Procedural mastery', 'Judgment writing', 'Evidence appreciation', 'Impartiality', 'Local language proficiency', 'Exam discipline'],
      tools: ['Bare Acts', 'Judgment compilations', 'Previous-year papers', 'Court manuals'],
      roadmap: [
        { title: 'Foundation', desc: 'Complete LLB with strong command of the Constitution and procedural codes.', skills: ['LLB', 'Constitution'] },
        { title: 'Core Concepts', desc: 'Master CPC, CrPC, Evidence, Contract, Property and local laws line by line.', skills: ['Procedure', 'Evidence', 'Local laws'] },
        { title: 'Develop Skills', desc: 'Answer writing, judgment drafting, translation practice and daily revision cycles.', skills: ['Answer writing', 'Translation'] },
        { title: 'Specialise', desc: 'Target one state’s syllabus, its local acts and its language paper.', skills: ['State syllabus', 'Language paper'] },
        { title: 'Real-World Experience', desc: 'Court observation, chamber work and full-length mock prelims and mains.', skills: ['Court practice', 'Mock tests'] },
        { title: 'Career Launch', desc: 'Clear prelims, mains and viva; join judicial academy training and take charge of a court.', skills: ['Mains & viva', 'Academy training'] },
      ],
    },
    {
      id: 'legal-consultancy',
      name: 'Legal Consultancy',
      icon: 'Handshake',
      overview:
        'Legal consultancy advises organisations on regulation, risk and contracts without necessarily appearing in court.',
      why: 'Advisory hours, corporate schedules and the option to build an independent practice serving startups and SMEs.',
      careers: ['Legal Consultant', 'Regulatory Advisor', 'Contract Specialist', 'Data Privacy Consultant', 'Policy Advisor', 'Independent Counsel'],
      skills: ['Regulatory analysis', 'Advisory drafting', 'Risk mapping', 'Commercial awareness', 'Client communication', 'Compliance design'],
      tools: ['Contract templates', 'Compliance trackers', 'Regulatory databases', 'CLM software'],
    },
  ],
}

const science: Field = {
  id: 'science',
  name: 'Science & Research',
  tag: 'Ask, test, publish',
  icon: 'Atom',
  shape: SHAPES.heptagon,
  theme: { accent: '#2dd4bf', accent2: '#34d399', bg: '#030b0a', bg2: '#052b28' },
  overview: {
    what: 'Science and research generate new knowledge through observation, theory and experiment, and translate it into technology and policy.',
    learn: [
      'Deep theory in a chosen discipline',
      'Experimental design and instrumentation',
      'Statistics, computation and data analysis',
      'Scientific writing and peer review',
    ],
    skills: ['Hypothesis design', 'Quantitative analysis', 'Lab technique', 'Programming', 'Scientific writing', 'Patience with failure'],
    careers: ['Research Scientist', 'Lab Analyst', 'Professor', 'Data Scientist', 'R&D Specialist', 'Scientific Officer'],
    industries: ['National labs', 'Universities', 'Pharma & biotech', 'Space & defence', 'Environment agencies', 'Deep-tech startups'],
    higher: ['M.Sc', 'Integrated PhD', 'PhD', 'Post-doctoral research', 'JRF via NET / GATE'],
    roadmap: 'Strong science base → M.Sc → research entrance (NET/GATE/JEST) → PhD → publications → scientist or faculty role.',
    suitable: 'Suits deeply curious, self-directed people comfortable with slow progress and repeated failure.',
  },
  roadmap: [
    { title: 'Foundation', desc: 'Master the mathematics and core theory of your discipline.', skills: ['Core theory', 'Mathematics'] },
    { title: 'Core Concepts', desc: 'Advanced coursework plus real laboratory and computational technique.', skills: ['Advanced theory', 'Lab methods'] },
    { title: 'Develop Skills', desc: 'Run your own small project: design, measure, analyse and write it up.', skills: ['Experiment design', 'Data analysis', 'Writing'] },
    { title: 'Specialise', desc: 'Find a sub-field and a research group whose questions you actually care about.', skills: ['Literature review', 'Group selection'] },
    { title: 'Real-World Experience', desc: 'Summer research fellowships, national lab internships and a first publication.', skills: ['Research internship', 'Publication'] },
    { title: 'Career Launch', desc: 'NET/GATE/JEST, PhD admission, or scientist recruitment into a national laboratory.', skills: ['Research entrance', 'Interviews'] },
  ],
  subs: [
    {
      id: 'physics',
      name: 'Physics',
      icon: 'Atom',
      overview:
        'Physics studies matter, energy and the laws governing them — from quantum mechanics and condensed matter to astrophysics.',
      why: 'The most transferable analytical training in science: it feeds research, data science, finance and instrumentation alike.',
      careers: ['Research Physicist', 'Data Scientist', 'Instrumentation Scientist', 'Scientific Officer (BARC / ISRO)', 'Quantitative Analyst', 'Physics Faculty'],
      skills: ['Mathematical physics', 'Quantum & statistical mechanics', 'Experimental technique', 'Numerical simulation', 'Error analysis', 'Programming'],
      tools: ['Python / NumPy', 'MATLAB', 'LabVIEW', 'ROOT', 'LaTeX'],
    },
    {
      id: 'chemistry',
      name: 'Chemistry',
      icon: 'FlaskConical',
      overview:
        'Chemistry studies substances, their structure, reactions and synthesis, across organic, inorganic, physical and analytical branches.',
      why: 'Direct industrial demand from pharma, materials and specialty chemicals, plus a strong research track.',
      careers: ['Synthetic Chemist', 'Analytical Chemist', 'QC / QA Scientist', 'Formulation Scientist', 'Chemistry Faculty', 'Patent Analyst'],
      skills: ['Organic synthesis', 'Spectroscopy interpretation', 'Chromatography', 'Reaction mechanisms', 'Lab safety', 'Data recording'],
      tools: ['NMR / IR / MS', 'HPLC & GC', 'ChemDraw', 'Gaussian'],
    },
    {
      id: 'biology',
      name: 'Biology',
      icon: 'Dna',
      overview:
        'Biology investigates living systems from molecules to ecosystems, including genetics, cell biology, ecology and evolution.',
      why: 'The foundation of biotech, healthcare research and conservation — and an era of genomic tooling makes it computational too.',
      careers: ['Research Associate', 'Molecular Biologist', 'Bioinformatician', 'Ecologist', 'Genetic Counsellor', 'Biology Faculty'],
      skills: ['Molecular techniques', 'Microscopy', 'Experimental design', 'Bioinformatics basics', 'Statistics', 'Field methods'],
      tools: ['PCR & electrophoresis', 'Cell culture', 'BLAST / bioinformatics suites', 'R'],
    },
    {
      id: 'mathematics',
      name: 'Mathematics',
      icon: 'Sigma',
      overview:
        'Mathematics studies structure, quantity and inference — analysis, algebra, topology, probability and applied modelling.',
      why: 'Rigorous training that unlocks research, cryptography, quantitative finance, ML and actuarial work simultaneously.',
      careers: ['Mathematician', 'Quantitative Analyst', 'Data Scientist', 'Cryptographer', 'Operations Research Analyst', 'Mathematics Faculty'],
      skills: ['Proof technique', 'Real & complex analysis', 'Linear algebra', 'Probability', 'Optimisation', 'Programming'],
      tools: ['Python / SageMath', 'MATLAB', 'LaTeX', 'R'],
    },
    {
      id: 'biotech',
      name: 'Biotechnology',
      icon: 'Microscope',
      overview:
        'Biotechnology engineers biological systems for useful ends — therapeutics, vaccines, enzymes, diagnostics and bio-manufacturing.',
      why: 'Sits where biology becomes industry, with a fast-growing bio-economy and strong startup activity.',
      careers: ['Biotech Research Associate', 'Bioprocess Engineer', 'Clinical Research Associate', 'Genomics Analyst', 'QA / Regulatory Specialist', 'Biotech Entrepreneur'],
      skills: ['Recombinant DNA technique', 'Cell culture', 'Bioprocess fundamentals', 'Bioinformatics', 'GLP compliance', 'Assay development'],
      tools: ['PCR / qPCR', 'Fermenters', 'Flow cytometry', 'CRISPR toolkits', 'Python'],
    },
    {
      id: 'envsci',
      name: 'Environmental Science',
      icon: 'Globe2',
      overview:
        'Environmental science studies ecosystems, pollution, climate and sustainability, combining field measurement with policy analysis.',
      why: 'Climate regulation and ESG reporting are creating entirely new categories of jobs in industry and government.',
      careers: ['Environmental Scientist', 'EIA Consultant', 'Sustainability / ESG Analyst', 'Pollution Control Officer', 'Climate Researcher', 'Conservation Officer'],
      skills: ['Field sampling', 'GIS & remote sensing', 'Pollution monitoring', 'Impact assessment', 'Environmental law basics', 'Data visualisation'],
      tools: ['QGIS / ArcGIS', 'Air & water samplers', 'R / Python', 'Remote sensing data'],
    },
    {
      id: 'research',
      name: 'Scientific Research',
      icon: 'Search',
      overview:
        'A research career means running an original programme of enquiry — funding, experiments, publications and mentoring — usually via a PhD.',
      why: 'Complete intellectual autonomy over what question you spend your life on, plus global mobility.',
      careers: ['PhD Researcher', 'Post-doctoral Fellow', 'Principal Investigator', 'Research Faculty', 'Industrial R&D Scientist', 'Science Policy Advisor'],
      skills: ['Literature synthesis', 'Grant writing', 'Experimental rigour', 'Statistics', 'Peer review', 'Mentoring'],
      tools: ['LaTeX / Overleaf', 'Zotero', 'Python / R', 'Lab notebooks'],
      roadmap: [
        { title: 'Foundation', desc: 'Excellent undergraduate grounding plus early lab exposure.', skills: ['Core discipline', 'Lab exposure'] },
        { title: 'Core Concepts', desc: 'M.Sc or integrated programme with advanced methods and statistics.', skills: ['Advanced methods', 'Statistics'] },
        { title: 'Develop Skills', desc: 'Master instrumentation and computation; write a full research report.', skills: ['Instrumentation', 'Scientific writing'] },
        { title: 'Specialise', desc: 'Choose your problem and a lab; clear NET/GATE/JEST for a fellowship.', skills: ['NET / JRF', 'Problem selection'] },
        { title: 'Real-World Experience', desc: 'PhD work: experiments, conferences, peer-reviewed publications, collaborations.', skills: ['Publications', 'Conferences'] },
        { title: 'Career Launch', desc: 'Post-doc, then faculty applications or scientist roles at national labs or industry R&D.', skills: ['Post-doc', 'Faculty applications'] },
      ],
    },
    {
      id: 'csir',
      name: 'CSIR',
      icon: 'Beaker',
      overview:
        'CSIR laboratories run applied national research across chemistry, materials, drugs, food and energy, recruiting scientists through NET and direct hiring.',
      why: 'Government research careers with real infrastructure, pension-grade stability and translational impact.',
      careers: ['Scientist (CSIR Labs)', 'Junior Research Fellow', 'Technical Officer', 'Project Scientist', 'Lab Group Leader', 'Technology Transfer Officer'],
      skills: ['Applied research design', 'Instrumentation', 'Project reporting', 'Collaboration', 'Patenting basics', 'Exam preparation'],
      tools: ['Lab instrumentation', 'Statistical software', 'CSIR NET syllabus', 'Patent databases'],
    },
    {
      id: 'isro',
      name: 'ISRO',
      icon: 'Rocket',
      overview:
        'ISRO builds launch vehicles, satellites and space applications, hiring engineers and scientists through the ICRB examination and research fellowships.',
      why: 'National-mission work with hardware that leaves the planet — rare technical depth and prestige.',
      careers: ['Scientist / Engineer SC', 'Satellite Systems Engineer', 'Propulsion Specialist', 'Remote Sensing Scientist', 'Mission Operations Engineer', 'Payload Designer'],
      skills: ['Core engineering depth', 'Systems reliability', 'Simulation', 'Remote sensing', 'Documentation discipline', 'ICRB exam prep'],
      tools: ['MATLAB', 'ANSYS', 'GIS suites', 'Embedded toolchains'],
    },
    {
      id: 'drdo',
      name: 'DRDO',
      icon: 'ShieldCheck',
      overview:
        'DRDO develops defence technologies — missiles, radars, armaments, aeronautics and combat systems — recruiting via GATE-based and direct entry.',
      why: 'Strategic, classified, high-complexity engineering that has no commercial equivalent.',
      careers: ['Scientist B', 'Radar Systems Engineer', 'Missile Guidance Specialist', 'Materials Scientist', 'Combat Systems Engineer', 'Project Director track'],
      skills: ['Advanced engineering theory', 'Signal processing', 'Systems integration', 'Testing & validation', 'Security discipline', 'GATE preparation'],
      tools: ['MATLAB / Simulink', 'CFD & FEA suites', 'Embedded systems', 'Test ranges'],
    },
  ],
}

const arts: Field = {
  id: 'arts',
  name: 'Arts, Humanities & Social Sciences',
  tag: 'Understand people and society',
  icon: 'Palette',
  shape: SHAPES.organic,
  theme: { accent: '#e879f9', accent2: '#c084fc', bg: '#0c040e', bg2: '#2f0a35' },
  overview: {
    what: 'The humanities and social sciences study human behaviour, society, language, history and power — using both interpretation and empirical method.',
    learn: [
      'Theories of mind, society, state and culture',
      'Qualitative and quantitative research methods',
      'Critical reading and argumentation',
      'Writing, editing and public communication',
    ],
    skills: ['Critical thinking', 'Research & interviewing', 'Writing', 'Cultural literacy', 'Data interpretation', 'Empathy'],
    careers: ['Psychologist', 'Journalist', 'Policy Analyst', 'Content Strategist', 'Civil Servant', 'Academic'],
    industries: ['Media & publishing', 'Government & policy', 'NGOs & development', 'Education', 'Market research', 'Mental health services'],
    higher: ['MA', 'M.Phil / PhD', 'MSW', 'Clinical psychology programmes', 'Public policy masters'],
    roadmap: 'Humanities base → discipline major → research or media practice → postgraduate specialisation → professional or academic career.',
    suitable: 'Suits strong readers and writers who want to work with meaning, people and institutions rather than machines.',
  },
  roadmap: [
    { title: 'Foundation', desc: 'Read widely, write constantly, and learn how arguments are built.', skills: ['Critical reading', 'Writing'] },
    { title: 'Core Concepts', desc: 'Discipline theory: key thinkers, debates and methods.', skills: ['Theory', 'Methodology'] },
    { title: 'Develop Skills', desc: 'Run a small study or produce publishable work — interviews, surveys, articles.', skills: ['Fieldwork', 'Publishing'] },
    { title: 'Specialise', desc: 'Choose your sub-discipline and the kind of impact you want.', skills: ['Sub-discipline', 'Portfolio'] },
    { title: 'Real-World Experience', desc: 'Internships with media houses, NGOs, research centres or clinics.', skills: ['Internship', 'Field placement'] },
    { title: 'Career Launch', desc: 'Postgraduate entrance, NET, or direct hiring on the strength of published work.', skills: ['NET / PG entrance', 'Portfolio'] },
  ],
  subs: [
    {
      id: 'psychology',
      name: 'Psychology',
      icon: 'Brain',
      overview:
        'Psychology studies mind and behaviour scientifically, spanning clinical, counselling, organisational, cognitive and developmental branches.',
      why: 'Mental health awareness has created real demand, and the skills apply to therapy, HR, UX research and education alike.',
      careers: ['Clinical Psychologist', 'Counselling Psychologist', 'Organisational Psychologist', 'School Counsellor', 'UX Researcher', 'Rehabilitation Psychologist'],
      skills: ['Psychological assessment', 'Counselling technique', 'Research methods & statistics', 'Case formulation', 'Active listening', 'Ethics'],
      tools: ['Standardised test batteries', 'SPSS / JASP', 'Case documentation', 'Therapy frameworks (CBT etc.)'],
      roadmap: [
        { title: 'Foundation', desc: 'BA/B.Sc Psychology: general, developmental and social psychology plus statistics.', skills: ['Core psychology', 'Statistics'] },
        { title: 'Core Concepts', desc: 'Abnormal psychology, psychometrics, neuropsychology and research design.', skills: ['Psychopathology', 'Psychometrics'] },
        { title: 'Develop Skills', desc: 'Supervised test administration, case histories and basic counselling micro-skills.', skills: ['Assessment', 'Counselling skills'] },
        { title: 'Specialise', desc: 'MA/M.Sc then M.Phil / PsyD in clinical, counselling or organisational psychology.', skills: ['PG specialisation', 'Licensure track'] },
        { title: 'Real-World Experience', desc: 'Clinical internships in hospitals, NGOs and schools with supervised caseloads.', skills: ['Clinical internship', 'Supervision'] },
        { title: 'Career Launch', desc: 'RCI registration where required, then practice, hospital work, or research and teaching.', skills: ['Registration', 'Private practice'] },
      ],
    },
    {
      id: 'sociology',
      name: 'Sociology',
      icon: 'Users',
      overview:
        'Sociology analyses social structures, institutions and inequality — caste, class, gender, urbanisation and social change.',
      why: 'Essential lens for policy, development and civil services, and a rigorous route into social research.',
      careers: ['Social Researcher', 'Development Sector Professional', 'Policy Analyst', 'CSR Manager', 'Civil Services Aspirant', 'Sociology Faculty'],
      skills: ['Social theory', 'Ethnography', 'Survey design', 'Statistical analysis', 'Report writing', 'Critical analysis'],
      tools: ['SPSS / Stata', 'NVivo', 'Survey platforms', 'Census & NSS data'],
    },
    {
      id: 'history',
      name: 'History',
      icon: 'ScrollText',
      overview:
        'History reconstructs and interprets the past from sources — archives, artefacts, texts — and explains how the present came to be.',
      why: 'Unmatched training in evidence handling and narrative, and a direct advantage in civil services and heritage work.',
      careers: ['Historian', 'Archivist', 'Museum Curator', 'Heritage Consultant', 'Civil Services Aspirant', 'History Faculty'],
      skills: ['Source criticism', 'Archival research', 'Historiography', 'Long-form writing', 'Palaeography basics', 'Contextual analysis'],
      tools: ['Archives & manuscripts', 'Digital humanities tools', 'Citation managers', 'Museum catalogues'],
    },
    {
      id: 'polsci',
      name: 'Political Science',
      icon: 'Landmark',
      overview:
        'Political science studies power, institutions, constitutions, international relations and public policy.',
      why: 'The most directly useful humanities discipline for civil services, diplomacy, policy and political consulting.',
      careers: ['Policy Analyst', 'Political Consultant', 'Diplomat (Foreign Service)', 'Legislative Researcher', 'Think-tank Fellow', 'Political Science Faculty'],
      skills: ['Comparative politics', 'Constitutional analysis', 'International relations', 'Policy evaluation', 'Argumentation', 'Data literacy'],
      tools: ['Policy databases', 'Election data', 'R / Stata', 'Legislative records'],
    },
    {
      id: 'journalism',
      name: 'Journalism',
      icon: 'Newspaper',
      overview:
        'Journalism reports, verifies and explains events — news writing, investigation, interviewing, editing and multimedia storytelling.',
      why: 'Immediate public impact, a portfolio you build from day one, and skills that transfer to any content career.',
      careers: ['Reporter', 'Investigative Journalist', 'News Editor', 'Data Journalist', 'Broadcast Anchor', 'Documentary Producer'],
      skills: ['News writing', 'Interviewing', 'Fact-checking', 'Editing', 'Media law & ethics', 'Multimedia production'],
      tools: ['CMS platforms', 'Audio & video editing', 'Datawrapper', 'RTI & public records'],
    },
    {
      id: 'masscomm',
      name: 'Mass Communication',
      icon: 'Radio',
      overview:
        'Mass communication covers media systems, advertising, public relations, broadcasting and digital content strategy.',
      why: 'Broader than journalism: it opens PR, brand, film, OTT and social platforms with one qualification.',
      careers: ['PR Executive', 'Content Strategist', 'Advertising Copywriter', 'Media Planner', 'Social Media Manager', 'Production Coordinator'],
      skills: ['Media writing', 'Campaign planning', 'Video storytelling', 'Audience analytics', 'Public relations', 'Brand voice'],
      tools: ['Premiere Pro', 'Canva / Figma', 'Meta & Google Ads', 'Analytics dashboards'],
    },
    {
      id: 'literature',
      name: 'Literature',
      icon: 'BookOpen',
      overview:
        'Literary studies read texts closely across periods and cultures, examining form, meaning, theory and historical context.',
      why: 'Produces the strongest writers and editors, and underpins publishing, academia and content leadership.',
      careers: ['Editor', 'Author / Writer', 'Publishing Professional', 'Literary Critic', 'Content Lead', 'Literature Faculty'],
      skills: ['Close reading', 'Literary theory', 'Editing & proofreading', 'Persuasive writing', 'Comparative analysis', 'Research'],
      tools: ['Style guides', 'Editing software', 'JSTOR', 'Manuscript tools'],
    },
    {
      id: 'languages',
      name: 'Languages',
      icon: 'Languages',
      overview:
        'Language study builds professional fluency in one or more foreign or classical languages plus translation and interpretation skills.',
      why: 'A rare, verifiable skill: it opens diplomacy, localisation, tourism and global corporate roles quickly.',
      careers: ['Translator', 'Interpreter', 'Localisation Specialist', 'Language Trainer', 'Diplomatic Staff', 'Subtitling Editor'],
      skills: ['Advanced grammar & fluency', 'Translation technique', 'Simultaneous interpretation', 'Cultural competence', 'Terminology management', 'Proofreading'],
      tools: ['CAT tools (SDL Trados)', 'Dictionaries & corpora', 'Subtitling software', 'Proficiency frameworks'],
    },
    {
      id: 'linguistics',
      name: 'Linguistics',
      icon: 'AudioLines',
      overview:
        'Linguistics studies language scientifically — phonetics, syntax, semantics, sociolinguistics and computational language modelling.',
      why: 'The academic backbone of speech technology and NLP, plus documentation of endangered languages.',
      careers: ['Computational Linguist', 'NLP Data Specialist', 'Speech Technologist', 'Language Documentation Researcher', 'Lexicographer', 'Linguistics Faculty'],
      skills: ['Phonetic transcription', 'Syntactic analysis', 'Corpus methods', 'Basic programming', 'Field documentation', 'Statistics'],
      tools: ['Praat', 'Python / NLTK', 'ELAN', 'Corpus tools'],
    },
  ],
}

const design: Field = {
  id: 'design',
  name: 'Design & Creative Arts',
  tag: 'Make it beautiful and usable',
  icon: 'PenTool',
  shape: SHAPES.gem,
  theme: { accent: '#8b5cf6', accent2: '#22d3ee', bg: '#06040f', bg2: '#1b0f45' },
  overview: {
    what: 'Design shapes how things look, feel and work — products, interfaces, spaces, garments, images and moving pictures.',
    learn: [
      'Visual fundamentals: form, colour, type, composition',
      'User and client research',
      'Software and craft technique',
      'Iterative critique and portfolio building',
    ],
    skills: ['Visual thinking', 'Software fluency', 'Research & empathy', 'Iteration under critique', 'Storytelling', 'Attention to detail'],
    careers: ['UI/UX Designer', 'Graphic Designer', 'Architect', 'Fashion Designer', 'Animator', 'Art Director'],
    industries: ['Product & tech', 'Advertising & branding', 'Film & gaming', 'Architecture practices', 'Fashion houses', 'Freelance studios'],
    higher: ['B.Des / M.Des', 'B.Arch / M.Arch', 'Specialised diplomas', 'Portfolio-based apprenticeships'],
    roadmap: 'Fundamentals → software craft → live projects → specialisation → internship → portfolio-driven hiring or freelancing.',
    suitable: 'Suits visually driven people who can take blunt critique and keep redoing work until it is right.',
  },
  roadmap: [
    { title: 'Foundation', desc: 'Drawing, colour theory, typography and composition — by hand before software.', skills: ['Sketching', 'Colour', 'Typography'] },
    { title: 'Core Concepts', desc: 'Design principles, hierarchy, materials or interaction fundamentals for your medium.', skills: ['Design principles', 'Medium fundamentals'] },
    { title: 'Develop Skills', desc: 'Become fast in your core tools and complete self-directed briefs weekly.', skills: ['Tool mastery', 'Daily practice'] },
    { title: 'Specialise', desc: 'Choose a discipline and build three deep, well-documented case studies.', skills: ['Case studies', 'Niche focus'] },
    { title: 'Real-World Experience', desc: 'Studio internship, freelance clients and one shipped real-world project.', skills: ['Internship', 'Client work'] },
    { title: 'Career Launch', desc: 'Polished portfolio site, behance/dribbble presence, design-challenge interviews.', skills: ['Portfolio', 'Design interviews'] },
  ],
  subs: [
    {
      id: 'fashion',
      name: 'Fashion Design',
      icon: 'Shirt',
      overview:
        'Fashion design creates garments and collections — from concept and sketch to pattern, fabric, fit and production.',
      why: 'A tangible craft with a fast route to your own label, plus growing sustainable and digital fashion markets.',
      careers: ['Fashion Designer', 'Pattern Maker', 'Textile Designer', 'Fashion Stylist', 'Merchandiser', 'Label Founder'],
      skills: ['Fashion illustration', 'Pattern making', 'Draping & garment construction', 'Textile knowledge', 'Trend forecasting', 'Collection planning'],
      tools: ['CLO 3D', 'Adobe Illustrator', 'Sewing & pattern tools', 'Tech-pack templates'],
    },
    {
      id: 'interior',
      name: 'Interior Design',
      icon: 'Sofa',
      overview:
        'Interior design plans indoor environments — spatial layout, lighting, materials, furniture and detailing for how people live and work.',
      why: 'Strong independent-practice potential, tangible outcomes, and consistent residential and commercial demand.',
      careers: ['Interior Designer', 'Space Planner', 'Set / Exhibition Designer', 'FF&E Specialist', 'Lighting Designer', 'Design Studio Owner'],
      skills: ['Space planning', 'Material & finish selection', 'Lighting design', 'Technical drawing', 'Client presentation', 'Site coordination'],
      tools: ['AutoCAD', 'SketchUp', '3ds Max / V-Ray', 'Revit', 'Photoshop'],
    },
    {
      id: 'graphic',
      name: 'Graphic Design',
      icon: 'Shapes',
      overview:
        'Graphic design communicates visually through type, image, layout and identity systems across print and digital media.',
      why: 'The most freelance-friendly design discipline, with immediate demand from every brand and publisher.',
      careers: ['Graphic Designer', 'Brand Identity Designer', 'Art Director', 'Packaging Designer', 'Motion Graphics Designer', 'Freelance Studio Owner'],
      skills: ['Typography', 'Layout & grid systems', 'Brand identity', 'Colour systems', 'Print production', 'Concept development'],
      tools: ['Illustrator', 'Photoshop', 'InDesign', 'Figma', 'After Effects'],
    },
    {
      id: 'uiux',
      name: 'UI/UX Design',
      icon: 'LayoutDashboard',
      overview:
        'UI/UX design researches user needs and designs digital product flows, interfaces and design systems that are usable and desirable.',
      why: 'The highest-paying design track, deeply collaborative with engineering, and fully remote-friendly.',
      careers: ['Product Designer', 'UX Researcher', 'Interaction Designer', 'Design Systems Designer', 'UX Writer', 'Head of Design'],
      skills: ['User research', 'Information architecture', 'Wireframing & prototyping', 'Visual & interaction design', 'Usability testing', 'Design systems'],
      tools: ['Figma', 'Framer', 'Maze / UserTesting', 'Notion', 'Basic HTML/CSS'],
      roadmap: [
        { title: 'Foundation', desc: 'Learn visual fundamentals plus how digital products are structured.', skills: ['Typography', 'Layout', 'Colour'] },
        { title: 'Core Concepts', desc: 'UX process, heuristics, accessibility, information architecture and research methods.', skills: ['UX process', 'Accessibility', 'IA'] },
        { title: 'Develop Skills', desc: 'Get fast in Figma; redesign real products and prototype interactions.', skills: ['Figma', 'Prototyping', 'Critique'] },
        { title: 'Specialise', desc: 'Product design, research, design systems or motion — pick and prove it.', skills: ['Specialisation', 'Case studies'] },
        { title: 'Real-World Experience', desc: 'Internship or freelance work shipping a live product with real users and metrics.', skills: ['Shipped product', 'Dev handoff'] },
        { title: 'Career Launch', desc: 'Three-case-study portfolio, whiteboard-challenge practice, design community presence.', skills: ['Portfolio', 'Design challenges'] },
      ],
    },
    {
      id: 'animation',
      name: 'Animation',
      icon: 'Film',
      overview:
        'Animation creates movement and performance frame by frame or in 3D — characters, motion graphics and animated storytelling.',
      why: 'Streaming, gaming and advertising have made animation a large, globally outsourced industry with clear skill ladders.',
      careers: ['2D / 3D Animator', 'Character Rigger', 'Storyboard Artist', 'Motion Designer', 'Layout Artist', 'Animation Director'],
      skills: ['Animation principles', 'Character performance', 'Storyboarding', 'Rigging basics', 'Timing & spacing', 'Rendering pipeline'],
      tools: ['Blender', 'Maya', 'After Effects', 'Toon Boom', 'Spine'],
    },
    {
      id: 'vfx',
      name: 'VFX',
      icon: 'Sparkles',
      overview:
        'Visual effects integrate computer-generated imagery with live footage — compositing, simulation, matchmoving and cleanup.',
      why: 'Technically demanding, highly specialised, and consistently hired by studios worldwide for film and series work.',
      careers: ['Compositor', 'FX / Simulation Artist', 'Roto & Paint Artist', 'Matchmove Artist', 'Lighting & Look Dev Artist', 'VFX Supervisor'],
      skills: ['Node-based compositing', 'Simulation (fluids, particles)', 'Camera tracking', 'Colour management', 'Pipeline discipline', 'Problem solving'],
      tools: ['Nuke', 'Houdini', 'Maya', 'Mocha', 'DaVinci Resolve'],
    },
    {
      id: '3d',
      name: '3D Design',
      icon: 'Box',
      overview:
        '3D design builds digital objects, environments and product visuals through modelling, texturing, lighting and rendering.',
      why: 'Feeds product visualisation, games, AR/VR and e-commerce imagery — one skillset, many industries.',
      careers: ['3D Modeller', 'Texture Artist', 'Environment Artist', 'Product Visualisation Artist', 'AR/VR Asset Designer', 'CG Generalist'],
      skills: ['Hard-surface & organic modelling', 'UV & texturing', 'PBR materials', 'Lighting & rendering', 'Topology discipline', 'Composition'],
      tools: ['Blender', 'Substance Painter', 'ZBrush', 'Marmoset', 'Unreal Engine'],
    },
    {
      id: 'game',
      name: 'Game Design',
      icon: 'Gamepad2',
      overview:
        'Game design defines the systems, levels, economy and feel of a game, working closely with art and engineering to make play compelling.',
      why: 'Games are the largest entertainment sector, and design skills apply to gamified products and simulation training too.',
      careers: ['Game Designer', 'Level Designer', 'Systems / Economy Designer', 'Narrative Designer', 'Technical Designer', 'Creative Director'],
      skills: ['Systems design', 'Level design', 'Prototyping', 'Balancing & tuning', 'Player psychology', 'Documentation'],
      tools: ['Unity', 'Unreal Engine', 'Godot', 'Figma / Miro', 'Excel for balancing'],
    },
    {
      id: 'architecture',
      name: 'Architecture (B.Arch)',
      icon: 'Building2',
      overview:
        'Architecture designs buildings and urban space, balancing form, function, structure, climate, regulation and human experience across a five-year licensed degree.',
      why: 'The rare discipline where art, engineering and law meet, and where your work stands in public for generations.',
      careers: ['Architect', 'Urban Designer', 'Landscape Architect', 'Conservation Architect', 'BIM Specialist', 'Practice Principal'],
      skills: ['Design studio process', 'Technical drawing & detailing', 'Building services & codes', 'Structural literacy', 'Model making', 'Site supervision'],
      tools: ['AutoCAD', 'Revit', 'Rhino + Grasshopper', 'SketchUp', 'V-Ray / Enscape'],
      roadmap: [
        { title: 'Foundation', desc: 'Clear NATA/JEE Paper 2; build freehand drawing, spatial reasoning and model-making.', skills: ['NATA / JEE B.Arch', 'Sketching'] },
        { title: 'Core Concepts', desc: 'Design studio, building construction, history of architecture, structures and climate.', skills: ['Design studio', 'Construction', 'Structures'] },
        { title: 'Develop Skills', desc: 'CAD, BIM and rendering fluency plus real site documentation and detailing.', skills: ['Revit / CAD', 'Detailing', 'Rendering'] },
        { title: 'Specialise', desc: 'Urban design, sustainability, conservation, landscape or computational design.', skills: ['Electives', 'Thesis focus'] },
        { title: 'Real-World Experience', desc: 'Mandatory practical training in a firm, plus a fully resolved thesis project.', skills: ['Internship', 'Thesis'] },
        { title: 'Career Launch', desc: 'Council of Architecture registration, then firm practice, M.Arch, or your own studio.', skills: ['COA registration', 'Portfolio'] },
      ],
    },
  ],
}

const education: Field = {
  id: 'education',
  name: 'Education',
  tag: 'Teach the next cohort',
  icon: 'GraduationCap',
  shape: SHAPES.book,
  theme: { accent: '#38bdf8', accent2: '#7dd3fc', bg: '#03080e', bg2: '#062338' },
  overview: {
    what: 'Education is the profession of teaching, curriculum design, assessment and academic leadership across schools, colleges and learning platforms.',
    learn: [
      'Pedagogy and learning psychology',
      'Curriculum and assessment design',
      'Classroom management and inclusion',
      'Educational technology and research',
    ],
    skills: ['Explaining clearly', 'Curriculum design', 'Assessment', 'Patience', 'Classroom leadership', 'Subject mastery'],
    careers: ['School Teacher', 'Professor', 'Curriculum Designer', 'Instructional Designer', 'School Principal', 'Education Researcher'],
    industries: ['Schools', 'Universities', 'EdTech', 'Government education departments', 'Training organisations', 'NGOs'],
    higher: ['B.Ed / M.Ed', 'NET / SET', 'PhD in education', 'Subject postgraduate degrees'],
    roadmap: 'Subject degree → teaching qualification → classroom practice → specialisation → academic leadership or research.',
    suitable: 'Suits patient communicators who get genuine satisfaction from someone else’s progress.',
  },
  roadmap: [
    { title: 'Foundation', desc: 'Deep command of the subject you intend to teach.', skills: ['Subject mastery', 'Communication'] },
    { title: 'Core Concepts', desc: 'Learning theory, pedagogy, child development and assessment design.', skills: ['Pedagogy', 'Assessment'] },
    { title: 'Develop Skills', desc: 'Practice teaching, lesson planning, classroom management and feedback cycles.', skills: ['Lesson planning', 'Classroom management'] },
    { title: 'Specialise', desc: 'Choose a level and a niche — early years, senior secondary, special education, or higher ed.', skills: ['Level focus', 'Specialisation'] },
    { title: 'Real-World Experience', desc: 'School internship, teaching practice hours, and mentored classroom observation.', skills: ['Teaching practice', 'Mentorship'] },
    { title: 'Career Launch', desc: 'Recruitment exams (CTET/TET/NET), interviews with demonstration lessons, then continuous development.', skills: ['CTET / NET', 'Demo lesson'] },
  ],
  subs: [
    {
      id: 'bed',
      name: 'B.Ed',
      icon: 'BookOpen',
      overview:
        'B.Ed is the professional teacher-training degree covering pedagogy, educational psychology and supervised teaching practice.',
      why: 'The mandatory credential for school teaching, and the base qualification for administrative roles later.',
      careers: ['School Teacher', 'Subject Coordinator', 'Curriculum Assistant', 'Special Educator', 'Education Officer', 'Headmaster track'],
      skills: ['Lesson planning', 'Pedagogical methods', 'Educational psychology', 'Inclusive teaching', 'Assessment design', 'Classroom management'],
      tools: ['LMS platforms', 'Smart-board tools', 'Assessment rubrics', 'NCERT frameworks'],
    },
    {
      id: 'teaching',
      name: 'Teaching',
      icon: 'Presentation',
      overview:
        'Teaching is daily classroom practice — planning, delivering, assessing and mentoring students through a syllabus and beyond it.',
      why: 'Immediate, visible impact on real people, plus job stability and structured holidays.',
      careers: ['Primary Teacher', 'Secondary Subject Teacher', 'Senior Secondary Teacher', 'Online Educator', 'Home Tutor', 'Academic Coordinator'],
      skills: ['Explanation & scaffolding', 'Student engagement', 'Differentiated instruction', 'Evaluation', 'Parent communication', 'Time management'],
      tools: ['Google Classroom', 'Presentation tools', 'Question banks', 'Digital whiteboards'],
    },
    {
      id: 'academic-research',
      name: 'Academic Research',
      icon: 'FlaskConical',
      overview:
        'Academic research in education studies how people learn and how systems, policies and curricula affect outcomes.',
      why: 'Shapes what millions of students experience, and combines fieldwork with quantitative evaluation.',
      careers: ['Education Researcher', 'Policy Analyst', 'Assessment Specialist', 'Programme Evaluator', 'Research Fellow', 'EdTech Learning Scientist'],
      skills: ['Research design', 'Mixed methods', 'Statistics', 'Academic writing', 'Grant applications', 'Data visualisation'],
      tools: ['SPSS / R', 'NVivo', 'Survey platforms', 'Reference managers'],
    },
    {
      id: 'professor',
      name: 'Professor / Lecturer',
      icon: 'UserRoundCheck',
      overview:
        'College and university teaching combines lecturing, supervising research students and publishing in your discipline.',
      why: 'Intellectual freedom, research funding access, and one of the most respected long-term academic careers.',
      careers: ['Assistant Professor', 'Associate Professor', 'Professor', 'Research Supervisor', 'Department Head', 'Dean'],
      skills: ['Subject expertise', 'Lecturing', 'Research publication', 'Student mentoring', 'Curriculum design', 'Academic administration'],
      tools: ['LaTeX', 'Journal databases', 'LMS platforms', 'Citation managers'],
      roadmap: [
        { title: 'Foundation', desc: 'Excellent postgraduate degree in your discipline.', skills: ['Masters degree', 'Subject depth'] },
        { title: 'Core Concepts', desc: 'Clear UGC NET / SET or JRF and build a research proposal.', skills: ['NET / JRF', 'Proposal writing'] },
        { title: 'Develop Skills', desc: 'Teach as a guest or assistant lecturer while starting publications.', skills: ['Lecturing', 'Publishing'] },
        { title: 'Specialise', desc: 'PhD in a defined area with a supervisor and a clear contribution.', skills: ['PhD', 'Research niche'] },
        { title: 'Real-World Experience', desc: 'Conference talks, peer-reviewed papers, guiding dissertations and funded projects.', skills: ['Conferences', 'Project funding'] },
        { title: 'Career Launch', desc: 'Assistant professor recruitment, API scoring, then promotion through research output.', skills: ['Recruitment', 'API score'] },
      ],
    },
    {
      id: 'edu-admin',
      name: 'Educational Administration',
      icon: 'ClipboardList',
      overview:
        'Educational administration runs institutions — staffing, academics, compliance, budgets, admissions and quality assurance.',
      why: 'Leverage: you shape the experience of an entire school or college rather than one classroom.',
      careers: ['Principal', 'Vice Principal', 'Academic Director', 'Admissions Head', 'Education Officer', 'Institution Founder'],
      skills: ['Institutional leadership', 'Staff management', 'Regulatory compliance', 'Budgeting', 'Academic planning', 'Stakeholder relations'],
      tools: ['ERP for schools', 'Accreditation frameworks', 'Excel & dashboards', 'Policy manuals'],
    },
  ],
}

const government: Field = {
  id: 'government',
  name: 'Government & Civil Services',
  tag: 'Serve at scale',
  icon: 'ShieldCheck',
  shape: SHAPES.rectoct,
  theme: { accent: '#60a5fa', accent2: '#cbd5e1', bg: '#040711', bg2: '#0d1c3d' },
  overview: {
    what: 'Government service runs the state — administration, policy, revenue, policing, defence, railways and public institutions.',
    learn: [
      'Polity, governance and the Constitution',
      'Economy, geography, environment and history',
      'Current affairs and ethics',
      'Administrative procedure and public finance',
    ],
    skills: ['Broad general awareness', 'Analytical writing', 'Decision making', 'Integrity', 'Endurance & discipline', 'Leadership'],
    careers: ['IAS / IPS / IFS Officer', 'State Civil Services Officer', 'Bank PO', 'Railway Officer', 'Defence Officer', 'Income Tax Officer'],
    industries: ['Central & state government', 'Public sector banks', 'Railways', 'Armed forces', 'Regulatory bodies', 'Public enterprises'],
    higher: ['Any graduation + competitive exam', 'Mid-career policy masters', 'Defence staff courses'],
    roadmap: 'Graduation → exam-specific syllabus → prelims → mains → interview / SSB → training academy → posting.',
    suitable: 'Suits disciplined, resilient generalists motivated by public impact rather than pay maximisation.',
  },
  roadmap: [
    { title: 'Foundation', desc: 'Graduate in any stream while building NCERT-level general studies and reading a daily newspaper.', skills: ['General studies', 'Newspaper habit'] },
    { title: 'Core Concepts', desc: 'Work through the full syllabus: polity, economy, history, geography, environment.', skills: ['Syllabus coverage', 'Note making'] },
    { title: 'Develop Skills', desc: 'Answer writing, essay practice, mock tests and revision cycles.', skills: ['Answer writing', 'Mock tests'] },
    { title: 'Specialise', desc: 'Pick optional subjects or the specific service and exam you are targeting.', skills: ['Optional subject', 'Exam focus'] },
    { title: 'Real-World Experience', desc: 'Full-length simulations, interview mocks and current-affairs discussion groups.', skills: ['Simulations', 'Interview mocks'] },
    { title: 'Career Launch', desc: 'Clear the final stage, complete academy training, take your first posting.', skills: ['Final interview', 'Academy training'] },
  ],
  subs: [
    {
      id: 'upsc',
      name: 'UPSC',
      icon: 'Landmark',
      overview:
        'The UPSC Civil Services Examination selects officers for the IAS, IPS, IFS and allied services through prelims, mains and a personality test.',
      why: 'Unmatched responsibility and reach: district administration, policy design and national institutions early in your career.',
      careers: ['IAS Officer', 'IPS Officer', 'IFS (Diplomat)', 'IRS Officer', 'Indian Audit & Accounts Service', 'Railway Management Service'],
      skills: ['Analytical writing', 'Interdisciplinary reasoning', 'Ethics & integrity', 'Current-affairs synthesis', 'Time management', 'Public speaking'],
      tools: ['NCERT & standard texts', 'PIB & Yojana', 'Mock test series', 'Answer-writing frameworks'],
      roadmap: [
        { title: 'Foundation', desc: 'NCERT base across polity, history, geography and economy; start a daily newspaper habit.', skills: ['NCERTs', 'Newspaper analysis'] },
        { title: 'Core Concepts', desc: 'Standard texts for GS1–GS4 plus economic survey, budget and environment.', skills: ['GS papers', 'Ethics (GS4)'] },
        { title: 'Develop Skills', desc: 'Prelims MCQ accuracy, CSAT practice, and daily mains answer writing with feedback.', skills: ['Prelims accuracy', 'Answer writing'] },
        { title: 'Specialise', desc: 'Choose and master one optional subject end to end.', skills: ['Optional subject', 'Case studies'] },
        { title: 'Real-World Experience', desc: 'Full-length prelims and mains test series, essay practice, DAF-based interview preparation.', skills: ['Test series', 'DAF & interview'] },
        { title: 'Career Launch', desc: 'Clear the personality test, join LBSNAA or the relevant academy, take first field posting.', skills: ['Personality test', 'Academy training'] },
      ],
    },
    {
      id: 'psc',
      name: 'State PSC',
      icon: 'Building2',
      overview:
        'State Public Service Commissions recruit deputy collectors, DSPs, tehsildars and other state-cadre officers via their own examinations.',
      why: 'Serve in your home state and language, with a notably better success ratio than the central exam.',
      careers: ['Deputy Collector', 'Deputy Superintendent of Police', 'Tehsildar', 'Block Development Officer', 'State Tax Officer', 'Secretariat Officer'],
      skills: ['State-specific general knowledge', 'Regional language proficiency', 'Answer writing', 'Local governance awareness', 'Exam strategy'],
      tools: ['State board textbooks', 'State government reports', 'Regional newspapers', 'Previous-year papers'],
    },
    {
      id: 'ssc',
      name: 'SSC',
      icon: 'FileCheck2',
      overview:
        'The Staff Selection Commission recruits for Group B and C posts across ministries through CGL, CHSL, CPO, JE and other exams.',
      why: 'Faster, more frequent and more predictable than civil services, with solid central-government pay and benefits.',
      careers: ['Assistant Section Officer', 'Income Tax Inspector', 'Excise Inspector', 'Sub-Inspector (CAPF)', 'Junior Engineer', 'Auditor'],
      skills: ['Quantitative aptitude', 'Reasoning', 'English language', 'General awareness', 'Speed & accuracy', 'Typing / skill test'],
      tools: ['Aptitude practice sets', 'Mock test platforms', 'Speed-maths techniques', 'Previous papers'],
    },
    {
      id: 'railways',
      name: 'Railways',
      icon: 'TrainFront',
      overview:
        'Indian Railways recruits technical and non-technical staff and officers for operations, engineering, safety and commercial functions.',
      why: 'One of the largest employers in the world, with quarters, medical benefits and a nationwide transfer network.',
      careers: ['Station Master', 'Traffic Apprentice', 'Junior Engineer', 'Loco Pilot', 'Commercial Officer', 'RPF Officer'],
      skills: ['Technical aptitude', 'Operational safety awareness', 'Quantitative & reasoning ability', 'Shift discipline', 'Coordination'],
      tools: ['RRB exam material', 'Technical branch syllabus', 'Mock tests', 'Safety manuals'],
    },
    {
      id: 'gov-banking',
      name: 'Government Banking',
      icon: 'PiggyBank',
      overview:
        'Public sector bank recruitment (IBPS, SBI, RBI) fills probationary officer, clerk and specialist officer posts.',
      why: 'Fast exam cycles, early managerial responsibility, and a clear ladder from PO to branch and zonal leadership.',
      careers: ['Probationary Officer', 'Specialist Officer (IT / Law / HR)', 'RBI Grade B Officer', 'Clerk', 'Branch Manager', 'Credit Officer'],
      skills: ['Quantitative aptitude', 'Reasoning', 'Banking awareness', 'Descriptive writing', 'Customer handling', 'Financial literacy'],
      tools: ['IBPS / SBI mock platforms', 'Banking awareness compendiums', 'Current affairs digests'],
    },
    {
      id: 'nda',
      name: 'NDA',
      icon: 'Plane',
      overview:
        'The National Defence Academy takes candidates straight after school into a tri-service degree programme before commissioning as officers.',
      why: 'Earliest possible entry into an officer’s career, with a fully funded degree and unmatched leadership training.',
      careers: ['Army Officer', 'Navy Officer', 'Air Force Pilot', 'Technical Officer', 'Special Forces', 'Senior Command track'],
      skills: ['Mathematics & general ability', 'Physical fitness', 'Officer-like qualities', 'Team leadership', 'Discipline', 'Situational judgement'],
      tools: ['NDA exam syllabus', 'SSB preparation material', 'Fitness programme', 'Psychology test practice'],
      roadmap: [
        { title: 'Foundation', desc: 'Physics, chemistry and mathematics at school level plus serious daily physical training.', skills: ['PCM', 'Fitness base'] },
        { title: 'Core Concepts', desc: 'NDA written syllabus: mathematics and general ability, with English and current affairs.', skills: ['Maths paper', 'GAT paper'] },
        { title: 'Develop Skills', desc: 'Group discussion, command tasks, psychological tests and public speaking practice.', skills: ['OLQ development', 'GD practice'] },
        { title: 'Specialise', desc: 'Choose Army, Navy or Air Force and prepare for its specific requirements.', skills: ['Service choice', 'Medical prep'] },
        { title: 'Real-World Experience', desc: 'Five-day SSB interview, then academy training at NDA and the service academy.', skills: ['SSB', 'Academy training'] },
        { title: 'Career Launch', desc: 'Commission as an officer, join your unit, then progressive command and staff courses.', skills: ['Commission', 'Unit posting'] },
      ],
    },
    {
      id: 'cds',
      name: 'CDS',
      icon: 'Medal',
      overview:
        'The Combined Defence Services examination commissions graduates into the IMA, INA, AFA and Officers Training Academy.',
      why: 'A graduate route into an officer’s commission, with faster training and immediate leadership responsibility.',
      careers: ['Army Officer (IMA / OTA)', 'Naval Officer', 'Air Force Officer', 'Logistics Officer', 'Education Corps Officer', 'Command appointments'],
      skills: ['English & general knowledge', 'Elementary mathematics', 'Physical endurance', 'Officer-like qualities', 'Leadership under stress'],
      tools: ['CDS syllabus material', 'SSB guides', 'Fitness plan', 'Current affairs'],
    },
    {
      id: 'defence',
      name: 'Defence Services',
      icon: 'ShieldCheck',
      overview:
        'Defence careers span the Army, Navy, Air Force and paramilitary forces across combat, technical, medical and logistics branches.',
      why: 'Purpose, camaraderie and structure that no civilian job replicates, with lifelong benefits and respect.',
      careers: ['Combat Officer', 'Technical Officer', 'Military Engineer', 'Naval Aviator', 'Paramilitary Commandant', 'Military Intelligence Officer'],
      skills: ['Physical & mental resilience', 'Weapon & systems training', 'Tactical decision making', 'Team leadership', 'Navigation', 'Discipline'],
      tools: ['Service training manuals', 'Fitness regimen', 'Simulation training', 'Field equipment'],
    },
  ],
}

const agriculture: Field = {
  id: 'agriculture',
  name: 'Agriculture & Allied Sciences',
  tag: 'Feed and sustain',
  icon: 'Leaf',
  shape: SHAPES.leaf,
  theme: { accent: '#4ade80', accent2: '#a3e635', bg: '#040a05', bg2: '#0c2a12' },
  overview: {
    what: 'Agriculture and allied sciences apply biology, soil science and technology to crops, livestock, forests and food systems.',
    learn: [
      'Soil, crop and plant sciences',
      'Animal husbandry and veterinary basics',
      'Farm economics and extension work',
      'Irrigation, protection and post-harvest technology',
    ],
    skills: ['Field diagnosis', 'Soil & crop management', 'Extension communication', 'Data recording', 'Farm economics', 'Practical problem solving'],
    careers: ['Agricultural Officer', 'Veterinarian', 'Horticulturist', 'Forest Officer', 'Agri-business Manager', 'Agronomist'],
    industries: ['Government agriculture departments', 'Seed & agrochemical companies', 'Dairy & poultry', 'Forestry', 'Food processing', 'Agri-tech startups'],
    higher: ['M.Sc Agriculture', 'ICAR-JRF / SRF', 'MBA Agri-business', 'PhD', 'Veterinary postgraduate degrees'],
    roadmap: 'Science base → agriculture entrance → field-heavy degree → specialisation → extension or research → officer, industry or enterprise role.',
    suitable: 'Suits people who prefer outdoor, applied science with visible community impact over desk-only work.',
  },
  roadmap: [
    { title: 'Foundation', desc: 'Biology, chemistry and basic statistics plus the agriculture entrance exam.', skills: ['Biology', 'ICAR / state entrance'] },
    { title: 'Core Concepts', desc: 'Agronomy, soil science, plant pathology, entomology and animal science.', skills: ['Agronomy', 'Soil science', 'Plant protection'] },
    { title: 'Develop Skills', desc: 'Field practicals, crop trials, soil testing and farm machinery handling.', skills: ['Field trials', 'Soil testing'] },
    { title: 'Specialise', desc: 'Choose agronomy, horticulture, veterinary, forestry or agri-business.', skills: ['Specialisation', 'Electives'] },
    { title: 'Real-World Experience', desc: 'RAWE / rural work experience, KVK attachment and agro-industry internship.', skills: ['RAWE', 'Industry internship'] },
    { title: 'Career Launch', desc: 'ICAR-JRF, agriculture officer exams, or recruitment into agri-input and food companies.', skills: ['ICAR-JRF', 'Officer exams'] },
  ],
  subs: [
    {
      id: 'agri-science',
      name: 'Agricultural Science',
      icon: 'Sprout',
      overview:
        'B.Sc Agriculture covers crop production, soil fertility, plant protection, farm machinery and agricultural extension.',
      why: 'Government officer posts, agri-input industry jobs and your own farm enterprise all open from a single degree.',
      careers: ['Agriculture Development Officer', 'Agronomist', 'Seed Production Officer', 'Agri-input Sales Manager', 'Farm Manager', 'Agri-tech Specialist'],
      skills: ['Crop management', 'Soil fertility analysis', 'Pest & disease diagnosis', 'Extension communication', 'Farm planning', 'Data recording'],
      tools: ['Soil testing kits', 'GIS for agriculture', 'Farm machinery', 'Crop advisory apps'],
    },
    {
      id: 'veterinary',
      name: 'Veterinary Science',
      icon: 'Dog',
      overview:
        'B.V.Sc & A.H. is a licensed five-year degree in animal medicine, surgery, reproduction and public veterinary health.',
      why: 'A protected profession with clinical practice rights, government posts and a fast-growing pet-care market.',
      careers: ['Veterinary Surgeon', 'Livestock Development Officer', 'Pet Clinic Owner', 'Animal Nutritionist', 'Veterinary Pathologist', 'Wildlife Veterinarian'],
      skills: ['Animal diagnosis', 'Veterinary surgery', 'Obstetrics & reproduction', 'Pharmacology', 'Zoonotic disease control', 'Animal handling'],
      tools: ['Surgical instruments', 'Ultrasound & X-ray', 'Vaccination protocols', 'Lab diagnostics'],
      roadmap: [
        { title: 'Foundation', desc: 'PCB at school, clear NEET / state veterinary counselling.', skills: ['NEET', 'Biology'] },
        { title: 'Core Concepts', desc: 'Anatomy, physiology, pharmacology, pathology and microbiology of animals.', skills: ['Vet anatomy', 'Pathology'] },
        { title: 'Develop Skills', desc: 'Clinics: restraint, examination, injections, minor surgery and obstetrics.', skills: ['Clinical handling', 'Minor surgery'] },
        { title: 'Specialise', desc: 'Surgery, medicine, gynaecology, poultry, dairy or wildlife health.', skills: ['Specialisation', 'PG entrance'] },
        { title: 'Real-World Experience', desc: 'Internship across veterinary hospitals, dairy farms and field camps.', skills: ['Internship', 'Field camps'] },
        { title: 'Career Launch', desc: 'Veterinary council registration, then government service, private clinic or industry role.', skills: ['VCI registration', 'Practice'] },
      ],
    },
    {
      id: 'animal-husbandry',
      name: 'Animal Husbandry',
      icon: 'Beef',
      overview:
        'Animal husbandry manages livestock production — dairy, poultry, piggery and fisheries — covering breeding, nutrition and herd health.',
      why: 'Livestock is the fastest-growing rural income source, and technical managers are scarce.',
      careers: ['Livestock Manager', 'Dairy Farm Manager', 'Poultry Production Officer', 'Animal Nutrition Specialist', 'Breeding Officer', 'Agri-entrepreneur'],
      skills: ['Breeding management', 'Feed formulation', 'Herd health monitoring', 'Farm economics', 'Record keeping', 'Biosecurity'],
      tools: ['Feed formulation software', 'Milk analysers', 'Herd management systems', 'AI (artificial insemination) kits'],
    },
    {
      id: 'forestry',
      name: 'Forestry',
      icon: 'Trees',
      overview:
        'Forestry manages forests and wildlife — silviculture, conservation, working plans, protection and community forestry.',
      why: 'Field-based conservation work with a prestigious officer route through the forest service examinations.',
      careers: ['Forest Range Officer', 'IFS Officer', 'Wildlife Biologist', 'Silviculturist', 'Conservation Project Manager', 'Agroforestry Consultant'],
      skills: ['Silviculture', 'Forest mensuration', 'Wildlife survey methods', 'GIS & remote sensing', 'Forest law', 'Fieldcraft'],
      tools: ['GIS suites', 'GPS & camera traps', 'Working plan documents', 'Dendrometers'],
    },
    {
      id: 'horticulture',
      name: 'Horticulture',
      icon: 'Flower',
      overview:
        'Horticulture covers fruits, vegetables, flowers and plantation crops — propagation, protected cultivation and post-harvest handling.',
      why: 'Higher value per acre than field crops, strong export demand, and a direct route to your own nursery or agri-business.',
      careers: ['Horticulture Officer', 'Greenhouse Manager', 'Landscape Horticulturist', 'Post-Harvest Specialist', 'Floriculture Entrepreneur', 'Plantation Manager'],
      skills: ['Propagation techniques', 'Protected cultivation', 'Nutrient & irrigation management', 'Post-harvest technology', 'Pest management', 'Marketing'],
      tools: ['Polyhouse systems', 'Drip irrigation', 'Grafting tools', 'Cold-chain equipment'],
    },
    {
      id: 'agronomy',
      name: 'Agronomy',
      icon: 'Wheat',
      overview:
        'Agronomy is the science of field crop production and soil management — cropping systems, water use, nutrients and weed control.',
      why: 'The core technical discipline behind yield improvement, valued in research, extension and agri-input companies.',
      careers: ['Agronomist', 'Crop Research Associate', 'Technical Product Manager (Agri-inputs)', 'Precision Agriculture Specialist', 'Extension Scientist', 'Farm Advisor'],
      skills: ['Cropping system design', 'Soil-water-plant relations', 'Nutrient management', 'Weed science', 'Field experimentation', 'Statistical analysis'],
      tools: ['Field trial protocols', 'Soil & leaf analysis', 'Remote sensing', 'R / statistical tools'],
    },
  ],
}

const sports: Field = {
  id: 'sports',
  name: 'Sports & Fitness',
  tag: 'Performance as a science',
  icon: 'Dumbbell',
  shape: SHAPES.blade,
  theme: { accent: '#f97316', accent2: '#ef4444', bg: '#0d0503', bg2: '#33130a' },
  overview: {
    what: 'Sports and fitness careers develop human physical performance — training, coaching, science, rehabilitation and the business around it.',
    learn: [
      'Exercise physiology and biomechanics',
      'Training programme design and periodisation',
      'Nutrition and recovery',
      'Coaching, psychology and sports management',
    ],
    skills: ['Programme design', 'Movement assessment', 'Motivation & coaching', 'Data tracking', 'Injury awareness', 'Discipline'],
    careers: ['Strength & Conditioning Coach', 'Sports Scientist', 'Athlete', 'Sports Manager', 'Sports Nutritionist', 'Physical Education Teacher'],
    industries: ['Professional clubs & academies', 'Fitness industry', 'Schools & universities', 'Sports federations', 'Sports media', 'Wellness tech'],
    higher: ['M.P.Ed', 'M.Sc Sports Science', 'Coaching diplomas (NIS)', 'Sports management MBA', 'PhD'],
    roadmap: 'Physical base → sports science education → certification → specialisation → work with real athletes → professional or academic role.',
    suitable: 'Suits energetic, disciplined people who like measurable progress and working closely with bodies in motion.',
  },
  roadmap: [
    { title: 'Foundation', desc: 'Build your own physical literacy plus anatomy and physiology basics.', skills: ['Anatomy', 'Training basics'] },
    { title: 'Core Concepts', desc: 'Exercise physiology, biomechanics, nutrition and sports psychology.', skills: ['Physiology', 'Biomechanics'] },
    { title: 'Develop Skills', desc: 'Programme design, movement screening, coaching cues and load tracking.', skills: ['Programming', 'Coaching cues'] },
    { title: 'Specialise', desc: 'Pick strength & conditioning, rehab, nutrition, a sport, or management.', skills: ['Certification', 'Sport focus'] },
    { title: 'Real-World Experience', desc: 'Intern with a team or gym; take real clients or athletes through a full season.', skills: ['Team internship', 'Client results'] },
    { title: 'Career Launch', desc: 'Certified profile, documented athlete results, and federation or club recruitment.', skills: ['Certification', 'Results portfolio'] },
  ],
  subs: [
    {
      id: 'sports-science',
      name: 'Sports Science',
      icon: 'Activity',
      overview:
        'Sports science applies physiology, biomechanics and data to measure and improve athletic performance.',
      why: 'Professional teams now hire scientists as standard, and the work is genuinely evidence-driven.',
      careers: ['Sports Scientist', 'Performance Analyst', 'Strength & Conditioning Specialist', 'Biomechanist', 'Return-to-Play Coordinator', 'Research Scientist'],
      skills: ['Physiological testing', 'Biomechanical analysis', 'Load monitoring', 'Data interpretation', 'Periodisation', 'Reporting to coaches'],
      tools: ['GPS & wearables', 'Force plates', 'Video analysis software', 'Excel / R'],
      roadmap: [
        { title: 'Foundation', desc: 'Biology and physics basics plus your own consistent training practice.', skills: ['Anatomy', 'Physiology'] },
        { title: 'Core Concepts', desc: 'Exercise physiology, biomechanics, motor learning and research methods.', skills: ['Exercise physiology', 'Biomechanics'] },
        { title: 'Develop Skills', desc: 'Run lab and field tests: VO2, jump, sprint, and interpret the outputs.', skills: ['Testing protocols', 'Data analysis'] },
        { title: 'Specialise', desc: 'Choose physiology, biomechanics, analytics or S&C.', skills: ['Specialisation', 'Certification'] },
        { title: 'Real-World Experience', desc: 'Attach to a team for a full season, own the monitoring reports.', skills: ['Team placement', 'Season reporting'] },
        { title: 'Career Launch', desc: 'Build a case-study portfolio, publish, and apply to clubs, academies or federations.', skills: ['Portfolio', 'Club applications'] },
      ],
    },
    {
      id: 'physical-education',
      name: 'Physical Education',
      icon: 'Volleyball',
      overview:
        'B.P.Ed / M.P.Ed trains physical education teachers to deliver school sport, fitness and motor development programmes.',
      why: 'Stable teaching posts, coaching opportunities on the side, and influence on children’s lifelong habits.',
      careers: ['Physical Education Teacher', 'School Sports Coordinator', 'College PE Lecturer', 'Coach', 'Fitness Programme Director', 'Sports Officer'],
      skills: ['Curriculum delivery', 'Motor skill development', 'Sports officiating', 'Fitness assessment', 'Event organisation', 'First aid'],
      tools: ['Fitness test batteries', 'Sports equipment', 'Lesson plan frameworks', 'Officiating rulebooks'],
    },
    {
      id: 'pro-sports',
      name: 'Professional Sports',
      icon: 'Trophy',
      overview:
        'A professional playing career means competing at state, national or international level under structured coaching and contracts.',
      why: 'Nothing else offers the same peak experience — and modern support systems make a longer, better-managed career possible.',
      careers: ['Professional Athlete', 'National Team Player', 'League Player', 'Player-Coach', 'Sports Ambassador', 'Post-career Analyst'],
      skills: ['Technical sport skill', 'Physical conditioning', 'Competitive mindset', 'Recovery discipline', 'Tactical understanding', 'Media handling'],
      tools: ['Training facilities', 'Wearable trackers', 'Video review', 'Nutrition plans'],
    },
    {
      id: 'sports-management',
      name: 'Sports Management',
      icon: 'Briefcase',
      overview:
        'Sports management runs the business of sport — leagues, clubs, events, sponsorship, broadcasting and athlete representation.',
      why: 'Leagues and franchises have professionalised fast, creating commercial roles for people who understand both sport and business.',
      careers: ['Club Operations Manager', 'Sponsorship Manager', 'Event Director', 'Athlete Agent', 'Sports Marketing Manager', 'League Administrator'],
      skills: ['Event operations', 'Sponsorship sales', 'Contract negotiation', 'Marketing & fan engagement', 'Budgeting', 'Stakeholder management'],
      tools: ['Ticketing platforms', 'CRM systems', 'Sponsorship decks', 'Analytics dashboards'],
    },
    {
      id: 'coaching',
      name: 'Sports Coaching',
      icon: 'Megaphone',
      overview:
        'Coaching develops athletes technically, tactically and mentally through structured sessions, competition planning and feedback.',
      why: 'Direct influence on results, a clear certification ladder, and demand from schools to national federations.',
      careers: ['Sport-specific Coach', 'Academy Coach', 'Team Head Coach', 'Talent Scout', 'Youth Development Coach', 'National Coach'],
      skills: ['Session design', 'Technical instruction', 'Tactical planning', 'Athlete communication', 'Video analysis', 'Talent identification'],
      tools: ['Video analysis tools', 'Session planners', 'GPS data', 'Coaching licences'],
    },
    {
      id: 'fitness-training',
      name: 'Fitness Training',
      icon: 'Dumbbell',
      overview:
        'Fitness training designs and delivers individual and group programmes for strength, conditioning, body composition and general health.',
      why: 'Lowest barrier to entry in this field, fully self-employable, and scalable into online coaching or your own studio.',
      careers: ['Personal Trainer', 'Group Fitness Instructor', 'Online Coach', 'Gym Manager', 'Corporate Wellness Trainer', 'Studio Owner'],
      skills: ['Programme design', 'Movement screening', 'Exercise technique coaching', 'Client motivation', 'Nutrition basics', 'Business & marketing'],
      tools: ['Training apps', 'Body composition tools', 'Progress tracking sheets', 'Certification curricula'],
    },
    {
      id: 'exercise-science',
      name: 'Exercise Science',
      icon: 'HeartPulse',
      overview:
        'Exercise science studies how the body responds and adapts to physical activity, including clinical exercise for chronic disease.',
      why: 'Bridges fitness and healthcare, opening clinical rehab, cardiac and metabolic-health roles as well as sport.',
      careers: ['Clinical Exercise Physiologist', 'Cardiac Rehab Specialist', 'Exercise Researcher', 'Health & Fitness Consultant', 'Lifestyle Medicine Coach', 'Lab Technologist'],
      skills: ['Exercise testing', 'ECG & cardiorespiratory basics', 'Prescription for clinical populations', 'Data analysis', 'Research literacy', 'Patient education'],
      tools: ['Metabolic carts', 'ECG systems', 'Dynamometers', 'Statistical software'],
    },
    {
      id: 'sports-psychology',
      name: 'Sports Psychology',
      icon: 'Brain',
      overview:
        'Sports psychology works on the mental side of performance — focus, confidence, pressure, motivation and recovery from setbacks.',
      why: 'Increasingly treated as non-negotiable in elite sport, and the skills transfer to any high-pressure profession.',
      careers: ['Sports Psychologist', 'Mental Performance Consultant', 'Team Wellbeing Lead', 'Rehabilitation Counsellor', 'Performance Researcher', 'Youth Development Specialist'],
      skills: ['Psychological assessment', 'Mental skills training', 'Goal setting', 'Anxiety & pressure management', 'Team dynamics', 'Confidentiality & ethics'],
      tools: ['Psychometric tools', 'Biofeedback devices', 'Session logs', 'Imagery protocols'],
    },
    {
      id: 'sports-nutrition',
      name: 'Sports Nutrition',
      icon: 'Apple',
      overview:
        'Sports nutrition plans fuelling, hydration, supplementation and body-composition strategies around training and competition.',
      why: 'Highly measurable outcomes, strong demand from athletes and general clients, and easy to practise independently.',
      careers: ['Sports Nutritionist', 'Performance Dietitian', 'Body Composition Specialist', 'Supplement Advisor', 'Team Nutrition Lead', 'Nutrition Consultant'],
      skills: ['Energy requirement calculation', 'Macronutrient periodisation', 'Hydration strategy', 'Supplement evidence appraisal', 'Diet counselling', 'Food safety'],
      tools: ['Diet analysis software', 'Skinfold calipers / BIA', 'Food databases', 'Meal planning tools'],
    },
  ],
}

export const FIELDS: Field[] = [
  engineering,
  medical,
  commerce,
  management,
  law,
  science,
  arts,
  design,
  education,
  government,
  agriculture,
  sports,
]

export function pad(n: number) {
  return String(n + 1).padStart(2, '0')
}

export function resolveRoadmap(field: Field, sub: Sub): RoadmapStage[] {
  return sub.roadmap ?? field.roadmap
}
