// Lokeria.id — full features
(function () {
  const AUTH_KEY = "lokeria_user";
  const USERS_KEY = "lokeria_users";
  const FAV_KEY = "lokeria_favorites";
  const LANG_KEY = "lokeria_lang";
  const APPS_KEY = "lokeria_applications";
  const NOTIF_KEY = "lokeria_notifs";
  const THEME_KEY = "lokeria_theme";
  const PROFILE_KEY = "lokeria_profiles";

  function getUser() {
    try { return JSON.parse(localStorage.getItem(AUTH_KEY) || "null"); } catch { return null; }
  }
  function setUser(u) {
    if (u) localStorage.setItem(AUTH_KEY, JSON.stringify(u));
    else localStorage.removeItem(AUTH_KEY);
  }
  function getUsers() {
    try { return JSON.parse(localStorage.getItem(USERS_KEY) || "[]"); } catch { return []; }
  }
  function saveUsers(list) { localStorage.setItem(USERS_KEY, JSON.stringify(list)); }

  // Seed demo account
  (function seedDemo() {
    const users = getUsers();
    if (!users.some((u) => u.email === "demo@lokeria.id")) {
      users.push({ name: "Demo User", email: "demo@lokeria.id", password: "demo123", role: "seeker" });
      saveUsers(users);
    }
  })();

  function getFavorites() {
    try { return JSON.parse(localStorage.getItem(FAV_KEY) || "[]"); } catch { return []; }
  }
  function setFavorites(ids) { localStorage.setItem(FAV_KEY, JSON.stringify(ids)); }
  function getApps() {
    try { return JSON.parse(localStorage.getItem(APPS_KEY) || "[]"); } catch { return []; }
  }
  function setApps(list) { localStorage.setItem(APPS_KEY, JSON.stringify(list)); }
  function getNotifs() {
    try { return JSON.parse(localStorage.getItem(NOTIF_KEY) || "[]"); } catch { return []; }
  }
  function setNotifs(list) { localStorage.setItem(NOTIF_KEY, JSON.stringify(list)); }
  function addNotif(text) {
    const list = getNotifs();
    list.unshift({ id: Date.now(), text, time: new Date().toLocaleString("id-ID"), read: false });
    setNotifs(list.slice(0, 30));
  }
  function getProfiles() {
    try { return JSON.parse(localStorage.getItem(PROFILE_KEY) || "{}"); } catch { return {}; }
  }
  function saveProfile(email, data) {
    const all = getProfiles();
    all[email] = data;
    localStorage.setItem(PROFILE_KEY, JSON.stringify(all));
  }

  const path = (location.pathname.split("/").pop() || location.href.split("/").pop() || "index.html").split("?")[0].toLowerCase();
  const isLoginPage = path === "login.html";
  const user = getUser();
  if (!user && !isLoginPage) {
    location.replace("login.html");
    return;
  }
  if (user && isLoginPage) {
    location.replace("index.html");
    return;
  }

  // Theme early
  const theme = localStorage.getItem(THEME_KEY) || "light";
  if (theme === "dark") document.documentElement.setAttribute("data-theme", "dark");

  const T = {
    id: {
      "nav.home": "Home", "nav.jobs": "Lowongan", "nav.advertise": "Perusahaan", "nav.category": "Kategori",
      "nav.portfolio": "Portofolio", "nav.about": "Tentang", "nav.contact": "Kontak", "nav.faq": "FAQ",
      "nav.dash": "Dashboard", "nav.profile": "Profil", "nav.login": "Masuk", "nav.logout": "Keluar",
      "nav.cta": "Cari kerja", "search.placeholder": "Jabatan, perusahaan, atau kata kunci...",
      "footer.tagline": "Menghubungkan potensi dengan peluang.", "lang.btn": "EN",
      "hero.eyebrow": "Platform peluang kerja & jasa",
      "hero.title": "Kesulitan diterima? Tenang saja, Lokeria.id di sini.",
      "hero.desc": "Temukan lowongan dari perusahaan ternama, tawarkan keahlianmu, atau pasang iklan perusahaan — semua di satu tempat.",
      "hero.searchBtn": "Cari lowongan", "companies.label": "Perusahaan yang lowongannya ada di Lokeria.id",
      "jobs.title": "Karir di perusahaan ternama.", "jobs.lead": "Filter lokasi, tipe, industri, gaji, atau pengalaman.",
      "jobs.detail": "Detail", "jobs.apply": "Lamar sekarang", "jobs.save": "Simpan", "jobs.back": "Kembali ke lowongan",
      "jobs.desc": "Deskripsi pekerjaan", "jobs.req": "Persyaratan", "jobs.benefit": "Benefit",
      "jobs.note": "Lowongan contoh untuk tugas/demo.", "jobs.empty": "Tidak ada lowongan yang cocok.",
      "jobs.try": "Coba kata kunci atau filter lain.",
      "login.welcome": "Selamat datang kembali", "login.lead": "Masuk untuk menyimpan lowongan dan melacak lamaranmu.",
      "login.email": "Email", "login.password": "Password", "login.remember": "Ingat saya", "login.forgot": "Lupa password?",
      "login.submit": "Masuk", "login.tab": "Masuk", "register.tab": "Daftar",
      "register.title": "Buat akun Lokeria", "register.lead": "Gratis untuk pencari kerja.",
      "register.name": "Nama lengkap", "register.role": "Saya mendaftar sebagai",
      "register.seeker": "Pencari kerja", "register.freelancer": "Freelancer", "register.employer": "Perusahaan / HR",
      "register.submit": "Daftar sekarang", "register.demo": "Data disimpan di browser ini (demo).",
      "auth.why": "Kenapa punya akun?", "auth.b1": "Simpan lowongan favorit", "auth.b2": "Lacak status lamaran",
      "auth.b3": "Dapat rekomendasi", "auth.b4": "Pasang lowongan (perusahaan)",
      "dash.eyebrow": "Area kamu", "dash.title": "Dashboard", "dash.saved": "Lowongan tersimpan",
      "dash.apps": "Riwayat lamaran", "dash.notif": "Notifikasi", "dash.statJobs": "Lowongan aktif",
      "dash.statSaved": "Tersimpan", "dash.statApps": "Lamaran", "dash.statNotif": "Notifikasi baru",
      "dash.none": "Belum ada data.", "profile.eyebrow": "Akun", "profile.title": "Profil saya",
      "profile.lead": "Lengkapi profil agar lamaran lebih cepat.", "profile.save": "Simpan profil",
      "empty.404": "Halaman tidak ditemukan", "empty.404desc": "Link mungkin rusak atau halaman dipindah.",
      "empty.home": "Kembali ke Home", "chat.title": "Chat HR (demo)", "chat.placeholder": "Tulis pesan...",
      "chat.send": "Kirim", "pdf.export": "Export PDF", "toast.loginOk": "Berhasil masuk!",
      "toast.registerOk": "Akun dibuat! Silakan masuk.", "toast.logout": "Kamu sudah keluar.",
      "toast.saved": "Lowongan disimpan!", "toast.removed": "Dihapus dari tersimpan",
      "toast.needLogin": "Silakan masuk dulu", "toast.wrong": "Email atau password salah",
      "toast.exists": "Email sudah terdaftar", "toast.profile": "Profil disimpan!",
      "toast.applied": "Lamaran terkirim!", "sabar": "Sabar ya!", "sabar.sub": "lagi pindah halaman...",
      "stat.jobs": "Lowongan", "stat.companies": "Perusahaan", "stat.types": "Tipe kerja",
    },
    en: {
      "nav.home": "Home", "nav.jobs": "Jobs", "nav.advertise": "Companies", "nav.category": "Categories",
      "nav.portfolio": "Portfolio", "nav.about": "About", "nav.contact": "Contact", "nav.faq": "FAQ",
      "nav.dash": "Dashboard", "nav.profile": "Profile", "nav.login": "Log in", "nav.logout": "Log out",
      "nav.cta": "Find jobs", "search.placeholder": "Job title, company, or keyword...",
      "footer.tagline": "Connecting potential with opportunity.", "lang.btn": "ID",
      "hero.eyebrow": "Jobs & services platform",
      "hero.title": "Hard to get hired? Relax, Lokeria.id is here.",
      "hero.desc": "Find roles at top companies, offer your skills, or post company jobs — all in one place.",
      "hero.searchBtn": "Search jobs", "companies.label": "Companies hiring on Lokeria.id",
      "jobs.title": "Careers at leading companies.", "jobs.lead": "Filter by location, type, industry, salary, or experience.",
      "jobs.detail": "Details", "jobs.apply": "Apply now", "jobs.save": "Save", "jobs.back": "Back to jobs",
      "jobs.desc": "Job description", "jobs.req": "Requirements", "jobs.benefit": "Benefits",
      "jobs.note": "Sample listings for demo only.", "jobs.empty": "No matching jobs.",
      "jobs.try": "Try another keyword or filter.",
      "login.welcome": "Welcome back", "login.lead": "Sign in to save jobs and track applications.",
      "login.email": "Email", "login.password": "Password", "login.remember": "Remember me", "login.forgot": "Forgot password?",
      "login.submit": "Log in", "login.tab": "Log in", "register.tab": "Sign up",
      "register.title": "Create a Lokeria account", "register.lead": "Free for job seekers.",
      "register.name": "Full name", "register.role": "I am signing up as",
      "register.seeker": "Job seeker", "register.freelancer": "Freelancer", "register.employer": "Company / HR",
      "register.submit": "Sign up now", "register.demo": "Data is stored in this browser (demo).",
      "auth.why": "Why create an account?", "auth.b1": "Save favorite jobs", "auth.b2": "Track applications",
      "auth.b3": "Get recommendations", "auth.b4": "Post jobs (companies)",
      "dash.eyebrow": "Your space", "dash.title": "Dashboard", "dash.saved": "Saved jobs",
      "dash.apps": "Application history", "dash.notif": "Notifications", "dash.statJobs": "Active jobs",
      "dash.statSaved": "Saved", "dash.statApps": "Applications", "dash.statNotif": "New notifications",
      "dash.none": "No data yet.", "profile.eyebrow": "Account", "profile.title": "My profile",
      "profile.lead": "Complete your profile to apply faster.", "profile.save": "Save profile",
      "empty.404": "Page not found", "empty.404desc": "The link may be broken or moved.",
      "empty.home": "Back to Home", "chat.title": "HR chat (demo)", "chat.placeholder": "Type a message...",
      "chat.send": "Send", "pdf.export": "Export PDF", "toast.loginOk": "Logged in!",
      "toast.registerOk": "Account created! Please log in.", "toast.logout": "You have logged out.",
      "toast.saved": "Job saved!", "toast.removed": "Removed from saved",
      "toast.needLogin": "Please log in first", "toast.wrong": "Wrong email or password",
      "toast.exists": "Email already registered", "toast.profile": "Profile saved!",
      "toast.applied": "Application sent!", "sabar": "Hang on!", "sabar.sub": "switching pages...",
      "stat.jobs": "Jobs", "stat.companies": "Companies", "stat.types": "Job types",
    },
  };

  function lang() { return localStorage.getItem(LANG_KEY) || "id"; }
  function t(key) { return (T[lang()] && T[lang()][key]) || T.id[key] || key; }
  window.t = t;

  function applyLang() {
    const L = lang();
    document.documentElement.lang = L === "en" ? "en" : "id";
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (T[L] && T[L][key] != null) el.textContent = T[L][key];
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (T[L] && T[L][key] != null) el.setAttribute("placeholder", T[L][key]);
    });
    const btn = document.getElementById("lang-toggle");
    if (btn) btn.textContent = T[L]["lang.btn"];
    document.querySelectorAll("[data-auth-label]").forEach((el) => {
      el.textContent = getUser() ? t("nav.logout") : t("nav.login");
    });
  }

  function showToast(message, type) {
    let host = document.getElementById("toast-host");
    if (!host) {
      host = document.createElement("div");
      host.id = "toast-host";
      host.className = "toast-host";
      document.body.appendChild(host);
    }
    const el = document.createElement("div");
    el.className = "toast toast-" + (type || "info");
    el.textContent = message;
    host.appendChild(el);
    requestAnimationFrame(() => el.classList.add("is-visible"));
    setTimeout(() => { el.classList.remove("is-visible"); setTimeout(() => el.remove(), 300); }, 2800);
  }
  window.showToast = showToast;

  function buildNav(active) {
    const items = [
      ["index.html", "nav.home", "home"],
      ["lowongan.html", "nav.jobs", "jobs"],
      ["dashboard.html", "nav.dash", "dash"],
      ["kategori.html", "nav.category", "kategori"],
      ["iklan.html", "nav.advertise", "advertise"],
      ["profile.html", "nav.profile", "profile"],
      ["portfolio.html", "nav.portfolio", "portfolio"],
      ["about.html", "nav.about", "about"],
      ["contact.html", "nav.contact", "contact"],
      ["faq.html", "nav.faq", "faq"],
    ];
    const links = items.map(([href, key, k]) =>
      `<a class="nav-link${k === active ? " active" : ""}" href="${href}" data-i18n="${key}">${t(key)}</a>`
    ).join("");
    return `
      <a class="brand" href="index.html"><img src="images/logo-icon.png" alt="" class="brand-logo" width="34" height="34"><span class="brand-mark">L</span> Lokeria<span class="brand-dot">.id</span></a>
      <button class="menu-toggle" aria-label="Menu" aria-expanded="false"><span></span><span></span><span></span></button>
      <div class="nav-links">${links}</div>
      <div class="search-wrap search-wrap-prominent">
        <label class="search-label" for="job-search">
          <svg class="search-svg" width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"/><path d="M20 20l-3.5-3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
          <input type="search" id="job-search" class="search-input" data-i18n-placeholder="search.placeholder" placeholder="${t("search.placeholder")}" autocomplete="off">
        </label>
        <div class="search-results" id="search-results"></div>
      </div>
      <button type="button" class="theme-toggle" id="theme-toggle" title="Theme" aria-label="Toggle dark mode">◐</button>
      <button type="button" class="lang-toggle" id="lang-toggle">${t("lang.btn")}</button>
      <a class="nav-login-btn" href="#" data-auth-label="1">${getUser() ? t("nav.logout") : t("nav.login")}</a>
      <a class="nav-cta-btn" href="lowongan.html" data-i18n="nav.cta">${t("nav.cta")}</a>`;
  }

  const activeMap = {
    "index.html": "home", "lowongan.html": "jobs", "detail.html": "jobs", "lamar.html": "jobs",
    "dashboard.html": "dash", "profile.html": "profile", "kategori.html": "kategori",
    "iklan.html": "advertise", "daftar-iklan.html": "advertise", "about.html": "about",
    "faq.html": "faq", "contact.html": "contact", "portfolio.html": "portfolio",
    "perusahaan.html": "advertise", "404.html": "",
  };

  document.addEventListener("DOMContentLoaded", () => {

    // Broken image fallback (GitHub missing files, etc.)
    document.addEventListener("error", function (e) {
      const t = e.target;
      if (t && t.tagName === "IMG") {
        t.classList.add("img-fallback");
        t.removeAttribute("src");
        t.alt = t.alt || "img";
        if (!t.dataset.fallback) {
          t.dataset.fallback = "1";
          t.style.background = "#0d9f6e";
          t.style.objectFit = "none";
        }
      }
    }, true);

    // Inject nav if placeholder
    // Always rebuild navbar so every page shows full menu (not on login)
    if (!isLoginPage) {
      const navEl = document.getElementById("main-nav") || document.querySelector("nav.navbar");
      if (navEl) {
        navEl.id = "main-nav";
        navEl.className = "navbar container";
        navEl.innerHTML = buildNav(activeMap[path] || "");
      }
    }

    // Footer inject
    const foot = document.getElementById("main-footer");
    if (foot) {
      foot.innerHTML = `<div class="container footer-main">
        <a class="brand brand-footer" href="index.html"><span class="brand-mark">L</span> Lokeria<span class="brand-dot">.id</span></a>
        <p data-i18n="footer.tagline">${t("footer.tagline")}</p>
        <div class="footer-links">
          <a href="index.html">Home</a><a href="lowongan.html">Lowongan</a><a href="dashboard.html">Dashboard</a>
          <a href="profile.html">Profil</a><a href="faq.html">FAQ</a>
        </div>
        <div class="footer-social"><a href="#">IG</a><a href="#">in</a><a href="#">X</a></div>
      </div>
      <div class="container footer-bottom"><span>© <span data-year></span> Lokeria.id</span><span>Demo tugas</span></div>`;
    }

    applyLang();

    // Theme toggle
    const themeBtn = document.getElementById("theme-toggle");
    if (themeBtn) {
      themeBtn.addEventListener("click", () => {
        const cur = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
        const next = cur === "dark" ? "light" : "dark";
        if (next === "dark") document.documentElement.setAttribute("data-theme", "dark");
        else document.documentElement.removeAttribute("data-theme");
        localStorage.setItem(THEME_KEY, next);
      });
    }

    // Lang toggle
    document.getElementById("lang-toggle")?.addEventListener("click", () => {
      localStorage.setItem(LANG_KEY, lang() === "id" ? "en" : "id");
      applyLang();
      // rebuild dynamic labels on dash if needed
      showToast(lang() === "en" ? "Language: English" : "Bahasa: Indonesia", "info");
    });

    // Mobile menu
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    if (menuToggle && navLinks) {
      menuToggle.addEventListener("click", () => {
        const open = navLinks.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", String(open));
      });
    }

    document.querySelectorAll("[data-year]").forEach((el) => { el.textContent = new Date().getFullYear(); });

    // Logout
    document.querySelectorAll("[data-auth-label]").forEach((el) => {
      el.addEventListener("click", (e) => {
        if (!getUser()) return;
        e.preventDefault();
        setUser(null);
        showToast(t("toast.logout"), "info");
        setTimeout(() => (location.href = "login.html"), 400);
      });
    });

    // User chip
    const u = getUser();
    if (u) {
      const navBar = document.querySelector(".navbar");
      if (navBar && !document.getElementById("user-chip")) {
        const chip = document.createElement("span");
        chip.id = "user-chip";
        chip.className = "user-chip";
        chip.textContent = (u.name || u.email || "User").split(" ")[0];
        const cta = navBar.querySelector(".nav-cta-btn");
        if (cta) navBar.insertBefore(chip, cta);
        else navBar.appendChild(chip);
      }
    }

    // Login / Register
    const formLogin = document.getElementById("form-login");
    const formReg = document.getElementById("form-register");
    document.querySelectorAll(".auth-tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        document.querySelectorAll(".auth-tab").forEach((x) => x.classList.remove("is-active"));
        document.querySelectorAll(".auth-form").forEach((x) => x.classList.remove("is-active"));
        tab.classList.add("is-active");
        document.getElementById(tab.getAttribute("data-tab") === "login" ? "form-login" : "form-register")?.classList.add("is-active");
      });
    });
    formLogin?.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = (document.getElementById("login-email").value || "").trim().toLowerCase();
      const pass = document.getElementById("login-pass").value || "";
      const found = getUsers().find((x) => x.email === email && x.password === pass);
      if (!found) return showToast(t("toast.wrong"), "info");
      setUser({ email: found.email, name: found.name, role: found.role });
      addNotif("Selamat datang kembali di Lokeria.id!");
      showToast(t("toast.loginOk"), "success");
      setTimeout(() => (location.href = "index.html"), 500);
    });
    formReg?.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = (document.getElementById("reg-name").value || "").trim();
      const email = (document.getElementById("reg-email").value || "").trim().toLowerCase();
      const pass = document.getElementById("reg-pass").value || "";
      const role = document.getElementById("reg-role").value || "seeker";
      if (pass.length < 6) return showToast("Password min. 6 karakter", "info");
      const users = getUsers();
      if (users.some((x) => x.email === email)) return showToast(t("toast.exists"), "info");
      users.push({ name, email, password: pass, role });
      saveUsers(users);
      showToast(t("toast.registerOk"), "success");
      document.querySelector('[data-tab="login"]')?.click();
      const le = document.getElementById("login-email");
      if (le) le.value = email;
    });

    // Favorites
    window.toggleFavorite = function (jobId) {
      if (!getUser()) return showToast(t("toast.needLogin"), "info");
      let favs = getFavorites();
      if (favs.includes(jobId)) {
        favs = favs.filter((id) => id !== jobId);
        setFavorites(favs);
        showToast(t("toast.removed"), "info");
      } else {
        favs.push(jobId);
        setFavorites(favs);
        showToast(t("toast.saved"), "success");
        addNotif("Lowongan disimpan: " + jobId);
      }
      document.querySelectorAll('[data-fav="' + jobId + '"]').forEach((btn) => {
        btn.classList.toggle("is-active", favs.includes(jobId));
      });
    };
    getFavorites().forEach((id) => {
      document.querySelectorAll('[data-fav="' + id + '"]').forEach((b) => b.classList.add("is-active"));
    });
    document.querySelectorAll("[data-fav]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        window.toggleFavorite(btn.getAttribute("data-fav"));
      });
    });

    // Search
    const JOBS = window.LOKERIA_JOBS || [];
    const searchInput = document.getElementById("job-search");
    const searchResults = document.getElementById("search-results");
    const searchWrap = document.querySelector(".search-wrap");
    if (searchInput && searchResults) {
      function renderResults(query) {
        const q = query.trim().toLowerCase();
        if (!q) { searchResults.innerHTML = ""; searchResults.classList.remove("is-open"); return; }
        const matched = JOBS.filter((j) => (j.title + " " + j.company + " " + (j.keywords || "")).toLowerCase().includes(q)).slice(0, 8);
        searchResults.innerHTML = matched.length
          ? matched.map((j) => `<a class="search-item" href="detail.html?job=${j.id}"><img src="images/${j.logo}" class="search-item-logo" width="36" height="36" alt=""><span class="search-item-text"><strong>${j.title}</strong><small>${j.company}</small></span><span class="search-item-go">→</span></a>`).join("")
          : `<div class="search-empty">${t("jobs.empty")}</div>`;
        searchResults.classList.add("is-open");
      }
      searchInput.addEventListener("input", () => renderResults(searchInput.value));
      searchInput.addEventListener("focus", () => { if (searchInput.value.trim()) renderResults(searchInput.value); });
      document.addEventListener("click", (e) => { if (searchWrap && !searchWrap.contains(e.target)) searchResults.classList.remove("is-open"); });
    }

    // Filters + empty state
    const filterLoc = document.getElementById("filter-location");
    const filterType = document.getElementById("filter-type");
    const filterInd = document.getElementById("filter-industry");
    const filterExp = document.getElementById("filter-exp");
    const filterText = document.getElementById("page-job-filter");
    const jobsList = document.getElementById("jobs-list");
    const jobsCount = document.querySelector(".jobs-count strong");
    let emptyEl = document.getElementById("jobs-empty");
    function applyJobFilters() {
      if (!jobsList) return;
      const loc = filterLoc?.value || "";
      const typ = filterType?.value || "";
      const ind = filterInd?.value || "";
      const exp = filterExp?.value || "";
      const q = (filterText?.value || "").trim().toLowerCase();
      let visible = 0;
      jobsList.querySelectorAll(".job-item").forEach((card) => {
        const hay = (card.getAttribute("data-search") || card.textContent).toLowerCase();
        const show =
          (!loc || (card.getAttribute("data-location") || "").includes(loc)) &&
          (!typ || card.getAttribute("data-type") === typ) &&
          (!ind || card.getAttribute("data-industry") === ind) &&
          (!exp || (card.getAttribute("data-exp") || "") === exp) &&
          (!q || hay.includes(q));
        card.style.display = show ? "" : "none";
        if (show) visible++;
      });
      if (jobsCount) jobsCount.textContent = String(visible);
      if (!emptyEl) {
        emptyEl = document.createElement("div");
        emptyEl.id = "jobs-empty";
        emptyEl.className = "empty-state compact";
        emptyEl.innerHTML = `<div class="empty-icon">📭</div><h2>${t("jobs.empty")}</h2><p>${t("jobs.try")}</p>`;
        jobsList.parentNode.insertBefore(emptyEl, jobsList.nextSibling);
      }
      emptyEl.style.display = visible === 0 ? "block" : "none";
    }
    [filterLoc, filterType, filterInd, filterExp, filterText].forEach((el) => {
      el?.addEventListener("input", applyJobFilters);
      el?.addEventListener("change", applyJobFilters);
    });
    const qParam = new URLSearchParams(location.search).get("q");
    if (qParam && filterText) { filterText.value = qParam; applyJobFilters(); }

    // Home stats
    const statsEl = document.getElementById("home-stats");
    if (statsEl && JOBS.length) {
      const companies = new Set(JOBS.map((j) => j.company)).size;
      const types = new Set(JOBS.map((j) => j.type)).size;
      statsEl.innerHTML = `
        <div class="stat-card reveal"><strong>${JOBS.length}+</strong><span data-i18n="stat.jobs">${t("stat.jobs")}</span></div>
        <div class="stat-card reveal"><strong>${companies}+</strong><span data-i18n="stat.companies">${t("stat.companies")}</span></div>
        <div class="stat-card reveal"><strong>${types}</strong><span data-i18n="stat.types">${t("stat.types")}</span></div>`;
    }

    // Dashboard
    if (path === "dashboard.html") {
      const jobs = JOBS;
      const favs = getFavorites();
      const apps = getApps().filter((a) => a.email === (getUser() || {}).email);
      const notifs = getNotifs();
      const unread = notifs.filter((n) => !n.read).length;
      document.getElementById("dash-greeting").textContent =
        (lang() === "en" ? "Hi, " : "Halo, ") + ((getUser() || {}).name || "User") + "!";
      const quick = document.getElementById("dash-quick");
      if (quick) {
        quick.innerHTML = `
          <a class="button button-primary" href="lowongan.html">Cari lowongan</a>
          <a class="button button-secondary" href="profile.html">Lengkapi profil</a>
          <a class="button button-secondary" href="dashboard.html#dash-apps">Lihat lamaran</a>`;
      }
      document.getElementById("dash-stats").innerHTML = `
        <div class="stat-card"><strong>${jobs.length}</strong><span>${t("dash.statJobs")}</span></div>
        <div class="stat-card"><strong>${favs.length}</strong><span>${t("dash.statSaved")}</span></div>
        <div class="stat-card"><strong>${apps.length}</strong><span>${t("dash.statApps")}</span></div>
        <div class="stat-card"><strong>${unread}</strong><span>${t("dash.statNotif")}</span></div>`;
      const savedBox = document.getElementById("dash-saved");
      savedBox.innerHTML = favs.length
        ? favs.map((id) => {
            const j = jobs.find((x) => x.id === id);
            return j ? `<a class="dash-item" href="detail.html?job=${j.id}"><img src="images/${j.logo}" alt=""><div><strong>${j.title}</strong><small>${j.company}</small></div></a>` : "";
          }).join("")
        : `<p class="muted">${t("dash.none")}</p>`;
      const appsBox = document.getElementById("dash-apps");
      appsBox.innerHTML = apps.length
        ? apps.map((a) => `<div class="dash-item"><div><strong>${a.title}</strong><small>${a.company} · ${a.status} · ${a.date}</small></div></div>`).join("")
        : `<p class="muted">${t("dash.none")}</p>`;
      const notifBox = document.getElementById("dash-notif");
      notifBox.innerHTML = notifs.length
        ? notifs.map((n) => `<div class="dash-item ${n.read ? "" : "is-new"}"><div><strong>${n.text}</strong><small>${n.time}</small></div></div>`).join("")
        : `<p class="muted">${t("dash.none")}</p>`;
      setNotifs(notifs.map((n) => ({ ...n, read: true })));
    }

    // Profile
    if (path === "profile.html" && getUser()) {
      const email = getUser().email;
      const pf = getProfiles()[email] || {};
      document.getElementById("pf-name").value = pf.name || getUser().name || "";
      document.getElementById("pf-email").value = email;
      document.getElementById("pf-phone").value = pf.phone || "";
      document.getElementById("pf-city").value = pf.city || "";
      document.getElementById("pf-skills").value = pf.skills || "";
      document.getElementById("pf-bio").value = pf.bio || "";
      document.getElementById("profile-form")?.addEventListener("submit", (e) => {
        e.preventDefault();
        const data = {
          name: document.getElementById("pf-name").value.trim(),
          phone: document.getElementById("pf-phone").value.trim(),
          city: document.getElementById("pf-city").value.trim(),
          skills: document.getElementById("pf-skills").value.trim(),
          bio: document.getElementById("pf-bio").value.trim(),
        };
        saveProfile(email, data);
        const u = getUser();
        setUser({ ...u, name: data.name });
        showToast(t("toast.profile"), "success");
        addNotif("Profil diperbarui");
      });
    }

    // Company page
    if (path === "perusahaan.html") {
      const name = new URLSearchParams(location.search).get("name") || "";
      const list = JOBS.filter((j) => j.company.toLowerCase().includes(name.toLowerCase()) || !name);
      const company = name || (list[0] && list[0].company) || "Perusahaan";
      const companyJobs = JOBS.filter((j) => j.company === company || j.company.toLowerCase().includes(company.toLowerCase()));
      const logo = (companyJobs[0] && companyJobs[0].logo) || "logo-icon.png";
      const root = document.getElementById("company-root");
      root.innerHTML = `
        <div class="company-hero reveal">
          <img src="images/${logo}" alt="${company}" class="company-logo">
          <div>
            <h1>${company}</h1>
            <p class="muted">${companyJobs.length} lowongan aktif di Lokeria.id</p>
          </div>
        </div>
        <h2 style="margin:28px 0 14px">Lowongan di ${company}</h2>
        <div class="jobs-list">
          ${companyJobs.map((j) => `
            <article class="job-item reveal">
              <div class="job-logo-wrap"><img src="images/${j.logo}" class="job-logo-img" alt=""></div>
              <div class="job-content">
                <div class="job-meta"><span class="job-company">${j.company}</span><span class="job-badge">${j.type}</span></div>
                <h3><a class="job-title-link" href="detail.html?job=${j.id}">${j.title}</a></h3>
                <div class="job-footer"><span>📍 ${j.location}</span><a href="detail.html?job=${j.id}" class="text-link">${t("jobs.detail")} →</a></div>
              </div>
            </article>`).join("") || `<p>${t("jobs.empty")}</p>`}
        </div>`;
    }

    // Detail page enhancements: chat + company link + ensure apply saves history
    if (path === "detail.html") {
      // existing detail script may run; we enhance after
      setTimeout(() => {
        const root = document.getElementById("detail-root");
        if (!root || root.querySelector(".hr-chat")) return;
        const jobId = new URLSearchParams(location.search).get("job");
        const job = JOBS.find((j) => j.id === jobId) || JOBS[0];
        if (!job) return;
        const chat = document.createElement("div");
        chat.className = "hr-chat reveal";
        chat.innerHTML = `
          <h3 data-i18n="chat.title">${t("chat.title")}</h3>
          <div class="chat-log" id="chat-log">
            <div class="chat-bubble hr">Halo! Ada yang ingin ditanyakan soal posisi ${job.title}?</div>
          </div>
          <form class="chat-form" id="chat-form">
            <input type="text" id="chat-input" data-i18n-placeholder="chat.placeholder" placeholder="${t("chat.placeholder")}" autocomplete="off">
            <button type="submit" class="button button-primary" data-i18n="chat.send">${t("chat.send")}</button>
          </form>`;
        root.appendChild(chat);
        document.getElementById("chat-form")?.addEventListener("submit", (e) => {
          e.preventDefault();
          const input = document.getElementById("chat-input");
          const msg = (input.value || "").trim();
          if (!msg) return;
          const log = document.getElementById("chat-log");
          log.innerHTML += `<div class="chat-bubble me">${msg}</div>`;
          input.value = "";
          setTimeout(() => {
            log.innerHTML += `<div class="chat-bubble hr">Terima kasih! Tim HR akan meninjau (demo). Silakan lanjutkan lewat tombol Lamar.</div>`;
            log.scrollTop = log.scrollHeight;
          }, 600);
        });
        // company link
        const companyLink = document.createElement("p");
        companyLink.innerHTML = `<a class="text-link" href="perusahaan.html?name=${encodeURIComponent(job.company)}">Lihat profil ${job.company} →</a>`;
        root.querySelector(".detail-header")?.appendChild(companyLink);
      }, 100);
    }

    // Apply form — save application + PDF
    const applyForm = document.getElementById("apply-form");
    if (applyForm) {
      // Add PDF button
      const pdfBtn = document.createElement("button");
      pdfBtn.type = "button";
      pdfBtn.className = "button button-secondary";
      pdfBtn.style.cssText = "width:100%;margin-top:10px";
      pdfBtn.setAttribute("data-i18n", "pdf.export");
      pdfBtn.textContent = t("pdf.export");
      applyForm.appendChild(pdfBtn);
      pdfBtn.addEventListener("click", () => {
        const name = document.getElementById("fullname")?.value || getUser()?.name || "-";
        const email = document.getElementById("email")?.value || getUser()?.email || "-";
        const jobTitle = document.getElementById("job-position")?.textContent || "Lamaran";
        const company = document.getElementById("job-company")?.textContent || "";
        const w = window.open("", "_blank");
        w.document.write(`<html><head><title>Lamaran — ${jobTitle}</title>
          <style>body{font-family:sans-serif;padding:40px;max-width:640px;margin:auto}h1{font-size:20px}</style></head>
          <body><h1>Ringkasan Lamaran — Lokeria.id</h1>
          <p><b>Posisi:</b> ${jobTitle}</p><p><b>Perusahaan:</b> ${company}</p>
          <p><b>Nama:</b> ${name}</p><p><b>Email:</b> ${email}</p>
          <p><b>Tanggal:</b> ${new Date().toLocaleString("id-ID")}</p>
          <p style="margin-top:40px;color:#666">Dokumen demo tugas — simpan sebagai PDF lewat Print browser.</p>
          <script>window.onload=function(){window.print()}<\/script></body></html>`);
        w.document.close();
      });

      applyForm.addEventListener("submit", function (e) {
        // may also be handled inline; we ensure history
        const jobTitle = document.getElementById("job-position")?.textContent || "Lowongan";
        const company = document.getElementById("job-company")?.textContent || "";
        const jobId = document.getElementById("job-id")?.value || "";
        const apps = getApps();
        apps.unshift({
          id: Date.now(),
          email: (getUser() || {}).email,
          jobId,
          title: jobTitle,
          company,
          status: "Terkirim",
          date: new Date().toLocaleDateString("id-ID"),
        });
        setApps(apps.slice(0, 50));
        addNotif("Lamaran terkirim: " + jobTitle + " @ " + company);
        // status update dummy later
        setTimeout(() => addNotif("Lamaranmu untuk " + jobTitle + " sedang ditinjau (demo)"), 2000);
      }, true);
    }

    // Scroll reveal
    const reveals = document.querySelectorAll(".reveal, .job-item, .testimonial-card, .cat-card, .stat-card");
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("is-visible");
            io.unobserve(en.target);
          }
        });
      }, { threshold: 0.12 });
      reveals.forEach((el) => {
        el.classList.add("reveal");
        io.observe(el);
      });
    } else {
      reveals.forEach((el) => el.classList.add("is-visible"));
    }

    // Page transitions 2s — Sabar ya!
    document.querySelectorAll("a[href]").forEach((link) => {
      const href = link.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:") || link.target === "_blank") return;
      if (!href.includes(".html")) return;
      link.addEventListener("click", (e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        if (link.getAttribute("data-auth-label") && getUser()) return;
        e.preventDefault();
        document.body.classList.add("is-leaving");
        let ov = document.getElementById("sabar-overlay");
        if (!ov) {
          ov = document.createElement("div");
          ov.id = "sabar-overlay";
          ov.className = "sabar-overlay";
          ov.innerHTML = `<div class="sabar-box"><div class="sabar-runner"><div class="runner"><div class="runner-head"></div><div class="runner-body"></div><div class="runner-arm runner-arm-l"></div><div class="runner-arm runner-arm-r"></div><div class="runner-leg runner-leg-l"></div><div class="runner-leg runner-leg-r"></div></div></div><p class="sabar-text">${t("sabar")}</p><span class="sabar-sub">${t("sabar.sub")}</span></div>`;
          document.body.appendChild(ov);
        } else {
          ov.querySelector(".sabar-text").textContent = t("sabar");
          ov.querySelector(".sabar-sub").textContent = t("sabar.sub");
        }
        requestAnimationFrame(() => ov.classList.add("is-on"));
        setTimeout(() => { window.location.href = href; }, 450);
      });
    });
  });
})();
