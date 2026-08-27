import "./style.css";
import logoUrl from "./assets/logo.png";
import heroPoster from "./assets/hero-poster.jpg";
import heroVideo from "./assets/hero.mp4";
import firetruckUrl from "./assets/firetruck.jpg";
import sigTouchfree from "./assets/sig-touchfree.jpg";
import sigRinse from "./assets/sig-rinse.jpg";
import sigUndercarriage from "./assets/sig-undercarriage.jpg";
import sigFoam from "./assets/sig-foam.jpg";
import sigWheel from "./assets/sig-wheel.jpg";

const signatureImages: Record<string, string> = {
  touchfree: sigTouchfree,
  rinse: sigRinse,
  undercarriage: sigUndercarriage,
  foam: sigFoam,
  wheel: sigWheel,
};

/** Point every logo <img data-logo> at the bundled asset URL. */
function initLogos(): void {
  document
    .querySelectorAll<HTMLImageElement>("img[data-logo]")
    .forEach((img) => {
      img.src = logoUrl;
    });
}

/** Point the foundation <img data-firetruck> at the bundled asset URL. */
function initFoundationImage(): void {
  document
    .querySelectorAll<HTMLImageElement>("img[data-firetruck]")
    .forEach((img) => {
      img.src = firetruckUrl;
    });
}

/** Point each signature-services slide <img data-sig> at its bundled photo. */
function initSignatureImages(): void {
  document
    .querySelectorAll<HTMLImageElement>("img[data-sig]")
    .forEach((img) => {
      const key = img.dataset.sig;
      if (key && signatureImages[key]) img.src = signatureImages[key];
    });
}

/** Wire up the full-bleed hero background video. */
function initHeroVideo(): void {
  const video = document.querySelector<HTMLVideoElement>("#heroVideo");
  if (!video) return;
  video.poster = heroPoster;
  video.src = heroVideo;
  // Autoplay can be blocked until metadata is ready; retry, and fall back
  // silently to the poster frame if the browser refuses.
  const tryPlay = (): void => {
    void video.play().catch(() => undefined);
  };
  video.addEventListener("loadeddata", tryPlay);
  tryPlay();
}

/** Mobile hamburger menu. */
function initMenu(): void {
  const btn = document.querySelector<HTMLButtonElement>("#menuBtn");
  const nav = document.querySelector<HTMLElement>("#mainNav");
  if (!btn || !nav) return;
  btn.addEventListener("click", () => nav.classList.toggle("open"));
  nav
    .querySelectorAll("a")
    .forEach((a) => a.addEventListener("click", () => nav.classList.remove("open")));
}

/** Signature-services carousel with dots and auto-advance. */
function initCarousel(): void {
  const track = document.querySelector<HTMLElement>("#track");
  const dotsWrap = document.querySelector<HTMLElement>("#carDots");
  if (!track || !dotsWrap) return;

  const count = track.children.length;
  const dots: HTMLButtonElement[] = [];
  let index = 0;

  const render = (): void => {
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle("on", i === index));
  };

  const go = (dir: number): void => {
    index = (index + dir + count) % count;
    render();
  };

  for (let i = 0; i < count; i++) {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Slide ${i + 1}`);
    dot.addEventListener("click", () => {
      index = i;
      render();
    });
    dotsWrap.appendChild(dot);
    dots.push(dot);
  }

  document.querySelector("#carPrev")?.addEventListener("click", () => go(-1));
  document.querySelector("#carNext")?.addEventListener("click", () => go(1));

  render();
  window.setInterval(() => go(1), 6000);
}

/** Newsletter signup — confirmation only, nothing leaves the browser. */
function initNewsletter(): void {
  const form = document.querySelector<HTMLFormElement>("#nlForm");
  if (!form) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    form.style.display = "none";
    const note = document.querySelector<HTMLElement>("#nlNote");
    const done = document.querySelector<HTMLElement>("#nlDone");
    if (note) note.style.display = "none";
    if (done) done.style.display = "block";
  });
}

initLogos();
initFoundationImage();
initSignatureImages();
initHeroVideo();
initMenu();
initCarousel();
initNewsletter();
