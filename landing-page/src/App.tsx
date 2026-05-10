/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  QrCode,
} from 'lucide-react';
import {
  Navbar,
  LaunchCard,
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
  const [searchQuery, setSearchQuery] = useState('');

  const handleRegistration = (data: any) => {
    setUserProfile({ ...data, isVerified: true });
    setView('profile');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-blue-600 to-blue-800 text-white relative overflow-hidden">
      <Navbar setView={setView} />

      <AnimatePresence mode="wait">
        {view === 'home' && (
          <motion.main
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex flex-col relative"
          >
            {/* Hero Section */}
            <section className="flex-1 flex flex-col items-center justify-center px-6 pt-20 pb-32">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-center max-w-3xl mx-auto w-full"
              >
                <h1 className="text-3xl md:text-5xl font-sans font-medium tracking-tight mb-10 text-white">
                  Live AI-Augmented Instruction Platform
                </h1>

                {/* Search Bar */}
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.35, duration: 0.5 }}
                  className="relative max-w-2xl mx-auto mb-6"
                >
                  <div className="flex items-center bg-white rounded-full h-14 px-5 shadow-lg">
                    <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <input
                      type="text"
                      placeholder="Search tutors, courses, categories..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 bg-transparent border-none outline-none text-gray-800 placeholder-gray-400 px-3 text-base"
                    />
                    <QrCode className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  </div>
                </motion.div>

                {/* How It Works Button */}
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.45, duration: 0.5 }}
                >
                  <button
                    onClick={() => setView('register')}
                    className="px-6 py-2.5 bg-white text-blue-700 rounded-full text-sm font-semibold hover:bg-white/90 transition-colors shadow-md"
                  >
                    How It Works
                  </button>
                </motion.div>
              </motion.div>
            </section>

            {/* Launch Card — Bottom Right */}
            <div className="absolute bottom-6 right-6 z-10">
              <LaunchCard />
            </div>
          </motion.main>
        )}

        {view === 'register' && (
          <motion.div
            key="register"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="min-h-screen"
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
            className="min-h-screen"
          >
            <ProfilePage tutor={userProfile || {}} />
          </motion.div>
        )}
      </AnimatePresence>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
}
