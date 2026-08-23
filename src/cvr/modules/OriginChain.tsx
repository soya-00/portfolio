import { useEffect, useRef, useState } from "react";
import ScrollRegion from "@/components/ScrollRegion";
import { cn } from "@/lib/utils";
import { VERIFICATION_LABEL } from "@/cvr/lib/citations";
import {
  chain,
  cutBranch,
  nodes,
  openQuestion,
  parallel,
  withSource,
} from "@/cvr/lib/origin";
import OriginChainText from "@/cvr/modules/OriginChain.text";

/**
 * From a recording to a training discipline, and what the arrows do not say.
 *
 * FORM. A sequence with a join, so a directed diagram and not a chart.
 * Nothing here has a magnitude: the payload is which document followed which,
 * and which of those links anyone can check. `choosing-a-form` sends
 * relationships between named things to a diagram, and this is that case.
 *
 * THE RISK THIS FORM CARRIES is specific and worth naming in code, because
 * it is not a rendering problem. An arrow reads as causation. Five boxes in
 * a row with four arrows between them argues, silently and without a source,
 * exactly the conclusion the charter forbids the piece from reaching. Three
 * things answer that:
 *
 *   1. the second strand is drawn, so the workshop visibly has an input that
 *      is not an accident and not a recording;
 *   2. the open question is drawn on the figure as a span across the whole
 *      chain, rather than written underneath it where a reader scanning the
 *      diagram will not meet it;
 *   3. the one claim on the chain that is not established carries its flag
 *      on the node itself.
 *
 * MOTION. The chain draws in sequence on entry. It is the one place motion
 * earns its keep here, because the subject is an order of events and the
 * animation traces that order. It encodes nothing: the finished frame holds
 * everything, and under prefers-reduced-motion the finished frame is the
 * only frame.
 */

const BOX_W = 54;
const BOX_H = 28;
const ROW_A = 48;
const ROW_B = 106;
const XS = [32, 94, 156, 218, 280];

function Box({
  x,
  y,
  label,
  when,
  dim = false,
  struck = false,
}: {
  x: number;
  y: number;
  label: string;
  when: string;
  dim?: boolean;
  struck?: boolean;
}) {
  return (
    <g>
      <rect
        x={x - BOX_W / 2}
        y={y - BOX_H / 2}
        width={BOX_W}
        height={BOX_H}
        fill="none"
        stroke="currentColor"
        strokeWidth={0.7}
        strokeDasharray={struck ? "2 1.6" : undefined}
        className={dim ? "text-border" : "text-accent"}
      />
      <text
        x={x}
        y={y - 2}
        textAnchor="middle"
        className={cn("fill-current", dim ? "text-muted-foreground" : "text-foreground")}
        style={{ fontSize: 5.2, textDecoration: struck ? "line-through" : undefined }}
      >
        {label}
      </text>
      <text
        x={x}
        y={y + 6}
        textAnchor="middle"
        className="fill-current text-muted-foreground"
        style={{ fontSize: 4 }}
      >
        {when}
      </text>
    </g>
  );
}

export default function OriginChain({
  announce,
}: {
  announce: (message: string) => void;
}) {
  const [armed, setArmed] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setReduced(true);
      setArmed(true);
      return;
    }
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (es) => {
        if (es.some((e) => e.isIntersecting)) {
          setArmed(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  /* Under reduced motion there is no transition and no delay, not merely a
     final state that arrives on schedule. Setting the end value while leaving
     the delay in place still staggers the figure in, which is the thing the
     preference asks not to happen. */
  const step = (i: number) =>
    reduced
      ? { opacity: 1 }
      : {
          opacity: armed ? 1 : 0,
          transition: "opacity 380ms ease-out",
          transitionDelay: `${i * 200}ms`,
        };

  return (
    <section
      id="the-chain"
      aria-labelledby="the-chain-heading"
      className="module my-12 scroll-mt-24 border-y border-border py-8"
    >
      <p className="font-display text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70">
        Module · three of four
      </p>
      <h3
        id="the-chain-heading"
        className="font-display mt-2 text-xl font-bold uppercase tracking-[0.06em] text-foreground"
      >
        From a recording to a discipline
      </h3>
      <p className="mt-3 max-w-[62ch] text-sm leading-relaxed text-muted-foreground">
        Every link below is a document, and every document can be checked. What
        the links do not establish is the direction of the causation running
        through them, which is the whole reason the chain is drawn with its
        second strand showing.
      </p>

      <div className="module-interactive">
        {/* Named short rather than pointed at the svg's own label: that label
            runs to a paragraph, and a region announces its name in full. */}
        <ScrollRegion
          label="Document chain"
          className="mt-6 border border-border/60 bg-background/40"
        >
          <svg
            ref={ref}
            viewBox="0 0 320 132"
            className="block h-auto w-full min-w-[42rem]"
            role="img"
            aria-label="A diagram of five documents in sequence, from the recording of December 1978 through the finding, the recommendation, the workshop and the first programme of 1981, with a simulator study of January 1979 joining the workshop as a separate input, and a renaming claim drawn off the chain and struck through as cut. The same content is listed beneath the diagram."
          >
            {/* The open question, drawn across the chain it qualifies. */}
            <g style={step(0)}>
              <path
                d={`M${XS[0]} 20 L${XS[0]} 14 L${XS[4]} 14 L${XS[4]} 20`}
                fill="none"
                stroke="currentColor"
                strokeWidth={0.6}
                className="text-border"
              />
              <text
                x={(XS[0] + XS[4]) / 2}
                y={10}
                textAnchor="middle"
                className="fill-current text-muted-foreground"
                style={{ fontSize: 5, letterSpacing: 0.4 }}
              >
                {openQuestion.label} Open.
              </text>
            </g>

            {chain.map((n, i) => (
              <g key={n.id} style={step(i + 1)}>
                <Box x={XS[i]} y={ROW_A} label={n.label} when={n.when} />
                {n.flag && (
                  <text
                    x={XS[i]}
                    y={ROW_A + BOX_H / 2 + 6}
                    textAnchor="middle"
                    className="fill-current text-muted-foreground"
                    style={{ fontSize: 3.8 }}
                  >
                    ◇ one claim unestablished
                  </text>
                )}
                {i < chain.length - 1 && (
                  <g className="text-accent">
                    <line
                      x1={XS[i] + BOX_W / 2}
                      y1={ROW_A}
                      x2={XS[i + 1] - BOX_W / 2 - 2}
                      y2={ROW_A}
                      stroke="currentColor"
                      strokeWidth={0.7}
                    />
                    <path
                      d={`M${XS[i + 1] - BOX_W / 2 - 2} ${ROW_A} l-2 -1.4 v2.8 z`}
                      fill="currentColor"
                    />
                  </g>
                )}
              </g>
            ))}

            {/* The second strand. Drawn to the workshop, because that is what
                the section says it fed. */}
            <g style={step(chain.length + 1)}>
              <Box
                x={XS[2]}
                y={ROW_B}
                label={parallel[0].label}
                when={parallel[0].when}
              />
              <path
                d={`M${XS[2] + BOX_W / 2} ${ROW_B} C 200 ${ROW_B}, ${XS[3]} ${ROW_B - 20}, ${XS[3]} ${ROW_A + BOX_H / 2 + 2}`}
                fill="none"
                stroke="currentColor"
                strokeWidth={0.7}
                className="text-accent"
              />
              <path
                d={`M${XS[3]} ${ROW_A + BOX_H / 2 + 2} l-1.4 2 h2.8 z`}
                fill="currentColor"
                className="text-accent"
              />
              <text
                x={XS[2]}
                y={ROW_B + BOX_H / 2 + 6}
                textAnchor="middle"
                className="fill-current text-muted-foreground"
                style={{ fontSize: 4 }}
              >
                not an accident, and not a recording
              </text>
            </g>

            {/* Cut, and drawn as cut rather than left out. */}
            <g style={step(chain.length + 2)}>
              <line
                x1={XS[4]}
                y1={ROW_A + BOX_H / 2}
                x2={XS[4]}
                y2={ROW_B - BOX_H / 2}
                stroke="currentColor"
                strokeWidth={0.6}
                strokeDasharray="2 1.6"
                className="text-border"
              />
              <Box
                x={XS[4]}
                y={ROW_B}
                label={cutBranch.label}
                when="cut · CL-03"
                dim
                struck
              />
            </g>
          </svg>
        </ScrollRegion>

        <p className="mt-3 max-w-[68ch] text-xs leading-relaxed text-muted-foreground/70">
          {openQuestion.detail}
        </p>

        <ol className="mt-6 space-y-px overflow-hidden border border-border bg-border">
          {nodes.map(withSource).map((n) => (
            <li key={n.id} className="bg-background">
              <button
                type="button"
                aria-expanded={open === n.id}
                aria-controls={`chain-${n.id}`}
                onClick={() => {
                  const next = open === n.id ? null : n.id;
                  setOpen(next);
                  announce(next ? `${n.label}, ${n.when}. ${n.detail}` : "Collapsed");
                }}
                className="js-only flex w-full items-baseline gap-3 px-5 py-3 text-left transition-colors hover:bg-foreground/[0.03] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent"
              >
                <span aria-hidden="true" className="text-accent">
                  {open === n.id ? "▾" : "▸"}
                </span>
                <span className="font-display text-sm uppercase tracking-[0.06em] text-foreground">
                  {n.label}
                </span>
                <span className="font-display ml-auto text-[10px] uppercase tracking-[0.14em] text-muted-foreground/70">
                  {n.when}
                  {n.strand === "parallel" && " · second strand"}
                </span>
              </button>
              <div
                id={`chain-${n.id}`}
                className={cn(
                  "chain-detail px-5 pb-4 text-sm leading-relaxed text-muted-foreground",
                  open === n.id ? "block" : "hidden"
                )}
              >
                <p className="no-js-only font-display pt-3 text-sm uppercase tracking-[0.06em] text-foreground">
                  {n.label} · {n.when}
                </p>
                <p className="mt-1">{n.detail}</p>
                {n.flag && (
                  <p className="mt-2 border-l-2 border-accent/60 pl-3 text-xs text-muted-foreground/85">
                    <span aria-hidden="true" className="mr-1 text-accent">◇</span>
                    {n.flag}
                  </p>
                )}
                {n.source && (
                  <p className="mt-2 text-xs text-muted-foreground/70">
                    <cite className="not-italic">{n.source.citation}</cite> ·{" "}
                    {VERIFICATION_LABEL[n.source.verification]}
                    {n.source.url && (
                      <>
                        {" · "}
                        <a
                          href={n.source.url}
                          target="_blank"
                          rel="noreferrer"
                          className="underline decoration-border underline-offset-2 transition-colors hover:decoration-accent"
                        >
                          Source
                        </a>
                      </>
                    )}
                  </p>
                )}
              </div>
            </li>
          ))}
          <li className="bg-background px-5 py-4">
            <p className="font-display text-sm uppercase tracking-[0.06em] text-muted-foreground line-through">
              {cutBranch.label}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground/85">
              {cutBranch.detail}
            </p>
            <p className="font-display mt-2 text-[10px] uppercase tracking-[0.14em] text-muted-foreground/70">
              Cut · {cutBranch.id} · drawn here rather than omitted, because a
              claim a reader has met elsewhere should be visibly refused
            </p>
          </li>
        </ol>
      </div>

      <div className="module-equivalent">
        <OriginChainText />
      </div>
    </section>
  );
}
