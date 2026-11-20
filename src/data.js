// All portfolio content lives here, so text can be updated without touching the components.

export const profile = {
  name: 'Devashish Deshmukh',
  email: 'devashishdeshmukh12@gmail.com',
  location: 'Wakad, Pune, India', // TODO: confirm — you currently work in Goa
  resume: 'assets/Devashish_Resume.pdf',
  experience: '1+', // shown in the Hero, About and Experience sections
  drawingNo: `DD-${new Date().getFullYear()}-001`,
  github: 'https://github.com/Devashish-06',
  linkedin: '', // TODO: add your LinkedIn profile URL; the icon is hidden while this is empty
  leetcode: 'https://leetcode.com/u/Devashish_deshmukh_/',
};

export const sections = [
  { id: 'about', no: '01', label: 'About' },
  { id: 'experience', no: '02', label: 'Experience' },
  { id: 'work', no: '03', label: 'Work' },
  { id: 'stack', no: '04', label: 'Stack' },
  { id: 'contact', no: '05', label: 'Contact' },
];

export const experience = [
  {
    rev: 'B',
    status: 'work',
    role: 'Teamcenter Solution Developer',
    org: 'ACGL',
    place: 'Goa, India',
    dates: 'Current', // TODO: e.g. "Mar 2025 – Present"
    summary:
      'Develop and administer the Siemens Teamcenter PLM platform that engineering teams use to manage product data, structures and change processes.',
    bullets: [
      'Build Teamcenter customisations and solutions for business requirements, from data-model configuration in BMIDE to server-side extensions.',
      'Handle day-to-day administration: users, groups and roles, access rules, preferences and workflow configuration.',
      'Troubleshoot issues and support engineering users so product data keeps moving.',
    ],
    tags: ['Teamcenter', 'BMIDE', 'ITK', 'Workflow Designer', 'Access Manager', 'Linux'],
  },
  {
    rev: 'A',
    status: 'released',
    role: 'Teamcenter Upgrade Engineer',
    org: 'Tata Hitachi',
    place: null,
    dates: 'Completed', // TODO: e.g. "Aug 2024 – Feb 2025"
    upgrade: { from: '11.4', to: '2506', platform: 'Linux' },
    bullets: [
      'Upgraded Teamcenter from 11.4 to 2506 on a Linux environment, a jump across several major releases.',
      'Prepared environments and ran the upgrade: BMIDE template migration, database and schema upgrade, and server and client deployment.',
      'Tested and validated data, customisations and workflows after the upgrade before handing over to users.',
    ],
    tags: ['Teamcenter 2506', 'Upgrade & migration', 'BMIDE', 'Linux', 'Shell scripting'],
  },
];

export const projects = [
  {
    id: 'P-001',
    featured: true,
    name: 'CallNexa',
    category: 'WebRTC · Real-time',
    image: 'Images/callnexa.png',
    alt: 'CallNexa video call with several participants',
    summary: 'Multi-participant video calling in the browser, with a clean, responsive interface.',
    spec: [
      ['Challenge', 'Real-time video calls between several people, directly in the browser.'],
      ['Build', 'Django backend with a JavaScript + WebRTC front end, styled with Bootstrap.'],
      ['Highlights', 'Multi-user calls, screen sharing, mute/unmute, responsive on every device.'],
    ],
    tags: ['Django', 'WebRTC', 'JavaScript', 'Bootstrap'],
    repo: 'https://github.com/Devashish-06/AudioVideoCalling',
    demo: { video: 'demos/callnexa.mp4' }, // or { youtube: 'VIDEO_ID' }
  },
  {
    id: 'P-002',
    name: 'Speech Emotion Recognition',
    category: 'Machine Learning',
    image: 'Images/ser.png',
    alt: 'Speech Emotion Recognition illustration',
    spec: [
      ['Challenge', 'Detect emotion from live speech, in real time.'],
      ['Build', 'MFCC features and an ML model served through a Flask API, with a JavaScript front end for live audio.'],
      ['Result', '82% accuracy with live emotion updates.', '82% accuracy'], // 3rd item = text to highlight
    ],
    tags: ['Python', 'Flask', 'Machine Learning', 'JavaScript'],
    repo: 'https://github.com/Devashish-06/Speech-Emotion-Recognition',
    demo: { video: 'demos/speech-emotion.mp4' },
  },
  {
    id: 'P-003',
    name: 'Desk Mate',
    category: 'Productivity',
    image: 'Images/desktop.png',
    alt: 'Desk Mate desktop assistant',
    spec: [
      ['Challenge', 'Automate everyday desktop tasks, hands-free.'],
      ['Build', 'Python with Pyttsx3 text-to-speech and a Tkinter GUI for quick commands.'],
      ['Highlights', 'Voice or text commands for web search, launching apps, reminders and notes.'],
    ],
    tags: ['Python', 'Tkinter', 'Pyttsx3'],
    repo: 'https://github.com/Devashish-06/Desktop-Assistant',
    demo: { video: 'demos/desk-mate.mp4' },
  },
];

// Bill of materials: [find no., component, icon, category, used in]
// icon: "fa:<class>" for Font Awesome, otherwise a file in public/Icons
export const bom = [
  ['010', 'Teamcenter', 'fa:fa-cubes', 'PLM', 'ACGL · Tata Hitachi'],
  ['020', 'BMIDE', 'fa:fa-diagram-project', 'PLM', 'ACGL · Tata Hitachi'],
  ['030', 'ITK', 'fa:fa-code', 'PLM', 'ACGL'],
  ['040', 'Workflow Designer', 'fa:fa-route', 'PLM', 'ACGL'],
  ['050', 'Access Manager', 'fa:fa-shield-halved', 'PLM', 'ACGL'],
  ['060', 'Active Workspace', 'fa:fa-window-maximize', 'PLM', 'ACGL'],
  ['070', 'Linux', 'linux.svg', 'Platform', 'Tata Hitachi upgrade'],
  ['080', 'Shell scripting', 'fa:fa-terminal', 'Platform', 'Tata Hitachi upgrade'],
  ['090', 'Python', 'python.svg', 'Backend', 'Speech Emotion · Desk Mate'],
  ['100', 'Django', 'django.svg', 'Backend', 'CallNexa'],
  ['110', 'Flask', 'flask.svg', 'Backend', 'Speech Emotion'],
  ['120', 'C++', 'cpp.svg', 'Backend', '400+ LeetCode problems'],
  ['130', 'WebRTC', 'webrtc.svg', 'Backend', 'CallNexa'],
  ['140', 'JavaScript', 'javascript.svg', 'Frontend', 'CallNexa · Speech Emotion'],
  ['150', 'React', 'react.svg', 'Frontend', 'This portfolio'],
  ['160', 'HTML & CSS', 'html.svg', 'Frontend', 'All web projects'],
  ['170', 'Tailwind CSS', 'tailwind.svg', 'Frontend', 'This portfolio'],
  ['180', 'Bootstrap', 'fab:fa-bootstrap', 'Frontend', 'CallNexa'],
  ['190', 'MySQL', 'mysql.svg', 'Data', 'Web projects'],
  ['200', 'Git & GitHub', 'git.svg', 'Tools', 'All projects'],
  ['210', 'VS Code', 'vscode.svg', 'Tools', 'Daily editor'],
];

export const categoryColor = {
  PLM: 'bg-acid',
  Platform: 'bg-ver',
  Backend: 'bg-lav',
  Frontend: 'bg-white',
  Data: 'bg-gray-500',
  Tools: 'bg-gray-500',
};
