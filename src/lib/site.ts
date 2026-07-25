/**
 * Single source of truth for site copy and structured content.
 * Edit here rather than in page components.
 */

export const site = {
  name: "Aeronive Labs",
  tagline: "Compliance-native AI for frontier systems",
  description:
    "Aeronive Labs builds compliance-native AI systems for regulated sectors — private Company Brains, local-first interconnects, and data-backed pipelines that run inside your perimeter.",
  email: "contact@aeronivelabs.com",
  url: "https://aeronivelabs.com",
};

export const nav = [
  { label: "Solutions", href: "/solutions" },
  { label: "Sectors", href: "/sectors" },
  { label: "Contact", href: "/contact" },
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
/* Metrics strip — replace with audited figures before launch          */
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
    label: "Generated answers traceable to a cited source record.",
  },
  {
    value: "6",
    unit: "wks",
    label: "Typical path from data assessment to a production pilot.",
  },
  {
    value: "24/7",
    unit: "",
    label: "Continuous evaluation and drift monitoring once live.",
  },
];

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
    a: "A scoped assessment covering the data estate and regulatory surface, followed by a production pilot on one high-value use case. Most clients reach a working pilot inside six weeks.",
  },
];
