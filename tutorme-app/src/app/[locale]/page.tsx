/**
 * Solocorn Landing Page - Coming Soon Mode
 * Landing page with early bird signup and special developer access
 */

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Timer, 
  UserPlus, 
  GraduationCap, 
  School, 
  Building2, 
  Mail, 
  ArrowRight,
  ChevronRight,
  X,
  Lock,
  CheckCircle,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// --- Types ---
type ModalType = 'register' | 'tutor' | 'academy' | 'schools' | null;

interface EarlyBirdForm {
  email: string;
  name: string;
}

// --- Mock Data ---
const CELEBRITY_TUTORS = [
  { name: "Dr. Aris", subject: "Quantum Physics", image: "https://picsum.photos/seed/tutor1/400/400" },
  { name: "Sarah Jenkins", subject: "Creative Writing", image: "https://picsum.photos/seed/tutor2/400/400" },
  { name: "Chef Marco", subject: "Culinary Arts", image: "https://picsum.photos/seed/tutor3/400/400" },
  { name: "Elena Rossi", subject: "Digital Marketing", image: "https://picsum.photos/seed/tutor4/400/400" },
  { name: "Prof. Zhang", subject: "Mandarin", image: "https://picsum.photos/seed/tutor5/400/400" },
  { name: "David Miller", subject: "Financial Literacy", image: "https://picsum.photos/seed/tutor6/400/400" },
];

const SPECIAL_CODES = ['kim.kon#26', 'stephen#26'];

// --- Components ---

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 12, hours: 5, minutes: 45, seconds: 30 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, seconds: 59, minutes: prev.minutes - 1 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex gap-4 md:gap-8 justify-center items-center font-mono">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="flex flex-col items-center">
          <div className="text-4xl md:text-6xl font-bold text-white tabular-nums">
            {value.toString().padStart(2, '0')}
          </div>
          <div className="text-xs uppercase tracking-widest text-zinc-500 mt-2">{unit}</div>
        </div>
      ))}
    </div>
  );
};

const TutorStrip = () => {
  return (
    <div className="relative overflow-hidden py-12 border-y border-white/5 bg-white/[0.02]">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...CELEBRITY_TUTORS, ...CELEBRITY_TUTORS].map((tutor, i) => (
          <div key={i} className="inline-flex items-center mx-8 group">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-emerald-500/30 mr-4 group-hover:border-emerald-400 transition-colors">
              <img src={tutor.image} alt={tutor.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div>
              <div className="text-lg font-bold text-white">{tutor.name}</div>
              <div className="text-sm text-zinc-500">{tutor.subject}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ComingSoonModal = ({ 
  isOpen, 
  onClose, 
  type 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  type: ModalType;
}) => {
  const [formData, setFormData] = useState<EarlyBirdForm>({ email: '', name: '' });
  const [submitted, setSubmitted] = useState(false);

  const content = {
    register: {
      title: 'Coming Soon',
      subtitle: 'Be the first to experience Solocorn',
      description: 'We\'re putting the finishing touches on our platform. Leave your details and we\'ll notify you when we launch.',
      buttonText: 'Notify Me',
      successMessage: 'You\'re on the list! We\'ll be in touch soon.',
    },
    tutor: {
      title: 'Tutor Applications - Coming Soon',
      subtitle: 'Join our elite tutor network',
      description: 'We\'re carefully selecting our founding tutor cohort. Share your details and we\'ll reach out when applications open.',
      buttonText: 'Join Waitlist',
      successMessage: 'Thanks for your interest! We\'ll contact you about tutor opportunities.',
    },
    academy: {
      title: 'Academy Launch - Coming Soon',
      subtitle: 'Build your branded learning institution',
      description: 'Solocorn Academy infrastructure is in development. Leave your details to be notified when we accept academy partners.',
      buttonText: 'Get Early Access',
      successMessage: 'You\'re on the academy waitlist! We\'ll be in touch.',
    },
    schools: {
      title: 'School Partnerships - Coming Soon',
      subtitle: 'Enterprise solutions for institutions',
      description: 'We\'re working with select schools for our pilot program. Share your contact info and we\'ll discuss partnership opportunities.',
      buttonText: 'Express Interest',
      successMessage: 'Thank you! Our partnership team will contact you soon.',
    },
  };

  const currentContent = type ? content[type] : content.register;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would save to a database or send to an API
    console.log('Early bird signup:', { type, ...formData });
    setSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        />
        
        {/* Modal */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative w-full max-w-md bg-zinc-900 border border-white/10 rounded-2xl p-8 shadow-2xl"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {!submitted ? (
            <>
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-4">
                  <Sparkles className="w-3 h-3" />
                  Coming Soon
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{currentContent.title}</h3>
                <p className="text-emerald-400 text-sm">{currentContent.subtitle}</p>
              </div>

              <p className="text-zinc-400 text-sm text-center mb-6">
                {currentContent.description}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full bg-white/5 border-white/10 text-white placeholder:text-zinc-500"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full bg-white/5 border-white/10 text-white placeholder:text-zinc-500"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-xl"
                >
                  {currentContent.buttonText}
                </Button>
              </form>

              <p className="text-xs text-zinc-500 text-center mt-4">
                We respect your privacy. Unsubscribe anytime.
              </p>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Thank You!</h3>
              <p className="text-zinc-400">{currentContent.successMessage}</p>
              <Button
                onClick={onClose}
                className="mt-6 bg-white/10 hover:bg-white/20 text-white"
              >
                Close
              </Button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const SpecialAccessSection = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (SPECIAL_CODES.includes(code.trim())) {
      // Valid code - redirect to app
      router.push('/login');
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 mb-16">
      <div className="bg-gradient-to-r from-emerald-900/30 to-zinc-900/50 border border-emerald-500/20 rounded-2xl p-6">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center">
              <Lock className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white">I have special access</h3>
            </div>
          </div>
          <ChevronRight className={`w-5 h-5 text-zinc-400 transition-transform ${expanded ? 'rotate-90' : ''}`} />
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-6 border-t border-white/10 mt-6">
                <p className="text-sm text-zinc-400 mb-4">Enter code</p>
                <form onSubmit={handleSubmit} className="flex gap-3">
                  <Input
                    type="password"
                    placeholder="Enter access code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className={`flex-1 bg-white/5 border-white/10 text-white placeholder:text-zinc-500 ${error ? 'border-red-500' : ''}`}
                  />
                  <Button
                    type="submit"
                    className="bg-emerald-500 hover:bg-emerald-400 text-white px-6"
                  >
                    Access
                  </Button>
                </form>
                {error && (
                  <p className="text-red-400 text-sm mt-2">Invalid access code</p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const ActionCard = ({ 
  title, 
  copy, 
  buttonText, 
  icon: Icon, 
  onClick 
}: { 
  title: string; 
  copy: string; 
  buttonText: string; 
  icon: any; 
  onClick: () => void;
}) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl flex flex-col items-start justify-between h-full group"
  >
    <div className="mb-6">
      <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:bg-emerald-500/20 transition-colors">
        <Icon className="w-6 h-6 text-emerald-400" />
      </div>
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      {copy && <p className="text-zinc-400 leading-relaxed">{copy}</p>}
    </div>
    <Button 
      onClick={onClick}
      className="w-full py-3 px-6 rounded-xl bg-white text-black font-semibold hover:bg-emerald-400 transition-colors flex items-center justify-center gap-2"
    >
      {buttonText}
    </Button>
  </motion.div>
);

const Navbar = ({ onRegister }: { onRegister: () => void }) => (
  <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
    <div className="max-w-7xl mx-auto flex justify-between items-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-6 py-3">
      <Link href="/" className="flex items-center gap-3">
        {/* Logo - Replace /images/logo.png with your logo file */}
        <img 
          src="/images/logo.png" 
          alt="Solocorn" 
          className="h-8 w-auto"
          onError={(e) => {
            // Fallback to text if logo fails to load
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
        <span className="text-2xl font-bold tracking-tighter">SOLOCORN</span>
      </Link>
      <div className="flex items-center gap-4">
        <Button 
          onClick={onRegister}
          variant="outline" 
          className="px-5 py-2 bg-white text-black rounded-lg text-sm font-bold hover:bg-emerald-400 transition-colors border-0"
        >
          Register
        </Button>
      </div>
    </div>
  </nav>
);

// --- Main Page Component ---

export default function LandingPage() {
  const [modalType, setModalType] = useState<ModalType>(null);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Navbar onRegister={() => setModalType('register')} />

      {/* Coming Soon Modal */}
      <ComingSoonModal 
        isOpen={modalType !== null} 
        onClose={() => setModalType(null)} 
        type={modalType}
      />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pt-24"
      >
        {/* Hero Section */}
        <section className="px-6 py-20 md:py-32 text-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 blur-[120px] rounded-full -z-10" />
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Coming Soon
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-12">
              Launch <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Solocorn</span>
            </h1>

            <div className="mb-16">
              <CountdownTimer />
            </div>

            <Button 
              onClick={() => setModalType('register')}
              className="group relative px-8 py-6 bg-white text-black rounded-2xl font-bold text-lg hover:bg-emerald-400 transition-all flex items-center gap-2 mx-auto"
            >
              Get Early Access
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </section>

        {/* Tutor Cohort Strip */}
        <section className="mb-32">
          <div className="max-w-7xl mx-auto px-6 mb-8 flex justify-between items-end">
            <div>
              <h2 className="text-3xl font-bold">Solocorn Tutors</h2>
              <p className="text-zinc-500">Our celebrity tutor cohort is ready to transform your learning.</p>
            </div>
            <button className="text-sm font-bold text-emerald-400 flex items-center gap-1 hover:underline">
              View All <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <TutorStrip />
        </section>

        {/* Special Access Section */}
        <SpecialAccessSection />

        {/* Action Grid */}
        <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
          <ActionCard 
            title="Become a Solocorn Tutor"
            copy="Join our elite network of educators and reach students worldwide."
            buttonText="Apply to Teach"
            icon={UserPlus}
            onClick={() => setModalType('tutor')}
          />
          <ActionCard 
            title="Start a Solocorn Academy"
            copy="Build your own branded learning institution on our infrastructure."
            buttonText="Launch Academy"
            icon={GraduationCap}
            onClick={() => setModalType('academy')}
          />
          <ActionCard 
            title="Solocorn Schools"
            copy="Integrated solutions for K-12 and higher education institutions."
            buttonText="Partner with Us"
            icon={School}
            onClick={() => setModalType('schools')}
          />
        </section>

        {/* Business Section */}
        <section className="max-w-7xl mx-auto px-6 mb-32">
          <div className="bg-white/5 backdrop-blur-sm border border-emerald-500/10 p-12 rounded-[40px] flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-xl">
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl font-bold mb-6">Business and Licensing Inquiries</h2>
              <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                Interested in bringing Solocorn to your organization? We offer enterprise-grade licensing and custom integration services.
              </p>
              <a 
                href="mailto:support@solocorn.co"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 rounded-2xl font-bold transition-colors"
              >
                <Mail className="w-5 h-5" />
                Contact support@solocorn.co
              </a>
            </div>
            <div className="w-full md:w-1/3 aspect-square bg-white/5 rounded-3xl flex items-center justify-center relative overflow-hidden border border-white/10">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent" />
              <Building2 className="w-32 h-32 text-white/10" />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/5 py-20 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-2xl font-bold tracking-tighter">SOLOCORN</div>
            <div className="flex gap-8 text-sm text-zinc-500">
              <Link href="/legal/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/legal/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <a href="mailto:support@solocorn.co" className="hover:text-white transition-colors">Contact</a>
            </div>
            <div className="text-sm text-zinc-600">
              © 2026 Solocorn. All rights reserved.
            </div>
          </div>
        </footer>
      </motion.main>

      {/* CSS for marquee animation */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
}
