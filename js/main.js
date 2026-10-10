/* ==========================================================================
   IRC – Indian Recycling Company · site behaviour
   --------------------------------------------------------------------------
   Sections: countdown · hero animation · battery element explorer ·
   process animation · partner shortcuts · copy buttons · contact form
   ========================================================================== */

/* ---- Settings you may want to change ---- */
const CONTACT_EMAIL = "info.aviragroup@gmail.com"; // where contact-form messages are delivered (via FormSubmit)
const LAUNCH_DATE = "2027-01-01T00:00:00+05:30"; // countdown target shown in the top ribbon

(function () {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const css = (n) => getComputedStyle(document.documentElement).getPropertyValue(n).trim();

  /* countdown */
  const cd = document.getElementById("countdown"),
    target = new Date(LAUNCH_DATE).getTime();
  function tick() {
    const d = target - Date.now();
    if (d <= 0) {
      cd.textContent = "Launch year 2027";
      return;
    }
    const days = Math.floor(d / 864e5),
      h = Math.floor((d % 864e5) / 36e5),
      m = Math.floor((d % 36e5) / 6e4);
    cd.textContent = `${days} days ${h} h ${m} min to 2027`;
  }
  tick();
  setInterval(tick, 30000);

  /* hero: the brand ring with materials from many streams flowing in through its gap */
  const cv = document.getElementById("loopCanvas"),
    ctx = cv.getContext("2d");
  const COLS = ["#7A5CC8", "#2F6FD6", "#1E8BB3", "#C24F86", "#C06A1F", "#7D8A93", "#36B66A"];
  let W = 0,
    H = 0,
    P = [];
  function size() {
    const r = cv.getBoundingClientRect(),
      dpr = Math.min(devicePixelRatio || 1, 2);
    W = r.width;
    H = r.height;
    cv.width = W * dpr;
    cv.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  const GAP0 = (-84 * Math.PI) / 180,
    GAP1 = 0; // gap at upper right, as in the logo
  function spawn(p) {
    p.state = "in";
    const a = (-42 * Math.PI) / 180 + (Math.random() - 0.5) * 1.1,
      d = Math.min(W, H) * (0.52 + Math.random() * 0.25);
    p.x = W / 2 + Math.cos(a) * d;
    p.y = H / 2 + Math.sin(a) * d;
    p.k = 0.012 + Math.random() * 0.02;
    p.c = Math.floor(Math.random() * COLS.length);
    p.sz = 2 + Math.random() * 2.6;
    p.sp = 0.004 + Math.random() * 0.006;
    p.rj = (Math.random() - 0.5) * 0.1;
    p.life = 0;
  }
  function init() {
    P = Array.from({ length: 110 }, () => {
      const p = {};
      spawn(p);
      if (Math.random() < 0.85) {
        p.state = "loop";
        p.a = Math.random() * Math.PI * 2;
        p.life = Math.random() * Math.PI * 6;
      }
      return p;
    });
  }
  function draw() {
    ctx.clearRect(0, 0, W, H);
    const cx = W / 2,
      cy = H / 2,
      R = Math.min(W, H) * 0.33,
      sw = Math.min(W, H) * 0.075;
    const ring = css("--green"),
      dot = css("--saffron-fill");
    ctx.lineCap = "round";
    ctx.lineWidth = sw;
    ctx.strokeStyle = ring;
    ctx.globalAlpha = 0.12;
    ctx.beginPath();
    ctx.arc(cx, cy, R, GAP1, GAP0 + Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.5;
    ctx.beginPath();
    ctx.arc(cx, cy, R, GAP1, GAP0 + Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = 1;
    const gx = cx + Math.cos((-42 * Math.PI) / 180) * R,
      gy = cy + Math.sin((-42 * Math.PI) / 180) * R;
    for (const p of P) {
      if (p.state === "in") {
        p.x += (gx - p.x) * p.k;
        p.y += (gy - p.y) * p.k;
        if (Math.hypot(p.x - gx, p.y - gy) < 10) {
          p.state = "loop";
          p.a = (-42 * Math.PI) / 180;
        }
        ctx.fillStyle = COLS[p.c];
        ctx.globalAlpha = 0.55;
      } else {
        p.a += p.sp;
        p.life += p.sp;
        const rr = R * (1 + p.rj + Math.sin(p.a * 4 + p.c) * 0.025);
        p.x = cx + Math.cos(p.a) * rr;
        p.y = cy + Math.sin(p.a) * rr;
        ctx.fillStyle = COLS[p.c];
        ctx.globalAlpha = 0.9;
        if (p.life > Math.PI * 6 && Math.random() < 0.003) spawn(p);
      }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.sz, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }
    const pulse = 1 + (reduce ? 0 : Math.sin(performance.now() / 600) * 0.06);
    ctx.fillStyle = dot;
    ctx.beginPath();
    ctx.arc(gx, gy, sw * 0.72 * pulse, 0, Math.PI * 2);
    ctx.fill();
    if (!reduce) requestAnimationFrame(draw);
  }
  size();
  init();
  draw();
  addEventListener("resize", () => {
    size();
    if (reduce) draw();
  });
  matchMedia("(prefers-color-scheme: dark)").addEventListener?.("change", () => {
    if (reduce) draw();
  });

  /* periodic table */
  const EL = {
    li: [
      "Lithium · cathode & electrolyte",
      "The lightest metal and the heart of the cell. Recovered as battery-grade lithium carbonate (Li₂CO₃).",
    ],
    ni: [
      "Nickel · NMC & NCA cathodes",
      "Gives high energy density. Recovered as nickel sulphate (NiSO₄) for new cathode material.",
    ],
    co: [
      "Cobalt · cathode stabiliser",
      "The most valuable metal per kilogram in NMC, NCA and LCO cells. India imports all of it. Recovered as cobalt sulphate.",
    ],
    mn: [
      "Manganese · NMC & LMO cathodes",
      "Adds thermal stability. Recovered as manganese sulphate (MnSO₄).",
    ],
    c: [
      "Graphite · anode",
      "Makes up most of the anode. Separated from black mass and purified for reuse or industrial carbon markets.",
    ],
    cu: [
      "Copper · anode current collector",
      "Thin copper foil carries current from the anode. Recovered mechanically as clean copper.",
    ],
    al: [
      "Aluminium · cathode foil & casing",
      "Cathode foil and pack housings. Recovered mechanically for aluminium remelters.",
    ],
    fe: [
      "Iron phosphate · LFP cathode",
      "The cathode in e-rickshaw, bus and storage batteries. No cobalt or nickel, so lithium and graphite carry the value.",
    ],
  };
  const det = document.getElementById("elDetail"),
    btns = document.querySelectorAll("#ptable .el");
  function show(k) {
    det.innerHTML = `<b>${EL[k][0]}</b><p>${EL[k][1]}</p>`;
    btns.forEach((b) => b.setAttribute("aria-pressed", b.dataset.k === k));
  }
  btns.forEach((b) => {
    b.addEventListener("click", () => show(b.dataset.k));
    b.addEventListener("mouseenter", () => show(b.dataset.k));
  });
  show("li");

  /* process animation */
  const SC = [
    [
      "Collect & trace",
      "End-of-life packs arrive from manufacturers, fleets and aggregators, each logged for EPR compliance.",
    ],
    [
      "Test & discharge",
      "Every pack is health-tested. Good modules go to second life; the rest are drained to zero volts.",
    ],
    ["Dismantle & shred", "Cells are shredded under nitrogen so there is no fire risk and no fumes escape."],
    ["Separate", "Screens and separators pull out copper, aluminium and steel, leaving black mass."],
    [
      "Leach & extract",
      "Black mass is dissolved and each metal is drawn into its own stream by solvent extraction.",
    ],
    ["Refine & return", "Battery-grade salts are crystallised and go back to cell makers in India."],
  ];
  const scenes = [...document.querySelectorAll(".scene")],
    cap = document.getElementById("filmCap"),
    stamp = document.getElementById("filmStamp"),
    chipsEl = document.getElementById("chips");
  SC.forEach((s, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "chip";
    b.innerHTML = `<i></i><span>${i + 1} · ${s[0]}</span>`;
    b.setAttribute("aria-label", `Stage ${i + 1}: ${s[0]}`);
    b.onclick = () => {
      cur = i;
      t0 = performance.now();
      pausedAt = 0;
      render(0);
    };
    chipsEl.appendChild(b);
  });
  const chips = [...chipsEl.children],
    DUR = 5000;
  let cur = 0,
    t0 = performance.now(),
    playing = !reduce,
    pausedAt = 0;
  function render(p) {
    scenes.forEach((s, i) => s.classList.toggle("on", i === cur));
    chips.forEach((c, i) => {
      c.classList.toggle("on", i === cur);
      c.firstChild.style.width = i < cur ? "100%" : i === cur ? p * 100 + "%" : "0";
    });
    cap.innerHTML = `<b>${SC[cur][0]}</b><span>${SC[cur][1]}</span>`;
    stamp.textContent = `IRC · STAGE ${cur + 1} / 6`;
  }
  function loop(now) {
    if (playing) {
      let p = (now - t0) / DUR;
      if (p >= 1) {
        cur = (cur + 1) % SC.length;
        t0 = now;
        p = 0;
      }
      render(p);
    }
    requestAnimationFrame(loop);
  }
  const playBtn = document.getElementById("playBtn"),
    ico = document.getElementById("playIco");
  const PAUSE =
      '<rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/>',
    PLAY = '<path d="M7 4l13 8-13 8z"/>';
  function setPlay(v) {
    playing = v;
    if (v) t0 = performance.now() - pausedAt * DUR;
    ico.innerHTML = v ? PAUSE : PLAY;
    playBtn.setAttribute("aria-label", v ? "Pause animation" : "Play animation");
    document.querySelectorAll(".screen *").forEach((e) => (e.style.animationPlayState = v ? "" : "paused"));
  }
  playBtn.onclick = () => {
    if (playing) pausedAt = Math.min((performance.now() - t0) / DUR, 1);
    setPlay(!playing);
  };
  render(0);
  setPlay(playing);
  requestAnimationFrame(loop);

  /* partner cards preselect the enquiry type */
  document.querySelectorAll(".pt[data-topic]").forEach((a) =>
    a.addEventListener("click", () => {
      const s = document.getElementById("f-topic");
      s.value = a.dataset.topic;
    }),
  );

  /* copy buttons */
  function copyText(t, btn) {
    const done = () => {
      const o = btn.textContent;
      btn.textContent = "Copied";
      setTimeout(() => (btn.textContent = o), 1600);
    };
    try {
      navigator.clipboard
        .writeText(t)
        .then(done)
        .catch(() => selectFallback());
    } catch (e) {
      selectFallback();
    }
    function selectFallback() {
      const el = document.getElementById("mailAddr");
      const r = document.createRange();
      r.selectNodeContents(el);
      const s = getSelection();
      s.removeAllRanges();
      s.addRange(r);
    }
  }
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-copy]");
    if (b) copyText(b.dataset.copy, b);
  });

  /* contact form → FormSubmit → info.aviragroup@gmail.com */
  const ENDPOINT = "https://formsubmit.co/ajax/" + CONTACT_EMAIL;
  const form = document.getElementById("contactForm"),
    msg = document.getElementById("formMsg"),
    send = document.getElementById("sendBtn");
  const rules = [
    ["f-name", "e-name", (v) => v.trim().length > 1, "Enter your name."],
    [
      "f-email",
      "e-email",
      (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()),
      "Enter a valid email address, like name@company.com.",
    ],
    ["f-topic", "e-topic", (v) => !!v, "Choose what you are getting in touch about."],
    ["f-msg", "e-msg", (v) => v.trim().length > 9, "Write a short message (at least 10 characters)."],
  ];
  function validate() {
    let first = null;
    rules.forEach(([id, eid, ok, txt]) => {
      const el = document.getElementById(id),
        good = ok(el.value);
      el.closest(".field").classList.toggle("bad", !good);
      document.getElementById(eid).textContent = good ? "" : txt;
      if (!good && !first) first = el;
    });
    if (first) first.focus();
    return !first;
  }
  rules.forEach(([id]) =>
    document.getElementById(id).addEventListener("input", (e) => {
      const f = e.target.closest(".field");
      if (f.classList.contains("bad")) validate();
    }),
  );
  function note(kind, title, body) {
    msg.className = "form-msg " + kind;
    msg.innerHTML = `<b>${title}</b>${body}`;
    msg.hidden = false;
  }
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    msg.hidden = true;
    if (document.getElementById("f-hp").value) return;
    if (!validate()) return;
    const data = Object.fromEntries(new FormData(form).entries());
    delete data._honey;
    const payload = {
      ...data,
      _subject: `IRC website enquiry: ${data.topic} from ${data.name}`,
      _replyto: data.email,
      _template: "table",
      _captcha: "false",
    };
    send.disabled = true;
    send.textContent = "Sending…";
    try {
      const ctrl = new AbortController();
      const to = setTimeout(() => ctrl.abort(), 12000);
      const r = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
        signal: ctrl.signal,
      });
      clearTimeout(to);
      const j = await r.json().catch(() => ({}));
      if (r.ok && String(j.success) !== "false") {
        form.reset();
        note(
          "ok",
          "Message sent",
          "Thank you for contacting IRC. Our team will reply to the email address you gave.",
        );
        return;
      }
      // The form service answered but did not deliver (e.g. the form still needs activation).
      console.warn("FormSubmit response", r.status, j);
      const reason = String(j.message || `The mail service answered with status ${r.status}.`).replace(
        /[<>&]/g,
        (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" })[c],
      );
      note(
        "warn",
        "Your message was not delivered yet",
        `${reason}<br>Meanwhile you can email us at <b style="display:inline;font:inherit;font-weight:600">${CONTACT_EMAIL}</b> <button class="copy-btn" type="button" data-copy="${CONTACT_EMAIL}">Copy address</button>.`,
      );
    } catch (err) {
      // The request never reached the mail service (offline, blocked, or opened from a file).
      console.warn("Contact form could not reach FormSubmit:", err);
      note(
        "warn",
        "We couldn't send your message from here",
        `Please email us directly at <b style="display:inline;font:inherit;font-weight:600">${CONTACT_EMAIL}</b> <button class="copy-btn" type="button" data-copy="${CONTACT_EMAIL}">Copy address</button>. Your message is still in the form so you can copy it.`,
      );
    } finally {
      send.disabled = false;
      send.textContent = "Send message";
    }
  });
  document.getElementById("yr").textContent = Math.max(2026, new Date().getFullYear());
})();
