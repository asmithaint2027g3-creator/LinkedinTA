import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { strategyTopics } from './data/cat01-strategy.js';
import { infrastructureTopics } from './data/cat02-infrastructure.js';
import { gpuTopics } from './data/cat03-gpu.js';
import { agenticTopics } from './data/cat04-agentic.js';
import { operationsTopics } from './data/cat05-operations.js';
import { networkingTopics } from './data/cat06-networking.js';
import { cybersecurityTopics } from './data/cat07-cybersecurity.js';
import { quantumTopics } from './data/cat08-quantum.js';
import { governanceTopics } from './data/cat09-governance.js';
import { economicsTopics } from './data/cat10-economics.js';
import { trendsTopics } from './data/cat11-trends.js';
import { generateSvgForTopic } from './svg-generator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const ALL_TOPICS = [
  ...strategyTopics,
  ...infrastructureTopics,
  ...gpuTopics,
  ...agenticTopics,
  ...operationsTopics,
  ...networkingTopics,
  ...cybersecurityTopics,
  ...quantumTopics,
  ...governanceTopics,
  ...economicsTopics,
  ...trendsTopics
];

console.log(`\n======================================================`);
console.log(`TrustGrid.AI LinkedIn Content Library Generator`);
console.log(`======================================================`);
console.log(`Total topics loaded: ${ALL_TOPICS.length}`);

// Validation Check
const imgTopics = ALL_TOPICS.filter(t => t.format === 'IMG');
const txtTopics = ALL_TOPICS.filter(t => t.format === 'TXT');
console.log(`Format breakdown: ${imgTopics.length} Image-Based, ${txtTopics.length} Text-Based`);

if (ALL_TOPICS.length !== 100 || imgTopics.length !== 60 || txtTopics.length !== 40) {
  console.error(`FATAL: Verification failed! Must be 100 total, 60 IMG, 40 TXT.`);
  process.exit(1);
}

// 1. Generate individual template folders & files
let generatedFolders = 0;
let generatedSvgs = 0;
let generatedBriefs = 0;
let generatedPosts = 0;

for (const topic of ALL_TOPICS) {
  const folderPath = path.join(rootDir, 'templates', topic.categoryFolder, topic.slug);
  fs.mkdirSync(folderPath, { recursive: true });
  generatedFolders++;

  // 1. post.md
  const postContent = buildPostMarkdown(topic);
  fs.writeFileSync(path.join(folderPath, 'post.md'), postContent, 'utf8');
  generatedPosts++;

  // 2. metadata.json
  const metadata = {
    topicId: topic.id,
    slug: topic.slug,
    title: topic.title,
    category: topic.category,
    categoryFolder: topic.categoryFolder,
    format: topic.format,
    targetAudience: topic.targetAudience,
    readerProblem: topic.readerProblem,
    funnelStage: topic.funnelStage,
    series: topic.series,
    suggestedPublishingDay: topic.suggestedPublishingDay,
    primaryCta: topic.primaryCta,
    ctaUrl: topic.ctaUrl,
    hashtags: topic.hashtags,
    verificationStatus: `Verified with TrustGrid.AI ${topic.category} practice`
  };
  fs.writeFileSync(path.join(folderPath, 'metadata.json'), JSON.stringify(metadata, null, 2), 'utf8');

  // 3. For Image-based topics only: visual-brief.md & visual.svg
  if (topic.format === 'IMG') {
    const briefContent = buildVisualBriefMarkdown(topic);
    fs.writeFileSync(path.join(folderPath, 'visual-brief.md'), briefContent, 'utf8');
    generatedBriefs++;

    const svgPath = path.join(folderPath, 'visual.svg');
    const svgContent = generateSvgForTopic(topic);
    fs.writeFileSync(svgPath, svgContent, 'utf8');
    generatedSvgs++;
  } else {
    // For text-based: ensure no rogue svg or brief exists
    const rogueBrief = path.join(folderPath, 'visual-brief.md');
    const rogueSvg = path.join(folderPath, 'visual.svg');
    if (fs.existsSync(rogueBrief)) fs.unlinkSync(rogueBrief);
    if (fs.existsSync(rogueSvg)) fs.unlinkSync(rogueSvg);
  }
}

console.log(`\nGenerated ${generatedFolders} folders.`);
console.log(`Authored ${generatedPosts} post.md files.`);
console.log(`Generated ${generatedBriefs} visual-brief.md files.`);
console.log(`Rendered ${generatedSvgs} visual.svg files.`);

// 2. Generate content-calendar.csv
const calendarCsv = buildContentCalendarCsv(ALL_TOPICS);
fs.writeFileSync(path.join(rootDir, 'publishing', 'content-calendar.csv'), calendarCsv, 'utf8');
console.log(`Created publishing/content-calendar.csv`);

// 3. Generate publishing-guidelines.md
const guidelinesMd = buildPublishingGuidelinesMd();
fs.writeFileSync(path.join(rootDir, 'publishing', 'publishing-guidelines.md'), guidelinesMd, 'utf8');
console.log(`Created publishing/publishing-guidelines.md`);

// 4. Generate templates-data.js for standalone gallery
const templatesDataJs = buildTemplatesDataJs(ALL_TOPICS);
fs.writeFileSync(path.join(rootDir, 'templates-data.js'), templatesDataJs, 'utf8');
console.log(`Compiled templates-data.js for standalone gallery.`);

console.log(`\nGeneration completed successfully! All 100 templates ready.`);

// --- Helper Functions ---

function buildPostMarkdown(topic) {
  const points = topic.corePoints.map((pt, i) => `${i + 1}. ${pt}`).join('\n\n');
  const hashtags = topic.hashtags.join(' ');
  return `${topic.hook}

${topic.problemStatement}

${points}

${topic.takeaway}

---
→ ${topic.primaryCta}: ${topic.ctaUrl}

${hashtags}
`;
}

function buildVisualBriefMarkdown(topic) {
  const points = topic.corePoints.map((pt, i) => `  ${i + 1}. ${pt}`).join('\n');
  return `# Visual Brief: ${topic.title}

## 1. Visual Purpose
To provide high-authority visual clarity on ${topic.title.toLowerCase()}, illustrating the architectural distinction between unoptimized or legacy enterprise approaches and TrustGrid's verified high-density systems engineering.

## 2. Image Headline & Sub-headline
- **Headline**: ${topic.svgHeadline || topic.title.toUpperCase()}
- **Sub-headline**: ${topic.svgSub || topic.readerProblem}

## 3. Visual Content Hierarchy
- **Header Plate**: TrustGrid.AI Logo + Category Pill (\`${topic.category.toUpperCase()}\`) + Topic ID (\`#${String(topic.id).padStart(3, '0')}\`)
- **Core Architecture Cards**:
${points}
- **Takeaway Rule Banner**: "${topic.takeaway}"
- **Footer**: TrustGrid Engineering Services CTA + trustgrid.ai domain signature

## 4. Design Specifications
- **Dimensions**: 1080 × 1350 px (Portrait 4:5)
- **Palette**: Deep Obsidian/Navy (#080C14, #0F172A), Electric Cyan (#0284C7, #38BDF8), Emerald Trust (#059669, #10B981), Slate (#1E293B, #94A3B8), Polar White (#F8FAFC)
- **Typography**: Clean Enterprise Sans-Serif (Inter / System-UI)
- **Alt Text**: Technical architecture and comparison infographic by TrustGrid.AI illustrating ${topic.title.toLowerCase()} across enterprise data center and autonomous systems operations.
`;
}

function buildContentCalendarCsv(topics) {
  const headers = [
    'Topic_ID',
    'Title',
    'Category',
    'Format',
    'Target_Audience',
    'Funnel_Stage',
    'Series',
    'Suggested_Day',
    'Primary_CTA',
    'CTA_URL',
    'Verification_Status'
  ];

  const rows = topics.map(t => {
    return [
      t.id,
      `"${t.title.replace(/"/g, '""')}"`,
      `"${t.category.replace(/"/g, '""')}"`,
      t.format,
      `"${t.targetAudience.replace(/"/g, '""')}"`,
      `"${t.funnelStage.replace(/"/g, '""')}"`,
      `"${(t.series || '').replace(/"/g, '""')}"`,
      t.suggestedPublishingDay || 'Monday',
      `"${t.primaryCta.replace(/"/g, '""')}"`,
      t.ctaUrl,
      `"Verified with TrustGrid.AI ${t.category.replace(/"/g, '""')} practice"`
    ].join(',');
  });

  return [headers.join(','), ...rows].join('\n');
}

function buildPublishingGuidelinesMd() {
  return `# TrustGrid.AI — LinkedIn Publishing & Distribution Guidelines

## 1. Publishing Strategy & Cadence
To build compounding enterprise authority without saturating your audience, publish **3 to 4 times per week** following our established recurring weekly series:

| Day | Recurring Series | Core Theme | Target Persona |
| :--- | :--- | :--- | :--- |
| **Monday** | *Agentic Enterprise Mondays* | Autonomous systems, multi-agent swarms, operational friction | COOs, Heads of Automation & Operations |
| **Tuesday** | *AI Leadership Briefing* | Executive decisions, operating models, board strategy | CEOs, CIOs, Board Directors, Transformation Leads |
| **Wednesday** | *AI Value Engineering* | FinOps, TCO reduction, unit economics, financial attribution | CFOs, Finance Directors, Capital Committees |
| **Thursday** | *Trust & Governance Thursdays* | Security, EU AI Act, NIST AI RMF, post-quantum cryptography | CISOs, Risk Officers, General Counsels |
| **Friday** | *AI Factory Fridays* | High-density infrastructure, GPUs, liquid cooling, networking | CTOs, Data Center Leaders, ML Platform Architects |

---

## 2. Formatting & Optimization for LinkedIn Algorithm
1. **The Critical First 2 Lines (The Hook)**:
   - LinkedIn truncates post text after approximately 140–210 characters with "...see more".
   - Never waste the opening lines on greetings ("Happy Monday!"), emojis, or generic statements ("AI is moving fast").
   - Open with an executive tension point, counter-intuitive metric, or direct operational reality check.
2. **Whitespace & Readability**:
   - Keep paragraphs to 1–2 sentences max.
   - Use numbered lists or bulleted dashes for multi-point architectural frameworks.
   - Separate takeaways with subtle horizontal dividers (\`---\`).
3. **Hashtag Best Practices**:
   - Place 3 to 5 relevant hashtags at the very bottom.
   - Use a consistent mix of broad industry tags (\`#EnterpriseAI\`, \`#CIO\`) and specialized practice tags (\`#GPUOptimization\`, \`#RoCEv2\`, \`#TrustGrid\`).
4. **Image Upload Specifications**:
   - For image-based posts, upload the corresponding \`visual.svg\` (or high-res PNG export).
   - Use the pre-written **Alt Text** from \`visual-brief.md\` to guarantee accessibility and search visibility.
   - Ensure the image aspect ratio is 4:5 (1080 × 1350 px), which occupies the maximum vertical screen real estate on mobile feeds.

---

## 3. Lead Qualification & Engagement Playbook
- **First 60 Minutes**: Respond to all comments within the first hour of posting to stimulate LinkedIn feed algorithmic velocity.
- **Peer Dialogue**: Engage thoughtfully with technical counter-arguments; avoid defensive corporate PR responses.
- **Inbound Lead Routing**:
  - When prospects comment or direct-message asking about cluster diagnostics, route them directly to TrustGrid's 48-Hour AI Infrastructure Diagnostic.
  - When prospects inquire about agentic operations, offer an executive architecture briefing with TrustGrid Forward Deployed Engineers.
`;
}

function buildTemplatesDataJs(topics) {
  const data = topics.map(t => {
    const postMd = buildPostMarkdown(t);
    const briefMd = t.format === 'IMG' ? buildVisualBriefMarkdown(t) : null;
    const svgRelPath = t.format === 'IMG' ? `templates/${t.categoryFolder}/${t.slug}/visual.svg` : null;

    return {
      id: t.id,
      slug: t.slug,
      title: t.title,
      category: t.category,
      categoryFolder: t.categoryFolder,
      format: t.format,
      targetAudience: t.targetAudience,
      readerProblem: t.readerProblem,
      funnelStage: t.funnelStage,
      series: t.series || 'AI Briefing',
      suggestedPublishingDay: t.suggestedPublishingDay || 'Monday',
      primaryCta: t.primaryCta,
      ctaUrl: t.ctaUrl,
      hashtags: t.hashtags,
      postMarkdown: postMd,
      visualBriefMarkdown: briefMd,
      svgPath: svgRelPath,
      hook: t.hook,
      takeaway: t.takeaway
    };
  });

  return `// Master templates data for TrustGrid.AI LinkedIn Gallery
// Exactly 100 topics (60 Image-Based, 40 Text-Based)
window.TEMPLATES_DATA = ${JSON.stringify(data, null, 2)};
`;
}
