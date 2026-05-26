import React from 'react';

export default function CourseSkeleton() {
  const skeletons = Array.from({ length: 4 });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      {skeletons.map((_, index) => (
        <article
          key={index}
          className="bento-tile min-h-[220px] flex flex-col justify-between border border-white/5 bg-surface-dim/40"
        >
          {/* Top Section */}
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 rounded-xl bg-white/5 animate-pulse" />
            <div className="w-24 h-6 rounded-full bg-white/5 animate-pulse" />
          </div>

          {/* Middle Title Section */}
          <div className="space-y-2 mt-6">
            <div className="w-3/4 h-5 rounded bg-white/5 animate-pulse" />
            <div className="w-1/2 h-4 rounded bg-white/5 animate-pulse" />
          </div>

          {/* Bottom Progress Section */}
          <div className="w-full space-y-2 mt-6">
            <div className="flex justify-between">
              <div className="w-12 h-3 rounded bg-white/5 animate-pulse" />
              <div className="w-8 h-3 rounded bg-white/5 animate-pulse" />
            </div>
            <div className="w-full h-1.5 rounded-full bg-white/5 animate-pulse" />
          </div>
        </article>
      ))}
    </div>
  );
}
