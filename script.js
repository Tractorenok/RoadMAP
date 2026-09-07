    // Основные вкладки сайта. Здесь меняются названия разделов, бейджи, курс, фокус и строка под мини-профилем.
    const portfolioTabs = [
      { id: "about", title: "Обо мне", kicker: "личный профиль", badge: "full-stack", course: "1", focus: "база", status: "1 курс: собираю базу full-stack" },
      { id: "skills", title: "Что я умею", kicker: "технические навыки", badge: "frontend + backend", course: "1", focus: "стек", status: "умею делать интерфейсы и серверную часть" },
      { id: "courses", title: "Курс", kicker: "план практики", badge: "1 курс", course: "1", focus: "база", status: "1 курс: собираю базу full-stack" },
      { id: "projects", title: "Проекты", kicker: "портфолио", badge: "production", course: "4", focus: "релиз", status: "готовлю проекты для портфолио и резюме" }
    ];

    // Данные для под-вкладок раздела "Курс". Каждый объект отвечает за один курс и его карточки.
    const courseDetails = [
      {
        id: "year1",
        number: "1 курс",
        theme: "course-theme-1",
        title: "Начало пути в Full-Stack",
        focus: "база",
        description: "Первый курс — старт full-stack пути: понять, как устроены сайты, как работает клиент и сервер, собрать первые страницы и подготовиться к реальным проектам.",
        cards: [
          { label: "практика", title: "Junior full-stack trainee", text: "Помощь с простыми страницами\nПервые задачи по JavaScript\nРазбор структуры проекта" },
          { label: "обязанности", title: "Стартовая разработка", text: "Верстка базовых страниц\nПодключение простых скриптов\nПонимание клиент-серверной логики" },
          { label: "уже умею", title: "База разработчика", text: "HTML/CSS база\nПервые шаги в JavaScript\nПонимание структуры сайта\nРабота с Git на базовом уровне" },
          { label: "получу", title: "Фундамент full-stack", text: "Понимание frontend и backend\nПростые интерактивные страницы\nКомандная работа\nПрактика на учебных проектах" }
        ]
      },
      {
        id: "year2",
        number: "2 курс",
        theme: "course-theme-2",
        title: "Frontend и первые API",
        focus: "фронтенд",
        description: "На втором курсе упор на интерактивность: JavaScript, React, формы, запросы к API и первые связки frontend + backend.",
        cards: [
          { label: "практика", title: "Web-студия", text: "Frontend / Backend intern\nРабота рядом с командой" },
          { label: "обязанности", title: "Интерактивные страницы", text: "Подключение API\nРабота с формами\nВалидация данных\nСостояния загрузки и ошибок" },
          { label: "уже умею", title: "Frontend база", text: "JavaScript\nGit\nАдаптивная верстка\nБазовый React" },
          { label: "получу", title: "SPA-мышление", text: "React-компоненты\nАсинхронность\nРабота с внешними сервисами\nРазбор чужого кода" }
        ]
      },
      {
        id: "year3",
        number: "3 курс",
        theme: "course-theme-3",
        title: "Backend и базы данных",
        focus: "бэкенд",
        description: "Третий курс — момент, где full-stack становится настоящим: API, авторизация, SQL, хранение данных и интеграция фронта с сервером.",
        cards: [
          { label: "практика", title: "IT-отдел компании", text: "Full-stack developer junior\nРабота с реальными задачами" },
          { label: "обязанности", title: "Серверная логика", text: "REST API\nАвторизация\nБаза данных\nИнтеграция фронта и бэка" },
          { label: "уже умею", title: "Backend стек", text: "Node.js\nExpress\nSQL\nJWT\nРабота с API" },
          { label: "получу", title: "Архитектура данных", text: "Проектирование БД\nBackend-архитектура\nБезопасность API\nFull-stack приложения" }
        ]
      },
      {
        id: "year4",
        number: "4 курс",
        theme: "course-theme-4",
        title: "Production и выпускной продукт",
        focus: "полный стек",
        description: "Четвертый курс — довести стек до результата: TypeScript, деплой, Docker, тесты, командная разработка и сильный выпускной проект.",
        cards: [
          { label: "практика", title: "Команда продукта", text: "Full-stack developer\nУчастие в продуктовой разработке" },
          { label: "обязанности", title: "Продукт целиком", text: "Архитектура приложения\nДеплой\nОптимизация\nКомандная разработка" },
          { label: "уже умею", title: "Production инструменты", text: "TypeScript\nDocker\nCI/CD\nПроектирование модулей" },
          { label: "получу", title: "Готовность к работе", text: "Тестирование\nМониторинг\nDevOps-процессы\nДипломный full-stack проект" }
        ]
      }
    ];


// Presentation and interaction. The original four-year course data is preserved above.
const root = document.getElementById('contentRoot');
const tabs = document.getElementById('tabContainer');
const kicker = document.getElementById('sectionKicker');
const count = document.getElementById('chapterCount');
const dialog = document.getElementById('contactDialog');
let currentTab = 'about';
let currentCourse = 'year1';

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
}
const about = () => `
  <h2>От первой строки —<br><span>к целому продукту.</span></h2>
  <p class="lead-copy">Мне интересно не просто писать код, а понимать, как всё работает вместе: интерфейс, сервер и данные. Сейчас я на первом курсе и шаг за шагом собираю свой full-stack фундамент.</p>
  <div class="approach"><div class="approach-icon" aria-hidden="true">&lt;/&gt;</div><div><h3>Думать о задаче целиком</h3><p>От пользовательского сценария до базы данных и деплоя.</p></div></div>
  <div class="principles">
    <article><span class="principle-index">01 / ПОДХОД</span><h3>Практика важнее теории</h3><p>Один работающий проект даёт больше, чем десять недоделанных страниц. Учусь, пробую и довожу до результата.</p></article>
    <article><span class="principle-index">02 / ЦЕЛЬ</span><h3>Стать сильным инженером</h3><p>На каждом курсе — новый уровень: от вёрстки и frontend до архитектуры и полноценного продукта.</p></article>
  </div>
  <div class="focus-strip"><span>Сейчас в фокусе <strong>↗</strong></span><span class="mono">HTML / CSS / JavaScript</span></div>
`;
function renderSkills() {
  const stack = ['HTML','CSS','JavaScript','TypeScript','React','Node.js','Express','SQL','REST API','Git','Docker','Figma'];
  const skills = [
    ['Интерфейсы','HTML, CSS, адаптивная вёрстка, JavaScript, React, компоненты, работа с состоянием и API.'],
    ['Серверная часть','Node.js, Express, REST API, авторизация, обработка ошибок и структура backend-проекта.'],
    ['Данные','SQL, базовое проектирование таблиц, связи, CRUD-операции и клиент-серверная логика.'],
    ['Инструменты','Git, GitHub, Vite, npm, деплой, базовый Docker и аккуратная работа с задачами.']
  ];
  return `<h2>Интерфейс. Логика.<br><span>И всё между ними.</span></h2>
    <p class="lead-copy">Мой стек строится вокруг полного цикла разработки: сверстать, оживить, подключить сервер и сохранить данные.</p>
    <div class="stack-cloud" aria-label="Технологии">${stack.map(s=>`<span>${escapeHtml(s)}</span>`).join('')}</div>
    <div class="skill-list">${skills.map(([title,text],i)=>`<article class="skill-row"><span class="row-index">0${i+1}</span><div><h3>${escapeHtml(title)}</h3><p>${escapeHtml(text)}</p></div></article>`).join('')}</div>`;
}
function coursePanel() {
  const course = courseDetails.find(c=>c.id===currentCourse);
  return `<div class="course-stage-head"><span class="eyebrow">${escapeHtml(course.number)} / ${escapeHtml(course.focus)}</span><h3>${escapeHtml(course.title)}</h3><p>${escapeHtml(course.description)}</p></div>
  <div class="course-card-grid">${course.cards.map(c=>`<article class="course-card"><span>${escapeHtml(c.label)}</span><h4>${escapeHtml(c.title)}</h4><p>${escapeHtml(c.text)}</p></article>`).join('')}</div>`;
}
function renderCourses() {
  const labels=['Основы','Frontend','Backend','Продукт'];
  return `<h2>Большой путь.<br><span>Понятные шаги.</span></h2><p class="lead-copy">Четыре курса — от первой страницы до выпускного продукта. На каждом этапе свой фокус, практика и новые навыки.</p>
    <div class="course-tabs" role="tablist" aria-label="Курсы обучения">${courseDetails.map((c,i)=>`<button class="course-tab" id="course-${c.id}" data-course="${c.id}" role="tab" aria-selected="${c.id===currentCourse}" aria-controls="courseDetail" tabindex="${c.id===currentCourse?0:-1}" type="button"><span>0${i+1}</span><small>${labels[i]}</small></button>`).join('')}</div>
    <div id="courseDetail" role="tabpanel" aria-labelledby="course-${currentCourse}" tabindex="0">${coursePanel()}</div>`;
}
function renderProjects() {
  const projects=[
    ['Личное портфолио','PORTFOLIO','Этот сайт: навыки, план развития по курсам и собственное пространство для проектов.'],
    ['Full-stack SPA','SPA','Приложение на React с авторизацией, личным кабинетом, API и сохранением данных в базе.'],
    ['REST API сервис','API','Backend на Node.js и Express: маршруты, контроллеры, валидация, база данных и документация.'],
    ['Выпускной продукт','FINAL','Итоговый full-stack проект: от идеи и архитектуры до деплоя и защиты.']
  ];
  return `<h2>Код становится<br><span>чем-то настоящим.</span></h2><p class="lead-copy">Моё портфолио и направления следующих работ: взять идею, собрать интерфейс, написать логику и объяснить, как всё работает.</p><div class="project-list">${projects.map(([title,label,text],i)=>`<article class="project-row"><span class="row-index">0${i+1}</span><div><div class="project-topline"><h3>${escapeHtml(title)}</h3><span class="project-kind">${label}</span></div><p>${escapeHtml(text)}</p>${i===0?'<a class="project-source" href="https://github.com/Tractorenok/RoadMAP" target="_blank" rel="noopener noreferrer">Исходный код <span aria-hidden="true">↗</span></a>':''}</div></article>`).join('')}</div>`;
}
const screens = {about,skills:renderSkills,courses:renderCourses,projects:renderProjects};
const kickers = {about:'НЕМНОГО ОБО МНЕ',skills:'ТЕХНИЧЕСКИЕ НАВЫКИ',courses:'ПЛАН РАЗВИТИЯ',projects:'ПОРТФОЛИО И ПЛАНЫ'};
function renderTab(id,animate=true) {
  if (!screens[id]) return;
  currentTab=id;
  tabs.querySelectorAll('[role="tab"]').forEach(button=>{
    const selected=button.dataset.tab===id;
    button.classList.toggle('active',selected);
    button.setAttribute('aria-selected',String(selected));
    button.tabIndex=selected?0:-1;
  });
  kicker.textContent=kickers[id];
  count.textContent='0'+(Object.keys(screens).indexOf(id)+1)+' / 04';
  root.setAttribute('aria-labelledby','tab-'+id);
  root.innerHTML=screens[id]();
  root.classList.remove('is-entering');
  if(animate) requestAnimationFrame(()=>root.classList.add('is-entering'));
}
function selectCourse(id) {
  if(!courseDetails.some(c=>c.id===id)) return;
  currentCourse=id;
  root.querySelectorAll('[data-course]').forEach(button=>{
    const selected=button.dataset.course===id;
    button.setAttribute('aria-selected',String(selected));
    button.tabIndex=selected?0:-1;
  });
  const detail=document.getElementById('courseDetail');
  detail.setAttribute('aria-labelledby','course-'+id);
  detail.innerHTML=coursePanel();
}
function moveTab(event,buttons,select) {
  const keys=['ArrowLeft','ArrowRight','Home','End'];
  if(!keys.includes(event.key)) return;
  const items=Array.from(buttons);
  const index=items.indexOf(event.target);
  if(index<0) return;
  event.preventDefault();
  let next=event.key==='Home'?0:event.key==='End'?items.length-1:(index+(event.key==='ArrowRight'?1:-1)+items.length)%items.length;
  items[next].focus();
  select(items[next]);
}
tabs.addEventListener('click',event=>{
  const button=event.target.closest('[data-tab]');
  if(button) renderTab(button.dataset.tab);
});
tabs.addEventListener('keydown',event=>moveTab(event,tabs.querySelectorAll('[role="tab"]'),b=>renderTab(b.dataset.tab)));
root.addEventListener('click',event=>{
  const button=event.target.closest('[data-course]');
  if(button) selectCourse(button.dataset.course);
});
root.addEventListener('keydown',event=>moveTab(event,root.querySelectorAll('[data-course]'),b=>selectCourse(b.dataset.course)));
document.getElementById('contactButton').addEventListener('click',()=>dialog.showModal());
document.getElementById('closeContact').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{
  const rect=dialog.getBoundingClientRect();
  if(event.target===dialog&&(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)) dialog.close();
});
dialog.addEventListener('close',()=>document.getElementById('contactButton').focus());
renderTab('about',false);
