'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  BookOpen, 
  Activity, 
  User, 
  Sparkles,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export default function Sidebar({ activeTab, setActiveTab, isMobileMenuOpen, setIsMobileMenuOpen }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const mainNavItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'activity', label: 'Activity', icon: Activity },
    { id: 'profile', label: 'Profile', icon: User },
  ];



  return (
    <>
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Desktop & Mobile Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 transform flex flex-col justify-between h-screen bg-surface-dim/95 md:bg-surface-dim/40 backdrop-blur-xl border-r border-white/5 transition-transform duration-300 md:sticky md:top-0 md:translate-x-0 ${
          isCollapsed ? 'w-20' : 'w-64 lg:w-72'
        } ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Toggle Collapse Button (Desktop Only) */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-10 w-6 h-6 rounded-full bg-surface-bright border border-white/10 flex items-center justify-center text-on-surface-variant hover:text-white transition-colors cursor-pointer hidden lg:flex"
        >
          {isCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
        </button>

        {/* Brand Section */}
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className={`rounded-full bg-gradient-to-tr from-electric-blue to-neon-purple flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isCollapsed ? 'w-8 h-8' : 'w-10 h-10'}`}>
              <span className={`text-white font-bold font-geist ${isCollapsed ? 'text-sm' : 'text-lg'}`}>N</span>
            </div>
            {!isCollapsed && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col"
              >
                <span className="font-geist font-bold text-lg leading-tight text-white">Nexus Scholar</span>
                <span className="text-[10px] tracking-widest text-on-surface-variant uppercase font-geist">Level 12 Architect</span>
              </motion.div>
            )}
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 px-4 py-8 space-y-2">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }}
                className={`relative w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-medium transition-colors cursor-pointer overflow-hidden group ${
                  isActive ? 'text-white' : 'text-on-surface-variant hover:text-white'
                }`}
              >
                {/* Active Highlight sliding animation */}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 bg-gradient-to-r from-electric-blue/20 to-neon-purple/10 border-l-[3px] border-electric-blue"
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  />
                )}
                
                <Icon className={`w-5 h-5 relative z-10 ${isActive ? 'text-electric-blue' : 'group-hover:scale-105 transition-transform'}`} />
                {!isCollapsed && (
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="relative z-10 font-geist"
                  >
                    {item.label}
                  </motion.span>
                )}
              </button>
            );
          })}
        </nav>
      </aside>

    </>
  );
}
