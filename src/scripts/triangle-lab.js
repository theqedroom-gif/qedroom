// Interactive triangle: drag a corner and watch a / sin A, b / sin B and c / sin C stay equal.
import katex from 'katex';

const START = { A: [100, 300], B: [500, 300], C: [340, 80] };
const BOUNDS = { minX: 30, maxX: 570, minY: 30, maxY: 340 };
const MIN_ANGLE = 8;    // degrees, so the triangle never collapses into a line
const UNITS = 40;       // pixels per unit of length
const KEY_STEP = 8;

const SVG_NS = 'http://www.w3.org/2000/svg';
const distance = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
const degrees = (radians) => (radians * 180) / Math.PI;
const radians = (deg) => (deg * Math.PI) / 180;
const math = (tex) => katex.renderToString(tex, { throwOnError: false });

function measure({ A, B, C }) {
  const a = distance(B, C) / UNITS;
  const b = distance(A, C) / UNITS;
  const c = distance(A, B) / UNITS;
  const angleA = degrees(Math.acos((b * b + c * c - a * a) / (2 * b * c)));
  const angleB = degrees(Math.acos((a * a + c * c - b * b) / (2 * a * c)));
  return { a, b, c, A: angleA, B: angleB, C: 180 - angleA - angleB };
}

function make(tag, attributes, parent) {
  const element = document.createElementNS(SVG_NS, tag);
  Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value));
  parent.appendChild(element);
  return element;
}

export function mount(root) {
  let points = structuredClone(START);

  root.innerHTML = `
    <div class="lab__stage"></div>
    <div class="lab__values" aria-live="off"></div>
    <div class="lab__controls"><button class="btn btn--secondary" type="button">Reset triangle</button></div>
  `;

  const svg = make('svg', {
    viewBox: '0 0 600 370',
    class: 'lab__svg',
    role: 'group',
    'aria-label': 'Triangle with three corners you can move',
  }, root.querySelector('.lab__stage'));

  const shape = make('polygon', { class: 'lab__shape' }, svg);
  const sideLabels = {};
  ['a', 'b', 'c'].forEach((name) => {
    sideLabels[name] = make('text', { class: 'lab__side' }, svg);
    sideLabels[name].textContent = name;
  });

  const handles = {};
  const cornerLabels = {};
  ['A', 'B', 'C'].forEach((name) => {
    cornerLabels[name] = make('text', { class: 'lab__corner' }, svg);
    cornerLabels[name].textContent = name;
    const handle = make('g', {
      class: 'lab__handle',
      tabindex: '0',
      role: 'button',
      'aria-label': `Corner ${name}. Drag it, or use the arrow keys to move it.`,
    }, svg);
    make('circle', { class: 'lab__hit', r: '26' }, handle);
    make('circle', { class: 'lab__dot', r: '12' }, handle);
    handles[name] = handle;
  });

  const values = root.querySelector('.lab__values');

  function render() {
    const { A, B, C } = points;
    shape.setAttribute('points', [A, B, C].map((p) => p.join(',')).join(' '));

    const centre = [(A[0] + B[0] + C[0]) / 3, (A[1] + B[1] + C[1]) / 3];
    const outward = (p, by) => {
      const length = distance(p, centre) || 1;
      return [p[0] + ((p[0] - centre[0]) / length) * by, p[1] + ((p[1] - centre[1]) / length) * by];
    };
    const place = (element, [x, y]) => {
      element.setAttribute('x', x);
      element.setAttribute('y', y);
    };
    const middle = (p, q) => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];

    Object.entries(handles).forEach(([name, handle]) => {
      handle.setAttribute('transform', `translate(${points[name][0]} ${points[name][1]})`);
      place(cornerLabels[name], outward(points[name], 32));
    });
    place(sideLabels.a, outward(middle(B, C), 22));
    place(sideLabels.b, outward(middle(A, C), 22));
    place(sideLabels.c, outward(middle(A, B), 22));

    // Keep each corner at least 44px wide to touch, however small the drawing is shown.
    const scale = svg.getBoundingClientRect().width / 600 || 1;
    svg.querySelectorAll('.lab__hit').forEach((hit) => hit.setAttribute('r', Math.max(26, 24 / scale)));
    svg.querySelectorAll('.lab__dot').forEach((dot) => dot.setAttribute('r', Math.max(12, 9 / scale)));

    const m = measure(points);
    const row = (side, angle) => {
      const length = m[side].toFixed(2);
      const size = m[angle].toFixed(1);
      const ratio = (m[side] / Math.sin(radians(m[angle]))).toFixed(2);
      return `<p>${math(`\\dfrac{${side}}{\\sin ${angle}} = \\dfrac{${length}}{\\sin ${size}^{\\circ}} = ${ratio}`)}</p>`;
    };
    values.innerHTML = row('a', 'A') + row('b', 'B') + row('c', 'C');
  }

  // Ignore moves that would leave the stage or flatten the triangle.
  function moveTo(name, x, y) {
    const next = {
      ...points,
      [name]: [
        Math.round(Math.min(BOUNDS.maxX, Math.max(BOUNDS.minX, x))),
        Math.round(Math.min(BOUNDS.maxY, Math.max(BOUNDS.minY, y))),
      ],
    };
    const m = measure(next);
    if (Math.min(m.A, m.B, m.C) < MIN_ANGLE || Number.isNaN(m.A) || Number.isNaN(m.B)) return;
    points = next;
    render();
  }

  function pointerPosition(event) {
    const point = new DOMPoint(event.clientX, event.clientY).matrixTransform(svg.getScreenCTM().inverse());
    return [point.x, point.y];
  }

  Object.entries(handles).forEach(([name, handle]) => {
    handle.addEventListener('pointerdown', (event) => {
      handle.setPointerCapture(event.pointerId);
      handle.classList.add('is-dragging');
    });
    handle.addEventListener('pointermove', (event) => {
      if (handle.hasPointerCapture(event.pointerId)) moveTo(name, ...pointerPosition(event));
    });
    const stop = () => handle.classList.remove('is-dragging');
    handle.addEventListener('pointerup', stop);
    handle.addEventListener('pointercancel', stop);

    handle.addEventListener('keydown', (event) => {
      const steps = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }[event.key];
      if (!steps) return;
      event.preventDefault();
      moveTo(name, points[name][0] + steps[0] * KEY_STEP, points[name][1] + steps[1] * KEY_STEP);
    });
  });

  root.querySelector('.lab__controls button').addEventListener('click', () => {
    points = structuredClone(START);
    render();
  });

  new ResizeObserver(render).observe(svg);
  render();
}
