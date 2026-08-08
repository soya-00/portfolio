import Figure from "@/components/Figure";
import WriteupPage, { H2 } from "@/components/WriteupPage";

export default function GalsWriteup() {
  return (
    <WriteupPage
      bay="LANDED"
      name="GALS"
      kicker="Try out a career before you have to choose one."
      meta={[
        { label: "Built with", value: "FastAPI · Jinja · HTMX · Tailwind · Render" },
        {
          label: "Status",
          value: "Deployed prototype. Shared accounts, no per-student privacy yet.",
        },
        { label: "Checked by", value: "63 tests, run by CI on every push." },
      ]}
      links={[
        { label: "Live demo", href: "https://steam-mvp.onrender.com" },
        { label: "Repository", href: "https://github.com/soya-00/steam-mvp" },
        {
          label: "LEGAL.md",
          href: "https://github.com/soya-00/steam-mvp/blob/main/LEGAL.md",
        },
      ]}
    >
      <H2>The problem</H2>
      <p>
        Vietnamese students choose a university track at sixteen, largely on the
        basis of descriptions. A description of epidemiology tells you what an
        epidemiologist is called and roughly what they study. It does not tell
        you what it feels like to look at thirty-eight sick students and have to
        decide what you actually know.
      </p>
      <p>
        GALS puts the student inside a real situation from a profession and asks
        them to work it. The claim is narrow and I want to keep it narrow: this
        does not tell anyone what to be.{" "}
        <span className="text-foreground">
          It gives them one honest hour of what the work is like.
        </span>
      </p>

      <Figure
        src="04khonggiantuduy.png"
        alt="A GALS scenario in Vietnamese: the student is an epidemiologist investigating 38 sick boarding-school students. The assistant replies by asking which parts of the student's reasoning are known and which are being guessed."
        caption="The assistant answering a student with a question, not a solution"
      />

      <H2>What it refuses</H2>
      <p>
        No scores. No rankings. No model answers. These are not features that
        have not been built yet — the AI is forbidden from grading in its own
        system prompt.
      </p>
      <p>
        The reason is that grading converts exploration into examination, and
        examination is the thing these students already have too much of. A
        student who is being marked optimises for the mark. A student who is not
        being marked can afford to write down a wrong idea, which is the only
        way to find out it was wrong.
      </p>
      <p>
        The assistant is constrained in the same direction. It asks questions
        back; it does not solve. In the screenshot above the student says thirty
        one of thirty eight ate at the canteen, and the assistant does not
        confirm or correct — it asks which part of that they know for certain
        and which part they are guessing. That distinction is the actual skill.
      </p>

      <H2>Each profession thinks differently</H2>
      <p>
        The sharpest design decision in the codebase is two data fields:
        the domain skill and the shape of the thing produced. They exist because
        without them every scenario collapses into the same generic template —
        interview some users, then design an app — and a student who does four
        of those has learned that all professions are product design.
      </p>
      <p>
        So an energy engineer produces a system plan. An epidemiologist produces
        an investigation plan. A cybersecurity analyst produces an incident
        response procedure. Design Thinking is scaffolding for the interface, not
        a claim about how every field reasons. The labels live in the scenario
        data rather than in the code, because the words a profession uses for its
        own stages are part of what distinguishes it.
      </p>

      <Figure
        src="02trangcanhan.png"
        alt="A GALS student home page in Vietnamese showing counts of journal entries, portfolio items and badges, two written notes from a teacher, and four unordered entry points into the app."
        caption="A student's page: a teacher's notes, and four ways in with no required order"
      />

      <H2>Why the limits are written down at length</H2>
      <p>
        The prototype has three shared accounts. Every student using it can read
        every other student's work. The database resets when the free server
        sleeps. Registering does not create an account at all.
      </p>
      <p>
        Because the users are minors, none of that is acceptable to discover
        after the fact, so it is written down in full before anyone is invited
        in — including the instruction not to run it with real students yet, and
        an explicit separation between what the design intends and what the
        prototype achieves. The privacy promise, that a teacher cannot see a
        student who has not entered a class code, is named there as an intention
        rather than a guarantee, because that is what it currently is.
      </p>
      <p>
        Screens are in Vietnamese because the students are. Typefaces are
        self-hosted and chosen for Vietnamese diacritics, which most default
        stacks render badly.
      </p>

      <H2>Where it goes next</H2>
      <p>
        Real per-student accounts, so the privacy promise becomes a guarantee
        rather than an intention — and then a cohort of about three hundred
        students. Everything in the legal document has to be false before that
        can happen, which is the point of having written it.
      </p>
    </WriteupPage>
  );
}
