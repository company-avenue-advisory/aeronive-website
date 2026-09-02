/**
 * Research — field notes, write-ups, and papers.
 *
 * The rule for this file: nothing gets `published: true` until the content
 * under it is real. An empty research page is honest; a page of invented
 * findings is the fastest way to fail technical diligence.
 *
 * `kind` drives how an entry is presented:
 *   note   — a field note or write-up that lives on this site, rendered from
 *            `body` at /research/<slug>
 *   paper  — a formal paper. If `pdf` is set the entry links straight out to
 *            it, otherwise it renders like a note.
 */

export type ResearchBlock =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "list"; items: string[] };

export type ResearchEntry = {
  slug: string;
  kind: "note" | "paper";
  title: string;
  summary: string;
  /** ISO date. Drives ordering and the printed date. */
  date: string;
  authors: string[];
  tags: string[];
  /** External link — set for papers hosted off-site (arXiv, a PDF, a journal). */
  pdf?: string;
  /** Rendered at /research/<slug> when there is no external link. */
  body?: ResearchBlock[];
  /** Only published entries are listed or routable. */
  published: boolean;
};

export const research: ResearchEntry[] = [
  {
    slug: "what-compliance-teams-actually-do",
    kind: "note",
    title: "What compliance teams in regulated industries actually do all day",
    summary:
      "Field notes from conversations with compliance, risk, and audit practitioners — where the work really goes wrong, and why it is a knowledge problem before it is a software problem.",
    date: "2026-07-30",
    authors: ["Aeronive Labs"],
    tags: ["Field research", "Regulated industries"],
    published: false, // TODO(aeronive): publish once the write-up below is real.
    body: [
      {
        type: "p",
        text: "TODO — this is the single highest-value page on the site for an accelerator reviewer, because it is the one thing on here nobody else can write. Replace this scaffold with what the interviews actually turned up.",
      },
      { type: "h", text: "How the conversations happened" },
      {
        type: "p",
        text: "TODO — how many people, over what period, in which sectors, and how you got to them. Specificity is the whole point: 'twenty compliance leads across financial services and healthcare over six weeks' carries weight that 'extensive market research' never will.",
      },
      { type: "h", text: "What we expected to find" },
      {
        type: "p",
        text: "TODO — state the prior you walked in with, honestly, including the parts that turned out to be wrong. A note that admits a wrong prior is far more credible than one that does not.",
      },
      { type: "h", text: "What we found instead" },
      {
        type: "list",
        items: [
          "TODO — finding one, with the detail that makes it concrete",
          "TODO — finding two",
          "TODO — the finding that changed the product",
        ],
      },
      {
        type: "quote",
        text: "TODO — a direct quote from an interview, if you have consent to use it. Anonymised is fine.",
        attribution: "TODO — role, corridor",
      },
      { type: "h", text: "What we built because of it" },
      {
        type: "p",
        text: "TODO — draw the line from the finding to the product decision. This is the paragraph that proves the research was not decorative.",
      },
    ],
  },
  {
    slug: "citation-grounded-compliance-answers",
    kind: "paper",
    title: "Grounding compliance answers in the provision that produced them",
    summary:
      "A write-up of the retrieval and citation design behind the Aeronive platform, and how we evaluate whether a cited answer is actually supported by what it cites.",
    date: "2026-07-15",
    authors: ["Aeronive Labs"],
    tags: ["Retrieval", "Evaluation", "Method"],
    published: false, // TODO(aeronive): publish with the evaluation method and real numbers.
    body: [
      {
        type: "p",
        text: "TODO — the method write-up. If you publish a precision figure anywhere on this site, this is the page that has to explain how it was measured, on what set, and by whom. Publish the method and the number together or publish neither.",
      },
    ],
  },
];

/** Published entries, newest first. */
export function publishedResearch(): ResearchEntry[] {
  return research
    .filter((entry) => entry.published)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function findResearch(slug: string): ResearchEntry | undefined {
  return publishedResearch().find((entry) => entry.slug === slug);
}

export function formatResearchDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
