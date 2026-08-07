import { cn } from "@/lib/utils";

type Leaf = { label: string; href?: string; note?: string };
type Branch = { name: string; bay: string; stack: string; leaves: Leaf[] };

const TREE: Branch[] = [
  {
    name: "tilt",
    bay: "HOLDING",
    stack: "Python · FastAPI · SQLite · React · Tauri",
    leaves: [
      { label: "SECURITY.md", href: "https://github.com/soya-00/tilt/blob/main/SECURITY.md", note: "the audit" },
      { label: "repository", href: "https://github.com/soya-00/tilt" },
    ],
  },
  {
    name: "gals",
    bay: "LANDED",
    stack: "FastAPI · Jinja · HTMX · Render",
    leaves: [
      { label: "steam-mvp.onrender.com", href: "https://steam-mvp.onrender.com", note: "live" },
      { label: "LEGAL.md", href: "https://github.com/soya-00/steam-mvp/blob/main/LEGAL.md", note: "limits, in full" },
      { label: "repository", href: "https://github.com/soya-00/steam-mvp" },
    ],
  },
  {
    name: "bloc-os",
    bay: "ACTIVE",
    stack: "C · AArch64 assembly · QEMU · Raspberry Pi 5",
    leaves: [
      { label: "DECISIONS.md", href: "https://github.com/soya-00/bloc-os/blob/main/docs/DECISIONS.md", note: "the log" },
      { label: "DESIGN.md", href: "https://github.com/soya-00/bloc-os/blob/main/docs/DESIGN.md", note: "the flight deck" },
      { label: "repository", href: "https://github.com/soya-00/bloc-os" },
      { label: "bloc-os-beta", href: "https://github.com/soya-00/bloc-os-beta", note: "the prototype" },
    ],
  },
];

function LeafRow({ leaf, last }: { leaf: Leaf; last: boolean }) {
  return (
    <li className={cn("tree-node", last && "tree-node--last")}>
      <span className="flex flex-wrap items-baseline gap-x-3">
        {leaf.href ? (
          <a
            href={leaf.href}
            target="_blank"
            rel="noreferrer"
            className="text-foreground/85 underline decoration-border underline-offset-4 transition-colors hover:decoration-accent hover:text-foreground"
          >
            {leaf.label}
          </a>
        ) : (
          <span className="text-foreground/85">{leaf.label}</span>
        )}
        {leaf.note && (
          <span className="text-muted-foreground/70">{leaf.note}</span>
        )}
      </span>
    </li>
  );
}

export default function ProjectTree() {
  return (
    <div className="font-display overflow-x-auto text-[13px] leading-[2]">
      <div className="min-w-[22rem]">
        <p className="text-accent">soya</p>
        <ul className="tree">
          {TREE.map((branch, i) => (
            <li
              key={branch.name}
              className={cn(
                "tree-node",
                i === TREE.length - 1 && "tree-node--last"
              )}
            >
              <span className="flex flex-wrap items-baseline gap-x-4">
                <span className="text-foreground">{branch.name}</span>
                <span className="text-accent/80">[{branch.bay}]</span>
                <span className="text-muted-foreground/70">{branch.stack}</span>
              </span>
              <ul className="tree">
                {branch.leaves.map((leaf, j) => (
                  <LeafRow
                    key={leaf.label}
                    leaf={leaf}
                    last={j === branch.leaves.length - 1}
                  />
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
