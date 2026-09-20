import { films, activities, awards } from './content.js';

const filmRoot = document.querySelector('[data-film-grid]');
if (filmRoot) {
  filmRoot.innerHTML = films.map((film) => {
    const media = film.video
      ? `<iframe loading="lazy" src="https://www.youtube.com/embed/${film.video}?rel=0&modestbranding=1" title="${film.title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
      : `<img src="${film.poster}" alt="${film.title}" loading="lazy" style="width:100%;height:100%;object-fit:cover;filter:grayscale(1) brightness(.45)">`;
    const links = film.links
      ? film.links.map(([href, text]) => `<a class="watch" href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`).join('')
      : `<a class="watch" href="${film.link}" target="_blank" rel="noopener noreferrer">${film.linkText}</a>`;
    return `<article class="film-card">
      <div class="film-media">${media}</div>
      <div class="film-body">
        <div class="film-meta"><span>${film.kind}</span><span>${film.status}</span></div>
        <h3>${film.title}</h3><p class="film-role">${film.role}</p>
        <p class="film-desc">${film.description}</p>
        <div class="tags">${film.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>${links}
      </div>
    </article>`;
  }).join('');
}

const activityRoot = document.querySelector('[data-activity-list]');
if (activityRoot) {
  activityRoot.innerHTML = activities.map(([icon, title, time, role, copy]) => `<article class="activity">
    <span class="activity-icon" aria-hidden="true">${icon}</span>
    <h3>${title}</h3>
    <div class="activity-meta">${time}<br>${role}</div>
    <p>${copy}</p>
  </article>`).join('');
}

const awardRoot = document.querySelector('[data-award-grid]');
if (awardRoot) {
  awardRoot.innerHTML = awards.map((award) => `<article class="award">
    <span class="eyebrow">${award.type}</span>
    <div><h3>${award.title}</h3><p>${award.text}</p>${award.link ? `<a class="award-link" target="_blank" rel="noopener noreferrer" href="${award.link}">${award.linkText}</a>` : ''}</div>
  </article>`).join('');
}

const topbar = document.querySelector('.topbar');
const menu = document.querySelector('.nav-links');
const toggle = document.querySelector('.menu-toggle');

const syncHeader = () => topbar?.classList.toggle('scrolled', window.scrollY > 16);
syncHeader();
window.addEventListener('scroll', syncHeader, { passive: true });

toggle?.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
  toggle.textContent = open ? 'CLOSE' : 'MENU';
});

menu?.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    menu.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
    if (toggle) toggle.textContent = 'MENU';
  }
});
