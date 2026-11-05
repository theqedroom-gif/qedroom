// Saves each student's progress in their own browser. Nothing is sent anywhere,
// and every page still works if browser storage is blocked or empty.

const KEY = 'qed-progress-v1';

function read() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY));
    return { done: Array.isArray(saved?.done) ? saved.done : [], last: saved?.last ?? null };
  } catch {
    return { done: [], last: null };
  }
}

function write(progress) {
  try {
    localStorage.setItem(KEY, JSON.stringify(progress));
  } catch {
    // Storage is blocked, so progress simply lasts for this page only.
  }
}

let progress = read();
const isDone = (id) => progress.done.includes(id);

function paint() {
  // Ticks in the side menu and chapter lesson lists
  document.querySelectorAll('[data-lesson-link]').forEach((link) => {
    const done = isDone(link.dataset.lessonLink);
    link.classList.toggle('is-done', done);
    const mark = link.querySelector('.done-mark');
    if (done && !mark) {
      const label = document.createElement('span');
      label.className = 'done-mark';
      label.textContent = 'Done';
      link.appendChild(label);
    } else if (!done && mark) {
      mark.remove();
    }
  });

  // Progress bars on chapter cards
  document.querySelectorAll('[data-progress]').forEach((box) => {
    const ids = box.dataset.progress.split(',');
    const count = ids.filter(isDone).length;
    const percent = Math.round((count / ids.length) * 100);
    box.hidden = false;
    box.querySelector('.progress__fill').style.width = `${percent}%`;
    box.querySelector('.progress__label').textContent = `${percent}%`;
    box.querySelector('.progress__bar').setAttribute('aria-valuenow', percent);
  });

  // Chapter problem tracker: parts done, the part to do next, then the rest
  document.querySelectorAll('[data-problem-steps]').forEach((steps) => {
    let foundNext = false;
    steps.querySelectorAll('a[data-lesson]').forEach((step) => {
      const done = isDone(step.dataset.lesson);
      const next = !done && !foundNext;
      if (next) foundNext = true;
      step.classList.toggle('done', done);
      step.classList.toggle('now', next);
      const state = done ? 'done' : next ? 'up next' : 'not started';
      step.setAttribute('aria-label', `Part ${step.textContent.trim()}, ${state}`);
    });
  });

  // Mark as done button
  const article = document.querySelector('[data-lesson]');
  const button = document.querySelector('[data-mark-done]');
  if (article && button) {
    const done = isDone(article.dataset.lesson);
    button.textContent = done ? 'Mark as not done' : 'Mark as done';
    button.setAttribute('aria-pressed', String(done));
    document.querySelector('[data-done-message]').hidden = !done;
  }
}

// Remember the last written lesson opened
const lesson = document.querySelector('[data-lesson][data-live="true"]');
if (lesson) {
  progress.last = { title: lesson.dataset.title, chapter: lesson.dataset.chapter, url: location.pathname };
  write(progress);
}

document.querySelector('[data-mark-done]')?.addEventListener('click', () => {
  const id = document.querySelector('[data-lesson]').dataset.lesson;
  progress.done = isDone(id) ? progress.done.filter((item) => item !== id) : [...progress.done, id];
  write(progress);
  paint();
});

// Continue where you left off, on the home page
const resume = document.querySelector('[data-continue]');
if (resume && progress.last?.url?.startsWith('/lessons/')) {
  resume.href = progress.last.url;
  resume.querySelector('[data-continue-title]').textContent = progress.last.title;
  resume.querySelector('[data-continue-chapter]').textContent = progress.last.chapter;
  resume.hidden = false;
}

paint();
