import Figure from "@/components/Figure";
import WriteupPage, { H2 } from "@/components/WriteupPage";

export default function GalsWriteup() {
  return (
    <WriteupPage
      name="GALS"
      kicker="Try out a career before you have to choose one."
      meta={[
        {
          label: "Built with",
          value: "FastAPI · Jinja · HTMX · Tailwind · Render",
        },
        {
          label: "Status",
          value:
            "Deployed prototype. Shared accounts, no per-student privacy yet.",
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
      lead={
        <>
          <p>
            Vietnamese students choose a university track at sixteen, largely
            from descriptions. A description of epidemiology tells you what an
            epidemiologist is called and roughly what they study. It does not
            tell you what it feels like to face thirty-eight sick students and
            decide what you actually know.
          </p>
          <p>
            GALS puts the student inside a real situation from a profession and
            asks them to work it. The claim is narrow and I want to keep it
            narrow: this does not tell anyone what to be. It gives them one
            honest hour of what the work is like.
          </p>
        </>
      }
    >
      <Figure
        src="04khonggiantuduy.png"
        alt="A GALS scenario in Vietnamese: the student is an epidemiologist investigating 38 sick boarding-school students. The assistant replies by asking which parts of the student's reasoning are known and which are being guessed."
        caption="The assistant answering a student with a question, not a solution"
      />

      <H2>What it refuses</H2>
      <p>
        No scores. No rankings. No model answers. These are not missing
        features. The system prompt forbids the AI to grade.
      </p>
      <p>
        Grading converts exploration into examination. Examination is the thing
        these students already have too much of. A student who is graded
        optimizes for the grade. A student who is not graded can afford to write
        down a wrong idea. That is the only way to learn it was wrong.
      </p>
      <p>
        The assistant is constrained in the same direction. It asks questions
        back. It does not solve. In the screenshot above, the student says
        thirty-one of thirty-eight ate at the canteen. The assistant does not
        confirm or correct. It asks which part they know for certain and which
        part they guess. That distinction is the actual skill.
      </p>

      <H2>Each profession thinks differently</H2>
      <p>
        The sharpest design decision in the codebase is two data fields: the
        domain skill and the shape of the thing produced. Without them, every
        scenario collapses into the same template — interview some users, then
        design an app. A student who does four of those learns that all
        professions are product design.
      </p>
      <p>
        So an energy engineer produces a system plan. An epidemiologist produces
        an investigation plan. A cybersecurity analyst produces an incident
        response procedure. Design Thinking is scaffolding for the interface,
        not a claim about how every field reasons. The labels live in the
        scenario data, not in the code. The words a profession uses for its own
        stages are part of what distinguishes it.
      </p>

      <Figure
        src="02trangcanhan.png"
        alt="A GALS student home page in Vietnamese showing counts of journal entries, portfolio items and badges, two written notes from a teacher, and four unordered entry points into the app."
        caption="A student's page: a teacher's notes, and four ways in with no required order"
      />

      <H2>Why the limits are written down at length</H2>
      <p>
        The prototype has three shared accounts. Every student who uses it can
        read every other student's work. The database resets when the free
        server sleeps. Registration does not create an account.
      </p>
      <p>
        The users are minors, so none of that may surface after the fact. I
        wrote it down in full before I invited anyone in. That includes the
        instruction not to run it with real students yet, and a separation
        between what the design intends and what the prototype achieves. The
        privacy promise — a teacher cannot see a student who has not entered a
        class code — is named as an intention, not a guarantee. That is what it
        currently is.
      </p>
      <p>
        Screens are in Vietnamese because the students are. I self-host the
        typefaces and chose them for Vietnamese diacritics, which most default
        stacks render badly.
      </p>

      <H2>Where it goes next</H2>
      <p>
        Real per-student accounts, so the privacy promise becomes a guarantee
        rather than an intention — and then a cohort of about three hundred
        students. Everything in the legal document must be false before that can
        happen. That is the point of writing it.
      </p>
    </WriteupPage>
  );
}
