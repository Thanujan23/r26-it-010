/* R26-IT-010 — page behaviour. Vanilla JS, no dependencies.
   All content comes from window.SITE in data.js. */
(function () {
  "use strict";

  var SITE = window.SITE;
  if (!SITE) { return; }


  /* ------------------------------------------------------------ helpers */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  // el("a", {href: "#x", class: "y"}, "text" | node | [nodes])
  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (attrs[k] === null || attrs[k] === undefined || attrs[k] === false) { return; }
      if (k === "class") { node.className = attrs[k]; }
      else if (k === "text") { node.textContent = attrs[k]; }
      else { node.setAttribute(k, attrs[k] === true ? "" : attrs[k]); }
    });
    [].concat(children === undefined ? [] : children).forEach(function (c) {
      if (c === null || c === undefined) { return; }
      node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return node;
  }

  function hasLink(url) {
    return !!url && url !== "LINK_NEEDED" && url.indexOf("TODO") === -1;
  }
  function isExternal(url) { return /^https?:\/\//i.test(url); }
  function isUnset(value) { return !value || /^\[.*\]$/.test(value) || value === "TBA"; }
  function pad(n) { return n < 10 ? "0" + n : String(n); }

  function statusMark(text, done) {
    return el("span", { class: "status " + (done ? "status-done" : "status-open"), text: text });
  }

  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  // "2026-03-20" -> "20 Mar 2026"; anything else is shown as written.
  function formatDate(value) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value || "");
    return m ? Number(m[3]) + " " + MONTHS[Number(m[2]) - 1] + " " + m[1] : (value || "");
  }

  /* -------------------------------------------------------------- files */
  // Slide decks first, then documents; data.js keeps Group -> member order.
  var allFiles = (SITE.presentations || []).concat(SITE.documents || []);
  allFiles.forEach(function (f, i) { f.uid = "file-" + i; });

  // A milestone is completed once it has at least one submitted file.
  var submitted = {};
  allFiles.forEach(function (f) { if (f.status === "Submitted") { submitted[f.milestone] = true; } });
  SITE.milestones.forEach(function (m) {
    if (!m.status) { m.status = submitted[m.key] ? "Completed" : "Upcoming"; }
  });

  function badge(text, extra) {
    return el("span", { class: "badge" + (extra ? " " + extra : ""), text: text });
  }

  // One card per file. `id` is optional (the Presentations section reuses cards).
  function fileCard(f, id) {
    var pending = f.status === "Pending";
    var live = !pending && hasLink(f.url);
    var owner = f.id ? f.owner + " · " + f.id : f.owner;
    var facts = [f.date ? formatDate(f.date) : null, f.size, f.pages ? f.pages + " pages" : null].filter(Boolean);

    var thumb;
    if (live && f.thumb) {
      thumb = el("a", { class: "file-thumb", href: f.url, target: "_blank", rel: "noopener", "data-preview": f.title, tabindex: "-1", "aria-hidden": "true" },
        el("img", { src: f.thumb, alt: "", loading: "lazy", width: "360", height: "225" }));
    } else {
      thumb = el("div", { class: "file-thumb file-thumb-empty", "aria-hidden": "true", text: pending ? "Pending" : f.type });
    }

    var actions;
    if (pending) {
      actions = el("p", { class: "file-note", text: "Pending — available after submission" });
    } else if (!live) {
      actions = el("p", { class: "file-note", text: "Link needed — file is too large for the site" });
    } else {
      actions = el("p", { class: "file-actions" }, [
        el("a", { class: "btn btn-small", href: f.url, target: "_blank", rel: "noopener", "data-preview": f.title, "aria-label": "View " + f.title }, "View"),
        el("a", { class: "btn btn-small", href: f.url, download: true, "aria-label": "Download " + f.title }, "Download")
      ]);
    }

    return el("li", {
      class: "file-card" + (pending ? " is-pending" : ""),
      id: id || null,
      "data-owner": f.id || "group"
    }, [
      thumb,
      el("div", { class: "file-body" }, [
        el("p", { class: "file-badges" }, [
          badge(f.type),
          f.format ? badge(f.format, "badge-format") : null,
          f.status === "Draft" ? badge("Draft", "badge-draft") : null
        ]),
        el("h4", { text: f.title }),
        el("p", { class: "file-owner", text: owner }),
        facts.length ? el("p", { class: "file-facts", text: facts.join(" · ") }) : null,
        actions
      ])
    ]);
  }

  /* --------------------------------------------------- simple bindings */
  $all("[data-bind]").forEach(function (node) {
    var value = node.getAttribute("data-bind").split(".").reduce(function (o, k) { return o && o[k]; }, SITE);
    if (value) { node.textContent = value; }
  });

  /* --------------------------------------------------------------- home */
  var statStrip = $("#stat-strip");
  (SITE.project.stats || []).forEach(function (s) {
    statStrip.appendChild(el("div", {}, [el("dt", { text: s.label }), el("dd", { text: s.value })]));
  });

  var componentRow = $("#component-row");
  SITE.members.forEach(function (m, i) {
    componentRow.appendChild(el("li", {}, [
      el("p", { class: "component-no", text: "C" + (i + 1) }),
      el("h3", { text: m.component }),
      el("p", { class: "component-owner", text: m.name + " · " + m.id }),
      el("p", { class: "component-summary", text: m.summary }),
      el("ul", { class: "component-points" }, (m.points || []).map(function (p) { return el("li", { text: p }); })),
      m.alert ? el("p", { class: "component-alert", text: m.alert }) : null
    ]));
  });

  /* ------------------------------------------------------------- domain */
  var tabs = $all('#domain-tabs [role="tab"]');

  function selectTab(tab, focus) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute("aria-selected", on ? "true" : "false");
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
    });
    if (focus) { tab.focus(); }
  }

  tabs.forEach(function (tab, i) {
    tab.addEventListener("click", function () { selectTab(tab); });
    tab.addEventListener("keydown", function (e) {
      var next = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 }[e.key];
      if (next === undefined) { return; }
      e.preventDefault();
      selectTab(tabs[(next + tabs.length) % tabs.length], true);
    });
  });

  function showPanel(id) {
    var tab = tabs.filter(function (t) { return t.getAttribute("aria-controls") === id; })[0];
    if (tab) { selectTab(tab); }
    return !!tab;
  }

  // Citation links and direct #panel links open the right tab first.
  function revealHashTarget() {
    var id = decodeURIComponent(location.hash.slice(1));
    if (!id) { return; }
    var target = document.getElementById(id);
    if (!target) { return; }
    var panel = target.closest ? target.closest(".tabpanel") : null;
    if (panel && panel.hidden) { showPanel(panel.id); }
    var details = target.closest ? target.closest("details") : null;
    if (details) { details.open = true; }
    if (panel || details) { target.scrollIntoView(); }
  }
  window.addEventListener("hashchange", revealHashTarget);

  /* --------------------------------------------------------- milestones */
  var msSelect = $("#milestone-select");
  var msTrack = $("#milestone-track");
  var msDetail = $("#milestone-detail");

  function showMilestone(index) {
    var m = SITE.milestones[index];
    if (!m) { return; }
    msSelect.selectedIndex = index;
    $all("button", msTrack).forEach(function (b, i) {
      if (i === index) { b.setAttribute("aria-current", "true"); } else { b.removeAttribute("aria-current"); }
    });
    var done = m.status === "Completed";
    msDetail.textContent = "";
    msDetail.appendChild(el("p", { class: "label", text: "Milestone " + pad(index + 1) + " of " + pad(SITE.milestones.length) }));
    msDetail.appendChild(el("h3", { text: m.name }));
    msDetail.appendChild(el("p", { class: "md-desc", text: m.description }));
    msDetail.appendChild(el("dl", { class: "milestone-facts" }, [
      el("div", {}, [el("dt", { text: "Date" }), el("dd", { text: m.date || "TBA" })]),
      el("div", {}, [el("dt", { text: "Marks allocated" }), el("dd", { text: m.marks || "TBA" })]),
      el("div", {}, [el("dt", { text: "Status" }), el("dd", {}, statusMark(m.status, done))])
    ]));
  }

  SITE.milestones.forEach(function (m, i) {
    msSelect.appendChild(el("option", { value: m.key, text: m.name }));
    var btn = el("button", { type: "button" }, [
      el("span", { class: "mt-no", text: pad(i + 1) }),
      el("span", { class: "mt-name", text: m.name }),
      statusMark(m.status, m.status === "Completed")
    ]);
    btn.addEventListener("click", function () { showMilestone(i); });
    msTrack.appendChild(el("li", {}, btn));
  });
  msSelect.addEventListener("change", function () { showMilestone(msSelect.selectedIndex); });

  // Open on the first upcoming milestone, or the last one if all are done.
  var firstOpen = SITE.milestones.map(function (m) { return m.status; }).indexOf("Upcoming");
  showMilestone(firstOpen === -1 ? SITE.milestones.length - 1 : firstOpen);

  /* ---------------------------------------------------------- documents */
  var docChips = $("#doc-chips");
  var docMember = $("#doc-member");
  var docGroups = $("#doc-groups");
  var docCount = $("#doc-count");
  var docFilter = { milestone: "all", member: "all" };

  function applyDocFilter() {
    var shown = 0;
    $all(".doc-group", docGroups).forEach(function (group) {
      var inMilestone = docFilter.milestone === "all" || group.getAttribute("data-milestone") === docFilter.milestone;
      var visible = 0;
      $all(".file-card", group).forEach(function (card) {
        var ok = inMilestone && (docFilter.member === "all" || card.getAttribute("data-owner") === docFilter.member);
        card.hidden = !ok;
        if (ok) { visible += 1; }
      });
      group.hidden = visible === 0;
      shown += visible;
    });
    $all("button", docChips).forEach(function (b) {
      b.setAttribute("aria-pressed", b.value === docFilter.milestone ? "true" : "false");
    });
    docMember.value = docFilter.member;
    docCount.textContent = shown
      ? "Showing " + shown + " of " + allFiles.length + " items."
      : "Nothing matches this filter yet.";
  }

  function setDocFilter(milestone, member) {
    docFilter.milestone = milestone;
    docFilter.member = member;
    applyDocFilter();
  }

  [{ key: "all", chip: "All" }].concat(SITE.docMilestones).forEach(function (m) {
    var chip = el("button", { type: "button", class: "chip", value: m.key, "aria-pressed": "false", text: m.chip });
    chip.addEventListener("click", function () { setDocFilter(m.key, docFilter.member); });
    docChips.appendChild(chip);
  });

  docMember.appendChild(el("option", { value: "all", text: "All members" }));
  docMember.appendChild(el("option", { value: "group", text: "Group" }));
  SITE.members.forEach(function (m) { docMember.appendChild(el("option", { value: m.id, text: m.name })); });
  docMember.addEventListener("change", function () { setDocFilter(docFilter.milestone, docMember.value); });

  SITE.docMilestones.forEach(function (m) {
    var files = allFiles.filter(function (f) { return f.milestone === m.key; });
    if (!files.length) { return; }
    var ready = files.filter(function (f) { return f.status !== "Pending"; }).length;
    docGroups.appendChild(el("section", { class: "doc-group", "data-milestone": m.key, "aria-label": m.name }, [
      el("div", { class: "doc-group-head" }, [
        el("h3", { text: m.name }),
        el("p", { class: "doc-group-count", text: ready + " of " + files.length + " available" })
      ]),
      el("ul", { class: "file-grid" }, files.map(function (f) { return fileCard(f, f.uid); }))
    ]));
  });
  applyDocFilter();

  /* ------------------------------------------------------ presentations */
  var presBlocks = $("#presentation-blocks");
  (SITE.presentationBlocks || []).forEach(function (block, i) {
    var decks = (SITE.presentations || []).filter(function (p) { return p.milestone === block.milestone; });
    var done = decks.some(function (p) { return p.status === "Submitted"; });
    var cards = decks.length
      ? decks.map(function (p) { return fileCard(p); })
      : [el("li", { class: "file-card is-pending" }, [
          el("div", { class: "file-thumb file-thumb-empty", "aria-hidden": "true", text: "Upcoming" }),
          el("div", { class: "file-body" }, [
            el("p", { class: "file-badges" }, badge("Slides")),
            el("h4", { text: block.title + " — Slides" }),
            el("p", { class: "file-note", text: "Upcoming — slides available after the presentation" })
          ])
        ])];
    presBlocks.appendChild(el("section", { class: "pres-block", id: "pres-" + block.milestone, "aria-label": block.title }, [
      el("div", { class: "pres-text" }, [
        el("p", { class: "p-no", text: pad(i + 1) }),
        el("h3", { text: block.title }),
        el("p", { class: "p-desc", text: block.description }),
        el("p", { class: "p-status" }, [
          statusMark(done ? "Completed" : "Upcoming", done),
          decks[0] && decks[0].date ? el("span", { class: "p-date", text: "Slides dated " + formatDate(decks[0].date) }) : null
        ])
      ]),
      el("ul", { class: "file-grid" }, cards)
    ]));
  });

  /* ------------------------------------------------------ PDF preview */
  // "View" opens PDFs kept in the site in an in-page preview. Small screens,
  // external links and modified clicks fall through to a normal new tab.
  var preview = $("#preview");
  var previewFrame = $("#preview-frame");

  if (preview && typeof preview.showModal === "function") {
    document.addEventListener("click", function (e) {
      var link = e.target.closest ? e.target.closest("a[data-preview]") : null;
      if (!link || e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) { return; }
      var href = link.getAttribute("href");
      if (isExternal(href) || !/\.pdf$/i.test(href) || window.innerWidth < 760) { return; }
      e.preventDefault();
      $("#preview-title").textContent = link.getAttribute("data-preview");
      $("#preview-open").setAttribute("href", href);
      previewFrame.setAttribute("src", href);
      preview.showModal();
    });
    $("#preview-close").addEventListener("click", function () { preview.close(); });
    // A click on the backdrop lands on the dialog element itself.
    preview.addEventListener("click", function (e) { if (e.target === preview) { preview.close(); } });
    preview.addEventListener("close", function () { previewFrame.removeAttribute("src"); });
  }

  /* -------------------------------------------------------------- about */
  var supList = $("#supervisor-list");
  SITE.supervisors.forEach(function (s) {
    var unset = isUnset(s.name);
    supList.appendChild(el("li", {}, [
      el("p", { class: "label", text: s.role }),
      el("h4", { class: unset ? "is-tbc" : null, text: unset ? "To be confirmed" : s.name }),
      s.affiliation ? el("p", { text: s.affiliation }) : null,
      s.email ? el("p", {}, el("a", { href: "mailto:" + s.email, text: s.email })) : null
    ]));
  });

  function initials(name) {
    return name.replace(/[^A-Za-z ]/g, " ").split(/\s+/).filter(Boolean).slice(0, 2)
      .map(function (w) { return w.charAt(0).toUpperCase(); }).join("");
  }

  var memberGrid = $("#member-grid");
  SITE.members.forEach(function (m) {
    var photo = m.photo
      ? el("img", { class: "member-photo", src: m.photo, alt: "Portrait of " + m.name, loading: "lazy", width: "400", height: "400" })
      : el("div", { class: "member-photo member-initials", role: "img", "aria-label": m.name + " (photo to be added)", text: initials(m.name) });
    memberGrid.appendChild(el("li", {}, [
      photo,
      el("h4", { text: m.name }),
      el("p", { class: "member-id", text: m.id }),
      el("p", { class: "member-component", text: m.component }),
      el("p", { class: "member-role", text: m.role }),
      el("p", { class: "member-email" }, el("a", { href: "mailto:" + m.email, text: m.email }))
    ]));
  });

  /* ------------------------------------------------------------ contact */
  var contactList = $("#contact-list");
  function contactRow(term, value) {
    contactList.appendChild(el("div", {}, [el("dt", { text: term }), el("dd", {}, value)]));
  }
  var c = SITE.contact;
  contactRow("Group email", c.email ? el("a", { href: "mailto:" + c.email, text: c.email }) : el("span", { class: "link-off", text: "To be added" }));
  contactRow("Phone", c.phone ? el("a", { href: "tel:" + c.phone.replace(/[^+\d]/g, ""), text: c.phone }) : el("span", { class: "link-off", text: "To be added" }));
  SITE.supervisors.forEach(function (s) {
    if (isUnset(s.name)) { return; }
    contactRow(s.role, [s.name, s.email ? ", " : null, s.email ? el("a", { href: "mailto:" + s.email, text: s.email }) : null]);
  });
  if (c.address) { contactRow("Address", c.address); }

  var template = $("#email-template");
  template.textContent = c.emailTemplate;
  var copyStatus = $("#copy-status");

  $("#copy-template").addEventListener("click", function () {
    function report(ok) {
      copyStatus.textContent = ok ? "Copied to clipboard." : "Copy failed — select the text and copy it manually.";
      setTimeout(function () { copyStatus.textContent = ""; }, 4000);
    }
    function fallback() {
      var range = document.createRange();
      range.selectNodeContents(template);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      var ok = false;
      try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
      sel.removeAllRanges();
      report(ok);
    }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(c.emailTemplate).then(function () { report(true); }, fallback);
    } else {
      fallback();
    }
  });

  var form = $("#contact-form");
  var formError = $("#form-error");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var f = form.elements;
    var missing = ["name", "email", "subject", "message"].filter(function (k) { return !f[k].value.trim(); });
    var badEmail = !missing.length && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.value.trim());
    if (missing.length || badEmail) {
      formError.textContent = missing.length
        ? "Please fill in: " + missing.join(", ") + "."
        : "Please enter a valid email address.";
      formError.hidden = false;
      f[missing[0] || "email"].focus();
      return;
    }
    formError.hidden = true;
    var body = f.message.value.trim() + "\n\n" + f.name.value.trim() + "\n" + f.email.value.trim();
    location.href = "mailto:" + c.email +
      "?subject=" + encodeURIComponent("[" + SITE.project.id + "] " + f.subject.value.trim()) +
      "&body=" + encodeURIComponent(body);
  });

  if (SITE.project.repoUrl) {
    $("#footer-repo").appendChild(el("a", { href: SITE.project.repoUrl, target: "_blank", rel: "noopener", text: "Project repository on GitHub" }));
  }

  /* --------------------------------------------------------- navigation */
  var header = $(".site-header");
  var nav = $("#site-nav");
  var toggle = $(".nav-toggle");

  function closeNav() {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }
  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  $all("a", nav).forEach(function (a) { a.addEventListener("click", closeNav); });

  // Highlight the section currently in view.
  var navLinks = $all(".site-nav ul a");
  var sections = $all("main > section");
  function markCurrent() {
    var line = header.offsetHeight + 40;
    var current = sections[0];
    sections.forEach(function (s) {
      if (s.getBoundingClientRect().top <= line) { current = s; }
    });
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
      current = sections[sections.length - 1];
    }
    navLinks.forEach(function (a) {
      if (a.getAttribute("href") === "#" + current.id) { a.setAttribute("aria-current", "true"); }
      else { a.removeAttribute("aria-current"); }
    });
    $("#to-top").hidden = window.scrollY < 600;
  }
  var ticking = false;
  window.addEventListener("scroll", function () {
    if (ticking) { return; }
    ticking = true;
    requestAnimationFrame(function () { ticking = false; markCurrent(); });
  }, { passive: true });
  window.addEventListener("resize", markCurrent);

  /* ------------------------------------------------------------- search */
  var searchInput = $("#site-search");
  var searchList = $("#search-results");
  var index = [];
  var hits = [];
  var active = -1;

  function flash(node) {
    if (!node) { return; }
    node.classList.add("is-hit");
    setTimeout(function () { node.classList.remove("is-hit"); }, 2600);
  }
  function jumpTo(id) {
    var target = document.getElementById(id);
    if (!target) { return; }
    target.scrollIntoView();
    flash(target);
  }

  sections.forEach(function (s) {
    index.push({ kind: "Section", title: s.getAttribute("data-nav"), text: "", go: function () { jumpTo(s.id); } });
  });
  tabs.forEach(function (t) {
    var id = t.getAttribute("aria-controls");
    index.push({
      kind: "Domain", title: t.textContent, text: document.getElementById(id).textContent,
      go: function () { showPanel(id); jumpTo("domain"); }
    });
  });
  SITE.milestones.forEach(function (m, i) {
    index.push({
      kind: "Milestone", title: m.name, text: m.description + " " + m.status,
      go: function () { showMilestone(i); jumpTo("milestones"); }
    });
  });
  allFiles.forEach(function (f) {
    index.push({
      kind: f.type + " · " + f.status, title: f.title, text: f.owner + " " + (f.id || "") + " " + f.milestone,
      go: function () { setDocFilter("all", "all"); jumpTo(f.uid); }
    });
  });
  (SITE.presentationBlocks || []).forEach(function (b) {
    index.push({ kind: "Presentation", title: b.title, text: b.description, go: function () { jumpTo("pres-" + b.milestone); } });
  });
  SITE.members.forEach(function (m) {
    index.push({
      kind: "Team", title: m.name + " — " + m.component, text: m.id + " " + m.summary + " " + (m.points || []).join(" "),
      go: function () { jumpTo("about"); }
    });
  });

  function closeSearch() {
    searchList.hidden = true;
    searchInput.setAttribute("aria-expanded", "false");
    searchInput.removeAttribute("aria-activedescendant");
    active = -1;
  }

  function setActive(i) {
    active = i;
    $all("li", searchList).forEach(function (li, n) {
      li.setAttribute("aria-selected", n === i ? "true" : "false");
      if (n === i) {
        searchInput.setAttribute("aria-activedescendant", li.id);
        li.scrollIntoView({ block: "nearest" });
      }
    });
  }

  function choose(i) {
    var hit = hits[i];
    if (!hit) { return; }
    closeSearch();
    closeNav();
    searchInput.value = "";
    searchInput.blur();
    // Let the mobile menu collapse before measuring scroll positions.
    requestAnimationFrame(hit.go);
  }

  function runSearch() {
    var words = searchInput.value.toLowerCase().split(/\s+/).filter(Boolean);
    searchList.textContent = "";
    if (!words.length) { closeSearch(); return; }

    hits = index.map(function (entry) {
      var title = entry.title.toLowerCase();
      var all = title + " " + entry.text.toLowerCase();
      var ok = words.every(function (w) { return all.indexOf(w) !== -1; });
      var inTitle = words.every(function (w) { return title.indexOf(w) !== -1; });
      return ok ? { entry: entry, score: inTitle ? 0 : 1 } : null;
    }).filter(Boolean).sort(function (a, b) { return a.score - b.score; })
      .slice(0, 8).map(function (h) { return h.entry; });

    if (!hits.length) {
      searchList.appendChild(el("li", { class: "sr-empty", role: "option", "aria-disabled": "true", text: "No matches. Try “proposal”, “milestone” or a member’s name." }));
    }
    hits.forEach(function (hit, i) {
      var li = el("li", { role: "option", id: "sr-" + i, "aria-selected": "false" }, [
        el("span", { class: "sr-kind", text: hit.kind }),
        hit.title
      ]);
      // mousedown fires before the input loses focus
      li.addEventListener("mousedown", function (e) { e.preventDefault(); choose(i); });
      searchList.appendChild(li);
    });
    searchList.hidden = false;
    searchInput.setAttribute("aria-expanded", "true");
    active = -1;
  }

  searchInput.addEventListener("input", runSearch);
  searchInput.addEventListener("focus", runSearch);
  searchInput.addEventListener("blur", function () { setTimeout(closeSearch, 120); });
  searchInput.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { closeSearch(); return; }
    if (searchList.hidden || !hits.length) { return; }
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((active + 1) % hits.length); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((active - 1 + hits.length) % hits.length); }
    else if (e.key === "Enter") { e.preventDefault(); choose(active === -1 ? 0 : active); }
  });

  /* --------------------------------------------------------------- init */
  markCurrent();
  revealHashTarget();
})();
