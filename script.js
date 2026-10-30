// Данные для примеров на сайте
window.guideContent = {
  files: {
    readme: '<h3>Hello, world 👋</h3><p>Мой первый проект на GitHub.</p><h4>Что здесь будет?</h4><ul><li>Идеи и заметки</li><li>Первые строки кода</li><li>История маленьких улучшений</li></ul><p class="file-explanation">README.md — знакомство с проектом. Формат Markdown помогает добавлять заголовки, списки и ссылки.</p>',
    html: '<pre>&lt;!doctype html&gt;\n&lt;html lang="ru"&gt;\n  &lt;head&gt;\n    &lt;title&gt;Мой проект&lt;/title&gt;\n  &lt;/head&gt;\n  &lt;body&gt;\n    &lt;h1&gt;Привет, GitHub!&lt;/h1&gt;\n  &lt;/body&gt;\n&lt;/html&gt;</pre><p class="file-explanation">index.html — разметка страницы. Коммит сохранит изменения в этом файле в истории проекта.</p>',
    css: '<pre>body {\n  font-family: sans-serif;\n  background: #0c1013;\n  color: #abedc8;\n}\n\nh1 {\n  font-size: 48px;\n}</pre><p class="file-explanation">styles.css — стили страницы. В репозитории удобно хранить файлы в отдельных папках.</p>',
    ignore: '<pre># Локальные зависимости\nnode_modules/\n\n# Секреты окружения\n.env\n\n# Файлы журналов\n*.log</pre><p class="file-explanation">.gitignore подсказывает Git, какие ещё не отслеживаемые файлы не нужно добавлять. Уже отслеживаемые файлы он не удаляет из истории.</p>'
  },
  steps: [
    { title: 'Дайте идее свою ветку.', description: 'Создайте ветку от актуальной main. В ней можно менять код и пробовать идеи, пока основная ветка продолжает жить своей жизнью.', command: 'git switch -c feature/hello', caption: 'Одна идея — отдельная ветка', point: [155,45] },
    { title: 'Сохраните понятный шаг.', description: 'Добавьте нужные изменения в индекс и создайте коммит. Короткое сообщение объяснит вам и команде, что именно изменилось. Затем отправьте ветку на GitHub.', command: 'git add README.md\ngit commit -m "Update README"\ngit push -u origin feature/hello', caption: 'Каждый коммит — часть истории', point: [205,45] },
    { title: 'Предложите изменение.', description: 'В GitHub откройте pull request из своей ветки в main. Опишите, что вы сделали и зачем. Здесь команда увидит разницу между версиями.', command: 'GitHub → Pull requests → New pull request', caption: 'Pull request открывает обсуждение', point: [255,45] },
    { title: 'Посмотрите свежим взглядом.', description: 'Участники читают код, оставляют комментарии и предлагают улучшения. Новые коммиты в той же ветке автоматически дополняют открытый pull request.', command: 'Files changed → Review changes', caption: 'Комментарии помогают улучшить решение', point: [255,45] },
    { title: 'Объедините результат.', description: 'После обсуждения и необходимых проверок объедините pull request. Изменения попадут в main, а завершённую рабочую ветку можно удалить.', command: 'Merge pull request → Confirm merge', caption: 'Изменение становится частью main', point: [335,125] }
  ],
  commands: [
    { command: 'git clone <url>', description: 'Скопировать репозиторий на компьютер' },
    { command: 'git status', description: 'Посмотреть состояние файлов и текущей ветки' },
    { command: 'git switch -c feature/hello', description: 'Создать ветку и переключиться в неё' },
    { command: 'git add README.md', description: 'Подготовить изменения файла к коммиту' },
    { command: 'git commit -m "Update README"', description: 'Зафиксировать подготовленные изменения' },
    { command: 'git push -u origin feature/hello', description: 'Отправить новую ветку на GitHub и связать её с удалённой' },
    { command: 'git pull', description: 'Получить и интегрировать изменения отслеживаемой ветки' },
    { command: 'git log --oneline', description: 'Посмотреть краткую историю коммитов' }
  ],
  questions: [
    { title: 'Для чего нужен коммит?', options: ['Сохранить зафиксированный шаг изменений', 'Удалить репозиторий', 'Создать аккаунт'], answer: 0, explanation: 'Коммит фиксирует подготовленные изменения в истории Git. Сообщение помогает понять их смысл.' },
    { title: 'Где обсуждают изменение перед слиянием?', options: ['В .gitignore', 'В pull request', 'В названии репозитория'], answer: 1, explanation: 'В pull request сравнивают ветки, обсуждают код, проводят ревью и смотрят результаты проверок.' },
    { title: 'Что запускает workflow GitHub Actions?', options: ['Только открытие сайта GitHub', 'Любое сохранение файла на компьютере', 'Настроенное событие, например push'], answer: 2, explanation: 'Workflow запускается по указанному событию: например push, pull_request, расписанию или ручному запуску, если он настроен.' }
  ]
};


// Переключение вкладок и кнопки
(() => {
  'use strict';
  const content = window.guideContent;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const pages = $$('.page-panel');
  const titles = { overview: 'Обзор', repositories: 'Репозитории', workflow: 'В команде', actions: 'Автоматизация', practice: 'Практика' };
  const nav = $('#navigation');
  const menu = $('.menu-toggle');
  let previousPage;

  function showPage() {
    const hash = location.hash.slice(1);
    if (hash === 'main' && previousPage) return;
    const id = Object.hasOwn(titles, hash) ? hash : 'overview';
    pages.forEach(page => { page.hidden = page.id !== id; });
    $$('[data-nav]').forEach(link => {
      const active = link.dataset.nav === id;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'page'); else link.removeAttribute('aria-current');
    });
    $('.header-cta').setAttribute('aria-current', id === 'practice' ? 'page' : 'false');
    document.title = `${titles[id]} — GitHub Guide`;
    nav.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', 'Открыть меню');
    if (previousPage && previousPage !== id) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      const heading = $(`#${id} h1`);
      heading.setAttribute('tabindex', '-1');
      heading.focus({ preventScroll: true });
    }
    previousPage = id;
  }
  window.addEventListener('hashchange', showPage);
  showPage();
  menu.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', 'Открыть меню'); }
  });

  let toastTimer;
  function toast(message) {
    clearTimeout(toastTimer);
    $('#toast').textContent = message;
    $('#toast').classList.add('visible');
    toastTimer = setTimeout(() => $('#toast').classList.remove('visible'), 2600);
  }
  async function copy(text) {
    try {
      if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(text);
      else {
        const input = document.createElement('textarea');
        input.value = text; input.style.position = 'fixed'; input.style.opacity = '0';
        ($('#cheatsheet').open ? $('#cheatsheet') : document.body).append(input);
        input.select();
        const success = document.execCommand('copy');
        input.remove();
        if (!success) throw new Error('Clipboard unavailable');
      }
      toast('Скопировано в буфер обмена');
    } catch { toast('Копирование недоступно. Выделите текст и нажмите Ctrl+C.'); }
  }
  document.addEventListener('click', event => {
    const button = event.target.closest('[data-copy], [data-copy-id]');
    if (button) copy(button.dataset.copy ?? document.getElementById(button.dataset.copyId).textContent);
  });

  function openFile(name) {
    if (!Object.hasOwn(content.files, name)) return;
    $('#file-preview').innerHTML = content.files[name];
    $$('[data-file]').forEach(button => {
      const selected = button.dataset.file === name;
      button.classList.toggle('active', selected); button.setAttribute('aria-pressed', String(selected));
    });
  }
  $$('[data-file]').forEach(button => button.addEventListener('click', () => openFile(button.dataset.file)));
  openFile('readme');

  let currentStep = 0;
  function setStep(index) {
    currentStep = index;
    const step = content.steps[index];
    $$('[data-step]').forEach(button => {
      const selected = Number(button.dataset.step) === index;
      button.classList.toggle('active', selected); button.setAttribute('aria-pressed', String(selected));
    });
    $('#step-eyebrow').textContent = `ШАГ 0${index + 1}`;
    $('#step-title').textContent = step.title;
    $('#step-description').textContent = step.description;
    $('#step-command').textContent = step.command;
    $('#step-command').style.whiteSpace = 'pre-wrap';
    $('.diagram-caption').textContent = step.caption;
    $('.focus-node').setAttribute('cx', step.point[0]);
    $('.focus-node').setAttribute('cy', step.point[1]);
    $('#copy-step').setAttribute('aria-label', index > 1 ? 'Скопировать путь в интерфейсе GitHub' : 'Скопировать команды шага');
  }
  $$('[data-step]').forEach(button => button.addEventListener('click', () => setStep(Number(button.dataset.step))));
  $('#copy-step').addEventListener('click', () => copy(content.steps[currentStep].command));
  setStep(0);

  const dialog = $('#cheatsheet');
  function renderCommands(query = '') {
    const items = content.commands.filter(item => `${item.command} ${item.description}`.toLowerCase().includes(query.trim().toLowerCase()));
    const list = $('#command-list');
    list.replaceChildren();
    items.forEach(item => {
      const row = document.createElement('div'); row.className = 'command-item';
      const text = document.createElement('div');
      const code = document.createElement('code'); code.textContent = item.command;
      const description = document.createElement('p'); description.textContent = item.description;
      const button = document.createElement('button'); button.className = 'copy-button'; button.textContent = '⧉';
      button.dataset.copy = item.command; button.setAttribute('aria-label', `Скопировать ${item.command}`);
      text.append(code, description); row.append(text, button); list.append(row);
    });
    if (!items.length) { const empty = document.createElement('p'); empty.className = 'no-results'; empty.textContent = 'Команда не найдена. Попробуйте другой запрос.'; list.append(empty); }
  }
  $$('[data-open-cheatsheet]').forEach(button => button.addEventListener('click', () => {
    $('#command-search').value = ''; renderCommands(); dialog.showModal(); $('#command-search').focus();
  }));
  $('.close-dialog').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const bounds = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
  });
  $('#command-search').addEventListener('input', event => renderCommands(event.target.value));

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  $('#run-workflow').addEventListener('click', async () => {
    const button = $('#run-workflow');
    if (button.disabled) return;
    button.disabled = true; button.textContent = 'Выполняется…';
    $('#run-status').textContent = '◌ Workflow выполняется';
    $('#run-output').textContent = '> Событие: push в main\n> Запуск учебного workflow…';
    const steps = $$('[data-run-step]');
    steps.forEach(step => { step.className = ''; $('span', step).textContent = '○'; $('small', step).textContent = '—'; });
    for (let index = 0; index < steps.length; index++) {
      const step = steps[index]; step.classList.add('running'); $('span', step).textContent = '◌';
      await sleep(850);
      step.classList.remove('running'); step.classList.add('complete'); $('span', step).textContent = '✓'; $('small', step).textContent = 'готово';
      if (index === 0) $('#run-output').textContent += '\n✓ Runner подготовлен';
      if (index === 1) $('#run-output').textContent += '\n$ echo "Hello, GitHub!"\nHello, GitHub!';
    }
    $('#run-output').textContent += '\n✓ Задание завершено успешно';
    $('#run-status').textContent = '✓ Все шаги выполнены';
    button.disabled = false; button.textContent = '↻ Запустить ещё раз';
  });

  const storageKey = 'github-guide-progress-v1';
  const tasks = $$('[data-task]');
  let saved = {};
  try { const parsed = JSON.parse(localStorage.getItem(storageKey) || '{}'); if (parsed && typeof parsed === 'object') saved = parsed; } catch { /* Storage may be restricted. The checklist remains usable. */ }
  tasks.forEach(task => { task.checked = saved[task.dataset.task] === true; });
  function updateProgress(persist = true) {
    const count = tasks.filter(task => task.checked).length;
    $('#progress-count').textContent = `${count} / ${tasks.length}`;
    $('#progress-fill').style.width = `${count / tasks.length * 100}%`;
    $('#progress-message').textContent = count === tasks.length ? 'Всё получилось! Теперь у вашей идеи есть своя история.' : 'Маленькие шаги тоже двигают проект вперёд.';
    if (persist) try { localStorage.setItem(storageKey, JSON.stringify(Object.fromEntries(tasks.map(task => [task.dataset.task, task.checked])))); } catch { /* Keep progress in memory for this visit. */ }
  }
  tasks.forEach(task => task.addEventListener('change', () => updateProgress()));
  $('#reset-progress').addEventListener('click', () => { tasks.forEach(task => { task.checked = false; }); updateProgress(); toast('Прогресс сброшен'); });
  updateProgress(false);

  content.questions.forEach((question, index) => {
    const card = document.createElement('div'); card.className = 'quiz-card';
    const heading = document.createElement('h3'); heading.id = `question-${index}`;
    const number = document.createElement('span'); number.className = 'quiz-number'; number.textContent = `0${index + 1}`;
    heading.append(number, document.createTextNode(question.title));
    const options = document.createElement('div'); options.className = 'quiz-options'; options.setAttribute('role', 'group'); options.setAttribute('aria-labelledby', heading.id);
    const feedback = document.createElement('p'); feedback.className = 'quiz-feedback'; feedback.setAttribute('aria-live', 'polite');
    question.options.forEach((option, optionIndex) => {
      const button = document.createElement('button'); button.className = 'quiz-option'; button.textContent = option;
      button.addEventListener('click', () => {
        $$('.quiz-option', options).forEach(item => { item.classList.remove('correct', 'wrong'); item.setAttribute('aria-pressed', 'false'); });
        const correct = question.answer === optionIndex;
        button.classList.add(correct ? 'correct' : 'wrong'); button.setAttribute('aria-pressed', 'true');
        feedback.textContent = (correct ? '✓ Верно! ' : 'Попробуйте ещё раз. ') + (correct ? question.explanation : 'Подсказку можно найти в предыдущих главах.');
      });
      options.append(button);
    });
    card.append(heading, options, feedback); $('#quiz').append(card);
  });
})();
