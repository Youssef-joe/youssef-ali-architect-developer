import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations = {
  en: {
    // Navigation
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.blog': 'Blog',
    'nav.resume': 'Resume',
    
    // Hero
    'hero.name': 'Youssef Ali',
    'hero.title': 'Software Developer',
    'hero.subtitle': 'Building scalable, user-focused solutions in Cairo.',
    'hero.role': 'Currently Head of Back-End at GDG Cairo.',
    'hero.building': 'Building at',
    'hero.position': '— Software Engineer',
    
    // Projects
    'projects.title': 'Selected Projects',
    'projects.novel.title': 'Novel Nest',
    'projects.novel.desc': 'AI-powered Book Platform with real-time collaboration features',
    'projects.ayno.title': 'Ayno',
    'projects.ayno.desc': 'Real-time messaging engine built for scale and reliability',
    'projects.fantasy.title': 'Fantasy',
    'projects.fantasy.desc': 'Predictive football analytics tool using machine learning',
    
    // Toolkit
    'toolkit.title': 'Technical Toolkit',
    
    // Blog
    'blog.title': 'Writing',
    'blog.minRead': '{min} min read',
    'blog.post1.title': 'From Blueprints to Backends: My Journey into Software',
    'blog.post1.excerpt': 'How architectural thinking shaped my approach to building scalable systems.',
    'blog.post2.title': 'Building Real-Time Systems with Elixir and Go',
    'blog.post2.excerpt': 'Lessons learned from developing Ayno, a high-performance messaging engine.',
    'blog.post3.title': 'The Art of Clean Code Architecture',
    'blog.post3.excerpt': 'Applying structural design principles to create maintainable software.',
    
    // Footer
    'footer.cta': "Let's build something structural.",
    'footer.copyright': 'Built with precision.',
  },
  ar: {
    // Navigation
    'nav.about': 'نبذة',
    'nav.projects': 'المشاريع',
    'nav.blog': 'المدونة',
    'nav.resume': 'السيرة الذاتية',
    
    // Hero
    'hero.name': 'يوسف علي',
    'hero.title': 'مطور برمجيات',
    'hero.subtitle': 'أبني حلولاً قابلة للتوسع تركز على المستخدم في القاهرة.',
    'hero.role': 'حالياً رئيس قسم الباك إند في GDG Cairo.',
    'hero.building': 'أعمل في',
    'hero.position': '— مهندس برمجيات',
    
    // Projects
    'projects.title': 'مشاريع مختارة',
    'projects.novel.title': 'Novel Nest',
    'projects.novel.desc': 'منصة كتب مدعومة بالذكاء الاصطناعي مع ميزات التعاون في الوقت الفعلي',
    'projects.ayno.title': 'Ayno',
    'projects.ayno.desc': 'محرك رسائل فورية مصمم للتوسع والموثوقية',
    'projects.fantasy.title': 'Fantasy',
    'projects.fantasy.desc': 'أداة تحليلات كرة قدم تنبؤية باستخدام التعلم الآلي',
    
    // Toolkit
    'toolkit.title': 'الأدوات التقنية',
    
    // Blog
    'blog.title': 'الكتابات',
    'blog.minRead': '{min} دقائق قراءة',
    'blog.post1.title': 'من المخططات إلى الباك إند: رحلتي في البرمجة',
    'blog.post1.excerpt': 'كيف شكّل التفكير المعماري منهجي في بناء أنظمة قابلة للتوسع.',
    'blog.post2.title': 'بناء أنظمة الوقت الفعلي باستخدام Elixir و Go',
    'blog.post2.excerpt': 'دروس مستفادة من تطوير Ayno، محرك رسائل عالي الأداء.',
    'blog.post3.title': 'فن هندسة الكود النظيف',
    'blog.post3.excerpt': 'تطبيق مبادئ التصميم الهيكلي لإنشاء برمجيات قابلة للصيانة.',
    
    // Footer
    'footer.cta': 'لنبني شيئاً متيناً معاً.',
    'footer.copyright': 'صُنع بدقة.',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  const isRTL = language === 'ar';

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRTL]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}