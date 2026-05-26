'use client';

import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { Course } from '@/types';

interface CourseCardProps {
  course: Course;
  index: number;
}

export default function CourseCard({ course, index }: CourseCardProps) {
  const { title, progress, icon_name } = course;

  // Dynamically resolve Lucide Icon
  const IconComponent = (Icons as any)[icon_name] || Icons.BookOpen;

  // Custom glows based on index/course types for next-gen futuristic aesthetics
  const getGlowColorClass = (idx: number) => {
    switch (idx % 3) {
      case 0: // Electric Blue
        return {
          text: 'text-electric-blue',
          bg: 'bg-electric-blue',
          glow: 'progress-glow-blue',
          cardBg: 'from-electric-blue/5 via-transparent to-transparent',
        };
      case 1: // Neon Purple
        return {
          text: 'text-neon-purple',
          bg: 'bg-neon-purple',
          glow: 'progress-glow-purple',
          cardBg: 'from-neon-purple/5 via-transparent to-transparent',
        };
      case 2: // Cyan Glow
      default:
        return {
          text: 'text-cyan-glow',
          bg: 'bg-cyan-glow',
          glow: 'progress-glow-cyan',
          cardBg: 'from-cyan-glow/5 via-transparent to-transparent',
        };
    }
  };

  const colors = getGlowColorClass(index);

  // Staggered child variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 200,
        damping: 20,
      },
    },
  };

  return (
    <motion.article
      variants={cardVariants}
      whileHover={{
        scale: 1.015,
        y: -3,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
      className="group relative flex flex-col justify-between min-h-[220px] rounded-2xl p-8 bg-surface-dim/60 backdrop-blur-md border border-white/5 bento-tile-glow cursor-pointer overflow-hidden"
    >
      {/* Subtle Mesh Gradient Overlay inside the card */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.cardBg} opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity duration-500`} />
      
      {/* Subtle scanline/texture detail */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none" />

      {/* Card Header */}
      <div className="relative z-10 flex justify-between items-start">
        <div className={`p-3 rounded-xl bg-white/5 border border-white/10 ${colors.text} transition-transform duration-300 group-hover:scale-110`}>
          <IconComponent className="w-6 h-6" strokeWidth={1.5} />
        </div>
        <span className="text-[10px] tracking-widest text-on-surface-variant font-geist uppercase bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
          {progress}% Complete
        </span>
      </div>

      {/* Card Title */}
      <div className="relative z-10 mt-6 mb-4">
        <h3 className="text-xl font-semibold tracking-tight text-on-surface font-geist group-hover:text-white transition-colors duration-300">
          {title}
        </h3>
        <p className="text-xs text-on-surface-variant mt-1.5 line-clamp-2">
          {index === 0 && 'Mastering composition, render props, and higher-order components.'}
          {index === 1 && 'The science of building resilient, accessible, and performant interfaces.'}
          {index === 2 && 'Designing for scale: Load balancing, caching, and database sharding.'}
          {index === 3 && 'Instruction sets, caching mechanisms, pipelining, and system buses.'}
        </p>
      </div>

      {/* Progress Section */}
      <div className="relative z-10 w-full space-y-2 mt-auto">
        <div className="flex justify-between items-center text-[10px] font-geist tracking-wider text-on-surface-variant uppercase">
          <span>Progress</span>
          <span className={`${colors.text} font-bold`}>{progress}%</span>
        </div>
        
        {/* Progress track */}
        <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden border border-white/5">
          {/* Animated fill */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: progress / 100 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 20,
              delay: 0.2 + index * 0.1, // Stagger bar fills slightly
            }}
            style={{ transformOrigin: 'left' }}
            className={`w-full h-full rounded-full ${colors.bg} ${colors.glow}`}
          />
        </div>
      </div>
    </motion.article>
  );
}
