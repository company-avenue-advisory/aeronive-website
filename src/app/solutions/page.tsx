import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import CTA from "@/components/sections/CTA";
import Reveal from "@/components/ui/Reveal";
import { Container, SectionHeading } from "@/components/ui/Section";
import { Check, Lock, Server, Shield } from "@/components/ui/Icons";
import {
  AssuranceVisual,
  CompanyBrainVisual,
  LocalFirstVisual,
  PipelineVisual,
  PolicyVisual,
} from "@/components/sections/CapabilityVisuals";
import { topologies } from "@/lib/site";

export const metadata: Metadata = {
  title: "Platform",
  description:
    "The governed core behind everything Aeronive builds — Company Brain, local-first interconnects, and data-backed pipelines, deployed on-premise, in a private VPC, or fully air-gapped.",
};

const blocks = [
  {
    id: "company-brain",
    label: "01 · Company Brain",
    title: "Everything your organization knows, made retrievable and governed.",
    body: [
      "Most enterprise knowledge is not in a database. It is spread across contract archives, ticket histories, engineering wikis, regulatory filings, and the judgement of people who have been there fifteen years. A Company Brain consolidates that into a single governed index that sits behind your firewall.",
      "Retrieval is permission-aware before generation, not after. A user who cannot open a document in the source system cannot cause it to influence an answer — the access model is evaluated at query time against your existing identity provider.",
    ],
    points: [
      "Ingestion from document stores, databases, ticketing, and code",
      "Citations resolve to the exact span in the source record",
      "Access enforced at retrieval against your existing IdP",
      "Incremental re-indexing as source systems change",
    ],
    Visual: CompanyBrainVisual,
    reverse: false,
  },
  {
    id: "local-first",
    label: "02 · Local-first interconnect",
    title: "Custom services that keep working when the network doesn't.",
    body: [
      "A refinery, a vessel, a field hospital, and a classified facility have one thing in common: the connection is not guaranteed. Systems built on the assumption of a live link to a hosted model fail exactly when they are needed most.",
      "We build interconnecting services that treat disconnection as the normal case. Inference runs on local hardware, state is held in conflict-free replicated types, and reconciliation on reconnect is deterministic and replayable — so an auditor can reconstruct what the system knew at any point in time.",
    ],
    points: [
      "Edge-resident inference on local hardware",
      "CRDT-backed state, no lost writes during partition",
      "Deterministic replay for audit reconstruction",
      "Signed, offline update bundles for air-gapped sites",
    ],
    Visual: LocalFirstVisual,
    reverse: true,
  },
  {
    id: "data-pipelines",
    label: "03 · Data-backed pipelines",
    title: "Curation, lineage, and evaluation built from your own data.",
    body: [
      "Generic benchmarks tell you nothing about whether a system works on your corpus. We build evaluation sets from your real queries and your real documents, graded by your subject-matter experts, and we hold releases against them.",
      "Every artifact in the pipeline is versioned and content-addressed. When a regulator asks why the system produced a specific output on a specific date, the answer is a lookup rather than an investigation.",
    ],
    points: [
      "Expert-graded evaluation sets drawn from real usage",
      "Content-addressed, reproducible pipeline artifacts",
      "Full lineage from source record to generated span",
      "Structured labeling workflows with reviewer agreement tracking",
    ],
    Visual: PipelineVisual,
    reverse: false,
  },
  {
    id: "governance",
    label: "04 · Policy & assurance",
    title: "Policy your counsel can read, enforced by the runtime.",
    body: [
      "Guardrails written as prompt text are not controls — they are suggestions. We compile machine-readable policy into runtime enforcement: redaction spans, jurisdiction routing, refusal boundaries, and escalation to human review.",
      "Assurance runs continuously rather than as a launch gate. Drift detection, adversarial probing, and evidence generation operate against production traffic, so the audit file is a byproduct of running the system.",
    ],
    points: [
      "Versioned, signed policy artifacts under change control",
      "Runtime redaction and jurisdiction-aware routing",
      "Continuous adversarial probing and drift detection",
      "Evidence generated from production, not assembled before an audit",
    ],
    Visual: PolicyVisual,
    reverse: true,
  },
];

const integrations = [
  "SharePoint",
  "Confluence",
  "S3 / MinIO",
  "PostgreSQL",
  "Snowflake",
  "Databricks",
  "Git / GitLab",
  "Jira",
  "ServiceNow",
  "SAP",
  "Salesforce",
  "Elasticsearch",
  "Kafka",
  "Active Directory",
  "Okta",
  "Network shares",
  "Microsoft 365",
  "OpenSearch",
];

const topologyIcons = [Server, Shield, Lock];

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Platform"
        title="One system, assembled from four disciplines."
        lead="This is the governed core underneath everything we build. We do not sell a product with a compliance module bolted on — retrieval, interconnect, data, and governance are built as one system, shaped by the regime you operate under."
      />

      {/* ================= Deep-dive blocks ================= */}
      <div className="flex flex-col gap-24 py-16 sm:gap-32 sm:py-24">
        {blocks.map(({ id, label, title, body, points, Visual, reverse }) => (
          <section key={id} id={id} className="scroll-mt-28">
            <Container>
              <div
                className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-16 ${
                  reverse ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <Reveal>
                  <div>
                    <span className="label-mono">{label}</span>
                    <h2 className="mt-5 text-[clamp(1.7rem,3.2vw,2.5rem)] leading-[1.1] font-medium text-gradient">
                      {title}
                    </h2>
                    {body.map((p) => (
                      <p
                        key={p.slice(0, 24)}
                        className="mt-5 text-[14px] leading-[1.75] text-body"
                      >
                        {p}
                      </p>
                    ))}
                    <ul className="mt-8 flex flex-col gap-3">
                      {points.map((pt) => (
                        <li key={pt} className="flex items-start gap-3">
                          <Check className="mt-[3px] h-3.5 w-3.5 shrink-0 text-brand" />
                          <span className="text-[13.5px] leading-relaxed text-muted">
                            {pt}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>

                <Reveal delay={0.12}>
                  <div className="card relative overflow-hidden p-7 sm:p-9">
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          "radial-gradient(ellipse 70% 60% at 50% 100%, var(--c-glow-soft), transparent 70%)",
                      }}
                    />
                    {/* min-height rather than fixed: the diagrams differ in
                        intrinsic height and shouldn't float in dead space */}
                    <div className="relative flex min-h-[190px] w-full items-center">
                      <Visual />
                    </div>
                  </div>
                </Reveal>
              </div>
            </Container>
          </section>
        ))}
      </div>

      {/* ================= Deployment topologies ================= */}
      <section id="deployment" className="scroll-mt-28 py-24 sm:py-32">
        <Container>
          <SectionHeading
            eyebrow="Deployment"
            title="Where it runs is a design input, not an afterthought."
            lead="Topology is decided in the first week, because it constrains everything downstream — model choice, key management, update path, and what evidence the system can produce."
          />

          <div className="mt-16 grid gap-4 lg:grid-cols-3">
            {topologies.map((t, i) => {
              const Icon = topologyIcons[i];
              return (
                <Reveal key={t.name} delay={i * 0.09}>
                  <article className="card card-hover flex h-full flex-col p-7">
                    <div className="flex items-center justify-between">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-brand/20 bg-brand/10">
                        <Icon className="h-5 w-5 text-brand-text" />
                      </span>
                      <span className="font-mono text-[10px] tracking-[0.1em] text-ghost uppercase">
                        {t.posture}
                      </span>
                    </div>

                    <h3 className="mt-7 text-[19px] font-medium tracking-[-0.02em] text-ink">
                      {t.name}
                    </h3>
                    <p className="mt-3 flex-1 text-[13.5px] leading-relaxed text-muted">
                      {t.body}
                    </p>

                    <ul className="mt-7 flex flex-col gap-2 border-t border-line pt-5">
                      {t.traits.map((trait) => (
                        <li
                          key={trait}
                          className="flex items-center gap-2.5 font-mono text-[11px] text-faint"
                        >
                          <span className="h-1 w-1 rounded-full bg-brand" />
                          {trait}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ================= Integration surface ================= */}
      <section className="py-24 sm:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <SectionHeading
                align="left"
                eyebrow="Integration surface"
                title="Meets your estate where it already is."
                lead="Connectors run inside your network and authenticate as a service principal you control. Nothing is copied to infrastructure we operate."
              />
              <Reveal delay={0.16}>
                <div className="mt-8 flex items-start gap-3 rounded-xl border border-line bg-veil p-4">
                  <Lock className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  <p className="text-[12.5px] leading-relaxed text-muted">
                    Where a source system has no suitable API, we build the
                    connector as part of the engagement and hand over the source.
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-veil-strong sm:grid-cols-3 lg:mt-4">
                {integrations.map((name) => (
                  <li
                    key={name}
                    className="flex items-center gap-2.5 bg-canvas/90 px-4 py-4 transition-colors duration-400 hover:bg-raised"
                  >
                    <span className="h-1 w-1 shrink-0 rounded-full bg-brand" />
                    <span className="truncate text-[12.5px] text-body">
                      {name}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ================= Assurance strip ================= */}
      <section className="pb-8">
        <Container>
          <Reveal>
            <div className="card grid items-center gap-8 p-7 lg:grid-cols-[1fr_320px] sm:p-9">
              <div>
                <span className="label-mono">Continuous assurance</span>
                <h3 className="mt-4 text-[20px] font-medium tracking-[-0.02em] text-ink">
                  Evidence accumulates while the system runs.
                </h3>
                <p className="mt-3 max-w-[60ch] text-[13.5px] leading-relaxed text-muted">
                  Drift against your evaluation set is monitored continuously.
                  When a regression trips a threshold, the affected release is
                  flagged and routed for re-evaluation before it reaches users.
                </p>
              </div>
              <div className="h-[120px]">
                <AssuranceVisual />
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <CTA
        title="Start with the assessment."
        lead="Two weeks against your data estate and regulatory surface produces a risk-tiered scope and a concrete first use case."
        secondary={{ label: "See sector detail", href: "/sectors" }}
      />
    </>
  );
}
