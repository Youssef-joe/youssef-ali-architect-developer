import type { Language } from '../contexts/LanguageContext';

export const contact = {
  email: 'youssef.ali9966@gmail.com',
  linkedin: 'https://linkedin.com/in/youssef-ali-7792b21b3',
  github: 'https://github.com/youssef-joe',
};

/** Last time the CV content below was reviewed. Update when you edit cvData. */
export const cvUpdated = '2026.07';

type Localized<T> = Record<Language, T>;

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export const hero: Localized<{
  name: string;
  role: string;
  statement: string;
  location: string;
  availability: string;
}> = {
  en: {
    name: 'Youssef Ali',
    role: 'Systems Engineer',
    statement: 'I build real-time infrastructure — and, when the mood strikes, operating systems from scratch.',
    location: 'Cairo, Egypt',
    availability: 'Full-Stack Engineer at EnovaWorx',
  },
  ar: {
    name: 'يوسف علي',
    role: 'مهندس أنظمة',
    statement: 'أبني بنية تحتية تعمل في الوقت الفعلي — وأحياناً أنظمة تشغيل من الصفر.',
    location: 'القاهرة، مصر',
    availability: 'مهندس Full-Stack في إنوفاوركس',
  },
};

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */

export const about: Localized<{ lead: string; body: string[] }> = {
  en: {
    lead: 'I care about the layer underneath the one I am working in.',
    body: [
      "I'm a systems engineer based in Cairo. At EnovaWorx I build SaaS infrastructure — AI integration, full-stack platform work, and the plumbing that keeps it all responsive. Before that I worked on backend systems for a job board at Infotech Global and a real-estate platform at XFede.",
      "Outside of client work I stay close to the metal. Ayno is a multi-tenant real-time messaging engine I wrote in Elixir, Go, and C++. Joe's OS is an operating system built from nothing, targeting both x86 and RISC-V. Neither started as a product; both started as an argument with myself about how something actually works.",
      'These days most of my open source time goes to the PostgreSQL tooling ecosystem — pgagroal, pgmoneta, pgexporter, and pgvictoria — which is C, close to the database, and exactly the kind of work I like. Before that, Gitea and Meshery. I also led a Google Developer Group chapter for two years. I think elegant architecture is mostly a byproduct of refusing to treat any layer as a black box.',
    ],
  },
  ar: {
    lead: 'يهمّني دائماً ما يوجد في الطبقة الأدنى من التي أعمل عليها.',
    body: [
      'مهندس أنظمة مقيم في القاهرة. أعمل في إنوفاوركس على بناء بنية تحتية لمنصات SaaS — تكامل الذكاء الاصطناعي، وتطوير المنصات Full-Stack، والأساس الذي يبقيها سريعة الاستجابة. قبل ذلك عملت على أنظمة Backend لمنصة توظيف في إنفوتيك جلوبال، ومنصة عقارية في إكسفيدي.',
      'وخارج العمل، أبقى قريباً من المستوى المنخفض. أينو محرك مراسلة فورية متعدد المستأجرين كتبته بلغات Elixir و Go و C++. و Joe\'s OS نظام تشغيل بنيته من الصفر ليعمل على معماريتَي x86 و RISC-V. لم يبدأ أيٌّ منهما كمنتج، بل كمحاولة لفهم كيف تعمل الأشياء فعلاً.',
      'معظم وقتي في المصدر المفتوح يذهب حالياً إلى منظومة أدوات PostgreSQL — pgagroal و pgmoneta و pgexporter و pgvictoria — وهي مكتوبة بلغة C وقريبة من قلب قاعدة البيانات، وهذا بالضبط نوع العمل الذي أحبه. وقبلها ساهمت في Gitea و Meshery. كما قدت فرع مجموعات مطوري جوجل لمدة عامين. أؤمن أن الهندسة الأنيقة نتيجة طبيعية لرفض التعامل مع أي طبقة كصندوق مغلق.',
    ],
  },
};

/* ------------------------------------------------------------------ */
/* Selected work                                                       */
/* ------------------------------------------------------------------ */

export interface WorkItem {
  id: string;
  year: string;
  stack: string[];
  href?: string;
  en: { title: string; role: string; summary: string };
  ar: { title: string; role: string; summary: string };
}

export const work: WorkItem[] = [
  {
    id: 'ayno',
    year: '2024 — 2025',
    stack: ['Elixir', 'Go', 'C++'],
    en: {
      title: 'Ayno',
      role: 'Real-time messaging engine',
      summary:
        'A multi-tenant messaging engine built for sustained concurrent connections. Elixir handles supervision and fan-out, Go the edge services, C++ the hot paths.',
    },
    ar: {
      title: 'أينو',
      role: 'محرك مراسلة فورية',
      summary:
        'محرك مراسلة متعدد المستأجرين مصمم لتحمّل اتصالات متزامنة مستمرة. Elixir للإشراف والتوزيع، و Go لخدمات الحافة، و C++ للمسارات الحرجة.',
    },
  },
  {
    id: 'joes-os',
    year: '2024 — 2025',
    stack: ['C', 'Assembly', 'RISC-V'],
    en: {
      title: "Joe's OS",
      role: 'Operating system from scratch',
      summary:
        'Bootloader, memory management, and scheduler written from nothing, targeting both x86 and RISC-V. An exercise in removing every abstraction I had been taking for granted.',
    },
    ar: {
      title: "Joe's OS",
      role: 'نظام تشغيل من الصفر',
      summary:
        'محمّل إقلاع وإدارة ذاكرة ومجدوِل مهام كُتبت من الصفر لمعماريتَي x86 و RISC-V. تمرين في إزالة كل تجريد كنت أعتبره أمراً مسلّماً به.',
    },
  },
  {
    id: 'novel-nest',
    year: '2024',
    stack: ['Next.js', 'Go', 'WebRTC'],
    en: {
      title: 'Novel-Nest',
      role: 'AI-powered book platform',
      summary:
        'A reading and discussion platform with live WebRTC sessions and an AI layer for recommendations and summarisation.',
    },
    ar: {
      title: 'نوفل-نيست',
      role: 'منصة كتب مدعومة بالذكاء الاصطناعي',
      summary:
        'منصة للقراءة والنقاش تتضمن جلسات مباشرة عبر WebRTC وطبقة ذكاء اصطناعي للتوصيات والتلخيص.',
    },
  },
  {
    id: 'db-studio',
    year: '2024',
    stack: ['React', 'Hono', 'TypeScript'],
    en: {
      title: 'DB-Studio',
      role: 'Universal database client',
      summary:
        'One management surface across database engines — schema browsing, query editing, and inspection without switching tools.',
    },
    ar: {
      title: 'DB-ستوديو',
      role: 'عميل قواعد بيانات عام',
      summary:
        'واجهة إدارة موحّدة لمحركات قواعد بيانات مختلفة — تصفح المخططات وتحرير الاستعلامات والفحص دون تبديل الأدوات.',
    },
  },
];

/* ------------------------------------------------------------------ */
/* CV                                                                  */
/* ------------------------------------------------------------------ */

export interface CVItem {
  category: string;
  title: string;
  subtitle?: string;
  year: string;
}

export const cvData: Record<Language, CVItem[]> = {
  ar: [
    { category: 'الخبرات', title: 'إنوفاوركس', subtitle: 'مهندس Full-Stack / SaaS / ماريلاند، الولايات المتحدة', year: '2026 - الحاضر' },
    { category: 'الخبرات', title: 'إنفوتيك جلوبال', subtitle: 'مهندس Backend / منصة توظيف / القاهرة', year: '2025 - 2026' },
    { category: 'الخبرات', title: 'إكسفيدي', subtitle: 'مهندس Full-Stack / عقارات / القاهرة', year: '2025' },
    { category: 'التعليم', title: 'أكاديمية القاهرة الجديدة', subtitle: 'بكالوريوس علوم الحاسب', year: '2023 - الحاضر' },
    { category: 'التعليم', title: 'معهد أميت للتعلم', subtitle: 'دبلوم Node.js (98/100)', year: '2023' },
    { category: 'المصدر المفتوح', title: 'منظومة PostgreSQL', subtitle: 'pgagroal، pgmoneta، pgexporter، pgvictoria / مساهم', year: '2026 - الحاضر' },
    { category: 'المصدر المفتوح', title: 'جيتيا', subtitle: 'خدمة Git مكتفية ذاتياً / مساهم', year: '2024 - 2025' },
    { category: 'المصدر المفتوح', title: 'مشيري', subtitle: 'إدارة بنية تحتية سحابية / مساهم', year: '2024 - 2025' },
    { category: 'المجتمع', title: 'GDG', subtitle: 'قائد مجموعات مطوري جوجل / سنتان', year: '2023 - 2025' },
    { category: 'التقنيات', title: 'اللغات', subtitle: 'TypeScript, Go, Elixir, Python, C++, C#, C, Assembly', year: '' },
    { category: 'التقنيات', title: 'الأدوات', subtitle: 'Node.js, .NET, React, Remix, Docker, GitHub Actions, FastAPI, Drizzle, Prisma, PostgreSQL, MongoDB', year: '' },
  ],
  en: [
    { category: 'Experience', title: 'EnovaWorx', subtitle: 'Full-Stack Engineer / SaaS / Maryland, USA', year: '2026 - Present' },
    { category: 'Experience', title: 'Infotech Global', subtitle: 'Backend Engineer / Job Board / Cairo', year: '2025 - 2026' },
    { category: 'Experience', title: 'XFede', subtitle: 'Full-Stack Engineer / Real Estate / Cairo', year: '2025' },
    { category: 'Education', title: 'New Cairo Academy', subtitle: 'BS in Computer Science', year: '2023 - Present' },
    { category: 'Education', title: 'AMIT Learning', subtitle: 'Node.js Diploma (98/100)', year: '2023' },
    { category: 'Open Source', title: 'PostgreSQL Ecosystem', subtitle: 'pgagroal, pgmoneta, pgexporter, pgvictoria / Contributor', year: '2026 - Present' },
    { category: 'Open Source', title: 'Gitea', subtitle: 'Self-hosted Git service / Contributor', year: '2024 - 2025' },
    { category: 'Open Source', title: 'Meshery', subtitle: 'Cloud-native infra management / Contributor', year: '2024 - 2025' },
    { category: 'Community', title: 'GDG', subtitle: 'Google Developer Groups Leader / Two Years', year: '2023 - 2025' },
    { category: 'Tech Stack', title: 'Languages', subtitle: 'TypeScript, Go, Elixir, Python, C++, C#, C, Assembly', year: '' },
    { category: 'Tech Stack', title: 'Tooling', subtitle: 'Node.js, .NET, React, Remix, Docker, GitHub Actions, FastAPI, Drizzle, Prisma, PostgreSQL, MongoDB', year: '' },
  ],
};

export const sectionOrder: Record<Language, string[]> = {
  ar: ['الخبرات', 'التعليم', 'المصدر المفتوح', 'المجتمع', 'التقنيات'],
  en: ['Experience', 'Education', 'Open Source', 'Community', 'Tech Stack'],
};

/* ------------------------------------------------------------------ */
/* UI strings                                                          */
/* ------------------------------------------------------------------ */

export const ui: Localized<Record<string, string>> = {
  en: {
    navAbout: 'About',
    navWork: 'Work',
    navWriting: 'Writing',
    navCV: 'CV',
    navContact: 'Contact',
    sectionWriting: 'Writing',
    writingTitle: 'Notes on systems, and what breaks in them.',
    writingEmpty: 'Nothing published yet.',
    writingAll: 'All articles',
    minRead: 'min read',
    draftBadge: 'Draft',
    share: 'Share',
    shareCopied: 'Link copied',
    articleMissing: 'That article does not exist.',
    backHome: 'Back home',
    skipToContent: 'Skip to content',
    sectionAbout: 'About',
    sectionWork: 'Selected Work',
    sectionCV: 'Curriculum Vitae',
    sectionContact: 'Contact',
    scrollHint: 'Scroll',
    updatedPrefix: 'Last reviewed',
    contactLead: 'Open to conversations about systems work, infrastructure, and anything low-level.',
    emailLabel: 'Email',
    toggleTheme: 'Toggle colour theme',
    toggleLang: 'Switch language to Arabic',
    backToTop: 'Back to top',
  },
  ar: {
    navAbout: 'نبذة',
    navWork: 'الأعمال',
    navWriting: 'مقالات',
    navCV: 'السيرة',
    navContact: 'تواصل',
    sectionWriting: 'مقالات',
    writingTitle: 'ملاحظات عن الأنظمة، وما يتعطّل فيها.',
    writingEmpty: 'لا توجد مقالات منشورة بعد.',
    writingAll: 'كل المقالات',
    minRead: 'دقيقة قراءة',
    draftBadge: 'مسودة',
    share: 'مشاركة',
    shareCopied: 'تم نسخ الرابط',
    articleMissing: 'هذه المقالة غير موجودة.',
    backHome: 'العودة للرئيسية',
    skipToContent: 'تخطَّ إلى المحتوى',
    sectionAbout: 'نبذة',
    sectionWork: 'أعمال مختارة',
    sectionCV: 'السيرة الذاتية',
    sectionContact: 'تواصل',
    scrollHint: 'مرّر',
    updatedPrefix: 'آخر مراجعة',
    contactLead: 'مرحّب بالحديث عن هندسة الأنظمة والبنية التحتية وكل ما هو منخفض المستوى.',
    emailLabel: 'البريد',
    toggleTheme: 'تبديل مظهر الألوان',
    toggleLang: 'التبديل إلى الإنجليزية',
    backToTop: 'العودة إلى الأعلى',
  },
};
