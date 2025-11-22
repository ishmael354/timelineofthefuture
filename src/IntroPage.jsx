import React, { useState } from 'react';
import { ArrowRight, Play } from 'lucide-react';

const IntroPage = ({ onStart }) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className="relative w-full h-screen bg-black text-white overflow-hidden font-sans flex flex-col items-center justify-center">

      {/* --- CUSTOM ANIMATIONS --- */}
      <style>{`
        @keyframes perspective-grid {
          0% { transform: perspective(500px) rotateX(60deg) translateY(0); }
          100% { transform: perspective(500px) rotateX(60deg) translateY(40px); }
        }
        .animate-grid {
          animation: perspective-grid 4s linear infinite;
        }

        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        @keyframes glow-pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        .animate-glow {
          animation: glow-pulse 4s ease-in-out infinite;
        }
      `}</style>

      {/* --- BACKGROUND: THE ARCHITECT'S GRID --- */}
      {/* This replaces the 'stars' with a structure that implies 'planning' and 'geometry' */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black z-10"></div>
        <div className="w-[200%] h-[200%] -ml-[50%] -mt-[50%] bg-[linear-gradient(transparent_0%,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:40px_40px] animate-grid origin-bottom"></div>
      </div>

      {/* --- CONTENT CONTAINER --- */}
      <div className="relative z-20 max-w-4xl px-6 text-center space-y-12">

        {/* Header Section */}
        <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0s' }}>
          {/* Banner Image */}
          <div className="flex justify-center mb-6">
            <img
              src="/timelineofthefuture/video/banner.png"
              alt="The History of the Future"
              className="max-w-2xl w-full h-auto"
            />
          </div>

          <div className="inline-block px-3 py-1 border border-white/20 rounded-full text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-4">
            Interactive Timeline
          </div>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
            The History <br /> of the Future
          </h1>
          <p className="text-lg md:text-xl text-gray-400 font-light tracking-wide max-w-2xl mx-auto">
            How biology, culture, and algorithms invented "The Future."
          </p>
        </div>

        {/* The Divider / Insight */}
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent mx-auto animate-fade-in" style={{ animationDelay: '0.3s' }}></div>

        <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <p className="text-xl md:text-2xl font-serif italic text-gray-300 max-w-3xl mx-auto leading-relaxed">
            "We talk about the future like it's a place we are going to. <br/>
            But the future is not a destination. It is a tool we built."
          </p>
        </div>

        {/* CTA Button */}
        <div className="pt-8 animate-fade-in" style={{ animationDelay: '0.7s' }}>
          <button
            onClick={onStart}
            className="group relative px-8 py-4 bg-white text-black font-bold tracking-widest uppercase text-sm hover:bg-gray-200 transition-all duration-300 flex items-center gap-3 mx-auto"
          >
            Enter the Timeline
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />

            {/* Button Glow Effect */}
            <div className="absolute inset-0 bg-white/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </button>
        </div>

      </div>

      {/* --- FOOTER: BRANDING --- */}
      {/* Sleek integration of The Future Concern Logo */}
      <div className="absolute bottom-10 flex flex-col items-center gap-3 animate-fade-in" style={{ animationDelay: '0.9s' }}>
        <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-500/50">
          Presented By
        </p>

        <p className="text-emerald-400 text-sm font-bold tracking-wide">
          The Future Concern
        </p>

        <div
          className="relative group cursor-pointer"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Animated Headphones Video */}
          <div className="w-24 h-24 rounded-full border-2 border-emerald-500/30 flex items-center justify-center bg-emerald-900/10 overflow-hidden group-hover:border-emerald-500/60 transition-all duration-700">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/timelineofthefuture/video/headphones.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Subtle Glow behind the logo */}
          <div className={`absolute inset-0 bg-emerald-500/20 blur-2xl rounded-full transition-opacity duration-700 ${isHovering ? 'opacity-50' : 'opacity-0'}`}></div>
        </div>
      </div>

    </div>
  );
};

export default IntroPage;
