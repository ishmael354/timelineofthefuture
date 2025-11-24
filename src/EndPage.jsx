import React, { useEffect, useRef, useState } from 'react';
import { RotateCcw, Share2, ArrowRight } from 'lucide-react';

// Cache-busting version for video - update to force refresh
const VIDEO_VERSION = '20251121-v3';

const EndPage = ({ onRestart }) => {
  const videoRef = useRef(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const signupFormRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      // Reduced video volume by 50%
      videoRef.current.volume = 0.3;
      videoRef.current.play().catch(error => {
        console.log('Video autoplay blocked:', error);
      });
    }
  }, []);

  // Load Ghost signup form script when video ends
  useEffect(() => {
    if (videoEnded && signupFormRef.current) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/ghost/signup-form@~0.3/umd/signup-form.min.js';
      script.setAttribute('data-button-color', '#279f2d');
      script.setAttribute('data-button-text-color', '#FFFFFF');
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
        title: 'The History of the Future',
        text: 'Explore how humans invented "The Future" - an interactive timeline from The Future Concern',
        url: window.location.href
      }).catch(err => console.log('Share failed:', err));
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-black text-white overflow-y-auto font-sans flex flex-col items-center justify-center py-12">

      {/* Custom animations */}
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

      {/* Premium background: Grid + Gradients */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black z-10"></div>
        <div className="w-[200%] h-[200%] -ml-[50%] -mt-[50%] bg-[linear-gradient(transparent_0%,rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,transparent_0%,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[length:40px_40px] animate-grid origin-bottom"></div>
      </div>

      {/* Radial glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] animate-glow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] animate-glow" style={{ animationDelay: '2s' }}></div>

      {/* Animated video logo - appears during video playback */}
      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${videoEnded ? 'opacity-0' : 'opacity-30'}`}>
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
      <div className={`relative z-20 max-w-3xl px-6 text-center space-y-8 md:space-y-10 transition-all duration-1000 ${
        videoEnded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>

        {/* Logo/Title */}
        <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0s' }}>
          <div className="flex items-center justify-center mb-4">
            <div className="relative w-24 h-24 rounded-full border-2 border-emerald-500/50 flex items-center justify-center bg-emerald-900/20 overflow-hidden shadow-[0_0_40px_rgba(16,185,129,0.3)]">
              <img
                src="/video/The Future Concern Logo.png"
                alt="The Future Concern"
                className="w-full h-full object-cover"
              />
              {/* Glow effect */}
              <div className="absolute inset-0 bg-emerald-500/10 blur-xl rounded-full"></div>
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
            The Future Concern
          </h1>
          <p className="text-emerald-400 text-xs md:text-sm tracking-[0.3em] uppercase">
            Presents: The History of the Future
          </p>
        </div>

        {/* Mission Statement */}
        <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <p className="text-base md:text-lg text-gray-300 font-light leading-relaxed max-w-2xl mx-auto">
            The Future Concern maps how humans imagine tomorrow—
            and how those imaginations loop back to shape what we build, buy, fear, and fight for.
          </p>
          <p className="text-base md:text-lg text-gray-300 font-light leading-relaxed max-w-2xl mx-auto">
            We dig through history, media, and technology to expose the futures we're being sold
            and to help design better ones.
          </p>
        </div>

        {/* Divider */}
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-emerald-500/30 to-transparent mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}></div>

        {/* Signup Form */}
        <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">Join the Concern</h2>
            <p className="text-sm md:text-base text-gray-400">Get updates on new projects and insights</p>
          </div>
          <div
            ref={signupFormRef}
            className="min-h-[58px] max-w-[440px] mx-auto w-full"
          ></div>
        </div>

        {/* Divider */}
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/20 to-transparent mx-auto animate-fade-in" style={{ animationDelay: '0.8s' }}></div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center animate-fade-in" style={{ animationDelay: '1s' }}>
          <button
            onClick={onRestart}
            className="group relative px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-white font-bold tracking-wider uppercase text-xs transition-all duration-300 flex items-center gap-3 rounded-full shadow-lg hover:shadow-white/20"
          >
            <RotateCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
            Restart Experience
          </button>

          <button
            onClick={handleShare}
            className="group relative px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-white font-bold tracking-wider uppercase text-xs transition-all duration-300 flex items-center gap-3 rounded-full shadow-lg hover:shadow-white/20"
          >
            <Share2 className="w-4 h-4" />
            Share
          </button>

          <a
            href="https://thefutureconcern.io"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-bold tracking-wider uppercase text-xs transition-all duration-300 flex items-center gap-3 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)]"
          >
            Learn More
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

      </div>

    </div>
  );
};

export default EndPage;
