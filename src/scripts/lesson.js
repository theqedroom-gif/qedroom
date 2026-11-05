// Lesson page extras: diagrams that draw themselves, matching pairs and the triangle lab.
// The pages work without this file. Diagrams simply stay as plain images.

const prefersStill = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

async function inlineDiagram(img) {
  const response = await fetch(img.src);
  if (!response.ok) return null;
  const parsed = new DOMParser().parseFromString(await response.text(), 'image/svg+xml');
  const svg = document.importNode(parsed.documentElement, true);
  if (svg.tagName.toLowerCase() !== 'svg') return null;

  svg.querySelector('title')?.remove();
  svg.removeAttribute('aria-labelledby');
  svg.removeAttribute('width');
  svg.removeAttribute('height');
  svg.setAttribute('aria-label', img.alt);
  svg.classList.add('diagram-svg');
  img.replaceWith(svg);
  return svg;
}

// The outline draws first, then the angle marks and labels fade in.
function prepareDrawing(svg) {
  let order = 0;
  svg.querySelectorAll('path, line, text').forEach((shape) => {
    if (shape.matches('.side, .side-hit')) return;
    const isLine = shape.matches('path, line') && shape.getAttribute('stroke') && !shape.getAttribute('stroke-dasharray');
    const isOutline = isLine && Number(shape.getAttribute('stroke-width')) >= 3;
    if (isOutline) {
      shape.setAttribute('pathLength', '1');
      shape.classList.add('draw-line');
      shape.style.animationDelay = `${order * 0.3}s`;
      order += 1;
    } else {
      shape.classList.add('draw-fade');
      shape.style.animationDelay = `${0.9 + order * 0.1}s`;
    }
  });
}

function setupPairs(svg) {
  const pairs = [...new Set([...svg.querySelectorAll('[data-pair]')].map((el) => el.dataset.pair))];
  if (!pairs.length) return null;

  const show = (pair) => {
    svg.classList.toggle('has-pair', Boolean(pair));
    svg.querySelectorAll('[data-pair]').forEach((el) => el.classList.toggle('is-on', el.dataset.pair === pair));
  };

  let touched = false;
  const pairAt = (event) => event.target.closest?.('[data-pair]')?.dataset.pair ?? null;
  svg.addEventListener('pointerover', (event) => {
    touched = true;
    show(pairAt(event));
  });
  // On touch screens the highlight stays until the next tap.
  svg.addEventListener('pointerleave', (event) => {
    if (event.pointerType === 'mouse') show(null);
  });

  // One run through the pairs after drawing, unless the student has already started exploring.
  return function playOnce() {
    pairs.forEach((pair, index) => {
      setTimeout(() => { if (!touched) show(pair); }, index * 1100);
    });
    setTimeout(() => { if (!touched) show(null); }, pairs.length * 1100);
  };
}

async function setupDiagrams() {
  const images = [...document.querySelectorAll('.diagram img[src$=".svg"]')];
  const diagrams = await Promise.all(images.map((img) => inlineDiagram(img).catch(() => null)));

  diagrams.filter(Boolean).forEach((svg) => {
    const playPairs = setupPairs(svg);
    if (prefersStill) {
      svg.classList.add('is-drawn');
      return;
    }
    prepareDrawing(svg);
    const observer = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      observer.disconnect();
      svg.classList.add('is-drawn');
      // Once drawn, clear the animation classes so the highlight can fade shapes.
      setTimeout(() => {
        svg.querySelectorAll('.draw-line, .draw-fade').forEach((shape) => {
          shape.classList.remove('draw-line', 'draw-fade');
          shape.style.animationDelay = '';
        });
        if (playPairs) playPairs();
      }, 2200);
    }, { threshold: 0.4 });
    observer.observe(svg);
  });
}

setupDiagrams();

// YouTube loads only after the student presses play, which saves mobile data.
document.querySelectorAll('[data-video]').forEach((box) => {
  box.querySelector('button').addEventListener('click', () => {
    const frame = document.createElement('iframe');
    frame.src = `https://www.youtube-nocookie.com/embed/${box.dataset.video}?autoplay=1&rel=0`;
    frame.title = box.dataset.videoTitle;
    frame.allow = 'autoplay; encrypted-media; picture-in-picture';
    frame.allowFullscreen = true;
    box.replaceChildren(frame);
  });
});

const lab = document.querySelector('[data-triangle-lab]');
if (lab) import('./triangle-lab.js').then(({ mount }) => mount(lab));
