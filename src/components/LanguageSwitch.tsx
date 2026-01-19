import { useLanguage } from '@/contexts/LanguageContext';

const LanguageSwitch = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
      className="text-sm font-mono text-muted-foreground hover:text-foreground transition-colors duration-200"
      aria-label="Switch language"
    >
      {language === 'en' ? 'عربي' : 'EN'}
    </button>
  );
};

export default LanguageSwitch;