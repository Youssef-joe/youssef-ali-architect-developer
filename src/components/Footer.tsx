import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="py-24 section-light">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="section-heading mb-8 text-slate-950 text-balance">
            {t('footer.cta')}
          </p>

          <div className="flex items-center justify-center gap-6">
            <a
              href="https://github.com/Youssef-joe"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-slate-900 transition-colors duration-200"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/youssef-ali-7792b21b3/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-slate-900 transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:hello@youssefali.dev"
              className="text-slate-500 hover:text-slate-900 transition-colors duration-200"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>

          <p className="mt-12 text-sm text-slate-500">
            © {new Date().getFullYear()} {t('hero.name')}. {t('footer.copyright')}
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
