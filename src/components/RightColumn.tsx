import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

interface CVItem { category: string; title: string; subtitle?: string; year: string; }

const cvData: Record<string, CVItem[]> = {
  ar: [
    { category: 'التعليم', title: 'أكاديمية القاهرة الجديدة', subtitle: 'بكالوريوس علوم الحاسب', year: '2023 - الحاضر' },
    { category: 'التعليم', title: 'معهد أميت للتعلم', subtitle: 'دبلوم Node.js (98/100)', year: '2023' },
    { category: 'الخبرات', title: 'إنوفاوركس', subtitle: 'مهندس Full-Stack / SaaS / ماريلاند، الولايات المتحدة', year: '2026 - الحاضر' },
    { category: 'الخبرات', title: 'إنفوتيك جlobal', subtitle: 'مهندس Backend / منصة توظيف / القاهرة', year: '2025 - 2026' },
    { category: 'الخبرات', title: 'إكسفيدي', subtitle: 'مهندس Full-Stack / عقارات / القاهرة', year: '2025' },
    { category: 'المشاريع', title: "Joe's OS", subtitle: 'نظام تشغيل مخصص x86 و RISC-V', year: '2024 - 2025' },
    { category: 'المشاريع', title: 'أينو', subtitle: 'محرك مراسلة فورية متعدد المستأجرين (Elixir/Go/C++)', year: '2024 - 2025' },
    { category: 'المشاريع', title: 'نوفل-نيست', subtitle: 'منصة كتب مدعومة بالذكاء الاصطناعي (Next.js/Express/Golang/WebRTC)', year: '2024' },
    { category: 'المشاريع', title: 'DB-ستوديو', subtitle: 'أداة إدارة قواعد بيانات عامة (React/Hono/TypeScript)', year: '2024' },
    { category: 'المصدر المفتوح', title: 'جيتيا', subtitle: 'خدمة Git مكتفية ذاتياً / مساهم', year: '2024 - 2025' },
    { category: 'المصدر المفتوح', title: 'مشيري', subtitle: 'إدارة بنية تحتية سحابية / مساهم', year: '2024 - 2025' },
    { category: 'المجتمع', title: 'GDG', subtitle: 'قائد مجموعات مطوري جوجل / سنتان', year: '2023 - 2025' },
    { category: 'التقنيات', title: 'اللغات', subtitle: 'TypeScript, Go, Elixir, Python, C++, C#, C, Assembly', year: '' },
    { category: 'التقنيات', title: 'التقنيات', subtitle: 'Node.js, .NET, React, Remix, Docker, GitHub Actions, FastAPI, Drizzle, Prisma, PostgreSQL, MongoDB', year: '' },
  ],
  en: [
    { category: 'Education', title: 'New Cairo Academy', subtitle: 'BS in Computer Science', year: '2023 - Present' },
    { category: 'Education', title: 'AMIT Learning', subtitle: 'Node.js Diploma (98/100)', year: '2023' },
    { category: 'Experience', title: 'EnovaWorx', subtitle: 'Full-Stack Engineer / SaaS / Maryland, USA', year: '2026 - Present' },
    { category: 'Experience', title: 'Infotech Global', subtitle: 'Backend Engineer / Job Board / Cairo', year: '2025 - 2026' },
    { category: 'Experience', title: 'XFede', subtitle: 'Full-Stack Engineer / Real Estate / Cairo', year: '2025' },
    { category: 'Projects', title: "Joe's OS", subtitle: 'OS from scratch targeting x86 & RISC-V', year: '2024 - 2025' },
    { category: 'Projects', title: 'Ayno', subtitle: 'Multi-tenant real-time messaging engine', year: '2024 - 2025' },
    { category: 'Projects', title: 'Novel-Nest', subtitle: 'AI-powered book platform with WebRTC', year: '2024' },
    { category: 'Projects', title: 'DB-Studio', subtitle: 'Universal DB management studio', year: '2024' },
    { category: 'Open Source', title: 'Gitea', subtitle: 'Self-hosted Git service / Contributor', year: '2024 - 2025' },
    { category: 'Open Source', title: 'Meshery', subtitle: 'Cloud-native infra management / Contributor', year: '2024 - 2025' },
    { category: 'Community', title: 'GDG', subtitle: 'Google Developer Groups Leader / Two Years', year: '2023 - 2025' },
    { category: 'Tech Stack', title: 'Languages', subtitle: 'TypeScript, Go, Elixir, Python, C++, C#, C, Assembly', year: '' },
    { category: 'Tech Stack', title: 'Technologies', subtitle: 'Node.js, .NET, React, Remix, Docker, GitHub Actions, FastAPI, Drizzle, Prisma, PostgreSQL, MongoDB', year: '' },
  ],
};

const sectionOrder: Record<string, string[]> = {
  ar: ['التعليم', 'الخبرات', 'المشاريع', 'المصدر المفتوح', 'المجتمع', 'التقنيات'],
  en: ['Education', 'Experience', 'Projects', 'Open Source', 'Community', 'Tech Stack'],
};

export default function RightColumn() {
  const { language } = useLanguage();
  const artFrameRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!artFrameRef.current || !imageRef.current) return;
    const tween = gsap.fromTo(imageRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' });
    return () => { tween.kill(); };
  }, []);

  const items = cvData[language];
  const sections = items.reduce<Record<string, CVItem[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});
  const order = sectionOrder[language] || sectionOrder['en'];

  const headerText = language === 'ar' ? 'السيرة الذاتية (أرشيف)' : 'CV (ARCHIVE)';
  const updatedText = language === 'ar' ? 'آخر تحديث 2025.06' : 'Last Updated 2025.06';

  return (
    <aside className="sticky top-0 h-screen overflow-y-auto" style={{ width: '100%', minWidth: '0', position: 'relative' }}>
      <div className="p-6 pb-24">
          <h2 style={{ fontSize: '12px', fontWeight: 400, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-grey)', marginBottom: '48px', lineHeight: 1.4 }}>
          {headerText}
        </h2>

        {/* Avatar */}
        <div className="mt-8 mb-10">
          <div ref={artFrameRef} style={{ border: '1px solid var(--border-light)', boxShadow: '0px 4px 15px rgba(0,0,0,0.08)', overflow: 'hidden', aspectRatio: '1 / 1', width: '100%' , paddingTop: '24px', borderRadius: '20px'}}>
            <img ref={imageRef} src="/LinkedInPic.jpeg" alt="Portrait" className="block" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', borderRadius: '20px' }} loading="lazy" />
          </div>
        </div>

        {order.map((category) => {
          const sectionItems = sections[category];
          if (!sectionItems?.length) return null;
          return (
            <div key={category} style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '16px', marginBottom: '16px' }}>
              {sectionItems.map((item, idx) => (
                <div key={idx} className="flex gap-4" style={{ marginBottom: idx < sectionItems.length - 1 ? '16px' : '0' }}>
                  {idx === 0
                    ? <span style={{ fontSize: '12px', fontWeight: 400, color: 'var(--text-charcoal)', lineHeight: 1.6, flexShrink: 0, width: '80px' }}>{category}</span>
                    : <span style={{ width: '80px', flexShrink: 0 }} />
                  }
                  <div className="flex-1">
                    <p style={{ fontSize: '12px', lineHeight: 1.6, color: 'var(--text-charcoal)', whiteSpace: 'pre-line' }}>{item.title}</p>
                    {item.subtitle && <p style={{ fontSize: '12px', lineHeight: 1.6, color: 'var(--text-grey)', whiteSpace: 'pre-line' }}>{item.subtitle}</p>}
                    {item.year && <p style={{ fontSize: '12px', lineHeight: 1.6, color: 'var(--text-charcoal)' }}>{item.year}</p>}
                  </div>
                </div>
              ))}
            </div>
          );
        })}

        <p style={{ fontSize: '11px', color: 'var(--text-grey)', marginTop: '32px' }}>{updatedText}</p>
      </div>
    </aside>
  );
}
