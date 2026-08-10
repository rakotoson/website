export const posts = [
  {
    slug: 'repr-dev-git-contribution-analysis',
    title: "Building Repr.dev: Turning Git History Into a Real Signal of Contribution",
    excerpt: "Why raw commit counts are a bad proxy for impact, and how Repr.dev scores developer contributions from Git history with 95% analysis accuracy.",
    date: 'February 2025',
    readTime: '6 min read',
    tags: ['AI', 'Git', 'Python'],
    blocks: [
      {
        type: 'paragraph',
        text: "Repr.dev started from a simple complaint: \"lines of code\" and \"number of commits\" are terrible ways to judge a developer's contribution, but almost every tool that tries to summarize Git history still leans on them. Building something better meant treating a commit not as a number, but as a small bundle of evidence — and scoring it accordingly. The result reaches 95% agreement with manual review on the validation set we tested against."
      },
      {
        type: 'heading',
        text: 'Why raw commit counts lie'
      },
      {
        type: 'paragraph',
        text: "A one-line config fix and a 400-line refactor both count as \"a commit.\" A single squash-merged pull request can hide two weeks of work behind one entry. Someone reformatting a file with a linter can look like the most \"productive\" person on the team for a day. If you score contribution by counting commits or diff lines, you're optimizing for the wrong thing — and any tool built on that foundation will be gamed or simply wrong."
      },
      {
        type: 'heading',
        text: 'Features that actually correlate with impact'
      },
      {
        type: 'paragraph',
        text: "The fix was to pull a wider set of signals out of each commit before scoring anything: how many distinct modules it touched, the ratio of test changes to source changes, how the change clusters in time relative to the author's other commits, and whether the commit message reflects a real unit of work rather than \"wip\" or \"fix.\" None of these alone is reliable — together, they're a much better proxy than line count."
      },
      {
        type: 'code',
        text: "def extract_features(commit):\n    stats = commit.stats.total\n    return {\n        \"files_changed\": stats[\"files\"],\n        \"modules_touched\": count_distinct_modules(commit),\n        \"test_ratio\": test_lines(commit) / max(stats[\"lines\"], 1),\n        \"message_quality\": score_commit_message(commit.message),\n    }"
      },
      {
        type: 'heading',
        text: 'Python for the analysis, Next.js for the story'
      },
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
      {
        type: 'heading',
        text: 'Getting to 95%'
      },
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
      {
        type: 'heading',
        text: 'The bottleneck: one event loop, one core'
      },
      {
        type: 'paragraph',
        text: "Node.js is single-threaded by default, which is fine for I/O-bound work but a hard ceiling for CPU-bound work — parsing large JSON payloads, scoring and re-ranking search results, building query DSL for Elasticsearch. Under real load, that scoring logic was blocking the event loop long enough to stall unrelated requests. The fix wasn't a bigger server; it was using the cores already available."
      },
      {
        type: 'heading',
        text: 'Worker Threads: a pool, not a thread-per-request'
      },
      {
        type: 'paragraph',
        text: "Node's worker_threads module lets you run JavaScript on separate threads with their own V8 instance, communicating via message passing (or SharedArrayBuffer when you need to avoid copying). Spawning a worker per request is too slow — thread creation has real overhead. Instead, I start a fixed pool at boot, sized to the CPU count, and keep it alive for the life of the process."
      },
      {
        type: 'code',
        text: "const { Worker } = require('worker_threads');\nconst os = require('os');\n\nconst POOL_SIZE = os.cpus().length;\nconst pool = Array.from({ length: POOL_SIZE }, () => new Worker('./search-worker.js'));"
      },
      {
        type: 'heading',
        text: 'Round-robin: the simplest balancer that actually works'
      },
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
      {
        type: 'heading',
        text: 'SHA1 fingerprinting: don\'t index what hasn\'t changed'
      },
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
      {
        type: 'heading',
        text: 'Why this combination, not a heavier one'
      },
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
      {
        type: 'heading',
        text: '"Works on my machine" is a tax, not a joke'
      },
      {
        type: 'paragraph',
        text: "Environment drift is one of the most expensive, least visible costs on a team: a Node version mismatch, a missing system library, a config file that only exists on one laptop. Docker fixes this by packaging the application together with the exact runtime it needs, so the container that runs on a developer's machine is bit-for-bit the same one that runs in production. That alone eliminates a category of bugs before they exist."
      },
      {
        type: 'heading',
        text: 'A Dockerfile that earns its keep'
      },
      {
        type: 'paragraph',
        text: "The difference between a Dockerfile that works and one that's actually good for a team is usually a multi-stage build: install and compile in one stage, then copy only the finished artifact into a lean runtime image. Smaller images pull faster, deploy faster, and carry less attack surface."
      },
      {
        type: 'code',
        text: 'FROM node:20-alpine AS build\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build\n\nFROM node:20-alpine\nWORKDIR /app\nCOPY --from=build /app/dist ./dist\nCOPY --from=build /app/node_modules ./node_modules\nCMD ["node", "dist/main.js"]'
      },
      {
        type: 'heading',
        text: 'CI/CD is where the payoff actually shows up'
      },
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
      {
        type: 'heading',
        text: 'What this means when I join a project'
      },
      {
        type: 'paragraph',
        text: "In practice, it means environment parity from day one, deploys that are boring in the best way, and a team that can ship multiple times a day without holding its breath. If your project's release process still involves a manual checklist or a Slack message that says \"I'm deploying, don't touch anything,\" that's usually the first thing I fix."
      }
    ]
  }
];
