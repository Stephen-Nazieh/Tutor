/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Timer, 
  UserPlus, 
  GraduationCap, 
  School, 
  Building2, 
  Mail, 
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { 
  Navbar, 
  CountdownTimer, 
  TutorStrip, 
  ActionCard, 
  View 
} from './components/Layout';
import { RegistrationPage } from './components/RegistrationPage';
import { ProfilePage } from './components/ProfilePage';
import { ContactModal } from './components/ContactModal';

// Main App URL configuration
const MAIN_APP_URL = import.meta.env.VITE_MAIN_APP_URL || 'http://localhost:3003';

export default function App() {
  const [view, setView] = useState<View>('home');
  const [userProfile, setUserProfile] = useState<any>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const handleRegistration = (data: any) => {
    setUserProfile({ ...data, isVerified: true });
    setView('profile');
  };

  const navigateToMainApp = () => {
    window.location.href = MAIN_APP_URL;
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Navbar setView={setView} />

      <AnimatePresence mode="wait">
        {view === 'home' && (
          <motion.main
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
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
                  Going Live
                </div>
                
                <h1 className="text-6xl md:text-8xl font-display font-bold tracking-tighter mb-12">
                  Launch <span className="text-gradient">Solocorn</span>
                </h1>

                <div className="mb-16">
                  <CountdownTimer />
                </div>

                <button 
                  onClick={() => setView('register')}
                  className="group relative px-8 py-4 bg-white text-black rounded-2xl font-bold text-lg hover:bg-emerald-400 transition-all flex items-center gap-2 mx-auto"
                >
                  Register Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            </section>

            {/* Tutor Cohort Strip */}
            <section className="mb-32">
              <div className="max-w-7xl mx-auto px-6 mb-8 flex justify-between items-end">
                <div>
                  <h2 className="text-3xl font-display font-bold">Solocorn Tutors</h2>
                  <p className="text-zinc-500">Our celebrity tutor cohort is ready to transform your learning.</p>
                </div>
                <button className="text-sm font-bold text-emerald-400 flex items-center gap-1 hover:underline">
                  View All <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <TutorStrip />
            </section>

            {/* Action Grid */}
            <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
              <ActionCard 
                title="Become a Solocorn Tutor"
                copy="Join our elite network of educators and reach students worldwide."
                buttonText="Apply to Teach"
                icon={UserPlus}
                onClick={() => setView('register')}
              />
              <ActionCard 
                title="Start a Solocorn Academy"
                copy="Build your own branded learning institution on our infrastructure."
                buttonText="Launch Academy"
                icon={GraduationCap}
                onClick={navigateToMainApp}
              />
              <ActionCard 
                title="Solocorn Schools"
                copy="Integrated solutions for K-12 and higher education institutions."
                buttonText="Partner with Us"
                icon={School}
                onClick={navigateToMainApp}
              />
            </section>

            {/* Business Section */}
            <section className="max-w-7xl mx-auto px-6 mb-32">
              <div className="glass p-12 rounded-[40px] flex flex-col md:flex-row items-center justify-between gap-12 border-emerald-500/10">
                <div className="max-w-xl">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8">
                    <Building2 className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-4xl font-display font-bold mb-6">Business and Licensing Inquiries</h2>
                  <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                    Interested in bringing Solocorn to your organization? We offer enterprise-grade licensing and custom integration services.
                  </p>
                  <button 
                    onClick={() => setIsContactOpen(true)}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 rounded-2xl font-bold transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    Contact support@solocorn.co
                  </button>
                </div>
                <div className="w-full md:w-1/3 aspect-square glass rounded-3xl flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent" />
                  <Building2 className="w-32 h-32 text-white/10" />
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-white/5 py-20 px-6">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="text-2xl font-display font-bold tracking-tighter">SOLOCORN</div>
                <div className="flex gap-8 text-sm text-zinc-500">
                  <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                  <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                  <button onClick={() => setIsContactOpen(true)} className="hover:text-white transition-colors">Contact</button>
                </div>
                <div className="text-sm text-zinc-600">
                  © 2026 Solocorn. All rights reserved.
                </div>
              </div>
            </footer>
          </motion.main>
        )}

        {view === 'register' && (
          <motion.div
            key="register"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <RegistrationPage onSubmit={handleRegistration} />
          </motion.div>
        )}

        {view === 'profile' && (
          <motion.div
            key="profile"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
          >
            <ProfilePage tutor={userProfile || {}} />
          </motion.div>
        )}
      </AnimatePresence>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
}

