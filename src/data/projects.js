export const projects = [
  {
    id: 'multi-cam-sportsense',
    title: 'Multi-Cam SportSense',
    category: 'Engineering',
    shortDescription: 'AI Player Tracking with YOLOv8 & OpenCV solving identity switching in sports analytics.',
    role: 'Lead AI Engineer',
    colSpan: 'md:col-span-7',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop',
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
          decision: 'HSV Color Histograms for Features',
          why: 'CONTENT_PENDING',
          tradeOff: 'CONTENT_PENDING',
          result: 'CONTENT_PENDING'
        },
        {
          decision: 'Hungarian Algorithm for Matching',
          why: 'Ensures strict one-to-one global optimal assignment between the two camera views rather than greedy matching.',
          tradeOff: 'CONTENT_PENDING',
          result: 'CONTENT_PENDING'
        }
      ],
      challenges: [
        {
          challenge: 'CONTENT_PENDING',
          impact: 'CONTENT_PENDING',
          resolution: 'CONTENT_PENDING'
        }
      ],
      results: [
        {
          metric: 'NO VERIFIED NUMERICAL RESULTS FOUND',
          value: 'CONTENT_PENDING'
        }
      ],
      media: {
        hero: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop',
        architecture: 'CONTENT_PENDING',
        gallery: [],
        demoVideo: 'CONTENT_PENDING'
      },
      reflection: {
        successes: 'CONTENT_PENDING',
        failures: 'CONTENT_PENDING',
        futureImprovements: 'CONTENT_PENDING'
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
    content: null // Not a featured deep-dive
  },
  {
    id: 'zero-one',
    title: 'ZERO ONE',
    category: 'Storytelling',
    shortDescription: 'Tech & Military Explainer channel featuring high-end motion graphics and visual motion art.',
    role: 'Motion Designer & Creator',
    colSpan: 'md:col-span-5',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop',
    hoverVideoPlaceholder: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop',
    links: {
      github: null,
      live: '#'
    },
    content: null
  },
  {
    id: 'crazy-cam',
    title: 'Crazy_Cam',
    category: 'Storytelling',
    shortDescription: 'Mystery & History Documentaries driving high retention through deep editing and scriptwriting.',
    role: 'Scriptwriter & Editor',
    colSpan: 'md:col-span-7',
    image: 'https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=1600&auto=format&fit=crop',
    links: {
      github: null,
      live: '#'
    },
    content: null
  }
];
