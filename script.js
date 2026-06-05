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

    // Текущее состояние интерфейса: какая основная вкладка и какой курс сейчас открыты.
    let currentTab = "about";
    let currentCourse = "year1";
    let contentTransitionTimer;

    // Быстрые ссылки на DOM-элементы, которые часто обновляются через JavaScript.
    const contentRoot = document.getElementById("contentRoot");
    const tabContainer = document.getElementById("tabContainer");
    const sectionKicker = document.getElementById("sectionKicker");
    const sectionTitle = document.getElementById("sectionTitle");
    const activeFilterLabel = document.getElementById("activeFilterLabel");
    const courseLabel = document.getElementById("courseLabel");
    const focusLabel = document.getElementById("focusLabel");
    const statusLine = document.getElementById("statusLine");
    const contactButton = document.getElementById("contactButton");
    const contactPopup = document.getElementById("contactPopup");

    // Защищает HTML от случайной вставки тегов из текстовых данных.
    function escapeHtml(value) {
      return String(value).replace(/[&<>"]/g, (char) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "\"": "&quot;"
      }[char]));
    }

    // Универсально собирает HTML карточек: используется в разделах и внутри курсов.
    function renderCards(cards, className) {
      return cards.map((card) => `
        <article class="${className}">
          <span>${escapeHtml(card.label)}</span>
          <h3>${escapeHtml(card.title)}</h3>
          <p>${escapeHtml(card.text)}</p>
        </article>
      `).join("");
    }

    // Контент вкладки "Обо мне".
    function renderAbout() {
      const cards = [
        { label: "роль", title: "Full-stack разработчик", text: "Мне интересно закрывать задачу целиком: от интерфейса и пользовательского сценария до API, базы данных и деплоя." },
        { label: "цель", title: "Вырасти в сильного инженера", text: "На каждом курсе хочу добавлять новый слой: дизайн и верстка, frontend, backend, архитектура, production." },
        { label: "подход", title: "Практика важнее теории", text: "Лучше один рабочий проект с нормальным кодом, чем десять недоделанных страниц без логики." },
        { label: "фокус", title: "Коммерческий стек", text: "React, Node.js, TypeScript, SQL, Git, Docker, API, тесты и понятная презентация результата." }
      ];

      return `
        <section class="portfolio-screen">
          <p class="lead-copy">Я full-stack разработчик в процессе прокачки: собираю сайты, учусь делать удобные интерфейсы, писать серверную логику, хранить данные и доводить проект до состояния, которое можно показать работодателю.</p>
          <div class="feature-grid">${renderCards(cards, "feature-card")}</div>
        </section>
      `;
    }

    // Контент вкладки "Что я умею": облако технологий и карточки навыков.
    function renderSkills() {
      const skills = [
        { label: "frontend", title: "Интерфейсы", text: "HTML, CSS, адаптивная верстка, JavaScript, React, компоненты, работа с состоянием и API." },
        { label: "backend", title: "Серверная часть", text: "Node.js, Express, REST API, авторизация, обработка ошибок и структура backend-проекта." },
        { label: "database", title: "Данные", text: "SQL, базовое проектирование таблиц, связи, CRUD-операции и понимание клиент-серверной логики." },
        { label: "tools", title: "Инструменты", text: "Git, GitHub, Vite, npm, деплой, базовый Docker и аккуратная работа с задачами." }
      ];
      const stack = ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Node.js", "Express", "SQL", "REST API", "Git", "Docker", "Figma"];

      return `
        <section class="portfolio-screen">
          <p class="lead-copy">Мой стек строится вокруг полного цикла разработки: придумать интерфейс, сверстать, оживить, подключить сервер, сохранить данные и развернуть проект.</p>
          <div class="stack-cloud">${stack.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</div>
          <div class="skill-grid">${renderCards(skills, "skill-card")}</div>
        </section>
      `;
    }

    // Контент вкладки "Курс": рисует кнопки 1-4 курса и карточки выбранного курса.
    function renderCourses() {
      const activeCourse = courseDetails.find((course) => course.id === currentCourse) || courseDetails[0];
      const courseTabs = courseDetails.map((course) => `
        <button class="course-tab ${course.theme} ${course.id === activeCourse.id ? "active" : ""}" type="button" data-course="${escapeHtml(course.id)}" role="tab" aria-selected="${course.id === activeCourse.id}">
          ${escapeHtml(course.number)}
        </button>
      `).join("");

      return `
        <section class="portfolio-screen">
          <p class="lead-copy">Выбери курс: внутри каждого этапа показано, где я могу проходить практику, какие задачи беру и какие full-stack навыки прокачиваю.</p>
          <div class="course-tabs" role="tablist" aria-label="выбор курса">${courseTabs}</div>
          <div class="course-detail ${activeCourse.theme}" id="courseDetail">
            <div class="course-stage-head">
              <span>${escapeHtml(activeCourse.number)}</span>
              <h3>${escapeHtml(activeCourse.title)}</h3>
              <p>${escapeHtml(activeCourse.description)}</p>
            </div>
            <div class="feature-grid course-card-grid">
              ${renderCards(activeCourse.cards, "feature-card")}
            </div>
          </div>
        </section>
      `;
    }

    // Контент вкладки "Проекты".
    function renderProjects() {
      const projects = [
        { label: "portfolio", title: "Личное портфолио", text: "Сайт с вкладками, описанием навыков, планом по курсам и визуальным стилем под игровое меню." },
        { label: "spa", title: "Full-stack SPA", text: "Приложение на React с авторизацией, личным кабинетом, API и сохранением данных в базе." },
        { label: "api", title: "REST API сервис", text: "Backend на Node.js/Express: маршруты, контроллеры, валидация, база данных и документация." },
        { label: "final", title: "Выпускной продукт", text: "Итоговый проект, который можно защитить, задеплоить и добавить в резюме как полноценный кейс." }
      ];

      return `
        <section class="portfolio-screen">
          <p class="lead-copy">Проекты нужны не для галочки, а чтобы показать: я могу взять идею, собрать интерфейс, написать логику и объяснить, как всё работает.</p>
          <div class="project-grid">${renderCards(projects, "project-card")}</div>
        </section>
      `;
    }

    // Меняет HTML правой панели с плавным исчезновением и появлением нового контента.
    function setAnimatedContent(html, afterRender) {
      clearTimeout(contentTransitionTimer);

      const applyContent = () => {
        contentRoot.innerHTML = html;
        contentRoot.scrollTop = 0;
        requestAnimationFrame(() => {
          contentRoot.classList.remove("is-switching");
          if (afterRender) afterRender();
        });
      };

      if (!contentRoot.innerHTML) {
        applyContent();
        return;
      }

      contentRoot.classList.add("is-switching");
      contentTransitionTimer = setTimeout(applyContent, 150);
    }

    // Главная функция перерисовки: обновляет заголовки, левую панель, активные кнопки и контент.
    function renderCurrentTab(afterRender) {
      const tab = portfolioTabs.find((item) => item.id === currentTab) || portfolioTabs[0];
      const activeCourse = courseDetails.find((course) => course.id === currentCourse) || courseDetails[0];
      sectionKicker.textContent = tab.kicker;
      sectionTitle.textContent = tab.title;
      courseLabel.textContent = tab.course;
      focusLabel.textContent = tab.focus;
      statusLine.textContent = tab.status;

      if (tab.id === "courses") {
        sectionTitle.textContent = "Курс";
        courseLabel.textContent = activeCourse.number.replace(" курс", "");
        focusLabel.textContent = activeCourse.focus;
        statusLine.textContent = `${activeCourse.number}: ${activeCourse.title.toLowerCase()}`;
      }

      document.querySelectorAll(".filter-btn").forEach((button) => {
        const isActive = button.dataset.tab === tab.id;
        button.classList.toggle("active", isActive);
        button.setAttribute("aria-selected", String(isActive));
      });

      let nextContent;
      if (tab.id === "skills") {
        nextContent = renderSkills();
      } else if (tab.id === "courses") {
        nextContent = renderCourses();
      } else if (tab.id === "projects") {
        nextContent = renderProjects();
      } else {
        nextContent = renderAbout();
      }

      setAnimatedContent(nextContent, afterRender);
    }

    // Обработка кликов по основным вкладкам слева.
    function initTabs() {
      tabContainer.addEventListener("click", (event) => {
        const button = event.target.closest(".filter-btn");
        if (!button || !tabContainer.contains(button)) return;
        currentTab = button.dataset.tab;
        renderCurrentTab();
      });
    }

    // Обработка кликов по под-вкладкам курса и плавная прокрутка к выбранному блоку.
    function initCourseTabs() {
      contentRoot.addEventListener("click", (event) => {
        const button = event.target.closest(".course-tab");
        if (!button || !contentRoot.contains(button)) return;

        currentCourse = button.dataset.course;
        renderCurrentTab(() => {
          const activeButton = contentRoot.querySelector(`.course-tab[data-course="${currentCourse}"]`);
          const detail = document.getElementById("courseDetail");
          activeButton?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
          detail?.scrollIntoView({ behavior: "smooth", block: "nearest" });
        });
      });
    }

    function initContactPopup() {
      if (!contactButton || !contactPopup) return;

      function setOpen(isOpen) {
        contactButton.setAttribute("aria-expanded", String(isOpen));
        contactPopup.setAttribute("aria-hidden", String(!isOpen));
        contactPopup.classList.toggle("is-open", isOpen);
      }

      contactButton.addEventListener("click", (event) => {
        event.stopPropagation();
        setOpen(!contactPopup.classList.contains("is-open"));
      });

      contactPopup.addEventListener("click", (event) => {
        event.stopPropagation();
      });

      document.addEventListener("click", () => {
        setOpen(false);
      });

      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          setOpen(false);
        }
      });
    }

    // Кастомный курсор: плавно догоняет мышь, увеличивается над кнопками и сжимается при клике.
    function initCursor() {
      const cursor = document.getElementById("cursorDot");
      if (!cursor || !window.matchMedia("(pointer: fine)").matches) return;

      let targetX = window.innerWidth / 2;
      let targetY = window.innerHeight / 2;
      let currentX = targetX;
      let currentY = targetY;

      document.body.classList.add("cursor-ready");

      function moveCursor() {
        currentX += (targetX - currentX) * 0.28;
        currentY += (targetY - currentY) * 0.28;
        cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
        requestAnimationFrame(moveCursor);
      }

      window.addEventListener("mousemove", (event) => {
        targetX = event.clientX;
        targetY = event.clientY;
        cursor.classList.add("active");
      });

      window.addEventListener("mouseleave", () => {
        cursor.classList.remove("active");
      });

      window.addEventListener("mousedown", () => {
        cursor.classList.add("press");
      });

      window.addEventListener("mouseup", () => {
        cursor.classList.remove("press");
      });

      document.addEventListener("mouseover", (event) => {
        if (event.target.closest("button, a, input, label")) {
          cursor.classList.add("link");
        }
      });

      document.addEventListener("mouseout", (event) => {
        if (event.target.closest("button, a, input, label")) {
          cursor.classList.remove("link");
        }
      });

      moveCursor();
    }

    // Создает фоновые частицы-снежинки и задает им случайное движение.
    function initSnow() {
      const snow = document.getElementById("snow");
      const flakes = Array.from({ length: 46 }, (_, index) => {
        const flake = document.createElement("i");
        flake.style.setProperty("--x", `${Math.random() * 100}vw`);
        flake.style.setProperty("--sway", `${(Math.random() * 12 - 6).toFixed(2)}vw`);
        flake.style.setProperty("--duration", `${8 + Math.random() * 12}s`);
        flake.style.setProperty("--delay", `${-1 * Math.random() * 16}s`);
        flake.style.setProperty("--alpha", `${0.25 + Math.random() * 0.65}`);
        flake.style.width = `${index % 7 === 0 ? 4 : 2 + Math.random() * 2}px`;
        flake.style.height = flake.style.width;
        return flake;
      });
      snow.append(...flakes);
    }

    // Старт приложения: сначала рисуем контент, потом подключаем клики, курсор и частицы.
    renderCurrentTab();
    initTabs();
    initCourseTabs();
    initContactPopup();
    initCursor();
    initSnow();
