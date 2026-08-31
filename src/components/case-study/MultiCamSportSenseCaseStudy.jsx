import { motion } from 'framer-motion';
import CaseStudyHero from './CaseStudyHero';
import CaseStudySection from './CaseStudySection';
import ArchitectureFlow from './ArchitectureFlow';
import MediaSlot from './MediaSlot';
import DecisionBlock from './DecisionBlock';
import PendingEvidence from './PendingEvidence';

export default function MultiCamSportSenseCaseStudy({ project }) {
  const { content } = project;

  if (!content) return null;

  return (
    <div className="w-full bg-[#050505] min-h-screen">
      
      <CaseStudyHero project={project} />

      <div className="container mx-auto px-6 max-w-4xl pb-32">
        
        {/* SECTION 02: THE PROBLEM */}
        <CaseStudySection title="The Problem">
          <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed">
            {content.problem?.description}
          </p>
          <div className="mt-8 p-6 bg-white/[0.02] border border-white/5 rounded-xl">
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">Key Constraint</h4>
            <p className={`text-slate-300 font-light ${content.problem?.constraint === 'CONTENT_PENDING' ? 'text-amber-500/80 font-mono text-sm uppercase' : ''}`}>
              {content.problem?.constraint}
            </p>
          </div>
        </CaseStudySection>

        {/* SECTION 03: SYSTEM OVERVIEW */}
        <CaseStudySection title="System Overview">
          <p className="text-xl text-slate-300 font-light leading-relaxed mb-12">
            {content.architecture?.description}
          </p>
          <ArchitectureFlow pipeline={content.architecture?.pipeline} />
        </CaseStudySection>

        {/* SECTION 04: DETECTION */}
        <CaseStudySection title="Detection (YOLOv8)">
          <p className="text-xl text-slate-300 font-light leading-relaxed mb-12">
            The first stage relies on a custom-trained YOLOv8 model to accurately detect and extract bounding boxes for players and the ball across both camera feeds.
          </p>
          <MediaSlot 
            source="MISSING"
            pendingLabel="Detection Output"
            pendingDescription="Awaiting YOLOv8 bounding box annotated frames from the source repository."
          />
        </CaseStudySection>

        {/* SECTION 05: REPRESENTATION */}
        <CaseStudySection title="Feature Representation">
          <p className="text-xl text-slate-300 font-light leading-relaxed mb-12">
            Once isolated, each player is represented mathematically using HSV color histograms, compressed into a flattened 512-dimensional vector.
          </p>
          <MediaSlot 
            source="MISSING"
            pendingLabel="HSV Histogram Visualization"
            pendingDescription="Awaiting visualization of the extracted color feature vectors."
          />
        </CaseStudySection>

        {/* SECTION 06: SIMILARITY */}
        <CaseStudySection title="Similarity Scoring">
          <p className="text-xl text-slate-300 font-light leading-relaxed mb-12">
            A Cosine Similarity matrix is constructed to compute the exact distance between the 512-dimensional feature vectors of players from the Broadcast feed versus the Tactical feed.
          </p>
          {/* Conceptual Flow Visualization */}
          <div className="w-full aspect-video border border-white/10 bg-black/40 rounded-xl overflow-hidden flex flex-col items-center justify-center p-8 relative">
             <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,243,255,0.05)_0%,transparent_70%)]"></div>
             <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="flex items-center gap-4 md:gap-12"
             >
                <div className="text-center">
                  <div className="w-16 h-16 border border-white/20 rounded-full flex items-center justify-center mb-2 mx-auto bg-white/5">
                    <span className="font-mono text-sm text-slate-300">A</span>
                  </div>
                  <span className="text-xs font-mono text-slate-500 tracking-widest uppercase">Broadcast</span>
                </div>
                <div className="h-px w-12 md:w-32 bg-gradient-to-r from-transparent via-[#00f3ff]/50 to-transparent relative">
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black px-2 text-[10px] font-mono text-[#00f3ff] uppercase tracking-widest">
                     Cosine Distance
                   </div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 border border-dashed border-white/30 rounded-full flex items-center justify-center mb-2 mx-auto bg-transparent">
                    <span className="font-mono text-sm text-slate-400">?</span>
                  </div>
                  <span className="text-xs font-mono text-slate-500 tracking-widest uppercase">Candidates</span>
                </div>
             </motion.div>
             <p className="absolute bottom-6 text-xs font-mono text-slate-600 uppercase tracking-widest">Conceptual System Flow</p>
          </div>
        </CaseStudySection>

        {/* SECTION 07: ASSIGNMENT */}
        <CaseStudySection title="Optimal Assignment">
          <p className="text-xl text-slate-300 font-light leading-relaxed mb-12">
            To prevent greedy matching collisions, the Hungarian Algorithm resolves the similarity matrix into a globally optimal 1-to-1 identity assignment.
          </p>
          <MediaSlot 
            source="MISSING"
            pendingLabel="Matching Architecture"
            pendingDescription="Awaiting assignment matrix or bipartite graph visualization."
          />
        </CaseStudySection>

        {/* SECTION 08: CROSS-CAMERA IDENTITY */}
        <CaseStudySection title="Cross-Camera Identity">
          <p className="text-xl text-slate-300 font-light leading-relaxed mb-12">
            The final output verifies that a player labeled as 'ID 14' in the broadcast angle is accurately tracked as 'ID 14' in the tactical feed, entirely through appearance matching.
          </p>
          <MediaSlot 
            source="MISSING"
            type="video"
            pendingLabel="Final Identity Output"
            pendingDescription="Awaiting final rendering of synchronized output videos from the repository."
          />
        </CaseStudySection>

        {/* SECTION 09: ENGINEERING DECISIONS */}
        <CaseStudySection title="Engineering Decisions">
          <div className="grid grid-cols-1 gap-6">
            {content.engineeringDecisions?.map((decision, idx) => (
              <DecisionBlock 
                key={idx} 
                index={idx}
                decision={decision.decision}
                why={decision.why}
                tradeOff={decision.tradeOff}
              />
            ))}
          </div>
        </CaseStudySection>

        {/* SECTION 10 & 11: RESULTS AND LIMITATIONS */}
        <CaseStudySection title="Results & Limitations">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 border border-white/5 bg-white/[0.02] rounded-xl">
              <h3 className="text-lg font-mono uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#00f3ff]"></span>
                Measured Results
              </h3>
              {content.results?.map((res, idx) => (
                <div key={idx} className="mb-4 last:mb-0">
                  <span className="block text-sm text-slate-500 font-mono mb-1">{res.metric}</span>
                  <span className={`block text-lg font-light ${res.value === 'CONTENT_PENDING' ? 'text-amber-500/80 font-mono text-sm uppercase tracking-widest' : 'text-white'}`}>
                    {res.value}
                  </span>
                </div>
              ))}
              <p className="mt-8 text-sm text-slate-500 font-light border-t border-white/10 pt-4">
                No verified benchmark metrics or final visual outputs are currently available from the accessible repository.
              </p>
            </div>

            <div className="p-8 border border-white/5 bg-white/[0.02] rounded-xl">
              <h3 className="text-lg font-mono uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-amber-500/80"></span>
                Limitations
              </h3>
              <ul className="space-y-4">
                {content.challenges?.map((challenge, idx) => (
                  <li key={idx} className={`text-slate-300 font-light ${challenge.challenge === 'CONTENT_PENDING' ? 'text-amber-500/80 font-mono text-sm uppercase tracking-widest' : ''}`}>
                    {challenge.challenge}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CaseStudySection>

      </div>
    </div>
  );
}
