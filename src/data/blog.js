export const posts = {
  en: [
    {
      slug: 'repr-dev-git-contribution-analysis',
      title: 'Building Repr.dev: Turning Git History Into a Real Signal of Contribution',
      excerpt: 'Why raw commit counts are a bad proxy for impact, and how Repr.dev scores developer contributions from Git history with 95% analysis accuracy.',
      date: 'February 2025',
      readTime: '6 min read',
      tags: ['AI', 'Git', 'Python'],
      blocks: [
        {
          type: 'paragraph',
          text: "Repr.dev started from a simple complaint: \"lines of code\" and \"number of commits\" are terrible ways to judge a developer's contribution, but almost every tool that tries to summarize Git history still leans on them. Building something better meant treating a commit not as a number, but as a small bundle of evidence — and scoring it accordingly. The result reaches 95% agreement with manual review on the validation set we tested against."
        },
        { type: 'heading', text: 'Why raw commit counts lie' },
        {
          type: 'paragraph',
          text: "A one-line config fix and a 400-line refactor both count as \"a commit.\" A single squash-merged pull request can hide two weeks of work behind one entry. Someone reformatting a file with a linter can look like the most \"productive\" person on the team for a day. If you score contribution by counting commits or diff lines, you're optimizing for the wrong thing — and any tool built on that foundation will be gamed or simply wrong."
        },
        { type: 'heading', text: 'Features that actually correlate with impact' },
        {
          type: 'paragraph',
          text: "The fix was to pull a wider set of signals out of each commit before scoring anything: how many distinct modules it touched, the ratio of test changes to source changes, how the change clusters in time relative to the author's other commits, and whether the commit message reflects a real unit of work rather than \"wip\" or \"fix.\" None of these alone is reliable — together, they're a much better proxy than line count."
        },
        {
          type: 'code',
          text: "def extract_features(commit):\n    stats = commit.stats.total\n    return {\n        \"files_changed\": stats[\"files\"],\n        \"modules_touched\": count_distinct_modules(commit),\n        \"test_ratio\": test_lines(commit) / max(stats[\"lines\"], 1),\n        \"message_quality\": score_commit_message(commit.message),\n    }"
        },
        { type: 'heading', text: 'Python for the analysis, Next.js for the story' },
        {
          type: 'paragraph',
          text: "The scoring pipeline is Python: NumPy for the feature vectors and the weighting math, SQLAlchemy to persist every scored commit so the numbers are reproducible and auditable rather than recomputed on the fly. The frontend is a separate concern entirely — a Next.js dashboard that turns those scores into a timeline a human can actually read, without ever needing to know a feature vector exists."
        },
        {
          type: 'code',
          text: "class Contribution(Base):\n    __tablename__ = \"contributions\"\n\n    id = Column(Integer, primary_key=True)\n    commit_sha = Column(String, unique=True)\n    author = Column(String, index=True)\n    impact_score = Column(Float)\n    computed_at = Column(DateTime, default=datetime.utcnow)"
        },
        {
          type: 'paragraph',
          text: "Keeping analysis and presentation in separate layers, connected only by a database table, meant either side could change independently — the scoring model has been tuned multiple times since launch without touching a single line of the dashboard."
        },
        { type: 'heading', text: 'Getting to 95%' },
        {
          type: 'paragraph',
          text: "95% accuracy isn't a number you hit on the first pass — it came from running the model against a manually-reviewed sample of commits, checking where it disagreed with human judgment, and feeding those disagreements back into the feature set. Most of the early errors traced back to one thing: treating all file types equally. A config or lockfile change was carrying the same weight as a change to core business logic, so file-type weighting became one of the biggest single accuracy gains in the whole project."
        },
        {
          type: 'paragraph',
          text: "The broader lesson carries past this one tool: an AI system is only as good as the features you feed it, and the fastest way to improve accuracy is usually to go looking for where your assumptions about the data are wrong — not to reach for a bigger model."
        }
      ]
    },
    {
      slug: 'round-robin-sha1-worker-threads',
      title: 'Scaling a Search Engine API: Worker Threads, Round-Robin Balancing, and SHA1 Fingerprinting',
      excerpt: 'How a Node.js search API built for Pertimm handled 100,000+ requests per second — Worker Threads, round-robin balancing, and SHA1 fingerprinting working together.',
      date: 'September 2024',
      readTime: '7 min read',
      tags: ['Node.js', 'Worker Threads', 'Performance'],
      blocks: [
        {
          type: 'paragraph',
          text: "On the Pertimm search engine platform, the Node.js API sitting in front of Elasticsearch had to hold up under 100,000+ requests per second for clients like E.Leclerc and Showroomprivé. Getting there wasn't one trick — it was three unglamorous pieces working together: Worker Threads to use every CPU core, round-robin balancing to keep them all equally busy, and SHA1 fingerprinting to stop re-indexing data that hadn't changed."
        },
        { type: 'heading', text: 'The bottleneck: one event loop, one core' },
        {
          type: 'paragraph',
          text: "Node.js is single-threaded by default, which is fine for I/O-bound work but a hard ceiling for CPU-bound work — parsing large JSON payloads, scoring and re-ranking search results, building query DSL for Elasticsearch. Under real load, that scoring logic was blocking the event loop long enough to stall unrelated requests. The fix wasn't a bigger server; it was using the cores already available."
        },
        { type: 'heading', text: 'Worker Threads: a pool, not a thread-per-request' },
        {
          type: 'paragraph',
          text: "Node's worker_threads module lets you run JavaScript on separate threads with their own V8 instance, communicating via message passing (or SharedArrayBuffer when you need to avoid copying). Spawning a worker per request is too slow — thread creation has real overhead. Instead, I start a fixed pool at boot, sized to the CPU count, and keep it alive for the life of the process."
        },
        {
          type: 'code',
          text: "const { Worker } = require('worker_threads');\nconst os = require('os');\n\nconst POOL_SIZE = os.cpus().length;\nconst pool = Array.from({ length: POOL_SIZE }, () => new Worker('./search-worker.js'));"
        },
        { type: 'heading', text: 'Round-robin: the simplest balancer that actually works' },
        {
          type: 'paragraph',
          text: "With a fixed pool, the question becomes: which worker gets the next request? Search queries are fairly uniform in cost, so a full load-aware balancer was overkill — a round-robin index was enough to spread requests evenly and kept the dispatcher itself from becoming a bottleneck."
        },
        {
          type: 'code',
          text: "let cursor = 0;\n\nfunction nextWorker() {\n  const worker = pool[cursor];\n  cursor = (cursor + 1) % pool.length;\n  return worker;\n}\n\nfunction handleQuery(query) {\n  return new Promise((resolve) => {\n    const worker = nextWorker();\n    worker.once('message', resolve);\n    worker.postMessage(query);\n  });\n}"
        },
        {
          type: 'paragraph',
          text: "That's the entire dispatcher. No external load balancer, no extra infrastructure — just an index that wraps around the pool size, which is exactly what a stateless, uniform-cost workload needs."
        },
        { type: 'heading', text: "SHA1 fingerprinting: don't index what hasn't changed" },
        {
          type: 'paragraph',
          text: "The other half of the performance story wasn't query speed — it was indexing speed. Product feeds arrived as JSON, and the naive approach re-indexes every record on every run. Most records, on any given run, are unchanged. I hash each incoming record with SHA1 and compare it against the hash stored from the last successful index; only a mismatch triggers a write to Elasticsearch."
        },
        {
          type: 'code',
          text: "const crypto = require('crypto');\n\nfunction fingerprint(record) {\n  return crypto.createHash('sha1').update(JSON.stringify(record)).digest('hex');\n}\n\nfunction needsReindex(record, lastHash) {\n  return fingerprint(record) !== lastHash;\n}"
        },
        {
          type: 'paragraph',
          text: "SHA1 isn't being used here for security — it's a fast, collision-resistant-enough checksum for change detection, which is exactly what this needs. Skipping unchanged records was the single biggest factor behind a 40% improvement in product indexing time."
        },
        { type: 'heading', text: 'Why this combination, not a heavier one' },
        {
          type: 'paragraph',
          text: "It would have been easy to reach for a message queue, a dedicated load balancer, or a full diffing library. None of that was justified here: the workload was uniform enough for round-robin, the process was long-lived enough for a static worker pool, and the change-detection problem was simple enough for a checksum. The best architecture is usually the smallest one that actually matches the shape of the problem."
        }
      ]
    },
    {
      slug: 'docker-and-cicd',
      title: 'Docker and CI/CD: The Boring Infrastructure That Makes Shipping Fast',
      excerpt: 'Why Docker and CI/CD are the first things I set up on every project, and how restructuring a GitLab pipeline cut deployment times by 30%.',
      date: 'June 2021',
      readTime: '6 min read',
      tags: ['Docker', 'CI/CD', 'DevOps'],
      blocks: [
        {
          type: 'paragraph',
          text: "Nobody gets excited about a Dockerfile or a pipeline config. But of everything under \"Scalable Architecture,\" this is the part that quietly decides whether a team ships confidently or dreads every release. Here's how I think about both, and why I set them up early on every project."
        },
        { type: 'heading', text: '"Works on my machine" is a tax, not a joke' },
        {
          type: 'paragraph',
          text: "Environment drift is one of the most expensive, least visible costs on a team: a Node version mismatch, a missing system library, a config file that only exists on one laptop. Docker fixes this by packaging the application together with the exact runtime it needs, so the container that runs on a developer's machine is bit-for-bit the same one that runs in production. That alone eliminates a category of bugs before they exist."
        },
        { type: 'heading', text: 'A Dockerfile that earns its keep' },
        {
          type: 'paragraph',
          text: "The difference between a Dockerfile that works and one that's actually good for a team is usually a multi-stage build: install and compile in one stage, then copy only the finished artifact into a lean runtime image. Smaller images pull faster, deploy faster, and carry less attack surface."
        },
        {
          type: 'code',
          text: 'FROM node:20-alpine AS build\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build\n\nFROM node:20-alpine\nWORKDIR /app\nCOPY --from=build /app/dist ./dist\nCOPY --from=build /app/node_modules ./node_modules\nCMD ["node", "dist/main.js"]'
        },
        { type: 'heading', text: 'CI/CD is where the payoff actually shows up' },
        {
          type: 'paragraph',
          text: "A container is only half the story. The other half is a pipeline that turns a merged pull request into a running deployment without anyone SSH-ing into a server. My pipelines typically run four stages: lint and test, build the image, push it to a registry, then deploy to the target environment — each stage gating the next, so a broken build never reaches production."
        },
        {
          type: 'list',
          items: [
            'Lint and test — fail fast, before anything gets built',
            'Build — produce the versioned, immutable image',
            'Push — publish to the registry with a traceable tag',
            'Deploy — roll out automatically, with a one-click rollback path'
          ]
        },
        {
          type: 'paragraph',
          text: "At Servyia, restructuring the GitLab CI/CD pipeline — smarter caching, parallelized stages, trimming redundant steps — cut deployment times by 30%. That's not a vanity metric; it's the difference between shipping a fix within the hour and shipping it tomorrow."
        },
        { type: 'heading', text: 'What this means when I join a project' },
        {
          type: 'paragraph',
          text: "In practice, it means environment parity from day one, deploys that are boring in the best way, and a team that can ship multiple times a day without holding its breath. If your project's release process still involves a manual checklist or a Slack message that says \"I'm deploying, don't touch anything,\" that's usually the first thing I fix."
        }
      ]
    }
  ],
  fr: [
    {
      slug: 'repr-dev-git-contribution-analysis',
      title: "Construire Repr.dev : transformer l'historique Git en un vrai signal de contribution",
      excerpt: "Pourquoi le simple compte de commits est un mauvais indicateur d'impact, et comment Repr.dev évalue les contributions des développeurs à partir de l'historique Git avec 95 % de précision d'analyse.",
      date: 'Février 2025',
      readTime: '6 min de lecture',
      tags: ['IA', 'Git', 'Python'],
      blocks: [
        {
          type: 'paragraph',
          text: "Repr.dev est né d'un constat simple : le « nombre de lignes de code » et le « nombre de commits » sont de très mauvais indicateurs de la contribution d'un développeur, et pourtant presque tous les outils qui résument l'historique Git s'appuient encore dessus. Construire quelque chose de meilleur signifiait traiter un commit non pas comme un nombre, mais comme un petit faisceau d'indices — et l'évaluer en conséquence. Le résultat atteint 95 % d'accord avec une revue manuelle sur l'échantillon de validation testé."
        },
        { type: 'heading', text: 'Pourquoi le simple compte de commits ment' },
        {
          type: 'paragraph',
          text: "Un correctif de configuration d'une ligne et un refactoring de 400 lignes comptent tous les deux pour « un commit ». Une pull request fusionnée en squash peut cacher deux semaines de travail derrière une seule entrée. Quelqu'un qui reformate un fichier avec un linter peut paraître la personne la plus « productive » de l'équipe pendant une journée. Si vous évaluez la contribution en comptant les commits ou les lignes modifiées, vous optimisez la mauvaise chose — et tout outil construit sur cette base sera soit détourné, soit tout simplement faux."
        },
        { type: 'heading', text: "Des signaux qui corrèlent vraiment avec l'impact" },
        {
          type: 'paragraph',
          text: "La solution a consisté à extraire un ensemble plus large de signaux de chaque commit avant toute évaluation : le nombre de modules distincts touchés, le ratio entre modifications de tests et modifications de code source, la manière dont le changement se regroupe dans le temps par rapport aux autres commits de l'auteur, et si le message de commit reflète une véritable unité de travail plutôt qu'un « wip » ou un « fix ». Aucun de ces signaux n'est fiable seul — ensemble, ils forment un bien meilleur indicateur que le simple nombre de lignes."
        },
        {
          type: 'code',
          text: "def extract_features(commit):\n    stats = commit.stats.total\n    return {\n        \"files_changed\": stats[\"files\"],\n        \"modules_touched\": count_distinct_modules(commit),\n        \"test_ratio\": test_lines(commit) / max(stats[\"lines\"], 1),\n        \"message_quality\": score_commit_message(commit.message),\n    }"
        },
        { type: 'heading', text: "Python pour l'analyse, Next.js pour la mise en récit" },
        {
          type: 'paragraph',
          text: "Le pipeline d'évaluation est en Python : NumPy pour les vecteurs de caractéristiques et les calculs de pondération, SQLAlchemy pour persister chaque commit évalué afin que les chiffres soient reproductibles et auditables plutôt que recalculés à la volée. Le frontend est une préoccupation totalement séparée — un tableau de bord Next.js qui transforme ces scores en une chronologie qu'un humain peut réellement lire, sans jamais avoir besoin de savoir qu'un vecteur de caractéristiques existe."
        },
        {
          type: 'code',
          text: "class Contribution(Base):\n    __tablename__ = \"contributions\"\n\n    id = Column(Integer, primary_key=True)\n    commit_sha = Column(String, unique=True)\n    author = Column(String, index=True)\n    impact_score = Column(Float)\n    computed_at = Column(DateTime, default=datetime.utcnow)"
        },
        {
          type: 'paragraph',
          text: "Garder l'analyse et la présentation dans des couches séparées, reliées uniquement par une table de base de données, signifiait que chaque côté pouvait évoluer indépendamment — le modèle d'évaluation a été ajusté plusieurs fois depuis le lancement sans toucher une seule ligne du tableau de bord."
        },
        { type: 'heading', text: 'Atteindre les 95 %' },
        {
          type: 'paragraph',
          text: "95 % de précision n'est pas un chiffre atteint du premier coup — il est venu en confrontant le modèle à un échantillon de commits revus manuellement, en identifiant où il divergeait du jugement humain, puis en réinjectant ces désaccords dans les caractéristiques utilisées. La plupart des erreurs initiales venaient d'une même cause : traiter tous les types de fichiers de la même façon. Un changement de fichier de configuration ou de lockfile pesait autant qu'une modification de la logique métier centrale — pondérer par type de fichier est ainsi devenu l'un des plus gros gains de précision de tout le projet."
        },
        {
          type: 'paragraph',
          text: "La leçon dépasse cet outil : un système d'IA ne vaut que par les caractéristiques qu'on lui fournit, et le moyen le plus rapide d'améliorer la précision consiste généralement à chercher où vos hypothèses sur les données sont fausses — pas à se tourner vers un modèle plus gros."
        }
      ]
    },
    {
      slug: 'round-robin-sha1-worker-threads',
      title: "Faire évoluer une API de moteur de recherche : Worker Threads, équilibrage round-robin et empreintes SHA1",
      excerpt: "Comment une API de recherche Node.js construite pour Pertimm a tenu plus de 100 000 requêtes par seconde — Worker Threads, équilibrage round-robin et empreintes SHA1 combinés.",
      date: 'Septembre 2024',
      readTime: '7 min de lecture',
      tags: ['Node.js', 'Worker Threads', 'Performance'],
      blocks: [
        {
          type: 'paragraph',
          text: "Sur la plateforme du moteur de recherche Pertimm, l'API Node.js placée devant Elasticsearch devait tenir plus de 100 000 requêtes par seconde pour des clients comme E.Leclerc et Showroomprivé. Y parvenir n'a pas tenu à une seule astuce — mais à trois éléments peu spectaculaires travaillant ensemble : les Worker Threads pour exploiter chaque cœur CPU, un équilibrage round-robin pour les occuper tous équitablement, et des empreintes SHA1 pour arrêter de réindexer des données inchangées."
        },
        { type: 'heading', text: "Le goulot d'étranglement : une seule boucle d'événements, un seul cœur" },
        {
          type: 'paragraph',
          text: "Node.js est mono-thread par défaut, ce qui convient parfaitement aux traitements limités par les I/O, mais constitue un plafond dur pour les traitements limités par le CPU — analyser de gros payloads JSON, noter et reclasser les résultats de recherche, construire le DSL de requête pour Elasticsearch. Sous charge réelle, cette logique de scoring bloquait la boucle d'événements assez longtemps pour ralentir des requêtes sans rapport. La solution n'était pas un serveur plus gros ; c'était d'utiliser les cœurs déjà disponibles."
        },
        { type: 'heading', text: 'Worker Threads : un pool, pas un thread par requête' },
        {
          type: 'paragraph',
          text: "Le module worker_threads de Node permet d'exécuter du JavaScript sur des threads séparés, chacun avec sa propre instance V8, communiquant par passage de messages (ou via SharedArrayBuffer quand il faut éviter la copie). Créer un worker par requête est trop lent — la création d'un thread a un coût réel. À la place, je démarre un pool fixe au boot, dimensionné sur le nombre de cœurs CPU, et je le garde vivant pendant toute la durée de vie du processus."
        },
        {
          type: 'code',
          text: "const { Worker } = require('worker_threads');\nconst os = require('os');\n\nconst POOL_SIZE = os.cpus().length;\nconst pool = Array.from({ length: POOL_SIZE }, () => new Worker('./search-worker.js'));"
        },
        { type: 'heading', text: 'Round-robin : le répartiteur le plus simple qui fonctionne vraiment' },
        {
          type: 'paragraph',
          text: "Avec un pool fixe, la question devient : quel worker reçoit la prochaine requête ? Les requêtes de recherche ont un coût assez uniforme, donc un répartiteur sensible à la charge complète aurait été surdimensionné — un simple index round-robin suffisait à répartir les requêtes équitablement, sans que le répartiteur lui-même ne devienne un goulot d'étranglement."
        },
        {
          type: 'code',
          text: "let cursor = 0;\n\nfunction nextWorker() {\n  const worker = pool[cursor];\n  cursor = (cursor + 1) % pool.length;\n  return worker;\n}\n\nfunction handleQuery(query) {\n  return new Promise((resolve) => {\n    const worker = nextWorker();\n    worker.once('message', resolve);\n    worker.postMessage(query);\n  });\n}"
        },
        {
          type: 'paragraph',
          text: "C'est tout le répartiteur. Pas de load balancer externe, pas d'infrastructure supplémentaire — juste un index qui boucle sur la taille du pool, exactement ce dont a besoin une charge de travail sans état et à coût uniforme."
        },
        { type: 'heading', text: "Empreintes SHA1 : ne pas réindexer ce qui n'a pas changé" },
        {
          type: 'paragraph',
          text: "L'autre moitié de l'histoire de performance ne concernait pas la vitesse des requêtes, mais celle de l'indexation. Les flux produits arrivaient en JSON, et l'approche naïve réindexe chaque enregistrement à chaque exécution. Or, à chaque exécution, la plupart des enregistrements sont inchangés. Je hache chaque enregistrement entrant avec SHA1 et le compare au hash stocké lors de la dernière indexation réussie ; seule une différence déclenche une écriture vers Elasticsearch."
        },
        {
          type: 'code',
          text: "const crypto = require('crypto');\n\nfunction fingerprint(record) {\n  return crypto.createHash('sha1').update(JSON.stringify(record)).digest('hex');\n}\n\nfunction needsReindex(record, lastHash) {\n  return fingerprint(record) !== lastHash;\n}"
        },
        {
          type: 'paragraph',
          text: "SHA1 n'est pas utilisé ici pour la sécurité — c'est une somme de contrôle rapide et suffisamment résistante aux collisions pour de la détection de changement, exactement ce dont on a besoin ici. Ignorer les enregistrements inchangés a été le facteur le plus déterminant dans l'amélioration de 40 % du temps d'indexation des produits."
        },
        { type: 'heading', text: 'Pourquoi cette combinaison, et pas une plus lourde' },
        {
          type: 'paragraph',
          text: "Il aurait été facile de se tourner vers une file de messages, un load balancer dédié, ou une bibliothèque de diff complète. Rien de tout cela n'était justifié ici : la charge était assez uniforme pour du round-robin, le processus vivait assez longtemps pour un pool de workers statique, et le problème de détection de changement était assez simple pour une somme de contrôle. La meilleure architecture est généralement la plus petite qui corresponde réellement à la forme du problème."
        }
      ]
    },
    {
      slug: 'docker-and-cicd',
      title: "Docker et CI/CD : l'infrastructure ennuyeuse qui permet de livrer vite",
      excerpt: "Pourquoi Docker et CI/CD sont les premières choses que je mets en place sur chaque projet, et comment la restructuration d'un pipeline GitLab a réduit les temps de déploiement de 30 %.",
      date: 'Juin 2021',
      readTime: '6 min de lecture',
      tags: ['Docker', 'CI/CD', 'DevOps'],
      blocks: [
        {
          type: 'paragraph',
          text: "Personne ne s'enthousiasme pour un Dockerfile ou une configuration de pipeline. Mais dans tout ce qui relève de l'« Architecture Scalable », c'est la partie qui décide silencieusement si une équipe livre en confiance ou redoute chaque mise en production. Voici comment j'aborde les deux, et pourquoi je les mets en place tôt sur chaque projet."
        },
        { type: 'heading', text: '« Ça marche chez moi » est un coût, pas une blague' },
        {
          type: 'paragraph',
          text: "La dérive d'environnement est l'un des coûts les plus élevés et les moins visibles pour une équipe : une version de Node différente, une bibliothèque système manquante, un fichier de configuration qui n'existe que sur un seul ordinateur. Docker règle ce problème en empaquetant l'application avec l'environnement d'exécution exact dont elle a besoin, si bien que le conteneur qui tourne sur la machine d'un développeur est rigoureusement identique à celui qui tourne en production. Cela élimine à lui seul toute une catégorie de bugs avant même qu'ils n'existent."
        },
        { type: 'heading', text: 'Un Dockerfile qui mérite sa place' },
        {
          type: 'paragraph',
          text: "La différence entre un Dockerfile qui fonctionne et un Dockerfile réellement bon pour une équipe tient généralement à un build multi-étapes : installer et compiler dans une étape, puis ne copier que l'artefact final dans une image d'exécution allégée. Des images plus petites se téléchargent plus vite, se déploient plus vite, et exposent une surface d'attaque plus réduite."
        },
        {
          type: 'code',
          text: 'FROM node:20-alpine AS build\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build\n\nFROM node:20-alpine\nWORKDIR /app\nCOPY --from=build /app/dist ./dist\nCOPY --from=build /app/node_modules ./node_modules\nCMD ["node", "dist/main.js"]'
        },
        { type: 'heading', text: 'Le CI/CD, là où le bénéfice se voit vraiment' },
        {
          type: 'paragraph',
          text: "Un conteneur n'est que la moitié de l'histoire. L'autre moitié est un pipeline qui transforme une pull request fusionnée en déploiement actif, sans que personne n'ait besoin de se connecter en SSH à un serveur. Mes pipelines exécutent généralement quatre étapes : lint et tests, build de l'image, push vers un registre, puis déploiement vers l'environnement cible — chaque étape conditionnant la suivante, afin qu'un build cassé n'atteigne jamais la production."
        },
        {
          type: 'list',
          items: [
            'Lint et tests — échouer vite, avant même de construire quoi que ce soit',
            "Build — produire l'image versionnée et immuable",
            'Push — publier vers le registre avec un tag traçable',
            'Deploy — déployer automatiquement, avec un rollback possible en un clic'
          ]
        },
        {
          type: 'paragraph',
          text: "Chez Servyia, la restructuration du pipeline CI/CD GitLab — un cache plus intelligent, des étapes parallélisées, la suppression des étapes redondantes — a réduit les temps de déploiement de 30 %. Ce n'est pas une métrique de façade ; c'est la différence entre livrer un correctif dans l'heure ou le livrer le lendemain."
        },
        { type: 'heading', text: 'Ce que cela signifie quand je rejoins un projet' },
        {
          type: 'paragraph',
          text: "En pratique, cela veut dire une parité d'environnement dès le premier jour, des déploiements ennuyeux dans le bon sens du terme, et une équipe capable de livrer plusieurs fois par jour sans retenir son souffle. Si le processus de mise en production de votre projet repose encore sur une checklist manuelle ou un message Slack du genre « je déploie, ne touchez à rien », c'est généralement la première chose que je corrige."
        }
      ]
    }
  ]
};
