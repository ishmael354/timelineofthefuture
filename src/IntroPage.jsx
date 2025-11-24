import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Play } from 'lucide-react';

// Cache-busting version for audio
const AUDIO_VERSION = '20251121-v12';

// Helper function to load audio with format fallback (mp3, aac, wav)
const loadAudioWithFallback = async (basePath) => {
  const formats = ['aac', 'mp3', 'wav'];
  for (const format of formats) {
    try {
      const audio = new Audio(`${basePath}.${format}?v=${AUDIO_VERSION}`);
      // Test if it can load
      await new Promise((resolve, reject) => {
        audio.addEventListener('canplay', resolve, { once: true });
        audio.addEventListener('error', reject, { once: true });
        audio.load();
      });
      return audio;
    } catch (error) {
      // Try next format
      continue;
    }
  }
  throw new Error(`No audio file found for ${basePath}`);
};

const IntroPage = ({ onStart }) => {
  const [isHovering, setIsHovering] = useState(false);
  const audioRef = useRef(null);
  const ambientRef = useRef(null);

  useEffect(() => {
    const initAudio = async () => {
      try {
        // Start intro music on mount (try aac, mp3, wav)
        const audio = await loadAudioWithFallback('/timelineofthefuture/audio/music/intro');
        audio.loop = true;
        audio.volume = 0.3; // Moderate volume for intro
        audioRef.current = audio;

        // Attempt autoplay
        audio.play().catch(error => {
          console.log('Intro music autoplay blocked:', error.message);
          // Will play on first user interaction
        });
      } catch (error) {
        console.warn('Intro music not found:', error.message);
      }

      try {
        // Start intro ambient (era-00) - try aac, mp3, wav
        const ambient = await loadAudioWithFallback('/timelineofthefuture/audio/ambient/era-00');
        ambient.loop = true;
        ambient.volume = 0.05; // Ambient layer - reduced per user feedback
        ambientRef.current = ambient;

        // Attempt autoplay
        ambient.play().catch(error => {
          console.log('Intro ambient autoplay blocked:', error.message);
        });
      } catch (error) {
        console.warn('Intro ambient not found:', error.message);
      }
    };

    initAudio();

    // Handler to start audio on any user interaction
    const handleInteraction = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play().catch(err => console.log('Audio play failed:', err));
      }
      if (ambientRef.current && ambientRef.current.paused) {
        ambientRef.current.play().catch(err => console.log('Ambient play failed:', err));
      }
      // Remove listeners after first interaction
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };

    // Add interaction listeners for Safari/mobile
    document.addEventListener('click', handleInteraction);
    document.addEventListener('touchstart', handleInteraction);

    // Cleanup on unmount
    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      if (ambientRef.current) {
        ambientRef.current.pause();
        ambientRef.current.currentTime = 0;
      }
    };
  }, []);

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

        @keyframes wave-flow-horizontal {
          0% { transform: translateX(0); }
          100% { transform: translateX(50%); }
        }
        .animate-wave-flow {
          animation: wave-flow-horizontal 3s linear infinite;
        }

        @keyframes wave-flow-2 {
          0% { transform: translateX(0); }
          100% { transform: translateX(50%); }
        }
        .animate-wave-flow-2 {
          animation: wave-flow-2 4s linear infinite;
        }

        @keyframes wave-flow-3 {
          0% { transform: translateX(0); }
          100% { transform: translateX(50%); }
        }
        .animate-wave-flow-3 {
          animation: wave-flow-3 5s linear infinite;
        }
      `}</style>

      {/* --- BACKGROUND: THE ARCHITECT'S GRID --- */}
      {/* This replaces the 'stars' with a structure that implies 'planning' and 'geometry' */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black z-10"></div>
        <div className="w-[200%] h-[200%] -ml-[50%] -mt-[50%] bg-[linear-gradient(transparent_0%,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:40px_40px] animate-grid origin-bottom"></div>
      </div>

      {/* --- CONTENT CONTAINER --- */}
      <div className="relative z-20 max-w-4xl px-6 text-center space-y-4 md:space-y-8 py-8">

        {/* Header Section */}
        <div className="space-y-4 md:space-y-6 animate-fade-in" style={{ animationDelay: '0s' }}>
          {/* Banner Image */}
          <div className="flex justify-center mb-4 md:mb-6">
            <img
              src="/timelineofthefuture/video/banner.png"
              alt="The History of the Future"
              className="max-w-full md:max-w-2xl w-full h-auto px-4"
            />
          </div>

          <div className="relative inline-block mb-4">
            {/* Animated sine wave background - positioned behind pill */}
            <div className="absolute inset-0 -inset-x-12 -inset-y-6 overflow-hidden rounded-full pointer-events-none">
              {/* Wave 1 - Larger amplitude, slower */}
              <svg className="absolute top-1/2 left-0 -translate-y-1/2 w-[300%] h-full animate-wave-flow" viewBox="0 0 600 40" preserveAspectRatio="none">
                <path
                  d="M-100,20 Q-75,8 -50,20 T0,20 T50,20 T100,20 T150,20 T200,20 T250,20 T300,20 T350,20 T400,20 T450,20 T500,20 T550,20 T600,20 T650,20 T700,20"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2"
                  opacity="0.6"
                />
              </svg>
              {/* Wave 2 - Medium amplitude, medium speed */}
              <svg className="absolute top-1/2 left-0 -translate-y-1/2 w-[300%] h-full animate-wave-flow-2" viewBox="0 0 600 40" preserveAspectRatio="none">
                <path
                  d="M-100,20 Q-75,12 -50,20 T0,20 T50,20 T100,20 T150,20 T200,20 T250,20 T300,20 T350,20 T400,20 T450,20 T500,20 T550,20 T600,20 T650,20 T700,20"
                  fill="none"
                  stroke="#34d399"
                  strokeWidth="1.5"
                  opacity="0.5"
                />
              </svg>
              {/* Wave 3 - Small amplitude, faster */}
              <svg className="absolute top-1/2 left-0 -translate-y-1/2 w-[300%] h-full animate-wave-flow-3" viewBox="0 0 600 40" preserveAspectRatio="none">
                <path
                  d="M-100,20 Q-75,15 -50,20 T0,20 T50,20 T100,20 T150,20 T200,20 T250,20 T300,20 T350,20 T400,20 T450,20 T500,20 T550,20 T600,20 T650,20 T700,20"
                  fill="none"
                  stroke="#6ee7b7"
                  strokeWidth="1"
                  opacity="0.4"
                />
              </svg>
            </div>

            {/* Pill badge */}
            <div className="relative px-3 py-1 border border-emerald-500/40 rounded-full text-[10px] uppercase tracking-[0.3em] text-emerald-400 bg-emerald-950/30 backdrop-blur-sm shadow-[0_0_20px_rgba(16,185,129,0.2)]">
              Incoming Transmission
            </div>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
            The History <br /> of the Future
          </h1>
          <p className="text-lg md:text-xl text-gray-400 font-light tracking-wide max-w-2xl mx-auto">
            How biology, culture, and algorithms invented "The Future."
          </p>
        </div>

        {/* The Divider / Insight */}
        <div className="w-px h-8 md:h-12 bg-gradient-to-b from-transparent via-white/20 to-transparent mx-auto animate-fade-in" style={{ animationDelay: '0.3s' }}></div>

        <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <p className="text-lg md:text-xl lg:text-2xl font-serif italic text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
            "The future is not a destination. <br className="hidden md:block"/>
            It is a tool we built."
          </p>
        </div>

        {/* --- BRANDING --- */}
        <div className="flex flex-col items-center gap-2 md:gap-3 pt-4 md:pt-6 animate-fade-in" style={{ animationDelay: '0.7s' }}>
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
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-emerald-500/30 flex items-center justify-center bg-emerald-900/10 overflow-hidden group-hover:border-emerald-500/60 transition-all duration-700">
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

        {/* CTA Button */}
        <div className="pt-4 md:pt-6 animate-fade-in" style={{ animationDelay: '0.9s' }}>
          <button
            onClick={onStart}
            className="group relative px-8 py-4 bg-white text-black font-bold tracking-widest uppercase text-sm hover:bg-gray-200 transition-all duration-300 flex items-center gap-3 mx-auto shadow-2xl"
          >
            Enter the Timeline
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />

            {/* Button Glow Effect */}
            <div className="absolute inset-0 bg-white/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </button>
        </div>

      </div>

    </div>
  );
};

export default IntroPage;
