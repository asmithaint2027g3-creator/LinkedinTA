// SVG Generator for TrustGrid.AI 60 Image-Based Topics
// Dimensions: 1080 x 1350 (Portrait 4:5)
// Enterprise Dark Theme, Crisp Typography, Technical Architecture & Comparison Cards

export function generateSvgForTopic(topic) {
  const padId = String(topic.id).padStart(3, '0');
  const headline = escapeXml(topic.svgHeadline || topic.title.toUpperCase());
  const sub = escapeXml(topic.svgSub || topic.readerProblem);
  const series = escapeXml(topic.series ? topic.series.toUpperCase() : 'ENTERPRISE AI BRIEFING');
  const category = escapeXml(topic.category.toUpperCase());

  // Category specific accent colors
  let primaryAccent = '#0284c7'; // cyan/blue default
  let glowColor = '#38bdf8';
  let badgeBg = '#0c4a6e';
  let badgeText = '#7dd3fc';

  if (topic.category.includes('Agentic') || topic.category.includes('Operations')) {
    primaryAccent = '#6366f1'; // indigo/purple
    glowColor = '#a855f7';
    badgeBg = '#1e1b4b';
    badgeText = '#c7d2fe';
  } else if (topic.category.includes('Cybersecurity') || topic.category.includes('Quantum') || topic.category.includes('Governance')) {
    primaryAccent = '#059669'; // emerald/teal
    glowColor = '#10b981';
    badgeBg = '#064e3b';
    badgeText = '#a7f3d0';
  } else if (topic.category.includes('Economics')) {
    primaryAccent = '#d97706'; // amber/gold
    glowColor = '#fbbf24';
    badgeBg = '#451a03';
    badgeText = '#fde68a';
  }

  // Generate 3-4 feature cards based on topic core points
  const points = topic.corePoints.slice(0, 4);
  const cardElements = points.map((pt, idx) => {
    const yPos = 300 + idx * 165;
    const parts = pt.split(':');
    const title = escapeXml(parts[0] ? parts[0].trim() : `Pillar 0${idx + 1}`);
    const desc = escapeXml(parts[1] ? parts[1].trim() : pt.trim());
    const num = `0${idx + 1}`;

    return `
      <!-- Card ${idx + 1} -->
      <g transform="translate(80, ${yPos})" filter="url(#shadowFilter)">
        <rect width="920" height="145" rx="12" fill="#0f172a" stroke="#1e293b" stroke-width="1.5"/>
        <rect x="0" y="0" width="6" height="145" rx="3" fill="${primaryAccent}"/>
        
        <!-- Step Badge -->
        <circle cx="48" cy="46" r="22" fill="${badgeBg}" stroke="${primaryAccent}" stroke-opacity="0.4" stroke-width="1"/>
        <text x="48" y="52" fill="${glowColor}" font-size="15" font-weight="800" text-anchor="middle" font-family="'JetBrains Mono', monospace">${num}</text>
        
        <!-- Card Text -->
        <text x="88" y="44" fill="#f8fafc" font-size="20" font-weight="700">${title}</text>
        <text x="88" y="76" fill="#94a3b8" font-size="14.5" font-weight="400" width="800">${wrapText(desc, 78)}</text>
      </g>
    `;
  }).join('\n');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1350" width="1080" height="1350" style="background:#080c14; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Inter', sans-serif;">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#080c14"/>
      <stop offset="40%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#0b132b"/>
    </linearGradient>
    <filter id="shadowFilter" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
  </defs>

  <!-- Background Base -->
  <rect width="1080" height="1350" fill="url(#bgGrad)"/>

  <!-- Subtle Blueprint Tech Grid -->
  <g opacity="0.05" stroke="${glowColor}" stroke-width="1">
    <line x1="80" y1="0" x2="80" y2="1350"/>
    <line x1="540" y1="0" x2="540" y2="1350"/>
    <line x1="1000" y1="0" x2="1000" y2="1350"/>
    <line x1="0" y1="180" x2="1080" y2="180"/>
    <line x1="0" y1="680" x2="1080" y2="680"/>
    <line x1="0" y1="1160" x2="1080" y2="1160"/>
  </g>

  <!-- Top Header Bar -->
  <g transform="translate(80, 65)">
    <!-- Brand Plate -->
    <rect x="0" y="0" width="165" height="34" rx="6" fill="#1e293b" stroke="#334155" stroke-width="1"/>
    <text x="16" y="22" fill="#38bdf8" font-size="13" font-weight="800" letter-spacing="1.5">TRUSTGRID.AI</text>
    
    <!-- Category Pill -->
    <rect x="180" y="0" width="280" height="34" rx="6" fill="${badgeBg}" stroke="${primaryAccent}" stroke-width="1"/>
    <text x="195" y="22" fill="${badgeText}" font-size="11.5" font-weight="700" letter-spacing="1">${category}</text>

    <!-- Series & ID -->
    <text x="920" y="22" fill="#64748b" font-size="13" font-weight="600" text-anchor="end" letter-spacing="1">${series} • #${padId}</text>
  </g>

  <!-- Title & Problem Banner -->
  <g transform="translate(80, 145)">
    <text x="0" y="42" fill="#f8fafc" font-size="38" font-weight="800" letter-spacing="-0.5">${headline}</text>
    <text x="0" y="80" fill="#94a3b8" font-size="18.5" font-weight="400">${sub}</text>
  </g>

  <!-- Technical Pillar Cards -->
  ${cardElements}

  <!-- Strategic Takeaway & Rule Banner -->
  <g transform="translate(80, 995)" filter="url(#shadowFilter)">
    <rect width="920" height="150" rx="14" fill="#0f172a" stroke="${primaryAccent}" stroke-width="1.5"/>
    <rect x="0" y="0" width="920" height="38" rx="14" fill="${badgeBg}"/>
    <text x="24" y="24" fill="${glowColor}" font-size="12" font-weight="700" letter-spacing="1.5">ENTERPRISE ARCHITECTURE TAKEAWAY</text>
    
    <text x="24" y="74" fill="#f8fafc" font-size="18" font-weight="700">"${escapeXml(topic.takeaway)}"</text>
    <text x="24" y="112" fill="#94a3b8" font-size="14">Deploy with sovereign data boundaries, formal verification, and deterministic SLAs.</text>
  </g>

  <!-- Bottom CTA Footer -->
  <g transform="translate(80, 1175)">
    <rect width="920" height="96" rx="12" fill="${badgeBg}" fill-opacity="0.3" stroke="${primaryAccent}" stroke-width="1"/>
    
    <text x="32" y="38" fill="${glowColor}" font-size="12.5" font-weight="700" letter-spacing="1">TRUSTGRID.AI ENGINEERING SERVICES</text>
    <text x="32" y="68" fill="#f8fafc" font-size="17" font-weight="700">Forward Deployed Engineering Pods embedded inside your sovereign infrastructure.</text>

    <!-- CTA Button -->
    <rect x="680" y="25" width="208" height="46" rx="8" fill="${primaryAccent}"/>
    <text x="784" y="53" fill="#ffffff" font-size="13.5" font-weight="700" text-anchor="middle">Explore Solutions →</text>
  </g>

  <!-- Footnote -->
  <g transform="translate(80, 1315)">
    <text x="0" y="0" fill="#475569" font-size="12" font-weight="500">© TRUSTGRID.AI • ENTERPRISE AI ENGINEERING • SOVEREIGN INFRASTRUCTURE &amp; AGENTS</text>
    <text x="920" y="0" fill="${glowColor}" font-size="12" font-weight="600" text-anchor="end">trustgrid.ai</text>
  </g>
</svg>`;
}

function escapeXml(unsafe) {
  if (!unsafe) return '';
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function wrapText(text, maxChars) {
  if (text.length <= maxChars) return text;
  // Truncate cleanly or format
  const sub = text.substring(0, maxChars);
  const lastSpace = sub.lastIndexOf(' ');
  return (lastSpace > 0 ? sub.substring(0, lastSpace) : sub) + '...';
}

