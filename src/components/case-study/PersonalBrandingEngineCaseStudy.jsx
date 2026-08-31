import { motion } from 'framer-motion';
import CaseStudyHero from './CaseStudyHero';
import CaseStudySection from './CaseStudySection';
import SystemPipeline from './SystemPipeline';
import DecisionBlock from './DecisionBlock';

export default function PersonalBrandingEngineCaseStudy({ project }) {
  const { content } = project;

  if (!content) return null;

  return (
    <div className="w-full bg-[#050505] min-h-screen">
      
      {/* SECTION 1: HERO */}
      <CaseStudyHero project={project} />

      <div className="container mx-auto px-6 max-w-5xl pb-32">
        
        {/* SECTION 2: THE PROBLEM */}
        <CaseStudySection title="The Problem">
          <div className="grid grid-cols-1 gap-8 mb-12">
            <div className="flex flex-col gap-2">
              <h4 className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-1">Problem</h4>
              <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed">
                {content.problem?.description}
              </p>
            </div>
            
            <div className="flex flex-col gap-2 p-6 bg-white/[0.02] border border-white/5 rounded-xl">
              <h4 className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-1">Constraint</h4>
              <p className="text-slate-300 font-light">
                {content.problem?.constraint}
              </p>
            </div>
            
            <div className="flex flex-col gap-2">
              <h4 className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-1">System Response</h4>
              <p className="text-xl text-white font-display font-medium leading-relaxed">
                {content.problem?.systemResponse}
              </p>
            </div>
          </div>
        </CaseStudySection>

        {/* SECTION 3: SYSTEM OVERVIEW */}
        <CaseStudySection title="System Overview">
          <p className="text-xl text-slate-300 font-light leading-relaxed mb-6">
            {content.overview}
          </p>
          <div className="w-full border border-white/10 bg-black/40 rounded-xl flex flex-col items-center justify-center pt-8 overflow-hidden relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]"></div>
            <p className="text-xs font-mono text-slate-600 uppercase tracking-widest mb-4 z-10">Stateless Orchestration Architecture</p>
            <SystemPipeline nodes={content.architecture} />
          </div>
        </CaseStudySection>

        {/* SECTION 4: SCHEDULING & ORCHESTRATION */}
        <CaseStudySection title="Scheduling & Orchestration">
          <p className="text-xl text-slate-300 font-light leading-relaxed mb-6">
            The Queue Manager coordinates scheduling mathematically using absolute UTC normalization. Instead of a live monitoring loop, the system executes optimal assignment blocks, halting until the external cron webhook signals a dispatch window.
          </p>
          <div className="w-full border border-white/10 bg-[#0a0a0a] rounded-xl flex flex-col items-center justify-center pt-8 overflow-hidden relative">
             <SystemPipeline nodes={content.scheduling} activeNodeId="dispatch" />
          </div>
        </CaseStudySection>

        {/* SECTION 5: IDEMPOTENCY */}
        <CaseStudySection title="Idempotency & Concurrency">
          <p className="text-xl text-slate-300 font-light leading-relaxed mb-6">
            To eliminate the risk of duplicate cross-platform publishing during overlapping cron cycles, the Dispatch Service triggers an immediate database lock (<code>scheduled_for = None</code>) enforced by strict idempotency key checks (<code>daily-automation-YYYY-MM-DD</code>).
          </p>
          <div className="w-full border border-white/10 bg-[#0a0a0a] rounded-xl flex flex-col items-center justify-center pt-8 overflow-hidden relative">
             <SystemPipeline nodes={content.idempotency} activeNodeId="process" />
          </div>
        </CaseStudySection>

        {/* SECTION 6: SECURITY / HMAC */}
        <CaseStudySection title="Security & Verification">
          <p className="text-xl text-slate-300 font-light leading-relaxed mb-6">
            Webhook endpoints are protected via strict HMAC secret verification using constant-time string comparisons. Platform access tokens (OAuth2) are symmetrically encrypted at rest via AES-256-GCM Fernet and decrypted dynamically in memory during the dispatch lifecycle.
          </p>
          <div className="w-full border border-white/10 bg-[#0a0a0a] rounded-xl flex flex-col items-center justify-center pt-8 overflow-hidden relative">
             <SystemPipeline nodes={content.security} activeNodeId="verification" />
          </div>
        </CaseStudySection>

        {/* SECTION 7: PUBLISHING PIPELINE */}
        <CaseStudySection title="Publishing Pipeline">
          <p className="text-xl text-slate-300 font-light leading-relaxed mb-6">
            Once authenticated, the Orchestrator compiles the payload targeting the LinkedIn <code>/v2/posts</code> API. Visual generation is decoupled via a fail-safe non-blocking queue—if an image generation times out, the draft falls back to text-only publication to guarantee distribution.
          </p>
          <div className="w-full border border-white/10 bg-[#0a0a0a] rounded-xl flex flex-col items-center justify-center pt-8 overflow-hidden relative">
             <SystemPipeline nodes={content.publishing} activeNodeId="payload" />
          </div>
        </CaseStudySection>
        
        {/* SECTION 8: FAILURE / RELIABILITY */}
        <CaseStudySection title="Failure & Recovery">
          <p className="text-xl text-slate-300 font-light leading-relaxed mb-6">
            The Orchestrator gracefully translates HTTP 401 (token revocation), 429 (rate limits), and 400 (schema errors) into state transitions rather than catastrophic crashes. Raw exception strings are captured into database notes for manual recovery review.
          </p>
          <div className="w-full border border-amber-500/10 bg-[#110d05] rounded-xl flex flex-col items-center justify-center pt-8 overflow-hidden relative">
             <SystemPipeline nodes={content.reliability} activeNodeId="failure" />
          </div>
        </CaseStudySection>

        {/* SECTION 9: ENGINEERING DECISIONS */}
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

        {/* SECTION 10: RESULTS AND LIMITATIONS */}
        <CaseStudySection title="Results & Limitations">
          <div className="grid grid-cols-1 gap-8">
            <div className="p-8 border border-white/5 bg-white/[0.02] rounded-xl w-full">
              <h3 className="text-lg font-mono uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-amber-500/80"></span>
                Limitations & Missing Evidence
              </h3>
              {content.limitations?.map((res, idx) => (
                <div key={idx} className="mb-4 last:mb-0 flex flex-col md:flex-row md:items-center justify-between border-b border-white/5 pb-4 last:border-0 last:pb-0">
                  <span className="block text-sm text-slate-300 font-mono mb-1 md:mb-0">{res.metric}</span>
                  <span className={`block text-right font-light ${res.value === 'CONTENT_PENDING' ? 'text-amber-500/80 font-mono text-sm uppercase tracking-widest' : 'text-white'}`}>
                    {res.value}
                  </span>
                </div>
              ))}
              <p className="mt-8 text-sm text-slate-500 font-light border-t border-white/10 pt-4">
                The architectural mechanisms are verified via source code, but no UI screenshots, live dashboard telemetry, or production metrics are available in the local repository.
              </p>
            </div>
          </div>
        </CaseStudySection>

      </div>
    </div>
  );
}
