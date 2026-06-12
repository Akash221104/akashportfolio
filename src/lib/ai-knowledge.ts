export interface KnowledgeResponse {
  answer: string;
  suggestions: string[];
}

const KNOWLEDGE_BASE = {
  personal: {
    name: 'Akash Satpute',
    location: 'Navi Mumbai, India',
    email: 'sakash22comp@student.mes.ac.in',
    linkedin: 'https://www.linkedin.com/in/akash-satpute-548b5a256/',
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
    programming: ['Java', 'Python', 'JavaScript', 'C'],
    frontend: ['React', 'Next.js', 'HTML', 'CSS', 'Tailwind'],
    backend: ['Node.js', 'Express.js'],
    database: ['MySQL', 'PostgreSQL', 'MongoDB'],
    ai: ['RAG', 'TensorFlow', 'Scikit-learn', 'LLM Applications', 'Vector Search'],
    cloud: ['Google Cloud Platform'],
    tools: ['Git', 'GitHub', 'Postman', 'Figma'],
    analytics: ['SQL', 'Data Analysis', 'Dashboard Development', 'Data Visualization']
  },
  education: {
    institution: 'Pillai College of Engineering',
    degree: 'Bachelor of Technology',
    branch: 'Computer Engineering',
    duration: '2022–2026',
    cgpa: '8.9+'
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

  // Intent 1: C-DAC
  if (normalized.includes('c-dac') || normalized.includes('cdac')) {
    const cdac = KNOWLEDGE_BASE.experience.find(e => e.company.includes('C-DAC'));
    return {
      answer: `Akash worked as a **Project Intern** at **C-DAC** (Centre for Development of Advanced Computing) for 2025–2026. During this internship, he:
• Built intelligent **RAG-based AI chatbot systems**
• Implemented vector search pipelines
• Worked with embeddings and Large Language Models (LLMs)
• Developed scalable document ingestion pipelines
• Significantly improved organizational knowledge accessibility through artificial intelligence.`,
      suggestions: ['What AI projects has Akash built?', 'What technologies does Akash work with?', 'Tell me about Physics Wallah experience']
    };
  }

  // Intent 2: Physics Wallah
  if (normalized.includes('physics wallah') || normalized.includes('pw')) {
    const pw = KNOWLEDGE_BASE.experience.find(e => e.company.includes('Physics Wallah'));
    return {
      answer: `Akash worked as a **Product Development Intern** at **Physics Wallah** from Nov 2024 to Feb 2025. His achievements there include:
• Developing healthcare POCs (Proof of Concepts) and scalable solutions.
• Improving overall platform scalability and performance.
• **Reducing platform latency by 15%** for smoother student interactions.`,
      suggestions: ['Tell me about GDG On Campus Lead', 'What AI projects has Akash built?', 'What is Akash\'s education?']
    };
  }

  // Intent 3: GDG On Campus
  if (normalized.includes('gdg') || normalized.includes('google developer') || normalized.includes('community')) {
    return {
      answer: `Akash is the **GDG On Campus Lead** at Pillai College of Engineering (Aug 2023 – Present). In this role, he:
• Led a core team of **50+ members** and mentored students.
• Organized **15+ tech events** (workshops, Cloud Study Jams, study circles).
• Impacted and empowered **2,000+ student developers** on campus.`,
      suggestions: ['What certifications does Akash have?', 'Tell me about C-DAC experience', 'What are his programming skills?']
    };
  }

  // Intent 4: Projects (General or Specific)
  if (normalized.includes('project') || normalized.includes('built') || normalized.includes('portfolio') || normalized.includes('coursecrafter') || normalized.includes('medicine') || normalized.includes('rag') || normalized.includes('retail')) {
    if (normalized.includes('coursecrafter')) {
      const proj = KNOWLEDGE_BASE.projects[0];
      return {
        answer: `**CourseCrafter** is an AI-powered learning platform built with **Next.js, Node.js, AI, and the YouTube API**.
It generates personalized learning paths based on YouTube contents and incorporates intelligent ranking and difficulty-based recommendations.`,
        suggestions: ['Tell me about the RAG AI Chatbot project', 'What is the Medicine Recommendation System?', 'What technologies does Akash work with?']
      };
    }
    if (normalized.includes('medicine') || normalized.includes('recommendation')) {
      const proj = KNOWLEDGE_BASE.projects[1];
      return {
        answer: `The **Medicine Recommendation System** is a machine learning project written in **Python (Scikit-learn)**.
It predicts potential diseases from symptoms input by users and provides recommendations for medicines, diets, and workouts.`,
        suggestions: ['What technologies does Akash work with?', 'Tell me about C-DAC experience', 'Show latest blog posts']
      };
    }
    if (normalized.includes('rag chatbot') || normalized.includes('chatbot') || normalized.includes('rag ai')) {
      const proj = KNOWLEDGE_BASE.projects[2];
      return {
        answer: `The **RAG AI Chatbot** is an enterprise-style Retrieval-Augmented Generation chatbot developed by Akash during his C-DAC internship.
It features:
• Secure document ingestion
• Text embeddings & semantic search
• **Vector Database** integration
• Context-aware answers via local LLMs (**Ollama** / Next.js / Node.js)`,
        suggestions: ['Tell me about C-DAC experience', 'What technologies does Akash work with?', 'Show latest blog posts']
      };
    }
    if (normalized.includes('retail') || normalized.includes('decision assistant')) {
      const proj = KNOWLEDGE_BASE.projects[3];
      return {
        answer: `The **Smart Retail Decision Assistant** is a data analytics platform developed in **Python and SQL** to assist retail businesses in optimizing pricing and inventory strategies through data-driven insights.`,
        suggestions: ['What AI projects has Akash built?', 'What technologies does Akash work with?']
      };
    }

    return {
      answer: `Akash has built several high-impact projects, particularly in AI and Web Development:
1. **CourseCrafter**: AI learning path generator (Next.js, Node.js, AI, YouTube API).
2. **RAG AI Chatbot**: Enterprise retrieval-augmented QA chatbot (Next.js, Node.js, Ollama, Vector DB).
3. **Medicine Recommendation System**: Symptom-based disease prediction and guidance system (Python, Scikit-learn).
4. **Smart Retail Decision Assistant**: Pricing and inventory optimizer (Python, SQL, Analytics).

*Which of these would you like to know more about?*`,
      suggestions: ['Tell me about CourseCrafter', 'Tell me about the RAG AI Chatbot project', 'What is the Medicine Recommendation System?']
    };
  }

  // Intent 5: Skills / Tech Stack
  if (normalized.includes('skill') || normalized.includes('technology') || normalized.includes('stack') || normalized.includes('language') || normalized.includes('code') || normalized.includes('work with')) {
    return {
      answer: `Akash is highly skilled in both Software Engineering and AI:
• **Languages**: Java, Python, JavaScript, C, SQL
• **Frontend**: React, Next.js, Tailwind CSS, HTML, CSS
• **Backend & DB**: Node.js, Express.js, MySQL, PostgreSQL, MongoDB
• **Artificial Intelligence**: Retrieval-Augmented Generation (RAG), Vector Search, LLM Applications, TensorFlow, Scikit-learn
• **Cloud & Tools**: Google Cloud Platform (GCP), Git, GitHub, Postman, Figma
• **Analytics**: Data Analysis, Data Visualization, Dashboard Development`,
      suggestions: ['What AI projects has Akash built?', 'Tell me about C-DAC experience', 'What achievements does Akash have?']
    };
  }

  // Intent 6: Certifications / Achievements
  if (normalized.includes('certification') || normalized.includes('achievement') || normalized.includes('award') || normalized.includes('badge')) {
    return {
      answer: `Here are some of Akash's key achievements and certifications:
• **GDG On Campus Lead** at Pillai College of Engineering
• **Microsoft Learn Student Ambassador**
• **C-DAC & Physics Wallah** Internships
• **15+ Google Cloud Skill Badges**
• Organized national hackathons and developer study jams on campus
• Certifications in **Data Structures and System Design**, **Cybersecurity Foundations**, and **Figma Motion Design**`,
      suggestions: ['Tell me about GDG On Campus Lead', 'What is Akash\'s education?', 'What technologies does Akash work with?']
    };
  }

  // Intent 7: Education
  if (normalized.includes('education') || normalized.includes('college') || normalized.includes('university') || normalized.includes('degree') || normalized.includes('gpa') || normalized.includes('pillai')) {
    const edu = KNOWLEDGE_BASE.education;
    return {
      answer: `Akash is pursuing a **Bachelor of Technology (B.Tech)** in **Computer Engineering** at **Pillai College of Engineering** (2022–2026).
He maintains an excellent academic record with a CGPA of **8.9+** out of 10.`,
      suggestions: ['Tell me about GDG On Campus Lead', 'Tell me about C-DAC experience', 'What skills does he have?']
    };
  }

  // Intent 8: Contact / Hire
  if (normalized.includes('contact') || normalized.includes('email') || normalized.includes('hire') || normalized.includes('linkedin') || normalized.includes('reach')) {
    const p = KNOWLEDGE_BASE.personal;
    return {
      answer: `You can reach out to Akash via:
• **Email**: [sakash22comp@student.mes.ac.in](mailto:${p.email})
• **LinkedIn**: [Akash Satpute on LinkedIn](${p.linkedin})
• **GitHub**: [github.com/akashsatpute](https://github.com)
• **Blog**: [akashblogss.hashnode.dev](${p.hashnode})

Feel free to write him a message through the contact form at the bottom of the home page!`,
      suggestions: ['What AI projects has Akash built?', 'What technologies does Akash work with?']
    };
  }

  // Intent 9: Blog / Articles
  if (normalized.includes('blog') || normalized.includes('article') || normalized.includes('write') || normalized.includes('hashnode')) {
    return {
      answer: `Akash publishes in-depth technical articles on his **Hashnode Blog** (https://akashblogss.hashnode.dev/).
Some of his popular pieces cover:
1. **Retrieval-Augmented Generation (RAG)** Guide
2. **Next.js 15 & Server Actions** Full-Stack Systems
3. **GDG On Campus** Community Building
4. **Medicine Recommendation Systems** using ML
5. **Platform Latency Optimizations** at Physics Wallah
6. **Figma Motion Design** & developer workflows`,
      suggestions: ['Show latest blog posts', 'What AI projects has Akash built?', 'What technologies does Akash work with?']
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
