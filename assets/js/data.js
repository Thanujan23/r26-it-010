/* ==========================================================================
   R26-IT-010 — site content
   --------------------------------------------------------------------------
   This is the ONLY file you need to edit to update members, milestones,
   documents, presentations and contact links. See README.md.

   Conventions
   - Files: each entry in "documents" and "presentations" is one file.
       url    relative path to a file kept in the repo ("documents/...") or a
              full https:// SharePoint / OneDrive link. Use "LINK_NEEDED" when
              the file is too large for the repo and the link is not known yet.
       thumb  page-1 preview in assets/img/thumbs/ (about 360 px wide WebP).
       status "Submitted", "Draft" or "Pending". Pending entries need no url.
       date   "YYYY-MM-DD", or "" if unknown.
   - Unknown milestone dates / marks: use "TBA".
   - Every line marked "TODO:" below still needs a real value from the team.
   ========================================================================== */

var LINK_NEEDED = "LINK_NEEDED";

window.SITE = {

  /* ------------------------------------------------------------ project */
  project: {
    id: "R26-IT-010",
    title: "AI-Based Electricity Demand Intelligence System for Sri Lanka",
    shortTitle: "Electricity Demand Intelligence",
    institute: "Sri Lanka Institute of Information Technology (SLIIT)",
    faculty: "Faculty of Computing",
    degree: "B.Sc. (Hons) in Information Technology",
    year: "2026",
    abstract:
      "Planners receive demand figures and forecasts but little insight into what kind of day each day is, " +
      "which days behave abnormally, and why. The system combines four services: behaviour intelligence " +
      "(clustering, anomaly and peak-day detection, interpretable day labels), adaptive deep-learning " +
      "forecasting with calibrated uncertainty, explainable AI (LIME/SHAP), and demand forecasting / scenario " +
      "decision support, delivered through FastAPI services and a React dashboard on 15-minute demand data " +
      "(Jan 2020 – May 2025).",
    // Small stat strip under the hero. Figures are from the Behaviour Intelligence thesis.
    stats: [
      { value: "1,977", label: "days analysed" },
      { value: "15-minute", label: "demand readings" },
      { value: "96", label: "points per daily profile" },
      { value: "4", label: "components" }
    ],
    // TODO: add the team GitHub repository URL (leave "" to hide the footer link).
    repoUrl: ""
  },

  /* -------------------------------------------------------- supervisors */
  supervisors: [
    {
      role: "Supervisor",
      name: "Dr. Nathali Silva",
      // TODO: confirm the supervisor's department / affiliation line.
      affiliation: "Sri Lanka Institute of Information Technology",
      // TODO: add the supervisor's email address (leave "" to hide).
      email: ""
    },
    {
      role: "Co-supervisor",
      // TODO: replace with the co-supervisor's name.
      name: "[CO-SUPERVISOR NAME]",
      // TODO: add the co-supervisor's affiliation.
      affiliation: "",
      // TODO: add the co-supervisor's email address (leave "" to hide).
      email: ""
    }
  ],

  /* ------------------------------------------------------------ members */
  /* photo: path to an optimised image (about 400×400, under 200 KB), e.g.
     "assets/img/thanujan.webp". While it is "" the card shows initials.    */
  members: [
    {
      name: "Thanujan T",
      id: "IT22545176",
      email: "it22545176@my.sliit.lk",
      // TODO: add photo for Thanujan T.
      photo: "",
      component: "Behaviour Intelligence",
      question: "What type of demand day is this — and is it abnormal?",
      role: "Day-level behaviour analysis, model comparison, API and the integrated dashboard shell.",
      summary:
        "Turns the 15-minute series into daily 96-point load profiles and gives every day a cluster, " +
        "an anomaly score, a peak flag and one of four behaviour labels with a risk level and a written reason.",
      points: [
        "Clustering compared: K-Means, Ward, Gaussian Mixture, DBSCAN — selected K-Means, k = 2 (Silhouette 0.4729)",
        "Anomaly detection compared: Isolation Forest, LOF, One-Class SVM, Z-score — selected Isolation Forest (bootstrap Jaccard 0.777)",
        "Future-behaviour prediction: 78.85% accuracy against a 62.36% baseline",
        "FastAPI service and React dashboard"
      ],
      alert: "Flags peak-demand and abnormal days"
    },
    {
      name: "Janahan R",
      id: "IT22069740",
      email: "it22069740@my.sliit.lk",
      // TODO: add photo for Janahan R.
      photo: "",
      component: "Adaptive Forecasting & Prediction",
      question: "What will demand be — and how uncertain is it?",
      role: "Deep-learning forecasting models, uncertainty estimation and the forecast API.",
      summary:
        "Short-term demand forecasting with convolutional, recurrent and attention-based networks, " +
        "reporting a calibrated 95% interval alongside each forecast.",
      points: [
        "Models compared: CNN, LSTM, Transformer, CNN-LSTM, CNN-Transformer",
        "Monte Carlo Dropout uncertainty with calibrated 95% intervals",
        "Best MAE 20.46 kW",
        "96-step lookback, one-step horizon, 20 input features"
      ],
      alert: ""
    },
    {
      name: "Madushani R.P",
      id: "IT22273062",
      email: "it22273062@my.sliit.lk",
      // TODO: add photo for Madushani R.P.
      photo: "",
      component: "Explainable AI",
      question: "Which features drove the prediction?",
      role: "LIME and SHAP explanations of forecasts and of abnormal days.",
      summary:
        "Explains demand drivers and diagnoses anomalies with LIME and SHAP, giving local explanations " +
        "for a single prediction and global explanations across the data.",
      points: [
        "Local and global feature-importance explanations",
        "Anomaly diagnosis: abnormal days link to their LIME explanation",
        "Visual and written explanations for planners"
      ],
      alert: ""
    },
    {
      name: "Dewmini D.M.D.P",
      id: "IT22630216",
      email: "it22630216@my.sliit.lk",
      // TODO: add photo for Dewmini D.M.D.P.
      photo: "",
      // TODO: confirm the exact component title for Dewmini D.M.D.P.
      component: "Demand Forecasting / Scenario & Decision Support",
      question: "What happens under a changed condition?",
      role: "Scenario simulation, risk levels and planner recommendations.",
      // TODO: confirm this summary and the points below with Dewmini D.M.D.P.
      summary:
        "Applies what-if scenarios to a baseline day, predicts the adjusted demand and compares it with " +
        "the baseline to give a percentage change, a risk level and a recommendation.",
      points: [
        "Scenarios: heat wave, cold spell, price shock, economic boom",
        "Random Forest and stacking-ensemble demand model",
        "Risk levels (Low / Medium / High) with recommended actions"
      ],
      alert: ""
    }
  ],

  /* --------------------------------------------------------- milestones */
  /* Status is worked out automatically: a milestone is "Completed" when at
     least one file with the same milestone key below has status "Submitted",
     otherwise "Upcoming". To force a value, add  status: "Completed"  here.
     site-assets has no milestones.txt, so dates and marks are "TBA".       */
  milestones: [
    {
      key: "proposal",
      name: "Project Proposal",
      description:
        "Proposal presentation and one individual proposal report per member, defining the research problem, " +
        "gap, objectives, methodology and work breakdown for each component.",
      date: "March 2026",
      // TODO: add marks allocated for Project Proposal.
      marks: "TBA"
    },
    {
      key: "pp1",
      name: "Progress Presentation 1",
      description:
        "First progress review of the four components. Panel feedback asked for model comparisons " +
        "and analysis across the full set of days.",
      // TODO: add date of Progress Presentation 1.
      date: "TBA",
      // TODO: add marks allocated for Progress Presentation 1.
      marks: "TBA"
    },
    {
      key: "pp2",
      name: "Progress Presentation 2",
      description:
        "Second progress review: integrated system, model-comparison results for each component and " +
        "non-functional test results.",
      // TODO: add date of Progress Presentation 2.
      date: "TBA",
      // TODO: add marks allocated for Progress Presentation 2.
      marks: "TBA"
    },
    {
      key: "paper",
      name: "Research Paper",
      description: "Research paper prepared from the project findings for submission to a conference or journal.",
      // TODO: add Research Paper submission date.
      date: "TBA",
      // TODO: add marks allocated for Research Paper.
      marks: "TBA"
    },
    {
      key: "final",
      name: "Final Assessment (Final Report & Presentation)",
      description: "Group final report, four individual final reports and the final presentation with a system demonstration.",
      // TODO: add Final Assessment date.
      date: "TBA",
      // TODO: add marks allocated for Final Assessment.
      marks: "TBA"
    },
    {
      key: "viva",
      name: "Viva",
      description: "Individual oral examination on each member's component and contribution.",
      // TODO: add Viva date.
      date: "TBA",
      // TODO: add marks allocated for Viva.
      marks: "TBA"
    },
    {
      key: "website",
      name: "Website",
      description: "This project website, presenting the domain, milestones, documents, presentations and the team.",
      // TODO: add Website assessment date.
      date: "TBA",
      // TODO: add marks allocated for Website.
      marks: "TBA"
    },
    {
      key: "logbook",
      name: "Logbook",
      description: "Record of supervisor meetings and research activity kept throughout the project.",
      // TODO: add Logbook submission date.
      date: "TBA",
      // TODO: add marks allocated for Logbook.
      marks: "TBA"
    }
  ],

  /* ------------------------------------------------- document milestones */
  /* Filter chips and group headings of the Documents section, in order.   */
  docMilestones: [
    { key: "registration", chip: "Registration", name: "Project Registration" },
    { key: "proposal", chip: "Proposal", name: "Project Proposal" },
    { key: "pp1", chip: "PP1", name: "Progress Presentation 1" },
    { key: "pp2", chip: "PP2", name: "Progress Presentation 2" },
    { key: "paper", chip: "Research Paper", name: "Research Paper" },
    { key: "final", chip: "Final", name: "Final Report & Presentation" },
    { key: "checklist", chip: "Checklist", name: "Check List Documents" },
    { key: "logbook", chip: "Log Book", name: "Log Book" }
  ],

  /* ---------------------------------------------------------- documents */
  /* One entry per file (reports, checklists, logbook). Slide decks are in
     "presentations" below; the Documents section shows both lists.
     Keep the order Group, Thanujan, Janahan, Madushani, Dewmini.
     Dates are the creation dates stored inside each file.                  */
  documents: [
    /* Project Registration ------------------------------------------- */
    // TODO: add the Project Cover Sheet (folder is empty in the SharePoint download).
    { milestone: "registration", title: "Project Cover Sheet", owner: "Group", id: "", type: "Report", status: "Pending" },
    // TODO: add the approved Topic Assessment Form (folder is empty in the SharePoint download).
    { milestone: "registration", title: "Topic Assessment Form (Approved)", owner: "Group", id: "", type: "Report", status: "Pending" },

    /* Project Proposal ------------------------------------------------ */
    {
      milestone: "proposal", title: "Proposal Report — Behaviour Intelligence",
      owner: "Thanujan T", id: "IT22545176", type: "Report", format: "PDF",
      date: "2026-03-20", size: "741 KB", pages: 47, status: "Submitted",
      url: "documents/proposal/report-IT22545176-thanujan.pdf",
      thumb: "assets/img/thumbs/proposal-report-IT22545176-thanujan.webp"
    },
    {
      milestone: "proposal", title: "Proposal Report — Adaptive Forecasting",
      owner: "Janahan R", id: "IT22069740", type: "Report", format: "PDF",
      date: "2026-03-20", size: "948 KB", pages: 27, status: "Submitted",
      url: "documents/proposal/report-IT22069740-janahan.pdf",
      thumb: "assets/img/thumbs/proposal-report-IT22069740-janahan.webp"
    },
    {
      milestone: "proposal", title: "Proposal Report — Explainable AI",
      owner: "Madushani R.P", id: "IT22273062", type: "Report", format: "PDF",
      date: "2026-03-20", size: "1.3 MB", pages: 33, status: "Submitted",
      url: "documents/proposal/report-IT22273062-madushani.pdf",
      thumb: "assets/img/thumbs/proposal-report-IT22273062-madushani.webp"
    },
    {
      milestone: "proposal", title: "Proposal Report — Demand Forecasting / Scenario",
      owner: "Dewmini D.M.D.P", id: "IT22630216", type: "Report", format: "PDF",
      date: "2026-03-20", size: "761 KB", pages: 27, status: "Submitted",
      url: "documents/proposal/report-IT22630216-dewmini.pdf",
      thumb: "assets/img/thumbs/proposal-report-IT22630216-dewmini.webp"
    },

    /* Research Paper -------------------------------------------------- */
    { milestone: "paper", title: "Research Paper", owner: "Group", id: "", type: "Report", status: "Pending" },

    /* Final Report & Presentation ------------------------------------- */
    /* The group report and the four individual reports are named *_DRAFT, so
       they are shown as "Draft" and do not mark the milestone as completed.
       When the final version is submitted: replace the file, set
       status: "Submitted" and update date / size / pages.
       The group report is the original .docx (its stored dates, page count and
       preview image are template leftovers, so the date is the file's saved
       date and it has no thumbnail).                                       */
    {
      milestone: "final", title: "Final Group Report — R26-IT010",
      owner: "Group", id: "", type: "Report", format: "DOCX",
      date: "2026-10-20", size: "612 KB", status: "Draft",
      url: "documents/final/R26-IT010_DRAFT.docx"
    },
    {
      milestone: "final", title: "Final Report — Behaviour Intelligence",
      owner: "Thanujan T", id: "IT22545176", type: "Report", format: "PDF",
      date: "2026-10-10", size: "2.1 MB", pages: 89, status: "Draft",
      url: "documents/final/report-IT22545176-thanujan-draft.pdf",
      thumb: "assets/img/thumbs/final-report-IT22545176-thanujan-draft.webp"
    },
    {
      milestone: "final", title: "Final Report — Adaptive Forecasting",
      owner: "Janahan R", id: "IT22069740", type: "Report", format: "PDF",
      date: "2026-10-10", size: "615 KB", pages: 71, status: "Draft",
      url: "documents/final/report-IT22069740-janahan-draft.pdf",
      thumb: "assets/img/thumbs/final-report-IT22069740-janahan-draft.webp"
    },
    {
      milestone: "final", title: "Final Report — Explainable AI",
      owner: "Madushani R.P", id: "IT22273062", type: "Report", format: "PDF",
      date: "2026-10-11", size: "1.3 MB", pages: 69, status: "Draft",
      url: "documents/final/IT22273062_DRAFT.pdf",
      thumb: "assets/img/thumbs/final-report-IT22273062-madushani-draft.webp"
    },
    {
      milestone: "final", title: "Final Report — Demand Forecasting / Scenario",
      owner: "Dewmini D.M.D.P", id: "IT22630216", type: "Report", format: "PDF",
      date: "2026-10-10", size: "740 KB", pages: 53, status: "Draft",
      url: "documents/final/report-IT22630216-dewmini-draft.pdf",
      thumb: "assets/img/thumbs/final-report-IT22630216-dewmini-draft.webp"
    },

    /* Check List Documents -------------------------------------------- */
    /* Check List 1 was uploaded as Markdown (.md); the site copies are PDF
       conversions of those files.                                          */
    {
      milestone: "checklist", title: "Check List 1 — Behaviour Intelligence",
      owner: "Thanujan T", id: "IT22545176", type: "Checklist", format: "PDF",
      // TODO: add submission date of Check List 1 (the .md files carry no date).
      date: "", size: "94 KB", pages: 8, status: "Submitted",
      url: "documents/checklist/checklist-IT22545176-thanujan.pdf",
      thumb: "assets/img/thumbs/checklist-checklist-IT22545176-thanujan.webp"
    },
    {
      milestone: "checklist", title: "Check List 1 — Adaptive Forecasting",
      owner: "Janahan R", id: "IT22069740", type: "Checklist", format: "PDF",
      date: "", size: "34 KB", pages: 2, status: "Submitted",
      url: "documents/checklist/checklist-IT22069740-janahan.pdf",
      thumb: "assets/img/thumbs/checklist-checklist-IT22069740-janahan.webp"
    },
    {
      milestone: "checklist", title: "Check List 1 — Explainable AI",
      owner: "Madushani R.P", id: "IT22273062", type: "Checklist", format: "PDF",
      date: "", size: "89 KB", pages: 6, status: "Submitted",
      url: "documents/checklist/checklist-IT22273062-madushani.pdf",
      thumb: "assets/img/thumbs/checklist-checklist-IT22273062-madushani.webp"
    },
    {
      milestone: "checklist", title: "Check List 1 — Demand Forecasting / Scenario",
      owner: "Dewmini D.M.D.P", id: "IT22630216", type: "Checklist", format: "PDF",
      date: "", size: "90 KB", pages: 7, status: "Submitted",
      url: "documents/checklist/checklist-IT22630216-dewmini.pdf",
      thumb: "assets/img/thumbs/checklist-checklist-IT22630216-dewmini.webp"
    },
    { milestone: "checklist", title: "Check List 2", owner: "Group", id: "", type: "Checklist", status: "Pending" },
    { milestone: "checklist", title: "Check List 3", owner: "Group", id: "", type: "Checklist", status: "Pending" },
    { milestone: "checklist", title: "Check List 4", owner: "Group", id: "", type: "Checklist", status: "Pending" },

    /* Log Book -------------------------------------------------------- */
    { milestone: "logbook", title: "Log Book", owner: "Group", id: "", type: "Logbook", status: "Pending" }
  ],

  /* ------------------------------------------------------ presentations */
  /* presentationBlocks: one block per presentation, in order. A block with
     no file in "presentations" shows an empty "Upcoming" slot.
     To add a future presentation, add a block and (later) a file entry.    */
  presentationBlocks: [
    {
      milestone: "proposal", title: "Proposal Presentation",
      description: "Problem statement, research gap, the four integrated AI modules, system architecture and each member's proposed component."
    },
    {
      milestone: "pp1", title: "Progress Presentation 1",
      description: "First implementation progress for each component, with panel feedback carried into the next iteration."
    },
    {
      milestone: "pp2", title: "Progress Presentation 2",
      description: "Integrated system overview, per-component workflows, model-comparison results and non-functional requirements."
    },
    {
      milestone: "final", title: "Final Presentation",
      description: "Final results, system demonstration and conclusions."
    }
  ],

  /* Slide decks. The originals are .pptx; the site copies are PDF exports
     so they open in the browser (the final deck is the original .pptx, so
     it downloads instead). Dates are the last-saved date of each deck.     */
  presentations: [
    {
      milestone: "proposal", title: "Proposal Presentation — Slides",
      owner: "Group", id: "", type: "Slides", format: "PDF",
      date: "2026-03-20", size: "2.7 MB", pages: 30, status: "Submitted",
      url: "documents/proposal/slides-group-proposal-presentation.pdf",
      thumb: "assets/img/thumbs/proposal-slides-group-proposal-presentation.webp"
    },
    {
      milestone: "pp1", title: "Progress Presentation 1 — Slides",
      owner: "Group", id: "", type: "Slides", format: "PDF",
      date: "2026-08-07", size: "952 KB", pages: 34, status: "Submitted",
      url: "documents/pp1/slides-group-progress-presentation-1.pdf",
      thumb: "assets/img/thumbs/pp1-slides-group-progress-presentation-1.webp"
    },
    {
      milestone: "pp2", title: "Progress Presentation 2 — Slides",
      owner: "Group", id: "", type: "Slides", format: "PDF",
      date: "2026-09-01", size: "866 KB", pages: 22, status: "Submitted",
      url: "documents/pp2/slides-group-progress-presentation-2.pdf",
      thumb: "assets/img/thumbs/pp2-slides-group-progress-presentation-2.webp"
    },
    {
      milestone: "final", title: "Final Presentation — Slides",
      owner: "Group", id: "", type: "Slides", format: "PPTX",
      date: "2026-10-20", size: "5.5 MB", pages: 35, status: "Draft",
      url: "documents/final/Final_Presentation_IT-P01.pptx",
      thumb: "assets/img/thumbs/final-slides-group-final-presentation.webp"
    }
  ],

  /* ------------------------------------------------------------ contact */
  contact: {
    // TODO: replace with a shared group email address if the team has one (currently the team contact's student email).
    email: "it22545176@my.sliit.lk",
    // TODO: add a group contact phone number (leave "" to show "To be added").
    phone: "",
    address: "Faculty of Computing, Sri Lanka Institute of Information Technology, New Kandy Road, Malabe, Sri Lanka",
    emailTemplate:
      "Subject: Enquiry about project R26-IT-010\n" +
      "\n" +
      "Dear R26-IT-010 team,\n" +
      "\n" +
      "My name is [your name] and I am writing from [organisation / university].\n" +
      "\n" +
      "I would like to ask about [the component or topic you are interested in].\n" +
      "\n" +
      "[Your question or request]\n" +
      "\n" +
      "Thank you,\n" +
      "[your name]\n" +
      "[your contact details]"
  }
};
