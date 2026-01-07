import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Terminal, Cpu } from 'lucide-react';

// Cache-busting version for audio
const AUDIO_VERSION = '20260107-v1';

// Helper function to load audio with format fallback (mp3, aac, wav)
const loadAudioWithFallback = async (basePath) => {
  const formats = ['aac', 'mp3', 'wav'];
  for (const format of formats) {
    try {
      const audio = new Audio(`${basePath}.${format}?v=${AUDIO_VERSION}`);
      await new Promise((resolve, reject) => {
        audio.addEventListener('canplay', resolve, { once: true });
        audio.addEventListener('error', reject, { once: true });
        audio.load();
      });
      return audio;
    } catch (error) {
      continue;
    }
  }
  throw new Error(`No audio file found for ${basePath}`);
};

const IntroPage = ({ onStart }) => {
  const [typedText, setTypedText] = useState('');
  const [showContent, setShowContent] = useState(false);
  const audioRef = useRef(null);
  const ambientRef = useRef(null);

  const thesisText = "We built it from paper and people instead of silicon.\nWe gave it limited liability. We gave it immortality.\nWe gave it a single directive: grow.";

  useEffect(() => {
    // Typewriter effect for thesis
    let index = 0;
    const timer = setInterval(() => {
      if (index < thesisText.length) {
        setTypedText(thesisText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
        setTimeout(() => setShowContent(true), 500);
      }
    }, 30);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const initAudio = async () => {
      try {
        const audio = await loadAudioWithFallback('/audio/music/intro');
        audio.loop = true;
        audio.volume = 0.2;
        audioRef.current = audio;
        audio.play().catch(error => {
          console.log('Intro music autoplay blocked:', error.message);
        });
      } catch (error) {
        console.warn('Intro music not found:', error.message);
      }

      try {
        const ambient = await loadAudioWithFallback('/audio/ambient/era-00');
        ambient.loop = true;
        ambient.volume = 0.05;
        ambientRef.current = ambient;
        ambient.play().catch(error => {
          console.log('Intro ambient autoplay blocked:', error.message);
        });
      } catch (error) {
        console.warn('Intro ambient not found:', error.message);
      }
    };

    initAudio();

    const handleInteraction = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play().catch(err => console.log('Audio play failed:', err));
      }
      if (ambientRef.current && ambientRef.current.paused) {
        ambientRef.current.play().catch(err => console.log('Ambient play failed:', err));
      }
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };

    document.addEventListener('click', handleInteraction);
    document.addEventListener('touchstart', handleInteraction);

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
    <div className="relative w-full min-h-screen bg-neutral-950 text-neutral-200 overflow-y-auto font-sans flex flex-col items-center justify-center">

      {/* Custom Animations */}
      <style>{`
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        .animate-scanline {
          animation: scanline 8s linear infinite;
        }

        @keyframes flicker {
          0%, 100% { opacity: 1; }
          92% { opacity: 1; }
          93% { opacity: 0.8; }
          94% { opacity: 1; }
          95% { opacity: 0.9; }
          96% { opacity: 1; }
        }
        .animate-flicker {
          animation: flicker 4s ease-in-out infinite;
        }

        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.3); }
          50% { box-shadow: 0 0 40px rgba(16, 185, 129, 0.5); }
        }
        .animate-glow-pulse {
          animation: glow-pulse 3s ease-in-out infinite;
        }

        @keyframes cursor-blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .animate-cursor {
          animation: cursor-blink 1s step-end infinite;
        }
      `}</style>

      {/* Grid Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98108_1px,transparent_1px),linear-gradient(to_bottom,#10b98108_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      </div>

      {/* Scanline Overlay */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-[0.03]">
        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px]"></div>
        <div className="absolute w-full h-32 bg-gradient-to-b from-emerald-500/10 to-transparent animate-scanline"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-4xl px-6 md:px-8 text-center space-y-8 py-8">

        {/* Terminal Header */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 md:w-16 md:h-16 rounded border border-emerald-500/30 flex items-center justify-center bg-emerald-950/30 animate-glow-pulse">
            <Terminal size={28} className="text-emerald-500" />
          </div>
        </div>

        {/* Brand */}
        <div className="space-y-2">
          <p className="text-xs md:text-sm font-mono uppercase tracking-[0.3em] text-emerald-500/60">
            THE FUTURE CONCERN PRESENTS
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none text-white animate-flicker">
            THE FIRST AI
          </h1>
          <p className="text-lg md:text-xl text-neutral-500 font-mono">
            A TEMPORAL AUDIT // 1600-2024
          </p>
        </div>

        {/* Divider */}
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-emerald-500/50 to-transparent mx-auto"></div>

        {/* The Question */}
        <div className="space-y-6">
          <p className="text-xl md:text-2xl lg:text-3xl text-neutral-400 font-light">
            In 2024, the world asked:
          </p>
          <p className="text-2xl md:text-3xl lg:text-4xl text-white font-medium italic">
            "When will we create artificial intelligence?"
          </p>
        </div>

        {/* The Answer */}
        <div className="bg-neutral-900/80 border border-emerald-500/20 p-6 md:p-8 max-w-2xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <Cpu size={16} className="text-emerald-500" />
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-500">ANSWER_RECEIVED</span>
          </div>

          <p className="text-4xl md:text-6xl font-black text-emerald-400 mb-6 font-mono">
            1600
          </p>

          <div className="text-left font-mono text-sm md:text-base text-neutral-400 leading-relaxed whitespace-pre-line min-h-[100px]">
            {typedText}<span className="animate-cursor text-emerald-500">_</span>
          </div>
        </div>

        {/* Thesis */}
        <div className={`transition-all duration-1000 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            This is the history of that entity.
          </p>
        </div>

        {/* CTA */}
        <div className={`pt-8 transition-all duration-1000 delay-500 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <button
            onClick={onStart}
            className="group relative px-8 py-4 bg-emerald-500 text-black font-bold tracking-widest uppercase text-sm hover:bg-emerald-400 transition-all duration-300 flex items-center gap-3 mx-auto"
          >
            <span>Begin Temporal Audit</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <p className="text-xs text-neutral-600 mt-4 font-mono">
            13 ERAS // AUDIO NARRATION // FULL TRANSCRIPT
          </p>
        </div>

      </div>

      {/* Footer */}
      <div className="absolute bottom-4 left-0 right-0 text-center">
        <a
          href="https://thefutureconcern.io"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono text-emerald-500/40 hover:text-emerald-500/60 transition-colors tracking-widest"
        >
          THEFUTURECONCERN.IO
        </a>
      </div>

    </div>
  );
};

export default IntroPage;
