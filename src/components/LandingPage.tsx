import React, { useState } from 'react';
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
  ChevronDown,
  Globe,
  Sparkles,
  TrendingUp,
  Cpu,
  Bookmark
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
    desc: "We synthesize premium, high-purity API solutions across leading therapeutic areas, including Respiratory, Diabetology, Gastroenterology, and Orthopedics.",
    icon: <Cpu className="w-8 h-8 text-[#ed811e]" />,
    gradient: "from-orange-500/10 to-transparent"
  },
  {
    title: "Futuristic Manufacturing",
    desc: "Our ultra-modern production facilities strictly conform to global regulatory standards, including USFDA, EU-GMP, WHO-Geneva, and TGA-Australia.",
    icon: <Globe className="w-8 h-8 text-[#0a5494]" />,
    gradient: "from-blue-500/10 to-transparent"
  },
  {
    title: "Robust R&D Setup",
    desc: "Over 350 world-class scientists push boundaries in our state-of-the-art research laboratories to discover therapies that answer unmet medical needs.",
    icon: <Sparkles className="w-8 h-8 text-amber-500" />,
    gradient: "from-amber-500/10 to-transparent"
  },
  {
    title: "World-First Innovation",
    desc: "Cadila stands proud as a manufacturer of landmark, first-in-the-world therapeutic discoveries for Lung Cancer, Tuberculosis, and Cardiovascular health.",
    icon: <TrendingUp className="w-8 h-8 text-emerald-500" />,
    gradient: "from-emerald-500/10 to-transparent"
  }
];

const THERAPIES = [
  { 
    id: "gastro",
    name: "Gastroenterology", 
    img: "https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?q=80&w=600", 
    desc: "One of Cadila’s premier and fastest-growing segments, providing comprehensive gut-care, advanced probiotic systems, and therapeutic digestive remedies globally." 
  },
  { 
    id: "cardio",
    name: "Cardiology", 
    img: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=600", 
    desc: "Dedicated to keeping hearts healthy with innovative, highly affordable, and peerless cardiovascular drug discoveries and clinical care protocols." 
  },
  { 
    id: "gynae",
    name: "Gynaecology", 
    img: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=600", 
    desc: "Pioneering comprehensive women’s health remedies spanning nutritional support, specialized reproductive therapy, and safe pregnancy care." 
  },
  { 
    id: "diabeto",
    name: "Diabetology", 
    img: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?q=80&w=600", 
    desc: "Engineered to rebuild metabolic and insulin power, safeguarding millions globally against cholesterol, arterial issues, and complex high blood sugar." 
  },
  { 
    id: "onco",
    name: "Oncology", 
    img: "https://images.unsplash.com/photo-1579154204601-01588f35116f?q=80&w=600", 
    desc: "Delivering clinical, life-changing oncology formulations designed to target and treat, significantly improving and expanding the lives of cancer patients." 
  }
];

export const CadilaPharmaLandingPage: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTherapy, setActiveTherapy] = useState(THERAPIES[0]);

  return (
    <div className="bg-[#fcfdfd] text-slate-800 font-sans selection:bg-orange-100 min-h-screen overflow-x-hidden">
      {/* Floating Glass Navigation Bar */}
      <nav className="bg-white/80 backdrop-blur-xl border-b border-slate-100 sticky top-0 z-[100] transition-all duration-300">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 h-20 sm:h-24 flex items-center justify-between">
          <div className="flex flex-col">
            <a href="/" className="flex items-center gap-3">
              <img 
                src="https://www.cadilapharma.com/ast/uploads/2022/09/cardila-logo.png" 
                alt="Cadila" 
                className="h-10 sm:h-12 object-contain"
              />
            </a>
            <span className="text-[9px] italic text-[#003B71] font-semibold mt-0.5 tracking-wider">The Care Continues...</span>
          </div>

          <div className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <div key={item.name} className="group relative">
                <a href="#" className="flex items-center gap-1 text-[12px] font-extrabold text-[#003B71] hover:text-[#ed811e] transition-all uppercase tracking-wider py-4">
                  {item.name}
                  <ChevronDown size={12} className="opacity-60 group-hover:rotate-180 transition-transform group-hover:text-[#ed811e]" />
                </a>
                
                {/* Glassmorphic Dropdown */}
                <div className="absolute top-full left-0 w-60 bg-white/95 backdrop-blur-xl shadow-2xl opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 border-t-2 border-[#ed811e] rounded-b-2xl py-3 px-2 border border-slate-100">
                  {item.children.map(child => (
                    <a key={child} href="#" className="block px-4 py-2.5 text-[10px] font-bold text-slate-500 hover:text-[#003B71] hover:bg-[#FAFBFF] rounded-lg transition-all uppercase tracking-widest">
                      {child}
                    </a>
                  ))}
                </div>
              </div>
            ))}
            <button className="w-9 h-9 bg-gradient-to-tr from-[#ed811e] to-[#f97316] rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-500/20 hover:scale-105 transition-all">
              <Search size={16} />
            </button>
          </div>

          <button 
            className="lg:hidden p-2 text-[#003B71]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="lg:hidden bg-white border-t border-slate-100 p-6 absolute top-full left-0 right-0 shadow-2xl"
            >
              <div className="flex flex-col gap-3">
                {NAV_ITEMS.map((item) => (
                  <a key={item.name} href="#" className="text-xs font-black text-[#003B71] py-2 border-b border-slate-50 uppercase tracking-widest">
                    {item.name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Cybernetic Mesh Hero Section */}
      <section className="relative min-h-[600px] lg:h-[760px] overflow-hidden bg-gradient-to-br from-[#060b1e] via-[#091535] to-[#002147] text-white flex items-center">
        {/* Animated glowing backdrops */}
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-orange-600/10 rounded-full blur-[120px] animate-pulse [animation-delay:2s]"></div>

        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 w-full grid lg:grid-cols-12 items-center gap-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="bg-white/5 backdrop-blur-md p-1.5 pr-4 inline-block rounded-2xl border border-white/10 shadow-2xl mb-2">
              <div className="flex items-center gap-3.5">
                <div className="bg-white/10 p-2 rounded-xl">
                  <img src="https://www.cadilapharma.com/ast/uploads/2024/09/indrashill.png" className="h-6 object-contain filter brightness-0 invert" alt="Indrashil" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest leading-none">Indrashil University</span>
                  <span className="text-[8px] text-slate-350 mt-1 uppercase font-bold tracking-wider">Pioneering Sustained Academic Excellence</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <span className="text-orange-400 text-xs font-black uppercase tracking-[0.3em] border-b-2 border-orange-500/50 pb-1">Campus to Corporate Program</span>
              <h1 className="text-4xl sm:text-5xl lg:text-[4.2rem] font-black leading-[1.08] tracking-tight">
                Empowering Next-Gen <br />
                <span className="bg-gradient-to-r from-[#ed811e] via-[#f59e0b] to-[#f97316] bg-clip-text text-transparent">
                  Pharma Champions
                </span>
              </h1>
              <p className="text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed font-medium">
                Bridge the academic-corporate gap with our specialized development framework designed to train industry-ready professionals in cutting-edge pharmaceuticals, R&D protocols, and world-class molecular research.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <motion.button 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-r from-orange-400 to-[#ed811e] px-8 py-4.5 rounded-xl text-white font-extrabold uppercase text-[11px] tracking-widest flex items-center gap-3 shadow-xl shadow-orange-500/20 hover:shadow-orange-500/30 transition-all"
              >
                Apply for Campus Program <ChevronRight size={16} />
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white/10 hover:bg-white/15 border border-white/15 backdrop-blur-md px-8 py-4.5 rounded-xl text-white font-extrabold uppercase text-[11px] tracking-widest flex items-center gap-2 transition-all"
              >
                Explore Businesses
              </motion.button>
            </div>
          </motion.div>

          {/* Futuristic Dashboard Visualization Card on Hero Right */}
          <div className="lg:col-span-5 relative hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute -right-16 -top-16 w-36 h-36 bg-blue-500/10 rounded-full blur-2xl"></div>
              
              {/* Header metrics */}
              <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center text-orange-400 border border-orange-500/10">
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-100">Molecular Research</h4>
                    <span className="text-[9px] font-bold text-slate-400">Live Clinical Lab Pipeline</span>
                  </div>
                </div>
                <span className="text-[10px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-extrabold px-3 py-1 rounded-full uppercase tracking-wider animate-pulse">
                  Connected
                </span>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/5 border border-white/5 rounded-2xl p-4 text-center">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Active Trials</span>
                  <p className="text-2xl font-black mt-1 text-white">350+</p>
                </div>
                <div className="bg-white/5 border border-white/5 rounded-2xl p-4 text-center">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Global Patents</span>
                  <p className="text-2xl font-black mt-1 text-amber-400">180+</p>
                </div>
              </div>

              {/* Graphic element */}
              <div className="bg-white/5 border border-white/5 rounded-2xl p-5 relative overflow-hidden">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-slate-300">Formulation Matrix</span>
                  <span className="w-2 h-2 bg-orange-500 rounded-full animate-ping"></span>
                </div>
                <div className="h-16 flex items-end gap-1.5">
                  {[40, 60, 45, 90, 75, 50, 85, 95, 60, 80].map((h, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ duration: 1, delay: i * 0.05 }}
                      className="flex-1 bg-gradient-to-t from-orange-600/30 to-[#ed811e] rounded-t-sm"
                    ></motion.div>
                  ))}
                </div>
              </div>

              {/* Floating micro card */}
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-tr from-[#003B71] to-[#0a5494] p-4.5 rounded-2xl shadow-2xl border border-white/10 max-w-[200px] flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-white shrink-0">
                  <Globe size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[8px] font-bold uppercase tracking-widest text-slate-300">Presence</span>
                  <span className="text-[11px] font-extrabold text-white leading-tight">100+ Countries</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 2: Value Chain - White Section with Modern Cards */}
      <section className="py-24 bg-white relative">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
          <div className="max-w-3xl mb-16">
            <span className="text-[#ed811e] text-[10px] font-black uppercase tracking-[0.3em] mb-2 block">Value Creation Ecosystem</span>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.8rem] font-extrabold text-[#003B71] tracking-tight leading-tight">
              Straddling the Entire Life Science Value Chain
            </h2>
            <p className="text-slate-500 font-medium text-base sm:text-lg mt-4 leading-relaxed italic border-l-3 border-[#ed811e] pl-5">
              Our 360-degree fully integrated pharma operations cover advanced research, API development, formulations, worldwide CDMO services, and high-impact drug discovery.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CORE_SERVICES.map((s, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -8 }}
                className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-100 border border-slate-100 group relative overflow-hidden flex flex-col justify-between"
              >
                {/* Gradient background light overlay */}
                <div className={cn("absolute inset-0 bg-gradient-to-b opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none", s.gradient)}></div>
                
                <div className="relative z-10 space-y-6">
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500 border border-slate-100">
                    {s.icon}
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-lg font-black text-[#003B71] tracking-tight uppercase group-hover:text-[#ed811e] transition-colors">{s.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">
                      {s.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-6 relative z-10">
                  <span className="text-[10px] font-extrabold text-[#ed811e] uppercase tracking-wider flex items-center gap-1 hover:gap-2 transition-all cursor-pointer">
                    Discover More <ChevronRight size={12} />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Interactive Therapies Section (Tabs Visualizer) */}
      <section className="py-24 bg-[#FAFBFF] border-y border-slate-100">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#ed811e] text-[10px] font-black uppercase tracking-[0.3em] mb-2 block">Specialized Clinical Portfolios</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#003B71] tracking-tight">Therapeutic Specializations</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 font-bold uppercase tracking-wider">Delivering precision care across major disease domains</p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Tabs Column */}
            <div className="lg:col-span-4 flex flex-col gap-3 justify-center">
              {THERAPIES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTherapy(t)}
                  className={cn(
                    "text-left px-6 py-4.5 rounded-2xl font-black uppercase text-xs tracking-wider transition-all duration-300 flex items-center justify-between border",
                    activeTherapy.id === t.id 
                      ? "bg-[#003B71] text-white shadow-xl shadow-[#003B71]/15 border-transparent scale-103" 
                      : "bg-white text-[#003B71] hover:bg-[#003B71]/5 border-slate-100"
                  )}
                >
                  {t.name}
                  <ChevronRight size={14} className={cn("transition-transform", activeTherapy.id === t.id ? "rotate-90 text-orange-400" : "text-slate-300")} />
                </button>
              ))}
            </div>

            {/* Right Display Panel */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTherapy.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden grid md:grid-cols-2 h-full"
                >
                  <div className="p-8 sm:p-12 flex flex-col justify-between space-y-8">
                    <div className="space-y-4">
                      <span className="text-orange-500 text-[10px] font-black uppercase tracking-[0.25em]">Therapy Profile</span>
                      <h3 className="text-2xl sm:text-3xl font-black text-[#003B71] uppercase tracking-tight leading-none">{activeTherapy.name}</h3>
                      <p className="text-slate-500 text-xs sm:text-sm font-medium leading-relaxed">
                        {activeTherapy.desc}
                      </p>
                    </div>
                    
                    <div className="pt-4">
                      <button className="bg-slate-50 hover:bg-slate-100 text-[#003B71] border border-slate-200/80 px-6 py-3 rounded-xl font-bold uppercase text-[10px] tracking-widest transition-all">
                        Read Therapy Overview
                      </button>
                    </div>
                  </div>

                  <div className="h-64 md:h-full relative overflow-hidden">
                    <img src={activeTherapy.img} className="w-full h-full object-cover" alt={activeTherapy.name} />
                    <div className="absolute inset-0 bg-gradient-to-r from-white md:from-white/20 to-transparent"></div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Global Outreach Dashboard */}
      <section className="py-24 bg-[#FFFDF5] relative overflow-hidden">
        {/* World Map Background Grid */}
        <div className="absolute left-10 top-1/2 -translate-y-1/2 opacity-[0.06] pointer-events-none scale-150 origin-left">
           <img src="https://www.cadilapharma.com/ast/uploads/2019/12/Cadila-Pharmaceuticals-Homepage-Globe-of-Care.png" className="w-[700px]" alt="" />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 grid lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Outreach Graphics */}
          <div className="lg:col-span-5 relative order-2 lg:order-1 flex justify-center">
             <div className="relative w-80 h-80 sm:w-96 sm:h-96">
                <div className="absolute -inset-4 border-2 border-orange-100 rounded-full animate-pulse"></div>
                <div className="w-full h-full rounded-full overflow-hidden border-8 border-white shadow-2xl relative">
                   <img 
                    src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200" 
                    className="w-full h-full object-cover filter saturate-75 hover:saturate-100 transition-all duration-700" 
                    alt="Outreach" 
                  />
                  <div className="absolute inset-0 bg-[#003B71]/10"></div>
                </div>
             </div>
          </div>

          {/* Right Outreach Info */}
          <div className="lg:col-span-7 space-y-8 order-1 lg:order-2">
            <div className="space-y-4">
              <span className="text-[#ed811e] text-[10px] font-black uppercase tracking-[0.3em] block">Worldwide Operations</span>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-[#003B71] leading-tight">
                A Global <span className="bg-gradient-to-r from-[#ed811e] to-orange-400 bg-clip-text text-transparent">Presence of Care</span>
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
                We are actively present across highly regulated international drug markets, including the USA, Europe, Japan, and Africa. Supported by strategic partnerships and robust operations in over 100 countries, Cadila is built on a multilingual, multicultural workforce of more than 9,000 passionate employees.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-6 border-y border-orange-100 py-6">
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Countries</span>
                <p className="text-xl sm:text-2xl font-black text-[#003B71] mt-1">100+</p>
              </div>
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Team Members</span>
                <p className="text-xl sm:text-2xl font-black text-[#ed811e] mt-1">9,000+</p>
              </div>
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">USFDA Labs</span>
                <p className="text-xl sm:text-2xl font-black text-amber-500 mt-1">5+</p>
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#003B71] hover:bg-[#094d8b] px-10 py-4.5 rounded-xl text-white font-extrabold uppercase text-[10px] tracking-widest shadow-xl shadow-blue-900/10 flex items-center gap-3 transition-all"
            >
              Our Global Offices <ChevronRight size={16} />
            </motion.button>
          </div>
        </div>
      </section>

      {/* Section 5: Cinematic Heritage & Slogan */}
      <section className="bg-gradient-to-br from-[#3e5d7f] to-[#254261] py-24 text-white relative overflow-hidden">
        <div className="absolute right-0 bottom-0 pointer-events-none opacity-[0.03]">
           <img src="https://www.cadilapharma.com/ast/themes/cadila/images/bg-pattern.png" className="w-[800px] -rotate-12 translate-x-1/3 translate-y-1/3" alt="" />
        </div>
        
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 grid lg:grid-cols-2 gap-16 items-center">
          {/* Our Inspiration */}
          <div className="flex flex-col gap-6 pr-0 lg:pr-8 border-b lg:border-b-0 lg:border-r border-white/10 pb-12 lg:pb-0">
             <span className="text-amber-400 text-[10px] font-black uppercase tracking-[0.3em]">Corporate Heritage</span>
             <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Our Inspiration</h2>
             <p className="text-blue-50 leading-relaxed font-medium text-xs sm:text-sm italic">
                Widely honored as the ‘Medicine Man of India’, Cadila’s Founder Chairman, Shri Indravadan A. Modi (1926-2012) was a massive champion of the historic Indian Patents Act 1970. A legendary pioneer who rose to establish a global pharma beacon.
             </p>
             <button className="bg-amber-500 hover:bg-amber-600 self-start px-8 py-3.5 rounded-xl font-extrabold uppercase text-[9px] tracking-widest transition-all shadow-lg shadow-amber-500/10">
               Read Tribute Story
             </button>
             <div className="relative mt-4 w-72 h-72 sm:w-80 sm:h-80 self-center lg:self-start">
                <div className="absolute -inset-3 bg-white/5 rounded-full animate-pulse"></div>
                <img 
                  src="https://www.cadilapharma.com/ast/uploads/2019/12/Cadila-Pharmaceuticals-Homepage-Shri-Indravadan-Modi-1.png" 
                  className="rounded-full w-full h-full object-cover border-8 border-white/10 shadow-2xl" 
                  alt="Founder" 
                />
             </div>
          </div>

          {/* The Care Continues */}
          <div className="flex flex-col gap-6 pl-0 lg:pl-12">
             <div className="relative mb-4 w-72 h-72 sm:w-80 sm:h-80 self-center lg:self-start">
                <div className="absolute -inset-3 bg-white/5 rounded-full animate-pulse"></div>
                <img 
                  src="https://www.cadilapharma.com/ast/uploads/2019/12/Cadila-Pharmaceuticals-Homepage-The-Care-Continues.png" 
                  className="rounded-full w-full h-full object-cover border-8 border-white/10 shadow-2xl" 
                  alt="The Care Continues" 
                />
             </div>
             <span className="text-orange-400 text-[10px] font-black uppercase tracking-[0.3em]">Mission statement</span>
             <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">The Care Continues...</h2>
             <p className="text-blue-50 leading-relaxed font-medium text-xs sm:text-sm italic">
               Every day at Cadila, we strive to make life easier, simpler, and healthier for people from all walks of life. Our Founder Chairman’s core vision of affordable clinical care remains immortal and lives on through generations.
             </p>
             <button className="bg-orange-500 hover:bg-orange-600 self-start px-8 py-3.5 rounded-xl font-extrabold uppercase text-[9px] tracking-widest transition-all shadow-lg shadow-orange-500/10">
               Our Commitment
             </button>
          </div>
        </div>
      </section>

      {/* Section 6: Video Deck */}
      <section className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 text-center">
           <div className="mb-12">
             <span className="text-[#ed811e] text-[10px] font-black uppercase tracking-[0.3em] block mb-2">Corporate Cinema</span>
             <h2 className="text-3xl sm:text-4xl font-extrabold text-[#003B71] tracking-tight">Featured Video Deck</h2>
           </div>
           
           <div className="relative group max-w-4xl mx-auto rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100">
              <img src="https://www.cadilapharma.com/ast/uploads/2019/02/corporate-video.jpg" className="w-full h-auto filter brightness-95 group-hover:scale-102 transition-transform duration-700" alt="Video" />
              <div className="absolute inset-0 bg-[#003B71]/15 group-hover:bg-[#003B71]/5 transition-all duration-700 flex items-center justify-center">
                <button className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-[#003B71] shadow-2xl hover:scale-110 active:scale-95 transition-all border border-slate-100">
                  <PlayCircle size={48} fill="currentColor" className="text-[#003B71]" strokeWidth={0} />
                </button>
              </div>
           </div>
        </div>
      </section>

      {/* Footer - Slate Midnight Blue Premium */}
      <footer className="bg-[#0b1021] text-white pt-24 pb-12 relative overflow-hidden border-t border-white/5">
        <div className="absolute left-0 bottom-0 opacity-[0.02] pointer-events-none grayscale invert">
           <img src="https://www.cadilapharma.com/ast/themes/cadila/images/contact-footer-left.png" alt="" />
        </div>
        
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
             <div className="space-y-6">
                <h4 className="text-sm font-black uppercase tracking-widest text-[#ed811e] border-l-2 border-[#ed811e] pl-3">About</h4>
                <ul className="space-y-2.5 text-xs text-slate-400 font-bold tracking-wide">
                  {['Overview', 'Vision & Mission', 'Heritage', 'Values and Purpose', 'Board of Directors', 'CSR', 'Pharmacovigilance'].map(link => (
                    <li key={link}><a href="#" className="hover:text-white transition-colors uppercase tracking-wider">{link}</a></li>
                  ))}
                </ul>
             </div>

             <div className="space-y-6">
                <h4 className="text-sm font-black uppercase tracking-widest text-[#0a5494] border-l-2 border-[#0a5494] pl-3">Stories</h4>
                <ul className="space-y-2.5 text-xs text-slate-400 font-bold tracking-wide">
                  {['Commitment Stories', 'Limitless Living', 'Healthcare', 'Innovation', 'People', 'Humanity'].map(link => (
                    <li key={link}><a href="#" className="hover:text-white transition-colors uppercase tracking-wider">{link}</a></li>
                  ))}
                </ul>
             </div>

             <div className="space-y-6">
                <h4 className="text-sm font-black uppercase tracking-widest text-amber-500 border-l-2 border-amber-500 pl-3">Businesses</h4>
                <ul className="space-y-2.5 text-xs text-slate-400 font-bold tracking-wide">
                  {['APIs', 'Formulations', 'CDMO Operations', 'Alliances', 'IRM Group Companies'].map(link => (
                    <li key={link}><a href="#" className="hover:text-white transition-colors uppercase tracking-wider">{link}</a></li>
                  ))}
                </ul>
             </div>

             <div className="space-y-6">
                <h4 className="text-sm font-black uppercase tracking-widest text-emerald-500 border-l-2 border-emerald-500 pl-3">Research</h4>
                <ul className="space-y-2.5 text-xs text-slate-400 font-bold tracking-wide">
                  {['World’s First Innovation', 'R&D Chronicles', 'API Development', 'Formulation Development'].map(link => (
                    <li key={link}><a href="#" className="hover:text-white transition-colors uppercase tracking-wider">{link}</a></li>
                  ))}
                </ul>
             </div>
          </div>

          <div className="grid md:grid-cols-3 gap-10 items-center pt-12 border-t border-white/5">
             <div className="space-y-4">
                <div className="flex gap-2">
                   {[Facebook, Twitter, Linkedin, Youtube, Instagram].map((Icon, idx) => (
                     <a key={idx} href="#" className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center hover:bg-[#ed811e] hover:text-white transition-all">
                       <Icon size={12} className="opacity-80" />
                     </a>
                   ))}
                </div>
                <div className="flex flex-wrap gap-4 text-[9px] font-black uppercase tracking-widest text-slate-500">
                   <a href="#" className="hover:text-white">Contact</a>
                   <a href="#" className="hover:text-white">ADR Reporting</a>
                   <a href="#" className="hover:text-white">Privacy Policy</a>
                </div>
             </div>

             <div className="text-center md:text-left text-[9px] text-slate-500 font-black uppercase tracking-widest">
               <p className="mb-1">Corporate Identification No:</p>
               <p className="text-slate-400">U24231GJ1991PLC015132</p>
             </div>

             <div className="text-center md:text-right text-[9px] text-slate-500 font-black uppercase tracking-[0.2em] space-y-1.5">
                <p className="text-slate-400">© 2026 CADILA PHARMACEUTICALS.</p>
                <p>ALL RIGHTS RESERVED</p>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
