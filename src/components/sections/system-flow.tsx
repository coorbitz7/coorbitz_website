import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import { cn } from "@/lib/utils";

const stages = [
  {
    label: "Business data",
    items: ["Orders, emails, documents", "Spreadsheets and exports", "Sensor and system logs"],
  },
  {
    label: "Systems",
    items: ["CRM, ERP, accounting", "Databases and APIs", "The tools you already pay for"],
  },
  {
    label: "AI models",
    items: ["LLMs and retrieval (RAG)", "Forecasting and scoring", "Classification and extraction"],
    accent: true,
  },
  {
    label: "AI agents",
    items: ["Plan multi-step tasks", "Call tools and systems", "Escalate to a person"],
    accent: true,
  },
  {
    label: "Automation",
    items: ["Workflows and schedules", "Integrations and webhooks", "Approvals and audit trail"],
  },
  {
    label: "Business action",
    items: ["Orders placed, invoices sent", "Replies drafted, tickets resolved", "Reports delivered, alerts raised"],
  },
];

function Connector({ vertical = false }: { vertical?: boolean }) {
  return (
    <svg
      aria-hidden
      className={cn("shrink-0 text-primary", vertical ? "mx-auto h-9 w-4" : "mt-9 h-4 w-10")}
      viewBox={vertical ? "0 0 16 36" : "0 0 40 16"}
      fill="none"
    >
      {vertical ? (
        <>
          <path d="M8 0 V26" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" className="animate-flow-dash" />
          <path d="M3 24 L8 30 L13 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </>
      ) : (
        <>
          <path d="M0 8 H30" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" className="animate-flow-dash" />
          <path d="M27 3 L33 8 L27 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
    </svg>
  );
}

export function SystemFlow() {
  return (
    <section id="how-it-connects" className="section-y scroll-mt-24 border-b">
      <Container>
        <SectionHeading
          index="03"
          eyebrow="How it connects"
          title="From business data to business action."
          description="This is the shape of most systems we build. Every layer is optional: plenty of good automation never touches a model, and no model gets to act without a way back."
        />

        <RevealOnScroll delay={0.1} className="mt-14">
          <div className="relative overflow-hidden rounded-lg border bg-card p-6 sm:p-8 lg:p-10">
            <div aria-hidden className="grid-paper absolute inset-0 opacity-70" />
            <ol className="relative flex flex-col lg:flex-row lg:items-start">
              {stages.map((stage, index) => (
                <li key={stage.label} className="contents">
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-xs text-muted-foreground">0{index + 1}</p>
                    <h3
                      className={cn(
                        "mt-2 flex items-center gap-2 font-heading text-lg font-semibold tracking-tight",
                        stage.accent && "text-primary"
                      )}
                    >
                      <span
                        aria-hidden
                        className={cn("size-2.5 rounded-full", stage.accent ? "bg-brand-sky" : "bg-foreground/60")}
                      />
                      {stage.label}
                    </h3>
                    <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                      {stage.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  {index < stages.length - 1 && (
                    <>
                      <div className="hidden lg:block">
                        <Connector />
                      </div>
                      <div className="lg:hidden">
                        <Connector vertical />
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ol>
            <p className="relative mt-10 border-t pt-5 font-mono text-xs leading-relaxed text-muted-foreground">
              <span className="text-foreground">Rule of thumb:</span> deterministic steps in plain code, judgment
              calls to a model, and anything irreversible past a person first.
            </p>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
