export interface KnowledgeResponse {
  answer: string;
  suggestions: string[];
}

const KNOWLEDGE_BASE = {
  personal: {
    name: 'Akash Satpute',
    location: 'Navi Mumbai, India',
    email: 'assatpute123456@gmail.com',
    linkedin: 'https://www.linkedin.com/in/akash-satpute-548b5a256/',
    github: 'https://github.com/Akash221104',
    phone: '+91 9987935895',
    hashnode: 'https://akashblogss.hashnode.dev/',
    tagline: 'Building AI-powered applications, intelligent systems, and scalable web solutions while empowering developer communities.',
    summary: 'Akash Satpute is a Computer Engineering student at Pillai College of Engineering with hands-on experience in Artificial Intelligence, Full Stack Development, Cloud Computing, and Developer Communities.',
  },
  experience: [
    {
      role: 'Project Intern',
      company: 'C-DAC (Centre for Development of Advanced Computing)',
      duration: '2025–2026',
      highlights: [
        'Built intelligent RAG-based AI chatbot systems',
        'Implemented vector search pipelines',
        'Worked with embeddings and LLMs',
        'Developed document ingestion systems',
        'Improved knowledge accessibility through AI',
      ]
    },
    {
      role: 'Product Development Intern',
      company: 'Physics Wallah',
      duration: 'Nov 2024 – Feb 2025',
      highlights: [
        'Developed healthcare solutions',
        'Worked on multiple POCs',
        'Improved platform scalability',
        'Reduced latency by 15%',
      ]
    },
    {
      role: 'GDG On Campus Lead',
      company: 'GDG On Campus PCE',
      duration: 'Aug 2023 – Present',
      highlights: [
        'Mentored 50+ team members',
        'Organized 15+ events',
        'Conducted workshops',
        'Led Study Jams',
        'Impacted 2000+ students',
      ]
    },
    {
      role: 'Web Developer Intern',
      company: 'Oasis Infobyte',
      duration: 'Oct 2023 – Nov 2023',
      highlights: [
        'Developed responsive web applications',
        'Improved usability and user experience',
      ]
    }
  ],
  projects: [
    {
      name: 'PhotoShare AI',
      description: 'AI-powered event photo-sharing platform featuring InsightFace recognition, active liveness detection, pgvector similarity search, and collaborative galleries.',
      features: ['AI face recognition', 'Active liveness detection', 'InsightFace 512-D embeddings', 'pgvector similarity search', 'QR event sharing & posters', 'Privacy-first personal galleries'],
      tech: ['Next.js 15', 'FastAPI', 'InsightFace', 'PostgreSQL', 'pgvector', 'MediaPipe', 'Cloudinary', 'Better Auth']
    },
    {
      name: 'CourseCrafter',
      description: 'AI-powered learning platform that generates personalized learning paths using YouTube content and intelligent ranking algorithms.',
      features: ['Personalized courses', 'Learning path generation', 'YouTube API integration', 'Difficulty-based recommendations'],
      tech: ['Next.js', 'Node.js', 'AI', 'YouTube API']
    },
    {
      name: 'Medicine Recommendation System',
      description: 'Machine learning system that predicts diseases from symptoms and recommends medicines, diets, and workouts.',
      features: ['Disease prediction', 'Recommendation engine', 'ML-based analytics', 'Healthcare guidance'],
      tech: ['Python', 'Scikit-learn', 'Machine Learning']
    },
    {
      name: 'RAG AI Chatbot',
      description: 'Enterprise-style retrieval augmented generation chatbot developed during C-DAC internship.',
      features: ['Document ingestion', 'Embeddings', 'Vector database', 'Semantic search', 'Context-aware answers'],
      tech: ['Next.js', 'Node.js', 'Ollama', 'LLMs', 'Vector Database']
    },
    {
      name: 'Smart Retail Decision Assistant',
      description: 'Retail analytics platform helping businesses optimize inventory and pricing strategies using data-driven insights.',
      tech: ['Python', 'SQL', 'Analytics']
    }
  ],
  skills: {
    programming: ['Java', 'Python', 'JavaScript', 'C', 'TypeScript'],
    frontend: ['React', 'Next.js 15', 'HTML', 'CSS', 'Tailwind CSS', 'Shadcn UI', 'Framer Motion'],
    backend: ['Node.js', 'Express.js', 'FastAPI'],
    database: ['MySQL', 'PostgreSQL', 'pgvector', 'MongoDB', 'ChromaDB'],
    ai: ['RAG', 'InsightFace', 'MediaPipe Face Landmarker', 'Vector Search (pgvector/ChromaDB)', 'TensorFlow', 'Scikit-learn', 'LLM Applications'],
    cloud: ['Google Cloud Platform', 'Cloudinary', 'Vercel', 'Neon PostgreSQL'],
    tools: ['Git', 'GitHub', 'Docker', 'Postman', 'Figma'],
    analytics: ['SQL', 'Data Analysis', 'Dashboard Development', 'Data Visualization']
  },
  education: {
    mtech: {
      institution: 'National Institute of Technology Patna (NIT Patna)',
      degree: 'Master of Technology (M.Tech)',
      branch: 'Cyber Security',
      status: 'Pursuing'
    },
    btech: {
      institution: 'Pillai College of Engineering',
      degree: 'Bachelor of Technology (B.Tech)',
      branch: 'Computer Engineering',
      duration: '2022–2026',
      cgpa: '8.9+'
    }
  },
  achievements: [
    'GDG On Campus Lead',
    'Microsoft Learn Student Ambassador',
    'Physics Wallah Internship',
    'C-DAC Internship',
    '15+ Google Cloud Skill Badges',
    'Organized National Hackathons',
    'Community Leadership Initiatives',
    'AI Application Development'
  ]
};

export async function askAkashAgent(query: string): Promise<KnowledgeResponse> {
  const normalized = query.toLowerCase().trim();

  // Simulate networking delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Sub-Intent: C-DAC Local LLMs
  if (normalized.includes('local llm') || normalized.includes('llms did he use') || normalized.includes('llama 3') || normalized.includes('ollama')) {
    return {
      answer: `At **C-DAC**, Akash worked with local Large Language Models, specifically **Llama 3** hosted locally using the **Ollama** framework:
• Running LLMs locally guaranteed **100% data privacy**, keeping sensitive enterprise documentation inside secure private servers.
• He configured custom prompt contexts to restrict answers and reduce hallucinations to **less than 2%**.
• Built structured JSON API schemas in Node.js to parse and format model responses.`,
      suggestions: [
        'Tell me about the RAG AI Chatbot project',
        'What is a Vector Database (ChromaDB)?',
        'Tell me about C-DAC experience'
      ]
    };
  }

  // Sub-Intent: Vector Database / ChromaDB
  if (normalized.includes('vector database') || normalized.includes('chromadb') || normalized.includes('embeddings') || normalized.includes('cosine similarity')) {
    return {
      answer: `Akash utilizes **ChromaDB** for semantic document lookup in his Retrieval-Augmented Generation (RAG) pipelines:
• Text extraction of file formats (PDFs, Markdown, DOCX) is split into structured semantic chunks.
• Generates dense semantic vector embeddings for each chunk.
• Stores and indexes these vectors in a local ChromaDB instance.
• Performs similarity matching using **cosine distance metrics** to retrieve relevant context in **under 100ms**.`,
      suggestions: [
        'Tell me about the RAG AI Chatbot project',
        'What local LLMs did he use at C-DAC?',
        'Tell me about C-DAC experience'
      ]
    };
  }

  // Intent 1: C-DAC (General)
  if (normalized.includes('c-dac') || normalized.includes('cdac')) {
    return {
      answer: `Akash worked as a **Project Intern** at **C-DAC** (Centre for Development of Advanced Computing) for 2025–2026. His core contributions included:
• Building intelligent **RAG-based AI chatbot systems** and secure file ingestion pipelines.
• Implementing high-speed vector search schemas using dense semantic embeddings.
• Configuring **ChromaDB** databases to index enterprise knowledge bases.
• Hosting and orchestrating local Large Language Models (**Llama 3** via **Ollama**) for secure document queries.`,
      suggestions: [
        'What local LLMs did he use at C-DAC?',
        'What is a Vector Database (ChromaDB)?',
        'Tell me about the RAG AI Chatbot project',
        'Tell me about Physics Wallah experience'
      ]
    };
  }

  // Sub-Intent: Latency reduction steps at Physics Wallah
  if (normalized.includes('how did he reduce') || normalized.includes('latency by 15%') || normalized.includes('optimize latency') || normalized.includes('latency optimization')) {
    return {
      answer: `At **Physics Wallah**, Akash reduced overall platform latency by **15%** (API and UI response times) through:
• Auditing PostgreSQL database interaction schemas and creating structured SQL indexes on frequently queried fields.
• Refactoring slow middleware endpoints and optimizing payload parsing logic in Node.js.
• Utilizing memory-level caching stores to avoid duplicate database lookups.
• Optimizing React/Next.js frontend bundles using lazy imports to minimize initial load times.`,
      suggestions: [
        'What tech stack did he use at Physics Wallah?',
        'Tell me about Physics Wallah experience',
        'Tell me about GDG On Campus Lead'
      ]
    };
  }

  // Intent 2: Physics Wallah (General)
  if (normalized.includes('physics wallah') || normalized.includes('pw')) {
    return {
      answer: `Akash worked as a **Product Development Intern** at **Physics Wallah** (Nov 2024 – Feb 2025). His work focused on:
• Developing responsive healthcare platforms and administrative tools.
• Constructing production-ready Proof of Concepts (POCs) for core educational features.
• Analyzing PostgreSQL code query logs to optimize database response times.
• Successfully **reducing overall platform API and UI latency by 15%** for smoother student interactions.`,
      suggestions: [
        'How did he reduce platform latency?',
        'What tech stack did he use at Physics Wallah?',
        'Tell me about GDG On Campus Lead',
        'What AI projects has Akash built?'
      ]
    };
  }

  // Sub-Intent: GDG Workshops
  if (normalized.includes('workshops did he lead') || (normalized.includes('workshops') && normalized.includes('led'))) {
    return {
      answer: `As GDG On Campus Lead, Akash has led **8+ hands-on coding workshops** on modern tech stacks:
• **Next.js & React Frameworks**: Taught routing, state management, and cloud deployments.
• **Google Cloud Platform (GCP)**: Guided students through cloud basics and earning Google Cloud skill badges.
• **Git/GitHub & Open Source**: Coordinated contribution campaigns, helping students make their first pull requests.
• **API Integrations**: Built systems integrating AI, YouTube, and database systems.`,
      suggestions: [
        'What national hackathons did he host?',
        'How many students did GDG impact?',
        'Tell me about GDG On Campus Lead'
      ]
    };
  }

  // Sub-Intent: GDG Hackathons
  if (normalized.includes('hackathons did he host') || normalized.includes('national hackathons') || normalized.includes('hackathon')) {
    return {
      answer: `Akash successfully coordinated and hosted **2 national-level hackathons** at Pillai College of Engineering:
• Managed logistics, schedules, and developer resources for over 500+ participants.
• Designed coding problem statements in Software Engineering, AI/ML, and Cybersecurity.
• Coordinated industry judges and senior developer mentors to guide competing teams.
• Mentored participating teams on software architecture and deploying their projects.`,
      suggestions: [
        'What workshops did he lead?',
        'How many students did GDG impact?',
        'Tell me about GDG On Campus Lead'
      ]
    };
  }

  // Intent 3: GDG On Campus (General)
  if (normalized.includes('gdg') || normalized.includes('google developer') || normalized.includes('community') || normalized.includes('lead organizer')) {
    return {
      answer: `Akash is the **GDG On Campus Lead** at Pillai College of Engineering (Aug 2023 – Present). In this leadership role, he:
• Manages and mentors a technical core team of **50+ members**.
• Organized **15+ events** including workshops, hackathons, and Cloud Study Jams.
• Led **8+ hands-on workshops** on Next.js, Cloud deployment, and Git.
• Impacted **2,000+ student developers**, establishing PCE as an active technological hub.`,
      suggestions: [
        'What workshops did he lead?',
        'What national hackathons did he host?',
        'How many students did GDG impact?',
        'Tell me about Microsoft Student Ambassador role'
      ]
    };
  }

  // Sub-Intent: CourseCrafter Algorithm
  if (normalized.includes('difficulty-based') || normalized.includes('ranking algorithm') || normalized.includes('path generation')) {
    return {
      answer: `In **CourseCrafter**, the difficulty-based ranking algorithm sequences YouTube video nodes by:
• Extracting metadata (likes, views, duration, subscriber ratio) and parsing video summaries.
• Assigning difficulty coefficients (e.g. Beginner, Intermediate, Advanced).
• Structuring the learning paths dynamically so students learn foundational programming logic before encountering advanced concepts.
• Storing user progress coordinates directly inside a relational PostgreSQL database.`,
      suggestions: [
        'Tell me about CourseCrafter',
        'What is the RAG AI Chatbot project?',
        'What technologies does Akash work with?'
      ]
    };
  }

  // Sub-Intent: CourseCrafter (Specific)
  if (normalized.includes('coursecrafter')) {
    return {
      answer: `**CourseCrafter** is an AI-powered personalized learning path generator built with **Next.js, Node.js, AI APIs, YouTube API, and PostgreSQL**:
• It accepts a user query/learning goal and dynamically creates structured syllabus nodes.
• It parses **YouTube API metadata** and video descriptions to extract the highest relevance videos.
• It embeds a **difficulty-based ranking algorithm** to sort learning paths from beginner to advanced.
• Saves user progress directly to a PostgreSQL database for continuous tracking.`,
      suggestions: [
        'What is the difficulty-based ranking algorithm?',
        'Tell me about the RAG AI Chatbot project',
        'What is the Medicine Recommendation System?',
        'What technologies does Akash work with?'
      ]
    };
  }

  // Sub-Intent: Medicine System Details
  if (normalized.includes('accuracy of the medicine') || normalized.includes('medicine recommendation') && (normalized.includes('accuracy') || normalized.includes('disease'))) {
    return {
      answer: `The **Medicine Recommendation System** utilizes supervised ML classifiers (SVM) to predict diseases from symptom inputs with **94.5% accuracy**:
• Trained on datasets containing hundreds of disease-symptom linkages.
• Features a regex-based symptom search matcher to match user queries with standard clinical symptom terms.
• Relates predictions to medication guides, dietary workout suggestions, and warning disclaimers.`,
      suggestions: [
        'What is the Medicine Recommendation System?',
        'What technologies does Akash work with?',
        'Tell me about CourseCrafter'
      ]
    };
  }

  // Sub-Intent: Medicine System (Specific)
  if (normalized.includes('medicine') || normalized.includes('recommendation')) {
    return {
      answer: `The **Medicine Recommendation System** is a supervised machine learning platform built using **Python, Scikit-learn, Flask, Pandas, and NumPy**:
• It predicts potential diseases with **94.5% accuracy** based on user-entered symptoms.
• It retrieves relational records mapping the predicted disease to common over-the-counter medicine types.
• It provides custom guidance packs detailing suitable exercises, dietary changes, and healthcare cautions.
• Offers a built-in search matcher to validate symptoms against standard medical terms.`,
      suggestions: [
        'What is the accuracy of the medicine recommendation system?',
        'What technologies does Akash work with?',
        'Tell me about CourseCrafter'
      ]
    };
  }

  // Sub-Intent: PhotoShare AI / Face Recognition / Liveness Detection
  if (normalized.includes('photoshare') || normalized.includes('photo share') || normalized.includes('insightface') || normalized.includes('liveness') || normalized.includes('pgvector') || normalized.includes('face recognition') || normalized.includes('event photo')) {
    return {
      answer: `**PhotoShare AI** is an AI-powered event photo-sharing platform designed for weddings, college events, conferences, and festivals:
• **AI Face Recognition**: Uses **InsightFace** to extract 512-dimensional facial embeddings and **pgvector** in PostgreSQL for fast similarity search.
• **Active Liveness Detection**: Prevents selfie spoofing using browser-based **MediaPipe** challenge sequences (head movement, blink, and smile detection).
• **QR-Based Onboarding**: Automatically generates shareable links, QR codes, and printable A4 posters for zero-friction attendee access.
• **Privacy-First Architecture**: Guests only receive galleries containing their own photos; hosts manage events without accessing private AI-matched galleries.
• **Tech Stack**: Next.js 15 (App Router), FastAPI, PostgreSQL + pgvector, Cloudinary, MediaPipe, InsightFace, Better Auth, Framer Motion.

[Live Demo](https://photoshare-app-iota.vercel.app/) | [GitHub Repository](https://github.com/Akash221104/Photoshare_app)`,
      suggestions: [
        'What tech stack is used in PhotoShare AI?',
        'Tell me about CourseCrafter',
        'Tell me about the RAG AI Chatbot project',
        'What technologies does Akash work with?'
      ]
    };
  }

  // Intent 4: Projects (General)
  if (normalized.includes('project') || normalized.includes('built') || normalized.includes('portfolio') || normalized.includes('codebase') || normalized.includes('github link') || normalized.includes('rag')) {
    if (normalized.includes('photoshare') || normalized.includes('photo share')) {
      return {
        answer: `**PhotoShare AI** is an AI-powered event photo-sharing platform built with **Next.js 15, FastAPI, InsightFace, PostgreSQL + pgvector, and MediaPipe**:
• Solves the problem of distributing thousands of event photos by automatically indexing attendees with facial recognition embeddings.
• Incorporates **MediaPipe active liveness detection** (head turns, blinks, smiles) to prevent selfie spoofing.
• Features **QR-based event access**, printable A4 event posters, host dashboards, and privacy-first personal photo galleries.

[Live Demo](https://photoshare-app-iota.vercel.app/) | [GitHub Repository](https://github.com/Akash221104/Photoshare_app)`,
        suggestions: [
          'What tech stack is used in PhotoShare AI?',
          'Tell me about CourseCrafter',
          'Tell me about the RAG AI Chatbot project'
        ]
      };
    }
    if (normalized.includes('rag chatbot') || normalized.includes('chatbot') || normalized.includes('rag ai')) {
      return {
        answer: `The **RAG AI Chatbot** is an enterprise-style Retrieval-Augmented Generation chatbot developed by Akash during his C-DAC internship:
• Handles secure file ingestion (PDF, Markdown, DOCX) and chunks text.
• Indexes dense semantic embeddings inside a local **ChromaDB** instance.
• Performs similarity matching to retrieve context.
• Generates answers locally via a **Llama 3** model hosted through **Ollama**, ensuring complete data privacy.`,
        suggestions: [
          'What local LLMs did he use at C-DAC?',
          'What is a Vector Database (ChromaDB)?',
          'Tell me about C-DAC experience'
        ]
      };
    }
    if (normalized.includes('retail') || normalized.includes('decision assistant')) {
      return {
        answer: `The **Smart Retail Decision Assistant** is an inventory and pricing analytics tool built using **Python and SQL**. It processes sales data to generate actionable reports that help retail businesses optimize inventory levels and adjust pricing strategies based on sales trends.`,
        suggestions: [
          'What technologies does Akash work with?',
          'What AI projects has Akash built?'
        ]
      };
    }

    return {
      answer: `Akash has built several high-impact projects, particularly in AI and Web Development:
1. **PhotoShare AI**: AI-powered event photo sharing platform with InsightFace recognition, active liveness verification, and pgvector similarity search.
2. **CourseCrafter**: AI learning path generator (Next.js, Node.js, AI, YouTube API).
3. **RAG AI Chatbot**: Enterprise retrieval-augmented QA chatbot (Next.js, Node.js, Ollama, Vector DB).
4. **Medicine Recommendation System**: Symptom-based disease prediction and guidance system (Python, Scikit-learn).
5. **Smart Retail Decision Assistant**: Pricing and inventory optimizer (Python, SQL, Analytics).

*Which of these would you like to know more about?*`,
      suggestions: [
        'Tell me about PhotoShare AI',
        'Tell me about CourseCrafter',
        'Tell me about the RAG AI Chatbot project',
        'What is the Medicine Recommendation System?'
      ]
    };
  }

  // Intent 5: Skills / Tech Stack
  if (normalized.includes('skill') || normalized.includes('technology') || normalized.includes('stack') || normalized.includes('language') || normalized.includes('code') || normalized.includes('work with') || normalized.includes('framework')) {
    return {
      answer: `Akash is highly skilled in both Software Engineering and AI:
• **Languages**: Java, Python, JavaScript, C, SQL
• **Frontend**: React, Next.js, Tailwind CSS, HTML, CSS
• **Backend & DB**: Node.js, Express.js, MySQL, PostgreSQL, MongoDB, ChromaDB (Vector DB)
• **Artificial Intelligence**: Retrieval-Augmented Generation (RAG), Vector Search, LLM Applications, TensorFlow, Scikit-learn
• **Cloud & Tools**: Google Cloud Platform (GCP), Git, GitHub, Postman, Figma
• **Analytics**: Data Analysis, Data Visualization, Dashboard Development`,
      suggestions: [
        'What is his experience with RAG and LLMs?',
        'What backend frameworks does he use?',
        'What AI projects has Akash built?',
        'Tell me about his Google Cloud skills'
      ]
    };
  }

  // Intent 6: Certifications / Achievements
  if (normalized.includes('certification') || normalized.includes('achievement') || normalized.includes('award') || normalized.includes('badge') || normalized.includes('ambassador')) {
    if (normalized.includes('microsoft') || normalized.includes('ambassador')) {
      return {
        answer: `Akash is a **Microsoft Learn Student Ambassador**:
• Collaborates with student developers globally to organize learning events.
• Conducts workshops on Microsoft technologies, cloud services, and coding fundamentals.
• Gains early access to learning pathways, mentorship, and beta developer tooling.`,
        suggestions: [
          'What other certifications does he have?',
          'What is Akash\'s education?',
          'Tell me about GDG On Campus Lead'
        ]
      };
    }

    return {
      answer: `Here are some of Akash's key achievements and certifications:
• **GDG On Campus Lead** at Pillai College of Engineering
• **Microsoft Learn Student Ambassador**
• **C-DAC & Physics Wallah** Internships
• **15+ Google Cloud Skill Badges** (focused on cloud architecture and APIs)
• Certifications in:
  - **Data Structures and System Design** (AlgoAcademy)
  - **Cybersecurity Foundations** (Palo Alto Networks)
  - **Figma Motion Design** (Figma Academy)`,
      suggestions: [
        'Tell me about Microsoft Student Ambassador role',
        'Tell me about Palo Alto Networks certification',
        'What is Akash\'s B.Tech education?',
        'What technologies does Akash work with?'
      ]
    };
  }

  // Sub-Intent: Palo Alto Network Certification
  if (normalized.includes('palo alto') || normalized.includes('cybersecurity')) {
    return {
      answer: `Akash holds a certification in **Cybersecurity Foundations** from **Palo Alto Networks**.
This certification validates his foundational understanding of network security, cloud security architectures, endpoint security strategies, and threat landscape management practices.`,
      suggestions: [
        'What other achievements does Akash have?',
        'What technologies does Akash work with?',
        'What B.Tech branch is he in?'
      ]
    };
  }

  // Intent 7: Education
  if (normalized.includes('education') || normalized.includes('college') || normalized.includes('university') || normalized.includes('degree') || normalized.includes('gpa') || normalized.includes('cgpa') || normalized.includes('pillai') || normalized.includes('nit') || normalized.includes('patna') || normalized.includes('mtech') || normalized.includes('m.tech') || normalized.includes('student')) {
    return {
      answer: `Akash's educational background includes:
• **M.Tech in Cyber Security** at **National Institute of Technology Patna (NIT Patna)** (Currently Pursuing).
• **B.Tech in Computer Engineering** at **Pillai College of Engineering** (2022–2026) with an impressive CGPA of **8.9+** out of 10.`,
      suggestions: [
        'Tell me about M.Tech at NIT Patna',
        'What is his B.Tech CGPA?',
        'Tell me about GDG On Campus Lead',
        'What certifications does he have?'
      ]
    };
  }

  // Intent 8: Contact / Hire
  if (normalized.includes('contact') || normalized.includes('email') || normalized.includes('hire') || normalized.includes('linkedin') || normalized.includes('reach') || normalized.includes('phone') || normalized.includes('call') || normalized.includes('whatsapp')) {
    const p = KNOWLEDGE_BASE.personal;
    return {
      answer: `You can reach out to Akash via:
• **Email**: [${p.email}](mailto:${p.email})
• **LinkedIn**: [Akash Satpute on LinkedIn](${p.linkedin})
• **GitHub**: [Akash221104 on GitHub](${p.github})
• **Phone / WhatsApp**: [${p.phone}](tel:+919987935895)
• **Blog**: [akashblogss.hashnode.dev](${p.hashnode})

Feel free to write him a message through the contact form at the bottom of the home page!`,
      suggestions: [
        'What AI projects has Akash built?',
        'What technologies does Akash work with?',
        'Show his Hashnode blog link'
      ]
    };
  }

  // Intent 9: Blog / Articles / Technical Writing
  if (normalized.includes('blog') || normalized.includes('article') || normalized.includes('write') || normalized.includes('hashnode') || normalized.includes('next.js 15') || normalized.includes('server actions')) {
    return {
      answer: `Akash publishes in-depth technical articles on his **Hashnode Blog** (https://akashblogss.hashnode.dev/):
1. **Retrieval-Augmented Generation (RAG) Guide**: Implementation details for vector retrieval structures.
2. **Next.js 15 & Server Actions**: Optimizing full-stack web assemblies.
3. **GDG On Campus Community**: Driving developer growth on campus.
4. **Medicine Recommendation Systems**: Symptom-based classifiers in Python.
5. **Platform Latency Optimizations**: Reducing latency at Physics Wallah.
6. **Figma Motion Design**: Enhancing designer-developer UI handoffs.`,
      suggestions: [
        'Show his Hashnode blog link',
        'What is his RAG guide blog post about?',
        'What AI projects has Akash built?',
        'What technologies does Akash work with?'
      ]
    };
  }

  // Default Fallback Response
  return {
    answer: `Hi there! I am Akash's AI Assistant. I can help you learn more about his background, internships, projects, skills, education, and technical writings.

Feel free to ask me anything, or pick one of these questions:`,
    suggestions: [
      'Tell me about Akash\'s experience at C-DAC',
      'What AI projects has Akash built?',
      'What technologies does Akash work with?',
      'Tell me about GDG On Campus Lead'
    ]
  };
}
