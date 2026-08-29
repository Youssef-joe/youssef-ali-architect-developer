import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sun, Radio, Activity, Clock, Zap, Star, Shield, Building2, Wind } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const MOSS_GREEN = '#2A3B2C';
const BRASS_GOLD = '#C5A059';
const TERRACOTTA = '#B35A3B';

export default function StorySection() {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -80]);

  const cards = [
    { id: 1, icon: Sun, title: 'Morning', desc: 'The Rising Dawn' },
    { id: 2, icon: Building2, title: 'Present', desc: 'The Active City' },
    { id: 3, icon: Star, title: 'Evening', desc: 'The Eternal Signal' },
    { id: 4, icon: Radio, title: 'Airwaves', desc: 'Transmission' },
    { id: 5, icon: Zap, title: 'Energy', desc: 'Kinetic Potential' },
    { id: 6, icon: Clock, title: 'Time', desc: 'The Relentless March' },
    { id: 7, icon: Activity, title: 'Motion', desc: 'Constant Flux' },
    { id: 8, icon: Shield, title: 'Guard', desc: 'The Bastion' },
    { id: 9, icon: Wind, title: 'Ether', desc: 'Unseen Forces' },
  ];

  const noteClass = "border border-dashed p-4 font-mono text-[10px] tracking-widest uppercase opacity-70 w-64 leading-relaxed absolute z-20";

  return (
    <section 
      ref={sectionRef}
      className="relative w-full pb-32"
      style={{ backgroundColor: MOSS_GREEN, color: BRASS_GOLD, margin: '-2rem 0 -6rem 0', padding: '2rem 0 6rem 0' }}
    >
      <div className="shell relative">
        
        {/* --- HERO SECTION --- */}
        <div className="pt-24 md:pt-32 pb-32 flex flex-col md:flex-row items-center gap-12 relative">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full md:w-5/12 relative group"
          >
            <div className="aspect-[3/4] overflow-hidden border border-[#C5A059]/30 relative p-4 z-10">
              <motion.div 
                initial={{ clipPath: 'inset(100% 0 0 0)' }}
                animate={{ clipPath: 'inset(0% 0 0 0)' }}
                transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="w-full h-full relative overflow-hidden" 
                style={{ border: `2px solid ${BRASS_GOLD}` }}
              >
                <motion.img 
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 3, ease: 'easeOut' }}
                  src="/images/art_deco_wisdom_hero.jpg" 
                  alt="Allegory of Wisdom"
                  className="w-full h-full object-cover grayscale-[20%] contrast-125"
                />
              </motion.div>
            </div>
            
            {/* Interface Note */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 1 }}
              className={`${noteClass} -right-16 md:-right-32 top-1/4 bg-[#2A3B2C] border-[#B35A3B] text-[#B35A3B]`}
            >
              [INTERFACE NOTE: MASKED TEXT REVEAL: Header 'LEGEND' curtains up on scroll. Cubic-Bezier eased.]
            </motion.div>
          </motion.div>

          <div className="w-full md:w-7/12 z-10">
            <motion.h1 
              initial={{ y: 50, opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
              animate={{ y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0)' }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
              className="font-serif text-6xl md:text-8xl lg:text-9xl leading-[0.85] tracking-tighter uppercase"
              style={{ color: BRASS_GOLD }}
            >
              The <br/> Legend <br/> <span style={{ color: TERRACOTTA }}>of <br/> Youssef</span>
            </motion.h1>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-12 max-w-md font-mono text-sm tracking-widest uppercase opacity-80 leading-relaxed border-l-2 pl-6" 
              style={{ borderColor: TERRACOTTA }}
            >
              Art Deco Allegories: Visualizing Time. A curated exploration of 1930s-inspired geometric bas-reliefs, rendered in deep moss green and brass-gold.
            </motion.div>
          </div>
        </div>

        {/* --- INTERACTIVE TIME GRID --- */}
        <div className="py-32 relative">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl md:text-5xl uppercase tracking-widest mb-4">Chronicles of the Era</h2>
            <div className="h-px w-24 mx-auto" style={{ backgroundColor: TERRACOTTA }}></div>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15 }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto relative z-10"
          >
            {cards.map((card, i) => (
              <motion.div 
                key={card.id}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                }}
                className="group relative aspect-square border border-[#C5A059]/20 overflow-hidden cursor-pointer flex flex-col items-center justify-center p-8 transition-colors duration-700 hover:border-[#B35A3B]/60"
                style={{ backgroundColor: 'rgba(197, 160, 89, 0.03)' }}
              >
                {/* Background overlay for hover scale */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-[1500ms] ease-out scale-100 group-hover:scale-[1.05]"
                  style={{ backgroundColor: 'rgba(179, 90, 59, 0.05)' }}
                ></div>
                
                <div className="relative z-10 flex flex-col items-center transform transition-transform duration-[1500ms] ease-out group-hover:scale-[1.05] group-hover:-translate-y-2">
                  <card.icon size={48} strokeWidth={1} style={{ color: TERRACOTTA }} className="mb-6 opacity-80" />
                  <h3 className="font-serif text-2xl uppercase tracking-wider mb-2">{card.title}</h3>
                  <p className="font-mono text-xs tracking-widest uppercase opacity-50">{card.desc}</p>
                </div>

                {/* Grid Decorative Corners */}
                <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-[#C5A059]/40"></div>
                <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-[#C5A059]/40"></div>
                <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-[#C5A059]/40"></div>
                <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-[#C5A059]/40"></div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 1 }}
            className={`${noteClass} -left-8 md:-left-24 bottom-1/4 bg-[#2A3B2C] border-[#C5A059] text-[#C5A059]`}
          >
            [HOVER NOTE: KEN BURNS EFFECT: Slow, eased 1.05x scale over 1.5s]
          </motion.div>
        </div>

        {/* --- EDITORIAL PARALLAX SECTION --- */}
        <div className="py-48 relative overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className={`${noteClass} left-0 top-12 bg-[#2A3B2C] border-[#B35A3B] text-[#B35A3B]`}
          >
            [INTERFACE NOTE: PARALLAX SCROLL: Background patterns and sculpture circles move on separate Y-axis offsets.]
          </motion.div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-24">
            
            {/* Progress */}
            <motion.div style={{ y: y1 }} className="flex flex-col items-center">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-[6px] border-[#2A3B2C] outline outline-2 outline-[#C5A059] relative z-10 shadow-2xl"
              >
                <img src="/images/art_deco_circle_progress.jpg" alt="Progress" className="w-full h-full object-cover" />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                viewport={{ once: true }}
                className="mt-8 font-serif text-xl tracking-widest uppercase"
              >
                Progress
              </motion.div>
              <div className="h-8 w-px mt-4" style={{ backgroundColor: TERRACOTTA }}></div>
            </motion.div>

            {/* Power */}
            <motion.div style={{ y: y2 }} className="flex flex-col items-center mt-24 md:mt-0">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden border-[8px] border-[#2A3B2C] outline outline-[3px] outline-[#B35A3B] relative z-10 shadow-2xl"
              >
                <img src="/images/art_deco_circle_power.jpg" alt="Power" className="w-full h-full object-cover" />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 1 }}
                viewport={{ once: true }}
                className="mt-8 font-serif text-xl tracking-widest uppercase" style={{ color: TERRACOTTA }}
              >
                Power
              </motion.div>
              <div className="h-8 w-px mt-4" style={{ backgroundColor: BRASS_GOLD }}></div>
            </motion.div>

            {/* Motion */}
            <motion.div style={{ y: y3 }} className="flex flex-col items-center">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-[6px] border-[#2A3B2C] outline outline-2 outline-[#C5A059] relative z-10 shadow-2xl"
              >
                <img src="/images/art_deco_circle_motion.jpg" alt="Motion" className="w-full h-full object-cover" />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 1 }}
                viewport={{ once: true }}
                className="mt-8 font-serif text-xl tracking-widest uppercase"
              >
                Motion
              </motion.div>
              <div className="h-8 w-px mt-4" style={{ backgroundColor: TERRACOTTA }}></div>
            </motion.div>

          </div>
        </div>

        {/* --- FOOTER DETAILS --- */}
        <div className="pt-24 pb-12 border-t border-[#C5A059]/20 flex flex-col md:flex-row items-end justify-between gap-8 relative overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)' }}
            whileInView={{ opacity: 1, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-50px" }}
            className="flex-1 max-w-xl"
          >
            <div className="font-serif italic text-6xl md:text-8xl mb-8" style={{ fontFamily: '"Brush Script MT", "Snell Roundhand", cursive', color: TERRACOTTA }}>
              Ali
            </div>
            <div className="grid grid-cols-3 gap-4 font-mono text-[10px] tracking-widest uppercase opacity-70 leading-relaxed">
              <div>
                <strong className="block mb-2 text-[#C5A059]">Morning</strong>
                The genesis of form and function.
              </div>
              <div>
                <strong className="block mb-2 text-[#C5A059]">Present</strong>
                The industrial heartbeat of the metropolis.
              </div>
              <div>
                <strong className="block mb-2 text-[#C5A059]">Evening</strong>
                The transmission of eternal signals.
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 0.1, x: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="font-sans font-black text-6xl md:text-8xl tracking-tighter uppercase flex-shrink-0" 
            style={{ color: BRASS_GOLD }}
          >
            TICKETS
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            viewport={{ once: true }}
            className={`${noteClass} right-0 top-12 bg-[#2A3B2C] border-[#C5A059] text-[#C5A059]`}
          >
            [INTERFACE NOTE: GEOMETRIC MASK REVEAL: Illustrations swipe in with a starburst/angled clip-path mask on section mount.]
          </motion.div>
        </div>

      </div>
    </section>
  );
}
