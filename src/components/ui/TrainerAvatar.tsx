export interface TrainerAvatarProps {
  initials: string;
  hue: string;
}

export function TrainerAvatar({ initials, hue }: TrainerAvatarProps) {
  return (
    <div
      className="avatar"
      style={{
        background: `linear-gradient(135deg, ${hue} 0%, #fff 100%)`,
        display: 'grid',
        placeItems: 'center',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(25,26,35,0.05) 8px, rgba(25,26,35,0.05) 9px)',
        }}
      />
      <div
        style={{
          width: '55%',
          aspectRatio: '1/1',
          borderRadius: '50%',
          background: 'var(--ink)',
          border: '1.5px solid var(--ink)',
          display: 'grid',
          placeItems: 'center',
          color: 'var(--lime)',
          fontSize: 38,
          fontWeight: 600,
          zIndex: 1,
          boxShadow: '0 4px 0 0 var(--ink)',
        }}
      >
        {initials}
      </div>
      <span
        style={{
          position: 'absolute',
          top: 16,
          right: 16,
          background: '#fff',
          border: '1.5px solid var(--ink)',
          borderRadius: 999,
          padding: '4px 10px',
          fontSize: 11,
          fontWeight: 500,
          zIndex: 1,
        }}
      >
        AI Studio
      </span>
    </div>
  );
}
