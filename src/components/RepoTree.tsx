import { useId } from "react";
import ScrollRegion from "@/components/ScrollRegion";
import { cn } from "@/lib/utils";

export type TreeNode = {
  /** Directories carry their own trailing slash. */
  name: string;
  /** Short gloss, set right of the name. */
  note?: string;
  children?: TreeNode[];
};

function Nodes({ nodes }: { nodes: TreeNode[] }) {
  return (
    <ul className="tree">
      {nodes.map((node, i) => (
        <li
          key={node.name}
          className={cn("tree-node", i === nodes.length - 1 && "tree-node--last")}
        >
          <span className="flex flex-wrap items-baseline gap-x-3">
            <span
              className={
                node.children ? "text-foreground" : "text-foreground/80"
              }
            >
              {node.name}
            </span>
            {node.note && (
              <span className="text-muted-foreground/70">{node.note}</span>
            )}
          </span>
          {node.children && <Nodes nodes={node.children} />}
        </li>
      ))}
    </ul>
  );
}

/**
 * The repository as it actually sits on disk. Connectors come from `.tree` in
 * the stylesheet rather than box characters, because OffBit is proportional.
 */
export default function RepoTree({
  root,
  nodes,
  caption,
}: {
  root: string;
  nodes: TreeNode[];
  caption?: string;
}) {
  const captionId = useId();

  return (
    <figure className="my-10">
      <ScrollRegion
        labelledBy={caption ? captionId : undefined}
        label={caption ? undefined : root}
        className="border-y border-border/60 py-6"
      >
        <div className="font-display min-w-[20rem] text-[13px] leading-[2]">
          <p className="text-accent">{root}</p>
          <Nodes nodes={nodes} />
        </div>
      </ScrollRegion>
      {caption && (
        <figcaption
          id={captionId}
          className="font-display mt-3 text-[11px] uppercase tracking-[0.14em] text-muted-foreground"
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
