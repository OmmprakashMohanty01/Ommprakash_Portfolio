export const projects = [
  // ─── 01. MULTI-CAM SPORTSENSE ──────────────────────────────────
  {
    id: 'multi-cam-sportsense',
    title: 'Multi-Cam SportSense',
    tagline: 'Computer Vision & Cross-Camera Re-Identification',
    category: 'Computer Vision // Spatial AI',
    track: 'AI / DEV CORE',
    role: 'Computer Vision Engineer',
    colSpan: 'md:col-span-8',
    stack: ['YOLOv8', 'OpenCV', 'PyTorch', 'FastAPI', 'Python', 'Hungarian Algorithm'],
    tags: ['YOLOv8', 'OpenCV', 'PyTorch', 'FastAPI', 'Python'],
    video: '/media/sportsense/broadcast.mp4',
    poster: '/media/sportsense/broadcast_poster.webp',
    media: {
      type: 'video',
      assets: ['/media/sportsense/broadcast.mp4', '/media/sportsense/tacticam.mp4'],
      alt: 'Dual-camera synchronization showing broadcast and tactical views'
    },
    links: {
      github: 'https://github.com/OmmprakashMohanty01',
      live: null
    },
    content: {
      architecture: `The core challenge was maintaining player identity across completely different camera angles (Broadcast vs. Tactical) without persistent optical flow.

Instead of relying purely on spatial tracking, the architecture leverages YOLOv8 for initial bounding box detection, immediately routing the cropped pedestrian images into a feature extraction pipeline. We utilize an HSV 512-D Color Histogram to create a distinct visual signature for each player, forming the basis of a Cosine Similarity Matrix to evaluate identity probabilities across camera feeds.`,
      pipeline: `1. **Spatial Detection:** YOLOv8 extracts player bounding boxes at 60fps across synchronous camera streams.
2. **Feature Extraction:** Bounding boxes are processed into 512-D vectors representing color distribution and spatial features.
3. **Global Assignment:** A Bipartite Identity Matching system driven by the Hungarian Algorithm resolves the distance matrix globally in O(V³) time.
4. **State Management:** FastAPI serves the resolved tracking coordinates to the frontend client in real-time.`,
      decisions: `Early iterations struggled with occlusion and camera handoffs. Simply matching the closest bounding boxes led to cascading identity swaps (ID switches).

Implementing the Hungarian Algorithm was the critical pivot. By treating cross-camera tracking as a global assignment problem rather than a greedy local choice, the system inherently resolves tracking collisions, dropping the ID switch rate to a near-zero margin even during dense player clustering.`
    }
  },

  // ─── 02. ENTERPRISE KNOWLEDGE ENGINE ──────────────────────────
  {
    id: 'enterprise-knowledge-engine',
    title: 'Enterprise Knowledge Engine',
    tagline: 'Business Retrieval-Augmented Generation (RAG) Bot',
    category: 'Generative AI // Retrieval',
    track: 'AI / DEV CORE',
    role: 'AI Systems Architect',
    colSpan: 'md:col-span-4',
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'Qdrant', 'React.js', 'LLM APIs'],
    tags: ['RAG', 'LLMs', 'Vector DBs', 'FastAPI', 'Qdrant'],
    media: {
      type: 'diagram',
      assets: [],
      alt: 'System diagram mapping vector chunking to semantic lookup'
    },
    links: {
      github: 'https://github.com/OmmprakashMohanty01',
      live: null
    },
    content: {
      architecture: `Designed to eliminate enterprise data silos, this Knowledge Engine bypasses standard keyword search in favor of a Retrieval-Augmented Generation (RAG) architecture.

The system relies on a hybrid dense-sparse retrieval model. Documents are ingested, intelligently chunked to preserve context, and vectorized. When a query hits the FastAPI backend, it simultaneously executes a dense semantic search (for contextual intent) and a sparse lexical search (for exact keyword/acronym matching), merging the results via reciprocal rank fusion.`,
      pipeline: `1. **Vector Chunking:** Raw documents are parsed and split using overlap-aware text splitters (512 tokens with 64-token overlap) to prevent context loss at chunk boundaries.
2. **Semantic Lookup:** User queries are embedded and mapped against the vector database, achieving sub-200ms retrieval times.
3. **Guardrail Evaluation:** Retrieved context is scored against strict embedding distance thresholds to filter out low-confidence matches.
4. **Synthesis:** The LLM generates a response strictly bounded by the retrieved context, citing its sources.`,
      decisions: `The biggest risk with enterprise LLMs is hallucination. To mitigate this, I engineered strict embedding distance thresholds. If the semantic lookup fails to return documents within the confidence threshold, the system is programmed to definitively state "Insufficient context available" rather than attempting to guess.

This zero-trust approach to generation ensures the bot functions as a deterministic retrieval engine rather than a creative writing tool, making it viable for strict business environments.`
    }
  },

  // ─── 03. PERSONAL BRANDING ENGINE ─────────────────────────────
  {
    id: 'personal-branding-engine',
    title: 'Personal-Branding-Engine',
    tagline: 'Automated Social Media Orchestration & Publishing Pipeline',
    category: 'Cloud Infrastructure // Full-Stack',
    track: 'AI / DEV CORE',
    role: 'Full Stack Engineer',
    colSpan: 'md:col-span-12',
    stack: ['Python', 'Docker', 'Render', 'Supabase', 'REST APIs', 'AES-256'],
    tags: ['Supabase', 'Docker', 'Render', 'React', 'Tailwind', 'AES-256'],
    media: {
      type: 'code-block',
      assets: [],
      alt: 'Terminal view of automated workflow triggers and API endpoints executing'
    },
    links: {
      github: 'https://github.com/OmmprakashMohanty01',
      live: null
    },
    content: {
      architecture: `A fully automated, stateless orchestration engine designed to handle technical content publishing without manual intervention.

Deployed on Render using Docker containers, the architecture isolates the execution environment. To manage sensitive platform credentials, the system utilizes AES-256 Fernet encryption at rest within Supabase. Incoming triggers rely on HMAC constant-time webhook verification, ensuring the endpoints cannot be spoofed or subjected to timing attacks.`,
      pipeline: `1. **Trigger & Verification:** A cron job or manual webhook fires, passing through HMAC validation to authorize the run.
2. **Credential Decryption:** The engine retrieves and decrypts the necessary API keys from the secure vault in memory dynamically during dispatch.
3. **Payload Formatting:** The scheduled technical content is parsed and formatted specifically for the target platform's API specifications.
4. **Distributed Dispatch:** A distributed cron queue executes the cross-platform dispatch, logging the HTTP responses.`,
      decisions: `The most significant engineering hurdle was preventing duplicate cross-platform dispatches during cold starts or transient network failures.

To solve this, I implemented a strict distributed cron queue with idempotent dispatch keys. If a process drops midway, the engine checks the transaction log upon reboot. If an execution ID already exists in the successful dispatch table, it elegantly skips, guaranteeing zero double-posting.`
    }
  },

  // ─── 04. ZERO ONE: CODEBREAK ──────────────────────────────────
  {
    id: 'zero-one',
    title: 'ZERO ONE: CODEBREAK',
    tagline: 'Cyber Warfare & Military Tech Visual Deconstruction',
    category: 'Cyber & Defense // Motion',
    track: 'CREATIVE CORE',
    role: 'Creative Technologist & Motion Designer',
    colSpan: 'md:col-span-4',
    poster: '/media/zero-one/logo.jpeg',
    stack: ['After Effects', 'Cinema 4D', 'Illustrator', 'Premiere Pro', 'Foley Audio'],
    tags: ['Tech/Military Codebreak', 'Motion Design', 'After Effects', 'Cinema 4D'],
    media: {
      type: 'video',
      assets: ['/media/zero-one/logo.jpeg'],
      alt: 'ZERO ONE episodic cyber breakdown motion assets'
    },
    links: {
      github: null,
      live: null
    },
    content: {
      architecture: `ZERO ONE is an episodic visual documentary channel focused on breaking down high-stakes cyber operations, cryptographic warfare, and defense tech through fast-paced, high-fidelity motion graphics.

The visual architecture centers on creating procedural HUD schematics, vector radar grids, and 3D coordinate spaces that visually represent abstract computing phenomena like zero-day exploits, hardware side-channel attacks, and satellite orbital surveillance.`,
      pipeline: `1. **Intelligence & Whitepaper Dig:** Synthesizing complex CVE security advisories and historical declassified archives into storyboard arcs.
2. **Procedural HUD Schematics:** Designing bespoke vector wireframes, military UI overlays, and code displays in Illustrator and After Effects.
3. **3D Coordinate Staging:** Modeling hardware chip architectures and signal trajectories inside Cinema 4D.
4. **Tactile Sound Design:** Multi-layering spatial sub-bass, relay switches, and mechanical keyclicks to drive viewer immersion and retention.`,
      decisions: `Procedural vector graphics and custom kinetic HUDs were chosen over generic stock footage. 

While requiring 3x the production timeline per sequence, this bespoke treatment elevated viewer retention to an industry-leading 64.8% and established an unmistakable visual trademark.`
    }
  },

  // ─── 05. CRAZY_CAM ───────────────────────────────────────────
  {
    id: 'crazy-cam',
    title: 'Crazy_Cam',
    tagline: 'Deep-Archive Investigative Video Essays & Restoration',
    category: 'Documentary // Deep Archive',
    track: 'CREATIVE CORE',
    role: 'Lead Storyteller & Editor',
    colSpan: 'md:col-span-4',
    stack: ['Premiere Pro', 'Photoshop', 'Topaz Video AI', 'DaVinci Resolve'],
    tags: ['Mystery/History Essays', 'Visual Research', 'Premiere Pro', 'DaVinci'],
    media: {
      type: 'video',
      assets: [],
      alt: 'Investigative historical narrative documentary timeline'
    },
    links: {
      github: null,
      live: null
    },
    content: {
      architecture: `Deep-archive investigative essays exploring historical enigmas, lost telemetry, and unresolved technological anomalies through archival restoration and cinematic pacing.

The technical workflow involves ingesting microfiche, patent documents, and century-old historical photos, passing them through neural upscaling models, and separating them into multi-plane parallax depth maps for cinematic camera passes.`,
      pipeline: `1. **Archive Recovery & AI Upscaling:** Restoring and 4K upscaling historical photos and patent diagrams using Topaz AI and custom neural filters.
2. **2.5D Parallax Projection:** Separating historical stills into foreground/background planes in Photoshop with camera depth-of-field movement.
3. **Narrative Pacing & Tension Curves:** Structuring scripts around investigative mystery beats with customized orchestral soundbeds.
4. **Final Mastering:** Color grading in DaVinci Resolve to establish a consistent, dark archival tone.`,
      decisions: `Transforming static historical still photos into 2.5D parallax projection shots was the crucial creative pivot. 

Viewers drop off rapidly during static slideshows; introducing spatial camera sweeps and dynamic lighting across archival stills increased video completion rates to 72.4%.`
    }
  },

  // ─── 06. DEFENSE & GEO-POLITICS ──────────────────────────────
  {
    id: 'defense-geopolitics',
    title: 'Defense & Geo-Politics',
    tagline: 'Strategic Geopolitics, Supply Chains & Spatial Mapping',
    category: 'Geopolitics // Strategic Analysis',
    track: 'CREATIVE CORE',
    role: 'Editorial Director',
    colSpan: 'md:col-span-4',
    stack: ['QGIS', 'GEOlayers', 'After Effects', 'Premiere Pro', 'Illustrator'],
    tags: ['Editorial Analysis', 'Cinematic Editing', 'Geo-Spatial Motion', 'QGIS'],
    media: {
      type: 'video',
      assets: [],
      alt: 'Geospatial maritime chokepoints and radar coverage visualization'
    },
    links: {
      github: null,
      live: null
    },
    content: {
      architecture: `High-level strategic analysis decoding global supply chain choke points, semiconductor warfare, and military logistics through spatial mapping and economic models.

The system pulls elevation data from digital elevation models (DEM) and open geospatial data sources (QGIS), mapping strategic choke points (Strait of Malacca, Bab-el-Mandeb, Taiwan Strait) with accurate topographic relief.`,
      pipeline: `1. **Geospatial Extraction:** Sourcing vector boundary files, maritime traffic density heatmaps, and radar coverage circles.
2. **Topographic Shading:** Projecting high-resolution satellite imagery over 3D terrain meshes using GEOlayers and After Effects.
3. **Intelligence Briefing Format:** Formatting script segments into structured intelligence briefings (Situation, Strategic Assessment, Global Implication).
4. **Editorial Assembly:** Rhythmic editing matching tactical map animations to strategic narration.`,
      decisions: `Using verified geospatial coordinates and true digital elevation models instead of stylized 2D flat maps established authority with international defense analysts, significantly outperforming conventional editorial formats.`
    }
  }
];
