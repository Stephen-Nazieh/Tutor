/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  QrCode,
  Settings,
  X,
  Play,
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

const PROMO_VIDEO = {
  id: '_U8FwciBJxg',
  title: 'Promo',
  description: 'Watch the platform promo.',
};

const HOW_IT_WORKS_VIDEOS = [
  {
    id: 'dQw4w9WgXcQ',
    title: 'Getting Started',
    description: 'A quick overview of the platform.',
  },
  {
    id: 'M7lc1UVf-VE',
    title: 'Booking a Session',
    description: 'How to find and book 1-on-1 tutoring.',
  },
  {
    id: 'aqz-KE-bpKQ',
    title: 'Joining Your Classroom',
    description: 'Entering the live classroom and using the tools.',
  },
];

export default function App() {
  const [view, setView] = useState<View>('home');
  const [userProfile, setUserProfile] = useState<any>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleRegistration = (data: any) => {
    setUserProfile({ ...data, isVerified: true });
    setView('profile');
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/landing-bg-video.mp4" type="video/mp4" />
      </video>

      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/25 via-blue-800/30 to-blue-950/45" />

      <div className="relative z-10">
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
              {/* Top spacer: clears navbar and pushes hero toward vertical center */}
              <div className="flex-1 min-h-[100px]" />

              {/* Hero Section */}
              <section className="flex flex-col items-center px-6">
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
                    animate={{ y: 0, opacity: isHowItWorksOpen ? 0 : 1 }}
                    transition={{ delay: 0.35, duration: 0.2 }}
                    className={`relative max-w-2xl mx-auto mb-6 ${isHowItWorksOpen ? 'pointer-events-none' : ''}`}
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
                      onClick={() => setIsHowItWorksOpen(true)}
                      className="group relative px-6 py-2.5 bg-white text-blue-700 rounded-full text-sm font-semibold hover:bg-white/90 transition-colors shadow-md overflow-hidden min-w-[140px]"
                    >
                      <span className="block opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        How It Works
                      </span>
                      <span className="absolute inset-0 flex items-center justify-center gap-0.5 transition-opacity duration-300 group-hover:opacity-0">
                        <motion.span
                          className="inline-flex h-5 w-5"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        >
                          <Settings className="h-full w-full" />
                        </motion.span>
                        <motion.span
                          className="-mt-2 -ml-1 inline-flex h-3.5 w-3.5"
                          animate={{ rotate: -360 }}
                          transition={{ duration: 1.33, repeat: Infinity, ease: 'linear' }}
                        >
                          <Settings className="h-full w-full" />
                        </motion.span>
                      </span>
                    </button>
                  </motion.div>
                </motion.div>
              </section>

              {/* Guaranteed buffer: ensures persistent gap between hero and card */}
              <div className="flex-1 min-h-[160px]" />

              {/* Launch Card — Bottom Right */}
              <div className="flex-shrink-0 flex justify-end px-6 pb-10">
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

        {/* How It Works Modal */}
        <AnimatePresence>
          {isHowItWorksOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-transparent px-6"
              onClick={() => setIsHowItWorksOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="relative flex max-h-[90vh] min-h-[60vh] w-full max-w-5xl flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/30 bg-white/35 p-6 shadow-lg backdrop-blur-xl md:min-h-[70vh] md:p-8"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <button
                  onClick={() => setIsHowItWorksOpen(false)}
                  className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="flex w-full max-w-4xl flex-1 flex-col overflow-hidden">
                  {/* Gear animation header */}
                  <div className="flex flex-col items-center justify-center pt-4">
                    <div className="flex items-center justify-center gap-1">
                      <motion.span
                        className="inline-flex h-7 w-7 text-white/90"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      >
                        <Settings className="h-full w-full" />
                      </motion.span>
                      <motion.span
                        className="-mt-1.5 -ml-0.5 inline-flex h-7 w-7 text-white/90"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 1.33, repeat: Infinity, ease: 'linear' }}
                      >
                        <Settings className="h-full w-full" />
                      </motion.span>
                    </div>
                  </div>

                  {/* Promo section */}
                  <div className="w-full pt-2 pb-4">
                    <h2 className="mb-3 text-center text-lg font-semibold text-white">Promo</h2>
                    <a
                      href={`https://www.youtube.com/watch?v=${PROMO_VIDEO.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group mx-auto block max-w-2xl overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-colors hover:bg-white/10"
                    >
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={`https://img.youtube.com/vi/${PROMO_VIDEO.id}/hqdefault.jpg`}
                          alt={PROMO_VIDEO.title}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/30">
                          <Play className="h-12 w-12 fill-white text-white opacity-80 transition-opacity group-hover:opacity-100" />
                        </div>
                      </div>
                      <div className="p-4 text-center">
                        <h3 className="text-base font-semibold text-white">{PROMO_VIDEO.title}</h3>
                        {PROMO_VIDEO.description && (
                          <p className="mt-1 text-xs text-white/70">{PROMO_VIDEO.description}</p>
                        )}
                      </div>
                    </a>
                  </div>

                  {/* Tutorial videos */}
                  <div className="w-full flex-1 overflow-y-auto py-4">
                    <h3 className="mb-3 text-center text-sm font-medium text-white/80">Tutorials</h3>
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                      {HOW_IT_WORKS_VIDEOS.map(video => (
                        <a
                          key={video.id}
                          href={`https://www.youtube.com/watch?v=${video.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group block overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-colors hover:bg-white/10"
                        >
                          <div className="relative aspect-video overflow-hidden">
                            <img
                              src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                              alt={video.title}
                              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/30">
                              <Play className="h-10 w-10 fill-white text-white opacity-80 transition-opacity group-hover:opacity-100" />
                            </div>
                          </div>
                          <div className="p-4">
                            <h3 className="text-sm font-semibold text-white">{video.title}</h3>
                            {video.description && (
                              <p className="mt-1 text-xs text-white/70">{video.description}</p>
                            )}
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      </div>
    </div>
  );
}
