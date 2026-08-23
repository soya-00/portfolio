import { useState } from "react";
import { cn } from "@/lib/utils";
import { ACCESS_LABEL, VERIFICATION_LABEL } from "@/cvr/lib/citations";
import {
  LANGUAGE_NAME,
  LICENCE_LABEL,
  STATUS_GLYPH,
  STATUS_LABEL,
  STATUS_NOTE,
  byAccess,
  byLicence,
  byVerification,
  cuts,
  cutsByStatus,
  nonEnglish,
  register,
  unlinked,
} from "@/cvr/lib/apparatus";

/**
 * The cut list and the source register.
 *
 * Neither is a visualization and neither should be. A cut list is a set of
 * refusals with reasons, and a source register is a bibliography: both are
 * identity and reason rather than magnitude, which `choosing-a-form` sends
 * to a table. The only numbers are the tallies, and those are stat pairs.
 *
 * The register prints the license and the verification tier on every entry,
 * because a reader who has been promised source resolution is owed the
 * grade of each one. Thirteen entries have no URL, which is said in place
 * rather than left as an absent link.
 */

export function CutList() {
  return (
    <div className="mt-8">
      <h3 className="font-display text-lg font-bold uppercase tracking-[0.06em] text-foreground">
        The cut list
      </h3>
      <p className="mt-2 max-w-[62ch] text-sm leading-relaxed text-muted-foreground">
        {cuts.length} claims were examined and did not survive as written. Each
        carries what was searched before it was decided. If one of these
        reappears in the piece, it reappears in error.
      </p>

      <div className="mt-6 space-y-8">
        {cutsByStatus
          .filter((g) => g.members.length > 0)
          .map((g) => (
            <div key={g.status}>
              <p className="font-display flex items-baseline gap-2 text-[11px] uppercase tracking-[0.14em] text-accent">
                <span aria-hidden="true">{STATUS_GLYPH[g.status]}</span>
                {STATUS_LABEL[g.status]}
                <span className="tabular-nums text-muted-foreground/75">
                  {g.members.length}
                </span>
              </p>
              <p className="mt-1 text-xs text-muted-foreground/70">
                {STATUS_NOTE[g.status]}
              </p>
              <ul className="mt-3 space-y-4">
                {g.members.map((c) => (
                  <li
                    key={c.id}
                    id={c.id}
                    className="scroll-mt-24 border-l-2 border-border pl-4"
                  >
                    <p className="text-sm leading-relaxed text-foreground/90">
                      {c.claim}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {c.reason}
                    </p>
                    <p className="font-display mt-1.5 text-[10px] uppercase tracking-[0.14em] text-muted-foreground/75">
                      {c.id} · searched: {c.searched.join(" · ")}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
      </div>
    </div>
  );
}

export function SourceRegister({
  announce,
}: {
  announce: (message: string) => void;
}) {
  const [onlyUnlinked, setOnlyUnlinked] = useState(false);
  const rows = onlyUnlinked ? unlinked : register;

  return (
    <div className="mt-12">
      <h3 className="font-display text-lg font-bold uppercase tracking-[0.06em] text-foreground">
        The source register
      </h3>
      <p className="mt-2 max-w-[62ch] text-sm leading-relaxed text-muted-foreground">
        Every source the piece rests on, with what it costs to reach, what may
        be reproduced of it, and how well it was checked. {unlinked.length} of
        the {register.length} have no address to link to, which is stated on
        the entry rather than left as a link that goes nowhere.
      </p>

      <dl className="mt-5 grid gap-x-8 gap-y-2 text-xs sm:grid-cols-3">
        <div>
          <dt className="font-display text-[10px] uppercase tracking-[0.14em] text-muted-foreground/70">
            Access
          </dt>
          <dd className="mt-1 text-muted-foreground">
            {byAccess.filter((a) => a.n > 0).map((a) => `${ACCESS_LABEL[a.access]} ${a.n}`).join(" · ")}
          </dd>
        </div>
        <div>
          <dt className="font-display text-[10px] uppercase tracking-[0.14em] text-muted-foreground/70">
            Licence
          </dt>
          <dd className="mt-1 text-muted-foreground">
            {byLicence.filter((l) => l.n > 0).map((l) => `${LICENCE_LABEL[l.status]} ${l.n}`).join(" · ")}
          </dd>
        </div>
        <div>
          <dt className="font-display text-[10px] uppercase tracking-[0.14em] text-muted-foreground/70">
            How well checked
          </dt>
          <dd className="mt-1 text-muted-foreground">
            {byVerification.filter((v) => v.n > 0).map((v) => `${VERIFICATION_LABEL[v.v]} ${v.n}`).join(" · ")}
          </dd>
        </div>
      </dl>

      <button
        type="button"
        aria-pressed={onlyUnlinked}
        onClick={() => {
          setOnlyUnlinked((v) => !v);
          announce(
            onlyUnlinked
              ? `Showing all ${register.length} sources`
              : `Showing the ${unlinked.length} sources with no address`
          );
        }}
        className="js-only font-display mt-5 border border-border px-3 py-1.5 text-[11px] uppercase tracking-[0.12em] text-foreground/70 transition-colors hover:border-accent/60 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <span aria-hidden="true" className="mr-1.5">
          {onlyUnlinked ? "◼" : "◻"}
        </span>
        Only what cannot be linked
      </button>

      <ol className="mt-5 space-y-px overflow-hidden border border-border bg-border">
        {rows.map((s) => (
          <li key={s.id} id={`src-${s.id}`} className="scroll-mt-24 bg-background px-5 py-4">
            <p className="text-sm leading-relaxed text-foreground/90">
              <cite className="not-italic">{s.citation}</cite>
            </p>
            <p className="font-display mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-[10px] uppercase tracking-[0.14em] text-muted-foreground/70">
              <span>{s.authority}</span>
              <span aria-hidden="true">·</span>
              <span>{s.type.replace(/-/g, " ")}</span>
              <span aria-hidden="true">·</span>
              <span>{LANGUAGE_NAME[s.language] ?? s.language}</span>
              <span aria-hidden="true">·</span>
              <span>{ACCESS_LABEL[s.access]}</span>
              <span aria-hidden="true">·</span>
              <span>{LICENCE_LABEL[s.licence.status]}</span>
              <span aria-hidden="true">·</span>
              <span>{VERIFICATION_LABEL[s.verification]}</span>
            </p>
            <p className="mt-1.5 text-xs text-muted-foreground/70">
              {s.url ? (
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="underline decoration-border underline-offset-2 transition-colors hover:decoration-accent"
                >
                  {s.url}
                </a>
              ) : (
                <span>
                  No address. Cite this one by its authority, number and date:{" "}
                  {[s.authority, s.number, s.date].filter(Boolean).join(", ")}.
                </span>
              )}
            </p>
          </li>
        ))}
      </ol>

      <p className="mt-4 max-w-[68ch] text-xs leading-relaxed text-muted-foreground/70">
        {nonEnglish.length} of the {register.length} are not in English. Where
        a reading rests on one of those, it was made against the original and
        not against an English summary, and any English rendering shown in
        this piece is marked unofficial at the point it appears.
      </p>
    </div>
  );
}

export function ApparatusExtras({
  announce,
  className,
}: {
  announce: (message: string) => void;
  className?: string;
}) {
  return (
    <div className={cn(className)}>
      <CutList />
      <SourceRegister announce={announce} />
    </div>
  );
}
