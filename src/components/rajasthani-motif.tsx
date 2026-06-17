export function RajasthaniMotif() {
  return (
    <div className="flex justify-center mb-4 opacity-80 select-none pointer-events-none">
      <svg width="100" height="24" viewBox="0 0 100 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 0L56 8H64L58 14L60 22L50 17L40 22L42 14L36 8H44L50 0Z" fill="url(#paint0_linear)"/>
        <path d="M30 12L33 16H38L34 19L35 24L30 21L25 24L26 19L22 16H27L30 12Z" fill="var(--accent)" opacity="0.6"/>
        <path d="M70 12L73 16H78L74 19L75 24L70 21L65 24L66 19L62 16H67L70 12Z" fill="var(--accent)" opacity="0.6"/>
        
        {/* Subtle lines extending out */}
        <line x1="0" y1="12" x2="20" y2="12" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
        <line x1="80" y1="12" x2="100" y2="12" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
        
        <defs>
          <linearGradient id="paint0_linear" x1="50" y1="0" x2="50" y2="22" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--accent)"/>
            <stop offset="1" stopColor="var(--accent)"/>
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
