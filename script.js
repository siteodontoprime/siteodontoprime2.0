// TROQUE AQUI: 55 + DDD + número (somente números)
// Ex: (37) 99868-7629 -> 37 3522-5932
const PHONE = "553735225932";
const CLINIC = "Odontoprime";

function waLink(message) {
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
}

function setWhatsLinks() {
  const msg = `Olá! Quero agendar um atendimento na ${CLINIC}.`;
  const link = waLink(msg);

  // ✅ Agora inclui o botão do mapa também
  ["whatsHeader", "whatsHero", "whatsFooter", "whatsSpecs", "whatsMap"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.href = link;
  });
}

function setupLeadForm() {
  const form = document.getElementById("leadForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("leadName")?.value?.trim() || "";
    const phone = document.getElementById("leadPhone")?.value?.trim() || "";
    const email = document.getElementById("leadEmail")?.value?.trim() || "";
    const agree = document.getElementById("agreeWa")?.checked ?? true;

    const parts = [];
    parts.push(`Olá! Quero informações e agendar atendimento na ${CLINIC}.`);
    if (name) parts.push(`Nome: ${name}`);
    if (phone) parts.push(`Telefone/WhatsApp: ${phone}`);
    if (email) parts.push(`E-mail: ${email}`);
    if (agree) parts.push(`Autorizo contato pelo WhatsApp.`);
    const msg = parts.join("\n");

    window.open(waLink(msg), "_blank", "noreferrer");
  });
}

function setupMenu() {
  const btn = document.getElementById("menuBtn");
  const menu = document.getElementById("menu");
  const backdrop = document.getElementById("menuBackdrop");

  if (!btn || !menu) return;

  const isOpen = () => menu.classList.contains("show");

  const open = () => {
    menu.classList.add("show");
    if (backdrop) backdrop.classList.add("show");
    btn.setAttribute("aria-expanded", "true");
    document.documentElement.classList.add("no-scroll");
  };

  const close = () => {
    menu.classList.remove("show");
    if (backdrop) backdrop.classList.remove("show");
    btn.setAttribute("aria-expanded", "false");
    document.documentElement.classList.remove("no-scroll");
  };

  btn.addEventListener("click", (e) => {
    e.stopPropagation(); // ✅ evita clique no botão contar como “clique fora”
    if (isOpen()) close();
    else open();
  });

  // ✅ Fecha ao clicar em qualquer link do menu
  menu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      if (isOpen()) close();
    });
  });

  // ✅ Fecha ao clicar no backdrop
  if (backdrop) {
    backdrop.addEventListener("click", () => {
      if (isOpen()) close();
    });
  }

  // ✅ Fecha no ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen()) close();
  });

  // ✅ Fecha ao clicar fora do menu (sem fechar quando clicar no menu ou no botão)
  document.addEventListener("click", (e) => {
    const target = e.target;
    const clickedInside = menu.contains(target) || btn.contains(target);
    if (!clickedInside && isOpen()) close();
  });

  // ✅ Evita scroll “bugado” no mobile quando o menu está aberto
  document.addEventListener(
    "touchmove",
    (e) => {
      if (isOpen()) e.preventDefault();
    },
    { passive: false }
  );
}

function setupYear() {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
}

function setupReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!els.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("is-visible");
      });
    },
    { threshold: 0.14 }
  );

  els.forEach((el) => io.observe(el));
}

function setupToTop() {
  const btn = document.getElementById("toTop");
  if (!btn) return;

  const toggle = () => {
    if (window.scrollY > 500) btn.classList.add("show");
    else btn.classList.remove("show");
  };

  window.addEventListener("scroll", toggle, { passive: true });
  toggle();

  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

// INIT
setWhatsLinks();
setupLeadForm();
setupMenu();
setupYear();
setupReveal();
setupToTop();

