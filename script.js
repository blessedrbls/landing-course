/* ==========================================================
   Python з нуля за 8 тижнів — landing page logic
   - i18n (uk / en), all texts live in the I18N object below
   - countdown timer
   - accordions (program, FAQ)
   - scroll reveal animations
   - signup form validation (no backend)
   ========================================================== */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     Course start date — change it here, everything else
     (countdown, hero badge) updates automatically.
     ---------------------------------------------------------- */
  const COURSE_START = '2026-12-07T19:00:00+02:00';

  const DEFAULT_LANG = 'uk';
  const STORAGE_KEY = 'pystart-lang';
  const DEV_LINK = '<a href="https://t.me/nonelyyo" target="_blank" rel="noopener">@nonelyyo</a>';

  /* ----------------------------------------------------------
     Texts
     ---------------------------------------------------------- */
  const I18N = {
    uk: {
      meta: {
        title: 'Python з нуля за 8 тижнів — онлайн-курс',
        description: 'Онлайн-курс Python для початківців: 8 тижнів, практика щотижня та власний проєкт у портфоліо.'
      },
      nav: {
        audience: 'Для кого',
        program: 'Програма',
        teacher: 'Викладач',
        pricing: 'Тарифи',
        reviews: 'Відгуки',
        faq: 'FAQ',
        cta: 'Записатися'
      },
      hero: {
        badge: 'Старт {date} · онлайн',
        title: 'Python з нуля <mark>за 8 тижнів</mark>',
        subtitle: 'Від першого рядка коду до власного проєкту в портфоліо. Живі заняття двічі на тиждень, практика після кожної теми та відповіді на всі запитання.',
        cta: 'Записатися на курс',
        secondary: 'Дивитися програму',
        chipWeeks: 'тижнів<br>навчання',
        chipTasks: 'практичних<br>завдань'
      },
      countdown: {
        label: 'До старту курсу залишилось:',
        started: 'Курс уже стартував — приєднуйтесь до наступного потоку',
        days: 'днів',
        hours: 'годин',
        minutes: 'хвилин',
        seconds: 'секунд'
      },
      code: {
        comment: '# Ваша перша програма',
        string: 'f"Привіт, {name}!"',
        loop: 'f"Тиждень {week}: готово"',
        name: '"світе"',
        output: 'Привіт, світе!'
      },
      marquee: ['Python з нуля', '8 тижнів', '16 живих занять', '40+ завдань', 'Власний проєкт', 'Підтримка ментора'],
      stats: [
        { value: '8', label: 'тижнів' },
        { value: '16', label: 'живих занять' },
        { value: '40+', label: 'практичних завдань' },
        { value: '1', label: 'проєкт у портфоліо' }
      ],
      audience: {
        eyebrow: 'Для кого',
        title: 'Кому підійде цей курс',
        lead: 'Досвід програмування не потрібен. Достатньо ноутбука та 6–8 годин на тиждень.',
        cards: [
          { icon: 'seed', title: 'Новачкам', text: 'Ніколи не писали код і не знаєте, з чого почати. Пояснюємо просто, без зайвої теорії.' },
          { icon: 'swap', title: 'Тим, хто змінює професію', text: 'Хочете перейти в IT і шукаєте зрозумілий перший крок із результатом у портфоліо.' },
          { icon: 'cap', title: 'Студентам', text: 'Потрібна практична навичка для навчання, диплома чи першого стажування.' },
          { icon: 'chart', title: 'Аналітикам і менеджерам', text: 'Втомилися від рутини в таблицях і хочете автоматизувати звіти та обробку даних.' }
        ]
      },
      program: {
        eyebrow: 'Програма',
        title: '8 тижнів — 8 кроків до результату',
        lead: 'Кожен тиждень: два живих заняття, домашнє завдання та розбір типових помилок.',
        cta: 'Записатися на курс',
        week: 'Тиждень',
        weeks: [
          { title: 'Знайомство з Python', text: 'Встановлюємо все потрібне, розбираємося, як працює програма, і пишемо перші рядки коду.', topics: ['Встановлення Python і VS Code', 'Змінні та типи даних', 'Введення й виведення', 'Перша програма'] },
          { title: 'Умови та цикли', text: 'Вчимо програму ухвалювати рішення та повторювати дії стільки разів, скільки потрібно.', topics: ['if / elif / else', 'for та while', 'Логічні оператори', 'Мінігра «Вгадай число»'] },
          { title: 'Структури даних', text: 'Зберігаємо та обробляємо набори даних: від списку покупок до телефонної книги.', topics: ['Списки й кортежі', 'Словники та множини', 'Зрізи', 'List comprehension'] },
          { title: 'Функції та модулі', text: 'Розбиваємо код на зрозумілі частини, які легко перевикористовувати й тестувати.', topics: ['Аргументи та return', 'Область видимості', 'Імпорт модулів', 'Стандартна бібліотека'] },
          { title: 'Файли та помилки', text: 'Читаємо й записуємо дані, а також вчимося не боятися червоного тексту в консолі.', topics: ['Текстові файли', 'JSON і CSV', 'try / except', 'Налагодження коду'] },
          { title: 'Основи ООП', text: 'Знайомимося з класами та об’єктами — на них побудована більшість реальних проєктів.', topics: ['Класи й об’єкти', 'Методи та атрибути', 'Наслідування', 'Практика: модель магазину'] },
          { title: 'Бібліотеки та API', text: 'Підключаємо готові інструменти й отримуємо дані з інтернету: погода, курси валют, боти.', topics: ['pip і віртуальні середовища', 'Бібліотека requests', 'Робота з API', 'Простий Telegram-бот'] },
          { title: 'Фінальний проєкт', text: 'Створюєте власний проєкт із ревʼю від викладача, викладаєте його на GitHub і презентуєте групі.', topics: ['Планування проєкту', 'Git і GitHub', 'Код-ревʼю', 'Презентація та сертифікат'] }
        ]
      },
      teacher: {
        eyebrow: 'Викладач',
        name: 'Олексій Гончаренко',
        role: 'Senior Python Developer, ментор',
        bio: 'Дев’ять років пише на Python: від стартапів до фінтех-продуктів із мільйонами користувачів. Останні чотири роки навчає початківців і вміє пояснити складне на простих життєвих прикладах.',
        tag: 'років<br>у Python',
        alt: 'Портрет викладача курсу',
        facts: ['600+ випускників за 4 роки викладання', 'Проводить технічні співбесіди та знає, що питають у джунів', 'Особисто перевіряє фінальні проєкти']
      },
      pricing: {
        eyebrow: 'Тарифи',
        title: 'Оберіть свій формат навчання',
        lead: 'Програма однакова для всіх. Різниця — у рівні підтримки.',
        popular: 'Найпопулярніший',
        per: 'за весь курс',
        choose: 'Обрати тариф',
        currency: '₴',
        plans: [
          { id: 'basic', name: 'Базовий', price: '4 900', desc: 'Для тих, хто звик вчитися самостійно.', features: ['Записи всіх 16 занять', 'Практичні завдання з автоперевіркою', 'Доступ до матеріалів на 6 місяців', 'Спільний чат групи'] },
          { id: 'standard', name: 'Стандарт', price: '8 900', desc: 'Живе навчання зі зворотним зв’язком.', features: ['Усе з тарифу «Базовий»', 'Живі заняття двічі на тиждень', 'Перевірка домашніх завдань ментором', 'Ревʼю фінального проєкту', 'Сертифікат про проходження'] },
          { id: 'premium', name: 'Преміум', price: '14 900', desc: 'Максимум уваги та допомога зі стартом кар’єри.', features: ['Усе з тарифу «Стандарт»', '4 індивідуальні консультації', 'Допомога з резюме та GitHub', 'Тренувальна співбесіда', 'Безстроковий доступ до матеріалів'] }
        ]
      },
      reviews: {
        eyebrow: 'Відгуки',
        title: 'Що кажуть випускники',
        items: [
          { name: 'Марина К.', role: 'бухгалтерка → QA-інженерка', text: 'Боялася, що програмування — це не моє. На третьому тижні вже написала скрипт, який звіряє звіти замість мене. Пояснення дуже людяні.' },
          { name: 'Дмитро С.', role: 'студент 2-го курсу', text: 'В університеті Python давали сухо й швидко. Тут нарешті все склалося в голові, а фінальний проєкт — Telegram-бот — я показав на співбесіді на стажування.' },
          { name: 'Ірина В.', role: 'маркетологиня', text: 'Найцінніше — перевірка домашніх завдань. Ментор не просто каже «неправильно», а показує, як зробити краще. Тепер автоматизую аналітику сама.' }
        ]
      },
      faq: {
        eyebrow: 'FAQ',
        title: 'Часті запитання',
        items: [
          { q: 'Чи потрібен досвід програмування?', a: 'Ні. Курс розрахований на повних початківців: починаємо зі встановлення Python і рухаємося крок за кроком.' },
          { q: 'Скільки часу потрібно приділяти навчанню?', a: 'У середньому 6–8 годин на тиждень: два заняття по 1,5 години та практика у зручний для вас час.' },
          { q: 'Що робити, якщо я пропущу заняття?', a: 'Нічого страшного — запис з’являється в особистому кабінеті того ж вечора, а запитання можна поставити в чаті групи.' },
          { q: 'Який компʼютер потрібен?', a: 'Підійде будь-який ноутбук або ПК на Windows, macOS чи Linux, випущений за останні 7–8 років. Усі програми безкоштовні.' },
          { q: 'Чи можна повернути кошти?', a: 'Так. Якщо протягом перших 14 днів ви зрозумієте, що курс вам не підходить, повернемо повну суму без зайвих запитань.' }
        ]
      },
      signup: {
        eyebrow: 'Заявка',
        title: 'Забронюйте місце на курсі',
        lead: 'Залиште контакти — менеджер звʼяжеться з вами протягом дня, відповість на запитання та допоможе з оплатою.',
        points: ['Група до 25 людей', 'Оплата частинами без переплат', 'Повернення коштів протягом 14 днів']
      },
      form: {
        name: 'Імʼя',
        namePh: 'Як до вас звертатися?',
        email: 'Email',
        phone: 'Телефон',
        plan: 'Тариф',
        planPlaceholder: 'Оберіть тариф',
        submit: 'Надіслати заявку',
        note: 'Це демо-форма: дані нікуди не надсилаються.',
        successTitle: 'Заявку прийнято!',
        successText: 'Дякуємо, {name}! Ми звʼяжемося з вами найближчим часом щодо тарифу «{plan}».',
        again: 'Надіслати ще одну заявку',
        errors: {
          nameRequired: 'Вкажіть ваше імʼя',
          nameShort: 'Імʼя має містити щонайменше 2 літери',
          emailRequired: 'Вкажіть email',
          emailInvalid: 'Перевірте формат: name@example.com',
          phoneRequired: 'Вкажіть номер телефону',
          phoneInvalid: 'Введіть коректний номер, наприклад +380 67 123 45 67',
          planRequired: 'Оберіть тариф'
        }
      },
      footer: {
        tagline: 'Онлайн-школа програмування для початківців',
        disclaimer: 'Сайт є демонстраційним. Курс, викладач, ціни та відгуки вигадані.',
        credit: 'Демо-проєкт. Сайт розробив ' + DEV_LINK
      }
    },

    en: {
      meta: {
        title: 'Python from Scratch in 8 Weeks — online course',
        description: 'An online Python course for beginners: 8 weeks, weekly practice and your own portfolio project.'
      },
      nav: {
        audience: 'Who it’s for',
        program: 'Curriculum',
        teacher: 'Instructor',
        pricing: 'Pricing',
        reviews: 'Reviews',
        faq: 'FAQ',
        cta: 'Enroll'
      },
      hero: {
        badge: 'Starts {date} · online',
        title: 'Python from scratch <mark>in 8 weeks</mark>',
        subtitle: 'From your first line of code to a project in your portfolio. Live classes twice a week, practice after every topic and answers to all your questions.',
        cta: 'Enroll in the course',
        secondary: 'View curriculum',
        chipWeeks: 'weeks of<br>learning',
        chipTasks: 'practice<br>tasks'
      },
      countdown: {
        label: 'Course starts in:',
        started: 'The course has started — join the next cohort',
        days: 'days',
        hours: 'hours',
        minutes: 'minutes',
        seconds: 'seconds'
      },
      code: {
        comment: '# Your first program',
        string: 'f"Hello, {name}!"',
        loop: 'f"Week {week}: done"',
        name: '"world"',
        output: 'Hello, world!'
      },
      marquee: ['Python from scratch', '8 weeks', '16 live classes', '40+ tasks', 'Your own project', 'Mentor support'],
      stats: [
        { value: '8', label: 'weeks' },
        { value: '16', label: 'live classes' },
        { value: '40+', label: 'practice tasks' },
        { value: '1', label: 'portfolio project' }
      ],
      audience: {
        eyebrow: 'Who it’s for',
        title: 'Who this course is for',
        lead: 'No coding experience needed. Just a laptop and 6–8 hours a week.',
        cards: [
          { icon: 'seed', title: 'Complete beginners', text: 'You have never written code and don’t know where to start. We explain things simply, without extra theory.' },
          { icon: 'swap', title: 'Career changers', text: 'You want to move into tech and need a clear first step with a real project to show.' },
          { icon: 'cap', title: 'Students', text: 'You need a practical skill for your studies, thesis or first internship.' },
          { icon: 'chart', title: 'Analysts and managers', text: 'You are tired of spreadsheet routine and want to automate reports and data processing.' }
        ]
      },
      program: {
        eyebrow: 'Curriculum',
        title: '8 weeks — 8 steps to the result',
        lead: 'Every week: two live classes, homework and a review of common mistakes.',
        cta: 'Enroll in the course',
        week: 'Week',
        weeks: [
          { title: 'Meet Python', text: 'We install everything you need, see how a program works and write the first lines of code.', topics: ['Installing Python and VS Code', 'Variables and data types', 'Input and output', 'Your first program'] },
          { title: 'Conditions and loops', text: 'We teach the program to make decisions and repeat actions as many times as needed.', topics: ['if / elif / else', 'for and while', 'Logical operators', 'Mini-game “Guess the number”'] },
          { title: 'Data structures', text: 'We store and process collections of data: from a shopping list to a phone book.', topics: ['Lists and tuples', 'Dictionaries and sets', 'Slicing', 'List comprehension'] },
          { title: 'Functions and modules', text: 'We split code into clear pieces that are easy to reuse and test.', topics: ['Arguments and return', 'Scope', 'Importing modules', 'Standard library'] },
          { title: 'Files and errors', text: 'We read and write data, and learn not to fear red text in the console.', topics: ['Text files', 'JSON and CSV', 'try / except', 'Debugging'] },
          { title: 'OOP basics', text: 'We get to know classes and objects — most real-world projects are built on them.', topics: ['Classes and objects', 'Methods and attributes', 'Inheritance', 'Practice: a shop model'] },
          { title: 'Libraries and APIs', text: 'We plug in ready-made tools and fetch data from the internet: weather, exchange rates, bots.', topics: ['pip and virtual environments', 'The requests library', 'Working with APIs', 'A simple Telegram bot'] },
          { title: 'Final project', text: 'You build your own project with the instructor’s review, publish it on GitHub and present it to the group.', topics: ['Project planning', 'Git and GitHub', 'Code review', 'Presentation and certificate'] }
        ]
      },
      teacher: {
        eyebrow: 'Instructor',
        name: 'Oleksii Honcharenko',
        role: 'Senior Python Developer, mentor',
        bio: 'Nine years of writing Python: from startups to fintech products with millions of users. For the last four years he has been teaching beginners and knows how to explain complex things with simple everyday examples.',
        tag: 'years<br>in Python',
        alt: 'Portrait of the course instructor',
        facts: ['600+ graduates in 4 years of teaching', 'Runs technical interviews and knows what juniors get asked', 'Reviews every final project personally']
      },
      pricing: {
        eyebrow: 'Pricing',
        title: 'Choose your learning format',
        lead: 'The curriculum is the same for everyone. The difference is the level of support.',
        popular: 'Most popular',
        per: 'for the whole course',
        choose: 'Choose plan',
        currency: '₴',
        plans: [
          { id: 'basic', name: 'Basic', price: '4,900', desc: 'For those who are used to learning on their own.', features: ['Recordings of all 16 classes', 'Auto-checked practice tasks', '6 months of access to materials', 'Group chat'] },
          { id: 'standard', name: 'Standard', price: '8,900', desc: 'Live learning with feedback.', features: ['Everything in Basic', 'Live classes twice a week', 'Homework reviewed by a mentor', 'Final project review', 'Certificate of completion'] },
          { id: 'premium', name: 'Premium', price: '14,900', desc: 'Maximum attention and help with starting your career.', features: ['Everything in Standard', '4 one-on-one consultations', 'Help with your CV and GitHub', 'Mock interview', 'Lifetime access to materials'] }
        ]
      },
      reviews: {
        eyebrow: 'Reviews',
        title: 'What graduates say',
        items: [
          { name: 'Maryna K.', role: 'accountant → QA engineer', text: 'I was afraid programming wasn’t for me. By week three I had written a script that reconciles reports for me. The explanations are very human.' },
          { name: 'Dmytro S.', role: 'second-year student', text: 'At university Python was taught dry and fast. Here it finally clicked, and I showed my final project — a Telegram bot — at an internship interview.' },
          { name: 'Iryna V.', role: 'marketer', text: 'The most valuable part is the homework review. The mentor doesn’t just say “wrong” — they show how to do it better. Now I automate my analytics myself.' }
        ]
      },
      faq: {
        eyebrow: 'FAQ',
        title: 'Frequently asked questions',
        items: [
          { q: 'Do I need programming experience?', a: 'No. The course is designed for complete beginners: we start with installing Python and move step by step.' },
          { q: 'How much time do I need per week?', a: 'About 6–8 hours a week on average: two 1.5-hour classes plus practice whenever it suits you.' },
          { q: 'What if I miss a class?', a: 'No problem — the recording appears in your account the same evening, and you can ask questions in the group chat.' },
          { q: 'What computer do I need?', a: 'Any laptop or PC with Windows, macOS or Linux made in the last 7–8 years will do. All the software is free.' },
          { q: 'Can I get a refund?', a: 'Yes. If you realise within the first 14 days that the course isn’t for you, we refund the full amount, no questions asked.' }
        ]
      },
      signup: {
        eyebrow: 'Application',
        title: 'Reserve your spot',
        lead: 'Leave your contacts — a manager will get in touch within a day, answer your questions and help with payment.',
        points: ['Groups of up to 25 people', 'Pay in instalments at no extra cost', '14-day money-back guarantee']
      },
      form: {
        name: 'Name',
        namePh: 'What should we call you?',
        email: 'Email',
        phone: 'Phone',
        plan: 'Plan',
        planPlaceholder: 'Choose a plan',
        submit: 'Send application',
        note: 'This is a demo form: no data is sent anywhere.',
        successTitle: 'Application received!',
        successText: 'Thank you, {name}! We will contact you shortly about the {plan} plan.',
        again: 'Send another application',
        errors: {
          nameRequired: 'Please enter your name',
          nameShort: 'Name must be at least 2 letters long',
          emailRequired: 'Please enter your email',
          emailInvalid: 'Check the format: name@example.com',
          phoneRequired: 'Please enter your phone number',
          phoneInvalid: 'Enter a valid number, e.g. +380 67 123 45 67',
          planRequired: 'Please choose a plan'
        }
      },
      footer: {
        tagline: 'An online programming school for beginners',
        disclaimer: 'This is a demo website. The course, instructor, prices and reviews are fictional.',
        credit: 'Demo project. Website by ' + DEV_LINK
      }
    }
  };

  /* ----------------------------------------------------------
     Small helpers
     ---------------------------------------------------------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const ICONS = {
    seed: '<path d="M12 21v-9"/><path d="M12 12c0-4 3-7 8-7 0 5-3 8-8 7z"/><path d="M12 15c0-3-2-5-7-5 0 4 3 6 7 5z"/>',
    swap: '<path d="M4 8h14"/><path d="M14 4l4 4-4 4"/><path d="M20 16H6"/><path d="M10 12l-4 4 4 4"/>',
    cap: '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11.500V16c0 1.500 3 3 6 3s6-1.500 6-3v-4.500"/><path d="M22 9v6"/>',
    chart: '<path d="M4 20V4"/><path d="M4 20h16"/><path d="M8 16v-4"/><path d="M12 16V8"/><path d="M16 16v-6"/>'
  };
  const STAR = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.500l2.900 6 6.600.900-4.800 4.600 1.200 6.500L12 17.400l-5.900 3.100 1.200-6.500L2.500 9.400l6.600-.900z"/></svg>';

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (ch) => (
      { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]
    ));
  }

  function getByPath(obj, path) {
    return path.split('.').reduce((acc, key) => (acc == null ? acc : acc[key]), obj);
  }

  function readStoredLang() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return I18N[saved] ? saved : null;
    } catch (e) {
      return null;
    }
  }

  function storeLang(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* storage unavailable */ }
  }

  /* ----------------------------------------------------------
     State
     ---------------------------------------------------------- */
  let lang = readStoredLang() || DEFAULT_LANG;
  let t = I18N[lang];
  const startDate = new Date(COURSE_START);
  const openState = { program: new Set([0]), faq: new Set() };

  /* ----------------------------------------------------------
     Rendering
     ---------------------------------------------------------- */
  function renderStatic() {
    document.documentElement.lang = lang;
    document.title = t.meta.title;
    const desc = $('meta[name="description"]');
    if (desc) desc.setAttribute('content', t.meta.description);

    $$('[data-i18n]').forEach((el) => {
      const value = getByPath(t, el.dataset.i18n);
      // Texts are authored in this file, <br> is the only markup used in plain keys.
      if (typeof value === 'string') el.innerHTML = value.includes('<br>') ? value : escapeHtml(value);
    });
    $$('[data-i18n-html]').forEach((el) => {
      const value = getByPath(t, el.dataset.i18nHtml);
      if (typeof value === 'string') el.innerHTML = value;
    });
    $$('[data-i18n-placeholder]').forEach((el) => {
      el.placeholder = getByPath(t, el.dataset.i18nPlaceholder) || '';
    });

    $$('.lang__btn').forEach((btn) => {
      btn.setAttribute('aria-pressed', String(btn.dataset.lang === lang));
    });

    const dateText = new Intl.DateTimeFormat(lang === 'uk' ? 'uk-UA' : 'en-GB', {
      day: 'numeric', month: 'long'
    }).format(startDate);
    $('#heroBadge').textContent = t.hero.badge.replace('{date}', dateText);
    $('#teacherPhoto').alt = t.teacher.alt;
  }

  function renderStats() {
    $('#stats').innerHTML = t.stats.map((s) =>
      `<li><strong>${escapeHtml(s.value)}</strong><span>${escapeHtml(s.label)}</span></li>`
    ).join('');
  }

  // Running line: two identical groups make the CSS loop seamless
  function renderMarquee() {
    const items = t.marquee.concat(t.marquee, t.marquee)
      .map((text) => `<span>${escapeHtml(text)}</span>`).join('');
    const group = `<div class="marquee__group">${items}</div>`;
    $('#marquee').innerHTML = group + group;
  }

  function renderAudience() {
    $('#audienceCards').innerHTML = t.audience.cards.map((card, i) => `
      <article class="card reveal" style="--delay:${i * 90}ms">
        <span class="card__num" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
        <div class="card__icon"><svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[card.icon]}</svg></div>
        <h3>${escapeHtml(card.title)}</h3>
        <p>${escapeHtml(card.text)}</p>
      </article>`).join('');
  }

  function accordionItem(group, index, headHtml, bodyHtml) {
    const open = openState[group].has(index);
    const id = `${group}-panel-${index}`;
    return `
      <div class="acc${open ? ' is-open' : ''}">
        <button type="button" class="acc__head" aria-expanded="${open}" aria-controls="${id}" data-group="${group}" data-index="${index}">
          ${headHtml}
          <span class="acc__icon" aria-hidden="true"></span>
        </button>
        <div class="acc__panel" id="${id}" role="region">
          <div class="acc__inner"><div class="acc__content">${bodyHtml}</div></div>
        </div>
      </div>`;
  }

  function renderProgram() {
    $('#programList').innerHTML = t.program.weeks.map((week, i) => accordionItem(
      'program', i,
      `<span class="acc__num">${escapeHtml(t.program.week)} ${i + 1}</span><span class="acc__title">${escapeHtml(week.title)}</span>`,
      `<p>${escapeHtml(week.text)}</p><ul class="acc__topics">${week.topics.map((topic) => `<li>${escapeHtml(topic)}</li>`).join('')}</ul>`
    )).join('');
  }

  function renderFaq() {
    $('#faqList').innerHTML = t.faq.items.map((item, i) => accordionItem(
      'faq', i,
      `<span class="acc__title">${escapeHtml(item.q)}</span>`,
      `<p>${escapeHtml(item.a)}</p>`
    )).join('');
  }

  function renderTeacher() {
    $('#teacherFacts').innerHTML = t.teacher.facts.map((fact) => `<li>${escapeHtml(fact)}</li>`).join('');
  }

  function renderPlans() {
    $('#plans').innerHTML = t.pricing.plans.map((plan, i) => {
      const popular = plan.id === 'standard';
      return `
        <article class="plan${popular ? ' plan--popular' : ''} reveal" style="--delay:${i * 110}ms">
          ${popular ? `<span class="plan__flag">${escapeHtml(t.pricing.popular)}</span>` : ''}
          <h3 class="plan__name">${escapeHtml(plan.name)}</h3>
          <p class="plan__desc">${escapeHtml(plan.desc)}</p>
          <p class="plan__price">${escapeHtml(plan.price)}<small>${escapeHtml(t.pricing.currency)}</small></p>
          <p class="plan__per">${escapeHtml(t.pricing.per)}</p>
          <ul class="plan__features">${plan.features.map((f) => `<li>${escapeHtml(f)}</li>`).join('')}</ul>
          <a href="#signup" class="btn ${popular ? 'btn--primary' : 'btn--ghost'} btn--block" data-plan="${plan.id}">${escapeHtml(t.pricing.choose)}</a>
        </article>`;
    }).join('');

    // Plan <select> in the form — keep the current choice when the language changes
    const select = $('#plan');
    const current = select.value;
    select.innerHTML =
      `<option value="">${escapeHtml(t.form.planPlaceholder)}</option>` +
      t.pricing.plans.map((plan) =>
        `<option value="${plan.id}">${escapeHtml(plan.name)} — ${escapeHtml(plan.price)} ${escapeHtml(t.pricing.currency)}</option>`
      ).join('');
    select.value = current;
  }

  function renderReviews() {
    $('#reviewList').innerHTML = t.reviews.items.map((review, i) => {
      const initials = review.name.split(' ').map((part) => part[0]).join('');
      return `
        <figure class="review reveal" style="--delay:${i * 110}ms">
          <div class="review__stars" aria-hidden="true">${STAR.repeat(5)}</div>
          <blockquote>${escapeHtml(review.text)}</blockquote>
          <figcaption>
            <span class="review__avatar" aria-hidden="true">${escapeHtml(initials)}</span>
            <span><span class="review__name">${escapeHtml(review.name)}</span><span class="review__role">${escapeHtml(review.role)}</span></span>
          </figcaption>
        </figure>`;
    }).join('');
  }

  function renderSignupPoints() {
    $('#signupPoints').innerHTML = t.signup.points.map((p) => `<li>${escapeHtml(p)}</li>`).join('');
  }

  function renderAll() {
    renderStatic();
    renderStats();
    renderMarquee();
    renderAudience();
    renderProgram();
    renderTeacher();
    renderPlans();
    renderReviews();
    renderFaq();
    renderSignupPoints();
    updateCountdown();
    refreshFormMessages();
    observeReveals();
  }

  function setLang(next) {
    if (!I18N[next] || next === lang) return;
    lang = next;
    t = I18N[lang];
    storeLang(lang);
    renderAll();
  }

  /* ----------------------------------------------------------
     Countdown
     ---------------------------------------------------------- */
  function updateCountdown() {
    const diff = Math.max(0, startDate.getTime() - Date.now());
    const totalSeconds = Math.floor(diff / 1000);
    const values = {
      days: Math.floor(totalSeconds / 86400),
      hours: Math.floor((totalSeconds % 86400) / 3600),
      minutes: Math.floor((totalSeconds % 3600) / 60),
      seconds: totalSeconds % 60
    };
    Object.keys(values).forEach((unit) => {
      const el = $(`[data-unit="${unit}"]`);
      const text = String(values[unit]).padStart(2, '0');
      if (el && el.textContent !== text) el.textContent = text;
    });
    $('#countdownLabel').textContent = diff > 0 ? t.countdown.label : t.countdown.started;
  }

  /* ----------------------------------------------------------
     Scroll reveal
     ---------------------------------------------------------- */
  let revealObserver = null;

  function observeReveals() {
    const items = $$('.reveal:not(.is-visible)');
    if (!('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    if (!revealObserver) {
      revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    }
    items.forEach((el) => revealObserver.observe(el));
  }

  /* ----------------------------------------------------------
     Accordions (event delegation — items are re-rendered on language change)
     ---------------------------------------------------------- */
  document.addEventListener('click', (event) => {
    const head = event.target.closest('.acc__head');
    if (!head) return;
    const group = head.dataset.group;
    const index = Number(head.dataset.index);
    const isOpen = openState[group].has(index);

    if (isOpen) openState[group].delete(index);
    else openState[group].add(index);

    head.setAttribute('aria-expanded', String(!isOpen));
    head.parentElement.classList.toggle('is-open', !isOpen);
  });

  /* ----------------------------------------------------------
     Header: language switch, mobile menu, scroll shadow
     ---------------------------------------------------------- */
  const nav = $('#nav');
  const burger = $('#burger');

  function toggleMenu(open) {
    nav.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
  }

  $$('.lang__btn').forEach((btn) => btn.addEventListener('click', () => setLang(btn.dataset.lang)));
  burger.addEventListener('click', () => toggleMenu(!nav.classList.contains('is-open')));
  nav.addEventListener('click', (event) => { if (event.target.closest('a')) toggleMenu(false); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') toggleMenu(false); });

  // "Choose plan" buttons pre-select the plan in the form
  document.addEventListener('click', (event) => {
    const btn = event.target.closest('[data-plan]');
    if (!btn) return;
    $('#plan').value = btn.dataset.plan;
    setFieldError('plan', null);
  });

  /* ----------------------------------------------------------
     Signup form
     ---------------------------------------------------------- */
  const form = $('#signupForm');
  const success = $('#formSuccess');
  const fieldErrors = {};   // field name -> error key (kept so messages can be re-translated)
  let lastSubmission = null;

  const validators = {
    name(value) {
      if (!value) return 'nameRequired';
      if (value.replace(/[^\p{L}]/gu, '').length < 2) return 'nameShort';
      return null;
    },
    email(value) {
      if (!value) return 'emailRequired';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) return 'emailInvalid';
      return null;
    },
    phone(value) {
      if (!value) return 'phoneRequired';
      const digits = value.replace(/\D/g, '');
      if (!/^\+?[\d\s()-]+$/.test(value) || digits.length < 10 || digits.length > 15) return 'phoneInvalid';
      return null;
    },
    plan(value) {
      return value ? null : 'planRequired';
    }
  };

  function setFieldError(name, errorKey) {
    const input = form.elements[name];
    const errorEl = $(`[data-error-for="${name}"]`);
    fieldErrors[name] = errorKey;
    input.closest('.field').classList.toggle('has-error', Boolean(errorKey));
    input.setAttribute('aria-invalid', String(Boolean(errorKey)));
    errorEl.textContent = errorKey ? t.form.errors[errorKey] : '';
  }

  function validateField(name) {
    const errorKey = validators[name](form.elements[name].value.trim());
    setFieldError(name, errorKey);
    return !errorKey;
  }

  function planName(id) {
    const plan = t.pricing.plans.find((p) => p.id === id);
    return plan ? plan.name : '';
  }

  function showSuccessText() {
    if (!lastSubmission) return;
    $('#successText').textContent = t.form.successText
      .replace('{name}', lastSubmission.name)
      .replace('{plan}', planName(lastSubmission.plan));
  }

  // Re-translate visible error / success messages after a language switch
  function refreshFormMessages() {
    Object.keys(fieldErrors).forEach((name) => {
      if (fieldErrors[name]) setFieldError(name, fieldErrors[name]);
    });
    showSuccessText();
  }

  Object.keys(validators).forEach((name) => {
    const input = form.elements[name];
    input.addEventListener('blur', () => validateField(name));
    input.addEventListener('input', () => { if (fieldErrors[name]) validateField(name); });
    input.addEventListener('change', () => { if (fieldErrors[name]) validateField(name); });
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const names = Object.keys(validators);
    const invalid = names.filter((name) => !validateField(name));
    if (invalid.length) {
      form.elements[invalid[0]].focus();
      return;
    }

    const data = {
      name: form.elements.name.value.trim(),
      email: form.elements.email.value.trim(),
      phone: form.elements.phone.value.trim(),
      plan: form.elements.plan.value
    };

    /* --------------------------------------------------------
       ПІДКЛЮЧЕННЯ ВІДПРАВКИ / CONNECT YOUR BACKEND HERE

       This is a demo: `data` is NOT sent anywhere.
       To receive real applications, send `data` to your endpoint
       (own API, Formspree, Getform, Google Apps Script,
       Telegram Bot API through a server-side proxy, etc.) and show
       the success message only after a successful response:

       fetch('https://example.com/api/applications', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(data)
       })
         .then((res) => { if (!res.ok) throw new Error(res.status); })
         .then(showSuccess)
         .catch(showSendError);
       -------------------------------------------------------- */

    lastSubmission = data;
    showSuccessText();
    form.hidden = true;
    success.hidden = false;
    success.focus({ preventScroll: true });
  });

  $('#formReset').addEventListener('click', () => {
    form.reset();
    lastSubmission = null;
    Object.keys(validators).forEach((name) => setFieldError(name, null));
    success.hidden = true;
    form.hidden = false;
    form.elements.name.focus({ preventScroll: true });
  });

  /* ----------------------------------------------------------
     Init
     ---------------------------------------------------------- */
  renderAll();
  setInterval(updateCountdown, 1000);
})();
