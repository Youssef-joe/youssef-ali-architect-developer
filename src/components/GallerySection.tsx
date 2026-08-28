import { useLanguage } from '../contexts/LanguageContext';
import { eras } from '../data/site';

export default function GallerySection() {
  const { language } = useLanguage();

  return (
    <section 
      id="gallery" 
      className="shell reveal py-24 relative border-t border-border-light mt-12"
      aria-label="Life & Eras Gallery"
    >
      {/* Header */}
      <div className="mb-24 md:mb-32 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <div className="label mb-6">Gallery Section</div>
          <h2 className="text-5xl md:text-7xl font-serif font-medium tracking-tighter leading-none mb-6">
            LIFE <br/> & ERAS
          </h2>
          <div className="w-12 h-1 bg-accent-teal"></div>
        </div>
        <p className="text-base text-text-grey font-mono max-w-md">
          {language === 'en' 
            ? 'A curated exhibition traversing different phases, styles, and approaches to system building and life.'
            : 'معرض منسق يتنقل عبر مراحل وأساليب مختلفة في بناء الأنظمة والحياة.'}
        </p>
      </div>

      {/* Eras List */}
      <div className="flex flex-col gap-32 md:gap-48">
        {eras.map((era, index) => (
          <div key={era.id} className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
            
            {/* Typography Column */}
            <div className={`md:col-span-4 flex flex-col justify-center py-4 z-10 ${index % 2 !== 0 ? 'md:order-2' : 'md:order-1'}`}>
              <div>
                <span className="font-mono text-xs tracking-[0.3em] uppercase mb-4 block text-text-grey">
                  {era.subtitle}
                </span>
                <h3 className="text-4xl md:text-5xl font-sans font-bold tracking-tighter leading-none mb-6">
                  {era.title}
                </h3>
                <p className="text-lg text-text-charcoal font-serif max-w-sm leading-relaxed mb-8">
                  {era[language].description}
                </p>
              </div>

              {/* Minimalist divider / metadata */}
              <div className="border-t border-border-strong pt-6">
                <div className="flex items-center justify-between">
                  <span className="label">Phase {index + 1}</span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-text-grey">
                    <path d="M12 2L2 22h20L12 2z" />
                    <circle cx="12" cy="14" r="3" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Image Column */}
            <div className={`md:col-span-8 relative group overflow-hidden bg-bg-raised ${index % 2 !== 0 ? 'md:order-1' : 'md:order-2'}`}>
              {/* Faux Museum Frame/Matte */}
              <div className="absolute inset-0 border-[16px] border-bg-warm-white z-10 pointer-events-none mix-blend-overlay"></div>
              
              <img 
                src={era.image} 
                alt={era.title} 
                className="w-full h-auto object-cover aspect-[3/4] md:aspect-[4/5] md:h-[80vh] transition-transform duration-1000 group-hover:scale-105 filter contrast-110 saturate-105"
              />

              {/* Hover overlay text */}
              <div className="absolute bottom-8 left-8 z-20 mix-blend-difference text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="font-mono text-[10px] tracking-widest uppercase">{era.id.replace('-', ' ')}</span>
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
