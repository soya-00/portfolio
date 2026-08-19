import { useEffect, useRef, useState } from "react";
import {
  FIELDS,
  REGIME_LABEL,
  type RegimeClass,
} from "@/cvr/lib/jurisdictions";
import {
  REGIME_MARK,
  nonTerritorial,
  placed,
  px,
  py,
} from "@/cvr/lib/geography";

/**
 * The comparison, placed.
 *
 * FORM. A schematic world, and not a choropleth. A choropleth would need a
 * colour class per regime and would fill territory the research never
 * examined, which is the module's stated failure mode wearing a map's
 * clothes. Here the ground is empty, every mark is a record, and the reader
 * is told in the legend that unmarked territory means unstudied.
 *
 * MOTION. The markers acquire in a stagger on entry, in the register of an
 * instrument self-test rather than of anything happening to an aircraft. It
 * carries no data: identical information is on screen before and after it
 * runs. Under prefers-reduced-motion the sequence does not run at all and
 * every mark is present from the first frame.
 *
 * The ring around each marker encodes how much of that jurisdiction is
 * established, as a fraction of six fields, drawn as an arc. That is a
 * genuine quantity — a count out of a fixed denominator — so an arc is a
 * fair encoding of it. The count is printed beside it either way.
 */

const R = 3.4;
const CIRC = 2 * Math.PI * R;

export default function DivergenceMap() {
  const [armed, setArmed] = useState(false);
  const [reduced, setReduced] = useState(false);
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
      setArmed(true);
      return;
    }
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setArmed(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div className="mt-6">
      <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[11px] text-muted-foreground">
        {(
          [
            "express-bar",
            "separation-principle",
            "discretionary",
            "judicial-seizure",
            "NOT-DOCUMENTED",
          ] as RegimeClass[]
        ).map((k) => (
          <li key={k} className="flex items-center gap-1.5">
            <span aria-hidden="true" className="text-accent">
              {REGIME_MARK[k]}
            </span>
            {REGIME_LABEL[k]}
          </li>
        ))}
      </ul>

      <div className="mt-4 overflow-x-auto border border-border/60 bg-background/40">
        <svg
          ref={ref}
          viewBox="0 14 360 122"
          className="block h-auto w-full min-w-[38rem]"
          role="img"
          aria-label={`Schematic world showing where each of the ${placed.length} territorial jurisdictions in this comparison sits, with how many of its six fields are established. The full figures are in the table and in the textual equivalent.`}
        >
          {/* Graticule. Orientation only, and no coastline: the map draws
              what the corpus holds and leaves the rest of the world blank. */}
          <g aria-hidden="true" stroke="currentColor" className="text-border/50">
            {[-150, -120, -90, -60, -30, 0, 30, 60, 90, 120, 150].map((lon) => (
              <line key={lon} x1={px(lon)} y1={14} x2={px(lon)} y2={136} strokeWidth={0.3} />
            ))}
            {[-30, 0, 30, 60].map((lat) => (
              <line key={lat} x1={0} y1={py(lat)} x2={360} y2={py(lat)} strokeWidth={0.3} />
            ))}
            <line x1={0} y1={py(0)} x2={360} y2={py(0)} strokeWidth={0.7} />
          </g>

          {placed.map((r, i) => {
            const x = px(r.lon);
            const y = py(r.lat);
            const share = r.documented / FIELDS.length;
            const blank = r.documented === 0;
            return (
              <g
                key={r.id}
                /* No transition at all under reduced motion, since a delayed
                   arrival is still an arrival. */
                style={
                  reduced
                    ? { opacity: 1 }
                    : {
                        opacity: armed ? 1 : 0,
                        transition: "opacity 420ms ease-out",
                        transitionDelay: `${i * 70}ms`,
                      }
                }
              >
                {/* The ring: how much of this jurisdiction is established. */}
                <circle
                  cx={x}
                  cy={y}
                  r={R}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.1}
                  className="text-border"
                />
                {share > 0 && (
                  <circle
                    cx={x}
                    cy={y}
                    r={R}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.1}
                    className="text-accent"
                    strokeDasharray={`${CIRC * share} ${CIRC}`}
                    transform={`rotate(-90 ${x} ${y})`}
                    strokeLinecap="butt"
                  />
                )}
                {blank && (
                  <line
                    x1={x - R}
                    y1={y}
                    x2={x + R}
                    y2={y}
                    stroke="currentColor"
                    strokeWidth={1}
                    className="text-muted-foreground"
                  />
                )}
                <text
                  x={x + r.dx}
                  y={y + r.dy}
                  textAnchor={r.anchor}
                  className="fill-current text-foreground"
                  style={{ fontSize: 5.4 }}
                >
                  <tspan className="fill-current text-accent">
                    {REGIME_MARK[r.regime]}
                  </tspan>{" "}
                  {r.country}
                  <tspan className="fill-current text-muted-foreground">
                    {" "}
                    {r.documented}/{FIELDS.length}
                  </tspan>
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <p className="mt-3 max-w-[68ch] text-xs leading-relaxed text-muted-foreground/70">
        Unmarked territory means unstudied and not unprotected. Every country
        outside the fourteen records was never examined here, so the map
        leaves it blank instead of giving it a colour a reader would take as
        a finding. The ring shows how many of the six fields are established
        for that jurisdiction, and the figure beside each name says the same
        thing in numerals.
      </p>

      {/* Two records that are not places. Putting either on a dot would
          claim a reach neither has. */}
      <div className="mt-5 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
        {nonTerritorial.map((r) => (
          <div key={r.id} className="bg-background px-5 py-4">
            <p className="font-display flex items-baseline gap-2 text-[11px] uppercase tracking-[0.14em] text-accent">
              <span aria-hidden="true">{REGIME_MARK[r.regime]}</span>
              {r.country}
            </p>
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
              {REGIME_LABEL[r.regime]} · {r.documented} of {FIELDS.length}{" "}
              fields established. Not drawn on the map: a legal order and an
              international standard have no territory of their own, and a dot
              would give each a reach it does not have.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
