'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Terminal, 
  Sparkles,
  BookOpen, 
  ArrowRight,
  ShieldCheck,
  Calendar,
  Compass,
  Laptop
} from 'lucide-react';
import { Course } from '@/types';
import CourseCard from './CourseCard';

interface BentoGridProps {
  courses: Course[];
}

export default function BentoGrid({ courses }: BentoGridProps) {
  
  // Staggered Container Animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25, // Increased stagger for slower reveal
        delayChildren: 0.1,
      },
    },
  };

  // Generic Stiff Fade-up element
  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 120, // Reduced from 200 to slow down the animation
        damping: 20,
        staggerChildren: 0.2, // Stagger nested items slower
      },
    },
  };

  // Mock activity chart details
  const activityData = [
    { day: 'Mon', hours: 2.5, height: '40%' },
    { day: 'Tue', hours: 4.2, height: '65%' },
    { day: 'Wed', hours: 1.8, height: '28%' },
    { day: 'Thu', hours: 6.0, height: '90%' },
    { day: 'Fri', hours: 3.5, height: '55%' },
    { day: 'Sat', hours: 4.8, height: '75%' },
    { day: 'Sun', hours: 1.7, height: '26%' },
  ];

  return (
    <motion.main
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-12 gap-6 w-full max-w-7xl mx-auto pb-24"
    >
      
      {/* 1. HERO TILE (Greeting + Streak stats) - 8 cols on Desktop, 12 on Tablet/Mobile */}
      <motion.section
        variants={itemVariants}
        className="col-span-12 lg:col-span-8 flex flex-col justify-between p-8 bg-surface-dim/60 backdrop-blur-md border border-white/5 rounded-2xl relative overflow-hidden group min-h-[300px]"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-electric-blue/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-20 w-60 h-60 bg-neon-purple/5 rounded-full blur-3xl pointer-events-none" />
        
        {/* Banner header info */}
        <div className="relative z-10 space-y-3">
          <span className="text-[10px] tracking-widest text-electric-blue font-bold font-geist uppercase bg-electric-blue/10 border border-electric-blue/15 px-3.5 py-1.5 rounded-full">
            Dashboard Overview
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-geist leading-tight">
            Welcome back, Alex
          </h1>
          <p className="text-sm md:text-base text-on-surface-variant max-w-xl leading-relaxed">
            You've completed <span className="text-electric-blue font-semibold">85%</span> of your weekly goals. Your Architecture certification is within reach.
          </p>
        </div>

        {/* Stats + CTA Row */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/5">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col justify-center">
            <span className="text-2xl font-bold text-white font-geist">7</span>
            <span className="text-[9px] tracking-widest uppercase font-geist text-on-surface-variant mt-1">Day Streak</span>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col justify-center">
            <span className="text-2xl font-bold text-white font-geist">12</span>
            <span className="text-[9px] tracking-widest uppercase font-geist text-on-surface-variant mt-1">Architect Level</span>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col justify-center">
            <span className="text-2xl font-bold text-white font-geist">2.4k</span>
            <span className="text-[9px] tracking-widest uppercase font-geist text-on-surface-variant mt-1">Total XP</span>
          </div>
        </div>
      </motion.section>

      {/* 2. ACTIVITY TILE (Contribution/Weekly Progress Graph) - 4 cols on Desktop, 12 on Tablet/Mobile */}
      <motion.section
        variants={itemVariants}
        className="col-span-12 lg:col-span-4 flex flex-col justify-between p-8 bg-surface-dim/60 backdrop-blur-md border border-white/5 rounded-2xl relative overflow-hidden group/tile"
      >
        <div className="absolute inset-0 rounded-2xl border border-[rgba(0,240,255,0.25)] opacity-0 group-hover/tile:opacity-100 transition-opacity duration-300 pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-cyan-glow/5 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex justify-between items-center relative z-10">
          <h2 className="text-lg font-bold tracking-tight text-white font-geist">Activity</h2>
          <div className="p-2 rounded-lg bg-cyan-glow/10 text-cyan-glow border border-cyan-glow/15">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>

        {/* Custom Animated Bar Chart */}
        <div className="flex justify-between items-end h-32 mt-6 relative z-10">
          {activityData.map((d, idx) => (
            <div key={d.day} className="flex flex-col items-center gap-2 group/bar w-8">
              {/* Tooltip on Hover */}
              <div className="absolute bottom-40 bg-surface-bright border border-white/10 px-2 py-1 rounded text-[10px] text-white opacity-0 group-hover/bar:opacity-100 transition-opacity pointer-events-none font-geist">
                {d.hours} hrs
              </div>
              {/* Bar Fill */}
              <div className="w-3 bg-white/5 hover:bg-white/10 rounded-full h-full flex items-end overflow-hidden cursor-pointer relative">
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                    delay: 0.3 + idx * 0.05,
                  }}
                  style={{ height: d.height, transformOrigin: 'bottom' }}
                  className="w-full bg-gradient-to-t from-cyan-glow/40 to-cyan-glow rounded-full progress-glow-cyan"
                />
              </div>
              <span className="text-[10px] font-geist text-on-surface-variant uppercase scale-90">{d.day}</span>
            </div>
          ))}
        </div>

        {/* Total Focus Time footer */}
        <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/5 relative z-10">
          <span className="text-xs text-on-surface-variant font-geist">Focus time this week</span>
          <span className="text-sm font-bold text-cyan-glow font-geist progress-glow-cyan px-2.5 py-0.5 rounded-full bg-cyan-glow/10 border border-cyan-glow/20">24.5h</span>
        </div>
      </motion.section>

      {/* 3. COURSES SECTION HEADER & CARDS - 8 cols on Desktop, 12 on Tablet/Mobile */}
      <motion.section
        variants={itemVariants}
        className="col-span-12 lg:col-span-8 space-y-6"
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-electric-blue/10 text-electric-blue border border-electric-blue/15">
              <BookOpen className="w-4 h-4" />
            </div>
            <h2 className="text-xl font-bold tracking-tight text-white font-geist">Active Curriculum</h2>
          </div>
          <span className="text-[10px] tracking-wider text-on-surface-variant font-geist uppercase bg-white/5 border border-white/10 px-3 py-1 rounded-full">
            {courses.length} Enrolled
          </span>
        </div>

        {/* Dynamic Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {courses.map((course, idx) => (
            <CourseCard key={course.id} course={course} index={idx} />
          ))}
        </div>
      </motion.section>

      {/* 4. UPCOMING LABS & RECOMMENDED - 4 cols on Desktop, 12 on Tablet/Mobile */}
      <motion.section
        variants={itemVariants}
        className="col-span-12 lg:col-span-4 space-y-6"
      >
        {/* Title */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-neon-purple/10 text-neon-purple border border-neon-purple/15">
            <Terminal className="w-4 h-4" />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-white font-geist">Upcoming Labs</h2>
        </div>

        {/* Content widget */}
        <div className="bento-tile flex flex-col gap-4 border border-white/5 bg-surface-dim/40 relative">
          
          {/* Lab Item 1 */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all cursor-pointer group/lab">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-electric-blue/10 border border-electric-blue/15 flex items-center justify-center text-electric-blue group-hover/lab:scale-105 transition-transform">
                <Laptop className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white font-geist">Node.js Performance Tuning</h4>
                <p className="text-[10px] text-on-surface-variant font-geist mt-0.5">Tomorrow, 10:00 AM &bull; 45 mins</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-on-surface-variant group-hover/lab:translate-x-1 group-hover/lab:text-white transition-all" />
          </div>

          {/* Lab Item 2 */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all cursor-pointer group/lab">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-neon-purple/10 border border-neon-purple/15 flex items-center justify-center text-neon-purple group-hover/lab:scale-105 transition-transform">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white font-geist">Design Tokens Workflow</h4>
                <p className="text-[10px] text-on-surface-variant font-geist mt-0.5">Aug 24, 2:30 PM &bull; 60 mins</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-on-surface-variant group-hover/lab:translate-x-1 group-hover/lab:text-white transition-all" />
          </div>

          {/* Recommended Row details */}
          <div className="mt-4 pt-4 border-t border-white/5">
            <span className="text-[10px] tracking-widest font-geist font-semibold uppercase text-on-surface-variant block mb-3">Recommended paths</span>
            
            <div className="flex gap-4">
              {/* Recommendation card */}
              <div className="flex-1 min-w-0 rounded-lg bg-white/5 border border-white/10 p-3 hover:border-white/20 transition-all cursor-pointer group/rec">
                <div className="w-full h-20 rounded bg-gradient-to-tr from-electric-blue/20 to-cyan-glow/5 relative overflow-hidden mb-2">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ShieldCheck className="w-8 h-8 text-cyan-glow opacity-60 group-hover/rec:scale-110 transition-transform" />
                  </div>
                </div>
                <h5 className="text-[10.5px] font-semibold text-white truncate">Intro to Cybersecurity</h5>
                <p className="text-[9px] text-on-surface-variant font-geist truncate">14 Modules &bull; Beginner</p>
              </div>

              {/* Recommendation card 2 */}
              <div className="flex-1 min-w-0 rounded-lg bg-white/5 border border-white/10 p-3 hover:border-white/20 transition-all cursor-pointer group/rec">
                <div className="w-full h-20 rounded bg-gradient-to-tr from-neon-purple/20 to-electric-blue/5 relative overflow-hidden mb-2">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Calendar className="w-8 h-8 text-neon-purple opacity-60 group-hover/rec:scale-110 transition-transform" />
                  </div>
                </div>
                <h5 className="text-[10.5px] font-semibold text-white truncate">Systems Architecture</h5>
                <p className="text-[9px] text-on-surface-variant font-geist truncate">22 Modules &bull; Advanced</p>
              </div>
            </div>

          </div>

        </div>
      </motion.section>

    </motion.main>
  );
}
