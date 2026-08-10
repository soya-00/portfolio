import CaseStudyPage, { type CaseSection } from "@/components/CaseStudyPage";
import {
  BeforeAfter,
  DataTable,
  Decision,
  H3,
  Note,
  Stats,
  Swatches,
} from "@/components/CaseParts";
import Figure from "@/components/Figure";

const SECTIONS: CaseSection[] = [
  {
    id: "premise",
    label: "Premise",
    title: "Premise",
    kicker:
      "Careers get taught as descriptions. Nobody picks a job from a description.",
    body: (
      <>
        <p>
          Vietnamese career guidance at high-school level tends to arrive as a
          list of professions with entry requirements attached, which means a
          student can read what an epidemiologist is and come away knowing
          nothing about whether they would want to be one.
        </p>
        <p>
          GALS starts from the opposite end, handing a student a live problem
          together with the role that owns it — 38 boarding-school pupils are
          sick in four days, parents have already decided the canteen is to
          blame, and you are the epidemiologist who has to work it out.
        </p>
        <p>
          The four stages are Design Thinking — understand, empathize, create,
          reflect — but the framework is only scaffolding. What makes a scenario
          worth anything is that the evidence inside it behaves the way evidence
          behaves in that profession. Every scenario ends on deliberately
          ambiguous evidence with a planted confounder the student has to notice
          unaided: three straight weeks of heat, exams that just finished, no
          control group.
        </p>

        <DataTable
          head={["Branch", "Field", "In role as"]}
          minWidth="24rem"
          rows={[
            ["Khoa học", "Epidemiology", "An"],
            ["Công nghệ", "Cybersecurity", "Quyên"],
            ["Kỹ thuật", "Energy", "Hằng"],
            ["Nghệ thuật", "Product design", "Hoa"],
            ["Toán", "Data analysis", "Ngọc"],
          ]}
          caption="Five branches, five protagonists"
        />

        <p>
          Three of the five protagonists are women in careers that Vietnamese
          students default to reading as male. That is not set dressing —
          putting Hằng in energy engineering is the most direct lever the
          product has on gender assumption in STEAM, and it costs nothing to
          pull.
        </p>

        <p>
          Ngọc&apos;s scenario hands her nine hundred million to divide across
          two hundred and forty applications, and the question the app puts in
          front of her is which parts of an application reflect a real situation
          and which reflect a student&apos;s ability to describe one. The
          evidence rail down the right is where that becomes answerable rather
          than rhetorical, because among the lines accumulating there is the
          fact that twelve applications share a single handwriting — a teacher
          filled them in — and that those twelve read as markedly more
          convincing than the rest.
        </p>
        <p>
          Nothing in the interface tells her what to do with that. The
          confounder is placed where she can find it, and finding it is the
          exercise.
        </p>

        <Figure
          src="03scenario.png"
          alt="A GALS scenario workspace in Vietnamese: the student is in role as Ngọc, a data analyst, on question 2 of 5 of the empathize stage, asked what in an application set reflects real circumstances and what reflects presentation skill. The assistant asks a question back, and a right-hand rail lists accumulated facts including twelve applications sharing one handwriting."
          caption="Prototype interface, not final — one question, the role on the left, and the evidence rail accumulating on the right"
        />
      </>
    ),
  },
  {
    id: "principles",
    label: "Four principles",
    title: "Principles",
    kicker: "Four rules that decided most of the arguments",
    body: (
      <>
        <p>
          Each one is cheap to write and expensive to keep. The right-hand
          column is what each rule actually cost.
        </p>

        <DataTable
          head={["Rule", "What it forbids", "What it cost"]}
          minWidth="40rem"
          rows={[
            [
              "No grading",
              "No score, no rank, no “model answer”, anywhere, including from the AI",
              "Teachers get counts and stage state, never a leaderboard. A grade-level badge in the original mockup was cut for being a rank in disguise.",
            ],
            [
              "A tool, not a course",
              "No lesson 1 → lesson 2, no prerequisite gates",
              "Every screen has to make sense as an entry point, and every scenario has to be restartable and abandonable without breaking teacher-side reporting.",
            ],
            [
              "Private by default",
              "Nothing visible to a teacher unless the student joined their class",
              "Authorization is re-checked on write, not just on read. Sharing is a second deliberate action, never a side effect.",
            ],
            [
              "Each career thinks differently",
              "No scenario may resolve into “interview users, then design an app”",
              "Two required fields per stage — domain_skills and creation_output — and the AI prompt reads them, so the assistant can’t flatten a chemist into a startup founder.",
            ],
          ]}
        />

        <p>
          The second rule is the one that surfaces most often in the interface,
          because once there is no lesson one and no prerequisite gate the home
          screen cannot behave like a syllabus: it opens on whatever the student
          left unfinished, and the five branches underneath it carry only their
          state — one done, one in progress, three not yet opened — instead of
          an order to work through. A teacher&apos;s note sits beside them
          marked as readable by that student alone, which puts the
          private-by-default rule in the one place a student is likely to
          actually read it.
        </p>

        <Note label="Enforcement">
          The no-grading rule is not a guideline in a doc.{" "}
          <span className="text-foreground/90">tests/test_no_grading.py</span>{" "}
          sweeps every rendered student page for scoring vocabulary and fails
          the build if it appears. A principle that only lives in a README stops
          being true within a month.
        </Note>
      </>
    ),
  },
  {
    id: "scenario-format",
    label: "Scenario format",
    title: "Content architecture",
    kicker: "The single decision the whole product rests on",
    body: (
      <>
        <p>
          A scenario is an ordered sequence of beats rather than a description
          with questions attached, and getting that shape right early is the
          reason five very different careers were able to share one engine.
        </p>
        <p>
          Each scenario is four stages; each stage is an ordered array of beats
          alternating narrative context with questions. The beat labels differ
          per scenario — An’s case uses &ldquo;Câu hỏi nhỏ 1–3&rdquo;, Hoa’s
          uses &ldquo;Mục tiêu của các bên&rdquo; and &ldquo;Trường hợp ngoại
          lệ&rdquo;.
        </p>

        <Decision
          title="Labels live in data, never in code"
          chose="Every label, count and stage name is a field in scenarios.json."
          rejected="Hard-coding the four stage labels in templates, which reads cleaner on day one."
          why="Hard-coded labels mean every new career needs a code change. Content authors would have to be programmers."
        />

        <Decision
          title="Server-rendered HTML, no SPA"
          chose="FastAPI + Jinja2 + HTMX, self-hosted, no CDN."
          rejected="React or Vue; and CDN delivery for fonts and HTMX."
          why="The app is forms and reading. A client framework costs weak school hardware and complicates screen readers. A blocked CDN in a school computer room takes the whole lesson down."
        />

        <Stats
          items={[
            { value: "5", label: "scenarios, one per STEAM branch" },
            { value: "60", label: "context beats" },
            { value: "87", label: "questions answered in role" },
            { value: "220", label: "summarized fact lines" },
          ]}
        />

        <H3>A validator that refuses to load bad content</H3>
        <p>
          When the right-hand evidence rail was added, each context beat gained
          a facts array — a few short lines pulled out of the prose, mostly
          numbers and conditions. The scenario loader raises on any context beat
          that lacks them. Content rules that depend on an author remembering do
          not survive contact with a deadline; a loader that refuses to start
          does.
        </p>
      </>
    ),
  },
  {
    id: "one-question",
    label: "One question at a time",
    title: "Interaction",
    kicker: "The redesign that removed a feature instead of adding one",
    body: (
      <>
        <p>
          The thinking space used to scroll like a chat log, and the fix turned
          out to be showing less of it at once rather than organizing more of
          it.
        </p>

        <BeforeAfter
          columns={[
            {
              label: "Before",
              rows: [
                {
                  label: "Shape",
                  value:
                    "One long transcript: context, question, answer, assistant reply, repeated down the page.",
                },
                {
                  label: "Problem",
                  value:
                    "The question you were actually answering sat at the very bottom, below everything you had already written.",
                },
              ],
            },
            {
              label: "After",
              rows: [
                {
                  label: "Shape",
                  value:
                    "One question on screen. Answered questions collapse into a left-hand list, still openable. Facts accumulate in a right rail.",
                },
                {
                  label: "Result",
                  value:
                    "Three columns of stable furniture around a single moving part.",
                },
              ],
            },
          ]}
        />

        <H3>Two smaller cuts in the same pass</H3>
        <p>
          Context beats stopped being a click. They used to require pressing
          &ldquo;I’ve read this&rdquo; before advancing. That click produced no
          thought. The narrative now accumulates in the facts rail and the
          student moves question to question. The journal still records
          everything; the beats simply no longer consume a turn.
        </p>
        <p>
          The facts rail summarizes rather than reprints. The first build dumped
          whole context paragraphs into the right column — correct content, read
          as a wall of text, and a student skips a wall of text. Full prose
          moved behind a disclosure.
        </p>
        <p>
          Hints are questions, not answers. Three per stage, shared across all
          five scenarios, written at the level of how to think. A test forbids
          digits inside a hint: a hint that quotes one scenario’s numbers has
          leaked into the wrong layer.
        </p>

        <Note label="Deviating from the mockups">
          Three places the build deliberately diverges from the approved
          designs: the yellow &ldquo;Level 2&rdquo; badge beside a student’s
          name became a role chip, because a level number attached to a learner
          is the ranking the product promised not to have; &ldquo;Files from
          teacher&rdquo; with PDF sizes became a task list, because the app
          stores no files and a fake download button invents a feature; and
          English UI words became Vietnamese, because the interface is
          Vietnamese-only.
        </Note>
      </>
    ),
  },
  {
    id: "teacher",
    label: "The teacher side",
    title: "The teacher side",
    kicker: "Reporting that refuses to become a ranking",
    body: (
      <>
        <p>
          The hard part of a teacher view in a product with no grades is that
          every obvious design decision reintroduces one.
        </p>
        <p>
          Progress drills down in three steps — STEAM branch → assigned scenario
          → the pupils working on it — and stops at a four-segment stage tracker
          per student, with a status of not started, in progress, or done. The
          list sorts by name, never by completion, and says so on the page:
          going fast or slow does not tell you who is thinking well.
        </p>
        <p>
          Teacher feedback is framed in the interface as a private message
          rather than an assessment, and authorization is checked again inside
          the write path rather than trusted from the submitted form.
        </p>

        <Figure
          src="05hoso.png"
          alt="A GALS competency profile in Vietnamese: counts of scenarios entered and answers written, a private message from a teacher, the app's reflection on how the student reasoned, and a portfolio entry with its own separate sharing control."
          caption="Prototype interface, not final — the profile: a teacher's private message, the student's own words, and sharing as a separate control"
        />

        <H3>Export designed around what it must not contain</H3>
        <p>
          Teachers can export a class as a ZIP of CSVs — journal metadata, their
          own feedback, assigned work. The interesting work was the exclusion
          list. Journal text, student-authored entry titles, portfolio
          descriptions, AI synthesis and real names are all deliberately absent,
          because a spreadsheet of children’s reflective writing is the single
          easiest way for this product to cause harm. Pupils appear as stable
          pseudonymous codes derived from class membership order.
        </p>
        <p>
          Two details that only matter in Vietnamese school reality: files are
          written with a UTF-8 BOM so Excel renders diacritics instead of
          mojibake, and any cell beginning{" "}
          <span className="text-foreground/90">=</span>,{" "}
          <span className="text-foreground/90">+</span>,{" "}
          <span className="text-foreground/90">-</span> or{" "}
          <span className="text-foreground/90">@</span> is prefixed to defuse
          spreadsheet formula injection.
        </p>
        <p>
          Printable classroom packs exist for the same reason: not every school
          has a computer room. Each scenario prints with a teacher guide, one
          stage per page, ruled lines for handwriting. Even the printer is
          optional — reading the context aloud and copying the question onto the
          board still runs the lesson.
        </p>
      </>
    ),
  },
  {
    id: "filter",
    label: "The input filter",
    title: "Safety engineering",
    kicker: "Two kinds of mistake with opposite costs",
    body: (
      <>
        <p>
          A server-side filter screens every input before it reaches the model:
          profanity, keyboard mash, prompt injection, distress signals, and
          over-length. The interesting part is not the categories. It is that
          two of them need tuning in opposite directions.
        </p>

        <DataTable
          head={[
            "Category",
            "Cost of a miss",
            "Cost of a false alarm",
            "Therefore tune for",
          ]}
          minWidth="42rem"
          rows={[
            [
              "Distress",
              "A student who needs help gets nothing",
              "A kind message and a helpline number",
              "Recall",
            ],
            [
              "Profanity",
              "One swear gets through",
              "The app accuses a child who did nothing wrong",
              "Precision",
            ],
          ]}
        />

        <H3>Three failures only Vietnamese text could produce</H3>
        <p>
          Stripping Vietnamese diacritics before matching makes &ldquo;các&rdquo;
          — one of the most common words in the language — collide with a
          vulgarity, &ldquo;buổi&rdquo; collide with another, and &ldquo;từ
          từ&rdquo; collide with the unaccented spelling of &ldquo;tự tử&rdquo;
          (suicide). A student writing &ldquo;các bạn&rdquo; gets flagged for
          swearing. A student writing &ldquo;từ từ đã&rdquo; gets the crisis
          message.
        </p>
        <p>
          Matching with diacritics intact fixes that and opens the reverse hole:
          every unaccented distress phrase sails through.{" "}
          <span className="text-foreground/90">em muon chet qua</span> returns
          clean — and most Vietnamese teenagers type without diacritics, so the
          most vulnerable group ends up with the weakest cover.
        </p>
        <p>
          And <span className="text-foreground/90">muốn chết</span> is ordinary
          hyperbole. &ldquo;Bài này khó muốn chết&rdquo; (this homework is
          deadly hard) would fire the crisis message and the 111 helpline, so
          students meet the product’s most serious moment while complaining
          about homework, and learn to dismiss it.
        </p>

        <H3>How the filter resolves them</H3>
        <ul className="list-disc space-y-2 pl-5 marker:text-accent/60">
          <li>
            Unaccented forms are added only for phrases with no innocent
            homograph. The rejected list is written down with reasons so nobody
            re-adds it: du ma (đủ mà), cho chet (cho chết), mat day (mất dây),
            bo may (bộ máy), con di (con đi).
          </li>
          <li>
            Three phrases fire only alongside an intent word: tu tu, tu sat,
            rach tay.
          </li>
          <li>
            A teen-spelling normalizer (ko/hok → không, mún → muốn, chit → chết)
            runs on the distress branch only. Applying it to profanity would
            mean accusing someone over a typo.
          </li>
          <li>
            Matching is on word boundaries. Substring matching means
            &ldquo;được cho là&rdquo; contains a slur and &ldquo;là do người
            nộp&rdquo; contains another — caught by a test that runs the
            product’s own five scenarios through its own filter.
          </li>
        </ul>

        <Note label="Stated in the product, not just internally">
          This is not a safety feature and is not described as one. It is phrase
          matching, so it misses. GALS does not detect crisis, does not notify a
          teacher, a parent or a school, and is not a counseling service.
          Building a detector creates a duty simply by existing — the control
          for that sits in how the product is described far more than in the
          code, and that language is carried verbatim into the school agreement
          and the terms of use. The adult in the classroom is the safeguard.
        </Note>

        <p>
          One documented gap, written down rather than hidden:{" "}
          <span className="text-foreground/90">em buồn quá muốn chết</span> does
          not fire, because the preceding word is quá. The alternative is firing
          on &ldquo;đói muốn chết&rdquo;, which desensitizes students to the one
          message that must be heard.
        </p>

        <H3>What telemetry is allowed to know</H3>
        <p>
          Counts only — <span className="text-foreground/90">screen.crisis</span>{" "}
          = 12 and nothing else. No text, no author, no class, no timestamp.
          With zero telemetry there would be no way to tell whether the filter is
          working: silence could mean &ldquo;nobody needed it&rdquo; or &ldquo;it
          misses everything&rdquo;. One number separates those, and a number
          identifies nobody.
        </p>
        <p>
          That counter is deliberately not surfaced to teachers. &ldquo;Your
          class had 3 hits&rdquo; creates anxiety with no available action, and
          in a class of thirty it is narrow enough to guess who.
        </p>
      </>
    ),
  },
  {
    id: "ai",
    label: "Five AI decisions",
    title: "AI integration",
    kicker: "Five decisions about the model",
    body: (
      <>
        <p>
          The assistant asks questions back. It never scores, ranks, or supplies
          an answer.
        </p>

        <Decision
          title="The product is complete with the model switched off"
          chose="A scripted mode covering every screen, with the interface saying outright when it is active."
          why="Built for resilience on a school network. It turned out to be the legally viable configuration for a first pilot — see the compliance section."
        />
        <Decision
          title="The AI proposes, the student decides"
          chose="In freeform mode the model may end a turn with a marker line. The server strips it and renders a button: “Add this idea to your portfolio?”"
          why="Accepting still files it as private. Publishing takes a second, separate action. The model never writes to a student’s record on its own."
        />
        <Decision
          title="No emoji, enforced in code"
          chose="The system prompt forbids emoji, and every response is stripped of emoji again before rendering."
          why="A prompt is a request; code is a guarantee. Inputs that are only emoji or text smileys get their own honest reply instead."
        />
        <Decision
          title="Explicit safety thresholds, not vendor defaults"
          chose="All harm categories set explicitly on every call."
          why="A product for minors should not inherit whatever configuration the vendor happens to ship this quarter."
        />
        <Decision
          title="Model name discovered, never hard-coded"
          chose="Probe models.list() at startup against a priority order, overridable by environment variable. Migrated from the deprecated google-generativeai to google-genai."
          why="Model IDs churn. A remembered version string has already caused two defects in this project."
        />

        <Note label="Minimum viable payload">
          Only the current question and the current answer go to the API — never
          the whole journal. Chat is capped at 30 messages per session and input
          at 2,000 characters. The key lives in the deploy environment, never in
          the repository, and never reaches the browser.
        </Note>
      </>
    ),
  },
  {
    id: "compliance",
    label: "Compliance posture",
    title: "Compliance posture",
    kicker: "Designing against the law the product will actually launch under",
    body: (
      <>
        <p>
          Vietnam replaced its personal-data regime in January 2026 and added an
          AI Law in March. GALS handles children’s reflective writing, which
          puts it near the strict end of both.
        </p>

        <H3>The finding that shapes everything else</H3>
        <p>
          Decree 356/2025 Art. 4 lists private life, personal secrets and family
          secrets, and health status, among sensitive personal data. A GALS
          reflective journal is, by design, exactly that — the whole pedagogical
          point is that students write about how they think and feel.
        </p>
        <p>
          That single classification moves GALS from the light end of the
          obligation set to the heavy end. Its sharpest consequence: the
          five-year deferral of impact-assessment and data-protection-officer
          duties available to small organizations does not apply to anyone
          processing sensitive data. The build plans on the assumption that no
          exemption is available.
        </p>

        <H3>The framework in force</H3>
        <DataTable
          head={["Instrument", "In force", "Bearing on GALS"]}
          minWidth="42rem"
          rows={[
            [
              "Personal Data Protection Law 91/2025/QH15",
              "1 Jan 2026",
              "The governing statute.",
            ],
            [
              "Decree 356/2025/NĐ-CP",
              "1 Jan 2026",
              "Sensitive-data list, consent mechanics, impact-assessment forms and filing deadlines. Repeals Decree 13/2023.",
            ],
            [
              "AI Law 134/2025/QH15",
              "1 Mar 2026",
              "Risk tiers, AI-interaction disclosure, deployer liability. Names education as a regulated sector.",
            ],
            [
              "Cybersecurity Law 116/2025/QH15",
              "1 Jul 2026",
              "Data localization and system-log duties; child-protection provisions.",
            ],
            [
              "Decree 147/2024/NĐ-CP",
              "25 Dec 2024",
              "Under-16 accounts, social-network license thresholds, account verification, retention.",
            ],
            [
              "Law on Children 2016 + Decree 56/2017",
              "In force",
              "“Child” is under 16, while THPT students are 15–18. Part of the user base sits inside that law and the app cannot tell which part.",
            ],
          ]}
        />

        <H3>Two dossiers that get filed, not written</H3>
        <p>
          The easy mistake is to read the impact assessments as internal
          documentation. They are filings to a state authority, with forms and
          deadlines.
        </p>

        <DataTable
          head={["Dossier", "Exists from", "Filed"]}
          minWidth="40rem"
          rows={[
            [
              "Processing impact assessment",
              "The moment processing begins",
              "One original to A05 within 60 days; result in ~15 days",
            ],
            [
              "Cross-border transfer assessment",
              "The first transfer",
              "Form 01a/01b within 60 days — triggered by the model call and by offshore hosting",
            ],
          ]}
        />

        <p>
          Both refresh every 6 months, and within 10 days on any change of
          controller, processor or third party. Breach notification is 72 hours,
          with the incident file kept five years. Penalties reach 5% of
          prior-year turnover for transfer violations and VND 3 billion
          otherwise; how that applies to a zero-revenue non-profit is recorded
          as an open question rather than assumed to be a safe harbor.
        </p>

        <H3>A vendor term that decides the pilot architecture</H3>
        <p>
          The Gemini API additional terms require the developer to be 18+ and
          commit to not using the service in an application &ldquo;directed
          towards or likely to be accessed by individuals under the age of
          18.&rdquo; GALS is aimed at 16–18-year-olds in Vietnamese secondary
          schools, some of them under 16. On the free tier, prompts are also
          used to improve Google’s products; only paid-tier access carries the
          no-training commitment and the processor-role addendum.
        </p>
        <p>
          Five routes were mapped — enterprise terms, a different vendor,
          teacher-mediated calls, a Vietnam-hosted model, or no model at all.
          The chosen configuration for a first pilot is the scripted mode that
          already ships.
        </p>

        <Note label="Why that is the right answer, not the cheap one">
          Running the pilot without the model removes four separate compliance
          workstreams from the critical path: no vendor negotiation, no
          cross-border transfer assessment, no transfer at all, and no exposure
          on the age term. It also matches what a first pilot is testing —
          whether role-play career scenarios work on real students, not whether
          the language model is any good. The scripted mode was built for
          network resilience; it turned out to be the launch-viable
          configuration.
        </Note>

        <H3>The tension the architecture has to resolve</H3>
        <p>
          Two good ideas collide. The privacy architecture is that GALS never
          learns a real name: the teacher issues anonymous codes and keeps the
          code-to-pupil mapping on paper, with the school as data controller and
          GALS as processor under contract.
        </p>
        <p>
          But if class feeds, shared profile entries and public links place GALS
          inside the definition of a mạng xã hội under Decree 147/2024, accounts
          must be verified against a Vietnamese mobile number or personal
          identification number, and only verified accounts may post or share. A
          service cannot be an unverified-pseudonym platform and a licensed
          social network at once. Which side of that classification GALS falls
          on is a design decision with legal consequences, and it was settled
          before the architecture hardened rather than after.
        </p>
        <p>
          Underneath both: hosting location is a localization question under the
          2025 Cybersecurity Law rather than only an uptime one, and
          log-retention duties pull directly against data minimization — so the
          retention schedule is chosen deliberately and written down.
        </p>

        <H3>Under the AI Law</H3>
        <ul className="list-disc space-y-2 pl-5 marker:text-accent/60">
          <li>
            Disclosure that the user is interacting with an AI system — the
            interface already does this, and it becomes a documented control
            rather than a design habit.
          </li>
          <li>
            Risk-tier self-assessment. Education is a named sector; the working
            assumption is medium-to-high, with the reasoning written to be
            defended.
          </li>
          <li>
            Deployer liability. Where a high-risk system is operated correctly
            and damage still occurs, the deployer compensates and may recover
            from the provider only if the parties agreed it. In the
            school-as-controller model the school is likely the deployer — so
            the recovery clause has to sit in the school agreement, or the
            school carries it alone. A school’s legal reviewers will notice.
          </li>
          <li>
            Prohibited practices. The &ldquo;AI asks, never answers&rdquo;
            design holds up here, and the rationale is written as a compliance
            artifact rather than a README boast.
          </li>
        </ul>

        <H3>Consent, publication and the share link</H3>
        <p>
          Consent has to be verifiable, time-stamped and specific to what was
          agreed, with pre-ticked boxes prohibited and an explicit notice that
          this data category is sensitive — written so a 16-year-old can read
          it. For under-16s the legal representative exercises the rights.
        </p>
        <p>
          The share link is the sharpest edge. An unguessable URL is
          publication, not privacy, and publishing the private-life information
          of a child aged 7 or over requires the consent of both the child and
          the legal representative. So sharing is off by default and released
          only through adult approval, and the image field is allow-listed
          rather than accepting an arbitrary URL behind a{" "}
          <span className="text-foreground/90">javascript:</span> block.
        </p>
        <p>
          None of that counts for much if a student cannot find it, so the
          rights the law grants them — seeing what the product holds, taking a
          copy of it, and leaving — sit in the account menu next to the ordinary
          settings rather than behind a support request, on the reasoning that a
          right you have to ask an adult for is not one a sixteen-year-old will
          ever use.
        </p>

        <Figure
          src="02trangcanhan.png"
          alt="The GALS account menu open in Vietnamese, listing personal profile, display and accessibility, privacy, download my data, and log out."
          caption="Prototype interface, not final — privacy and data download sit in the ordinary account menu"
        />

        <Note label="Scope of that work">
          The compliance document was written by the product side, not by a
          lawyer, and says so on the page. It exists to establish what to ask —
          it carries fifteen drafted questions for counsel and six items
          recorded as unresolved rather than guessed at, including whether
          enterprise cloud terms lift the under-18 restriction and how
          turnover-linked penalties apply to a non-profit with no turnover. The
          route is a Vietnamese lawyer plus the school, since schools already
          hold the consent relationship with parents.
        </Note>
      </>
    ),
  },
  {
    id: "access",
    label: "Access & the token layer",
    title: "Accessibility & design system",
    kicker: "Measuring the palette instead of trusting it",
    body: (
      <>
        <p>
          Light, dark, and high contrast are one token layer. Raw values sit on{" "}
          <span className="text-foreground/90">:root</span>; Tailwind v4’s{" "}
          <span className="text-foreground/90">@theme inline</span> points
          utility names at them, so no component carries a{" "}
          <span className="text-foreground/90">dark:</span> variant.
        </p>
        <p>
          The dark surfaces run hue 30 at 3–4% saturation — enough warmth to
          keep the paper character, not enough to read brown. Surfaces get
          lighter as they stack, so a popover reads as floating rather than as a
          hole punched in the card.
        </p>

        <Swatches
          items={[
            { hex: "#181716", name: "Canvas", ratio: "ink 13.4 : 1" },
            { hex: "#222120", name: "Card", ratio: "ink 11.9 : 1" },
            { hex: "#2d2c2a", name: "Sunken", ratio: "ink 9.9 : 1" },
            { hex: "#383633", name: "Popover", ratio: "ink 8.5 : 1" },
            { hex: "#8e91cc", name: "Accent", ratio: "on-accent 5.7 : 1" },
            {
              hex: "#84817d",
              name: "Field line",
              ratio: "≥ 3.1 : 1 all surfaces",
            },
          ]}
        />

        <H3>What measuring found</H3>
        <p>
          Contrast is computed in Python against the real stylesheet rather than
          judged by eye. Doing that surfaced four failures that had nothing to
          do with dark mode — they were sitting in the light palette the whole
          time.
        </p>

        <DataTable
          head={["Pair", "Was", "Now", "Affected"]}
          minWidth="38rem"
          rows={[
            [
              "--c-ink-faint on white",
              "3.21 : 1",
              "4.84 : 1",
              "Every caption, timestamp and placeholder in the app",
            ],
            [
              "amber-700 on amber wash",
              "4.18 : 1",
              "4.52 : 1",
              "Portfolio and hint panels",
            ],
            ["White on teal", "4.26 : 1", "4.50 : 1", "Completed-stage markers"],
            ["White on sci", "4.49 : 1", "4.50 : 1", "Science branch fills"],
          ]}
        />

        <Note label="Flagged rather than quietly shipped">
          Two brand colors — amber and art — are too light to carry white text
          at all (2.9 : 1 and 3.8 : 1). Darkening them enough would lose the
          colors. They are restricted to text and light washes instead, and a
          test fails the build if either is ever used as a solid fill behind
          text. Naming the failure beats hiding it.
        </Note>

        <H3>The rest of the access work</H3>
        <ul className="list-disc space-y-2 pl-5 marker:text-accent/60">
          <li>
            Skip link, landmarks, heading order, a label on every input,
            aria-live on the HTMX-updated chat, aria-current on the open item.
          </li>
          <li>
            Stage state is spoken, not only colored — &ldquo;done&rdquo;,
            &ldquo;in progress&rdquo;, &ldquo;not started&rdquo; exist as text
            for screen readers.
          </li>
          <li>
            A dedicated line-weight token for load-bearing borders.{" "}
            <span className="text-foreground/90">--c-hairline</span> at 12%
            white divides blocks but never reaches 3:1, which left input borders
            and switch tracks invisible in dark mode.
          </li>
          <li>
            A three-state theme preference — light, dark, follow the system —
            stamped before first paint by a blocking script, so a dark-mode user
            never gets a white flash.
          </li>
          <li>
            Reduced-motion and flat-background switches for machines whose OS
            offers neither.
          </li>
          <li>
            Forced-colors handling, and a print block that forces the light
            palette — printing a dark theme wastes a cartridge.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "verification",
    label: "Build & verification",
    title: "Build & verification",
    kicker: "222 tests, each one guarding a decision",
    body: (
      <>
        <p>
          The suite is not coverage theater. Most files exist because something
          specific broke, or because a rule would rot without a guard, and the
          suites below are the ones where that origin is worth writing down
          rather than the whole list.
        </p>

        <DataTable
          caption="Some of the suites"
          head={["Suite", "Tests", "Guards"]}
          minWidth="40rem"
          rows={[
            [
              "test_tai_khoan",
              "19",
              "Account pages, teacher export contents, pseudonymous codes, CSV safety",
            ],
            [
              "test_feedback_and_limits",
              "15",
              "Rate limits, input caps, one feedback box per page",
            ],
            ["test_routes", "11", "Every route renders for the right role"],
            [
              "test_tien_do",
              "10",
              "Progress drill-down, plus query ceilings so N+1 cannot return",
            ],
            [
              "test_moderation",
              "10",
              "Both error directions pinned: misses and false alarms",
            ],
            [
              "test_css_build",
              "10",
              "Classes survive Tailwind’s static scan; both themes define every token",
            ],
            [
              "test_tuong_phan_mau",
              "9",
              "Contrast recomputed from the stylesheet across all four theme combinations",
            ],
            [
              "test_gemini_offline",
              "9",
              "Scripted mode is complete; emoji stripped; no answer leaks",
            ],
            [
              "test_workspace_flow",
              "6",
              "One question at a time; blocked input does not advance",
            ],
            ["test_a11y_markers", "6", "Landmarks, labels, live regions present"],
            ["test_privacy", "4", "Cross-tenant reads and writes refused"],
            [
              "test_scenarios_data",
              "4",
              "Content shape, including the facts requirement",
            ],
            [
              "test_scenario_walk",
              "3",
              "All five scenarios completable end to end",
            ],
            [
              "test_no_grading",
              "2",
              "No scoring vocabulary reaches a student screen",
            ],
          ]}
        />

        <H3>Performance work with a number attached</H3>
        <p>
          The teacher export looked instant on small data. Measured against a
          200-pupil class it ran 1,043 queries in 456 ms — the class roster was
          lazy-loading one query per pupil. Eager loading with{" "}
          <span className="text-foreground/90">selectinload</span> and batching
          per class brought it to 46 queries in 79 ms. Query-count ceilings are
          now asserted in the test suite, so the regression cannot come back
          silently.
        </p>

        <H3>Two verification habits worth keeping</H3>
        <p>
          Test the decompressed artifact. The first version of the export leak
          test searched the raw ZIP bytes for student writing. ZIP is
          deflate-compressed, so that test would have passed over a real leak.
          It now reads each member out and decodes it.
        </p>
        <p>
          Run the product’s content through the product’s own filter. That is
          what caught the substring collisions in the scenario prose. A filter
          tested only against a wordlist is tested against the wrong corpus.
        </p>

        <H3>Build and deploy shape</H3>
        <p>
          Python-only deploy: the Tailwind output is committed, so the deploy
          environment never needs Node. Fonts and HTMX are self-hosted for the
          same reason the CDN was rejected — a school network that blocks or
          throttles a third-party host should not be able to break a lesson.
        </p>
      </>
    ),
  },
  {
    id: "defects",
    label: "Defect ledger",
    title: "Defect ledger",
    kicker: "Bugs that turned into rules",
    body: (
      <>
        <p>
          Kept in the repository as a standing table. Every entry is here
          because it was invisible, not because it was hard.
        </p>

        <DataTable
          head={["Defect", "Why it hid", "Rule that came out"]}
          minWidth="44rem"
          rows={[
            [
              "Tailwind did not emit dynamically built class names",
              "No error. Three of four branches lost their color bar and the build reported success",
              "Full class names in data, never string-joined in Jinja — plus a test asserting they exist in the built CSS",
            ],
            [
              "Substring phrase matching",
              "“được cho là” contains a slur; “là do người nộp” contains another",
              "Match on word boundaries, and run the product’s own content through its own filter",
            ],
            [
              "Fixing false alarms opened misses",
              "False alarms are loud; misses are silent",
              "Every filter change pins both directions in tests",
            ],
            [
              "AI answers cut off mid-sentence",
              "The scripted fallback masked it completely",
              "Flash models bill thinking against the output budget — measured 381 of 400 tokens. Leave the budget wide",
            ],
            [
              "Vowel class missing Vietnamese diacritics",
              "nghĩ, phòng, đựng counted as “no vowels”, so ordinary sentences were flagged as gibberish",
              "Strip diacritics before testing for vowels; never hand-enumerate a character class",
            ],
            [
              "A comment-stripping regex ate /**/",
              "@source \"app/**/*.html\" silently became a wrong path and the build still ran",
              "Verify the class actually appears in the built CSS, not that the build exited zero",
            ],
            [
              "Library version recalled from memory",
              "It installed and ran, just old",
              "Always check the index before pinning. Same failure mode later produced a wrong model name",
            ],
          ]}
        />
      </>
    ),
  },
  {
    id: "remains",
    label: "What remains",
    title: "What remains",
    kicker: "Two things the build cannot answer on its own",
    body: (
      <>
        <p>
          The data layer is done, and so are accounts and consent capture. The
          filings, the school agreement and hosting are not. That work is
          administrative rather than technical, but the pilot cannot start
          without it.
        </p>
        <p>
          Past it sit two questions the build cannot answer on its own. Both
          need people rather than code, and both have a plan behind them.
        </p>

        <Decision
          title="Supervised testing with real students"
          chose="A supervised pilot with two classes at one partner school, assistant in scripted mode, teacher in the room throughout."
          why="Every design decision here was made against a model of how a 16-year-old reads a screen. That model has not met thirty of them at once. Watching for where students stall inside a stage, whether the facts rail actually gets read, and whether “no grades” survives contact with pupils who have been graded on everything else."
        />

        <Decision
          title="Assistive technology on real devices"
          chose="VoiceOver on iOS and TalkBack on Android, both with a Vietnamese voice, walked through a full four-stage scenario."
          why="Semantics are correct at source level and asserted in the test suite. That is not the same as having listened to it. Watching for whether spoken stage state reads naturally in Vietnamese, and how the live region behaves when an answer and a reply land together."
        />

        <Note label="Why these two are last rather than skipped">
          They are the only remaining questions a test suite structurally cannot
          answer. A contrast ratio can be computed, a query count can be capped,
          a filter can be run against the product’s own prose — but whether a
          Vietnamese screen-reader voice makes the stage tracker
          comprehensible, and whether a real class engages with a tool that
          refuses to score them, are findings you can only get from the room.
        </Note>
      </>
    ),
  },
];

export default function GalsWriteup() {
  return (
    <CaseStudyPage
      name="GALS"
      kicker="Vietnamese high-schoolers try a career before they have to choose one."
      meta={[
        {
          label: "Product",
          value: "Career exploration for THPT (grades 10–12), Vietnam",
        },
        {
          label: "Stage",
          value: "Built, compliance-ready, preparing for a supervised school pilot",
        },
        {
          label: "Stack",
          value: "FastAPI · Jinja2 · HTMX · Tailwind v4 · SQLite · Gemini",
        },
        {
          label: "Scope",
          value: "Product, content, UI, safety, legal review, build",
        },
        {
          label: "Scale",
          value: "4,773 lines Python · 57 templates · 222 tests",
        },
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
            Five STEAM scenarios, each one a real professional problem a student
            works through in role across four thinking stages.
          </p>
          <p>
            No score, no ranking, no model answer — which turned out to be the
            constraint that shaped almost every other decision.
          </p>
        </>
      }
      sections={SECTIONS}
    />
  );
}
