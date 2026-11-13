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

  const DEFAULT_LANG = 'en';
  const STORAGE_KEY = 'pystart-lang-v2';   // v2: English became the default
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
        proof: '600+ випускників',
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
      process: {
        eyebrow: 'Формат',
        title: 'Як проходить навчання',
        lead: 'Жодної теорії заради теорії: кожен тиждень побудований навколо практики.',
        steps: [
          { icon: 'video', title: 'Живі заняття', text: 'Двічі на тиждень по 1,5 години онлайн. Пишемо код разом із викладачем, запис лишається в кабінеті.' },
          { icon: 'code', title: 'Практика', text: 'Після кожної теми — завдання з автоперевіркою. Помилки видно одразу, а не через тиждень.' },
          { icon: 'chat', title: 'Зворотний звʼязок', text: 'Ментор перевіряє домашні завдання та відповідає в чаті групи протягом дня.' },
          { icon: 'flag', title: 'Власний проєкт', text: 'На фініші ви збираєте проєкт, отримуєте код-ревʼю та викладаєте його на GitHub.' }
        ]
      },
      projects: {
        eyebrow: 'Проєкти',
        title: 'Що ви створите за 8 тижнів',
        lead: 'Три роботи, які не соромно показати на співбесіді. Усі — у вашому GitHub.',
        items: [
          { mock: 'bot', tag: 'Тиждень 7', title: 'Telegram-бот', text: 'Бот, який показує погоду та курси валют за командою. Працює з реальними API.', stack: ['requests', 'API', 'JSON'] },
          { mock: 'term', tag: 'Тиждень 5', title: 'Збирач даних', text: 'Скрипт, що читає файли, чистить дані й зберігає акуратний звіт у CSV.', stack: ['CSV', 'файли', 'try / except'] },
          { mock: 'chart', tag: 'Тиждень 8', title: 'Фінальний проєкт', text: 'Ваша власна ідея — від трекера витрат до мінігри. З ревʼю викладача й презентацією.', stack: ['ООП', 'Git', 'GitHub'] }
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
        payFull: 'Оплата одразу',
        paySplit: 'Двома частинами',
        perSplit: 'два платежі, без переплат',
        currency: '₴',
        plans: [
          { id: 'basic', name: 'Базовий', price: '4 900', split: '2 450', desc: 'Для тих, хто звик вчитися самостійно.', features: ['Записи всіх 16 занять', 'Практичні завдання з автоперевіркою', 'Доступ до матеріалів на 6 місяців', 'Спільний чат групи'] },
          { id: 'standard', name: 'Стандарт', price: '8 900', split: '4 450', desc: 'Живе навчання зі зворотним зв’язком.', features: ['Усе з тарифу «Базовий»', 'Живі заняття двічі на тиждень', 'Перевірка домашніх завдань ментором', 'Ревʼю фінального проєкту', 'Сертифікат про проходження'] },
          { id: 'premium', name: 'Преміум', price: '14 900', split: '7 450', desc: 'Максимум уваги та допомога зі стартом кар’єри.', features: ['Усе з тарифу «Стандарт»', '4 індивідуальні консультації', 'Допомога з резюме та GitHub', 'Тренувальна співбесіда', 'Безстроковий доступ до матеріалів'] }
        ]
      },
      reviews: {
        eyebrow: 'Відгуки',
        title: 'Що кажуть випускники',
        summary: 'середня оцінка від 214 випускників',
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
        proof: '600+ graduates',
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
      process: {
        eyebrow: 'Format',
        title: 'How the course works',
        lead: 'No theory for the sake of theory: every week is built around practice.',
        steps: [
          { icon: 'video', title: 'Live classes', text: 'Twice a week, 1.5 hours online. We write code together with the instructor, and the recording stays in your account.' },
          { icon: 'code', title: 'Practice', text: 'Auto-checked tasks after every topic. You see mistakes right away, not a week later.' },
          { icon: 'chat', title: 'Feedback', text: 'A mentor reviews your homework and answers in the group chat within a day.' },
          { icon: 'flag', title: 'Your own project', text: 'At the finish you build a project, get a code review and publish it on GitHub.' }
        ]
      },
      projects: {
        eyebrow: 'Projects',
        title: 'What you will build in 8 weeks',
        lead: 'Three pieces of work you can show at an interview. All of them in your GitHub.',
        items: [
          { mock: 'bot', tag: 'Week 7', title: 'Telegram bot', text: 'A bot that shows the weather and exchange rates on command. Works with real APIs.', stack: ['requests', 'API', 'JSON'] },
          { mock: 'term', tag: 'Week 5', title: 'Data collector', text: 'A script that reads files, cleans the data and saves a tidy report to CSV.', stack: ['CSV', 'files', 'try / except'] },
          { mock: 'chart', tag: 'Week 8', title: 'Final project', text: 'Your own idea — from an expense tracker to a mini-game. With the instructor’s review and a presentation.', stack: ['OOP', 'Git', 'GitHub'] }
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
        payFull: 'Pay in full',
        paySplit: 'In two parts',
        perSplit: 'two payments, no extra cost',
        currency: '₴',
        plans: [
          { id: 'basic', name: 'Basic', price: '4,900', split: '2,450', desc: 'For those who are used to learning on their own.', features: ['Recordings of all 16 classes', 'Auto-checked practice tasks', '6 months of access to materials', 'Group chat'] },
          { id: 'standard', name: 'Standard', price: '8,900', split: '4,450', desc: 'Live learning with feedback.', features: ['Everything in Basic', 'Live classes twice a week', 'Homework reviewed by a mentor', 'Final project review', 'Certificate of completion'] },
          { id: 'premium', name: 'Premium', price: '14,900', split: '7,450', desc: 'Maximum attention and help with starting your career.', features: ['Everything in Standard', '4 one-on-one consultations', 'Help with your CV and GitHub', 'Mock interview', 'Lifetime access to materials'] }
        ]
      },
      reviews: {
        eyebrow: 'Reviews',
        title: 'What graduates say',
        summary: 'average rating from 214 graduates',
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
    video: '<rect x="3" y="6" width="13" height="12" rx="2"/><path d="M16 10l5-3v10l-5-3"/>',
    code: '<path d="M8 8l-4 4 4 4"/><path d="M16 8l4 4-4 4"/><path d="M13 6l-2 12"/>',
    chat: '<path d="M4 5h16v11H9l-5 4z"/>',
    flag: '<path d="M5 21V4"/><path d="M5 4h12l-2 4 2 4H5"/>',
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
      `<li><strong data-count="${escapeHtml(s.value)}">${escapeHtml(s.value)}</strong><span>${escapeHtml(s.label)}</span></li>`
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

  function renderSteps() {
    $('#steps').innerHTML = t.process.steps.map((step, i) => `
      <li class="step reveal" style="--delay:${i * 100}ms">
        <div class="step__icon"><svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[step.icon]}</svg></div>
        <span class="step__num" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
        <h3>${escapeHtml(step.title)}</h3>
        <p>${escapeHtml(step.text)}</p>
      </li>`).join('');
  }

  // Small CSS-only "screenshots" for the project cards
  const MOCKS = {
    bot: '<div class="mock mock--bot"><span class="bubble bubble--me">/weather Kyiv</span><span class="bubble">☀️ +18°C, clear sky</span><span class="bubble bubble--me">/usd</span><span class="bubble">💵 41.20 ₴</span></div>',
    term: '<div class="mock mock--term"><span>$ python collect.py</span><span class="ok">✓ sales.csv — 1 284 rows</span><span class="ok">✓ removed 37 duplicates</span><span>→ report.csv saved</span></div>',
    chart: '<div class="mock mock--chart"><i style="--h:34%"></i><i style="--h:52%"></i><i style="--h:44%"></i><i style="--h:70%"></i><i style="--h:60%"></i><i style="--h:92%"></i></div>'
  };

  function renderProjects() {
    $('#projectList').innerHTML = t.projects.items.map((item, i) => `
      <article class="project reveal" style="--delay:${i * 110}ms">
        <div class="project__media" aria-hidden="true">${MOCKS[item.mock]}</div>
        <div class="project__body">
          <span class="project__tag">${escapeHtml(item.tag)}</span>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.text)}</p>
          <ul class="project__stack">${item.stack.map((x) => `<li>${escapeHtml(x)}</li>`).join('')}</ul>
        </div>
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
      const split = billing === 'split';
      return `
        <article class="plan${popular ? ' plan--popular' : ''} reveal" style="--delay:${i * 110}ms">
          ${popular ? `<span class="plan__flag">${escapeHtml(t.pricing.popular)}</span>` : ''}
          <h3 class="plan__name">${escapeHtml(plan.name)}</h3>
          <p class="plan__desc">${escapeHtml(plan.desc)}</p>
          <p class="plan__price">${escapeHtml(split ? plan.split : plan.price)}<small>${escapeHtml(t.pricing.currency)}${split ? ' × 2' : ''}</small></p>
          <p class="plan__per">${escapeHtml(split ? t.pricing.perSplit : t.pricing.per)}</p>
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
    renderSteps();
    renderProjects();
    renderProgram();
    renderTeacher();
    renderPlans();
    renderReviews();
    renderFaq();
    renderSignupPoints();
    updateCountdown();
    refreshFormMessages();
    observeReveals();
    requestScrollUpdate();
  }

  function setLang(next) {
    if (!I18N[next] || next === lang) return;
    lang = next;
    t = I18N[lang];
    storeLang(lang);
    typer.stop();
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
            runCountUp(entry.target);
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
  /* ----------------------------------------------------------
     Extras: pricing toggle, count-up, scroll effects, spotlight,
     code typing
     ---------------------------------------------------------- */
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let billing = 'full';

  $$('.billing__btn').forEach((btn) => btn.addEventListener('click', () => {
    billing = btn.dataset.billing;
    $$('.billing__btn').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
    renderPlans();
    $$('#plans .reveal').forEach((el) => el.classList.add('is-visible'));
  }));

  // Numbers in the stats strip count up once when they scroll into view
  function runCountUp(root) {
    if (reduceMotion) return;
    $$('[data-count]', root).forEach((el) => {
      const match = el.dataset.count.match(/^(\d+)(.*)$/);
      if (!match) return;
      const target = Number(match[1]);
      const suffix = match[2];
      const started = performance.now();
      (function frame(now) {
        const progress = Math.min(1, (now - started) / 1100);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (progress < 1) requestAnimationFrame(frame);
      })(started);
    });
  }

  // Reading progress bar, program timeline and active nav link
  const progressBar = $('#scrollProgress');
  const timeline = $('#programList');
  const navLinks = $$('.nav a');
  const navTargets = navLinks.map((link) => $(link.getAttribute('href')));
  let scrollQueued = false;

  function updateOnScroll() {
    scrollQueued = false;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.setProperty('--p', max > 0 ? (window.scrollY / max).toFixed(4) : '0');

    const mark = window.innerHeight * 0.6;
    const rect = timeline.getBoundingClientRect();
    const passed = Math.min(1, Math.max(0, (mark - rect.top) / rect.height));
    timeline.style.setProperty('--progress', passed.toFixed(3));
    $$('.acc', timeline).forEach((item) => {
      item.classList.toggle('is-passed', item.getBoundingClientRect().top + 28 < mark);
    });

    let active = -1;
    navTargets.forEach((section, i) => {
      if (section && section.getBoundingClientRect().top < window.innerHeight * 0.4) active = i;
    });
    navLinks.forEach((link, i) => link.classList.toggle('is-active', i === active));
  }

  function requestScrollUpdate() {
    if (scrollQueued) return;
    scrollQueued = true;
    requestAnimationFrame(updateOnScroll);
  }
  window.addEventListener('scroll', requestScrollUpdate, { passive: true });
  window.addEventListener('resize', requestScrollUpdate);

  // Soft glow that follows the cursor on cards
  document.addEventListener('pointermove', (event) => {
    const card = event.target.closest && event.target.closest('.card, .plan, .review, .project, .step');
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mx', (event.clientX - rect.left) + 'px');
    card.style.setProperty('--my', (event.clientY - rect.top) + 'px');
  });

  // Slight 3D tilt of the code window
  const heroVisual = $('.hero__visual');
  const codeWindow = $('.code-window');
  if (!reduceMotion && window.matchMedia('(hover: hover)').matches) {
    heroVisual.addEventListener('pointermove', (event) => {
      const rect = heroVisual.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      codeWindow.style.transform = `perspective(900px) rotateY(${(x * 7).toFixed(2)}deg) rotateX(${(-y * 7).toFixed(2)}deg)`;
    });
    heroVisual.addEventListener('pointerleave', () => { codeWindow.style.transform = ''; });
  }

  // The code in the hero "types itself" once on load
  const typer = (function () {
    const code = $('.code-window__body code');
    const output = $('.code-window__out');
    let timer = null;
    let nodes = [];

    function stop() {
      if (timer) clearTimeout(timer);
      timer = null;
      nodes.forEach((item) => { item.node.data = item.text; });
      nodes = [];
      output.classList.remove('is-waiting');
    }

    function start() {
      if (reduceMotion) return;
      const body = code.parentElement;
      body.style.minHeight = body.offsetHeight + 'px';
      const walker = document.createTreeWalker(code, NodeFilter.SHOW_TEXT);
      while (walker.nextNode()) nodes.push({ node: walker.currentNode, text: walker.currentNode.data });
      nodes.forEach((item) => { item.node.data = ''; });
      output.classList.add('is-waiting');

      let index = 0;
      let chars = 0;
      (function tick() {
        if (index >= nodes.length) { stop(); return; }
        const item = nodes[index];
        chars += 2;
        item.node.data = item.text.slice(0, chars);
        if (chars >= item.text.length) { index += 1; chars = 0; }
        timer = setTimeout(tick, 26);
      })();
    }

    return { start, stop };
  })();

  /* ----------------------------------------------------------
     Living aurora: soft ribbons of light with shimmering rays.
     Drawn on a small canvas (cheap) and blurred up with CSS.
     Reacts gently to the cursor and to scrolling.
     ---------------------------------------------------------- */
  const aurora = (function () {
    const canvas = $('#auroraCanvas');
    if (!canvas || !canvas.getContext) return null;
    const ctx = canvas.getContext('2d');
    const SCALE = 0.16;          // draw at ~1/6 of the screen size
    const FRAME_MS = 1000 / 30;  // 30 fps is plenty for blurred light
    let w = 0;
    let h = 0;
    let last = 0;
    let pointerX = 0.5;
    let pointerY = 0.5;
    let easedX = 0.5;
    let easedY = 0.5;
    let scrollShift = 0;

    // colours the light flows through: mint → sky → lavender → pink → back
    const PALETTE = [
      [79, 227, 180], [99, 196, 255], [140, 134, 255], [199, 140, 255], [255, 150, 214], [111, 233, 210]
    ];
    // each ribbon: base height, motion settings and its place in the palette
    const RIBBONS = [
      { y: 0.34, height: 0.42, hue: 0.0, alpha: 0.8, speed: 0.22, wave: 2.1, phase: 0.0 },
      { y: 0.52, height: 0.36, hue: 2.2, alpha: 0.66, speed: -0.17, wave: 1.6, phase: 2.1 },
      { y: 0.72, height: 0.3, hue: 4.1, alpha: 0.56, speed: 0.13, wave: 2.6, phase: 4.2 }
    ];

    // smooth colour at any point of the looping palette
    function paletteAt(pos) {
      const n = PALETTE.length;
      const p = ((pos % n) + n) % n;
      const i = Math.floor(p);
      const f = p - i;
      const s = f * f * (3 - 2 * f);
      const c1 = PALETTE[i];
      const c2 = PALETTE[(i + 1) % n];
      return [0, 1, 2].map((k) => Math.round(c1[k] + (c2[k] - c1[k]) * s));
    }

    function resize() {
      w = Math.max(80, Math.round(window.innerWidth * SCALE));
      h = Math.max(60, Math.round(window.innerHeight * SCALE));
      canvas.width = w;
      canvas.height = h;
    }

    function rgba(c, a) { return `rgba(${c[0]},${c[1]},${c[2]},${a})`; }

    function draw(time) {
      const t = time / 1000;
      easedX += (pointerX - easedX) * 0.06;
      easedY += (pointerY - easedY) * 0.04;
      ctx.clearRect(0, 0, w, h);

      RIBBONS.forEach((r, ri) => {
        const lean = (easedX - 0.5) * 0.7 * (ri % 2 ? -1 : 1);
        const lift = (easedY - 0.5) * 0.06 + scrollShift * (0.05 + ri * 0.03);
        // the colours keep flowing: along the ribbon and over time
        const drift = t * 0.32 + r.hue;
        for (let x = 0; x <= w; x += 2) {
          const u = x / w;
          const ca = paletteAt(drift + u * 1.6);
          const cb = paletteAt(drift + u * 1.6 + 1.3);
          // the curtain line slowly folds and travels sideways
          const fold =
            Math.sin(u * r.wave * 3.1 + t * r.speed * 5.5 + r.phase + lean * 4) * 0.12 +
            Math.sin(u * r.wave * 7.3 - t * r.speed * 7 + r.phase * 1.7) * 0.045;
          const base = (r.y + fold - lift) * h;
          // rays: height and brightness shimmer along the curtain
          const ray = 0.5 + 0.5 * Math.sin(u * 38 + t * 2.6 * (r.speed > 0 ? 1 : -1) + r.phase * 3);
          const pulse = 0.5 + 0.5 * Math.sin(u * 7 - t * 1.5 + r.phase);
          const top = base - r.height * h * (0.4 + 0.6 * ray);
          const alpha = r.alpha * (0.25 + 0.75 * pulse) * (0.35 + 0.65 * ray);
          const grad = ctx.createLinearGradient(0, base + h * 0.04, 0, top);
          grad.addColorStop(0, rgba(ca, 0));
          grad.addColorStop(0.12, rgba(ca, alpha));
          grad.addColorStop(0.45, rgba(cb, alpha * 0.7));
          grad.addColorStop(1, rgba(cb, 0));
          ctx.fillStyle = grad;
          ctx.fillRect(x, top, 2.6, base + h * 0.04 - top);
        }
      });
    }

    function loop(time) {
      requestAnimationFrame(loop);
      if (time - last < FRAME_MS) return;
      last = time;
      draw(time);
    }

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', (event) => {
      pointerX = event.clientX / window.innerWidth;
      pointerY = event.clientY / window.innerHeight;
    }, { passive: true });
    window.addEventListener('scroll', () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollShift = max > 0 ? window.scrollY / max : 0;
    }, { passive: true });

    if (reduceMotion) draw(8000);   // one still frame
    else requestAnimationFrame(loop);
    return { draw };
  })();

  renderAll();
  setInterval(updateCountdown, 1000);
  setTimeout(typer.start, 600);
})();
