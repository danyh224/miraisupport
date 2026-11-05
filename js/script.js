/* =====================================
   MIRAI SUPPORT PREMIUM
===================================== */

/* ==========================
   Loader
========================== */

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  if (!loader) return;

  setTimeout(() => {
    loader.style.opacity = "0";

    setTimeout(() => {
      loader.style.display = "none";
    }, 1000);
  }, 1200);
});

/* ==========================
   AOS
========================== */

if (window.AOS) {
  window.AOS.init({
    duration: 1000,
    once: true,
    easing: "ease-in-out",
  });
} else {
  document.querySelectorAll("[data-aos]").forEach((element) => {
    element.removeAttribute("data-aos");
  });
}

/* ==========================
   Typed Hero
========================== */

const typedHeading = document.getElementById("typed");
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

if (typedHeading && window.Typed && !prefersReducedMotion) {
  new window.Typed(typedHeading, {
    strings: ["MIRAI SUPPORT", "未来を支える", "外国人総合サポート"],
    typeSpeed: 70,
    backSpeed: 40,
    backDelay: 1500,
    loop: true,
  });
} else if (typedHeading) {
  typedHeading.textContent = "MIRAI SUPPORT";
}

/* ==========================
   Theme Toggle
========================== */

const themeToggle = document.getElementById("themeToggle");

themeToggle?.addEventListener("click", () => {
  document.body.classList.toggle("light");
  const isLight = document.body.classList.contains("light");
  themeToggle.textContent = isLight ? "☀️" : "🌙";
  themeToggle.setAttribute(
    "aria-label",
    isLight ? "Switch to dark theme" : "Switch to light theme",
  );
  updateCharts();
});

/* ==========================
   KPI Counter
========================== */

const counters = document.querySelectorAll(".counter");

function animateCounter(counter) {
  const target = Number(counter.dataset.target);

  let current = 0;

  const step = target / 100;

  const timer = setInterval(() => {
    current += step;

    if (current >= target) {
      current = target;

      clearInterval(timer);
    }

    counter.innerText = Math.floor(current);
  }, 20);
}

const kpiSection = document.querySelector(".kpi-section");

if (kpiSection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        counters.forEach((counter) => {
          if (!counter.classList.contains("started")) {
            counter.classList.add("started");

            animateCounter(counter);
          }
        });
      }
    });
  });

  observer.observe(kpiSection);
}

/* ==========================
   Navbar Scroll
========================== */

const navbar = document.getElementById("navbar");
const progressBar = document.getElementById("progressBar");
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");
const toTop = document.getElementById("toTop");

function updateScrollUI() {
  const scrollPosition = window.scrollY;
  const totalHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  navbar?.classList.toggle("scrolled", scrollPosition > 80);
  if (progressBar) {
    const progress = totalHeight > 0 ? (scrollPosition / totalHeight) * 100 : 0;
    progressBar.style.width = `${Math.min(progress, 100)}%`;
  }

  let current = "";
  sections.forEach((section) => {
    if (scrollPosition >= section.offsetTop - 150) current = section.id;
  });

  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${current}`;
    link.classList.toggle("active", isActive);
    if (isActive) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });

  toTop?.classList.toggle("show", scrollPosition > 400);
}

let scrollUpdatePending = false;
window.addEventListener(
  "scroll",
  () => {
    if (scrollUpdatePending) return;
    scrollUpdatePending = true;
    window.requestAnimationFrame(() => {
      updateScrollUI();
      scrollUpdatePending = false;
    });
  },
  { passive: true },
);
updateScrollUI();

/* ==========================
   Team Card Hover
========================== */

if (window.innerWidth > 1024) {
  const teamCards = document.querySelectorAll(".team-card");

  teamCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();

      const x = e.clientX - rect.left;

      const y = e.clientY - rect.top;

      card.style.transform = `
                    rotateY(${(x - rect.width / 2) / 20}deg)
                    rotateX(${-(y - rect.height / 2) / 20}deg)
                    translateY(-8px)
                    `;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "rotateY(0deg) rotateX(0deg)";
    });
  });
}

/* ==========================
   Contact Button
========================== */

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (formStatus) {
    formStatus.textContent =
      "入力ありがとうございます。現在はデモのため、内容は送信・保存されません。";
  }
  contactForm.reset();
});

/* ==========================
   Back To Top
========================== */

toTop?.addEventListener("click", () => {
  window.scrollTo({
    top: 0,

    behavior: "smooth",
  });
});

/* ==========================
   Charts
========================== */

let doughnutChart;
let barChart;

function chartTextColor() {
  if (document.body.classList.contains("light")) {
    return "#111827";
  }

  return "#ffffff";
}

function updateCharts() {
  if (!window.Chart) return;

  const textColor = chartTextColor();

  if (doughnutChart) doughnutChart.destroy();

  if (barChart) barChart.destroy();

  doughnutChart = new window.Chart(
    document.getElementById("doughnutChart"),

    {
      type: "doughnut",

      data: {
        labels: ["売上原価", "経費", "借入返済", "純利益"],

        datasets: [
          {
            data: [36, 67, 8, 9],

            backgroundColor: ["#ef4444", "#f59e0b", "#8b5cf6", "#22c55e"],

            borderWidth: 0,
          },
        ],
      },

      options: {
        responsive: true,

        plugins: {
          legend: {
            labels: {
              color: textColor,
            },
          },
        },
      },
    },
  );

  barChart = new window.Chart(
    document.getElementById("barChart"),

    {
      type: "bar",

      data: {
        labels: ["売上高", "売上原価", "経費", "利益"],

        datasets: [
          {
            label: "万円",

            data: [120, 36, 67, 17],

            backgroundColor: ["#3b82f6", "#ef4444", "#f59e0b", "#22c55e"],

            borderRadius: 12,
          },
        ],
      },

      options: {
        responsive: true,

        plugins: {
          legend: {
            labels: {
              color: textColor,
            },
          },
        },

        scales: {
          x: {
            ticks: {
              color: textColor,
            },
          },

          y: {
            beginAtZero: true,

            ticks: {
              color: textColor,
            },
          },
        },
      },
    },
  );
}

updateCharts();

console.log("MIRAI SUPPORT Premium Loaded");
