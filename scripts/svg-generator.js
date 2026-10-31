// Professional SVG Generator for TrustGrid.AI 60 Image-Based Topics
// Dimensions: 1200 x 1500 (High-Density Corporate Advisory Infographic)
// Features: Micro-Dot Grid Pattern, Elimination of Dead White Space,
// 6 Distinct Structural Layouts, Crisp Typography, and High-Contrast CTA Banners.

export function generateSvgForTopic(topic) {
  const layout = determineLayout(topic);
  const padId = String(topic.id).padStart(3, '0');
  const headline = escapeXml(topic.svgHeadline || topic.title.toUpperCase());
  const sub = escapeXml(topic.svgSub || topic.readerProblem);
  const category = escapeXml(topic.category.toUpperCase());
  
  // Extract context micro-tags
  const contextTags = getContextTags(topic);

  // Common Header & Background Definitions
  const commonDefs = `
    <pattern id="microDotGrid" width="24" height="24" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.2" fill="#cbd5e1" opacity="0.6"/>
    </pattern>

    <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#1d4ed8"/>
      <stop offset="100%" stop-color="#2563eb"/>
    </linearGradient>

    <linearGradient id="darkNavyCard" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a192f"/>
      <stop offset="50%" stop-color="#0f2744"/>
      <stop offset="100%" stop-color="#1e3a8a"/>
    </linearGradient>

    <linearGradient id="ctaGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0b172a"/>
      <stop offset="40%" stop-color="#1e3a8a"/>
      <stop offset="100%" stop-color="#2563eb"/>
    </linearGradient>

    <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#059669"/>
      <stop offset="100%" stop-color="#10b981"/>
    </linearGradient>

    <linearGradient id="redGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#dc2626"/>
      <stop offset="100%" stop-color="#ef4444"/>
    </linearGradient>

    <filter id="cardShadow" x="-2%" y="-2%" width="104%" height="106%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#0f172a" flood-opacity="0.04"/>
      <feDropShadow dx="0" dy="1" stdDeviation="2" flood-color="#0f172a" flood-opacity="0.02"/>
    </filter>

    <filter id="ctaShadow" x="-2%" y="-5%" width="104%" height="115%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#1d4ed8" flood-opacity="0.25"/>
    </filter>
  `;

  // Render Layout Content
  let layoutBody = '';
  switch (layout) {
    case 'BEFORE_AFTER_COMPARISON':
      layoutBody = renderBeforeAfterLayout(topic);
      break;
    case 'FOUR_TIER_STACK':
      layoutBody = renderFourTierStackLayout(topic);
      break;
    case 'WORKFLOW_PIPELINE':
      layoutBody = renderWorkflowPipelineLayout(topic);
      break;
    case 'DECISION_QUADRANT_MATRIX':
      layoutBody = renderQuadrantMatrixLayout(topic);
      break;
    case 'FINOPS_VALUE_WATERFALL':
      layoutBody = renderFinopsWaterfallLayout(topic);
      break;
    case 'DIAGNOSTIC_MATRIX':
    default:
      layoutBody = renderDiagnosticMatrixLayout(topic);
      break;
  }

  // Final SVG Assembly
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1500" width="1200" height="1500" style="background:#f4f7fb; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Inter', Helvetica, Arial, sans-serif;">
  <defs>
    ${commonDefs}
  </defs>

  <!-- Base Canvas + Technical Micro-Dot Texture -->
  <rect width="1200" height="1500" fill="#f4f7fb"/>
  <rect width="1200" height="1500" fill="url(#microDotGrid)"/>
  <rect x="0" y="0" width="1200" height="4" fill="url(#blueGrad)"/>

  <!-- Top Header Bar -->
  <g transform="translate(60, 45)">
    <!-- Brand Logo Group -->
    <g transform="translate(0, 0)">
      <rect x="0" y="0" width="38" height="38" rx="8" fill="#1d4ed8"/>
      <path d="M19 7 L29 11 L29 19 C29 25 19 30 19 30 C19 30 9 25 9 19 L9 11 Z" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M14 18 L17.5 21.5 L24 15" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="48" y="22" fill="#0b172a" font-size="22" font-weight="900" letter-spacing="1">TRUSTGRID<tspan fill="#1d4ed8">.AI</tspan></text>
      <text x="48" y="34" fill="#64748b" font-size="10.5" font-weight="700" letter-spacing="1.5">ENTERPRISE AI ENGINEERING</text>
    </g>

    <line x1="280" y1="2" x2="280" y2="36" stroke="#cbd5e1" stroke-width="1.5"/>

    <!-- Descriptor -->
    <g transform="translate(296, 6)">
      <text x="0" y="14" fill="#475569" font-size="11.5" font-weight="600">A Practice of Silicon-to-Strategy Engineering</text>
      <text x="0" y="27" fill="#1d4ed8" font-size="10.5" font-weight="700" letter-spacing="1.2">HIGH-DENSITY COMPUTE • AGENTIC SYSTEMS</text>
    </g>

    <!-- Category Pill -->
    <g transform="translate(1080, 2)" text-anchor="end">
      <rect x="-280" y="0" width="280" height="36" rx="18" fill="#ffffff" stroke="#bfdbfe" stroke-width="1.5" filter="url(#cardShadow)"/>
      <text x="-140" y="23" fill="#1d4ed8" font-size="11" font-weight="700" letter-spacing="0.8" text-anchor="middle">${category} • #${padId}</text>
    </g>

    <line x1="0" y1="52" x2="1080" y2="52" stroke="#e2e8f0" stroke-width="1"/>
  </g>

  <!-- Context Tag Strip -->
  <g transform="translate(60, 122)">
    <rect x="0" y="0" width="${Math.min(520, contextTags.length * 10 + 40)}" height="28" rx="14" fill="#e0e7ff" stroke="#c7d2fe" stroke-width="1"/>
    <text x="16" y="18" fill="#3730a3" font-size="11" font-weight="800" letter-spacing="1">${contextTags}</text>
  </g>

  <!-- Primary Headline & Sub-headline -->
  <g transform="translate(60, 165)">
    ${renderHeadline(headline)}

    <g transform="translate(0, 108)">
      <rect x="0" y="4" width="4" height="22" rx="2" fill="#1d4ed8"/>
      <text x="14" y="21" fill="#475569" font-size="16.5" font-weight="500">
        ${escapeXml(wrapText(sub, 92))}
      </text>
    </g>
  </g>

  <!-- Dynamic Structural Layout -->
  ${layoutBody}

  <!-- Executive CTA Banner -->
  <g transform="translate(60, 1140)" filter="url(#ctaShadow)">
    <rect width="1080" height="120" rx="16" fill="url(#ctaGrad)"/>
    <rect width="1080" height="120" rx="16" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-opacity="0.5"/>

    <g transform="translate(40, 36)">
      <text x="0" y="24" fill="#ffffff" font-size="23" font-weight="900" letter-spacing="-0.3">
        ${escapeXml(topic.primaryCta || 'Schedule an AI Architecture Diagnostic')}
      </text>
      <text x="0" y="52" fill="#93c5fd" font-size="14" font-weight="600">
        DM 'AI-DIAGNOSTIC' to benchmark your enterprise readiness with TrustGrid engineers.
      </text>
    </g>

    <g transform="translate(740, 36)">
      <rect width="300" height="50" rx="25" fill="#ffffff" filter="url(#cardShadow)"/>
      <text x="150" y="31" fill="#0b172a" font-size="13" font-weight="900" letter-spacing="0.8" text-anchor="middle">
        REQUEST PEER REVIEW →
      </text>
    </g>
  </g>

  <!-- Footer Bar -->
  <g transform="translate(60, 1315)">
    <line x1="0" y1="0" x2="1080" y2="0" stroke="#e2e8f0" stroke-width="1"/>
    <text x="0" y="34" fill="#0b172a" font-size="13.5" font-weight="900" letter-spacing="1">WWW.TRUSTGRID.AI</text>
    <text x="1080" y="34" fill="#475569" font-size="11.5" font-weight="700" letter-spacing="1.2" text-anchor="end">
      AI INFRASTRUCTURE • GPU OPTIMIZATION • AGENTIC SYSTEMS • ZERO-TRUST GOVERNANCE
    </text>
  </g>
</svg>`;
}

// -------------------------------------------------------------
// LAYOUT 1: DIAGNOSTIC_MATRIX (Reference Govenics Style)
// -------------------------------------------------------------
function renderDiagnosticMatrixLayout(topic) {
  const points = topic.corePoints.slice(0, 4);
  const p1 = splitPoint(points[0] || 'Entity Gaps: Lack of verified audit trails');
  const p2 = splitPoint(points[1] || 'Silo Latency: Delayed integration pipelines');
  const p3 = splitPoint(points[2] || 'Resource Drift: Model performance variance');
  const p4 = splitPoint(points[3] || 'Accountability: Undefined governance oversight');

  const controls = [
    { title: 'Full-Stack Co-Design', desc: 'Hardware, kernel, and fabric synchronization.' },
    { title: 'Continuous Attestation', desc: 'Automated telemetry monitoring for anomalies.' },
    { title: 'Deterministic Guardrails', desc: 'Pre-execution schema and security verification.' },
    { title: 'Lossless Fabric Tuning', desc: 'Zero packet drops across distributed clusters.' },
    { title: 'Board-Defensible Logs', desc: 'Cryptographically sealed audit trails for compliance.' },
    { title: 'Forward Deployed Pods', desc: 'Engineers embedded directly in client VPCs.' }
  ];

  return `
  <!-- Split Feature Block (Verified Intel + Radar Model) -->
  <g transform="translate(60, 320)">
    <g filter="url(#cardShadow)">
      <rect width="660" height="150" rx="14" fill="#ffffff" stroke="#bfdbfe" stroke-width="1.5"/>
      <rect x="0" y="0" width="6" height="150" rx="3" fill="#1d4ed8"/>
      <g transform="translate(24, 20)">
        <rect x="0" y="0" width="210" height="24" rx="12" fill="#e0e7ff"/>
        <text x="12" y="16" fill="#1d4ed8" font-size="10.5" font-weight="800" letter-spacing="0.8">VERIFIED ENTERPRISE INTEL</text>
        <text x="0" y="54" fill="#1d4ed8" font-size="26" font-weight="900" letter-spacing="-0.4">${escapeXml(wrapText(p1.title, 32))}</text>
        <text x="0" y="82" fill="#334155" font-size="14" font-weight="500">${escapeXml(wrapText(p1.desc, 68))}</text>
        <g transform="translate(0, 116)">
          <circle cx="6" cy="6" r="4.5" fill="none" stroke="#64748b" stroke-width="1.2"/>
          <path d="M6 3.5 L6 6 L7.5 7.5" fill="none" stroke="#64748b" stroke-width="1.2"/>
          <text x="16" y="9.5" fill="#64748b" font-size="11" font-weight="600">Source Attribution: TrustGrid Systems Engineering Telemetry | High-Density Practice</text>
        </g>
      </g>
    </g>

    <g transform="translate(690, 0)" filter="url(#cardShadow)">
      <rect width="390" height="150" rx="14" fill="url(#darkNavyCard)"/>
      <rect width="390" height="150" rx="14" fill="none" stroke="#3b82f6" stroke-width="1" stroke-opacity="0.3"/>
      <text x="24" y="28" fill="#93c5fd" font-size="11" font-weight="800" letter-spacing="1.5">DEFENSIBILITY MODEL</text>
      <g transform="translate(195, 88)">
        <circle cx="0" cy="0" r="44" fill="none" stroke="#38bdf8" stroke-width="1" stroke-dasharray="3 3" opacity="0.35"/>
        <circle cx="0" cy="0" r="32" fill="none" stroke="#60a5fa" stroke-width="1.2" opacity="0.6"/>
        <circle cx="0" cy="0" r="24" fill="#1d4ed8" fill-opacity="0.5"/>
        <path d="M0 -15 L14 -9 L14 3 C14 11 0 17 0 17 C0 17 -14 11 -14 3 L-14 -9 Z" fill="#2563eb" stroke="#93c5fd" stroke-width="2"/>
        <path d="M-5 1 L-1 5 L6 -2" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
      <text x="195" y="136" fill="#bfdbfe" font-size="11.5" font-weight="600" text-anchor="middle">Sovereign Enterprise Architecture</text>
    </g>
  </g>

  <!-- 4-Point Critical Failure / Exposure Matrix with Red Accents -->
  <g transform="translate(60, 500)">
    <g transform="translate(0, 0)">
      <circle cx="7" cy="7" r="5" fill="#ef4444"/>
      <circle cx="7" cy="7" r="7" fill="none" stroke="#ef4444" stroke-width="1" opacity="0.4"/>
      <text x="22" y="12" fill="#0b172a" font-size="12.5" font-weight="800" letter-spacing="1">CRITICAL SYSTEMIC EXPOSURES (4-POINT FAILURE MATRIX)</text>
    </g>

    <!-- Card 1 -->
    <g transform="translate(0, 30)" filter="url(#cardShadow)">
      <rect width="525" height="105" rx="12" fill="#ffffff" stroke="#fecaca" stroke-width="1"/>
      <path d="M0 12 Q0 0 12 0 L14 0 L14 105 L12 105 Q0 105 0 93 Z" fill="#ef4444"/>
      <g transform="translate(26, 20)">
        <text x="0" y="18" fill="#0b172a" font-size="16" font-weight="800">${escapeXml(wrapText(p1.title, 36))}</text>
        <text x="0" y="42" fill="#475569" font-size="13" font-weight="400">${escapeXml(wrapText(p1.desc, 60))}</text>
        <text x="0" y="62" fill="#475569" font-size="13" font-weight="400">Triggering compounding latency and unrecoverable compute waste.</text>
      </g>
    </g>

    <!-- Card 2 -->
    <g transform="translate(555, 30)" filter="url(#cardShadow)">
      <rect width="525" height="105" rx="12" fill="#ffffff" stroke="#fecaca" stroke-width="1"/>
      <path d="M0 12 Q0 0 12 0 L14 0 L14 105 L12 105 Q0 105 0 93 Z" fill="#ef4444"/>
      <g transform="translate(26, 20)">
        <text x="0" y="18" fill="#0b172a" font-size="16" font-weight="800">${escapeXml(wrapText(p2.title, 36))}</text>
        <text x="0" y="42" fill="#475569" font-size="13" font-weight="400">${escapeXml(wrapText(p2.desc, 60))}</text>
        <text x="0" y="62" fill="#475569" font-size="13" font-weight="400">Forces distributed worker nodes into cascading synchronization barrier stalls.</text>
      </g>
    </g>

    <!-- Card 3 -->
    <g transform="translate(0, 150)" filter="url(#cardShadow)">
      <rect width="525" height="105" rx="12" fill="#ffffff" stroke="#fecaca" stroke-width="1"/>
      <path d="M0 12 Q0 0 12 0 L14 0 L14 105 L12 105 Q0 105 0 93 Z" fill="#ef4444"/>
      <g transform="translate(26, 20)">
        <text x="0" y="18" fill="#0b172a" font-size="16" font-weight="800">${escapeXml(wrapText(p3.title, 36))}</text>
        <text x="0" y="42" fill="#475569" font-size="13" font-weight="400">${escapeXml(wrapText(p3.desc, 60))}</text>
        <text x="0" y="62" fill="#475569" font-size="13" font-weight="400">Wastes up to 40–60% of provisioned enterprise memory and token throughput.</text>
      </g>
    </g>

    <!-- Card 4 -->
    <g transform="translate(555, 150)" filter="url(#cardShadow)">
      <rect width="525" height="105" rx="12" fill="#ffffff" stroke="#fecaca" stroke-width="1"/>
      <path d="M0 12 Q0 0 12 0 L14 0 L14 105 L12 105 Q0 105 0 93 Z" fill="#ef4444"/>
      <g transform="translate(26, 20)">
        <text x="0" y="18" fill="#0b172a" font-size="16" font-weight="800">${escapeXml(wrapText(p4.title, 36))}</text>
        <text x="0" y="42" fill="#475569" font-size="13" font-weight="400">${escapeXml(wrapText(p4.desc, 60))}</text>
        <text x="0" y="62" fill="#475569" font-size="13" font-weight="400">Exposes corporate leadership to regulatory non-compliance and security drift.</text>
      </g>
    </g>
  </g>

  <!-- 6-Point Institutional Controls Matrix (Blue Checkmarks) -->
  <g transform="translate(60, 800)">
    <g transform="translate(0, 0)">
      <path d="M2 7 L6 11 L14 3" fill="none" stroke="#1d4ed8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="24" y="11" fill="#0b172a" font-size="12.5" font-weight="800" letter-spacing="1">HOW TRUSTGRID BUILDS INSTITUTIONAL INTEGRITY (6 CONTROLS)</text>
    </g>

    ${controls.map((c, i) => {
      const col = i % 3;
      const row = Math.floor(i / 3);
      const x = col * 365;
      const y = 30 + row * 125;
      return `
        <g transform="translate(${x}, ${y})" filter="url(#cardShadow)">
          <rect width="345" height="110" rx="12" fill="#ffffff" stroke="#bfdbfe" stroke-width="1"/>
          <circle cx="28" cy="28" r="10" fill="#1d4ed8"/>
          <path d="M24 28 L27 31 L32 25" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
          <text x="46" y="32" fill="#0b172a" font-size="14.5" font-weight="800">${escapeXml(c.title)}</text>
          <text x="18" y="58" fill="#475569" font-size="12">${escapeXml(c.desc)}</text>
          <text x="18" y="76" fill="#64748b" font-size="11.5">Enforced across sovereign VPC environments.</text>
        </g>
      `;
    }).join('')}
  </g>
  `;
}

// -------------------------------------------------------------
// LAYOUT 2: BEFORE_AFTER_COMPARISON (Direct Architectural Contrast)
// -------------------------------------------------------------
function renderBeforeAfterLayout(topic) {
  const points = topic.corePoints.slice(0, 3);
  const p1 = splitPoint(points[0] || 'Compute Allocation: Static provisioning');
  const p2 = splitPoint(points[1] || 'Network Fabric: Standard lossy Ethernet');
  const p3 = splitPoint(points[2] || 'Thermal Management: Air cooling throttling');

  return `
  <!-- Two Mega Comparison Columns -->
  <g transform="translate(60, 320)">
    <!-- Left Column: Legacy / Unoptimized -->
    <g filter="url(#cardShadow)">
      <rect width="525" height="420" rx="14" fill="#ffffff" stroke="#fecaca" stroke-width="1.5"/>
      <rect x="0" y="0" width="525" height="48" rx="14" fill="#fef2f2"/>
      <circle cx="24" cy="24" r="6" fill="#ef4444"/>
      <text x="38" y="29" fill="#991b1b" font-size="13" font-weight="800" letter-spacing="1">UNOPTIMIZED ENTERPRISE ARCHITECTURE</text>

      <g transform="translate(24, 75)">
        <text x="0" y="0" fill="#64748b" font-size="12" font-weight="700">MEASURED SYSTEM SATURATION</text>
        <text x="0" y="38" fill="#0f172a" font-size="36" font-weight="900">34% <tspan font-size="18" fill="#ef4444" font-weight="700">(High Sunk Waste)</tspan></text>
        
        <rect x="0" y="52" width="477" height="12" rx="6" fill="#fee2e2"/>
        <rect x="0" y="52" width="162" height="12" rx="6" fill="url(#redGrad)"/>

        <!-- Inefficiency Bullets -->
        <g transform="translate(0, 95)">
          <circle cx="6" cy="6" r="4" fill="#ef4444"/>
          <text x="20" y="10" fill="#1e293b" font-size="14.5" font-weight="700">65% Computational Cycles Lost to I/O</text>
          <text x="20" y="28" fill="#64748b" font-size="12.5">Attention layers thrashing memory without computing tokens.</text>

          <circle cx="6" cy="56" r="4" fill="#ef4444"/>
          <text x="20" y="60" fill="#1e293b" font-size="14.5" font-weight="700">Lossy Network Retransmission Loops</text>
          <text x="20" y="78" fill="#64748b" font-size="12.5">Buffer overflows triggering severe All-Reduce barrier stalls.</text>

          <circle cx="6" cy="106" r="4" fill="#ef4444"/>
          <text x="20" y="110" fill="#1e293b" font-size="14.5" font-weight="700">Severe Thermal Throttling Overhead</text>
          <text x="20" y="128" fill="#64748b" font-size="12.5">Air cooling limits forcing 25-40% reduction in clock boost.</text>
        </g>

        <!-- Red Result Pill -->
        <rect x="0" y="275" width="477" height="36" rx="8" fill="#fee2e2"/>
        <text x="238" y="298" fill="#991b1b" font-size="13" font-weight="800" text-anchor="middle">Effective Yield: ~34 Active Equivalents per 100 Nodes</text>
      </g>
    </g>

    <!-- Right Column: TrustGrid Tuned AI Factory -->
    <g transform="translate(555, 0)" filter="url(#cardShadow)">
      <rect width="525" height="420" rx="14" fill="#ffffff" stroke="#bfdbfe" stroke-width="1.5"/>
      <rect x="0" y="0" width="525" height="48" rx="14" fill="#eff6ff"/>
      <circle cx="24" cy="24" r="6" fill="#1d4ed8"/>
      <text x="38" y="29" fill="#1e40af" font-size="13" font-weight="800" letter-spacing="1">TRUSTGRID TUNED AI FACTORY</text>

      <g transform="translate(24, 75)">
        <text x="0" y="0" fill="#64748b" font-size="12" font-weight="700">MEASURED SYSTEM SATURATION</text>
        <text x="0" y="38" fill="#0f172a" font-size="36" font-weight="900">84% <tspan font-size="18" fill="#1d4ed8" font-weight="700">(Peak Yield Multiplier)</tspan></text>

        <rect x="0" y="52" width="477" height="12" rx="6" fill="#dbeafe"/>
        <rect x="0" y="52" width="400" height="12" rx="6" fill="url(#blueGrad)"/>

        <!-- Efficiency Bullets -->
        <g transform="translate(0, 95)">
          <circle cx="6" cy="6" r="4" fill="#1d4ed8"/>
          <text x="20" y="10" fill="#1e293b" font-size="14.5" font-weight="700">Custom Fused CUDA &amp; Triton Kernels</text>
          <text x="20" y="28" fill="#64748b" font-size="12.5">Keeping tensor operations directly on fast on-chip SRAM.</text>

          <circle cx="6" cy="56" r="4" fill="#1d4ed8"/>
          <text x="20" y="60" fill="#1e293b" font-size="14.5" font-weight="700">Lossless RoCEv2 / InfiniBand Fabrics</text>
          <text x="20" y="78" fill="#64748b" font-size="12.5">PFC and ECN queue engineering eliminating packet loss.</text>

          <circle cx="6" cy="106" r="4" fill="#1d4ed8"/>
          <text x="20" y="110" fill="#1e293b" font-size="14.5" font-weight="700">Direct-to-Chip Liquid Cooling Loops</text>
          <text x="20" y="128" fill="#64748b" font-size="12.5">Sustained boost clocks at 1.08 PUE with zero thermal drop.</text>
        </g>

        <!-- Blue Result Pill -->
        <rect x="0" y="275" width="477" height="36" rx="8" fill="#eff6ff"/>
        <text x="238" y="298" fill="#1e40af" font-size="13" font-weight="800" text-anchor="middle">Effective Yield: ~84 Active Equivalents per 100 Nodes (2.5x Output)</text>
      </g>
    </g>
  </g>

  <!-- 3 Wide System Optimization Levers -->
  <g transform="translate(60, 780)">
    <text x="0" y="0" fill="#0b172a" font-size="12.5" font-weight="800" letter-spacing="1">THREE CORE ARCHITECTURAL LEVERS DELIVERING THE MULTIPLIER</text>
    
    ${points.map((pt, i) => {
      const y = 18 + i * 110;
      const sp = splitPoint(pt);
      return `
        <g transform="translate(0, ${y})" filter="url(#cardShadow)">
          <rect width="1080" height="95" rx="12" fill="#ffffff" stroke="#bfdbfe" stroke-width="1"/>
          <rect x="0" y="0" width="6" height="95" rx="3" fill="#1d4ed8"/>
          <circle cx="48" cy="48" r="22" fill="#eff6ff"/>
          <text x="48" y="55" fill="#1d4ed8" font-size="16" font-weight="900" text-anchor="middle">0${i+1}</text>
          <text x="88" y="38" fill="#0b172a" font-size="17" font-weight="800">${escapeXml(sp.title)}</text>
          <text x="88" y="66" fill="#475569" font-size="13.5">${escapeXml(sp.desc)}</text>
        </g>
      `;
    }).join('')}
  </g>
  `;
}

// -------------------------------------------------------------
// LAYOUT 3: FOUR_TIER_STACK (Full-Stack Vertical Architecture)
// -------------------------------------------------------------
function renderFourTierStackLayout(topic) {
  const points = topic.corePoints.slice(0, 4);
  const tiers = [
    { num: 'TIER 04', title: 'Deterministic Governance & Verification Layer', desc: 'SHAP/LIME attribution, constraint solvers, immutable audit trails.', color: '#059669', bg: '#ecfdf5' },
    { num: 'TIER 03', title: 'Agentic Swarm & Tripartite Memory Layer', desc: 'Episodic context, enterprise ontologies, zero-trust tool sandboxing.', color: '#2563eb', bg: '#eff6ff' },
    { num: 'TIER 02', title: 'Lossless High-Speed Interconnect Fabric', desc: 'RoCEv2 and InfiniBand rail-optimized non-blocking Clos networks.', color: '#6366f1', bg: '#eef2ff' },
    { num: 'TIER 01', title: 'High-Density Physical Silicon & Thermal Compute', desc: 'Custom CUDA kernels, FlashAttention-3, direct-to-chip liquid cooling.', color: '#0f172a', bg: '#f1f5f9' }
  ];

  return `
  <!-- Top Architecture Objective Banner -->
  <g transform="translate(60, 320)" filter="url(#cardShadow)">
    <rect width="1080" height="90" rx="14" fill="#ffffff" stroke="#bfdbfe" stroke-width="1.5"/>
    <rect x="0" y="0" width="6" height="90" rx="3" fill="#1d4ed8"/>
    <g transform="translate(24, 20)">
      <text x="0" y="16" fill="#1d4ed8" font-size="11" font-weight="800" letter-spacing="1">FULL-STACK SYSTEMS RIGOR</text>
      <text x="0" y="44" fill="#0b172a" font-size="20" font-weight="900">Co-Designing Physical Silicon, Network Fabrics, and Autonomous Agent Runtimes</text>
    </g>
  </g>

  <!-- 4 Stacked Layers with Vertical Connecting Pipes -->
  <g transform="translate(60, 440)">
    ${tiers.map((t, i) => {
      const y = i * 165;
      const pt = points[3 - i] ? splitPoint(points[3 - i]) : null;
      const title = pt ? pt.title : t.title;
      const desc = pt ? pt.desc : t.desc;

      return `
        <!-- Layer ${4 - i} -->
        <g transform="translate(0, ${y})" filter="url(#cardShadow)">
          <rect width="1080" height="135" rx="14" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
          <rect x="0" y="0" width="1080" height="38" rx="14" fill="${t.bg}"/>
          <text x="24" y="24" fill="${t.color}" font-size="12" font-weight="800" letter-spacing="1.5">${t.num}: ${escapeXml(title.toUpperCase())}</text>
          
          <g transform="translate(24, 60)">
            <text x="0" y="22" fill="#0b172a" font-size="18" font-weight="800">${escapeXml(wrapText(title, 45))}</text>
            <text x="0" y="48" fill="#475569" font-size="14">${escapeXml(wrapText(desc, 90))}</text>
          </g>

          <g transform="translate(900, 60)" text-anchor="end">
            <rect x="-140" y="4" width="140" height="30" rx="15" fill="#f8fafc" stroke="#e2e8f0"/>
            <text x="-70" y="24" fill="#334155" font-size="11" font-weight="700" text-anchor="middle">SOVEREIGN IP</text>
          </g>
        </g>

        ${i < 3 ? `
          <!-- Inter-Layer Data Pipe -->
          <line x1="540" y1="${y + 135}" x2="540" y2="${y + 165}" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4 4"/>
          <circle cx="540" cy="${y + 150}" r="4" fill="#1d4ed8"/>
        ` : ''}
      `;
    }).join('')}
  </g>
  `;
}

// -------------------------------------------------------------
// LAYOUT 4: WORKFLOW_PIPELINE (Horizontal Lifecycle & Execution)
// -------------------------------------------------------------
function renderWorkflowPipelineLayout(topic) {
  const points = topic.corePoints.slice(0, 4);
  const stages = [
    { num: '01', title: 'Discovery & Telemetry', desc: 'Profiling MFU, I/O latency, and agent workflow friction.' },
    { num: '02', title: 'Kernel & Fabric Co-Design', desc: 'CUDA fusion, RoCEv2 queue tuning, and liquid loops.' },
    { num: '03', title: 'Agent Swarm Integration', desc: 'Tripartite memory and zero-trust tool execution.' },
    { num: '04', title: 'Continuous Attestation', desc: 'Deterministic SLAs, SHAP explainability, and FinOps.' }
  ];

  return `
  <!-- Top Milestone Header -->
  <g transform="translate(60, 320)" filter="url(#cardShadow)">
    <rect width="1080" height="90" rx="14" fill="#ffffff" stroke="#bfdbfe" stroke-width="1.5"/>
    <rect x="0" y="0" width="6" height="90" rx="3" fill="#1d4ed8"/>
    <g transform="translate(24, 20)">
      <text x="0" y="16" fill="#1d4ed8" font-size="11" font-weight="800" letter-spacing="1">OPERATIONAL EXECUTION LIFECYCLE</text>
      <text x="0" y="44" fill="#0b172a" font-size="20" font-weight="900">The 4-Stage Transition from Fragile Pilots to High-Velocity AI Operations</text>
    </g>
  </g>

  <!-- 4 Horizontal Pipeline Stages -->
  <g transform="translate(60, 440)">
    ${stages.map((st, i) => {
      const x = i * 275;
      const pt = points[i] ? splitPoint(points[i]) : null;
      const title = pt ? pt.title : st.title;
      const desc = pt ? pt.desc : st.desc;

      return `
        <!-- Stage ${st.num} -->
        <g transform="translate(${x}, 0)" filter="url(#cardShadow)">
          <rect width="255" height="300" rx="14" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
          <rect x="0" y="0" width="255" height="42" rx="14" fill="#eff6ff"/>
          <text x="16" y="27" fill="#1d4ed8" font-size="13" font-weight="900">STAGE ${st.num}</text>
          
          <g transform="translate(16, 65)">
            <text x="0" y="20" fill="#0b172a" font-size="16" font-weight="800">${escapeXml(wrapText(title, 22))}</text>
            <text x="0" y="60" fill="#475569" font-size="13">${escapeXml(wrapText(desc, 44))}</text>
            <text x="0" y="115" fill="#64748b" font-size="12">SLA: 99.95% Deterministic Execution.</text>
          </g>

          <rect x="16" y="235" width="223" height="32" rx="6" fill="#f8fafc" stroke="#e2e8f0"/>
          <text x="127" y="256" fill="#1e40af" font-size="11" font-weight="700" text-anchor="middle">VERIFIED GATEWAY</text>
        </g>

        ${i < 3 ? `
          <!-- Arrow Indicator -->
          <path d="M${x + 258} 150 L${x + 270} 150 M${x + 266} 145 L${x + 271} 150 L${x + 266} 155" stroke="#2563eb" stroke-width="2.5" fill="none"/>
        ` : ''}
      `;
    }).join('')}
  </g>

  <!-- 3 Deep-Dive Architecture Controls -->
  <g transform="translate(60, 780)">
    <text x="0" y="0" fill="#0b172a" font-size="12.5" font-weight="800" letter-spacing="1">CRITICAL OPERATIONAL ENABLERS</text>
    
    ${[1, 2, 3].map((n, idx) => {
      const y = 18 + idx * 105;
      const pt = points[idx] ? splitPoint(points[idx]) : { title: `Pillar 0${n}`, desc: 'Enterprise architecture integration' };
      return `
        <g transform="translate(0, ${y})" filter="url(#cardShadow)">
          <rect width="1080" height="92" rx="12" fill="#ffffff" stroke="#bfdbfe" stroke-width="1"/>
          <circle cx="36" cy="46" r="14" fill="#eff6ff"/>
          <text x="36" y="51" fill="#1d4ed8" font-size="14" font-weight="900" text-anchor="middle">✓</text>
          <text x="64" y="36" fill="#0b172a" font-size="16" font-weight="800">${escapeXml(pt.title)}</text>
          <text x="64" y="62" fill="#475569" font-size="13">${escapeXml(pt.desc)}</text>
        </g>
      `;
    }).join('')}
  </g>
  `;
}

// -------------------------------------------------------------
// LAYOUT 5: DECISION_QUADRANT_MATRIX (2x2 Strategic Decision Map)
// -------------------------------------------------------------
function renderQuadrantMatrixLayout(topic) {
  const points = topic.corePoints.slice(0, 4);
  const p1 = splitPoint(points[0] || 'Uncoordinated Pilot Sprawl');
  const p2 = splitPoint(points[1] || 'Fragile SaaS Wrappers');
  const p3 = splitPoint(points[2] || 'Ungoverned Shadow Risk');
  const p4 = splitPoint(points[3] || 'Sovereign AI Operating Engine');

  return `
  <!-- Top Context Header -->
  <g transform="translate(60, 320)" filter="url(#cardShadow)">
    <rect width="1080" height="90" rx="14" fill="#ffffff" stroke="#bfdbfe" stroke-width="1.5"/>
    <rect x="0" y="0" width="6" height="90" rx="3" fill="#1d4ed8"/>
    <g transform="translate(24, 20)">
      <text x="0" y="16" fill="#1d4ed8" font-size="11" font-weight="800" letter-spacing="1">EXECUTIVE DECISION FRAMEWORK</text>
      <text x="0" y="44" fill="#0b172a" font-size="20" font-weight="900">Navigating Strategic Trade-Offs: Autonomy, Security, and Compounding Value</text>
    </g>
  </g>

  <!-- 2x2 Quadrant Grid -->
  <g transform="translate(60, 440)">
    <!-- Quadrant 1: Top Left (High Effort / Low Autonomy) -->
    <g filter="url(#cardShadow)">
      <rect width="525" height="290" rx="14" fill="#ffffff" stroke="#fecaca" stroke-width="1.5"/>
      <rect x="0" y="0" width="525" height="40" rx="14" fill="#fef2f2"/>
      <text x="20" y="26" fill="#991b1b" font-size="12" font-weight="800">QUADRANT 01: PILOT SPRAWL TRAP</text>

      <g transform="translate(20, 65)">
        <text x="0" y="20" fill="#0b172a" font-size="18" font-weight="800">${escapeXml(wrapText(p1.title, 32))}</text>
        <text x="0" y="55" fill="#475569" font-size="13.5">${escapeXml(wrapText(p1.desc, 55))}</text>
        <text x="0" y="95" fill="#64748b" font-size="12.5">• Fragmented API tokens without centralized FinOps.</text>
        <text x="0" y="120" fill="#64748b" font-size="12.5">• Zero reusable institutional IP across business units.</text>
        <text x="0" y="165" fill="#ef4444" font-size="13" font-weight="700">Outcome: High expenditure with zero balance-sheet impact.</text>
      </g>
    </g>

    <!-- Quadrant 2: Bottom Left (Low Effort / Low Autonomy) -->
    <g transform="translate(0, 310)" filter="url(#cardShadow)">
      <rect width="525" height="290" rx="14" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5"/>
      <rect x="0" y="0" width="525" height="40" rx="14" fill="#f8fafc"/>
      <text x="20" y="26" fill="#475569" font-size="12" font-weight="800">QUADRANT 02: SUPERFICIAL TOOL WRAPPERS</text>

      <g transform="translate(20, 65)">
        <text x="0" y="20" fill="#0b172a" font-size="18" font-weight="800">${escapeXml(wrapText(p2.title, 32))}</text>
        <text x="0" y="55" fill="#475569" font-size="13.5">${escapeXml(wrapText(p2.desc, 55))}</text>
        <text x="0" y="95" fill="#64748b" font-size="12.5">• Handing employees chatbots for personal note-taking.</text>
        <text x="0" y="120" fill="#64748b" font-size="12.5">• 5-10% speedup on writing emails; zero core workflow change.</text>
        <text x="0" y="165" fill="#64748b" font-size="13" font-weight="700">Outcome: Inflated SaaS seats with negligible operational ROI.</text>
      </g>
    </g>

    <!-- Quadrant 3: Bottom Right (High Autonomy / Zero Governance) -->
    <g transform="translate(555, 310)" filter="url(#cardShadow)">
      <rect width="525" height="290" rx="14" fill="#ffffff" stroke="#fed7aa" stroke-width="1.5"/>
      <rect x="0" y="0" width="525" height="40" rx="14" fill="#fff7ed"/>
      <text x="20" y="26" fill="#9a3412" font-size="12" font-weight="800">QUADRANT 03: UNGOVERNED SHADOW AI</text>

      <g transform="translate(20, 65)">
        <text x="0" y="20" fill="#0b172a" font-size="18" font-weight="800">${escapeXml(wrapText(p3.title, 32))}</text>
        <text x="0" y="55" fill="#475569" font-size="13.5">${escapeXml(wrapText(p3.desc, 55))}</text>
        <text x="0" y="95" fill="#64748b" font-size="12.5">• Autonomous agents executing with unconstrained IAM tokens.</text>
        <text x="0" y="120" fill="#64748b" font-size="12.5">• Prompt injection vulnerabilities and regulatory exposure.</text>
        <text x="0" y="165" fill="#d97706" font-size="13" font-weight="700">Outcome: Catastrophic data breach &amp; regulatory non-compliance.</text>
      </g>
    </g>

    <!-- Quadrant 4: Top Right (TARGET - High Autonomy + Sovereign Governance) -->
    <g transform="translate(555, 0)" filter="url(#cardShadow)">
      <rect width="525" height="290" rx="14" fill="url(#darkNavyCard)"/>
      <rect width="525" height="290" rx="14" fill="none" stroke="#60a5fa" stroke-width="2"/>
      <text x="20" y="26" fill="#93c5fd" font-size="12" font-weight="900" letter-spacing="1">TARGET: SOVEREIGN AGENTIC ENTERPRISE</text>

      <g transform="translate(20, 65)">
        <text x="0" y="20" fill="#ffffff" font-size="18" font-weight="900">${escapeXml(wrapText(p4.title, 32))}</text>
        <text x="0" y="55" fill="#cbd5e1" font-size="13.5">${escapeXml(wrapText(p4.desc, 55))}</text>
        <text x="0" y="95" fill="#93c5fd" font-size="12.5">✓ Tripartite memory, deterministic guardrails, and FDE pods.</text>
        <text x="0" y="120" fill="#93c5fd" font-size="12.5">✓ 85%+ task autonomy with complete board auditability.</text>
        
        <rect x="0" y="145" width="485" height="34" rx="6" fill="#1e3a8a"/>
        <text x="242" y="167" fill="#67e8f9" font-size="12.5" font-weight="800" text-anchor="middle">THE TRUSTGRID OPERATING STANDARD</text>
      </g>
    </g>
  </g>

  <!-- Bottom Strategy Summary -->
  <g transform="translate(60, 1060)" filter="url(#cardShadow)">
    <rect width="1080" height="58" rx="10" fill="#ffffff" stroke="#bfdbfe" stroke-width="1"/>
    <text x="24" y="35" fill="#1d4ed8" font-size="13.5" font-weight="800">THE STRATEGIC PRINCIPLE:</text>
    <text x="235" y="35" fill="#0f172a" font-size="13.5" font-weight="600">"Never decouple operational autonomy from deterministic, mathematical governance."</text>
  </g>
  `;
}

// -------------------------------------------------------------
// LAYOUT 6: FINOPS_VALUE_WATERFALL (Economic & Cost Deconstruction)
// -------------------------------------------------------------
function renderFinopsWaterfallLayout(topic) {
  const points = topic.corePoints.slice(0, 4);
  const p1 = splitPoint(points[0] || 'Retail API Rents: Paying retail markups');
  const p2 = splitPoint(points[1] || 'Idle Cloud Silicon: Unused reserved instances');
  const p3 = splitPoint(points[2] || 'Validation Overhead: Manual human reviews');

  return `
  <!-- Top Benchmark Header -->
  <g transform="translate(60, 320)" filter="url(#cardShadow)">
    <rect width="1080" height="90" rx="14" fill="#ffffff" stroke="#bfdbfe" stroke-width="1.5"/>
    <rect x="0" y="0" width="6" height="90" rx="3" fill="#1d4ed8"/>
    <g transform="translate(24, 20)">
      <text x="0" y="16" fill="#1d4ed8" font-size="11" font-weight="800" letter-spacing="1">AI FINOPS &amp; TCO DECONSTRUCTION</text>
      <text x="0" y="44" fill="#0b172a" font-size="20" font-weight="900">How Co-Design, Quantization, and Density Slash 3-Year TCO by 40% to 75%</text>
    </g>
  </g>

  <!-- Section 1: Where 60% of Budget Bleeds (3 Red Cards) -->
  <g transform="translate(60, 435)">
    <text x="0" y="0" fill="#991b1b" font-size="12" font-weight="800" letter-spacing="1">THREE VECTOR LEAKS DESTROYING ENTERPRISE AI MARGINS</text>
    
    ${[p1, p2, p3].map((pt, i) => {
      const x = i * 365;
      return `
        <g transform="translate(${x}, 15)" filter="url(#cardShadow)">
          <rect width="345" height="155" rx="12" fill="#ffffff" stroke="#fecaca" stroke-width="1.5"/>
          <rect x="0" y="0" width="345" height="34" rx="12" fill="#fef2f2"/>
          <text x="16" y="22" fill="#991b1b" font-size="11.5" font-weight="800">LEAK 0${i+1}: COST DESTABILIZER</text>
          
          <g transform="translate(16, 55)">
            <text x="0" y="18" fill="#0b172a" font-size="15.5" font-weight="800">${escapeXml(wrapText(pt.title, 26))}</text>
            <text x="0" y="46" fill="#475569" font-size="13">${escapeXml(wrapText(pt.desc, 44))}</text>
            <text x="0" y="80" fill="#dc2626" font-size="12" font-weight="700">Cost Drag: ~25-35% Capex Waste</text>
          </g>
        </g>
      `;
    }).join('')}
  </g>

  <!-- Transition Divider -->
  <g transform="translate(60, 640)">
    <line x1="0" y1="15" x2="380" y2="15" stroke="#cbd5e1" stroke-width="1"/>
    <rect x="390" y="0" width="300" height="30" rx="15" fill="#eff6ff" stroke="#bfdbfe"/>
    <text x="540" y="20" fill="#1d4ed8" font-size="11.5" font-weight="800" text-anchor="middle">↓ VALUE ENGINEERING RECOVERY ↓</text>
    <line x1="700" y1="15" x2="1080" y2="15" stroke="#cbd5e1" stroke-width="1"/>
  </g>

  <!-- Section 2: 4 Compounding Value Multipliers (2x2 Grid) -->
  <g transform="translate(60, 695)">
    <!-- Lever 1 -->
    <g filter="url(#cardShadow)">
      <rect width="525" height="180" rx="12" fill="#ffffff" stroke="#bfdbfe" stroke-width="1.5"/>
      <circle cx="28" cy="28" r="12" fill="#1d4ed8"/>
      <text x="28" y="33" fill="#ffffff" font-size="12" font-weight="800" text-anchor="middle">✓</text>
      <text x="48" y="33" fill="#0b172a" font-size="16" font-weight="800">Hardware-Software Co-Design (25% Savings)</text>
      
      <g transform="translate(20, 62)">
        <text x="0" y="18" fill="#475569" font-size="13.5">Fusing CUDA kernels and batch sizes to double the useful</text>
        <text x="0" y="38" fill="#475569" font-size="13.5">throughput per physical server without procuring new hardware.</text>
        <text x="0" y="70" fill="#1d4ed8" font-size="12.5" font-weight="700">Metric: Doubles Model FLOPs Utilization (MFU) on existing silicon.</text>
      </g>
    </g>

    <!-- Lever 2 -->
    <g transform="translate(555, 0)" filter="url(#cardShadow)">
      <rect width="525" height="180" rx="12" fill="#ffffff" stroke="#bfdbfe" stroke-width="1.5"/>
      <circle cx="28" cy="28" r="12" fill="#1d4ed8"/>
      <text x="28" y="33" fill="#ffffff" font-size="12" font-weight="800" text-anchor="middle">✓</text>
      <text x="48" y="33" fill="#0b172a" font-size="16" font-weight="800">Domain Model Distillation (35% Savings)</text>
      
      <g transform="translate(20, 62)">
        <text x="0" y="18" fill="#475569" font-size="13.5">Replacing oversized 400B frontier models with domain-fine-tuned</text>
        <text x="0" y="38" fill="#475569" font-size="13.5">8B–14B models running FP8 precision at 5x token speed.</text>
        <text x="0" y="70" fill="#1d4ed8" font-size="12.5" font-weight="700">Metric: Slashes per-token inference expenditure by up to 85%.</text>
      </g>
    </g>

    <!-- Lever 3 -->
    <g transform="translate(0, 195)" filter="url(#cardShadow)">
      <rect width="525" height="180" rx="12" fill="#ffffff" stroke="#bfdbfe" stroke-width="1.5"/>
      <circle cx="28" cy="28" r="12" fill="#1d4ed8"/>
      <text x="28" y="33" fill="#ffffff" font-size="12" font-weight="800" text-anchor="middle">✓</text>
      <text x="48" y="33" fill="#0b172a" font-size="16" font-weight="800">High-Density Hybrid Repatriation (30% Savings)</text>
      
      <g transform="translate(20, 62)">
        <text x="0" y="18" fill="#475569" font-size="13.5">Repatriating steady-state production inference to sovereign,</text>
        <text x="0" y="38" fill="#475569" font-size="13.5">liquid-cooled high-density racks while cloud-bursting irregular peaks.</text>
        <text x="0" y="70" fill="#1d4ed8" font-size="12.5" font-weight="700">Metric: Delivers 1.08 PUE with sovereign data residency.</text>
      </g>
    </g>

    <!-- Lever 4 -->
    <g transform="translate(555, 195)" filter="url(#cardShadow)">
      <rect width="525" height="180" rx="12" fill="#ffffff" stroke="#bfdbfe" stroke-width="1.5"/>
      <circle cx="28" cy="28" r="12" fill="#1d4ed8"/>
      <text x="28" y="33" fill="#ffffff" font-size="12" font-weight="800" text-anchor="middle">✓</text>
      <text x="48" y="33" fill="#0b172a" font-size="16" font-weight="800">Unit Task Financial Attribution</text>
      
      <g transform="translate(20, 62)">
        <text x="0" y="18" fill="#475569" font-size="13.5">Connecting every cognitive token directly to business unit</text>
        <text x="0" y="38" fill="#475569" font-size="13.5">P&amp;L lines and customer margin expansion milestones.</text>
        <text x="0" y="70" fill="#1d4ed8" font-size="12.5" font-weight="700">Metric: 100% financial visibility on corporate general ledger.</text>
      </g>
    </g>
  </g>
  `;
}

// -------------------------------------------------------------
// Helper Functions
// -------------------------------------------------------------
export function determineLayout(topic) {
  if (topic.layoutType) return topic.layoutType;
  const t = (topic.title + ' ' + topic.category).toLowerCase();

  if (t.includes('vs') || t.includes('versus') || t.includes('fraction') || t.includes('more than') || t.includes('adoption vs') || t.includes('rpa to')) {
    return 'BEFORE_AFTER_COMPARISON';
  }
  if (t.includes('stack') || t.includes('layer') || t.includes('architecture') || t.includes('multi-agent architectures') || t.includes('infrastructure security best') || t.includes('quantum-safe defense')) {
    return 'FOUR_TIER_STACK';
  }
  if (t.includes('workflow') || t.includes('lifecycle') || t.includes('roadmap') || t.includes('pipeline') || t.includes('evolution') || t.includes('operations explained') || t.includes('predictive operations')) {
    return 'WORKFLOW_PIPELINE';
  }
  if (t.includes('matrix') || t.includes('governance framework') || t.includes('threat model') || t.includes('compliance') || t.includes('readiness') || t.includes('operating model') || t.includes('convergence')) {
    return 'DECISION_QUADRANT_MATRIX';
  }
  if (t.includes('economics') || t.includes('tco') || t.includes('roi') || t.includes('finops') || t.includes('waste') || t.includes('cost') || t.includes('value engineering') || t.includes('attribution')) {
    return 'FINOPS_VALUE_WATERFALL';
  }
  return 'DIAGNOSTIC_MATRIX';
}

function getContextTags(topic) {
  const cat = topic.category.toLowerCase();
  if (cat.includes('infrastructure') || cat.includes('gpu')) {
    return 'CUDA KERNEL FUSION • ROCEV2 FABRIC • DIRECT-TO-CHIP';
  }
  if (cat.includes('agentic') || cat.includes('operations')) {
    return 'AUTONOMOUS SWARMS • TRIPARTITE MEMORY • ZERO-TRUST IAM';
  }
  if (cat.includes('networking')) {
    return 'ROCEV2 LOSSLESS FABRICS • INFINIBAND • 800G RAIL-OPTIMIZED';
  }
  if (cat.includes('cybersecurity') || cat.includes('quantum')) {
    return 'ZERO-TRUST SANDBOX • POST-QUANTUM DEFENSE • CBOM';
  }
  if (cat.includes('governance')) {
    return 'EU AI ACT • NIST AI RMF • SHAP/LIME EXPLAINABILITY';
  }
  if (cat.includes('economics')) {
    return 'AI FINOPS • UNIT TASK ECONOMICS • 40-75% TCO REDUCTION';
  }
  return 'FULL-STACK SYSTEMS RIGOR • DETERMINISTIC SLAS • SOVEREIGN IP';
}

function renderHeadline(headline) {
  // Split headline for two-tone presentation
  const words = headline.split(' ');
  if (words.length <= 4) {
    return `
      <text x="0" y="42" fill="#0b172a" font-size="39" font-weight="900" letter-spacing="-0.8">
        ${words.slice(0, 2).join(' ')} <tspan fill="#1d4ed8" text-decoration="underline" style="text-underline-offset: 6px;">${words.slice(2).join(' ')}</tspan>
      </text>
    `;
  }
  const mid = Math.ceil(words.length / 2);
  const line1 = words.slice(0, mid).join(' ');
  const line2First = words.slice(mid, mid + 2).join(' ');
  const line2Rest = words.slice(mid + 2).join(' ');

  return `
    <text x="0" y="42" fill="#0b172a" font-size="38" font-weight="900" letter-spacing="-0.8">
      ${escapeXml(line1)}
    </text>
    <text x="0" y="88" font-size="38" font-weight="900" letter-spacing="-0.8">
      <tspan fill="#1d4ed8" text-decoration="underline" style="text-underline-offset: 6px;">${escapeXml(line2First)}</tspan><tspan fill="#0b172a"> ${escapeXml(line2Rest)}</tspan>
    </text>
  `;
}

function splitPoint(pt) {
  const parts = pt.split(':');
  if (parts.length > 1) {
    return {
      title: parts[0].trim(),
      desc: parts.slice(1).join(':').trim()
    };
  }
  return {
    title: pt.trim(),
    desc: 'Deterministic enterprise systems execution.'
  };
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
  if (!text) return '';
  if (text.length <= maxChars) return text;
  const sub = text.substring(0, maxChars);
  const lastSpace = sub.lastIndexOf(' ');
  return (lastSpace > 0 ? sub.substring(0, lastSpace) : sub) + '...';
}
