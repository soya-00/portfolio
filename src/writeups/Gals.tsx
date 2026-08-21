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
    id: "origin",
    label: "Origin",
    title: "Where this started",
    body: (
      <>
        <p>
          Around age nine I ran a program I had written and understood almost
          immediately that I had found a kind of problem solving I could keep
          doing for a very long time. Years later I started a computer science
          club at school, and watching other students meet programming for the
          first time through exercises that felt abstract or procedural showed
          me that most of them had never had an equivalent moment, where the
          logic of a system clicks into place and changes what you think a
          computer is actually doing. Consequently, I stopped treating that
          moment as something everybody eventually gets and started treating its
          absence as the problem.
        </p>
        <p>
          I built GALS for the STEAM for ALL competition run by Genderation
          Vietnam with Tuva Communication and UN Women, where it reached the
          national top 25. However, the competition set the deadline rather than
          the design, since the question I was actually working on was whether a
          piece of software can put a student inside a profession’s reasoning
          for long enough that they find out something about themselves.
        </p>
        <p>
          Reading a description cannot do that. For example, a student can read
          that an epidemiologist investigates disease outbreaks and come away
          knowing nothing about whether they would want to spend a career doing
          it. Therefore, GALS hands over the problem and the role at the same
          time and asks the student to decide what to do with incomplete
          information.
        </p>
      </>
    ),
  },
  {
    id: "premise",
    label: "Premise",
    title: "Premise",
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
          I used Design Thinking for the four stages — understand, empathize,
          create, reflect — although the framework is only scaffolding. A
          scenario is worth something when the evidence inside it behaves the
          way evidence behaves in that profession. Therefore, I ended every
          scenario on deliberately ambiguous evidence with a planted confounder
          the student has to notice unaided: three straight weeks of heat, exams
          that just finished, no control group.
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
          students default to reading as male. That is not set dressing, since
          putting Hằng in energy engineering is the most direct lever the
          product has on gender assumption in STEAM, and it costs nothing to
          pull.
        </p>

        <p>
          Ngọc’s scenario hands her nine hundred million to divide across two
          hundred and forty applications, and the question I put in front of her
          is which parts of an application reflect a real situation and which
          reflect a student’s ability to describe one. Evidence accumulating
          down the right-hand rail is where that becomes answerable rather than
          rhetorical, because among those lines is the fact that twelve
          applications share a single handwriting — a teacher filled them in —
          and that those twelve read as markedly more convincing than the rest.
        </p>
        <p>
          Nothing in the interface tells her what to do with that. I placed the
          confounder where she can find it, since finding it is the exercise.
        </p>

        <Figure
          src="03scenario.png"
          alt="A GALS scenario workspace in Vietnamese: the student is in role as Ngọc, a data analyst, on question 2 of 5 of the empathize stage, asked what in an application set reflects real circumstances and what reflects presentation skill. Assistant asks a question back, and a right-hand rail lists accumulated facts including twelve applications sharing one handwriting."
          caption="Prototype interface, with one question, the role on the left, and the evidence rail accumulating on the right"
        />
      </>
    ),
  },
  {
    id: "principles",
    label: "Four principles",
    title: "Principles",
    body: (
      <>
        <p>
          I wrote four rules early and they decided most of the arguments
          afterwards. Each one is cheap to write and expensive to keep, so the
          right-hand column records what each rule actually cost.
        </p>

        <DataTable
          head={["Rule", "Forbids", "Cost"]}
          minWidth="40rem"
          rows={[
            [
              "No grading",
              "No score, no rank, no “model answer”, anywhere, including from the AI",
              "Teachers get counts and stage state, never a leaderboard. A grade-level badge in the original mockup was cut for being a rank in disguise.",
            ],
            [
              "A tool rather than a course",
              "No lesson 1 → lesson 2, no prerequisite gates",
              "Every screen has to make sense as an entry point, and every scenario has to be restartable and abandonable without breaking teacher-side reporting.",
            ],
            [
              "Private by default",
              "Nothing visible to a teacher unless the student joined their class",
              "Authorization is re-checked on write rather than only on read. Sharing is a second deliberate action, never a side effect.",
            ],
            [
              "Each career thinks differently",
              "No scenario may resolve into “interview users, then design an app”",
              "Two required fields per stage — domain_skills and creation_output — and the AI prompt reads them, so the assistant cannot flatten a chemist into a startup founder.",
            ],
          ]}
        />

        <p>
          Second rule surfaces most often in the interface, because once there
          is no lesson one and no prerequisite gate the home screen cannot
          behave like a syllabus. Consequently, it opens on whatever the student
          left unfinished, and the five branches underneath carry only their
          state — one done, one in progress, three not yet opened — rather than
          an order to work through. A teacher’s note sits beside them marked
          readable by that student alone, which puts the private-by-default rule
          in the one place a student is likely to actually read it.
        </p>

        <Note label="Enforcement">
          I did not leave the no-grading rule as a guideline in a document.{" "}
          <span className="text-foreground/90">tests/test_no_grading.py</span>{" "}
          sweeps every rendered student page for scoring vocabulary and fails
          the build if it appears, since a principle that only lives in a README
          stops being true within a month.
        </Note>
      </>
    ),
  },
  {
    id: "scenario-format",
    label: "Scenario format",
    title: "Content architecture",
    body: (
      <>
        <p>
          I made a scenario an ordered sequence of beats rather than a
          description with questions attached, and getting that shape right
          early is the reason five very different careers were able to share one
          engine.
        </p>
        <p>
          Each scenario is four stages, and each stage is an ordered array of
          beats alternating narrative context with questions. Beat labels differ
          per scenario. For example, An’s case uses &ldquo;Câu hỏi nhỏ
          1–3&rdquo; while Hoa’s uses &ldquo;Mục tiêu của các bên&rdquo; and
          &ldquo;Trường hợp ngoại lệ&rdquo;.
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
          rejected="React or Vue, and CDN delivery for fonts and HTMX."
          why="This app is forms and reading. A client framework costs weak school hardware and complicates screen readers. A blocked CDN in a school computer room takes the whole lesson down."
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
          When I added the right-hand evidence rail, each context beat gained a
          facts array — a few short lines pulled out of the prose, mostly
          numbers and conditions. Therefore, I made the scenario loader raise on
          any context beat that lacks them. Content rules depending on an author
          remembering do not survive contact with a deadline, whereas a loader
          that refuses to start does.
        </p>
      </>
    ),
  },
  {
    id: "one-question",
    label: "One question at a time",
    title: "Interaction",
    body: (
      <>
        <p>
          I redesigned the thinking space by removing a feature rather than
          adding one. It used to scroll like a chat log, and the fix turned out
          to be showing less of it at once rather than organizing more of it.
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
                    "Question you were actually answering sat at the very bottom, below everything you had already written.",
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
          &ldquo;I’ve read this&rdquo; before advancing, and that click produced
          no thought. Narrative now accumulates in the facts rail while the
          student moves question to question. Journal still records everything,
          and the beats simply no longer consume a turn.
        </p>
        <p>
          Facts rail summarizes rather than reprints. My first build dumped
          whole context paragraphs into the right column, which was correct
          content that read as a wall of text, and a student skips a wall of
          text. Consequently, full prose moved behind a disclosure.
        </p>
        <p>
          Hints are questions rather than answers. Three per stage, shared
          across all five scenarios, written at the level of how to think. A
          test forbids digits inside a hint, since a hint quoting one scenario’s
          numbers has leaked into the wrong layer.
        </p>

        <Note label="Deviating from the mockups">
          I diverged from the approved designs in three places. A yellow
          &ldquo;Level 2&rdquo; badge beside a student’s name became a role
          chip, because a level number attached to a learner is the ranking the
          product promised not to have. &ldquo;Files from teacher&rdquo; with
          PDF sizes became a task list, because the app stores no files and a
          fake download button invents a feature. English UI words became
          Vietnamese, because the interface is Vietnamese-only.
        </Note>
      </>
    ),
  },
  {
    id: "teacher",
    label: "Teacher side",
    title: "Teacher side",
    body: (
      <>
        <p>
          Hard part of a teacher view in a product with no grades is that every
          obvious design decision reintroduces one.
        </p>
        <p>
          Progress drills down in three steps — STEAM branch → assigned scenario
          → the pupils working on it — and stops at a four-segment stage tracker
          per student, with a status of not started, in progress, or done. I
          made the list sort by name rather than by completion, and say so on
          the page, since going fast or slow does not tell you who is thinking
          well.
        </p>
        <p>
          Furthermore, I framed teacher feedback in the interface as a private
          message rather than an assessment, and authorization is checked again
          inside the write path rather than trusted from the submitted form.
        </p>

        <Figure
          src="05hoso.png"
          alt="A GALS competency profile in Vietnamese: counts of scenarios entered and answers written, a private message from a teacher, the app's reflection on how the student reasoned, and a portfolio entry with its own separate sharing control."
          caption="Prototype interface, showing a teacher's private message, the student's own words, and sharing as a separate control"
        />

        <H3>Export designed around what it must not contain</H3>
        <p>
          Teachers can export a class as a ZIP of CSVs covering journal
          metadata, their own feedback and assigned work. Interesting work was
          the exclusion list. Journal text, student-authored entry titles,
          portfolio descriptions, AI synthesis and real names are all
          deliberately absent, because a spreadsheet of children’s reflective
          writing is the single easiest way for this product to cause harm.
          Pupils appear as stable pseudonymous codes derived from class
          membership order.
        </p>
        <p>
          Two details only matter in Vietnamese school reality. Files are
          written with a UTF-8 BOM so Excel renders diacritics rather than
          mojibake, and any cell beginning{" "}
          <span className="text-foreground/90">=</span>,{" "}
          <span className="text-foreground/90">+</span>,{" "}
          <span className="text-foreground/90">-</span> or{" "}
          <span className="text-foreground/90">@</span> is prefixed to defuse
          spreadsheet formula injection.
        </p>
        <p>
          Printable classroom packs exist for the same reason, since not every
          school has a computer room. Each scenario prints with a teacher guide,
          one stage per page, ruled lines for handwriting. Even the printer is
          optional, because reading the context aloud and copying the question
          onto the board still runs the lesson.
        </p>
      </>
    ),
  },
  {
    id: "identifiers",
    label: "Identity boundaries",
    title: "Identity boundaries",
    body: (
      <>
        <p>
          Class codes rotate, which is what a shared secret is supposed to do,
          and rotating one broke the identifiers built on top of it. Pupil codes
          derived from class membership shifted underneath existing records, so
          work already done stopped resolving to the student who had done it, in
          the middle of a course.
        </p>
        <p>
          Proposed fix was to freeze a{" "}
          <span className="text-foreground/90">roster_prefix</span> at
          enrollment and carry it forward, which preserved readable pseudonymous
          identifiers of the form{" "}
          <span className="text-foreground/90">GALS-11A2-01</span> and left
          every existing record valid. Technically that solution was sound, and
          it was cheaper than the alternative by a wide margin.
        </p>
        <p>
          However, I rejected it, because it kept a student’s identifier derived
          from the class code even after the code changed, and I did not want
          the identifier to encode or reveal which class it came from at all.
          Class identity and student identity are separate things with separate
          lifecycles, and a readable identifier that quietly carries the class
          code forward makes them the same thing again in a form that is harder
          to notice. Therefore, I separated them completely and accepted the
          migration cost.
        </p>
        <p>
          Applying the stricter boundary then exposed a second defect I had not
          been looking for. Exported CSVs still contained the live class code,
          which meant the rotatable secret was sitting in an archival file that
          persists beyond the lifetime of the class it belonged to. A rotation
          is worth nothing if last term’s code is still readable in a
          spreadsheet on a teacher’s laptop.
        </p>
        <p>
          As such, the smallest fix to the observed defect and the correct fix
          pointed in different directions, and only the stricter principle
          surfaced the leak.
        </p>
      </>
    ),
  },
  {
    id: "filter",
    label: "Input filter",
    title: "Safety engineering",
    body: (
      <>
        <p>
          I screen every input server-side before it reaches the model:
          profanity, keyboard mash, prompt injection, distress signals, and
          over-length. Interesting part is not the categories, since two of them
          need tuning in opposite directions.
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
              "App accuses a child who did nothing wrong",
              "Precision",
            ],
          ]}
        />

        <H3>Three failures only Vietnamese text could produce</H3>
        <p>
          My first version stripped Vietnamese diacritics before matching, which
          makes &ldquo;các&rdquo; — one of the most common words in the language
          — collide with a vulgarity, &ldquo;buổi&rdquo; collide with another,
          and &ldquo;từ từ&rdquo; collide with the unaccented spelling of
          &ldquo;tự tử&rdquo; (suicide). Consequently, a student writing
          &ldquo;các bạn&rdquo; gets flagged for swearing, and a student writing
          &ldquo;từ từ đã&rdquo; gets the crisis message.
        </p>
        <p>
          Matching with diacritics intact fixes that and opens the reverse hole,
          since every unaccented distress phrase sails through. For example,{" "}
          <span className="text-foreground/90">em muon chet qua</span> returns
          clean, and most Vietnamese teenagers type without diacritics, so the
          most vulnerable group ends up with the weakest cover.
        </p>
        <p>
          Furthermore, <span className="text-foreground/90">muốn chết</span> is
          ordinary hyperbole. &ldquo;Bài này khó muốn chết&rdquo; (this homework
          is deadly hard) would fire the crisis message and the 111 helpline, so
          students meet the product’s most serious moment while complaining
          about homework, and learn to dismiss it.
        </p>

        <H3>How the filter resolves them</H3>
        <ul className="list-disc space-y-2 pl-5 marker:text-accent/60">
          <li>
            Unaccented forms are added only for phrases with no innocent
            homograph. I wrote the rejected list down with reasons so nobody
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
            nộp&rdquo; contains another, which a test caught by running the
            product’s own five scenarios through its own filter.
          </li>
        </ul>

        <Note label="Stated in the product, rather than only internally">
          This is not a safety feature and is not described as one. It is phrase
          matching, so it misses. GALS does not detect crisis, does not notify a
          teacher, a parent or a school, and is not a counseling service.
          Building a detector creates a duty simply by existing, so the control
          for that sits in how the product is described far more than in the
          code, and I carried that language verbatim into the school agreement
          and the terms of use. Adult in the classroom is the safeguard.
        </Note>

        <p>
          I wrote one gap down rather than hiding it:{" "}
          <span className="text-foreground/90">em buồn quá muốn chết</span> does
          not fire, because the preceding word is quá. Alternative is firing on
          &ldquo;đói muốn chết&rdquo;, which desensitizes students to the one
          message that must be heard.
        </p>

        <H3>Telemetry, and its limits</H3>
        <p>
          Counts only — <span className="text-foreground/90">screen.crisis</span>{" "}
          = 12 and nothing else. No text, no author, no class, no timestamp.
          With zero telemetry there would be no way to tell whether the filter is
          working, since silence could mean &ldquo;nobody needed it&rdquo; or
          &ldquo;it misses everything&rdquo;. One number separates those, and a
          number identifies nobody.
        </p>
        <p>
          I deliberately do not surface that counter to teachers. &ldquo;Your
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
    body: (
      <>
        <p>
          Assistant asks questions back. It never scores, ranks, or supplies an
          answer.
        </p>

        <Decision
          title="Product is complete with the model switched off"
          chose="A scripted mode covering every screen, with the interface saying outright when it is active."
          why="Built for resilience on a school network, and it doubles as the answer when a computer room's connection fails mid-lesson. A scripted path covering every screen is also what lets the offline mode stay a real fallback rather than a degraded one."
        />
        <Decision
          title="AI proposes, the student decides"
          chose="In freeform mode the model may end a turn with a marker line. Server strips it and renders a button: “Add this idea to your portfolio?”"
          why="Accepting still files it as private. Publishing takes a second, separate action. Model never writes to a student’s record on its own."
        />
        <Decision
          title="No emoji, enforced in code"
          chose="System prompt forbids emoji, and every response is stripped of emoji again before rendering."
          why="A prompt is a request and code is a guarantee. Inputs that are only emoji or text smileys get their own honest reply instead."
        />
        <Decision
          title="Safety configured explicitly"
          chose="Provider's moderation step is an explicit call in my own pipeline, stacked on the phrase filter, rather than relying on model-side defaults."
          why="A product for minors should not inherit whatever configuration the vendor happens to ship this quarter."
        />
        <Decision
          title="Model name resolved at startup, never hard-coded"
          chose="Resolve the model against a priority order when the process boots, overridable by environment variable, with the vendor SDK behind one module."
          why="Model IDs churn and SDKs get deprecated. A remembered version string has already caused two defects in this project, and keeping the boundary thin is what made changing vendor a contained job rather than a rewrite."
        />

        <Note label="Minimum viable payload">
          I bounded what crosses the boundary at both ends, since chat is capped
          at 30 messages per session and input at 2,000 characters, so a single
          session cannot quietly accumulate into a corpus. Key lives in the
          deploy environment, never in the repository, and never reaches the
          browser.
        </Note>
      </>
    ),
  },
  {
    id: "compliance",
    label: "Compliance posture",
    title: "Compliance posture",
    body: (
      <>
        <p>
          Vietnam replaced its personal-data regime in January 2026 and added an
          AI Law in March. GALS handles children’s reflective writing, which
          puts it near the strict end of both.
        </p>

        <H3>Finding that shapes everything else</H3>
        <p>
          Decree 356/2025 Art. 4 lists private life, personal secrets and family
          secrets, and health status, among sensitive personal data. A GALS
          reflective journal is, by design, exactly that, since the whole
          pedagogical point is that students write about how they think and
          feel.
        </p>
        <p>
          That single classification moves GALS from the light end of the
          obligation set to the heavy end. Its sharpest consequence is that the
          five-year deferral of impact-assessment and data-protection-officer
          duties available to small organizations does not apply to anyone
          processing sensitive data. Therefore, I plan the build on the
          assumption that no exemption is available.
        </p>

        <H3>Framework in force</H3>
        <DataTable
          head={["Instrument", "In force", "Bearing on GALS"]}
          minWidth="42rem"
          rows={[
            [
              "Personal Data Protection Law 91/2025/QH15",
              "1 Jan 2026",
              "Governing statute.",
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
              "Data localization and system-log duties, plus child-protection provisions.",
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

        <H3>Two dossiers that get filed rather than written</H3>
        <p>
          Easy mistake is to read the impact assessments as internal
          documentation. They are filings to a state authority, with forms and
          deadlines.
        </p>

        <DataTable
          head={["Dossier", "Exists from", "Filed"]}
          minWidth="40rem"
          rows={[
            [
              "Processing impact assessment",
              "Moment processing begins",
              "One original to A05 within 60 days, result in ~15 days",
            ],
            [
              "Cross-border transfer assessment",
              "First transfer",
              "Form 01a/01b within 60 days — triggered by the model call and by offshore hosting",
            ],
          ]}
        />

        <p>
          Both refresh every 6 months, and within 10 days on any change of
          controller, processor or third party. Breach notification is 72 hours,
          with the incident file kept five years. Penalties reach 5% of
          prior-year turnover for transfer violations and VND 3 billion
          otherwise, and how that applies to a zero-revenue non-profit is
          recorded as an open question rather than assumed to be a safe harbor.
        </p>

        <H3>Conditions the vendor choice has to satisfy</H3>
        <p>
          Sending a student’s sentence to a model is a cross-border transfer of
          a minor’s data, so the vendor decision is a compliance decision before
          it is a quality one. Three conditions were non-negotiable: terms that
          contemplate minors in a school deployment, a no-training commitment,
          since several providers’ free tiers use prompts to improve their
          products, and zero data retention, so the transfer leaves nothing
          behind on the other side.
        </p>
        <p>
          Settled vendor is OpenAI, on a paid account with Zero Data Retention
          enabled, owned by the named responsible adult, under a hard spend cap.
          Only the current question and the current answer are sent, and only
          from the role-play store, Kho A, since the reflective store never
          leaves the country at all.
        </p>

        <Note label="Why the split store is what makes this work">
          Because only Kho A crosses the border, the transfer dossier describes
          anonymous role-play professional writing and nothing else. Had
          reflective journals been in scope, the same filing would have had to
          cover minors’ personal writing, which is a materially harder document
          to write and a materially worse one to defend. Architecture decision
          and the compliance decision are the same decision. Scripted offline
          mode stays as a first-class fallback, since it was built for network
          resilience and it means a class can run a full lesson with no transfer
          at all.
        </Note>

        <H3>Tension the architecture has to resolve</H3>
        <p>
          Two good ideas collide. My privacy architecture is that GALS never
          learns a real name, since the teacher issues anonymous codes and keeps
          the code-to-pupil mapping on paper, with the school as data controller
          and GALS as processor under contract.
        </p>
        <p>
          However, if class feeds, shared profile entries and public links place
          GALS inside the definition of a mạng xã hội under Decree 147/2024,
          accounts must be verified against a Vietnamese mobile number or
          personal identification number, and only verified accounts may post or
          share. A service cannot be an unverified-pseudonym platform and a
          licensed social network at once. Which side of that classification
          GALS falls on is a design decision with legal consequences, so I
          settled it before the architecture hardened rather than after.
        </p>
        <p>
          Underneath both, hosting location is a localization question under the
          2025 Cybersecurity Law rather than only an uptime one, and
          log-retention duties pull directly against data minimization, so I
          chose the retention schedule deliberately and wrote it down.
        </p>

        <H3>Under the AI Law</H3>
        <ul className="list-disc space-y-2 pl-5 marker:text-accent/60">
          <li>
            Disclosure that the user is interacting with an AI system — the
            interface already does this, and it becomes a documented control
            rather than a design habit.
          </li>
          <li>
            Risk-tier self-assessment. Education is a named sector, and the
            working assumption is medium-to-high, with the reasoning written to
            be defended.
          </li>
          <li>
            Deployer liability. Where a high-risk system is operated correctly
            and damage still occurs, the deployer compensates and may recover
            from the provider only if the parties agreed it. In the
            school-as-controller model the school is likely the deployer, so the
            recovery clause has to sit in the school agreement, or the school
            carries it alone. A school’s legal reviewers will notice.
          </li>
          <li>
            Prohibited practices. My &ldquo;AI asks, never answers&rdquo; design
            holds up here, and the rationale is written as a compliance artifact
            rather than a README boast.
          </li>
        </ul>

        <H3>Consent, publication and the share link</H3>
        <p>
          Consent has to be verifiable, time-stamped and specific to what was
          agreed, with pre-ticked boxes prohibited and an explicit notice that
          this data category is sensitive, written so a 16-year-old can read it.
          For under-16s the legal representative exercises the rights.
        </p>
        <p>
          Share link is the sharpest edge. An unguessable URL is publication
          rather than privacy, and publishing the private-life information of a
          child aged 7 or over requires the consent of both the child and the
          legal representative. Therefore, sharing is off by default and
          released only through adult approval, and the image field is
          allow-listed rather than accepting an arbitrary URL behind a{" "}
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
          alt="GALS account menu open in Vietnamese, listing personal profile, display and accessibility, privacy, download my data, and log out."
          caption="Prototype interface, with privacy and data download in the ordinary account menu"
        />

        <Note label="Scope of that work">
          I wrote the compliance document from the product side rather than as a
          lawyer, and the page says so. It exists to establish what to ask, so
          it carries fifteen drafted questions for counsel and six items
          recorded as unresolved rather than guessed at, including whether
          enterprise cloud terms lift the under-18 restriction and how
          turnover-linked penalties apply to a non-profit with no turnover.
          Route is a Vietnamese lawyer plus the school, since schools already
          hold the consent relationship with parents.
        </Note>

        <H3>Where the design and the build disagree</H3>
        <p>
          Reviewing the legal position changed my account of what GALS currently
          is. Privacy properties above describe the design, and several of them
          are not yet properties of the running system. Public demo still runs a
          shared-account build, student writing is stored on the server, and
          consent capture exists in the codebase rather than in the deployment
          anybody can reach today. Consequently, the prototype is not safe for
          real student use, and I state that in the repository rather than
          leaving a reader to infer it from a version number.
        </p>
        <p>
          Recent legal work also reopened a question I had treated as settled,
          which is whether the assistant can be used with minors at all under
          the vendor terms actually available to me. I have not resolved it.
          Until it is resolved, the scripted offline mode is the only path I
          would put in front of a class.
        </p>
      </>
    ),
  },
  {
    id: "access",
    label: "Access & the token layer",
    title: "Accessibility & design system",
    body: (
      <>
        <p>
          I measured the palette rather than trusting it. Light, dark, and high
          contrast are one token layer, with raw values on{" "}
          <span className="text-foreground/90">:root</span> and Tailwind v4’s{" "}
          <span className="text-foreground/90">@theme inline</span> pointing
          utility names at them, so no component carries a{" "}
          <span className="text-foreground/90">dark:</span> variant.
        </p>
        <p>
          Dark surfaces run hue 30 at 3–4% saturation, which is enough warmth to
          keep the paper character without reading brown. Surfaces get lighter as
          they stack, so a popover reads as floating rather than as a hole
          punched in the card.
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

        <H3>Failures the measurement found</H3>
        <p>
          I compute contrast in Python against the real stylesheet rather than
          judging it by eye. Doing that surfaced four failures that had nothing
          to do with dark mode, since they were sitting in the light palette the
          whole time.
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
          Two brand colors, amber and art, are too light to carry white text at
          all (2.9 : 1 and 3.8 : 1). Darkening them enough would lose the
          colors, so I restricted them to text and light washes instead, and a
          test fails the build if either is ever used as a solid fill behind
          text. Naming the failure beats hiding it.
        </Note>

        <H3>Remaining access work</H3>
        <ul className="list-disc space-y-2 pl-5 marker:text-accent/60">
          <li>
            Skip link, landmarks, heading order, a label on every input,
            aria-live on the HTMX-updated chat, aria-current on the open item.
          </li>
          <li>
            Stage state is spoken rather than only colored — &ldquo;done&rdquo;,
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
            palette, since printing a dark theme wastes a cartridge.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "verification",
    label: "Build & verification",
    title: "Build & verification",
    body: (
      <>
        <p>
          I wrote 222 tests, and the suite is not coverage theater. Most files
          exist because something specific broke, or because a rule would rot
          without a guard, and the suites below are the ones where that origin
          is worth writing down rather than the whole list.
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
              "Classes survive Tailwind’s static scan, and both themes define every token",
            ],
            [
              "test_tuong_phan_mau",
              "9",
              "Contrast recomputed from the stylesheet across all four theme combinations",
            ],
            [
              "test_gemini_offline",
              "9",
              "Scripted mode is complete, emoji stripped, no answer leaks",
            ],
            [
              "test_workspace_flow",
              "6",
              "One question at a time, and blocked input does not advance",
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

        <p>
          One name in that list is historical rather than descriptive, since{" "}
          <span className="text-foreground/90">test_gemini_offline</span> is
          named for the demo&apos;s use of the Gemini API and what it actually
          guards is the offline path, which does not depend on which vendor sits
          behind it.
        </p>

        <H3>Performance work with a number attached</H3>
        <p>
          Teacher export looked instant on small data. Measured against a
          200-pupil class it ran 1,043 queries in 456 ms, because the class
          roster was lazy-loading one query per pupil. Eager loading with{" "}
          <span className="text-foreground/90">selectinload</span> and batching
          per class brought it to 46 queries in 79 ms. Therefore, I now assert
          query-count ceilings in the test suite, so the regression cannot come
          back silently.
        </p>

        <H3>Two verification habits worth keeping</H3>
        <p>
          Test the decompressed artifact. My first version of the export leak
          test searched the raw ZIP bytes for student writing, and ZIP is
          deflate-compressed, so that test would have passed over a real leak.
          It now reads each member out and decodes it.
        </p>
        <p>
          Run the product’s content through the product’s own filter. That is
          what caught the substring collisions in the scenario prose, since a
          filter tested only against a wordlist is tested against the wrong
          corpus.
        </p>

        <H3>Build and deploy shape</H3>
        <p>
          Python-only deploy, since I commit the Tailwind output and the deploy
          environment never needs Node. Fonts and HTMX are self-hosted for the
          same reason I rejected the CDN, because a school network that blocks
          or throttles a third-party host should not be able to break a lesson.
        </p>
      </>
    ),
  },
  {
    id: "defects",
    label: "Defect ledger",
    title: "Defect ledger",
    body: (
      <>
        <p>
          I keep this in the repository as a standing table. Every entry is here
          because it was invisible rather than because it was hard.
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
              "“được cho là” contains a slur, and “là do người nộp” contains another",
              "Match on word boundaries, and run the product’s own content through its own filter",
            ],
            [
              "Fixing false alarms opened misses",
              "False alarms are loud, and misses are silent",
              "Every filter change pins both directions in tests",
            ],
            [
              "AI answers cut off mid-sentence",
              "A working fallback answered every time, so nothing looked broken",
              "Reasoning tokens ate 381 of a 400-token output budget. Two rules: leave the budget wide, and make fallbacks announce themselves in logs — a silent fallback is an outage you cannot see",
            ],
            [
              "Vowel class missing Vietnamese diacritics",
              "nghĩ, phòng, đựng counted as “no vowels”, so ordinary sentences were flagged as gibberish",
              "Strip diacritics before testing for vowels, and never hand-enumerate a character class",
            ],
            [
              "A comment-stripping regex ate /**/",
              "@source \"app/**/*.html\" silently became a wrong path and the build still ran",
              "Verify the class actually appears in the built CSS, rather than that the build exited zero",
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
    id: "authorship",
    label: "Authorship",
    title: "Division of labor on this project",
    body: (
      <>
        <p>
          AI implemented most of GALS, and the decisions above were mine. I
          chose the problem, wrote the five scenarios and their evidence, set the
          four principles, designed the interaction, and decided what the
          assistant is forbidden to do. AI wrote most of the production code and
          much of the test suite, and it drafted the Vietnamese design log.
        </p>
        <p>
          Roster-prefix fix above is the clearest case of the boundary under
          load, since the model’s solution was correct on the terms the bug
          presented and I rejected it on terms the bug did not mention.
          Similarly, I cut the &ldquo;Level 2&rdquo; badge and the fake file list
          from an approved mockup, and I kept scoring vocabulary away from
          student screens by making it a build failure rather than a review
          item.
        </p>
        <p>
          However, several things I would not have found alone came out of
          implementation work. Query-count ceilings, the decompressed-artifact
          test, and the word-boundary matching rule all emerged from debugging
          rather than from design, which is the area where my own experience is
          thinnest.
        </p>
      </>
    ),
  },
  {
    id: "remains",
    label: "Still open",
    title: "Still open",
    body: (
      <>
        <p>
          Data layer is done, and so are accounts and consent capture in the
          codebase, although the public demo still runs the shared-account
          build. Filings, the school agreement and hosting are not. That work is
          administrative rather than technical, but the pilot cannot start
          without it.
        </p>
        <p>
          Past it sit two questions the build cannot answer on its own. Both
          need people rather than code, and both have a plan behind them.
        </p>

        <Decision
          title="Supervised testing with real students"
          chose="A supervised pilot with two classes at one partner school, the assistant live, teacher in the room throughout."
          why="Every design decision here was made against a model of how a 16-year-old reads a screen, and that model has not met thirty of them at once. Watching for where students stall inside a stage, whether the facts rail actually gets read, and whether “no grades” survives contact with pupils who have been graded on everything else."
        />

        <Decision
          title="Assistive technology on real devices"
          chose="VoiceOver on iOS and TalkBack on Android, both with a Vietnamese voice, walked through a full four-stage scenario."
          why="Semantics are correct at source level and asserted in the test suite, which is not the same as having listened to it. Watching for whether spoken stage state reads naturally in Vietnamese, and how the live region behaves when an answer and a reply land together."
        />

        <Note label="Why these two are last rather than skipped">
          They are the only remaining questions a test suite structurally cannot
          answer. A contrast ratio can be computed, a query count can be capped,
          and a filter can be run against the product’s own prose. However,
          whether a Vietnamese screen-reader voice makes the stage tracker
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
          value:
            "Built, mostly compliance-ready, preparing for a supervised school pilot",
        },
        {
          label: "Stack",
          value: "FastAPI · Jinja2 · HTMX · Tailwind v4 · Postgres · OpenAI",
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
            No score, no ranking, no model answer, and every other decision
            below follows from that one.
          </p>
        </>
      }
      sections={SECTIONS}
    />
  );
}
