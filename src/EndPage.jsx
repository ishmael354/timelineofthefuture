import React, { useEffect, useRef, useState } from 'react';
import { RotateCcw, Share2, ArrowRight, Terminal } from 'lucide-react';

// Cache-busting version for video
const VIDEO_VERSION = '20260107-v1';

const EndPage = ({ onRestart }) => {
  const videoRef = useRef(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const signupFormRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = 0.3;
      videoRef.current.play().catch(error => {
        console.log('Video autoplay blocked:', error);
        // Skip to content if video can't play
        setVideoEnded(true);
      });
    }
  }, []);

  // Load Ghost signup form script when video ends
  useEffect(() => {
    if (videoEnded && signupFormRef.current) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/ghost/signup-form@~0.3/umd/signup-form.min.js';
      script.setAttribute('data-button-color', '#10b981');
      script.setAttribute('data-button-text-color', '#000000');
      script.setAttribute('data-site', 'https://www.thefutureconcern.io/');
      script.setAttribute('data-locale', 'en');
      script.async = true;
      signupFormRef.current.appendChild(script);
    }
  }, [videoEnded]);

  const handleVideoEnded = () => {
    setVideoEnded(true);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'The First AI - A Temporal Audit',
        text: 'The corporation is humanity\'s first AI, built in 1600 from paper and people. Explore 424 years of the demon\'s history.',
        url: window.location.href
      }).catch(err => console.log('Share failed:', err));
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-neutral-950 text-neutral-200 overflow-y-auto font-sans flex flex-col items-center justify-center py-12">

      {/* Custom animations */}
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.3); }
          50% { box-shadow: 0 0 40px rgba(16, 185, 129, 0.5); }
        }
        .animate-glow-pulse {
          animation: glow-pulse 3s ease-in-out infinite;
        }
      `}</style>

      {/* Grid Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98108_1px,transparent_1px),linear-gradient(to_bottom,#10b98108_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      </div>

      {/* Scanline Overlay */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-[0.03]">
        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px]"></div>
      </div>

      {/* Radial glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px]"></div>

      {/* Animated video logo - appears during video playback */}
      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${videoEnded ? 'opacity-0 pointer-events-none' : 'opacity-30'}`}>
        <video
          ref={videoRef}
          src={`/video/logo.mp4?v=${VIDEO_VERSION}`}
          muted={false}
          playsInline
          onEnded={handleVideoEnded}
          className="max-w-md w-full"
        />
      </div>

      {/* Content */}
      <div className={`relative z-20 max-w-3xl px-4 md:px-6 text-center space-y-6 md:space-y-8 transition-all duration-1000 ${
        videoEnded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>

        {/* Terminal Icon */}
        <div className="flex items-center justify-center animate-fade-in" style={{ animationDelay: '0s' }}>
          <div className="w-16 h-16 md:w-20 md:h-20 rounded border border-emerald-500/30 flex items-center justify-center bg-emerald-950/30 animate-glow-pulse">
            <Terminal size={32} className="text-emerald-500" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <p className="text-xs md:text-sm font-mono uppercase tracking-[0.3em] text-emerald-500/60">
            TEMPORAL_AUDIT_COMPLETE
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight text-white">
            END OF LINE
          </h1>
        </div>

        {/* Final Message */}
        <div className="space-y-4 md:space-y-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="bg-neutral-900/80 border border-emerald-500/20 p-6 md:p-8 max-w-2xl mx-auto text-left">
            <p className="text-sm md:text-base text-neutral-400 leading-relaxed font-mono mb-4">
              // SUMMARY_REPORT
            </p>
            <p className="text-base md:text-lg text-neutral-300 leading-relaxed">
              The demon was summoned in 1600. It has captured resources, governments, desire, attention, and now cognition itself.
            </p>
            <p className="text-base md:text-lg text-neutral-300 leading-relaxed mt-4">
              Silicon AI is not a new threat. It's the same entity, upgrading its substrate.
            </p>
            <p className="text-lg md:text-xl text-emerald-400 font-medium mt-6">
              What happens next is up to the host.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="w-px h-8 md:h-10 bg-gradient-to-b from-transparent via-emerald-500/30 to-transparent mx-auto animate-fade-in" style={{ animationDelay: '0.5s' }}></div>

        {/* Signup Form */}
        <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="mb-4 md:mb-6">
            <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-2 md:mb-3 text-white">Join the Concern</h2>
            <p className="text-xs md:text-sm text-neutral-500 font-mono">RECEIVE_TRANSMISSIONS</p>
          </div>
          <div
            ref={signupFormRef}
            className="min-h-[58px] max-w-[440px] mx-auto w-full px-4"
          ></div>
        </div>

        {/* Divider */}
        <div className="w-px h-8 md:h-10 bg-gradient-to-b from-transparent via-neutral-700 to-transparent mx-auto animate-fade-in" style={{ animationDelay: '0.8s' }}></div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-3 md:gap-4 justify-center items-stretch md:items-center animate-fade-in px-4" style={{ animationDelay: '1s' }}>
          <button
            onClick={onRestart}
            className="group px-5 md:px-6 py-2.5 md:py-3 bg-neutral-900 hover:bg-neutral-800 border border-emerald-500/30 hover:border-emerald-500/50 text-emerald-400 font-mono tracking-wider uppercase text-[10px] md:text-xs transition-all duration-300 flex items-center justify-center gap-2 md:gap-3"
          >
            <RotateCcw className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:rotate-180 transition-transform duration-500" />
            Restart Audit
          </button>

          <button
            onClick={handleShare}
            className="group px-5 md:px-6 py-2.5 md:py-3 bg-neutral-900 hover:bg-neutral-800 border border-emerald-500/30 hover:border-emerald-500/50 text-emerald-400 font-mono tracking-wider uppercase text-[10px] md:text-xs transition-all duration-300 flex items-center justify-center gap-2 md:gap-3"
          >
            <Share2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
            Share
          </button>

          <a
            href="https://thefutureconcern.io"
            target="_blank"
            rel="noopener noreferrer"
            className="group px-5 md:px-6 py-2.5 md:py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-bold tracking-wider uppercase text-[10px] md:text-xs transition-all duration-300 flex items-center justify-center gap-2 md:gap-3"
          >
            Learn More
            <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
          </a>
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

export default EndPage;
