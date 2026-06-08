import { CadilaPharmaLandingPage } from './components/LandingPage';
import { ChatInterface } from './components/ChatInterface';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100">
      <CadilaPharmaLandingPage />
      <ChatInterface />
    </div>
  );
}
