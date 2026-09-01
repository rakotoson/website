export const skills = {
  languages: ['JavaScript', 'TypeScript', 'Node.js', 'PHP', 'Python', 'Bash', 'SQL', 'HTML5', 'CSS3'],
  frameworks: ['NestJS', 'Express', 'Laravel', 'Ruby on Rails', 'Angular', 'Ionic', 'Next.js', 'React', 'React Native', 'Vue.js', 'Tailwind CSS', 'Shadcn', 'Bootstrap'],
  databases: ['PostgreSQL', 'Supabase', 'MySQL', 'MongoDB', 'Redis', 'Elasticsearch', 'SQLite', 'IndexedDB'],
  tools: ['Docker', 'Git', 'GitLab', 'GitHub', 'CI/CD', 'Linux', 'REST API', 'GraphQL', 'gRPC', 'WebSocket', 'AI Agents', 'Redash', 'Figma', 'Jira', 'Trello'],
  methodologies: ['Agile/Scrum', 'OOP', 'TDD']
};

export const experience = {
  en: [
    {
      period: 'September 2019 - July 2026',
      company: 'Haizaha',
      role: 'Software Engineer & Technical Lead',
      location: 'Madagascar',
      details: [
        'Led the architecture of Repr.dev, an AI-driven Git contribution analysis tool, reaching 95% analysis accuracy',
        'Directed the critical migration from Access to PostgreSQL and oversaw ERP development for Accord Knits, optimizing overall production efficiency',
        'Deployed a hybrid fullstack solution (Angular/Ionic) for field data collection, improving on-site tracking efficiency',
        'Designed an automated Chrome monitoring extension, reducing AI annotation errors by 40%'
      ],
      projects: [
        {
          title: 'Accord Knits Yarn Management',
          description: 'Production tracking and management system for textile operations',
          tech: ['NestJS', 'TypeScript', 'Angular', 'PostgreSQL', 'AccessDB', 'Shell', 'Python', 'Docker', 'Tailwind', 'Git']
        },
        {
          title: 'Repr.dev',
          description: 'AI-powered platform for analyzing Git contribution history and developer activity, reaching 95% analysis accuracy',
          tech: ['Next.js', 'Node.js', 'Python', 'NumPy', 'SQLAlchemy']
        },
        {
          title: 'AD2M',
          description: 'Hybrid fullstack solution for regional field data collection and on-site tracking',
          tech: ['Angular', 'Ionic', 'Docker']
        },
        {
          title: 'Chrome Extension Monitoring',
          description: 'Automated Chrome extension for monitoring AI annotation quality, cutting errors by 40%',
          tech: ['JavaScript', 'Chrome Extension API']
        }
      ]
    },
    {
      period: 'July 2024 - February 2026',
      company: 'Servyia SRL U',
      role: 'Fullstack Software Engineer',
      location: 'Madagascar',
      details: [
        'Designed the architecture of a global high-traffic e-commerce platform, improving system scalability and performance',
        'Built a modular frontend with Next.js and Tailwind CSS, significantly increasing user engagement',
        'Deployed microservices under NestJS and integrated AI agents, automating key processes and cutting operational costs by 25%',
        'Optimized Supabase queries and GitLab CI/CD pipelines, reducing deployment times by 30%'
      ],
      projects: [
        {
          title: 'High-Traffic E-Commerce Platform',
          description: 'Global e-commerce platform with a modular storefront and AI-assisted operations',
          tech: ['Next.js', 'NestJS', 'Supabase', 'Tailwind CSS', 'AI Agents', 'GitLab CI/CD', 'Jira']
        }
      ]
    },
    {
      period: 'May 2023 - June 2024',
      company: 'Ennov IT',
      role: 'Software Engineer (Consultant)',
      location: 'Madagascar',
      details: [
        'Accelerated search performance via a Node.js API using Worker Threads, handling 100,000+ requests per second',
        'Automated JSON feed processing with Ruby and Bash, speeding up product indexing by 40%',
        'Modernized PHP and Ruby stacks to their latest versions, improving overall security and performance by 30%',
        'Optimized infrastructure with Redis and Elasticsearch, reducing system latency by 50%'
      ],
      projects: [
        {
          title: 'Pertimm Search Engine Platform',
          description: 'European leader in search engine solutions powering major clients like E.Leclerc and Showroomprivé',
          tech: ['Node.js', 'Ruby on Rails', 'PHP 8', 'Elasticsearch', 'Redis', 'MySQL', 'FluentD', 'Bash']
        }
      ]
    },
    {
      period: 'February 2022 - May 2022',
      company: 'Katana SAS',
      role: 'Fullstack Developer',
      location: 'Madagascar',
      details: [
        'Optimized UX/UI with reusable React components, improving page fluidity and load speed',
        'Built robust REST APIs under Node.js, ensuring more reliable data exchange'
      ],
      projects: [
        {
          title: 'Werenov Repair Tracking',
          description: 'Platform for tracking and managing building repair progress',
          tech: ['Node.js', 'React', 'MongoDB', 'Bootstrap', 'Git']
        }
      ]
    },
    {
      period: 'November 2020 - July 2021',
      company: 'Consult & Co Digital',
      role: 'Fullstack IT Consultant',
      location: 'Madagascar',
      details: [
        'Built a cross-platform mobile app with React Native (XXL Happyness), reaching 10,000+ active downloads',
        'Generated automated KPI dashboards, delivering critical insights that drove a notable performance increase',
        'Designed high-performance Angular interfaces for fleet management (Octave Telecom), improving overall operational efficiency'
      ],
      projects: [
        {
          title: 'XXL Happyness',
          description: 'Employee well-being and quality of work life management platform',
          tech: ['NestJS', 'React Native', 'MongoDB', 'GraphQL', 'Node.js', 'Git']
        },
        {
          title: 'Octave Telecom',
          description: 'Fleet management platform with high-performance interfaces for operational tracking',
          tech: ['Angular', 'Node.js', 'NestJS', 'MongoDB', 'GraphQL']
        }
      ]
    },
    {
      period: 'June 2017 - August 2019',
      company: 'Soku Madagascar',
      role: 'Backend Developer / Consultant',
      location: 'Madagascar',
      details: [
        'Built the backend engine for Digidom with Laravel and MySQL, handling 5,000+ transactions per month without interruption',
        'Implemented an automated emailing system, improving customer engagement and interaction rates'
      ],
      projects: [
        {
          title: 'Digidom',
          description: 'Register and set up your company easily with Digidom',
          tech: ['PHP', 'Laravel', 'React Native', 'MongoDB', 'Bootstrap', 'JavaScript', 'jQuery', 'Git']
        }
      ]
    }
  ],
  fr: [
    {
      period: 'Septembre 2019 - Juillet 2026',
      company: 'Haizaha',
      role: 'Ingénieur Logiciel & Lead Technique',
      location: 'Madagascar',
      details: [
        "Piloté l'architecture de Repr.dev, un outil d'analyse des contributions Git par IA, atteignant 95 % de précision d'analyse",
        "Dirigé la migration critique d'Access vers PostgreSQL et supervisé le développement de l'ERP pour Accord Knits, optimisant l'efficacité globale de la production",
        "Déployé une solution hybride fullstack (Angular/Ionic) pour la collecte de données terrain, améliorant l'efficacité du suivi sur site",
        "Conçu une extension Chrome de surveillance automatisée, réduisant les erreurs d'annotation IA de 40 %"
      ],
      projects: [
        {
          title: 'Accord Knits (ERP Production)',
          description: 'Système de suivi et de gestion de la production pour les opérations textiles',
          tech: ['NestJS', 'TypeScript', 'Angular', 'PostgreSQL', 'AccessDB', 'Shell', 'Python', 'Docker', 'Tailwind', 'Git']
        },
        {
          title: 'Repr.dev',
          description: "Plateforme propulsée par l'IA pour analyser l'historique des contributions Git et l'activité des développeurs, atteignant 95 % de précision d'analyse",
          tech: ['Next.js', 'Node.js', 'Python', 'NumPy', 'SQLAlchemy']
        },
        {
          title: 'AD2M',
          description: 'Solution hybride fullstack pour la collecte de données terrain régionale et le suivi sur site',
          tech: ['Angular', 'Ionic', 'Docker']
        },
        {
          title: 'Extension Chrome de Monitoring',
          description: "Extension Chrome automatisée pour surveiller la qualité des annotations IA, réduisant les erreurs de 40 %",
          tech: ['JavaScript', 'Chrome Extension API']
        }
      ]
    },
    {
      period: 'Juillet 2024 - Février 2026',
      company: 'Servyia SRL U',
      role: 'Ingénieur Logiciel Fullstack',
      location: 'Madagascar',
      details: [
        "Conçu l'architecture d'une plateforme e-commerce mondiale à fort trafic, améliorant la scalabilité et les performances du système",
        "Développé un frontend modulaire avec Next.js et Tailwind CSS, augmentant significativement l'engagement des utilisateurs",
        "Déployé des microservices sous NestJS et intégré des agents IA, automatisant des processus clés et réduisant les coûts opérationnels de 25 %",
        "Optimisé les requêtes Supabase et les pipelines CI/CD GitLab, réduisant les temps de déploiement de 30 %"
      ],
      projects: [
        {
          title: 'Plateforme E-Commerce à Fort Trafic',
          description: 'Plateforme e-commerce mondiale avec une boutique modulaire et des opérations assistées par IA',
          tech: ['Next.js', 'NestJS', 'Supabase', 'Tailwind CSS', 'AI Agents', 'GitLab CI/CD', 'Jira']
        }
      ]
    },
    {
      period: 'Mai 2023 - Juin 2024',
      company: 'Ennov IT',
      role: 'Ingénieur Logiciel (Consultant)',
      location: 'Madagascar',
      details: [
        "Accéléré les performances de recherche via une API Node.js utilisant les Worker Threads, traitant plus de 100 000 requêtes par seconde",
        "Automatisé le traitement des flux JSON avec Ruby et Bash, accélérant l'indexation des produits de 40 %",
        "Modernisé les stacks PHP et Ruby vers leurs dernières versions, améliorant la sécurité et les performances globales de 30 %",
        "Optimisé l'infrastructure avec Redis et Elasticsearch, réduisant la latence du système de 50 %"
      ],
      projects: [
        {
          title: 'Pertimm – Moteur de Recherche',
          description: 'Leader européen des solutions de moteur de recherche, au service de grands clients comme E.Leclerc et Showroomprivé',
          tech: ['Node.js', 'Ruby on Rails', 'PHP 8', 'Elasticsearch', 'Redis', 'MySQL', 'FluentD', 'Bash']
        }
      ]
    },
    {
      period: 'Février 2022 - Mai 2022',
      company: 'Katana SAS',
      role: 'Développeur Fullstack',
      location: 'Madagascar',
      details: [
        "Optimisé l'UX/UI avec des composants React réutilisables, améliorant la fluidité et la vitesse de chargement des pages",
        "Développé des API REST robustes sous Node.js, garantissant des échanges de données plus fiables"
      ],
      projects: [
        {
          title: 'Werenov – Suivi de Rénovation',
          description: "Plateforme de suivi et de gestion de l'avancement des travaux de rénovation",
          tech: ['Node.js', 'React', 'MongoDB', 'Bootstrap', 'Git']
        }
      ]
    },
    {
      period: 'Novembre 2020 - Juillet 2021',
      company: 'Consult & Co Digital',
      role: 'Consultant Informatique Fullstack',
      location: 'Madagascar',
      details: [
        "Développé une application mobile cross-platform avec React Native (XXL Happyness), atteignant plus de 10 000 téléchargements actifs",
        "Généré des tableaux de bord KPI automatisés, fournissant des insights critiques ayant conduit à une hausse notable de la performance",
        "Conçu des interfaces Angular haute performance pour la gestion de flotte (Octave Telecom), améliorant l'efficacité opérationnelle globale"
      ],
      projects: [
        {
          title: 'XXL Happyness',
          description: 'Plateforme de gestion du bien-être et de la qualité de vie au travail des employés',
          tech: ['NestJS', 'React Native', 'MongoDB', 'GraphQL', 'Node.js', 'Git']
        },
        {
          title: 'Octave Telecom',
          description: 'Plateforme de gestion de flotte avec des interfaces haute performance pour le suivi opérationnel',
          tech: ['Angular', 'Node.js', 'NestJS', 'MongoDB', 'GraphQL']
        }
      ]
    },
    {
      period: 'Juin 2017 - Août 2019',
      company: 'Soku Madagascar',
      role: 'Développeur Backend / Consultant',
      location: 'Madagascar',
      details: [
        "Développé le moteur backend de Digidom avec Laravel et MySQL, gérant plus de 5 000 transactions par mois sans interruption",
        "Implémenté un système d'emailing automatisé, améliorant l'engagement client et les taux d'interaction"
      ],
      projects: [
        {
          title: 'Digidom',
          description: 'Enregistrez et créez facilement votre entreprise avec Digidom',
          tech: ['PHP', 'Laravel', 'React Native', 'MongoDB', 'Bootstrap', 'JavaScript', 'jQuery', 'Git']
        }
      ]
    }
  ]
};

export const contactInfo = {
  en: {
    email: 'navotra.rakotoson@gmail.com',
    phone: '+261 34 93 543 89',
    location: 'Remote from Madagascar, available worldwide',
    languages: 'English, French'
  },
  fr: {
    email: 'navotra.rakotoson@gmail.com',
    phone: '+261 34 93 543 89',
    location: 'À distance depuis Madagascar, disponible dans le monde entier',
    languages: 'Anglais, Français'
  }
};

export const education = {
  en: [
    {
      title: "Master's in Computer Science",
      institution: 'IT University, 2018',
      location: 'Antananarivo, Madagascar',
      detail: 'MBDS Specialization'
    },
    {
      title: "Bachelor's in Computer Science",
      institution: 'Athénée Saint Joseph, 2017',
      location: 'Antsirabe, Madagascar',
      detail: null
    },
    {
      title: 'Google Africa Developer Scholarship',
      institution: 'Android Developer, 2020',
      location: 'Online',
      detail: null
    }
  ],
  fr: [
    {
      title: 'Master en Informatique',
      institution: 'IT University, 2018',
      location: 'Antananarivo, Madagascar',
      detail: 'Spécialisation MBDS'
    },
    {
      title: 'Licence en Informatique',
      institution: 'Athénée Saint Joseph, 2017',
      location: 'Antsirabe, Madagascar',
      detail: null
    },
    {
      title: 'Google Africa Developer Scholarship',
      institution: 'Développeur Android, 2020',
      location: 'En ligne',
      detail: null
    }
  ]
};
