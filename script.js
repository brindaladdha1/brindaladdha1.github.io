(() => {
  const data = window.portfolioContent;
  if (!data) return;

  const ICONS = {
    chart: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 20V10M12 20V4M20 20v-7"/></svg>',
    target: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/></svg>',
    route: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.2 6.8h7.6a3 3 0 0 1 3 3v0a3 3 0 0 1-3 3H8.2a3 3 0 0 0-3 3v0"/></svg>',
    spark: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.8 2.8M15.2 15.2 18 18M18 6l-2.8 2.8M8.8 15.2 6 18"/></svg>',
    trend: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/></svg>',
    honey: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2 21 7v10l-9 5-9-5V7z"/><path d="M12 12v10M12 12 3 7M12 12l9-5"/></svg>'
  };

  // ---- Render expertise tags ----
  const expertiseList = document.getElementById("expertise-list");
  if (expertiseList) {
    data.expertise.forEach((item) => {
      const span = document.createElement("span");
      span.textContent = item;
      expertiseList.appendChild(span);
    });
  }

  // ---- Render tools list ----
  const toolsList = document.getElementById("tools-list");
  if (toolsList) {
    data.tools.forEach((tool) => {
      const li = document.createElement("li");
      li.textContent = tool;
      toolsList.appendChild(li);
    });
  }

  // ---- Render experience tabs ----
  const tabsEl = document.getElementById("experience-tabs");
  const panelEl = document.getElementById("experience-panel");

  function renderExperiencePanel(index) {
    const exp = data.experience[index];
    panelEl.innerHTML = `
      <h3>${exp.role} <span>@ ${exp.company}</span></h3>
      <p class="tab-panel__meta">${exp.dates} · ${exp.location}</p>
      <ul>${exp.summary.map((s) => `<li>${s}</li>`).join("")}</ul>
    `;
  }

  function setActiveTab(index) {
    Array.from(tabsEl.children).forEach((btn, i) => {
      btn.classList.toggle("is-active", i === index);
      btn.setAttribute("aria-selected", i === index ? "true" : "false");
    });
    renderExperiencePanel(index);
  }

  if (tabsEl && panelEl) {
    data.experience.forEach((exp, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "tab-button";
      btn.setAttribute("role", "tab");
      btn.textContent = exp.company;
      btn.addEventListener("click", () => setActiveTab(i));
      tabsEl.appendChild(btn);
    });
    setActiveTab(0);
  }

  // ---- Render projects ----
  const projectGrid = document.getElementById("project-grid");
  if (projectGrid) {
    data.projects.forEach((p) => {
      const card = document.createElement("article");
      card.className = "project-card";
      card.innerHTML = `
        <div class="project-card__top">
          <span class="project-card__icon">${ICONS[p.icon] || ICONS.chart}</span>
          <span class="project-card__date">${p.dates || ""}</span>
        </div>
        <h3>${p.title}</h3>
        <div class="project-card__categories">
          ${p.categories.map((c) => `<span>${c}</span>`).join("")}
        </div>
        <p><strong>Problem:</strong> ${p.problem}</p>
        <p><strong>Approach:</strong> ${p.approach}</p>
        <div class="project-card__tools">
          ${p.tools.map((t) => `<span>${t}</span>`).join("")}
        </div>
        <div class="project-card__metrics">
          ${p.metrics.map((m) => `<div><strong>${m.value}</strong><span>${m.label}</span></div>`).join("")}
        </div>
        ${p.githubUrl ? `<a class="project-card__repo-link" href="${p.githubUrl}" target="_blank" rel="noreferrer">View repository →</a>` : ""}
        ${p.link ? `<a class="project-card__repo-link" href="${p.link}" target="_blank" rel="noreferrer">${p.linkLabel || "View project →"}</a>` : ""}
      `;
      projectGrid.appendChild(card);
    });
  }

  // ---- Render writing ----
  const writingList = document.getElementById("writing-list");
  if (writingList && data.writing) {
    data.writing.forEach((item) => {
      const row = document.createElement("article");
      row.className = "writing-item";
      row.innerHTML = `
        <div class="writing-item__top">
          <h3>${item.title}</h3>
          <span class="writing-item__date">${item.date}</span>
        </div>
        <p class="writing-item__type">${item.type}</p>
        <p class="writing-item__blurb">${item.blurb}</p>
        ${item.fileUrl ? `<a class="writing-item__link" href="${item.fileUrl}" target="_blank" rel="noreferrer">${item.fileLabel || "Read the full paper →"}</a>` : ""}
      `;
      writingList.appendChild(row);
    });
  }

  // ---- Render leadership ----
  const leadershipList = document.getElementById("leadership-list");
  if (leadershipList) {
    data.leadership.forEach((item) => {
      const row = document.createElement("div");
      row.className = "leadership-item";
      row.innerHTML = `
        <p class="leadership-item__date">${item.dates}</p>
        <div>
          <h3>${item.role}</h3>
          <p>${item.org} · ${item.location}</p>
          ${item.link ? `<a class="leadership-item__link" href="${item.link}" target="_blank" rel="noreferrer">${item.linkLabel || item.link}</a>` : ""}
          ${item.bullets ? `<ul class="leadership-item__bullets">${item.bullets.map((b) => `<li>${b}</li>`).join("")}</ul>` : ""}
        </div>
      `;
      leadershipList.appendChild(row);
    });
  }

  // ---- Mobile nav toggle ----
  const navToggle = document.getElementById("mobile-nav-toggle");
  const nav = document.getElementById("primary-navigation");
  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ---- Active nav link highlight on scroll ----
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  if (sections.length && navLinks.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navLinks.forEach((link) => {
              link.style.color = link.getAttribute("href") === `#${entry.target.id}` ? "var(--blue)" : "";
            });
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    sections.forEach((section) => observer.observe(section));
  }

  // ---- Hero: typewriter effect for name + statement ----
  function typeWriter(el, text, speed, onDone) {
    el.textContent = "";
    el.classList.add("is-typing");
    let i = 0;
    (function step() {
      if (i <= text.length) {
        el.textContent = text.slice(0, i);
        i += 1;
        setTimeout(step, speed);
      } else {
        el.classList.remove("is-typing");
        if (onDone) onDone();
      }
    })();
  }

  const heroTitle = document.getElementById("hero-title");
  const heroStatement = document.getElementById("hero-statement");
  if (heroTitle && heroStatement) {
    const titleText = heroTitle.textContent;
    const statementText = heroStatement.textContent;
    heroStatement.textContent = "";
    typeWriter(heroTitle, titleText, 75, () => {
      typeWriter(heroStatement, statementText, 26);
    });
  }
})();
