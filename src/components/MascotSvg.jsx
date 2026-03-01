export default function MascotSvg({ className, size }) {
  return (
    <svg className={className} style={size ? { width: size, height: size } : undefined} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="170" rx="50" ry="25" fill="#333"/>
      <ellipse cx="60" cy="165" rx="18" ry="12" fill="#333"/>
      <ellipse cx="140" cy="165" rx="18" ry="12" fill="#333"/>
      <ellipse cx="55" cy="135" rx="14" ry="28" fill="#333" transform="rotate(15 55 135)"/>
      <ellipse cx="145" cy="135" rx="14" ry="28" fill="#333" transform="rotate(-15 145 135)"/>
      <circle cx="100" cy="95" r="58" fill="#fff"/>
      <circle cx="58" cy="50" r="22" fill="#333"/>
      <circle cx="58" cy="50" r="12" fill="#FF9A9E"/>
      <circle cx="142" cy="50" r="22" fill="#333"/>
      <circle cx="142" cy="50" r="12" fill="#FF9A9E"/>
      <ellipse cx="75" cy="85" rx="19" ry="22" fill="#333" transform="rotate(-5 75 85)"/>
      <ellipse cx="125" cy="85" rx="19" ry="22" fill="#333" transform="rotate(5 125 85)"/>
      <circle cx="75" cy="83" r="9" fill="#fff"/>
      <circle cx="125" cy="83" r="9" fill="#fff"/>
      <circle cx="78" cy="82" r="5.5" fill="#333"/>
      <circle cx="128" cy="82" r="5.5" fill="#333"/>
      <circle cx="76" cy="80" r="2.5" fill="#fff"/>
      <circle cx="126" cy="80" r="2.5" fill="#fff"/>
      <ellipse cx="100" cy="103" rx="7" ry="4.5" fill="#333"/>
      <path d="M88,113 Q100,124 112,113" fill="none" stroke="#333" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="58" cy="103" r="11" fill="#FF9A9E" opacity=".45"/>
      <circle cx="142" cy="103" r="11" fill="#FF9A9E" opacity=".45"/>
      <text x="100" y="28" textAnchor="middle" fontSize="22" fill="var(--sunny)">&#9733;</text>
    </svg>
  );
}
