import { Sparkles, ArrowRight, Shield, Zap, Search, BarChart3 } from 'lucide-react';
import { motion } from 'motion/react';
import { ChatInterface } from './components/ChatInterface';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100 italic-serif">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Sparkles size={18} className="text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">Concierge<span className="text-blue-600">AI</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-blue-600 transition-colors">Platform</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Pricing</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Docs</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Community</a>
          </div>
          <button className="bg-slate-900 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-slate-800 transition-all shadow-lg shadow-slate-100">
            Log In
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-6">
              <Zap size={14} />
              Next-Gen Customer Support
            </div>
            <h1 className="text-5xl font-extrabold text-slate-900 leading-tight mb-6">
              The platform for modern <span className="text-blue-600">infrastructure.</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-xl mb-10">
              Transform your customer support with an AI assistant that doesn't just answer questions—it guides users through your entire product ecosystem.
            </p>
            <div className="grid grid-cols-2 gap-4 max-w-md mb-8">
              <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm">
                <div className="text-blue-600 font-bold text-3xl">99.9%</div>
                <div className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mt-1">Uptime Guarantee</div>
              </div>
              <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm">
                <div className="text-blue-600 font-bold text-3xl">24/7</div>
                <div className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mt-1">Expert Support</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-3 bg-slate-900 text-white rounded-full font-bold text-sm hover:shadow-lg transition-all flex items-center gap-2">
                Get Started <ArrowRight size={18} />
              </button>
              <button className="px-8 py-3 bg-white border border-slate-200 text-slate-600 rounded-full font-bold text-sm hover:bg-slate-50 transition-all">
               View Docs
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square bg-gradient-to-tr from-blue-600 to-indigo-900 rounded-[3rem] overflow-hidden shadow-2xl relative">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2000')] bg-cover bg-center mix-blend-overlay opacity-40"></div>
              <div className="absolute inset-0 flex items-center justify-center p-12">
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl w-full">
                   <div className="flex gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/20 animate-pulse"></div>
                    <div className="flex-1 space-y-3">
                      <div className="h-4 bg-white/20 rounded-full w-3/4 animate-pulse"></div>
                      <div className="h-4 bg-white/20 rounded-full w-1/2 animate-pulse"></div>
                    </div>
                   </div>
                   <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="h-12 bg-white/5 border border-white/10 rounded-2xl"></div>
                    ))}
                   </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Features */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-bold mb-6 italic">Built for modern scale</h2>
            <p className="text-slate-600 text-lg">Our AI engine is trained on millions of support interactions to handle everything from simple FAQs to complex technical troubleshooting.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: "Enterprise Security", desc: "SOC2 Type II compliant infrastructure with end-to-end encryption for all user data." },
              { icon: BarChart3, title: "Advanced Analytics", desc: "Gain deep insights into user behavior and common pain points with automated reporting." },
              { icon: Search, title: "Smart Discovery", desc: "Our AI proactively identifies what users are looking for and suggests the right solutions." }
            ].map((f, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-all"
              >
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6">
                  <f.icon className="text-blue-600" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-4">{f.title}</h3>
                <p className="text-slate-600 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Chatbot Integration */}
      <ChatInterface />

      {/* Footer */}
      <footer className="py-12 border-t border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 opacity-50 grayscale">
            <Sparkles size={18} />
            <span className="font-bold text-lg tracking-tight">Concierge AI</span>
          </div>
          <p className="text-slate-500 text-sm italic">© 2026 Concierge AI Platform. All rights reserved.</p>
          <div className="flex gap-6 text-slate-400">
            <a href="#" className="hover:text-blue-600 transition-colors underline font-mono text-xs">Terms</a>
            <a href="#" className="hover:text-blue-600 transition-colors underline font-mono text-xs">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
