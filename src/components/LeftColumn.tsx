import ShaderCanvas from './ShaderCanvas';
import { useLanguage } from '../contexts/LanguageContext';

const profileText = {
  ar: 'يوسف علي أحمد، مهندس أنظمة مقيم في القاهرة، مصر. متخصص في البنية التحتية في الوقت الفعلي (Go، Elixir، C++) وتطوير أنظمة التشغيل منخفضة المستوى. بنيت أينو، محرك مراسلة فوري متعدد المستأجرين، و جو\'s OS من الصفر لاستهداف x86 و RISC-V. مع خبرة إنتاجية في تكامل الذكاء الاصطناعي لمنصات SaaS، والتطوير Full-Stack، والأنظمة الموزعة. قائد مجتمع GDG ومساهم نشط في المصدر المفتوح. أؤمن بأن هندسة الأنظمة الأنيقة تنشأ من الفهم العميق للمبادئ الأساسية.',
  en: "Youssef Ali Ahmed, systems engineer based in Cairo, Egypt. I specialize in real-time infrastructure (Go, Elixir, C++) and low-level OS development. I built Ayno, a multi-tenant real-time messaging engine, and Joe's OS from scratch targeting x86 and RISC-V. With production experience in SaaS AI integration, full-stack development, and distributed systems. GDG community leader and active open source contributor. I believe elegant system architecture comes from deep understanding of fundamental principles.",
};

const email = 'youssef.ali9966@gmail.com';
const linkedin = 'https://linkedin.com/in/youssef-ali-7792b21b3';
const github = 'https://github.com/youssef-joe';

interface LeftColumnProps {
  onContactClick: () => void;
}

export default function LeftColumn({ onContactClick }: LeftColumnProps) {
  const { language } = useLanguage();

  return (
    <aside
      className="sticky top-0 h-screen flex flex-col"
      style={{ width: '100%', minWidth: '0', position: 'relative' }}
    >
      <ShaderCanvas />

      <div className="relative z-10 flex flex-col h-full p-6" style={{ mixBlendMode: 'difference' }}>
        <div className="mb-8">
          <h2 style={{ fontSize: '12px', fontWeight: 400, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#FFFFFF', marginBottom: '16px', lineHeight: 1.4 }}>
            PROFILE (CONTACT)
          </h2>
          <div className="space-y-1">
            <a href={`mailto:${email}`} style={{ fontSize: '12px', color: '#FFFFFF', textDecoration: 'underline', textUnderlineOffset: '3px', display: 'block', lineHeight: 1.6 }}>
              {email}
            </a>
            <a href={linkedin} target="_blank" rel="noopener noreferrer" style={{ fontSize: '12px', color: '#FFFFFF', textDecoration: 'underline', textUnderlineOffset: '3px', display: 'block', lineHeight: 1.6 }}>
              LinkedIn
            </a>
            <a href={github} target="_blank" rel="noopener noreferrer" style={{ fontSize: '12px', color: '#FFFFFF', textDecoration: 'underline', textUnderlineOffset: '3px', display: 'block', lineHeight: 1.6 }}>
              GitHub
            </a>
          </div>
        </div>

        <div style={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
          <p style={{ fontSize: '12px', lineHeight: 1.8, color: '#FFFFFF', maxWidth: '240px', textAlign: 'justify' }}>
            {profileText[language]}
          </p>
        </div>

        <div className="mt-auto" style={{ flexShrink: 0, paddingBottom: '24px' }}>
          <button
            onClick={onContactClick}
            style={{ fontSize: '12px', fontWeight: 400, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#FFFFFF', background: 'none', border: 'none', cursor: 'pointer', padding: 0, transition: 'opacity 0.2s ease' }}
            onMouseEnter={(e) => { (e.target as HTMLElement).style.opacity = '0.6'; }}
            onMouseLeave={(e) => { (e.target as HTMLElement).style.opacity = '1'; }}
          >
            CONTACT
          </button>
        </div>
      </div>
    </aside>
  );
}
