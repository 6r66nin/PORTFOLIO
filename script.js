const projectDetails = {
  'blog-api': {
    title: 'Blog REST API',
    meta: 'Node.js · Express · Prisma · PostgreSQL',
    summary: 'A blog platform with authentication, profile management, post creation and comment flows built in TypeScript.',
    problem: 'The project focuses on building a robust backend for a basic social-style blog, including protected routes and validation logic.',
    stack: ['Node.js', 'Express', 'TypeScript', 'Prisma', 'PostgreSQL', 'Zod'],
    highlights: [
      'Session-based authentication with cookie handling and protected user routes.',
      'Post and comment CRUD with ownership checks and structured error responses.',
      'Data validation and Prisma models for structured persistence.'
    ],
    repo: 'https://github.com/6r66nin/BLOG-REST-API'
  },
  simpsons: {
    title: 'Simpsons Random Characters Collection',
    meta: 'React · Vite · API consumption',
    summary: 'A small React app for discovering random Simpsons characters and saving favorites in a simple collection.',
    problem: 'The goal was to build a lightweight frontend experience that fetches external data, handles state and keeps the interface responsive.',
    stack: ['React', 'Vite', 'JavaScript', 'CSS'],
    highlights: [
      'Randomized character selection and UI card rendering.',
      'State updates for saved favorites and smooth visual transitions.',
      'Responsive styling with clear states for loading and data display.'
    ],
    repo: 'https://github.com/6r66nin/Simpsons-Random-Characters-Collection'
  },
  'users-posts': {
    title: 'Users Posts API',
    meta: 'TypeScript · Express · PostgreSQL',
    summary: 'A learning-focused REST API for managing users, posts and likes with pagination and validation.',
    problem: 'This backend project demonstrates CRUD patterns, layered architecture and practical API design in a small learning environment.',
    stack: ['Express', 'TypeScript', 'PostgreSQL', 'pg', 'Zod'],
    highlights: [
      'Endpoints for users, posts and likes with pagination support.',
      'Clear service/model structure and validation logic.',
      'Error handling and simple data flow between controllers and database queries.'
    ],
    repo: 'https://github.com/6r66nin/Users-Posts-Api'
  },
  omdb: {
    title: 'OMDb API Frontend',
    meta: 'React · OMDb API · Search interface',
    summary: 'A frontend application for searching movies and browsing results with sorting and pagination.',
    problem: 'The project combines UI state, API requests and search UX in a simple and readable interface.',
    stack: ['React', 'JavaScript', 'API', 'UI components'],
    highlights: [
      'Search movies by title and browse results efficiently.',
      'Sorting and pagination controls for easier discovery.',
      'Lightweight frontend patterns focused on usability.'
    ],
    repo: 'https://github.com/6r66nin/Omdb-Api-Frontend'
  },
  conway: {
    title: 'Conway\'s Game of Life',
    meta: 'HTML · CSS · JavaScript',
    summary: 'A cellular automata simulation built in vanilla JavaScript to explore state transitions and pattern logic.',
    problem: 'This project is useful for demonstrating algorithmic thinking and a clean separation between rendering and simulation rules.',
    stack: ['JavaScript', 'HTML', 'CSS'],
    highlights: [
      'Grid-based simulation using Conway\'s rules.',
      'Interactive behaviour with a simple front-end structure.',
      'A practical example of logic-driven programming.'
    ],
    repo: 'https://github.com/6r66nin/Conway-s_Game_of_Life'
  },
  asteroids: {
    title: 'Asteroids Game SFML',
    meta: 'C++ · SFML',
    summary: 'A small game project built with SFML to practice game loops, controls and rendering.',
    problem: 'The project demonstrates game development fundamentals, event handling and real-time interaction in a compact C++ codebase.',
    stack: ['C++', 'SFML', 'Game logic'],
    highlights: [
      'Gameplay loop and object updates.',
      'Input handling and a real-time rendering pipeline.',
      'A complementary example of problem-solving beyond web development.'
    ],
    repo: 'https://github.com/6r66nin/ASTEROIDS-GAME-SFML'
  }
};

const modalBackdrop = document.querySelector('.modal-backdrop');
const modalContent = document.getElementById('modal-content');
const modalCloseButton = document.querySelector('.modal-close');
const filterButtons = document.querySelectorAll('.filter-button');
const projectCards = document.querySelectorAll('.project-card');
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

function startCodeTyping() {
  const code = document.getElementById('typed-code');
  const cursor = document.querySelector('.typing-cursor');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (!code || !cursor) return;

  const example = [
    'const developer = "Ronin Garrido";',
    '',
    'const stack = [',
    '  "React", "TypeScript",',
    '  "Node.js", "Express", "PostgreSQL"',
    '];',
    '',
    'const projectSchema = z.object({',
    '  title: z.string().min(1),',
    '  description: z.string().min(1)',
    '});',
    '',
    'app.get("/api/projects", async (_req, res) => {',
    '  const projects = await projectService.list();',
    '  res.json({ projects });',
    '});',
    '',
    'app.post("/api/projects", async (req, res) => {',
    '  const project = projectSchema.parse(req.body);',
    '  const saved = await projectService.create(project);',
    '  res.status(201).json(saved);',
    '});',
    '',
    'const result = await db.query(',
    '  "SELECT title FROM projects ORDER BY created_at DESC"',
    ');',
    '',
    'return result.rows;'
  ].join('\n') + '\n\n';
  const editor = code.parentElement;
  let characterIndex = 0;

  if (reduceMotion.matches) {
    code.textContent = example;
    cursor.hidden = true;
    return;
  }

  code.textContent = '';

  function typeNextCharacter() {
    const character = example[characterIndex];
    code.textContent += character;
    characterIndex = (characterIndex + 1) % example.length;

    const lines = code.textContent.split('\n');
    if (lines.length > 24) {
      code.textContent = lines.slice(-24).join('\n');
    }

    editor.scrollTop = editor.scrollHeight;
    window.setTimeout(typeNextCharacter, character === '\n' ? 180 : 28);
  }

  typeNextCharacter();
}

function updateYear() {
  const year = document.getElementById('year');
  if (year) {
    year.textContent = new Date().getFullYear();
  }
}

function openProject(key) {
  const project = projectDetails[key];
  if (!project) return;

  modalContent.innerHTML = `
    <p class="eyebrow">PROJECT</p>
    <h3>${project.title}</h3>
    <div class="modal-meta">${project.meta}</div>
    <p>${project.summary}</p>
    <p><strong>Problem / objective:</strong> ${project.problem}</p>
    <p><strong>What I implemented:</strong></p>
    <ul>
      ${project.highlights.map((item) => `<li>${item}</li>`).join('')}
    </ul>
    <p><strong>Stack:</strong></p>
    <ul class="tech-badges">
      ${project.stack.map((tech) => `<li>${tech}</li>`).join('')}
    </ul>
    <a class="modal-link" href="${project.repo}" target="_blank" rel="noreferrer">View repository</a>
  `;

  modalBackdrop.hidden = false;
}

function closeProject() {
  modalBackdrop.hidden = true;
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.toggle('active', item === button));

    projectCards.forEach((card) => {
      const matches = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('is-hidden', !matches);
    });
  });
});

document.querySelectorAll('[data-project]').forEach((button) => {
  button.addEventListener('click', () => openProject(button.dataset.project));
});

if (modalCloseButton) {
  modalCloseButton.addEventListener('click', closeProject);
}

if (modalBackdrop) {
  modalBackdrop.addEventListener('click', (event) => {
    if (event.target === modalBackdrop) {
      closeProject();
    }
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modalBackdrop && !modalBackdrop.hidden) {
    closeProject();
  }
});

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 760) {
        siteNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

updateYear();
startCodeTyping();
