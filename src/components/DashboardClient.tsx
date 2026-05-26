'use client';

import React, { useState, Suspense, use } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  Menu,
  Search, 
  Activity, 
  TrendingUp, 
  Award, 
  Lock, 
  CheckCircle, 
  ShieldAlert, 
  Grid, 
  Cpu, 
  Binary, 
  Atom, 
  BookOpen, 
  Smartphone,
  Eye,
  Key,
  Globe
} from 'lucide-react';
import { Course } from '@/types';
import Sidebar from './Sidebar';
import BentoGrid from './BentoGrid';
import CourseSkeleton from './CourseSkeleton';

interface DashboardClientProps {
  coursesPromise: Promise<Course[]>;
}

// Wrapper component to resolve the server promise using React.use()
function CoursesWrapper({ coursesPromise }: { coursesPromise: Promise<Course[]> }) {
  const courses = use(coursesPromise);
  return <BentoGrid courses={courses} />;
}

export default function DashboardClient({ coursesPromise }: DashboardClientProps) {
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Settings page state
  const [haptics, setHaptics] = useState(true);
  const [interfaceMode, setInterfaceMode] = useState('dark');

  // Animation variants for tab transitions
  const tabVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 260,
        damping: 20
      }
    },
    exit: { opacity: 0, y: -15, transition: { duration: 0.15 } }
  };

  return (
    <div className="flex min-h-screen">
      {/* Responsive Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-0">
        
        {/* Top Header Bar */}
        <header className="sticky top-0 bg-background/50 backdrop-blur-md border-b border-white/5 h-16 flex items-center justify-between px-6 z-20 gap-4">
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 -ml-2 rounded-xl text-on-surface-variant hover:text-white hover:bg-white/5 transition-all"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Search bar */}
          <div className="relative flex-1 md:w-96 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
            <input
              type="text"
              placeholder="Search resources, labs, or paths..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 hover:border-white/15 focus:border-electric-blue focus:outline-none rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-on-surface-variant/60 font-geist transition-all"
            />
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-on-surface-variant hover:text-white transition-all cursor-pointer relative">
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-electric-blue animate-pulse" />
              <Bell className="w-4 h-4" />
            </button>
            <div className="w-8 h-8 rounded-full border border-white/15 overflow-hidden cursor-pointer hover:border-white/30 transition-all bg-gradient-to-tr from-electric-blue/50 to-neon-purple/50 flex items-center justify-center text-xs font-bold text-white uppercase font-geist">
              AX
            </div>
          </div>
        </header>

        {/* Content Container */}
        <div className="flex-grow p-6 overflow-y-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'home' && (
              <motion.div
                key="home"
                variants={tabVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                {/* Courses Promise Wrapper wrapped in Suspense */}
                <Suspense fallback={
                  <div className="max-w-7xl mx-auto space-y-6">
                    {/* Hero area skeleton */}
                    <div className="w-full h-[300px] rounded-2xl bg-white/5 animate-pulse" />
                    {/* Courses loading area */}
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-white/5 animate-pulse" />
                      <div className="w-48 h-6 rounded bg-white/5 animate-pulse" />
                    </div>
                    <CourseSkeleton />
                  </div>
                }>
                  <CoursesWrapper coursesPromise={coursesPromise} />
                </Suspense>
              </motion.div>
            )}

            {activeTab === 'courses' && (
              <motion.div
                key="courses"
                variants={tabVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="max-w-4xl mx-auto space-y-8"
              >
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold font-geist text-white">Nexus Curriculum</h2>
                  <p className="text-sm text-on-surface-variant">Curated paths for elite engineering mastery.</p>
                </div>

                {/* Course Path Items */}
                <div className="space-y-6">
                  {/* Card 1 */}
                  <article className="bento-tile border border-white/5 bg-surface-dim/40 p-6 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center hover:border-white/10 transition-colors duration-300">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-neon-purple/10 border border-neon-purple/15 text-neon-purple flex items-center justify-center flex-shrink-0">
                        <Atom className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[9px] font-geist font-bold text-neon-purple tracking-widest uppercase">Hardcore Path</span>
                        <h3 className="text-lg font-bold text-white font-geist mt-0.5">Neural Mesh Networking</h3>
                        <p className="text-xs text-on-surface-variant mt-1">Mastering decentralized peer-to-peer protocols in synthetic models.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                      <div className="text-right hidden sm:block">
                        <span className="text-[10px] text-on-surface-variant font-geist block">Est. Duration</span>
                        <span className="text-xs font-semibold text-white font-geist">24h 45m</span>
                      </div>
                      <button className="flex-1 md:flex-initial py-2.5 px-4 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl text-xs font-geist text-white transition-all cursor-pointer">
                        View Path
                      </button>
                    </div>
                  </article>

                  {/* Card 2 */}
                  <article className="bento-tile border border-white/5 bg-surface-dim/40 p-6 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center hover:border-white/10 transition-colors duration-300">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-electric-blue/10 border border-electric-blue/15 text-electric-blue flex items-center justify-center flex-shrink-0">
                        <Grid className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[9px] font-geist font-bold text-electric-blue tracking-widest uppercase">Creative Path</span>
                        <h3 className="text-lg font-bold text-white font-geist mt-0.5">Generative UI Systems</h3>
                        <p className="text-xs text-on-surface-variant mt-1">Using AI to construct adaptive, self-healing user interfaces dynamically.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                      <div className="text-right hidden sm:block">
                        <span className="text-[10px] text-on-surface-variant font-geist block">Progress</span>
                        <span className="text-xs font-semibold text-white font-geist">32% Completed</span>
                      </div>
                      <button className="flex-1 md:flex-initial py-2.5 px-4 bg-electric-blue text-xs font-geist text-white rounded-xl hover:opacity-95 active:scale-[0.98] transition-all cursor-pointer">
                        Resume
                      </button>
                    </div>
                  </article>

                  {/* Card 3 */}
                  <article className="bento-tile border border-white/5 bg-surface-dim/40 p-6 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center hover:border-white/10 transition-colors duration-300">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-cyan-glow/10 border border-cyan-glow/15 text-cyan-glow flex items-center justify-center flex-shrink-0">
                        <Binary className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[9px] font-geist font-bold text-cyan-glow tracking-widest uppercase">New Release</span>
                        <h3 className="text-lg font-bold text-white font-geist mt-0.5">Cryptographic Foundations</h3>
                        <p className="text-xs text-on-surface-variant mt-1">The mathematical bedrock of secure communication in the cloud.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                      <div className="text-right hidden sm:block">
                        <span className="text-[10px] text-on-surface-variant font-geist block">Rating</span>
                        <span className="text-xs font-semibold text-white font-geist">4.9 Stars</span>
                      </div>
                      <button className="flex-1 md:flex-initial py-2.5 px-4 bg-gradient-to-r from-electric-blue to-neon-purple text-xs font-geist text-white rounded-xl hover:opacity-95 active:scale-[0.98] transition-all cursor-pointer">
                        Enroll Now
                      </button>
                    </div>
                  </article>
                </div>
              </motion.div>
            )}

            {activeTab === 'activity' && (
              <motion.div
                key="activity"
                variants={tabTransitions}
                initial="initial"
                animate="animate"
                exit="exit"
                className="max-w-4xl mx-auto space-y-8"
              >
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold font-geist text-white">Activity Hub</h2>
                  <p className="text-sm text-on-surface-variant">Real-time breakdown of your learning velocity and streaks.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Total Learning Metrics */}
                  <div className="bento-tile md:col-span-2 border border-white/5 flex flex-col justify-between p-6">
                    <div>
                      <span className="text-[9px] font-geist text-on-surface-variant uppercase tracking-wider block">Global Metrics</span>
                      <h4 className="text-sm font-semibold text-white font-geist mt-1">Total Learning Time</h4>
                    </div>
                    <div className="my-8">
                      <span className="text-6xl font-bold text-white font-geist">142</span>
                      <span className="text-xl text-on-surface-variant ml-2">hours</span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-on-surface-variant border-t border-white/5 pt-4">
                      <div className="flex items-center gap-2 text-cyan-glow">
                        <TrendingUp className="w-4 h-4" />
                        <span>+12% this week</span>
                      </div>
                      <span>Personal record: 32 hours</span>
                    </div>
                  </div>

                  {/* Consistency Metrics */}
                  <div className="bento-tile border border-white/5 flex flex-col justify-between p-6">
                    <div>
                      <span className="text-[9px] font-geist text-on-surface-variant uppercase tracking-wider block">Consistency</span>
                      <h4 className="text-sm font-semibold text-white font-geist mt-1">Daily Streak</h4>
                    </div>
                    
                    {/* Ring indicator */}
                    <div className="my-6 flex justify-center relative">
                      <div className="w-24 h-24 rounded-full border-[8px] border-white/5 border-t-neon-purple flex items-center justify-center">
                        <div className="text-center">
                          <span className="text-2xl font-bold text-white font-geist block leading-none">24</span>
                          <span className="text-[9px] text-on-surface-variant font-geist uppercase mt-0.5 block">Days</span>
                        </div>
                      </div>
                    </div>

                    <button className="w-full py-2 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl text-xs font-geist text-white transition-all cursor-pointer">
                      Share Progress
                    </button>
                  </div>
                </div>

                {/* Milestones widget */}
                <div className="bento-tile border border-white/5 p-6 space-y-4">
                  <h3 className="text-sm font-semibold text-white font-geist">Unlocked Milestones</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3.5 bg-white/5 border border-white/10 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-electric-blue/15 text-electric-blue border border-electric-blue/20">
                          <Award className="w-4 h-4" />
                        </div>
                        <div>
                          <h5 className="text-xs font-semibold text-white">First Portfolio Completion</h5>
                          <p className="text-[9px] text-on-surface-variant font-geist mt-0.5">Unlocked 2 days ago</p>
                        </div>
                      </div>
                      <CheckCircle className="w-4 h-4 text-cyan-glow" />
                    </div>

                    <div className="flex items-center justify-between p-3.5 bg-white/5 border border-white/10 rounded-xl opacity-50">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-white/10 text-on-surface-variant">
                          <Lock className="w-4 h-4" />
                        </div>
                        <div>
                          <h5 className="text-xs font-semibold text-white">Architect Certification</h5>
                          <p className="text-[9px] text-on-surface-variant font-geist mt-0.5">90% complete &bull; 2 modules left</p>
                        </div>
                      </div>
                      <Lock className="w-4 h-4 text-on-surface-variant" />
                    </div>
                  </div>
                </div>

              </motion.div>
            )}

            {activeTab === 'profile' && (
              <motion.div
                key="profile"
                variants={tabTransitions}
                initial="initial"
                animate="animate"
                exit="exit"
                className="max-w-3xl mx-auto space-y-8"
              >
                {/* Profile Header */}
                <div className="bento-tile border border-white/5 p-8 flex flex-col sm:flex-row gap-6 items-center">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-electric-blue via-cyan-glow to-neon-purple flex items-center justify-center text-3xl font-bold text-white uppercase font-geist">
                    LV
                  </div>
                  <div className="text-center sm:text-left space-y-1">
                    <h2 className="text-2xl font-bold text-white font-geist">Lexington Vance</h2>
                    <p className="text-xs text-electric-blue font-semibold uppercase tracking-wider font-geist">Senior Level 12 Architect</p>
                    <div className="flex justify-center sm:justify-start gap-4 text-[10px] text-on-surface-variant font-geist pt-2">
                      <span>XP: 14,250 / 15,000</span>
                      <span>&bull;</span>
                      <span>Streak: 42 Days</span>
                    </div>
                  </div>
                </div>

                {/* Settings list */}
                <div className="bento-tile border border-white/5 p-6 space-y-6">
                  <h3 className="text-sm font-semibold text-white font-geist border-b border-white/5 pb-3">Core Protocols</h3>
                  
                  {/* Security */}
                  <div className="flex items-center justify-between py-2">
                    <div className="flex gap-4 items-center">
                      <Key className="w-5 h-5 text-on-surface-variant" />
                      <div>
                        <h4 className="text-xs font-semibold text-white">Security & Encryption</h4>
                        <p className="text-[10px] text-on-surface-variant mt-0.5">Biometric locks and 2FA authentication</p>
                      </div>
                    </div>
                    <button className="py-1.5 px-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded-lg text-[10px] font-geist text-white transition-all cursor-pointer">
                      Configure
                    </button>
                  </div>


                  {/* Haptic notifications toggle */}
                  <div className="flex items-center justify-between py-2">
                    <div className="flex gap-4 items-center">
                      <Eye className="w-5 h-5 text-on-surface-variant" />
                      <div>
                        <h4 className="text-xs font-semibold text-white">Haptic Notifications</h4>
                        <p className="text-[10px] text-on-surface-variant mt-0.5">Critical updates only (High priority)</p>
                      </div>
                    </div>
                    {/* Toggle Switch */}
                    <button 
                      onClick={() => setHaptics(!haptics)}
                      className={`w-10 h-6 rounded-full p-0.5 transition-colors cursor-pointer ${haptics ? 'bg-electric-blue' : 'bg-white/10'}`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-transform duration-300 ${haptics ? 'translate-x-4' : 'translate-x-0'}`} />
                    </button>
                  </div>

                  {/* Neural translation */}
                  <div className="flex items-center justify-between py-2">
                    <div className="flex gap-4 items-center">
                      <Globe className="w-5 h-5 text-on-surface-variant" />
                      <div>
                        <h4 className="text-xs font-semibold text-white">Neural Translation</h4>
                        <p className="text-[10px] text-on-surface-variant mt-0.5">English (Unified Global)</p>
                      </div>
                    </div>
                    <button className="py-1.5 px-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded-lg text-[10px] font-geist text-white transition-all cursor-pointer">
                      Select Language
                    </button>
                  </div>

                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// Simple fallback tab transition object if not using tabVariants
const tabTransitions = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1, transition: { type: 'spring' as const, stiffness: 200, damping: 20 } },
  exit: { opacity: 0, scale: 0.98, transition: { duration: 0.15 } }
};
