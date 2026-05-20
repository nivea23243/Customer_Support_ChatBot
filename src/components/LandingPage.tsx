import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Menu, 
  X, 
  ChevronRight, 
  PlayCircle,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Instagram,
  ChevronDown
} from 'lucide-react';
import { cn } from '../lib/utils';

const NAV_ITEMS = [
  { name: 'About', children: ['Overview', 'Vision & Mission', 'Heritage', 'Values', 'Leadership', 'CSR'] },
  { name: 'Stories', children: ['Commitment Stories', 'Healthcare', 'Innovation', 'People'] },
  { name: 'Businesses', children: ['APIs', 'Formulations', 'CDMO', 'Contract Research'] },
  { name: 'Research', children: ['World\'s First Innovations', 'R&D Chronicles', 'API Development'] },
  { name: 'Therapies', children: ['Gastroenterology', 'Cardiology', 'Gynaecology', 'Diabetology'] },
  { name: 'Careers', children: ['Life at Cadila', 'Growth', 'Join Us'] },
  { name: 'Media', children: ['Press Releases', 'Events', 'Coverage'] },
];

const CORE_SERVICES = [
  {
    title: "Strong API Legacy",
    desc: "We synthesize quality API solutions that span across leading therapeutic categories, namely Respiratory, Diabetology, Gastroenterology, Pain management and Orthopedics.",
    icon: "https://www.cadilapharma.com/ast/uploads/2018/10/icon1.svg"
  },
  {
    title: "State-of-the-Art Manufacturing",
    desc: "Our ultra-modern facility conforms to the stringent international norms like USFDA, European Union, MHRA UK, WHO Geneva, TGA Australia, etc.",
    icon: "https://www.cadilapharma.com/ast/uploads/2018/10/icon2.svg"
  },
  {
    title: "Robust Research",
    desc: "Our 350 scientists working across our dedicated R&D setups are a testament to our competencies in undertaking research in therapeutic areas with unmet medical needs.",
    icon: "https://www.cadilapharma.com/ast/uploads/2018/10/icon3.svg"
  },
  {
    title: "World’s First Innovation",
    desc: "At Cadila, we are proud to be manufacturers of first-in-the-world innovations in the areas of lung cancer, tuberculosis, cardio-vascular diseases and gastroenterology.",
    icon: "https://www.cadilapharma.com/ast/uploads/2018/10/icon4.svg"
  }
];

const THERAPIES = [
  { name: "Gastroenterology", img: "https://www.cadilapharma.com/ast/uploads/2018/11/Gastroenterology.svg", desc: "One of the premier and fastest growing segments of Cadila providing comprehensive gut care" },
  { name: "Cardiology", img: "https://www.cadilapharma.com/ast/uploads/2018/11/Cardiology.svg", desc: "Keeping the heart forever healthy with the novel yet affordable medical innovations" },
  { name: "Gynaecology", img: "https://www.cadilapharma.com/ast/uploads/2018/11/Gynaecology.svg", desc: "Promoting women’s health with our nutritional, reproductive and pregnancy care" },
  { name: "Diabetology", img: "https://www.cadilapharma.com/ast/uploads/2018/11/Diabetology.svg", desc: "Building insulin power to immunise against cholesterol, high blood pressure and blood sugar" },
  { name: "Oncology", img: "https://www.cadilapharma.com/ast/uploads/2018/11/therapies-On-cology-icon.svg", desc: "Delivering life-changing medicines to improve and expand the lives of cancer patients" }
];

export const CadilaPharmaLandingPage: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="bg-[#FAF9F6] text-slate-800 font-sans selection:bg-orange-100 min-h-screen">
      {/* Navigation - Exact Match */}
      <nav className="bg-white border-b border-slate-100 sticky top-0 z-[100]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 h-24 sm:h-32 flex items-center justify-between">
          <div className="flex flex-col">
            <a href="/" className="flex items-start gap-4">
              <img 
                src="https://www.cadilapharma.com/ast/uploads/2022/09/cardila-logo.png" 
                alt="Cadila" 
                className="h-16 sm:h-20 object-contain"
              />
            </a>
            <span className="text-[10px] sm:text-[12px] italic text-[#003B71] font-serif mt-1 ml-14">The Care Continues...</span>
          </div>

          <div className="hidden lg:flex items-center gap-10">
            {NAV_ITEMS.map((item) => (
              <div key={item.name} className="group relative">
                <a href="#" className="flex items-center gap-1 text-[13px] font-semibold text-[#003B71] hover:text-[#ed811e] transition-all uppercase tracking-tight py-4">
                  {item.name}
                  <ChevronDown size={14} className="opacity-40 group-hover:rotate-180 transition-transform group-hover:text-[#ed811e]" />
                </a>
                
                {/* Mega Menu / Dropdown */}
                <div className="absolute top-full left-0 w-64 bg-white shadow-2xl opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 border-t-2 border-[#ed811e] pt-4 pb-2">
                  {item.children.map(child => (
                    <a key={child} href="#" className="block px-6 py-3 text-[11px] font-bold text-slate-500 hover:text-[#003B71] hover:bg-slate-50 border-b border-slate-50 last:border-0 transition-colors uppercase tracking-wider">
                      {child}
                    </a>
                  ))}
                </div>
              </div>
            ))}
            <button className="w-10 h-10 bg-[#ed811e] rounded-lg flex items-center justify-center text-white shadow-lg shadow-orange-500/20 hover:bg-[#d96d12] transition-all transform hover:-translate-y-1">
              <Search size={18} />
            </button>
          </div>

          <button 
            className="lg:hidden p-2 text-[#003B71]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="lg:hidden bg-white border-t border-slate-100 p-6 absolute top-full left-0 right-0 shadow-2xl"
            >
              <div className="flex flex-col gap-4">
                {['About', 'Stories', 'Businesses', 'Research', 'Therapies', 'Careers', 'Media', 'Contact', 'Events'].map((item) => (
                  <a key={item} href="#" className="text-sm font-bold text-[#003B71] py-2 border-b border-slate-50 uppercase">
                    {item}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section - Purple Gradient & Circular Mask */}
      <section className="relative min-h-[600px] lg:h-[800px] overflow-hidden bg-gradient-to-br from-[#302b63] via-[#240b36] to-[#c31432] text-white flex items-center">
        <div className="max-w-[1400px] mx-auto px-8 w-full grid lg:grid-cols-2 items-center gap-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="bg-white p-4 inline-block rounded-xl shadow-2xl mb-4">
              <div className="flex items-center gap-4">
                <img src="https://www.cadilapharma.com/ast/uploads/2024/09/indrashill.png" className="h-10 sm:h-12" alt="Indrashil" />
                <div className="w-px h-10 bg-slate-200"></div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-[#003B71] uppercase leading-none">Indrashil University</span>
                  <span className="text-[8px] text-slate-400 mt-1 uppercase">Sustained Excellence</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <span className="text-white text-lg font-medium border-b-2 border-orange-500 pb-1">Campus to Corporate Program</span>
              <h1 className="text-4xl lg:text-7xl font-sans font-black leading-[1.1] mt-6 tracking-tight">
                Empowering the <br /> Next Generation of <br />
                <span className="text-[#f58220]">Pharma Professionals</span>
              </h1>
            </div>

            <motion.button 
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-r from-orange-400 to-[#ed811e] px-10 py-5 rounded-lg text-white font-black uppercase text-xs tracking-widest flex items-center gap-3 shadow-2xl shadow-orange-950/40"
            >
              Apply Now <ChevronRight size={18} />
            </motion.button>
          </motion.div>

          <div className="relative hidden lg:block">
            <div className="absolute top-0 right-20 z-20">
               <img src="https://www.cadilapharma.com/ast/uploads/2019/02/cadila-favicon.png" className="w-16 h-16 opacity-60 invert grayscale" alt="" />
            </div>
            {/* The signature mask from screenshot */}
            <div className="relative w-[600px] h-[600px] rounded-full overflow-hidden border-[20px] border-white/5 shadow-2xl translate-x-20">
               <img 
                 src="https://images.unsplash.com/photo-1581093588401-fbb62a02f120?q=80&w=2000" 
                 className="w-full h-full object-cover scale-110" 
                 alt="Professional" 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Value Chain - White Section with Serif Titles */}
      <section className="py-24 bg-[#FAF9F6]">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="mb-20">
            <h2 className="text-4xl lg:text-5xl font-serif text-[#003B71] mb-6 leading-tight">
              Straddling the Entire Life Science Value Chain
            </h2>
            <p className="text-slate-500 font-medium text-lg max-w-3xl leading-relaxed italic border-l-2 border-orange-500 pl-6">
              Our 360-degree business operations cover R&D, API, Formulations, <br className="hidden md:block" /> Marketing and Drug Discovery.
            </p>
            <button className="text-[#ed811e] font-black uppercase text-xs tracking-widest flex items-center gap-2 mt-8 hover:gap-4 transition-all">
              Read More <ChevronRight size={16} />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {CORE_SERVICES.map((s, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white p-12 rounded-[3rem] shadow-xl shadow-slate-200/40 border border-slate-100 group relative overflow-hidden"
              >
                <div className="mb-10 w-20 h-20 flex items-center justify-center">
                   <img src={s.icon} className="w-full h-full opacity-80 group-hover:scale-110 transition-transform" alt="" />
                </div>
                <h3 className="text-2xl font-black text-[#ed811e] mb-6 tracking-tight uppercase">{s.title}</h3>
                <p className="text-slate-500 leading-relaxed font-medium">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Global Outreach - Light Cream/Yellow with Map */}
      <section className="relative py-32 bg-[#FFFDF5] overflow-hidden">
        {/* World Map Backdrop */}
        <div className="absolute left-8 top-12 opacity-[0.08] pointer-events-none scale-150 origin-left">
           <img src="https://www.cadilapharma.com/ast/uploads/2019/12/Cadila-Pharmaceuticals-Homepage-Globe-of-Care.png" className="w-[800px]" alt="" />
        </div>
        
        <div className="max-w-[1400px] mx-auto px-8 grid lg:grid-cols-2 gap-24 items-center relative z-10">
          <div className="relative order-2 lg:order-1">
             <div className="relative group">
                <div className="absolute -inset-4 border-2 border-orange-100 rounded-full group-hover:scale-105 transition-transform duration-700"></div>
                <div className="w-full aspect-square rounded-full overflow-hidden border-8 border-white shadow-2xl">
                   <img 
                    src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2000" 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
                    alt="Outreach" 
                  />
                </div>
             </div>
          </div>

          <div className="space-y-10 order-1 lg:order-2">
            <h2 className="text-6xl lg:text-7xl font-serif text-[#003B71] leading-tight flex flex-col">
              A Global
              <span className="text-[#ed811e]">Outreach</span>
            </h2>
            <p className="text-slate-600 text-lg sm:text-xl leading-[1.8] font-medium grayscale hover:grayscale-0 transition-all">
              We are present in all regulated markets of the USA, Europe and Japan and Africa. With strategic collaborations and operations in over 100 countries, Cadila has a multicultural, multilingual and multinational workforce of more than 9000 employees.
            </p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              className="bg-[#ed811e] px-12 py-5 rounded-lg text-white font-black uppercase text-xs tracking-[0.2em] shadow-xl shadow-orange-500/20 flex items-center gap-3"
            >
              Our Locations <ChevronRight size={18} />
            </motion.button>
          </div>
        </div>
      </section>

      {/* Section 4: Therapies - Centered Grid with Orange Accents */}
      <section className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-8 text-center">
          <h2 className="text-5xl font-serif text-[#003B71] mb-24 capitalize leading-tight">Therapies</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-16">
            {THERAPIES.slice(1, 4).map((t, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -15 }}
                className="flex flex-col items-center group"
              >
                <div className="w-40 h-40 rounded-full bg-slate-50 flex items-center justify-center mb-10 transition-all duration-500 group-hover:shadow-2xl group-hover:scale-110 relative border border-slate-100">
                   <img src={t.img} className="w-20 h-20 group-hover:brightness-0 group-hover:invert-1 transition-all" alt={t.name} />
                </div>
                <h3 className="text-2xl font-black text-[#ed811e] mb-6 tracking-tight uppercase group-hover:text-[#003B71] transition-colors">{t.name}</h3>
                <p className="text-sm text-slate-500 font-medium leading-[1.8] px-4 opacity-70 mb-10 group-hover:opacity-100 transition-opacity">
                  {t.desc}
                </p>
                <button className="text-[#ed811e] font-black uppercase text-xs tracking-widest flex items-center gap-2 hover:gap-4 transition-all">
                  Read More <ChevronRight size={16} />
                </button>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center gap-3 mt-24">
            {[1, 2, 3, 4, 5].map((dot, i) => (
              <div key={i} className={cn(
                "w-3 h-3 rounded-full cursor-pointer transition-all",
                i === 1 ? "bg-[#ed811e] scale-125" : "bg-orange-100 hover:bg-orange-200"
              )}></div>
            ))}
          </div>
        </div>

     
        
      </section>

      {/* Section 5: Inspiration & The Care Continues */}
      <section className="bg-[#4a6d91] py-24 relative overflow-hidden text-white">
        <div className="absolute right-0 bottom-0 pointer-events-none opacity-[0.05]">
           <img src="https://www.cadilapharma.com/ast/themes/cadila/images/bg-pattern.png" className="w-[1000px] -rotate-12 translate-x-1/2 translate-y-1/2" alt="" />
        </div>
        
        <div className="max-w-[1400px] mx-auto px-8 grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-white/10 gap-20 items-center">
          {/* Our Inspiration */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-8 py-12 lg:py-0 pr-0 lg:pr-20">
             <h2 className="text-5xl font-serif leading-tight">Our Inspiration</h2>
             <p className="text-blue-50 leading-relaxed font-medium text-lg italic italic-serif grayscale hover:grayscale-0 transition-opacity">
                Known as the ‘Medicine Man of India’, Cadila´s Founder Chairman, Indravadan A. Modi (1926-2012) was a champion of the Indian Patents Act 1970. A doyen of the Indian drug discovery industry, who rose from the ranks to establish a leading Indian pharmaceuticals company.
             </p>
             <button className="bg-[#ed811e] px-10 py-4 rounded font-black uppercase text-[11px] tracking-widest hover:bg-[#d96d12] transition-all shadow-2xl">
               Read More <ChevronRight size={16} className="inline ml-2" />
             </button>
             <div className="relative mt-8 group h-[300px] w-[300px] sm:h-[400px] sm:w-[400px]">
                <div className="absolute -inset-4 bg-white/5 rounded-full group-hover:scale-105 transition-transform duration-700"></div>
                <img 
                  src="https://www.cadilapharma.com/ast/uploads/2019/12/Cadila-Pharmaceuticals-Homepage-Shri-Indravadan-Modi-1.png" 
                  className="rounded-full w-full h-full object-cover border-8 border-white/10 shadow-2xl" 
                  alt="Founder" 
                />
             </div>
          </div>

          {/* The Care Continues */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-8 py-12 lg:py-0 pl-0 lg:pl-20">
             <div className="relative mb-8 group h-[300px] w-[300px] sm:h-[400px] sm:w-[400px]">
                <div className="absolute -inset-4 bg-white/5 rounded-full group-hover:scale-105 transition-transform duration-700"></div>
                <img 
                  src="https://www.cadilapharma.com/ast/uploads/2019/12/Cadila-Pharmaceuticals-Homepage-The-Care-Continues.png" 
                  className="rounded-full w-full h-full object-cover border-8 border-white/10 shadow-2xl" 
                  alt="The Care Continues" 
                />
             </div>
             <h2 className="text-5xl font-serif leading-tight">The Care Continues...</h2>
             <p className="text-blue-50 leading-relaxed font-medium text-lg italic italic-serif grayscale hover:grayscale-0 transition-opacity">
               Every day at Cadila we strive to make life easier, simpler and healthier for people of all walks of life. Our Founder Chairman’s vision of affordable care remains immortal and lives on through generations of patients.
             </p>
             <button className="bg-[#ed811e] px-10 py-4 rounded font-black uppercase text-[11px] tracking-widest hover:bg-[#d96d12] transition-all shadow-2xl">
               Read More <ChevronRight size={16} className="inline ml-2" />
             </button>
          </div>
        </div>
      </section>

      {/* Section 6: Video Deck */}
      <section className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-8 text-center">
           <h2 className="text-5xl font-serif text-[#003B71] mb-24 capitalize leading-tight">Video Deck</h2>
           
           <div className="relative group max-w-5xl mx-auto rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)]">
              <img src="https://www.cadilapharma.com/ast/uploads/2019/02/corporate-video.jpg" className="w-full h-auto" alt="Video" />
              <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-blue-900/0 transition-all duration-700 flex items-center justify-center">
                <button className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-[#003B71] shadow-2xl scale-100 hover:scale-110 transition-all">
                  <PlayCircle size={64} fill="currentColor" strokeWidth={0} />
                </button>
              </div>
              <div className="absolute bottom-0 left-0 w-full p-12 bg-gradient-to-t from-[#003B71]/80 to-transparent text-white text-left">
                 <h3 className="text-3xl font-serif">Corporate Film</h3>
              </div>
           </div>

           <div className="flex justify-center gap-6 mt-16">
              <button className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-[#ed811e] hover:text-white transition-all">
                <ChevronRight size={24} className="rotate-180" />
              </button>
              <button className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-[#ed811e] hover:text-white transition-all">
                <ChevronRight size={24} />
              </button>
           </div>
        </div>
      </section>

      {/* Footer - Deep Purple-Blue Exact Match */}
      <footer className="bg-[#242c54] text-white pt-32 pb-20 relative overflow-hidden">
        <div className="absolute left-0 bottom-0 opacity-[0.03] pointer-events-none grayscale invert">
           <img src="https://www.cadilapharma.com/ast/themes/cadila/images/contact-footer-left.png" alt="" />
        </div>
        
        <div className="max-w-[1400px] mx-auto px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-12 sm:gap-20 mb-24">
             <div className="space-y-8">
                <h4 className="text-xl font-serif border-b border-white/10 pb-4 mb-4">About</h4>
                <ul className="space-y-3 text-sm text-blue-100/70 font-medium">
                  {['Overview', 'Vision & Mission', 'Heritage', 'Values and Purpose', 'Board of Directors', 'Corporate Governance', 'CSR', 'Pharmacovigilance'].map(link => (
                    <li key={link}><a href="#" className="hover:text-orange-400 transition-colors">{link}</a></li>
                  ))}
                </ul>
             </div>

             <div className="space-y-8">
                <h4 className="text-xl font-serif border-b border-white/10 pb-4 mb-4">Stories</h4>
                <ul className="space-y-3 text-sm text-blue-100/70 font-medium">
                  {['Commitment Stories', 'Limitless Living', 'Healthcare', 'Innovation', 'People', 'Humanity'].map(link => (
                    <li key={link}><a href="#" className="hover:text-orange-400 transition-colors">{link}</a></li>
                  ))}
                </ul>
             </div>

             <div className="space-y-8">
                <h4 className="text-xl font-serif border-b border-white/10 pb-4 mb-4">Businesses</h4>
                <ul className="space-y-3 text-sm text-blue-100/70 font-medium">
                  {['APIs', 'Formulations', 'Contract Research Operation', 'Alliances', 'IRM Group Companies'].map(link => (
                    <li key={link}><a href="#" className="hover:text-orange-400 transition-colors">{link}</a></li>
                  ))}
                </ul>
             </div>

             <div className="space-y-8">
                <h4 className="text-xl font-serif border-b border-white/10 pb-4 mb-4">Research</h4>
                <ul className="space-y-3 text-sm text-blue-100/70 font-medium">
                  {['World’s First Innovation', 'R&D Chronicles', 'API Development', 'Formulation Development'].map(link => (
                    <li key={link}><a href="#" className="hover:text-orange-400 transition-colors">{link}</a></li>
                  ))}
                </ul>
             </div>
          </div>

          <div className="grid md:grid-cols-3 gap-12 sm:gap-20 items-end pt-16 border-t border-white/10">
             <div className="flex gap-4">
                <img src="https://www.cadilapharma.com/ast/uploads/2019/05/footer-icn.svg" className="w-12 h-12" alt="Logo Icon" />
                <div className="flex flex-col gap-4">
                   <div className="flex gap-3">
                      {[Facebook, Twitter, Linkedin, Youtube, Instagram].map((Icon, idx) => (
                        <a key={idx} href="#" className="w-8 h-8 rounded bg-white/5 flex items-center justify-center hover:bg-orange-500 transition-all">
                          <Icon size={14} className="opacity-80" />
                        </a>
                      ))}
                   </div>
                   <div className="flex flex-wrap gap-4 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-blue-100/40">
                      <a href="#">Contact</a>
                      <a href="#">ADR Reporting</a>
                      <a href="#">Privacy Policy</a>
                      <a href="#">Drug Counterfeiting</a>
                   </div>
                </div>
             </div>

             <div className="text-center lg:text-left text-[11px] text-blue-100/40 font-medium">
              <p className="uppercase tracking-widest mb-1">Corporate Identification No:</p>
              <p>U24231GJ1991PLC015132</p>
             </div>

             <div className="text-center lg:text-right text-[11px] text-blue-100/40 font-medium uppercase tracking-[0.2em] space-y-2">
                <p>© 2026 CADILA PHARMACEUTICALS.</p>
                <p>ALL RIGHTS RESERVED</p>
                <p className="text-[9px] opacity-50">Designed & Developed by Litmus</p>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
