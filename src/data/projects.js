export const projects = [
  {
    id: 'multi-cam-sportsense',
    title: 'Multi-Cam SportSense',
    category: 'Engineering',
    shortDescription: 'AI Player Tracking with YOLOv8 & OpenCV solving identity switching in sports analytics.',
    role: 'Lead AI Engineer',
    colSpan: 'md:col-span-7',
    image: '/media/sportsense/broadcast_poster.webp',
    links: {
      github: 'https://github.com/OmmprakashMohanty01',
      live: null
    },
    // Case Study Content
    content: {
      status: 'PARTIALLY_FOUND',
      overview: 'A computer vision pipeline designed to solve cross-camera player identity mapping using fine-tuned object detection and feature extraction.',
      problem: {
        description: 'Mapping individual player identities consistently across two different video feeds (broadcast and tactical camera angles) of the same match.',
        constraint: 'CONTENT_PENDING'
      },
      approach: 'Leveraging YOLOv8 for detection and HSV color histograms for feature extraction, followed by bipartite matching using the Hungarian Algorithm to assign consistent IDs across camera views.',
      architecture: {
        description: 'A three-stage pipeline: Detection, Feature Extraction, and Re-Identification.',
        pipeline: [
          { stage: 'INPUT', details: 'Two synchronized video feeds (broadcast.mp4 and tacticam.mp4).' },
          { stage: 'DETECTION', details: 'Custom-trained YOLOv8 model extracts bounding boxes and confidence scores.' },
          { stage: 'FEATURE EXTRACTION', details: 'HSV color histograms extracted from cropped regions, normalized, and flattened to a 512-dimensional vector.' },
          { stage: 'RE-IDENTIFICATION', details: 'Cosine similarity matrix computed between players from both feeds; Hungarian Algorithm applies 1-to-1 mapping.' },
          { stage: 'OUTPUT', details: 'Detections and final player matches exported to structured text and CSV.' }
        ]
      },
      technologies: ['YOLOv8', 'OpenCV', 'Python', 'Hungarian Algorithm'],
      engineeringDecisions: [
        {
          decision: 'Hungarian Algorithm for Matching',
          why: 'Ensures strict one-to-one global optimal assignment between the two camera views rather than greedy matching.'
        }
      ],
      challenges: [
        {
          challenge: 'CONTENT_PENDING'
        }
      ],
      results: [
        {
          metric: 'NO VERIFIED NUMERICAL RESULTS FOUND',
          value: 'CONTENT_PENDING'
        }
      ],
      media: {
        hero: '/media/sportsense/broadcast_poster.webp',
        architecture: 'CONTENT_PENDING',
        demoVideo: 'CONTENT_PENDING'
      }
    }
  },
  {
    id: 'personal-branding-engine',
    title: 'Personal-Branding-Engine',
    category: 'Engineering',
    shortDescription: 'Full-stack cloud deployment engineered via Supabase, Docker, and Render.',
    role: 'Full Stack Developer',
    colSpan: 'md:col-span-5',
    image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=1200&auto=format&fit=crop',
    links: {
      github: 'https://github.com/OmmprakashMohanty01',
      live: null
    },
    content: {
      technologies: ['FastAPI', 'Next.js', 'React', 'SQLAlchemy', 'Postgres', 'Tailwind'],
      overview: 'A database-backed orchestration system designed to automate, schedule, and dispatch brand content across platforms. It eliminates double-publishing and handles complex scheduling workflows through an external serverless cron heartbeat.',
      problem: {
        description: 'Manual content workflows introduce scaling bottlenecks, scheduling complexity, and severe duplicate publishing risks when managing cross-platform content at volume.',
        constraint: 'Traditional persistent polling threads are expensive to host and difficult to scale to zero.',
        systemResponse: 'A stateless webhooks-based architecture that relies on an external serverless cron to ping the engine, waking it up to perform idempotent dispatch cycles.'
      },
      architecture: [
        { id: 'trigger', label: 'Trigger', subLabel: 'Serverless Cron' },
        { id: 'scheduler', label: 'Scheduler', subLabel: 'Queue Manager' },
        { id: 'dispatch', label: 'Dispatch', subLabel: 'Lock Mechanism' },
        { id: 'idempotency', label: 'Idempotency', subLabel: 'Key Check' },
        { id: 'verification', label: 'Verification', subLabel: 'HMAC Security' },
        { id: 'publishing', label: 'Publishing', subLabel: 'LinkedIn API' }
      ],
      scheduling: [
        { id: 'schedule', label: 'Schedule', subLabel: 'UTC Normalized' },
        { id: 'dispatch', label: 'Dispatch', subLabel: 'Webhook Ping' },
        { id: 'state-check', label: 'State Check', subLabel: 'scheduled_for <= NOW' },
        { id: 'process', label: 'Process', subLabel: 'Active Lock' }
      ],
      idempotency: [
        { id: 'request', label: 'Request', subLabel: 'daily-automation-YYYY-MM-DD' },
        { id: 'key', label: 'Idempotency Key', subLabel: 'Extracted' },
        { id: 'check', label: 'Database Check', subLabel: 'Exists?' },
        { id: 'process', label: 'Process / Reject', subLabel: 'Prevent Duplicate' }
      ],
      security: [
        { id: 'webhook', label: 'Webhook', subLabel: 'X-Cron-Secret' },
        { id: 'signature', label: 'Signature', subLabel: 'Constant-time' },
        { id: 'verification', label: 'Verification', subLabel: 'AES-256-GCM' },
        { id: 'accept', label: 'Accept / Reject', subLabel: 'Authorized' }
      ],
      publishing: [
        { id: 'draft', label: 'Draft', subLabel: 'Status: APPROVED' },
        { id: 'token', label: 'Token', subLabel: 'OAuth2 Decrypted' },
        { id: 'payload', label: 'Payload', subLabel: 'LinkedIn /v2/posts' },
        { id: 'fallback', label: 'Fallback', subLabel: 'Image Fail -> Text Only' },
        { id: 'complete', label: 'Complete', subLabel: 'Status: PUBLISHED' }
      ],
      reliability: [
        { id: 'process', label: 'Process', subLabel: 'API Call' },
        { id: 'failure', label: 'Failure', subLabel: 'HTTP 401 / 429' },
        { id: 'recovery', label: 'Recovery / Retry', subLabel: 'Status: FAILED_PUBLISHING' }
      ],
      engineeringDecisions: [
        {
          decision: 'Stateless Webhooks over Persistent Threads',
          why: 'Allows the system to run on scale-to-zero serverless backends or minimal footprint deployments.',
          tradeOff: 'Relies on an external cron-job.org service rather than internal event loops.'
        },
        {
          decision: 'Immediate Database Lock (scheduled_for = None)',
          why: 'Prevents concurrent cron requests from fetching the same draft, avoiding double-publishing.',
          tradeOff: 'Requires strict transaction ordering and commit guarantees before executing external API calls.'
        },
        {
          decision: 'Fail-Safe Non-Blocking Image Generation',
          why: 'Guarantees that a transient failure in image generation or upload does not crash the entire transaction.',
          tradeOff: 'Drafts will occasionally publish as text-only rather than failing entirely and awaiting manual retry.'
        }
      ],
      limitations: [
        { metric: 'Performance Analytics', value: 'CONTENT_PENDING' },
        { metric: 'Live User Dashboard', value: 'CONTENT_PENDING' },
        { metric: 'Production Throughput Metrics', value: 'CONTENT_PENDING' }
      ]
    }
  },
  {
    id: 'zero-one',
    title: 'ZERO ONE',
    category: 'Storytelling',
    shortDescription: 'Tech & Military Explainer channel featuring high-end motion graphics and visual motion art.',
    role: 'Motion Designer & Creator',
    colSpan: 'md:col-span-12',
    image: '/media/zero-one/logo.jpeg',
    isBentoOnly: true,
    links: {
      github: null,
      live: null
    },
    content: null
  }
];
