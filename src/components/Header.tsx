import { motion } from 'framer-motion';

const Header = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm"
    >
      <nav className="container-narrow py-4 flex items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-semibold text-foreground hover:opacity-70 transition-opacity"
        >
          YA
        </button>

        <div className="flex items-center gap-8">
          <button
            onClick={() => scrollToSection('about')}
            className="nav-link text-sm"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection('projects')}
            className="nav-link text-sm"
          >
            Projects
          </button>
          <a
            href="#resume"
            className="btn-resume"
          >
            Resume
          </a>
        </div>
      </nav>
    </motion.header>
  );
};

export default Header;