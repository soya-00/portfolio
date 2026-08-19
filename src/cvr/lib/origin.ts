import { sources } from "@/cvr/lib/citations";

/**
 * The chain from a recording to a training discipline.
 *
 * ORDER. The sequence is stated in the prose — "the sequence therefore runs
 * from recording to finding, recommendation, workshop and programme" — and
 * the nodes below reproduce that order and nothing else. They are NOT placed
 * on a metric time axis. Two of the dates overlap to the month and one
 * carries only a year, so a measured axis would have to invent an ordering
 * the record does not establish, and the layout would then be making a claim
 * no source supports. Each node prints its own date instead.
 *
 * THE SECOND STRAND is the section's argument. The workshop had an empirical
 * basis and it was not a recording: a simulator study, with a control
 * condition and survivors, which an accident investigation cannot have. A
 * chain drawn as one line would quietly assert the conventional answer.
 */

export type Node = {
  id: string;
  label: string;
  when: string;
  detail: string;
  sourceRef: string;
  /** Second strand, joining the chain rather than running along it. */
  strand: "chain" | "parallel";
  flag?: string;
};

export const nodes: Node[] = [
  {
    id: "recording",
    label: "The recording",
    when: "28 December 1978",
    detail:
      "A DC-8 held near Portland, Oregon, with a landing gear indication problem until it ran out of fuel. Ten people died.",
    sourceRef: "ntsb-aar-79-07",
    strand: "chain",
  },
  {
    id: "finding",
    label: "The finding",
    when: "Report of 7 June 1979",
    detail:
      "The Board's probable cause turned on the captain's failure to monitor and respond to the fuel state, and its contributing factor on the other two crewmembers failing to comprehend the criticality or to communicate their concern successfully. A finding about a conversation, and not about a component or a procedure.",
    sourceRef: "ntsb-aar-79-07",
    strand: "chain",
  },
  {
    id: "recommendation",
    label: "The recommendation",
    when: "1979",
    detail:
      "A-79-47 urged that flight crews be indoctrinated in the principles of flight deck resource management, with emphasis on participative management for captains and assertiveness training for other cockpit crewmembers. The vocabulary of what became CRM is present here, addressed to a regulator.",
    sourceRef: "ntsb-rec-a-79-047",
    strand: "chain",
    flag:
      "Its authorship is attributed in secondary sources to a named NTSB specialist. That attribution has not been traced to a primary NTSB document, and is widely repeated rather than established.",
  },
  {
    id: "workshop",
    label: "The workshop",
    when: "June 1979",
    detail:
      "NASA Ames convened an industry workshop in San Francisco. Its proceedings were published as Resource Management on the Flight Deck, and it is at that meeting that the label Cockpit Resource Management was applied.",
    sourceRef: "nasa-cp-2120",
    strand: "chain",
  },
  {
    id: "programme",
    label: "The first programme",
    when: "1981",
    detail:
      "The first comprehensive US programme was launched by an airline on a management-training model imported from outside aviation. The vocabulary that spread was organisational and not forensic.",
    sourceRef: "helmreich-merritt-wilhelm-1999",
    strand: "chain",
  },
  {
    id: "simulator",
    label: "The simulator study",
    when: "January 1979",
    detail:
      "NASA put full crews through a demanding scenario in a controlled setting. Coordination varied enormously between crews facing identical conditions, and the variation predicted outcomes. An experimental finding, with a control condition and a denominator, on crews who all walked out afterwards.",
    sourceRef: "nasa-tm-78482",
    strand: "parallel",
  },
];

export const chain = nodes.filter((n) => n.strand === "chain");
export const parallel = nodes.filter((n) => n.strand === "parallel");

export const withSource = (n: Node) => ({ ...n, source: sources[n.sourceRef] ?? null });

/** The rename claim, searched for and cut. Drawn off the chain, struck. */
export const cutBranch = {
  id: "CL-03",
  label: "The renaming claim",
  detail:
    "That a 1989 UK accident prompted the rename from Cockpit to Crew Resource Management. Two search rounds found no source asserting it, and the chronology does not work: the canonical account places the rename in the mid-1980s, before that accident happened.",
};

/**
 * What the chain does not settle, stated on the chain itself.
 *
 * The charter's overriding constraint is that a draft resolving into "the
 * recordings revealed the problem and CRM was the answer" has failed. A
 * diagram is exactly where that resolution happens by accident, because an
 * arrow reads as causation whether or not anyone claimed it. So the open
 * question is drawn as part of the figure and not written underneath it.
 */
export const openQuestion = {
  label: "Cause, or persuasion?",
  detail:
    "Whether the recording caused what followed, or whether it made an argument already in circulation persuasive, is the question this piece keeps open. Portland is the strongest case for the conventional answer, which is why the care taken here matters more than it does anywhere else.",
};
