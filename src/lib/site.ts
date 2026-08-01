/**
 * Single source of truth for site copy and structured content.
 * Edit here rather than in page components.
 */

import type { BrandIconName } from "@/components/ui/Icons";

export const site = {
  name: "Aeronive Labs",
  tagline: "Compliance-native AI for frontier systems",
  description:
    "Aeronive Labs builds compliance-native AI systems for regulated sectors. Our first product, Aeronive EXIM, is in production for import and export compliance; the platform underneath it — Company Brain, local-first interconnect, governed pipelines — is what the next ones are built from.",
  email: "info@aeronive.com",
  url: "https://aeronive.com",
};

export const nav = [
  { label: "Products", href: "/products" },
  { label: "Platform", href: "/solutions" },
  { label: "Sectors", href: "/sectors" },
  { label: "Research", href: "/research" },
  { label: "About", href: "/about" },
];

/* ------------------------------------------------------------------ */
/* Compliance frameworks — used in the marquee and the sectors matrix  */
/* ------------------------------------------------------------------ */

export const frameworks = [
  "EU AI Act",
  "ISO/IEC 42001",
  "NIST AI RMF",
  "SOC 2 Type II",
  "HIPAA",
  "GDPR",
  "DORA",
  "ISO 27001",
  "FedRAMP-aligned",
  "PCI DSS",
];

/* ------------------------------------------------------------------ */
/* Capability chips — the row beneath the hero console                 */
/* ------------------------------------------------------------------ */

export const chips = [
  { label: "Zero data egress", icon: "shield" },
  { label: "Air-gap capable", icon: "lock" },
  { label: "Full audit trail", icon: "trail" },
  { label: "Model agnostic", icon: "layers" },
  { label: "Offline tolerant", icon: "signal" },
  { label: "Cited answers", icon: "quote" },
] as const;

/* ------------------------------------------------------------------ */
/* Where we actually are — the honest evidence layer                   */
/*                                                                     */
/* Nothing in this block may claim a number we have not measured. An   */
/* unfounded stat costs more in diligence than an empty space does.    */
/* ------------------------------------------------------------------ */

export const traction = {
  /**
   * TODO(aeronive): set the real count of customs house agent / importer
   * interviews. Left null deliberately — the copy reads correctly without a
   * number, and a wrong number is worse than none.
   */
  interviewCount: null as number | null,
  /** TODO(aeronive): the ports and ICDs those conversations actually covered. */
  corridors: ["Nhava Sheva", "Mundra", "ICD Tughlakabad"],
};

export const evidence = [
  {
    label: "Field research",
    body: traction.interviewCount
      ? `${traction.interviewCount} recorded conversations with customs house agents, importers, and exporters moving cargo through ${traction.corridors.join(", ")}.`
      : `Recorded conversations with customs house agents, importers, and exporters moving cargo through ${traction.corridors.join(", ")}. The product scope came out of those, not out of a market map.`,
  },
  {
    label: "Working software",
    body: "Aeronive EXIM is in production — a running system, not a prototype deck. The platform capabilities on this site are the parts it is assembled from.",
  },
  {
    label: "What we have not done yet",
    body: "No published benchmark results, no named reference customers. When we have measured numbers, they go in Research with the method attached.",
  },
];

/* ------------------------------------------------------------------ */
/* Products — what we actually sell today, and what it sits on         */
/*                                                                     */
/* TODO(aeronive): the capability lists below must match what the      */
/* shipped EXIM product actually does. Trim anything not yet true.     */
/* ------------------------------------------------------------------ */

export type Product = {
  slug: string;
  name: string;
  status: "In production" | "In development";
  category: string;
  who: string;
  summary: string;
  body: string[];
  points: string[];
  regimes: string[];
};

export const products: Product[] = [
  {
    slug: "exim",
    name: "Aeronive EXIM",
    status: "In production",
    category: "Trade & customs compliance",
    who: "Customs house agents, importers, exporters, and freight forwarders",
    summary:
      "Compliance checks that run against the consignment before it reaches the assessing officer — classification, licensing, valuation, and document completeness, each flag traced to the rule behind it.",
    body: [
      "Import and export compliance fails in a small number of predictable places: a classification that does not survive scrutiny, a licence or authorisation that does not cover the item, a valuation the department reads differently, a document set that is one certificate short. The cost of finding out late is a query, a detention, demurrage, and occasionally a penalty.",
      "The knowledge that prevents this sits with experienced people, in their heads, one consignment at a time. Aeronive EXIM makes that knowledge checkable. It reads the documents for a shipment, checks them against the applicable rules, and returns the specific problems with the specific provision each one comes from — so a filing decision can be argued, not just asserted.",
    ],
    points: [
      "Classification review against the tariff, with the reasoning shown",
      "Licence, authorisation, and restriction checks for the item and route",
      "Document-set completeness checked against the actual consignment",
      "Valuation and duty-exposure flags raised before filing, not after",
      "Every flag cites the provision, notification, or circular behind it",
    ],
    regimes: ["Customs Act", "DGFT / FTP", "HS / ITC-HS", "GST on imports"],
  },
];

/**
 * What comes after EXIM. Deliberately unnamed — we do not list products that
 * do not exist. TODO(aeronive): promote entries into `products` as they ship.
 */
export const roadmapNote = {
  title: "EXIM is the first, not the only.",
  body: "The governed core — retrieval with citations, policy compiled into runtime controls, evidence generated by the running system — was built to carry more than one product. Trade compliance is where it went to work first because that is where we did the field research. Further products are in development against the same core.",
};

/* ------------------------------------------------------------------ */
/* Core capabilities — bento grid on the landing page                  */
/* ------------------------------------------------------------------ */

export type Capability = {
  slug: string;
  title: string;
  blurb: string;
  detail: string;
  span: "wide" | "tall" | "normal";
};

export const capabilities: Capability[] = [
  {
    slug: "company-brain",
    title: "Company Brain",
    blurb:
      "A private, governed model of everything your organization knows — documents, systems, decisions, and the tribal knowledge that never got written down.",
    detail:
      "Ingests from your existing stores behind the firewall. Every answer carries citations back to source, and access control is enforced at retrieval time rather than bolted on after generation.",
    span: "wide",
  },
  {
    slug: "local-first",
    title: "Local-first interconnect",
    blurb:
      "Custom services that keep working when the network doesn't.",
    detail:
      "Edge-resident inference, CRDT-backed sync, and deterministic replay so a site, vessel, or facility stays operational through disconnection and reconciles cleanly on reconnect.",
    span: "normal",
  },
  {
    slug: "data-pipelines",
    title: "Data-backed pipelines",
    blurb:
      "Curation, labeling, lineage, and evaluation sets built from your own data.",
    detail:
      "Versioned and attributable end to end. If a regulator asks why the system produced an output, the pipeline can answer with the exact records involved.",
    span: "normal",
  },
  {
    slug: "policy-engine",
    title: "Policy & guardrail engine",
    blurb:
      "Machine-readable policy compiled into runtime controls.",
    detail:
      "Redaction, jurisdiction routing, refusal boundaries, and escalation paths expressed as versioned artifacts — reviewable by counsel, enforced by the runtime.",
    span: "normal",
  },
  {
    slug: "assurance",
    title: "Evaluation & assurance",
    blurb:
      "Continuous red-teaming, drift detection, and regulator-ready evidence generated from production traffic.",
    detail:
      "Evaluation is a standing process, not a launch gate. Evidence accumulates as the system runs.",
    span: "normal",
  },
  {
    slug: "sovereign",
    title: "Sovereign deployment",
    blurb:
      "On-premise, private VPC, or fully air-gapped. Your weights, your keys, your logs, no egress by default.",
    detail:
      "Deployment topology is a first-class design input, decided before the first line of integration code.",
    span: "wide",
  },
];

/* ------------------------------------------------------------------ */
/* Design commitments — properties the architecture guarantees.        */
/*                                                                     */
/* These are not benchmark results and must never be presented as      */
/* such. Measured figures belong in Research, with the method beside   */
/* them. Anything here has to be true by construction.                 */
/* ------------------------------------------------------------------ */

export const metrics = [
  {
    value: "0",
    unit: "bytes",
    label: "Client data leaving the perimeter under default deployment policy.",
  },
  {
    value: "100",
    unit: "%",
    label: "Generated answers resolvable to a cited source record.",
  },
  {
    value: "1",
    unit: "core",
    label: "One governed platform underneath every product we ship.",
  },
  {
    value: "24/7",
    unit: "",
    label: "Continuous evaluation and drift monitoring once live.",
  },
];

export const metricsNote =
  "Design commitments enforced by the architecture — not benchmark results. Measured figures are published in Research with the method attached.";

/* ------------------------------------------------------------------ */
/* Engagement process                                                  */
/* ------------------------------------------------------------------ */

export const process = [
  {
    step: "01",
    title: "Map",
    body: "We assess the data estate, the regulatory surface, and how your use cases classify under the frameworks that bind you. The output is a risk-tiered scope, not a proposal deck.",
  },
  {
    step: "02",
    title: "Ground",
    body: "We build the Company Brain: ingestion, lineage, the access model, and an evaluation set drawn from your real queries. Nothing ships against generic benchmarks.",
  },
  {
    step: "03",
    title: "Interconnect",
    body: "Local-first services are wired into existing systems — designed to degrade gracefully, tolerate disconnection, and reconcile deterministically.",
  },
  {
    step: "04",
    title: "Assure",
    body: "Continuous evaluation, audit evidence, and change control. Your team takes operational ownership with the runbooks to keep it defensible.",
  },
];

/* ------------------------------------------------------------------ */
/* Sectors                                                             */
/* ------------------------------------------------------------------ */

export type Sector = {
  slug: string;
  name: string;
  summary: string;
  regimes: string[];
  useCases: string[];
};

export const sectors: Sector[] = [
  {
    slug: "financial-services",
    name: "Financial services",
    summary:
      "Model risk management, surveillance, and client-facing systems where every recommendation has to be explainable to a supervisor.",
    regimes: ["DORA", "SR 11-7", "MiFID II", "SOC 2"],
    useCases: [
      "Credit memo drafting with full source attribution",
      "Trade surveillance triage with reviewable rationale",
      "Model risk documentation kept current automatically",
    ],
  },
  {
    slug: "healthcare",
    name: "Healthcare & life sciences",
    summary:
      "Clinical and research workloads where PHI never leaves the estate and provenance is a regulatory requirement, not a feature.",
    regimes: ["HIPAA", "GxP", "EU AI Act", "ISO 13485"],
    useCases: [
      "Protocol and submission drafting against internal precedent",
      "Prior-authorization evidence assembly",
      "Safety signal triage across trial and literature corpora",
    ],
  },
  {
    slug: "public-sector",
    name: "Public sector & defense",
    summary:
      "Classified and controlled environments running fully disconnected, with deterministic behavior and complete audit reconstruction.",
    regimes: ["FedRAMP-aligned", "CMMC", "NIST 800-53", "ITAR"],
    useCases: [
      "Air-gapped analyst assistance over controlled corpora",
      "Field-deployed inference tolerant of comms loss",
      "Records and FOIA response preparation",
    ],
  },
  {
    slug: "legal",
    name: "Legal & professional services",
    summary:
      "Privilege-aware systems where matter boundaries, conflicts, and confidentiality are enforced structurally.",
    regimes: ["Privilege rules", "GDPR", "ISO 27001", "Client MSAs"],
    useCases: [
      "Matter-scoped research that cannot cross a conflict wall",
      "Diligence review with reviewable extraction lineage",
      "Precedent retrieval across the firm's own work product",
    ],
  },
  {
    slug: "energy",
    name: "Energy & industrials",
    summary:
      "Plants, grids, and remote sites where connectivity is intermittent and the control environment is unforgiving.",
    regimes: ["NERC CIP", "IEC 62443", "ISO 45001", "OSHA"],
    useCases: [
      "Local-first maintenance and procedure assistance",
      "Incident reconstruction from operational history",
      "Permit and compliance documentation generation",
    ],
  },
  {
    slug: "insurance",
    name: "Insurance",
    summary:
      "Underwriting and claims systems subject to fairness testing, adverse-action explanation, and state-level scrutiny.",
    regimes: ["NAIC AI Model Bulletin", "Solvency II", "GDPR", "SOC 2"],
    useCases: [
      "Submission intake and risk summarization",
      "Claims triage with documented decision rationale",
      "Bias testing across protected-class proxies",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Deployment topologies                                               */
/* ------------------------------------------------------------------ */

export const topologies = [
  {
    name: "Private VPC",
    posture: "Your cloud account",
    body: "Runs inside your existing cloud boundary using your KMS keys, your VPC, your logging. We never hold credentials to production.",
    traits: ["Customer-managed keys", "Private networking", "Existing IAM"],
  },
  {
    name: "On-premise",
    posture: "Your hardware",
    body: "Deployed to your own datacenter or colocation. Open-weight models served locally, with no dependency on an external inference provider.",
    traits: ["Local weights", "No external inference", "Hardware sizing included"],
  },
  {
    name: "Air-gapped",
    posture: "No network path",
    body: "Fully disconnected operation with signed, offline update bundles and deterministic replay for audit reconstruction.",
    traits: ["Offline update bundles", "Deterministic replay", "Physical media transfer"],
  },
];

/* ------------------------------------------------------------------ */
/* Contact page                                                        */
/* ------------------------------------------------------------------ */

export const faqs = [
  {
    q: "Do you require access to our production data?",
    a: "No. Assessment runs against schemas, samples, and documentation you control. In every deployment topology we support, the system runs inside your perimeter and we hold no standing credentials to production.",
  },
  {
    q: "Which models do you use?",
    a: "We are model agnostic. Frontier hosted models where your policy allows it, open-weight models served locally where it does not. The retrieval, policy, and evaluation layers are designed so the model underneath can be swapped without re-architecting.",
  },
  {
    q: "How do you handle the EU AI Act?",
    a: "We classify each use case by risk tier during the mapping phase, then build the technical documentation, logging, and human-oversight controls that the tier requires. The evidence is generated by the running system rather than assembled by hand before an audit.",
  },
  {
    q: "What does a first engagement look like?",
    a: "A scoped assessment covering the data estate and regulatory surface, followed by a production pilot on one high-value use case. The mapping phase sets the timeline; we would rather scope it against your estate than quote you an average.",
  },
  {
    q: "Is Aeronive EXIM a separate product or part of the platform?",
    a: "Both. EXIM is a product you can buy today for import and export compliance. It is built on the same governed core — grounded retrieval, compiled policy, generated evidence — that we deploy for platform engagements, which is why a flag it raises can always be traced back to the provision behind it.",
  },
];

/* ------------------------------------------------------------------ */
/* Company — team, journey, and social presence                        */
/*                                                                     */
/* Everything marked `todo: true` renders with a visible TO FILL chip  */
/* so nothing placeholder can ship unnoticed. Replace the content and  */
/* drop the flag.                                                      */
/* ------------------------------------------------------------------ */

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  focus: string;
  links?: { label: string; href: string; icon: BrandIconName }[];
  todo?: boolean;
};

export const team: TeamMember[] = [
  {
    name: "Yug Shrivastav",
    role: "Chief AI Architect & Co-Founder",
    bio: "At Aeronive Labs, I bridge product strategy and engineering as Co-founder and Chief AI Architect to build a global trade compliance engine. Previously, I developed core algorithms for automated HSN classification, a blockchain-based supply chain platform, and a multi-agent AI orchestrator for the RBI. That experience now drives our mission to eliminate compliance bottlenecks through autonomous AI systems.",
    focus: "Product strategy, AI architecture",
    links: [
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/yug-shrivastav/",
        icon: "linkedin",
      },
      { label: "GitHub", href: "https://github.com/Yugshri", icon: "github" },
    ],
  },
  {
    name: "Anshika Singh",
    role: "Business Operations & Technology Manager",
    bio: "TODO — two or three sentences on the operating side: what you run day to day, what you did before this, and the ground you stand on with customers and partners.",
    focus: "Operations, partnerships, delivery",
    links: [
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/anshikasingh2004/",
        icon: "linkedin",
      },
    ],
    todo: true,
  },
  {
    name: "Aryan Srivastava",
    role: "AI & Full Stack Developer",
    bio: "As AI and Full Stack developer at Aeronive Labs, I build AI-first products that combine agentic automation with modern software engineering. My expertise spans multi-agent systems, generative AI, workflow automation, API integrations, and full-stack development to create scalable solutions for startups and enterprises.",
    focus: "Agentic systems, product engineering",
    links: [
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/aryansrivastava24/",
        icon: "linkedin",
      },
      {
        label: "GitHub",
        href: "https://github.com/Aryan246cs",
        icon: "github",
      },
    ],
  },
];

export type JourneyEntry = {
  period: string;
  title: string;
  body: string;
  todo?: boolean;
};

export const journey: JourneyEntry[] = [
  {
    period: "June 2026",
    title: "The field research",
    body: "We began by sitting with customs house agents, importers, and exporters and asking what actually goes wrong between a consignment arriving and a filing being accepted. What we build was scoped from those conversations rather than from a market map.",
  },
  {
    period: "24 July 2026",
    title: "Aeronive Labs founded",
    body: "Incorporated to build compliance-native AI for regulated work, starting with the problem the interviews had already defined rather than a platform looking for one.",
  },
  {
    period: "In buildup",
    title: "The platform core",
    body: "The governed core is coming together as one system: retrieval that resolves every answer to a cited source, policy compiled into runtime controls, and audit evidence generated by the system as it runs. Every product we ship sits on it.",
  },
  {
    period: "In production",
    title: "Aeronive EXIM in production",
    body: "EXIM checks a consignment before it reaches the assessing officer — classification against the tariff, licensing and restrictions for the item and route, valuation exposure, and document-set completeness. Every flag it raises cites the provision behind it.",
  },
];

export type Social = {
  label: string;
  handle: string;
  /** Empty string renders a visible TO FILL chip rather than a dead link. */
  href: string;
  icon: BrandIconName;
};

export const socials: Social[] = [
  {
    label: "LinkedIn",
    handle: "aeronive-labs",
    href: "https://www.linkedin.com/company/aeronive-labs",
    icon: "linkedin",
  },
  {
    label: "X",
    handle: "@aeronivelabs",
    href: "https://x.com/aeronivelabs",
    icon: "x",
  },
  {
    label: "Instagram",
    handle: "@aeronivelabs",
    href: "https://www.instagram.com/aeronivelabs/",
    icon: "instagram",
  },
];
