import React, { useEffect, useRef, useState } from 'react';
import { RotateCcw, Share2, ArrowRight } from 'lucide-react';

// Cache-busting version for video - update to force refresh
const VIDEO_VERSION = '20251121-v3';

const EndPage = ({ onRestart }) => {
  const videoRef = useRef(null);
  const [videoEnded, setVideoEnded] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      // Video plays silently - background music from timeline continues
      videoRef.current.play().catch(error => {
        console.log('Video autoplay blocked:', error);
      });
    }
  }, []);

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

  const handleJoin = () => {
    window.open('https://thefutureconcern.io', '_blank');
  };

  return (
    <div className="relative w-full h-screen bg-black text-white overflow-hidden font-sans flex flex-col items-center justify-center">

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>

      {/* Animated video logo */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <video
          ref={videoRef}
          src={`/timelineofthefuture/video/logo.mp4?v=${VIDEO_VERSION}`}
          muted={true}
          playsInline
          onEnded={handleVideoEnded}
          className="max-w-md w-full"
        />
      </div>

      {/* Content */}
      <div className={`relative z-20 max-w-3xl px-6 text-center space-y-12 transition-all duration-1000 ${
        videoEnded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>

        {/* Logo/Title */}
        <div className="space-y-6">
          <div className="flex items-center justify-center mb-4">
            <div className="w-24 h-24 rounded-full border-2 border-emerald-500/50 flex items-center justify-center bg-emerald-900/20 overflow-hidden">
              <img
                src="/timelineofthefuture/video/The Future Concern Logo.png"
                alt="The Future Concern"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none">
            The Future Concern
          </h1>
          <p className="text-emerald-400 text-sm md:text-base tracking-widest uppercase">
            Presents: The History of the Future
          </p>
        </div>

        {/* Mission Statement */}
        <div className="space-y-6">
          <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed max-w-2xl mx-auto">
            The Future Concern maps how humans imagine tomorrow—
            and how those imaginations loop back to shape what we build, buy, fear, and fight for.
          </p>
          <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed max-w-2xl mx-auto">
            We dig through history, media, and technology to expose the futures we're being sold
            and to help design better ones.
          </p>
          <a
            href="https://thefutureconcern.io"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-emerald-400 hover:text-emerald-300 text-sm font-medium underline transition-colors"
          >
            Learn more at thefutureconcern.io
          </a>
        </div>

        {/* Divider */}
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent mx-auto"></div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center pt-8">
          <button
            onClick={onRestart}
            className="group relative px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold tracking-wider uppercase text-sm transition-all duration-300 flex items-center gap-3 rounded-full"
          >
            <RotateCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
            Restart Experience
          </button>

          <button
            onClick={handleShare}
            className="group relative px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold tracking-wider uppercase text-sm transition-all duration-300 flex items-center gap-3 rounded-full"
          >
            <Share2 className="w-4 h-4" />
            Share
          </button>

          <button
            onClick={handleJoin}
            className="group relative px-6 py-3 bg-green-500 hover:bg-green-400 text-black font-bold tracking-wider uppercase text-sm transition-all duration-300 flex items-center gap-3 rounded-full"
          >
            Join the Concern
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>

    </div>
  );
};

export default EndPage;
