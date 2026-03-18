/* ============================================================
   SalesIntel AI — Application Logic
   GTM Intelligence Platform
   ============================================================ */

// ── MOCK DATA ───────────────────────────────────────────────

const PIPELINE_STATS = [
  { label: 'Total Pipeline', value: '₹4.2 Cr', change: '+12%', direction: 'up', cls: 'blue' },
  { label: 'Deals at Risk', value: '3', change: '+2 this week', direction: 'down', cls: 'amber' },
  { label: 'Avg Deal Size', value: '₹35L', change: '+8%', direction: 'up', cls: 'green' },
  { label: 'Win Rate (MTD)', value: '42%', change: '-3%', direction: 'down', cls: 'purple' },
];

const DEALS = [
  // Discovery
  { id: 1, name: 'Zomato Payments Revamp', company: 'Zomato', amount: '₹75L', days: 5, stage: 'discovery', health: 'hot' },
  { id: 2, name: 'Swiggy Checkout Flow', company: 'Swiggy', amount: '₹52L', days: 3, stage: 'discovery', health: 'hot' },
  { id: 3, name: 'Nykaa UPI Integration', company: 'Nykaa', amount: '₹28L', days: 8, stage: 'discovery', health: 'warm' },
  // Qualification
  { id: 4, name: 'PhonePe Merchant Suite', company: 'PhonePe', amount: '₹1.2Cr', days: 12, stage: 'qualification', health: 'warm' },
  { id: 5, name: 'CRED Subscriptions', company: 'CRED', amount: '₹45L', days: 18, stage: 'qualification', health: 'cold', alert: 'No response in 18 days' },
  // Proposal
  { id: 6, name: 'Groww Payout Engine', company: 'Groww', amount: '₹90L', days: 7, stage: 'proposal', health: 'hot' },
  { id: 7, name: 'Lenskart B2B Gateway', company: 'Lenskart', amount: '₹38L', days: 22, stage: 'proposal', health: 'cold', alert: 'Champion left the company' },
  { id: 8, name: 'Urban Company QR', company: 'Urban Company', amount: '₹32L', days: 4, stage: 'proposal', health: 'warm' },
  // Negotiation
  { id: 9, name: 'Dream11 Wallet System', company: 'Dream11', amount: '₹1.5Cr', days: 2, stage: 'negotiation', health: 'hot' },
  { id: 10, name: 'Ola Fleet Payments', company: 'Ola', amount: '₹65L', days: 25, stage: 'negotiation', health: 'cold', alert: 'Budget freeze reported' },
  { id: 11, name: 'Meesho Escrow', company: 'Meesho', amount: '₹42L', days: 6, stage: 'negotiation', health: 'warm' },
  { id: 12, name: 'Zepto Quick Pay', company: 'Zepto', amount: '₹55L', days: 3, stage: 'negotiation', health: 'hot' },
];

const STAGES = [
  { key: 'discovery', title: 'Discovery' },
  { key: 'qualification', title: 'Qualification' },
  { key: 'proposal', title: 'Proposal' },
  { key: 'negotiation', title: 'Negotiation' },
];

const SAMPLE_TRANSCRIPTS = [
  {
    title: 'Discovery Call — Zomato',
    notes: `Call with Rahul Mehta (VP Engineering, Zomato) — March 15, 2026

Opening: Rahul opened by saying their current payments stack is "held together with duct tape." They process 2M+ orders daily and need sub-200ms checkout latency.

Pain Points Discussed:
- Current provider has 3.2% failure rate on UPI, costing them ₹12Cr annually
- No real-time dashboards — they find out about outages from Twitter
- Manual reconciliation takes 4-person team 2 days per month
- Cross-border tipping for delivery partners still not supported

Interest Level: Very high. Rahul asked for a technical deep-dive next week and wants to loop in their CTO.

Competitors Mentioned: They evaluated Stripe India but found pricing "aggressive." Paytm PG was unreliable.

Timeline: Q2 FY26 migration window. Budget already approved at board level.

Red Flags: None. They came to us — inbound from a conference talk.

Next Steps: Schedule technical deep-dive for March 22. Share API sandbox credentials. Send case study from BigBasket migration.`,

    summary: {
      overview: 'High-intent discovery call with Zomato VP Engineering. They need a payments infrastructure overhaul to handle 2M+ daily orders with sub-200ms latency. Current provider has 3.2% UPI failure rate.',
      sentiment: { score: 88, label: 'Very Positive', cls: 'positive' },
      keyTopics: ['UPI failure rates', 'Real-time monitoring', 'Reconciliation automation', 'Cross-border tipping'],
      actions: [
        { icon: '📅', text: 'Schedule technical deep-dive for March 22 with CTO' },
        { icon: '🔑', text: 'Share API sandbox credentials with Rahul' },
        { icon: '📄', text: 'Send BigBasket migration case study' },
        { icon: '💰', text: 'Prepare ROI analysis: ₹12Cr savings on UPI failures' },
      ]
    }
  },
  {
    title: 'Pricing Negotiation — Dream11',
    notes: `Call with Priya Sharma (Head of Payments, Dream11) — March 14, 2026

Context: Follow-up on proposal sent 2 weeks ago. Dream11 processes ₹500Cr+ during IPL season.

Pricing Discussion:
- They want volume-based pricing, expecting 50M transactions/month during IPL
- Current Razorpay rate: 2% — they want 1.6% for commitment
- Willing to sign 3-year contract but want price lock guarantee
- Requested waiver on setup fees (₹25L) given deal size

Concerns Raised:
- Escrow compliance for fantasy sports regulations — need legal review
- Disaster recovery SLA — they want 99.99% uptime guarantee
- Custom wallet system needs to white-labeled

Positive Signals: Priya said "we want to close this before IPL starts" (March 28)

Blockers: Legal team needs to approve fantasy sports escrow structure. CFO wants board presentation first.

Next Steps: Send revised pricing with volume tiers. Loop in legal for escrow compliance. Prepare board-ready deck.`,

    summary: {
      overview: 'Active pricing negotiation with Dream11. Deal value ₹1.5Cr+ annually. They want volume-based pricing at 1.6% for 50M transactions/month. Strong urgency to close before IPL season starts March 28.',
      sentiment: { score: 72, label: 'Positive', cls: 'positive' },
      keyTopics: ['Volume pricing', 'Fantasy sports escrow', 'Uptime SLA', 'White-label wallet'],
      actions: [
        { icon: '💰', text: 'Send revised pricing with 3-tier volume structure' },
        { icon: '⚖️', text: 'Loop in legal team for fantasy sports escrow compliance' },
        { icon: '📊', text: 'Prepare board-ready presentation for Dream11 CFO' },
        { icon: '⏰', text: 'Set internal deadline: close by March 25 (before IPL)' },
      ]
    }
  },
  {
    title: 'Technical Review — Groww',
    notes: `Call with Amit Jain (CTO, Groww) and Dev Team — March 13, 2026

Technical Deep-Dive Topics:
- Reviewed our Payout Engine architecture with their team of 6 engineers
- Discussed batch payout processing — they do 100K+ investor payouts daily
- Concern about IMPS vs NEFT fallback logic for failed transactions
- Wanted to see webhook reliability data — we shared 99.97% delivery rate

Integration Questions:
- Can we support their custom reconciliation format? (They use Protobuf)
- Need sub-30s settlement confirmation for mutual fund transactions
- Want dedicated account infrastructure (not shared tenant)
- UPI Autopay mandate management for SIP collections

Performance Testing:
- Amit wants to run a load test with 50K concurrent payouts
- We agreed to set up a staging environment with production-scale data

Concerns:
- Previous bad experience with vendor lock-in — want easy off-ramp
- Data residency requirements — all data must stay in India

Positive: Their CTO said "architecturally this is the cleanest API we've seen"

Next Steps: Share staging environment access. Provide Protobuf adapter documentation. Schedule load testing window.`,

    summary: {
      overview: 'Deep technical review with Groww CTO and 6-person engineering team. Focus on Payout Engine for 100K+ daily investor payouts. CTO praised API architecture. Key concerns around data residency and vendor lock-in.',
      sentiment: { score: 80, label: 'Positive', cls: 'positive' },
      keyTopics: ['Batch payouts', 'IMPS/NEFT fallback', 'Protobuf integration', 'UPI Autopay', 'Data residency'],
      actions: [
        { icon: '🔧', text: 'Set up staging environment with production-scale data' },
        { icon: '📄', text: 'Share Protobuf adapter documentation' },
        { icon: '🧪', text: 'Schedule load testing window for 50K concurrent payouts' },
        { icon: '📋', text: 'Draft data residency compliance document (India-only)' },
      ]
    }
  }
];

const FORECAST_DATA = {
  Q1: {
    stats: [
      { label: 'Forecast Revenue', value: '₹2.8 Cr', change: 'CI: ₹2.2Cr — ₹3.4Cr', direction: 'up', cls: 'blue' },
      { label: 'Committed', value: '₹1.6 Cr', change: '57% of forecast', direction: 'up', cls: 'green' },
      { label: 'Best Case', value: '₹3.4 Cr', change: '90th percentile', direction: 'up', cls: 'purple' },
      { label: 'Confidence', value: '68%', change: 'Medium-high', direction: 'up', cls: 'amber' },
    ],
    bars: [
      { label: 'Enterprise', low: 40, mid: 65, high: 85 },
      { label: 'Mid-Market', low: 30, mid: 50, high: 70 },
      { label: 'SMB', low: 20, mid: 35, high: 50 },
      { label: 'Expansion', low: 25, mid: 45, high: 60 },
    ],
    donut: { won: 35, pipeline: 40, risk: 25, confidence: 68 }
  },
  Q2: {
    stats: [
      { label: 'Forecast Revenue', value: '₹3.5 Cr', change: 'CI: ₹2.8Cr — ₹4.2Cr', direction: 'up', cls: 'blue' },
      { label: 'Committed', value: '₹1.1 Cr', change: '31% of forecast', direction: 'up', cls: 'green' },
      { label: 'Best Case', value: '₹4.2 Cr', change: '90th percentile', direction: 'up', cls: 'purple' },
      { label: 'Confidence', value: '52%', change: 'Medium', direction: 'down', cls: 'amber' },
    ],
    bars: [
      { label: 'Enterprise', low: 50, mid: 75, high: 95 },
      { label: 'Mid-Market', low: 25, mid: 45, high: 65 },
      { label: 'SMB', low: 15, mid: 30, high: 45 },
      { label: 'Expansion', low: 35, mid: 55, high: 75 },
    ],
    donut: { won: 20, pipeline: 50, risk: 30, confidence: 52 }
  },
  Q3: {
    stats: [
      { label: 'Forecast Revenue', value: '₹4.1 Cr', change: 'CI: ₹3.2Cr — ₹5.0Cr', direction: 'up', cls: 'blue' },
      { label: 'Committed', value: '₹0.8 Cr', change: '20% of forecast', direction: 'down', cls: 'green' },
      { label: 'Best Case', value: '₹5.0 Cr', change: '90th percentile', direction: 'up', cls: 'purple' },
      { label: 'Confidence', value: '38%', change: 'Low-medium', direction: 'down', cls: 'amber' },
    ],
    bars: [
      { label: 'Enterprise', low: 45, mid: 70, high: 90 },
      { label: 'Mid-Market', low: 35, mid: 55, high: 75 },
      { label: 'SMB', low: 20, mid: 40, high: 55 },
      { label: 'Expansion', low: 30, mid: 50, high: 70 },
    ],
    donut: { won: 12, pipeline: 55, risk: 33, confidence: 38 }
  },
  Q4: {
    stats: [
      { label: 'Forecast Revenue', value: '₹5.2 Cr', change: 'CI: ₹3.8Cr — ₹6.5Cr', direction: 'up', cls: 'blue' },
      { label: 'Committed', value: '₹0.4 Cr', change: '8% of forecast', direction: 'down', cls: 'green' },
      { label: 'Best Case', value: '₹6.5 Cr', change: '90th percentile', direction: 'up', cls: 'purple' },
      { label: 'Confidence', value: '24%', change: 'Low', direction: 'down', cls: 'amber' },
    ],
    bars: [
      { label: 'Enterprise', low: 55, mid: 80, high: 100 },
      { label: 'Mid-Market', low: 40, mid: 60, high: 80 },
      { label: 'SMB', low: 25, mid: 45, high: 60 },
      { label: 'Expansion', low: 40, mid: 65, high: 85 },
    ],
    donut: { won: 5, pipeline: 60, risk: 35, confidence: 24 }
  },
};

const DRAFTER_DEALS = [
  {
    id: 1, name: 'Zomato Payments Revamp', company: 'Zomato', contact: 'rahul.mehta@zomato.com',
    subject: 'Re: Technical Deep-Dive — Razorpay Payments Migration',
    email: `Hi Rahul,

Thanks for taking the time for our discovery call today — it's clear that Zomato's payments infrastructure needs match what we've built for high-scale commerce.

Here's a quick recap of what we discussed:

📌 Key Takeaways:
• Your 3.2% UPI failure rate is costing ₹12Cr annually — our Smart Routing engine has brought this down to <0.8% for similar merchants
• Real-time monitoring dashboards will replace the current gap where outages are discovered via Twitter
• Our auto-reconciliation will free up your 4-person team from the 2-day monthly process

🔜 Next Steps:
1. I've provisioned API sandbox credentials — you'll receive an invite shortly
2. Technical deep-dive scheduled for March 22 with your CTO
3. Attached: BigBasket migration case study (3.1% → 0.7% failure rate)

Would it help if I also prepared an ROI analysis showing projected savings on UPI failure rates? Happy to have that ready for the technical session.

Looking forward to working together on this.

Best regards,
Sarvesh K.
GTM AI Builder, Razorpay`
  },
  {
    id: 2, name: 'Dream11 Wallet System', company: 'Dream11', contact: 'priya.sharma@dream11.com',
    subject: 'Re: Revised Pricing & Compliance — Fantasy Sports Escrow',
    email: `Hi Priya,

Great speaking with you about Dream11's payment needs. The IPL urgency is clear, and I want to make sure we're aligned to close before March 28.

Here's the updated pricing framework:

💰 Volume-Based Pricing:
• Tier 1 (0–10M txns): 1.9%
• Tier 2 (10M–30M txns): 1.75%
• Tier 3 (30M+ txns): 1.6% ✅
• Setup fee: Waived (given 3-year commitment)

⚖️ On the escrow compliance:
Our legal team is reviewing the fantasy sports escrow structure. I've looped in our Head of Compliance, and you should expect a preliminary assessment by March 20.

📊 Board Presentation:
I'm preparing a board-ready deck covering:
• Uptime SLA guarantee (99.99%)
• White-label wallet architecture
• Volume pricing comparison vs. current provider

Can we schedule a 15-minute prep call before your board meeting to align on messaging?

Best regards,
Sarvesh K.
GTM AI Builder, Razorpay`
  },
  {
    id: 3, name: 'Groww Payout Engine', company: 'Groww', contact: 'amit.jain@groww.in',
    subject: 'Re: Load Testing Setup & Protobuf Integration Docs',
    email: `Hi Amit,

Appreciate the thorough technical review yesterday — your team's questions showed exactly the kind of engineering rigor we love working with.

As promised, here are the follow-ups:

🔧 Staging Environment:
• Your dedicated staging instance is provisioned: staging.razorpay.com/groww
• Pre-loaded with production-scale test data (100K+ mock payouts)
• IMPS/NEFT fallback logic is enabled with configurable retry windows

📄 Documentation:
• Protobuf adapter guide: docs.razorpay.com/protobuf-integration
• Webhook reliability dashboard access (99.97% delivery rate)
• UPI Autopay mandate management API reference

🧪 Load Testing:
Proposed window: March 25–26, 2pm–5pm IST
• 50K concurrent payout simulation as discussed
• Real-time monitoring dashboard will be shared with your team

📋 Data Residency:
Our entire infrastructure is hosted in AWS Mumbai & Hyderabad regions. Attached is our data residency compliance document — happy to have our security team walk through it.

Let me know if March 25 works for the load test!

Best,
Sarvesh K.
GTM AI Builder, Razorpay`
  },
  {
    id: 4, name: 'CRED Subscriptions', company: 'CRED', contact: 'vikram.singh@cred.club',
    subject: 'Checking In — Razorpay Subscription Payment Setup',
    email: `Hi Vikram,

I hope you're doing well. It's been about 18 days since our last conversation about CRED's subscription payment infrastructure, and I wanted to check in.

I understand priorities shift, but I wanted to share a quick update on our end:

🆕 What's New Since We Last Spoke:
• We've launched a new Subscription Analytics Dashboard that gives real-time visibility into churn, recovery rates, and revenue cohorts
• Our Smart Retry engine now recovers 34% of failed subscription renewals automatically
• New mandate flow reduces UPI Autopay setup friction by 40%

These features were built for exactly the use case you described — managing millions of CRED subscription renewals with minimal manual intervention.

Would it be helpful to schedule a quick 20-minute demo? I can show you the new dashboard and how it maps to your specific requirements.

No pressure at all — just want to make sure you have the latest information as you evaluate options.

Best regards,
Sarvesh K.
GTM AI Builder, Razorpay`
  },
];

const ANALYSIS_STATS = [
  { label: 'Deals Analyzed', value: '148', change: 'Last 6 months', direction: 'up', cls: 'blue' },
  { label: 'Overall Win Rate', value: '42%', change: '-3% vs prev quarter', direction: 'down', cls: 'green' },
  { label: 'Avg Cycle (Won)', value: '34 days', change: '-5 days improvement', direction: 'up', cls: 'amber' },
  { label: 'Patterns Found', value: '8', change: 'AI-detected', direction: 'up', cls: 'purple' },
];

const WIN_RATES = [
  { name: 'Enterprise (₹1Cr+)', rate: 38, type: 'win' },
  { name: 'Mid-Market (₹30L–1Cr)', rate: 52, type: 'win' },
  { name: 'SMB (₹5L–30L)', rate: 61, type: 'win' },
  { name: 'Fintech Vertical', rate: 55, type: 'win' },
  { name: 'E-commerce Vertical', rate: 47, type: 'win' },
  { name: 'SaaS Vertical', rate: 39, type: 'win' },
];

const CYCLE_DURATIONS = [
  { name: 'Won Deals', rate: 68, type: 'win', display: '34 days avg' },
  { name: 'Lost Deals', rate: 88, type: 'loss', display: '44 days avg' },
  { name: 'Enterprise', rate: 96, type: 'loss', display: '52 days avg' },
  { name: 'Mid-Market', rate: 60, type: 'win', display: '28 days avg' },
  { name: 'SMB', rate: 40, type: 'win', display: '18 days avg' },
];

const PATTERNS = [
  { icon: '🏆', title: 'Multi-threading wins', desc: 'Deals with 3+ stakeholders engaged have 2.4x higher win rate.', impact: '+67% win rate', impactCls: 'up' },
  { icon: '⏰', title: 'Speed kills (positively)', desc: 'Responding within 2 hours to pricing queries doubles close rate.', impact: '+98% close rate', impactCls: 'up' },
  { icon: '📉', title: 'Ghost after proposal', desc: '38% of losses had zero contact 7+ days after proposal sent.', impact: '38% of losses', impactCls: 'down' },
  { icon: '🎯', title: 'POC converts', desc: 'Deals that include a proof-of-concept win at 74% vs 31% without.', impact: '+139% win rate', impactCls: 'up' },
  { icon: '💔', title: 'Champion departure', desc: '22% of lost deals involved the champion leaving mid-cycle.', impact: '22% of losses', impactCls: 'down' },
  { icon: '📞', title: 'Discovery depth matters', desc: 'Calls over 30min in discovery correlate with 58% win rate vs 29%.', impact: '+100% win rate', impactCls: 'up' },
];

const CRM_CONTACTS = [
  {
    name: 'Rahul Mehta', company: 'Zomato', role: 'VP Engineering',
    before: { email: 'rahul@zomato.com', phone: '—', linkedin: '—', funding: '—', techStack: '—', employees: '—' },
    after: { email: 'rahul@zomato.com', phone: '+91 98xxxxxx90', linkedin: 'linkedin.com/in/rahulmehta', funding: 'Series J ($1.7B)', techStack: 'React, Go, K8s', employees: '4,500+' },
  },
  {
    name: 'Priya Sharma', company: 'Dream11', role: 'Head of Payments',
    before: { email: 'priya.s@dream11.com', phone: '—', linkedin: '—', funding: '—', techStack: '—', employees: '—' },
    after: { email: 'priya.s@dream11.com', phone: '+91 87xxxxxx12', linkedin: 'linkedin.com/in/priyasharma', funding: 'Series F ($840M)', techStack: 'Java, AWS, Kafka', employees: '1,200+' },
  },
  {
    name: 'Amit Jain', company: 'Groww', role: 'CTO',
    before: { email: 'amit@groww.in', phone: '+91 99xxxxxx45', linkedin: '—', funding: '—', techStack: '—', employees: '—' },
    after: { email: 'amit@groww.in', phone: '+91 99xxxxxx45', linkedin: 'linkedin.com/in/amitjain', funding: 'Series E ($251M)', techStack: 'React, Python, PostgreSQL', employees: '2,100+' },
  },
  {
    name: 'Vikram Singh', company: 'CRED', role: 'Sr. PM',
    before: { email: '—', phone: '—', linkedin: '—', funding: '—', techStack: '—', employees: '—' },
    after: { email: 'vikram@cred.club', phone: '+91 76xxxxxx88', linkedin: 'linkedin.com/in/vikramingh', funding: 'Series F ($800M)', techStack: 'Flutter, Node.js, MongoDB', employees: '900+' },
  },
  {
    name: 'Neha Kapoor', company: 'PhonePe', role: 'Director, Merchant Payments',
    before: { email: 'neha.k@phonepe.com', phone: '—', linkedin: '—', funding: '—', techStack: '—', employees: '—' },
    after: { email: 'neha.k@phonepe.com', phone: '+91 90xxxxxx34', linkedin: 'linkedin.com/in/nehakapoor', funding: 'Series D ($700M)', techStack: 'Java, Spring Boot, MySQL', employees: '6,000+' },
  },
  {
    name: 'Arjun Reddy', company: 'Meesho', role: 'Engineering Manager',
    before: { email: 'arjun@meesho.com', phone: '—', linkedin: '—', funding: '—', techStack: '—', employees: '—' },
    after: { email: 'arjun@meesho.com', phone: '+91 81xxxxxx56', linkedin: 'linkedin.com/in/arjunreddy', funding: 'Series F ($570M)', techStack: 'Python, Django, Redis', employees: '2,800+' },
  },
  {
    name: 'Siddharth Joshi', company: 'Zepto', role: 'VP Product',
    before: { email: '—', phone: '—', linkedin: '—', funding: '—', techStack: '—', employees: '—' },
    after: { email: 'sid@zepto.co', phone: '+91 70xxxxxx23', linkedin: 'linkedin.com/in/sidjoshi', funding: 'Series E ($665M)', techStack: 'React Native, Go, DynamoDB', employees: '3,500+' },
  },
  {
    name: 'Kavita Nair', company: 'Urban Company', role: 'Head of Partnerships',
    before: { email: 'kavita@urbancompany.com', phone: '+91 88xxxxxx67', linkedin: '—', funding: '—', techStack: '—', employees: '—' },
    after: { email: 'kavita@urbancompany.com', phone: '+91 88xxxxxx67', linkedin: 'linkedin.com/in/kavitanair', funding: 'Series F ($355M)', techStack: 'React, Node.js, PostgreSQL', employees: '1,500+' },
  },
];

const ENRICHMENT_STATS = [
  { label: 'Total Contacts', value: '8', change: 'Active pipeline', direction: 'up', cls: 'blue' },
  { label: 'Fields Enriched', value: '38', change: 'From 8 sparse records', direction: 'up', cls: 'green' },
  { label: 'Enrichment Rate', value: '92%', change: '+15% with LLM pipeline', direction: 'up', cls: 'purple' },
  { label: 'Time Saved', value: '6 hrs', change: 'vs manual research', direction: 'up', cls: 'amber' },
];


// ── PAGE TITLES ─────────────────────────────────────────────

const PAGE_META = {
  pipeline: { title: 'Pipeline Dashboard', subtitle: 'Real-time deal intelligence & cold-deal alerts' },
  summarizer: { title: 'AI Call Summarizer', subtitle: 'Meeting prep & call summaries powered by AI' },
  forecast: { title: 'Deal Forecaster', subtitle: 'Revenue forecasting with confidence intervals' },
  drafter: { title: 'Follow-up Drafter', subtitle: 'AI-generated follow-up emails from call notes' },
  analysis: { title: 'Win/Loss Analysis', subtitle: 'Pattern detection across closed deals' },
  enrichment: { title: 'CRM Enrichment', subtitle: 'LLM-powered auto-enrichment of CRM records' },
};


// ── INIT ────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  renderPipeline();
  renderSummarizer();
  renderForecast('Q1');
  renderDrafter();
  renderAnalysis();
  renderEnrichment();
});


// ── NAVIGATION ──────────────────────────────────────────────

function initNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const section = item.dataset.section;

      // Update nav
      navItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');

      // Update sections
      document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
      document.getElementById(`section-${section}`).classList.add('active');

      // Update header
      const meta = PAGE_META[section];
      document.getElementById('pageTitle').textContent = meta.title;
      document.getElementById('pageSubtitle').textContent = meta.subtitle;

      // Trigger animations
      if (section === 'forecast') animateForecastBars();
      if (section === 'analysis') animateAnalysisBars();
    });
  });
}


// ── 1. PIPELINE DASHBOARD ───────────────────────────────────

function renderPipeline() {
  // Stats
  const statsHtml = PIPELINE_STATS.map(s => `
    <div class="stat-card ${s.cls}">
      <div class="stat-label">${s.label}</div>
      <div class="stat-value">${s.value}</div>
      <div class="stat-change ${s.direction}">${s.direction === 'up' ? '↑' : '↓'} ${s.change}</div>
    </div>
  `).join('');
  document.getElementById('pipelineStats').innerHTML = statsHtml;

  // Board
  const boardHtml = STAGES.map(stage => {
    const stageDeals = DEALS.filter(d => d.stage === stage.key);
    const dealsHtml = stageDeals.map(d => `
      <div class="deal-card ${d.health}">
        <div class="deal-name">${d.name}</div>
        <div class="deal-company">${d.company}</div>
        <div class="deal-meta">
          <span class="deal-amount">${d.amount}</span>
          <span class="deal-days">${d.days}d ago</span>
        </div>
        ${d.alert ? `<div class="deal-alert">⚠️ ${d.alert}</div>` : ''}
      </div>
    `).join('');

    return `
      <div class="pipeline-column">
        <div class="column-header">
          <span class="column-title">${stage.title}</span>
          <span class="column-count">${stageDeals.length}</span>
        </div>
        ${dealsHtml}
      </div>
    `;
  }).join('');
  document.getElementById('pipelineBoard').innerHTML = boardHtml;
}


// ── 2. AI CALL SUMMARIZER ───────────────────────────────────

function renderSummarizer() {
  // Load first transcript
  loadTranscript(0);

  // Sample tabs
  document.querySelectorAll('#sampleTabs .tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('#sampleTabs .tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      loadTranscript(parseInt(tab.dataset.sample));
    });
  });

  // Summarize button
  document.getElementById('summarizeBtn').addEventListener('click', handleSummarize);
  document.getElementById('clearBtn').addEventListener('click', () => {
    document.getElementById('callNotesInput').value = '';
    document.getElementById('summaryOutput').innerHTML = `
      <div class="empty-state">
        <span class="empty-icon">🤖</span>
        <h3 class="empty-title">Paste notes & click Summarize</h3>
        <p class="empty-desc">The AI will extract key topics, action items, and sentiment from your call notes.</p>
      </div>`;
    document.getElementById('summaryStatus').textContent = 'Ready';
    document.getElementById('summaryStatus').className = 'card-badge badge-blue';
  });
}

function loadTranscript(index) {
  document.getElementById('callNotesInput').value = SAMPLE_TRANSCRIPTS[index].notes;
}

function handleSummarize() {
  const input = document.getElementById('callNotesInput').value.trim();
  if (!input) return;

  // Find matching transcript
  let summary = null;
  for (const t of SAMPLE_TRANSCRIPTS) {
    if (input.includes(t.notes.substring(0, 50))) {
      summary = t.summary;
      break;
    }
  }

  // Default summary for custom input
  if (!summary) {
    summary = {
      overview: 'The call covered several business topics including product requirements, timeline expectations, and budget considerations. The prospect showed moderate interest with some concerns to address.',
      sentiment: { score: 65, label: 'Neutral-Positive', cls: 'neutral' },
      keyTopics: ['Product requirements', 'Timeline', 'Budget', 'Integration'],
      actions: [
        { icon: '📅', text: 'Schedule follow-up meeting to address concerns' },
        { icon: '📄', text: 'Send product documentation and case studies' },
        { icon: '💰', text: 'Prepare customized pricing proposal' },
      ]
    };
  }

  // Show processing
  const overlay = document.getElementById('processingOverlay');
  overlay.classList.add('active');
  document.getElementById('summaryStatus').textContent = 'Processing...';
  document.getElementById('summaryStatus').className = 'card-badge badge-amber';

  // Simulate AI processing
  setTimeout(() => {
    overlay.classList.remove('active');
    document.getElementById('summaryStatus').textContent = 'Complete';
    document.getElementById('summaryStatus').className = 'card-badge badge-green';
    renderSummary(summary);
  }, 2200);
}

function renderSummary(summary) {
  const actionsHtml = summary.actions.map(a =>
    `<li><span class="item-icon">${a.icon}</span> ${a.text}</li>`
  ).join('');

  const topicsHtml = summary.keyTopics.map(t =>
    `<span class="card-badge badge-blue" style="margin-right:6px;margin-bottom:6px">${t}</span>`
  ).join('');

  document.getElementById('summaryOutput').innerHTML = `
    <div class="summary-block" style="animation:fadeIn 0.5s var(--ease-smooth)">
      <div class="summary-label">Overview</div>
      <div class="summary-content">${summary.overview}</div>
    </div>

    <div class="summary-block" style="animation:fadeIn 0.7s var(--ease-smooth)">
      <div class="summary-label">Key Topics</div>
      <div style="display:flex;flex-wrap:wrap;margin-top:4px">${topicsHtml}</div>
    </div>

    <div class="summary-block" style="animation:fadeIn 0.9s var(--ease-smooth)">
      <div class="summary-label">Action Items</div>
      <ul class="action-items">${actionsHtml}</ul>
    </div>

    <div class="summary-block" style="animation:fadeIn 1.1s var(--ease-smooth)">
      <div class="summary-label">Sentiment Analysis</div>
      <div class="sentiment-bar">
        <span class="sentiment-label ${summary.sentiment.cls}" style="color:var(--accent-${summary.sentiment.cls === 'positive' ? 'green' : summary.sentiment.cls === 'neutral' ? 'amber' : 'red'})">${summary.sentiment.label}</span>
        <div class="sentiment-track">
          <div class="sentiment-fill ${summary.sentiment.cls}" style="width:${summary.sentiment.score}%"></div>
        </div>
        <span style="font-size:0.8rem;font-weight:700">${summary.sentiment.score}%</span>
      </div>
    </div>
  `;
}


// ── 3. DEAL FORECASTER ──────────────────────────────────────

function renderForecast(quarter) {
  const data = FORECAST_DATA[quarter];

  // Stats
  const statsHtml = data.stats.map(s => `
    <div class="stat-card ${s.cls}">
      <div class="stat-label">${s.label}</div>
      <div class="stat-value">${s.value}</div>
      <div class="stat-change ${s.direction}">${s.direction === 'up' ? '↑' : '↓'} ${s.change}</div>
    </div>
  `).join('');
  document.getElementById('forecastStats').innerHTML = statsHtml;

  // Bar chart
  const barsHtml = data.bars.map(b => `
    <div class="bar-group">
      <div class="bar-stack">
        <div class="bar low" data-height="${b.low}" style="height:0"></div>
        <div class="bar mid" data-height="${b.mid}" style="height:0"></div>
        <div class="bar high" data-height="${b.high}" style="height:0"></div>
      </div>
      <span class="bar-label">${b.label}</span>
    </div>
  `).join('');
  document.getElementById('forecastBarChart').innerHTML = barsHtml;

  // Donut
  const circ = 2 * Math.PI * 40;
  const wonLen = (data.donut.won / 100) * circ;
  const pipeLen = (data.donut.pipeline / 100) * circ;
  const riskLen = (data.donut.risk / 100) * circ;

  document.getElementById('donutWon').setAttribute('stroke-dasharray', `${wonLen} ${circ}`);
  document.getElementById('donutPipeline').setAttribute('stroke-dasharray', `${pipeLen} ${circ}`);
  document.getElementById('donutPipeline').setAttribute('stroke-dashoffset', `-${wonLen}`);
  document.getElementById('donutRisk').setAttribute('stroke-dasharray', `${riskLen} ${circ}`);
  document.getElementById('donutRisk').setAttribute('stroke-dashoffset', `-${wonLen + pipeLen}`);
  document.getElementById('donutValue').textContent = `${data.donut.confidence}%`;

  // Animate bars
  setTimeout(animateForecastBars, 100);

  // Quarter tabs
  document.querySelectorAll('#quarterTabs .tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('#quarterTabs .tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderForecast(tab.dataset.quarter);
    });
  });
}

function animateForecastBars() {
  document.querySelectorAll('#forecastBarChart .bar').forEach(bar => {
    const h = bar.dataset.height;
    requestAnimationFrame(() => {
      bar.style.height = `${h}%`;
    });
  });
}


// ── 4. FOLLOW-UP DRAFTER ────────────────────────────────────

function renderDrafter() {
  const listHtml = DRAFTER_DEALS.map((d, i) => `
    <div class="deal-select-card${i === 0 ? ' selected' : ''}" data-deal="${i}" id="drafterDeal${i}">
      <div class="deal-select-name">${d.name}</div>
      <div class="deal-select-company">${d.company} — ${d.contact}</div>
    </div>
  `).join('');
  document.getElementById('drafterDealList').innerHTML = listHtml;

  // Click handlers
  document.querySelectorAll('.deal-select-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.deal-select-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      generateEmail(parseInt(card.dataset.deal));
    });
  });

  // Generate first email
  generateEmail(0);
}

function generateEmail(index) {
  const deal = DRAFTER_DEALS[index];
  const processing = document.getElementById('emailProcessing');
  const output = document.getElementById('emailOutput');

  processing.classList.add('active');
  document.getElementById('drafterStatus').textContent = 'Drafting...';
  document.getElementById('drafterStatus').className = 'card-badge badge-amber';

  setTimeout(() => {
    processing.classList.remove('active');
    document.getElementById('drafterStatus').textContent = 'Draft Ready';
    document.getElementById('drafterStatus').className = 'card-badge badge-green';

    output.innerHTML = `
      <div style="animation:fadeIn 0.4s var(--ease-smooth)">
        <div class="email-field">
          <span class="email-field-label">To:</span>
          <span class="email-field-value">${deal.contact}</span>
        </div>
        <div class="email-field">
          <span class="email-field-label">Subject:</span>
          <span class="email-field-value">${deal.subject}</span>
        </div>
        <div class="email-body">${deal.email}</div>
        <div class="email-actions">
          <button class="btn btn-primary">📤 Send Email</button>
          <button class="btn btn-secondary">✏️ Edit Draft</button>
          <button class="btn btn-secondary">🔄 Regenerate</button>
        </div>
      </div>
    `;
  }, 1800);
}


// ── 5. WIN/LOSS ANALYSIS ────────────────────────────────────

function renderAnalysis() {
  // Stats
  const statsHtml = ANALYSIS_STATS.map(s => `
    <div class="stat-card ${s.cls}">
      <div class="stat-label">${s.label}</div>
      <div class="stat-value">${s.value}</div>
      <div class="stat-change ${s.direction}">${s.direction === 'up' ? '↑' : '↓'} ${s.change}</div>
    </div>
  `).join('');
  document.getElementById('analysisStats').innerHTML = statsHtml;

  // Win rate bars
  const barsHtml = WIN_RATES.map(w => `
    <div class="h-bar-item">
      <div class="h-bar-header">
        <span class="h-bar-name">${w.name}</span>
        <span class="h-bar-value" style="color:var(--accent-green)">${w.rate}%</span>
      </div>
      <div class="h-bar-track">
        <div class="h-bar-fill win" data-width="${w.rate}" style="width:0"></div>
      </div>
    </div>
  `).join('');
  document.getElementById('winRateBars').innerHTML = barsHtml;

  // Cycle bars
  const cycleHtml = CYCLE_DURATIONS.map(c => `
    <div class="h-bar-item">
      <div class="h-bar-header">
        <span class="h-bar-name">${c.name}</span>
        <span class="h-bar-value" style="color:var(--accent-${c.type === 'win' ? 'green' : 'amber'})">${c.display}</span>
      </div>
      <div class="h-bar-track">
        <div class="h-bar-fill ${c.type}" data-width="${c.rate}" style="width:0"></div>
      </div>
    </div>
  `).join('');
  document.getElementById('cycleBars').innerHTML = cycleHtml;

  // Patterns
  const patternsHtml = PATTERNS.map(p => `
    <div class="pattern-card">
      <span class="pattern-icon">${p.icon}</span>
      <div class="pattern-info">
        <div class="pattern-title">${p.title}</div>
        <div class="pattern-desc">${p.desc}</div>
        <div class="pattern-impact stat-change ${p.impactCls}">${p.impactCls === 'up' ? '↑' : '↓'} ${p.impact}</div>
      </div>
    </div>
  `).join('');
  document.getElementById('patternCards').innerHTML = patternsHtml;

  // Animate
  setTimeout(animateAnalysisBars, 300);
}

function animateAnalysisBars() {
  document.querySelectorAll('.h-bar-fill').forEach(bar => {
    const w = bar.dataset.width;
    requestAnimationFrame(() => {
      bar.style.width = `${w}%`;
    });
  });
}


// ── 6. CRM ENRICHMENT ───────────────────────────────────────

let enriched = true;

function renderEnrichment() {
  // Stats
  const statsHtml = ENRICHMENT_STATS.map(s => `
    <div class="stat-card ${s.cls}">
      <div class="stat-label">${s.label}</div>
      <div class="stat-value">${s.value}</div>
      <div class="stat-change ${s.direction}">${s.direction === 'up' ? '↑' : '↓'} ${s.change}</div>
    </div>
  `).join('');
  document.getElementById('enrichmentStats').innerHTML = statsHtml;

  // Toggle
  document.getElementById('enrichToggle').addEventListener('click', () => {
    enriched = !enriched;
    const toggle = document.getElementById('enrichToggle');
    const label = document.getElementById('enrichToggleLabel');
    toggle.classList.toggle('active', enriched);
    label.textContent = enriched ? 'Showing enriched data' : 'Showing raw CRM data';
    renderEnrichmentTable();
  });

  renderEnrichmentTable();
}

function renderEnrichmentTable() {
  const fields = ['email', 'phone', 'linkedin', 'funding', 'techStack', 'employees'];
  const fieldLabels = ['Email', 'Phone', 'LinkedIn', 'Funding', 'Tech Stack', 'Team Size'];

  const headerHtml = `<tr>
    <th>Name</th><th>Company</th><th>Role</th>
    ${fieldLabels.map(f => `<th>${f}</th>`).join('')}
  </tr>`;

  const bodyHtml = CRM_CONTACTS.map(c => {
    const data = enriched ? c.after : c.before;
    const cellsHtml = fields.map(f => {
      const val = data[f];
      if (val === '—') return `<td><span class="sparse-value">—</span></td>`;
      const isEnriched = enriched && c.before[f] === '—';
      return `<td><span class="${isEnriched ? 'enriched-value' : ''}">${val}</span></td>`;
    }).join('');

    return `<tr>
      <td style="font-weight:600;color:var(--text-primary)">${c.name}</td>
      <td>${c.company}</td>
      <td style="font-size:0.78rem">${c.role}</td>
      ${cellsHtml}
    </tr>`;
  }).join('');

  document.getElementById('enrichmentTable').innerHTML = `
    <thead>${headerHtml}</thead>
    <tbody>${bodyHtml}</tbody>
  `;
}
