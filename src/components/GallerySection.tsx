import { useLanguage } from '../contexts/LanguageContext';

export default function GallerySection() {
  const { language } = useLanguage();

  return (
    <section
      id="gallery"
      className="relative w-full h-[120vh] md:h-screen bg-[#F4F1EC] text-[#1A1A1A] overflow-hidden flex items-center justify-center font-sans mt-0"
    >

      {/* Top bar (Header-like) */}
      <div className="absolute top-0 w-full p-6 flex justify-between items-center z-50">
        <div className="text-3xl font-light cursor-pointer hover:scale-110 transition-transform">+</div>
        <div className="font-serif italic text-2xl md:text-3xl tracking-widest" style={{ fontFamily: '"Brush Script MT", "Snell Roundhand", cursive' }}>
          Youssef Ali
        </div>
        <div className="text-sm font-bold tracking-widest cursor-pointer hover:text-[#FF3300] transition-colors">ART AKA SOUL</div>
      </div>

      {/* Main Image with Vignette/Cutout effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 overflow-hidden">
        <div className="relative w-full max-w-3xl h-full md:h-[90vh] mt-20">
          <img
            src="/classical_portrait.jpg"
            alt="Classical Portrait"
            className="w-full h-full object-cover object-top filter contrast-125 saturate-110"
            style={{
              WebkitMaskImage: 'radial-gradient(ellipse at 50% 40%, black 30%, transparent 70%)',
              maskImage: 'radial-gradient(ellipse at 50% 40%, black 30%, transparent 70%)'
            }}
          />
        </div>
      </div>

      {/* Typography Layer - Z-20 */}
      <div className="relative z-20 w-full max-w-[1400px] h-full mx-auto flex flex-col justify-center pointer-events-none p-4 md:p-8">

        {/* Top left text */}
        <div className="absolute top-[12%] left-[4%] md:left-[8%]">
          <h1 className="text-[18vw] md:text-[11vw] font-serif leading-[0.85] text-[#FF2300] uppercase tracking-tighter" style={{ textShadow: '2px 2px 10px rgba(244, 241, 236, 0.5)' }}>
            THE<br />ART
          </h1>
        </div>

        {/* Center overlaid text */}
        <div className="absolute top-[45%] left-[10%] md:left-[30%] mix-blend-overlay">
          <h1 className="text-[15vw] md:text-[12vw] font-serif leading-[0.8] text-white/90 uppercase tracking-tighter mix-blend-overlay">
            IS ALWAYS
          </h1>
        </div>

        {/* Bottom right text */}
        <div className="absolute bottom-[10%] right-[4%] md:right-[8%] text-right flex flex-col items-end">
          <div className="italic font-light lowercase text-[14vw] md:text-[9vw] text-[#FF2300] -mb-4 md:-mb-8 mr-4 z-10" style={{ fontFamily: '"Brush Script MT", "Snell Roundhand", cursive' }}>
            A Story
          </div>
          <h1 className="font-serif uppercase text-[20vw] md:text-[14vw] leading-[0.75] text-[#FF2300] tracking-tighter">
            TELLS
          </h1>
        </div>

      </div>

      {/* Floating elements Z-30 */}
      <div className="absolute top-[22%] right-[8%] w-56 text-right z-30 hidden lg:block">
        {/* Abstract sketch SVG */}
        <div className="flex justify-end mb-6 opacity-80">
          <svg width="80" height="60" viewBox="0 0 100 60" fill="none" stroke="#1A1A1A" strokeWidth="0.5">
            <path d="M50 10 Q 60 20 80 15 Q 70 30 90 40 Q 60 45 50 55 Q 40 45 10 40 Q 30 30 20 15 Q 40 20 50 10 Z" />
            <path d="M50 10 L50 55" strokeDasharray="2 2" />
            <circle cx="50" cy="30" r="5" />
          </svg>
        </div>
        <p className="text-[10px] uppercase font-mono tracking-widest leading-relaxed text-left text-[#1A1A1A]/80">
          {language === 'en'
            ? 'Each work is an encounter with time — where beauty does not fade, but transforms. We invite you to experience art not as an object on display, but as a living dialogue.'
            : 'كل عمل هو لقاء مع الزمن — حيث لا يتلاشى الجمال، بل يتحول. ندعوك لتجربة الفن ليس كشيء معروض، بل كحوار حي.'}
        </p>
      </div>

      {/* <div className="absolute right-[8%] top-[55%] flex gap-16 text-[10px] font-bold tracking-widest z-30 hidden xl:flex text-[#1A1A1A]">
        <div className="uppercase">Open Daily</div>
        <div className="text-right uppercase">10:00 AM<br/>— 06:00 PM</div>
      </div> */}

      {/* Ticket UI Element */}
      <div className="absolute bottom-4 md:bottom-12 left-[4%] md:left-[8%] w-48 md:w-64 bg-[#0a0a0a] text-[#F4F1EC] p-6 z-30 flex flex-col shadow-2xl overflow-hidden pointer-events-auto cursor-pointer hover:-translate-y-2 transition-transform duration-500">
        {/* Ticket edge cutouts using absolute pseudo-elements conceptually, implemented as small circles */}
        <div className="absolute top-1/2 -left-3 w-6 h-6 bg-[#F4F1EC] rounded-full -translate-y-1/2"></div>
        <div className="absolute top-1/2 -right-3 w-6 h-6 bg-[#F4F1EC] rounded-full -translate-y-1/2"></div>

        <div className="text-center text-[10px] md:text-xs font-bold tracking-widest uppercase border-b border-dashed border-white/20 pb-4 mb-6">
          check story
        </div>

        {/* Golden ornate frame mockup */}
        <div className="w-full aspect-square border-[6px] md:border-[10px] border-[#9c7c38] bg-[#222] p-2 md:p-3 shadow-inner relative">
          <div className="absolute inset-0 border border-[#c4a661] m-1 opacity-50"></div>
          <img
            src="/classical_portrait.jpg"
            className="w-full h-full object-cover filter contrast-125 sepia-[0.4]"
            alt="Portrait Miniature"
          />
        </div>

        {/* Bottom perforated edge */}
        <div className="absolute bottom-0 left-0 w-full h-3 flex justify-evenly items-end overflow-hidden pb-1">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-[#F4F1EC] translate-y-1/2"></div>
          ))}
        </div>
      </div>

    </section>
  );
}
