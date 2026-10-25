export const TELEGRAM = 'https://t.me/Sol_Ethio_Coder'
export const YOUTUBE = 'https://www.youtube.com/@stcaAcademy'
export const EMAIL = 'solash5156@gmail.com'
export const PHONE = '(+251) 901 436 358'
export const PHONE_TEL = '+251901436358'
export const FORM = 'https://forms.gle/Jcjdv4ZBiXeSnDo87'

import webImg from './assets/courses/web.webp'
import mathImg from './assets/courses/math.webp'
import pythonImg from './assets/courses/python.webp'
import scratchImg from './assets/courses/scratch.webp'
import digitalImg from './assets/courses/digital.webp'
import examImg from './assets/courses/exam.webp'
import cppImg from './assets/courses/cpp.webp'
import aiImg from './assets/courses/ai.webp'
import csImg from './assets/courses/cs.webp'
import englishImg from './assets/courses/english.webp'
import { extras } from './content.js'
export const PASS = 70
export const PLATFORM = 'https://stca-platform.vercel.app'
export const PORTFOLIO = 'https://sol-ethio-coder.netlify.app'
export const IMG = { web: webImg, math: mathImg, python: pythonImg, scratch: scratchImg, digital: digitalImg, exam: examImg, cpp: cppImg, ai: aiImg, cs: csImg, english: englishImg }
// Bump this number whenever you change the built-in courses in code. Visitors then receive the new lessons automatically (their progress is kept).
export const SEED_VERSION = 4

const L = (title, body, q, options, answer) => ({ title, body, q: { q, options, answer } })
const mk = (o, lessons) => ({ published: true, price: 0, ...o, lessons: lessons.map((l, i) => ({ id: 'l' + (i + 1), ...l })) })

const base = [
  mk({ id: 'web', slug: 'web-course', cat: 'Coding', level: 'Beginner', title: 'Web Development', h1: '💻 Web Development Course', pageTitle: 'Web Development Course | STCA',
    img: IMG.web, listImg: IMG.web, detailImg: IMG.web, fallback: '/Images/ict.svg',
    blurb: 'HTML, CSS, JavaScript & mini projects.', listBlurb: 'HTML, CSS, JavaScript, and mini projects.', tagline: 'Learn HTML, CSS, JavaScript & build modern websites.',
    learnTitle: 'What Students Will Learn', learnSub: 'Build websites from scratch using practical projects.',
    learn: ['HTML & CSS basics', 'Responsive design', 'JavaScript programming', 'Project-based learning', 'Deploy websites online'], tutorPrice: 600,
    perks: [['Practical', 'Learn by building real projects.'], ['Modern Skills', 'HTML, CSS, JS, and frameworks.'], ['Career Ready', 'Prepare for tech internships.']],
    tag: 'Coding starts with fun.', meta: 'Learn HTML, CSS and JavaScript with personalized tutoring at STCA. Build a real portfolio. 600 Birr/hour.' }, [
    L('What is HTML?', 'HTML gives a page its structure using tags such as <h1> for headings and <p> for paragraphs.', 'Which tag makes the biggest heading?', ['<p>', '<h1>', '<head>', '<h6>'], 1),
    L('Styling with CSS', 'CSS controls colors, spacing and layout. For example, h1 { color: blue; } makes every heading blue.', 'Which language styles a web page?', ['SQL', 'Python', 'CSS', 'Bash'], 2),
    L('Adding JavaScript', 'JavaScript makes pages interactive, such as reacting when a visitor clicks a button.', 'Which language adds interactivity in the browser?', ['JavaScript', 'CSS', 'HTML', 'Markdown'], 0),
  ]),
  mk({ id: 'math', slug: 'math-course', cat: 'School', level: 'Grade 5-12', title: 'Mathematics', h1: '📐 Mathematics Course', pageTitle: 'Mathematics Course | STCA',
    img: IMG.math, listImg: IMG.math, detailImg: IMG.math, fallback: '/Images/math.svg',
    blurb: 'Grade 5 - 12: Algebra, Geometry, Calculus...', listBlurb: 'From basic to advanced levels for all grades.', tagline: 'Master concepts from basic arithmetic to advanced problem solving.',
    learnTitle: 'What Students Will Learn', learnSub: 'Step-by-step guidance on algebra, geometry, calculus, and more.',
    learn: ['Algebra & Equations', 'Geometry & Trigonometry', 'Calculus basics', 'Problem-solving techniques', 'Exam preparation skills'], tutorPrice: 600,
    perks: [['Conceptual', 'Understand the why behind formulas.'], ['Practical', 'Apply knowledge to solve real problems.'], ['Exam Ready', 'Prepare for school & competitive exams.']],
    tag: 'Math made easy & fun!', meta: '1:1 math tutoring covering Grade 5-12 curriculum, from algebra to calculus, with exam-focused practice. 600 Birr/hour.' }, [
    L('Solving linear equations', 'To solve 2x + 6 = 14, subtract 6 from both sides to get 2x = 8, then divide by 2 to get x = 4.', 'Solve 3x = 12.', ['x = 9', 'x = 36', 'x = 4', 'x = 3'], 2),
    L('Factoring', 'x² + 5x + 6 factors as (x + 2)(x + 3) because 2 × 3 = 6 and 2 + 3 = 5.', 'Factor x² + 7x + 12.', ['(x+2)(x+6)', '(x+3)(x+4)', '(x+1)(x+12)', '(x+7)(x+12)'], 1),
  ]),
  mk({ id: 'python', slug: 'python-course', cat: 'Coding', level: 'Beginner', title: 'Python Programming', h1: '🐍 Python Programming', pageTitle: 'Python Programming Course | STCA',
    img: IMG.python, listImg: IMG.python, detailImg: IMG.python, fallback: '/Images/python.svg',
    blurb: 'Python basics, projects, and real examples.', listBlurb: 'Python basics, loops, functions, mini-projects.', tagline: 'Learn Python from basics to advanced projects.',
    learnTitle: 'What Students Will Learn', learnSub: 'From syntax basics to building real-world Python applications.',
    learn: ['Python basics & syntax', 'Data structures & loops', 'Functions & modules', 'File handling & projects', 'Automation & scripting'], tutorPrice: 500,
    perks: [['Practical', 'Hands-on coding projects.'], ['Logical', 'Develop computational thinking.'], ['Career Ready', 'Python skills for internships.']],
    tag: 'Python programming made easy!', meta: 'Learn Python from scratch with 1:1 tutoring at STCA. Build real projects and automation scripts. 500 Birr/hour, flexible scheduling.' }, [
    L('Your first program', 'Python runs your instructions line by line. The print() function shows text on the screen, like print("Hello, Addis!").', 'Which line prints Hello?', ['echo Hello', 'say("Hello")', 'print("Hello")', 'console.log Hello'], 2),
    L('Variables', 'A variable stores a value so you can use it later, like age = 15. Variable names are case sensitive.', 'Which line creates a variable?', ['15 = age', 'age = 15', 'var age 15', 'age: 15'], 1),
    L('Making decisions', 'The if statement runs code only when a condition is true, like if age >= 18: print("Adult").', 'What does >= mean?', ['less than', 'equal to', 'not equal', 'greater than or equal to'], 3),
  ]),
  mk({ id: 'scratch', slug: 'scratch-course', cat: 'Coding', level: 'Kids', title: 'Scratch Programming', h1: '🎮 Scratch Programming', pageTitle: 'Scratch Programming Course | STCA',
    img: IMG.scratch, listImg: IMG.scratch, detailImg: IMG.scratch, fallback: '/Images/scratch.svg',
    blurb: 'Learn coding visually with fun projects.', listBlurb: 'Creative coding, animations, mini-games, and projects.', tagline: 'Learn coding by creating fun games & animations.',
    learnTitle: 'What Kids Will Learn', learnSub: '',
    learn: ['Logical thinking', 'Game & animation creation', 'Problem-solving skills', 'Creativity & storytelling', 'Confidence with technology'], tutorPrice: 500,
    perks: [['Easy to Learn', 'Drag-and-drop coding blocks.'], ['Creative', 'Create stories, games & animations.'], ['Future Ready', 'Build a foundation for programming.']],
    tag: 'Coding starts with fun.', meta: 'Fun, beginner-friendly Scratch programming tutoring for kids at STCA. Build games and animations. 500 Birr/hour.' }, [
    L('Meet the stage', 'Sprites are the characters on the stage. You give them instructions by snapping blocks together.', 'What do you snap together in Scratch?', ['Folders', 'Blocks', 'Cables', 'Files'], 1),
    L('Make it move', 'The "move 10 steps" block moves a sprite. Put it inside a forever loop to keep it moving.', 'Which block repeats actions?', ['say', 'hide', 'forever', 'play sound'], 2),
  ]),
  mk({ id: 'digital', slug: 'digital-course', cat: 'Coding', level: 'All ages', title: 'Digital Literacy', h1: '💻 Digital Literacy', pageTitle: 'Digital Literacy Course | STCA',
    img: IMG.digital, listImg: IMG.digital, detailImg: IMG.digital, fallback: '/Images/digital-literacy.svg',
    blurb: 'Basic computer skills & internet essentials.', listBlurb: 'Computer basics, MS Office, Internet & productivity tools.', tagline: 'Gain essential digital skills for everyday life & work.',
    learnTitle: 'Course Topics', learnSub: '',
    learn: ['Computer basics & operating systems', 'MS Office & productivity tools', 'Internet & email skills', 'Online safety & digital etiquette'], tutorPrice: 500,
    perks: [['Essential', 'Learn practical computer skills.'], ['Practical', 'Hands-on applications & exercises.'], ['Flexible', 'Learn at your own pace.']],
    tag: 'Digital skills for everyone.', meta: 'Computer and internet basics tutoring for beginners of any age at STCA. 500 Birr/hour.' }, [
    L('Parts of a computer', 'Input devices like the keyboard send data in. Output devices like the screen show results.', 'Which is an input device?', ['Monitor', 'Speaker', 'Printer', 'Keyboard'], 3),
    L('Staying safe online', 'Use long, unique passwords and never share them. Think before you click a link.', 'A strong password is…', ['Your name', 'Long and unique', 'Your birthday', 'The same everywhere'], 1),
  ]),
  mk({ id: 'exam', slug: 'exam-course', cat: 'School', level: 'Grade 6, 8, 12', title: 'Exam Preparation', h1: '📚 Exam Preparation', pageTitle: 'National Exam Preparation | STCA',
    img: IMG.exam, listImg: IMG.exam, detailImg: IMG.exam, fallback: '/Images/final-exam.svg',
    blurb: 'Structured guidance, past papers & exam strategies.', listBlurb: 'National exam preparation for Grade 6, 8, 12 with solutions.', tagline: 'Ace your exams with our structured revision & guidance.',
    learnTitle: 'What Students Will Learn', learnSub: '',
    learn: ['Study strategies & time management', 'Past papers & practice exercises', 'Subject-specific guidance', 'Confidence building for exams'], tutorPrice: 600,
    perks: [['Structured', 'Follow a clear study plan.'], ['Practice', 'Work on real exam exercises.'], ['Confidence', 'Build exam readiness & self-assurance.']],
    tag: 'Exam preparation simplified.', meta: 'National exam preparation tutoring for Grade 6, 8 and 12 with past papers and mock tests. 600 Birr/hour.' }, [
    L('Plan your revision', 'Split topics into daily blocks of 45 minutes with 10 minute breaks. Start with your weakest subject.', 'Which is the best revision block?', ['8 hours straight', 'Only the night before', '45 min study + 10 min rest', 'Skip weak subjects'], 2),
    L('Using past papers', 'Time yourself on a past paper, mark it honestly, then list every mistake to review.', 'After marking a paper you should…', ['Throw it away', 'List and review mistakes', 'Ignore the score', 'Redo only easy questions'], 1),
  ]),
  mk({ id: 'js', cat: 'Coding', level: 'Beginner', title: 'JavaScript Essentials', price: 300,
    img: IMG.web, fallback: '/Images/ict.svg', blurb: 'Variables, loops, functions, arrays, objects and the DOM, finishing with a tip calculator project.', learn: ['Variables, types and operators', 'Conditions and loops', 'Functions, arrays and objects', 'Changing web pages with the DOM', 'A real tip-calculator project'], published: true }, [
    L('Variables in JavaScript', 'Use let to create a variable: let score = 10. Use const when the value never changes.', 'Which keyword creates a constant?', ['let', 'const', 'var x', 'set'], 1),
    L('Functions', 'A function is a reusable block of code: function hi() { return "Hello" }.', 'What does a function do?', ['Stores a number only', 'Runs reusable code', 'Styles a page', 'Deletes a file'], 1),
  ]),
  mk({ id: 'cpp', cat: 'Coding', level: 'Beginner', title: 'C++ Fundamentals', img: IMG.cpp, fallback: '', published: true,
    blurb: 'Variables, input, decisions, loops, functions and arrays in the language behind games and operating systems.',
    learn: ['Program structure and cout / cin', 'Data types and operators', 'if / else decisions and loops', 'Functions, arrays and vectors', 'A grade-calculator project'] }, []),
  mk({ id: 'cs', cat: 'Coding', level: 'Beginner', title: 'Computer Science Fundamentals', img: IMG.cs, fallback: '', published: true,
    blurb: 'Binary, algorithms, hardware, data structures, networks and databases, with real Python practice.',
    learn: ['Bits, bytes and binary', 'Algorithms and logic', 'Hardware and operating systems', 'Searching, sorting and data structures', 'Networks, databases and cyber security'] }, []),
  mk({ id: 'ai', cat: 'Coding', level: 'Beginner', title: 'AI Fundamentals', img: IMG.ai, fallback: '', published: true,
    blurb: 'How machines learn, how chatbots work, how to prompt well and how to use AI safely and fairly.',
    learn: ['What AI, machine learning and deep learning are', 'Supervised, unsupervised and reinforcement learning', 'Neural networks and language models', 'Writing good prompts', 'Ethics, bias and safety'] }, []),
  mk({ id: 'english', cat: 'School', level: 'All levels', title: 'English Grammar Fundamentals', img: IMG.english, fallback: '', published: true,
    blurb: 'Parts of speech, sentences, tenses, agreement and punctuation, with practice after every lesson.',
    learn: ['Parts of speech and sentence types', 'Nouns, articles and plurals', 'Present, past and future tenses', 'Subject-verb agreement and common mix-ups', 'Punctuation and proofreading'] }, []),
]

export const seedCourses = base.map(c => ({ ...c, ...(extras[c.id] || {}) }))

// Add REAL testimonials here ({ name, init, role, text }). The scrolling section picks them up automatically; with 6 or more it becomes two rows.
export const reviews = [
  { name: 'Helen M.', init: 'HM', role: 'Parent — Scratch Programming', text: 'My son went from barely touching a keyboard to building his own Scratch games in two months. The tutors are patient and genuinely care.' },
  { name: 'Dawit T.', init: 'DT', role: 'Student — Python Programming', text: 'I joined the Python course with zero experience. Three months later I built a small automation script for my own business. Worth every Birr.' },
  { name: 'Selam A.', init: 'SA', role: 'Parent — Math Tutoring', text: 'The math tutoring helped my daughter go from struggling with algebra to topping her class. The 1:1 attention makes all the difference.' },
]
export const pricing = [
  { t: 'Scratch & Python', p: '500 Birr / hr', pop: true, f: ['1:1 personalized sessions', 'Hands-on mini projects', 'Flexible scheduling'] },
  { t: 'Web Development', p: '600 Birr / hr', f: ['HTML, CSS & JavaScript', 'Real portfolio projects', 'Career-focused curriculum'] },
  { t: 'Math Tutoring', p: '600 Birr / hr', f: ['Grade 5–12 curriculum', 'Algebra to Calculus', 'Exam-focused practice'] },
  { t: 'Digital Literacy & Exam Prep', p: '500-600 Birr / hr', f: ['Computer & internet basics', 'National exam strategies', 'Past papers & mock tests'] },
]
export const contactFaqs = [
  ['Are sessions online or in person?', "Both — we offer online sessions over video call for students anywhere, and in-person sessions for students based in Addis Ababa. Let us know your preference when you reach out and we'll work around it."],
  ['How long is each session and how is it priced?', 'Sessions are typically 1 hour, billed at an hourly rate that depends on the course (500–600 Birr/hour). There are no packages to buy upfront — you pay as you go, and can pause or switch courses anytime.'],
  ['What age groups or skill levels do you teach?', "All of them — from young kids starting with Scratch, to teens preparing for national exams, to adults learning Python or web development from zero. Every course is 1:1, so we tailor the pace to whoever's in the seat."],
  ['Do I need my own computer or software?', "For online sessions, yes — a laptop or desktop with a stable internet connection. We'll tell you exactly what (free) software to install before your first session, like Python or a code editor."],
  ['What if I want to cancel or reschedule?', "Just message us on Telegram or by phone as early as you can — we're flexible and will find a new time that works for you, no penalty for reasonable notice."],
]
