import PendingEvidence from './PendingEvidence';

export default function MediaSlot({ source, type = 'image', alt = '', pendingLabel, pendingDescription, className = '' }) {
  if (!source || source === 'CONTENT_PENDING' || source === 'MISSING') {
    return <PendingEvidence label={pendingLabel} description={pendingDescription} className={className} />;
  }

  return (
    <div className={`relative w-full overflow-hidden rounded-xl bg-black border border-white/5 ${className}`}>
      {type === 'image' && (
        <img 
          src={source} 
          alt={alt} 
          className="w-full h-full object-cover"
          loading="lazy"
        />
      )}
      {type === 'video' && (
        <video 
          src={source} 
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
}
