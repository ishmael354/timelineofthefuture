import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  ArrowRight, ArrowLeft, Play, Pause, Anchor, Sun, Moon,
  Activity, Map, MessageSquare, Sprout, BookOpen, Scale,
  Flame, Coins, Orbit, Factory, Globe, Radar, Cpu, ScanFace,
  Volume2, VolumeX
} from 'lucide-react';
import IntroPage from './IntroPage';
import EndPage from './EndPage';

// Cache-busting version for audio files - update this to force refresh
const AUDIO_VERSION = '20251121-v12';

const FutureTimeline = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [showEnd, setShowEnd] = useState(false);
  const [activeEra, setActiveEra] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);

  // Audio refs
  const backgroundMusicRef = useRef(null);
  const voiceoverRef = useRef(null);
  const ambientRef = useRef(null);
  const currentMusicTrackRef = useRef(null); // Track which music is playing

  const eras = useMemo(() => [
    {
      id: 0,
      engine: "The Null State",
      engineIcon: <Anchor size={16} />,
      title: "The Eternal Now",
      epoch: "Pre-Life / 13.8 BYA",
      color: "text-gray-500",
      bg: "bg-gray-900",
      narrative: "In a lifeless universe, the 'Future' is a meaningless concept. Matter interacts only in the immediate present. A rock rolling down a hill does not anticipate the valley. Time is simply a sequence of collisions with zero expectation.",
      insight: "Time exists physically, but not conceptually."
    },
    {
      id: 1,
      engine: "The Chemical Engine",
      engineIcon: <Sun size={16} />,
      title: "The Circadian Loop",
      epoch: "First Life / 3.5 BYA",
      color: "text-yellow-400",
      bg: "bg-yellow-950",
      narrative: "The first invention of the future. Cyanobacteria evolve 'Circadian Rhythms'—chemical clocks that anticipate the sunrise. Even in the dark, they prepare for the light. This is the first time matter on Earth moves because of something that hasn't happened yet.",
      insight: "The Future is a chemical reaction."
    },
    {
      id: 2,
      engine: "The Tidal Engine",
      engineIcon: <Moon size={16} />,
      title: "The Pull of the Moon",
      epoch: "Intertidal Life / ~600 MYA",
      color: "text-blue-300",
      bg: "bg-blue-950",
      narrative: "Life expands its horizon from the Day to the Month. Marine organisms (corals, crabs) develop 'Circalunar Rhythms' to track the tides and moon phases. They anticipate high water for feeding and full moons for spawning weeks in advance.",
      insight: "The Future is a rhythm (29 Days)."
    },
    {
      id: 3,
      engine: "The Biological Engine",
      engineIcon: <Activity size={16} />,
      title: "The Calorie Gamble",
      epoch: "Cambrian Explosion / 541 MYA",
      color: "text-emerald-400",
      bg: "bg-emerald-950",
      narrative: "Brains evolve to manage movement. A predator predicts where prey *will be* to avoid wasting calories chasing where it *was*. The future shifts from a passive chemical clock to a split-second active simulation running inside a nervous system.",
      insight: "The Future is a target (Split-Second)."
    },
    {
      id: 4,
      engine: "The Ecological Engine",
      engineIcon: <Map size={16} />,
      title: "The Seasonal Map",
      epoch: "Complex Migration / ~200 MYA",
      color: "text-lime-400",
      bg: "bg-lime-950",
      narrative: "Life expands its horizon from 'seconds' to 'seasons'. Herds develop a collective memory of the past—where the water was last year—to navigate the future. They are not just reacting to the moment, but traversing a mental map of time and space.",
      insight: "The Future is a path (1 Year)."
    },
    {
      id: 5,
      engine: "The Semantic Engine",
      engineIcon: <MessageSquare size={16} />,
      title: "The Grammar of 'If'",
      epoch: "The Cognitive Revolution / 70,000 BCE",
      color: "text-cyan-400",
      bg: "bg-cyan-950",
      narrative: "Humans invent the 'Subjunctive Mood'—grammar that allows us to speak of things that do not exist. We can now plan a hunt for 'tomorrow' or fear a 'spirit' we never see. The future detaches from immediate sensory input and becomes a shared hallucination.",
      insight: "The Future is a story."
    },
    {
      id: 6,
      engine: "The Agrarian Engine",
      engineIcon: <Sprout size={16} />,
      title: "The Investment of Pain",
      epoch: "Agricultural Revolution / 10,000 BCE",
      color: "text-amber-400",
      bg: "bg-amber-950",
      narrative: "We stop chasing the future (hunting) and start planting it (farming). This is the invention of 'Delayed Gratification.' Humans accept the pain of labor *now* for a harvest *later*. The future becomes a contract: Work today, eat tomorrow.",
      insight: "The Future is a contract."
    },
    {
      id: 7,
      engine: "The Archival Engine",
      engineIcon: <BookOpen size={16} />,
      title: "The Frozen Past",
      epoch: "Invention of Writing / 3,400 BCE",
      color: "text-indigo-400",
      bg: "bg-indigo-950",
      narrative: "Writing stabilizes the past. Instead of myths that change every generation, we have records. By seeing a stable Past, we gain the audacity to calculate a stable Future. We begin charting astronomical cycles and tax harvests years in advance.",
      insight: "The Future is a schedule."
    },
    {
      id: 8,
      engine: "The Legal Engine",
      engineIcon: <Scale size={16} />,
      title: "The Binding Promise",
      epoch: "Code of Hammurabi / 1750 BCE",
      color: "text-rose-400",
      bg: "bg-rose-950",
      narrative: "Civilization requires more than just predicting the future; it requires *binding* it. We invent the 'Contract'—a tool that forces the future to happen. A promise ('I will pay you next month') becomes enforceable by the state. The future becomes an obligation.",
      insight: "The Future is an obligation."
    },
    {
      id: 9,
      engine: "The Mythic Engine",
      engineIcon: <Flame size={16} />,
      title: "The Judgment of Time",
      epoch: "Axial Age / 800 BCE",
      color: "text-orange-300",
      bg: "bg-orange-950",
      narrative: "Once we can farm and write, we start imagining the ultimate harvest—the End Times, the Golden Age, the Final Judgment. The future becomes morally loaded. It is no longer just what *will* happen, but what *should* happen.",
      insight: "The Future is a judgment."
    },
    {
      id: 10,
      engine: "The Risk Engine",
      engineIcon: <Coins size={16} />,
      title: "The Price of Tomorrow",
      epoch: "Joint-Stock Companies / 1602 AD",
      color: "text-green-400",
      bg: "bg-green-950",
      narrative: "With the Dutch East India Company, the future becomes a tradeable asset. We use probability and insurance to price the unknown. You can buy a 'share' of a future outcome without taking the voyage. Risk is distributed. The future becomes liquid capital.",
      insight: "The Future is equity."
    },
    {
      id: 11,
      engine: "The Deterministic Engine",
      engineIcon: <Orbit size={16} />,
      title: "The Clockwork Universe",
      epoch: "Scientific Revolution / 1687 AD",
      color: "text-violet-400",
      bg: "bg-violet-950",
      narrative: "Newtonian physics suggests the universe is a predictable machine. If we know the position of every atom, we can calculate the future perfectly. We begin to swap appeasing the future (ritual) for calculating it (science).",
      insight: "The Future is a formula."
    },
    {
      id: 12,
      engine: "The Industrial Engine",
      engineIcon: <Factory size={16} />,
      title: "The Break in the Circle",
      epoch: "Industrial Revolution / 1760 AD",
      color: "text-orange-400",
      bg: "bg-orange-950",
      narrative: "For thousands of years, life was cyclical. Suddenly, machines break the cycle. We realize our children's lives will be fundamentally different from ours. 'Progress' is invented. The future is no longer a repetition of the past; it is an upward line.",
      insight: "The Future is a project."
    },
    {
      id: 13,
      engine: "The Synchronization Engine",
      engineIcon: <Globe size={16} />,
      title: "The Standardized Grid",
      epoch: "Railroad Time / 1847 AD",
      color: "text-teal-400",
      bg: "bg-teal-950",
      narrative: "Trains travel faster than the sun. To prevent collisions, we abolish local solar time and invent 'Standard Time' and Time Zones. The future ceases to be a local phenomenon; it becomes a synchronized global grid that everyone must obey.",
      insight: "The Future is a coordinated grid."
    },
    {
      id: 14,
      engine: "The Strategic Engine",
      engineIcon: <Radar size={16} />,
      title: "The Scenario Planner",
      epoch: "Cold War Futurism / 1950s",
      color: "text-red-400",
      bg: "bg-red-950",
      narrative: "The RAND Corporation formalizes 'Future Studies.' Facing nuclear annihilation, we realize the future isn't just 'Progress'—it's a branching tree of probabilities. We use Game Theory and Scenario Planning to navigate the 'unthinkable.'",
      insight: "The Future is a branching probability."
    },
    {
      id: 15,
      engine: "The Computational Engine",
      engineIcon: <Cpu size={16} />,
      title: "The Simulated Oracle",
      epoch: "The Digital Age / Today",
      color: "text-fuchsia-400",
      bg: "bg-fuchsia-950",
      narrative: "We no longer just predict; we simulate. We model climate change 100 years out. We live in 'Pre-Traumatic Stress,' worrying about data models of futures that haven't happened. We inhabit the future mentally more than we inhabit the present physically.",
      insight: "The Future is a simulation."
    },
    {
      id: 16,
      engine: "The Algorithmic Engine",
      engineIcon: <ScanFace size={16} />,
      title: "The Predictive Feed",
      epoch: "The Algorithmic Era / Now",
      color: "text-pink-400",
      bg: "bg-pink-950",
      narrative: "The loop closes. In the Cambrian Era, biology evolved to predict the world. Now, the world (AI) has evolved to predict us. Algorithms know what we will want before we want it. The future is no longer open; it is curated, nudged, and served to us.",
      insight: "The Future is curated."
    }
  ], []);


  // Audio playback effect with proper sequencing
  useEffect(() => {
    if (!audioEnabled || showEnd) return; // Don't play audio until user enables it or if on end page

    let fadeOutInterval = null;
    let fadeInInterval = null;
    let isCancelled = false;

    const playAudioSequence = async () => {
      // Stop current voiceover
      if (voiceoverRef.current) {
        voiceoverRef.current.pause();
        voiceoverRef.current.currentTime = 0;
      }

      // Fade out and stop current ambient
      if (ambientRef.current) {
        const currentAmbient = ambientRef.current;
        fadeOutInterval = setInterval(() => {
          if (currentAmbient && currentAmbient.volume > 0.05) {
            currentAmbient.volume = Math.max(0, currentAmbient.volume - 0.1);
          } else {
            clearInterval(fadeOutInterval);
            currentAmbient.pause();
            currentAmbient.currentTime = 0;
          }
        }, 50);
      }

      // Wait a moment for fade out
      await new Promise(resolve => setTimeout(resolve, 500));
      if (isCancelled) return;

      try {
        // Step 1: Start ambient sound first
        const ambient = new Audio(`/timelineofthefuture/audio/ambient/era-${activeEra}.mp3?v=${AUDIO_VERSION}`);
        ambient.loop = true;
        ambient.volume = 0; // Start at 0 for fade-in

        // Era 3 (Biological Engine) starts at 10 seconds in and is louder
        if (activeEra === 3) {
          ambient.currentTime = 10;
        }
        // Era 4 (Ecological Engine) starts at 8 seconds in and is louder
        if (activeEra === 4) {
          ambient.currentTime = 8;
        }

        ambientRef.current = ambient;

        await ambient.play();
        if (isCancelled) return;
        console.log(`Playing ambient sound for era ${activeEra}`);

        // Fade in ambient - eras 3 and 4 are louder (0.3), era 5 is quieter (0.05), others 0.15
        let targetVolume = 0.15;
        if (activeEra === 3 || activeEra === 4) {
          targetVolume = 0.3;
        } else if (activeEra === 5) {
          targetVolume = 0.05;
        }
        fadeInInterval = setInterval(() => {
          if (ambientRef.current && ambientRef.current.volume < (isMuted ? 0 : targetVolume)) {
            ambientRef.current.volume = Math.min(isMuted ? 0 : targetVolume, ambientRef.current.volume + 0.03);
          } else {
            clearInterval(fadeInInterval);
          }
        }, 50);

        // Step 2: Wait 2 seconds, then play voiceover
        await new Promise(resolve => setTimeout(resolve, 2000));
        if (isCancelled) return;

        const voiceover = new Audio(`/timelineofthefuture/audio/voiceovers/era-${activeEra}.mp3?v=${AUDIO_VERSION}`);
        voiceover.volume = isMuted ? 0 : 0.92;
        voiceoverRef.current = voiceover;

        await voiceover.play();
        if (isCancelled) return;
        console.log(`Playing voiceover for era ${activeEra}`);

      } catch (error) {
        console.warn(`Audio playback error for era ${activeEra}:`, error.message);
      }
    };

    playAudioSequence();

    // Cleanup function
    return () => {
      isCancelled = true;
      if (fadeOutInterval) clearInterval(fadeOutInterval);
      if (fadeInInterval) clearInterval(fadeInInterval);
      if (voiceoverRef.current) {
        voiceoverRef.current.pause();
        voiceoverRef.current.currentTime = 0;
      }
      if (ambientRef.current) {
        ambientRef.current.pause();
      }
    };
  }, [activeEra, isMuted, audioEnabled, showEnd]);

  // Background music effect - starts when audio is enabled, switches at eras 5, 10, and 14
  useEffect(() => {
    if (!audioEnabled) return;

    let musicFadeInInterval = null;
    let isCancelled = false;

    const startOrSwitchBackgroundMusic = async () => {
      // Determine which music track to use based on era
      // background: eras 0-4 (start through Ecological)
      // background-1: eras 5-9 (Semantic through Mythic)
      // background-2: eras 10-13 (Risk through Synchronization)
      // background-3: eras 14-16 (Strategic/Game Theory through end)
      let musicTrack = 'background';
      if (activeEra >= 14) {
        musicTrack = 'background-3';
      } else if (activeEra >= 10) {
        musicTrack = 'background-2';
      } else if (activeEra >= 5) {
        musicTrack = 'background-1';
      }

      // Only start or switch if we don't have music playing OR we need to switch tracks
      const needsSwitch = currentMusicTrackRef.current !== musicTrack;

      if (!backgroundMusicRef.current || needsSwitch) {
        // Stop and clean up old music if it exists - do this SYNCHRONOUSLY
        if (backgroundMusicRef.current && needsSwitch) {
          const oldMusic = backgroundMusicRef.current;
          console.log(`Stopping old music track: ${currentMusicTrackRef.current}`);

          // IMMEDIATELY stop the old music
          oldMusic.volume = 0;
          oldMusic.pause();
          oldMusic.currentTime = 0;
          oldMusic.src = '';
          oldMusic.load();

          // Clear references immediately
          backgroundMusicRef.current = null;
          currentMusicTrackRef.current = null;

          // Short wait to let browser clean up
          await new Promise(resolve => setTimeout(resolve, 100));
          if (isCancelled) return;
        }

        // Start new music
        const musicPath = `/timelineofthefuture/audio/music/${musicTrack}.mp3?v=${AUDIO_VERSION}`;
        const music = new Audio(musicPath);
        music.loop = true;
        music.volume = 0; // Start at 0 for fade-in

        // Different volumes for different tracks
        // background-1 is 20% quieter than others
        const targetVolume = musicTrack === 'background-1' ? 0.04 : 0.05;

        // Set references BEFORE playing
        backgroundMusicRef.current = music;
        currentMusicTrackRef.current = musicTrack;
        console.log(`Starting new music track: ${musicTrack}`);

        await music.play().then(() => {
          if (isCancelled) return;
          console.log(`Background music (${musicTrack}.mp3) started successfully`);
          // Fade in
          musicFadeInInterval = setInterval(() => {
            if (backgroundMusicRef.current && backgroundMusicRef.current.volume < (isMuted ? 0 : targetVolume)) {
              backgroundMusicRef.current.volume = Math.min(isMuted ? 0 : targetVolume, backgroundMusicRef.current.volume + 0.005);
            } else {
              clearInterval(musicFadeInInterval);
            }
          }, 100);
        }).catch((error) => {
          if (!isCancelled) {
            console.warn('Background music error:', error.message);
          }
        });
      } else if (backgroundMusicRef.current.paused) {
        // Resume if paused
        backgroundMusicRef.current.play().catch((error) => {
          console.log('Background music playback error:', error.message);
        });
      }
    };

    startOrSwitchBackgroundMusic();

    // Cleanup function - stop music if effect re-runs
    return () => {
      isCancelled = true;
      if (musicFadeInInterval) clearInterval(musicFadeInInterval);
      // Don't stop music here - let the next effect handle the transition
    };
  }, [audioEnabled, activeEra, isMuted]);

  // Mute/unmute effect - handles muting all audio
  useEffect(() => {
    // Only mute/unmute existing audio - don't interfere with transitions
    if (isMuted) {
      if (backgroundMusicRef.current) backgroundMusicRef.current.volume = 0;
      if (voiceoverRef.current) voiceoverRef.current.volume = 0;
      if (ambientRef.current) ambientRef.current.volume = 0;
    } else {
      if (backgroundMusicRef.current) {
        // background-1 is 20% quieter
        const musicVolume = currentMusicTrackRef.current === 'background-1' ? 0.04 : 0.05;
        backgroundMusicRef.current.volume = musicVolume;
      }
      if (voiceoverRef.current) voiceoverRef.current.volume = 0.92;
      // Ambient volume is handled by main audio effect based on era
    }
  }, [isMuted]);

  // Memoized particle positions to prevent flickering on re-renders
  const particleMap = useMemo(() => {
    const generate = (count) => [...Array(count)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3,
      duration: Math.random() * 3 + 3 // Faster animations
    }));
    return {
      cosmos: generate(80), // More particles
      ocean: generate(40),
      migration: generate(60),
      sim: generate(50)
    };
  }, []);

  const handleNext = () => {
    if (activeEra === eras.length - 1) {
      // We're at the last era, show end page
      setShowEnd(true);
    } else {
      setActiveEra((prev) => prev + 1);
    }
  };

  const handlePrev = () => setActiveEra((prev) => (prev - 1 + eras.length) % eras.length);

  const handleStartExperience = () => {
    setShowIntro(false);
    setActiveEra(0); // Start at first era (The Eternal Now)
    setAudioEnabled(true);
  };

  const handleRestart = () => {
    setShowEnd(false);
    setShowIntro(true);
    setActiveEra(0);
    setAudioEnabled(false);
    // Stop all audio
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.pause();
      backgroundMusicRef.current.currentTime = 0;
    }
    if (voiceoverRef.current) {
      voiceoverRef.current.pause();
    }
    if (ambientRef.current) {
      ambientRef.current.pause();
    }
  };

  // Show intro page first
  if (showIntro) {
    return <IntroPage onStart={handleStartExperience} />;
  }

  // Show end page after last era
  if (showEnd) {
    return <EndPage onRestart={handleRestart} />;
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white/20 flex flex-col md:flex-row overflow-hidden relative">

      {/* Animated Wave Background Style */}
      <style>{`
        @keyframes wave-flow {
          0% { transform: translateX(0) translateY(0); }
          50% { transform: translateX(-25%) translateY(-5%); }
          100% { transform: translateX(0) translateY(0); }
        }
        .wave-animate { animation: wave-flow 8s ease-in-out infinite; }
      `}</style>

      {/* Left Rail: Navigation & Context */}
      <div className={`w-full md:w-1/3 border-r border-white/10 flex flex-col justify-between transition-colors duration-700 order-2 md:order-1 ${eras[activeEra].bg} bg-opacity-20`}>

        {/* Branded Header - Desktop only at top */}
        <div className="hidden md:block relative overflow-hidden border-b border-emerald-500/20 bg-gradient-to-br from-emerald-950/40 to-black">
          {/* Animated Wave Background */}
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full wave-animate" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M0,50 Q300,0 600,50 T1200,50 L1200,120 L0,120 Z" fill="url(#wave-gradient)" />
              <defs>
                <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#34d399" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.3" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Content */}
          <div className="relative z-10 p-6 flex items-center gap-4">
            <div className="w-16 h-16 rounded-full border-2 border-emerald-500/50 flex items-center justify-center bg-emerald-900/20 overflow-hidden flex-shrink-0">
              <img
                src="/timelineofthefuture/video/The Future Concern Logo.png"
                alt="The Future Concern"
                className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
              />
            </div>
            <div>
              <div className="text-emerald-400 font-bold text-sm tracking-wide">The Future Concern</div>
              <div className="text-emerald-600/80 text-xs">A framework for understanding tomorrow</div>
            </div>
          </div>
        </div>

        <div className="p-6 h-[calc(100vh-80px)] overflow-y-auto custom-scrollbar">
          <h1 className="text-xs font-bold tracking-[0.2em] uppercase text-white/40 mb-8 flex items-center gap-2 sticky top-0 bg-black/0 backdrop-blur-sm py-4 z-20">
            <Activity size={14} /> The History of the Future
          </h1>

          {/* Era List (Desktop) */}
          <div className="hidden md:flex flex-col gap-2 relative pl-4">
             {/* Connecting Line */}
            <div className="absolute left-[27px] top-4 bottom-4 w-px bg-white/10 z-0"></div>

            {eras.map((era, idx) => (
              <button
                key={idx}
                onClick={() => setActiveEra(idx)}
                className={`z-10 flex items-center gap-4 text-left group transition-all duration-300 py-2 ${idx === activeEra ? 'opacity-100 translate-x-2' : 'opacity-40 hover:opacity-70'}`}
              >
                <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-500 shrink-0 ${idx === activeEra ? `bg-black ${era.color} border-current scale-125 shadow-[0_0_10px_currentColor]` : 'bg-black border-white/20 text-transparent'}`}>
                  <span className="text-[9px] font-bold">{idx}</span>
                </div>
                <div>
                  <div className={`text-[10px] uppercase tracking-wider font-bold ${idx === activeEra ? era.color : 'text-white'}`}>{era.engine}</div>
                  <div className="text-[10px] text-white/40">{era.title}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Branded Footer - Mobile only */}
        <div className="md:hidden fixed bottom-[80px] left-0 right-0 z-40 bg-gradient-to-br from-emerald-950/90 to-black/95 border-t border-emerald-500/20 backdrop-blur-md">
          {/* Animated Wave Background */}
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full wave-animate" viewBox="0 0 1200 80" preserveAspectRatio="none">
              <path d="M0,40 Q300,10 600,40 T1200,40 L1200,80 L0,80 Z" fill="url(#wave-gradient-mobile)" />
              <defs>
                <linearGradient id="wave-gradient-mobile" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#34d399" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.3" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Content */}
          <div className="relative z-10 p-4 flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full border border-emerald-500/50 flex items-center justify-center bg-emerald-900/20 overflow-hidden flex-shrink-0">
              <img
                src="/timelineofthefuture/video/The Future Concern Logo.png"
                alt="The Future Concern"
                className="w-full h-full object-cover opacity-90"
              />
            </div>
            <div className="text-center">
              <div className="text-emerald-400 font-bold text-xs tracking-wide">The Future Concern</div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="p-6 border-t border-white/10 bg-black/95 backdrop-blur-md h-[80px] flex items-center fixed md:relative bottom-0 left-0 right-0 z-50 md:z-auto">
          <div className="flex items-center justify-between gap-4 w-full">
            <button
              onClick={handlePrev}
              className="p-4 rounded-full bg-white text-black hover:bg-gray-200 transition-colors shadow-xl font-bold"
              aria-label="Previous Era"
            >
              <ArrowLeft size={28}/>
            </button>
            {!audioEnabled && (
              <button
                onClick={() => setAudioEnabled(true)}
                className="flex-grow flex items-center justify-center gap-2 text-xs uppercase tracking-widest font-bold py-3 rounded-full transition-colors border bg-green-500/20 hover:bg-green-500/30 border-green-500/40 animate-pulse"
              >
                <Play size={14}/>
                START EXPERIENCE
              </button>
            )}
            {audioEnabled && (
              <div className="flex-grow"></div>
            )}
            <button
              onClick={handleNext}
              className="p-4 rounded-full bg-white text-black hover:bg-gray-200 transition-colors shadow-xl font-bold"
              aria-label="Next Era"
            >
              <ArrowRight size={28}/>
            </button>
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`p-4 rounded-full transition-colors shadow-xl font-bold ${
                isMuted
                  ? 'bg-red-500 hover:bg-red-400 text-white'
                  : 'bg-white/50 hover:bg-white/70 text-black border-2 border-white'
              }`}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX size={28}/> : <Volume2 size={28}/>}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content: The Narrative */}
      <div className="w-full md:w-2/3 relative flex flex-col order-1 md:order-2">

        {/* Abstract Background */}
        <div className="absolute inset-0 overflow-hidden">
           <BackgroundVisuals
             key={`bg-${activeEra}`}
             activeEra={activeEra}
             color={eras[activeEra].color}
             particles={particleMap}
           />
           <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent md:bg-gradient-to-r md:from-black md:via-black/50 md:to-transparent"></div>

           {/* Subtle Watermark */}
           <div className="absolute top-8 right-8 w-20 h-20 opacity-10 hover:opacity-20 transition-opacity duration-500 pointer-events-none">
             <img
               src="/timelineofthefuture/video/The Future Concern Logo.png"
               alt=""
               className="w-full h-full object-contain filter grayscale"
             />
           </div>
        </div>

        <div className="relative z-10 flex-grow flex flex-col justify-start md:justify-center p-8 md:p-24 max-w-4xl pt-8 pb-[160px] md:pb-8">
          <div className="transition-all duration-700 ease-out">
            {/* Engine Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 w-fit mb-4 transition-all duration-500">
              <span className={`${eras[activeEra].color} transition-colors duration-500`}>{eras[activeEra].engineIcon}</span>
              <span className={`text-xs font-mono uppercase tracking-wider ${eras[activeEra].color} transition-colors duration-500`}>
                {eras[activeEra].engine}
              </span>
            </div>

            {/* Title */}
            <h2 className="font-bold mb-4 leading-tight tracking-tight transition-all duration-500 text-4xl md:text-6xl lg:text-7xl md:min-h-[180px]">
              {eras[activeEra].title}
            </h2>

            {/* Epoch Badge */}
            <div className="mb-6 opacity-50 font-mono transition-all duration-500 text-sm border-l border-white/30 pl-3">
              {eras[activeEra].epoch}
            </div>

            {/* Narrative */}
            <p className="font-light leading-relaxed mb-8 transition-all duration-500 text-lg md:text-xl text-gray-300 max-w-2xl">
              {eras[activeEra].narrative}
            </p>

            {/* The "Insight" Box */}
            <div className={`${eras[activeEra].color.replace('text', 'border')} transition-all duration-500 border-l-4 pl-6 py-2`}>
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">The Paradigm Shift</p>
              <p className="text-white font-medium transition-all duration-500 text-xl md:text-2xl">{eras[activeEra].insight}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BackgroundVisuals = ({ activeEra, color, particles }) => {
  const shapeColor = color.replace('text-', 'bg-');
  const borderColor = color.replace('text-', 'border-');

  return (
    <div className="w-full h-full relative opacity-60 animate-fadeIn transition-opacity duration-1000">

      {/* 0. Void */}
      {activeEra === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
           <div className="w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulseSlow"></div>
           {particles.cosmos.map((p) => (
             <div
               key={`cosmos-${p.id}`}
               className="absolute w-2 h-2 bg-white/70 rounded-full animate-float shadow-lg"
               style={{
                 left: `${p.left}%`,
                 top: `${p.top}%`,
                 animationDelay: `${p.delay}s`,
                 boxShadow: '0 0 8px rgba(255,255,255,0.5)'
               }}
             />
           ))}
           <div className="absolute font-mono text-[20rem] opacity-20 font-bold select-none">0</div>
        </div>
      )}

      {/* 1. Chemical / Circadian */}
      {activeEra === 1 && (
        <div className="absolute inset-0">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className={`w-[500px] h-[500px] rounded-full border-2 border-dashed ${borderColor} opacity-50 animate-spin-slow`}></div>
           </div>
           <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 ${shapeColor} blur-3xl animate-pulse`}></div>
           <div className="absolute bottom-32 md:bottom-10 right-10 text-9xl opacity-30 font-serif">SUN</div>
        </div>
      )}

      {/* 2. Tidal / Lunar */}
      {activeEra === 2 && (
        <div className="absolute inset-0 overflow-hidden">
           <div className={`absolute bottom-0 w-full h-1/2 ${shapeColor} opacity-40 blur-3xl animate-pulseSlow`}></div>
           <div className="absolute top-1/4 right-1/4 w-40 h-40 rounded-full border-4 border-white/40 overflow-hidden">
              <div className="w-full h-full bg-white/30 rounded-full absolute -left-1/2 animate-pulse"></div>
           </div>
           <div className="absolute bottom-20 right-20 text-8xl opacity-30 font-serif tracking-widest">TIDE</div>
           {particles.ocean.map((p) => (
             <div
               key={`ocean-${p.id}`}
               className={`absolute w-3 h-3 ${shapeColor} rounded-full animate-float opacity-80`}
               style={{
                 left: `${p.left}%`,
                 top: `${p.top}%`,
                 animationDelay: `${p.delay}s`,
                 boxShadow: `0 0 10px currentColor`
               }}
             />
           ))}
        </div>
      )}

      {/* 3. Biological / Predator */}
      {activeEra === 3 && (
        <div className="absolute inset-0">
           <div className={`absolute w-8 h-8 ${shapeColor} top-1/3 left-1/4 rounded-full animate-ping`}></div>
           <div className={`absolute w-6 h-6 ${shapeColor} top-2/3 left-3/4 rounded-full animate-ping`} style={{animationDelay: '0.5s'}}></div>
           <svg className="absolute inset-0 w-full h-full">
              <line x1="25%" y1="33%" x2="75%" y2="66%" stroke="currentColor" strokeWidth="3" strokeDasharray="5,5" className={`opacity-60 animate-dash ${color.replace('text-', 'text-')}`} />
           </svg>
        </div>
      )}

      {/* 4. Ecological / Migration */}
      {activeEra === 4 && (
        <div className="absolute inset-0 overflow-hidden">
           {particles.migration.map((p) => (
             <div
               key={`migration-${p.id}`}
               className={`absolute w-3 h-3 ${shapeColor} rounded-full animate-migration opacity-90 shadow-lg`}
               style={{
                 left: '-20px',
                 top: `${p.top}%`,
                 animationDelay: `${p.id * 0.15}s`,
                 animationDuration: `${p.duration}s`,
                 boxShadow: '0 0 12px currentColor'
               }}
             />
           ))}
           <svg className="absolute inset-0 w-full h-full pointer-events-none">
             <path
               d="M-100,500 C200,400 400,600 800,300 S1200,400 1500,200"
               fill="none"
               stroke="currentColor"
               strokeWidth="4"
               className={`opacity-50 ${color.replace('text-', 'text-')}`}
               strokeDasharray="10,10"
             />
           </svg>
           <div className="absolute top-20 left-20 text-8xl opacity-30 font-serif tracking-widest">PATH</div>
        </div>
      )}

      {/* 5. Semantic / Speech */}
      {activeEra === 5 && (
        <div className="absolute inset-0 flex items-center justify-center">
           <div className="absolute text-9xl font-serif opacity-5 top-20 left-20">?</div>
           <div className="absolute text-9xl font-serif opacity-5 bottom-20 right-20">!</div>
           <div className={`w-[600px] h-[600px] border ${borderColor} rounded-full opacity-10 animate-pulse flex items-center justify-center`}>
              <div className={`w-[400px] h-[400px] border border-dashed ${borderColor} rounded-full animate-spin-reverse-slow`}></div>
           </div>
        </div>
      )}

      {/* 6. Agrarian / Seed */}
      {activeEra === 6 && (
        <div className="absolute inset-0 flex items-center justify-center">
           <div className={`absolute bottom-0 w-full h-1/3 ${shapeColor} opacity-30`}></div>
           <div className="relative flex flex-col items-center">
             <div className={`w-2 ${shapeColor} animate-grow`}></div>
             <div className={`absolute bottom-0 w-4 h-4 ${shapeColor} rounded-full`}></div>
           </div>
           <div className="absolute top-20 right-20 text-8xl opacity-10 font-serif">SEED</div>
           {[...Array(10)].map((_, i) => (
             <div key={`seed-${i}`} className={`absolute bottom-0 w-px h-32 ${shapeColor} opacity-30`} style={{left: i * 10 + '%'}}></div>
           ))}
        </div>
      )}

      {/* 7. Archival / Writing */}
      {activeEra === 7 && (
        <div className="absolute inset-0 flex flex-col justify-center gap-8 p-20 transform -skew-x-12 opacity-30">
            {[...Array(5)].map((_, i) => (
               <div key={`archive-${i}`} className={`h-2 w-full ${shapeColor} rounded-full`} style={{opacity: 1 - (i * 0.2)}}></div>
            ))}
             <div className="absolute right-20 bottom-20 text-9xl opacity-10 font-mono">REC</div>
        </div>
      )}

      {/* 8. Legal / Contracts */}
      {activeEra === 8 && (
        <div className="absolute inset-0 flex items-center justify-center">
           <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-4 p-20 opacity-30">
             {[...Array(16)].map((_, i) => (
                <div key={`legal-${i}`} className={`border border-white/20 flex items-center justify-center`}>
                  <div className={`w-2 h-2 ${shapeColor} rounded-sm`}></div>
                </div>
             ))}
           </div>
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className={`w-[500px] h-[500px] border-4 border-double ${borderColor} opacity-20`}></div>
           </div>
           <div className="absolute bottom-20 left-20 text-8xl opacity-10 font-serif">LAW</div>
        </div>
      )}

      {/* 9. Mythic / Judgment */}
      {activeEra === 9 && (
        <div className="absolute inset-0 flex items-center justify-center">
           <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(255,255,255,0.1)_0%,transparent_70%)] animate-pulseSlow`}></div>
           <div className={`absolute top-0 w-1 h-full ${shapeColor} opacity-20`}></div>
           <div className={`absolute top-1/3 w-64 h-64 border-t-2 border-b-2 ${borderColor} rounded-full animate-spin-slow opacity-30`}></div>
           <div className="absolute bottom-20 right-20 text-8xl opacity-10 font-serif">JUDGE</div>
        </div>
      )}

      {/* 10. Risk / Equity */}
      {activeEra === 10 && (
        <div className="absolute inset-0 flex items-center justify-center gap-1 opacity-30">
            {[20, 40, 30, 60, 50, 80, 90, 70, 100].map((h, i) => (
               <div key={`risk-${i}`} className={`w-8 ${shapeColor} transition-all duration-1000`} style={{height: h + '%'}}></div>
            ))}
            <div className="absolute top-20 right-20 text-8xl opacity-10 font-serif">RISK</div>
        </div>
      )}

      {/* 11. Deterministic / Physics */}
      {activeEra === 11 && (
        <div className="absolute inset-0 flex items-center justify-center">
           <div className={`w-[600px] h-[600px] border ${borderColor} rounded-full animate-spin-slow opacity-20`}></div>
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className={`w-[400px] h-[400px] border ${borderColor} rounded-full animate-spin-slow opacity-20`} style={{animationDuration: '15s'}}></div>
           </div>
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className={`w-[200px] h-[200px] border ${borderColor} rounded-full animate-spin-slow opacity-20`} style={{animationDuration: '5s'}}></div>
           </div>
           <div className="absolute w-full h-px bg-white/10 rotate-45"></div>
           <div className="absolute w-full h-px bg-white/10 -rotate-45"></div>
        </div>
      )}

      {/* 12. Industrial / Progress */}
      {activeEra === 12 && (
        <div className="absolute inset-0 flex items-end">
           <div className={`w-full h-1/2 ${shapeColor} opacity-20`}></div>
           <svg className="absolute inset-0 w-full h-full">
              <path d="M0,600 Q400,550 600,400 T1200,100" fill="none" stroke="currentColor" strokeWidth="2" className={`${color.replace('text-', 'text-')} opacity-30`} />
           </svg>
           <div className="absolute right-20 top-20 text-9xl opacity-10 font-bold">+</div>
        </div>
      )}

      {/* 13. Synchronization / Railroads */}
      {activeEra === 13 && (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
           <div className="absolute inset-0 grid grid-cols-6 grid-rows-1 opacity-20">
             {[...Array(6)].map((_, i) => (
               <div key={`sync-${i}`} className={`border-r ${borderColor} flex items-center justify-center`}>
                 <div className={`w-1 h-full ${shapeColor} opacity-50 animate-pulse`} style={{animationDelay: `${i * 0.2}s`}}></div>
               </div>
             ))}
           </div>
           <div className="absolute w-[150%] h-1 bg-white/20 rotate-12"></div>
           <div className="absolute w-[150%] h-1 bg-white/20 -rotate-12"></div>
           <div className="text-[10rem] font-mono opacity-5 tracking-tighter">00:00</div>
        </div>
      )}

      {/* 14. Strategic / Cold War */}
      {activeEra === 14 && (
        <div className="absolute inset-0 flex items-center justify-center">
           <div className={`w-[600px] h-[600px] border border-white/10 rounded-full flex items-center justify-center relative overflow-hidden`}>
             <div className={`absolute inset-0 opacity-20 animate-spin-slow`} style={{
               background: `conic-gradient(from 0deg, transparent 0deg 300deg, ${color.includes('red') ? '#f87171' : '#ffffff'} 360deg)`
             }}></div>
             <div className="grid grid-cols-2 gap-20 opacity-30">
               <div className={`w-4 h-4 ${shapeColor} rounded-full`}></div>
               <div className={`w-4 h-4 ${shapeColor} rounded-full`}></div>
               <div className={`w-4 h-4 ${shapeColor} rounded-full`}></div>
               <div className={`w-4 h-4 ${shapeColor} rounded-full`}></div>
             </div>
           </div>
           <div className="absolute top-20 right-20 text-8xl opacity-10 font-mono">DEFCON</div>
        </div>
      )}

      {/* 15. Computational / Sim */}
      {activeEra === 15 && (
        <div className="absolute inset-0 overflow-hidden">
           {particles.sim.map((p) => (
             <div
               key={`sim-${p.id}`}
               className={`absolute w-2 h-2 bg-white/70 rounded-full animate-float shadow-lg`}
               style={{
                 left: `${p.left}%`,
                 top: `${p.top}%`,
                 animationDelay: `${p.delay}s`,
                 boxShadow: '0 0 8px rgba(255,255,255,0.6)'
               }}
             />
           ))}
           <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_0%,rgba(255,255,255,0.15)_50%,transparent_100%)] bg-[length:100%_4px] animate-scan"></div>
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-[600px] h-[600px] border-[200px] border-white/20 rounded-full animate-pulseSlow"></div>
           </div>
        </div>
      )}

      {/* 16. Algorithmic / Feed */}
      {activeEra === 16 && (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 flex flex-col gap-2 p-10 opacity-30">
            {[...Array(10)].map((_, i) => (
              <div key={`feed-${i}`} className={`w-full h-32 border ${borderColor} rounded-xl flex items-center p-4 gap-4 animate-slideUp`} style={{animationDelay: `${i * 0.1}s`}}>
                <div className={`w-12 h-12 rounded-full bg-white/10`}></div>
                <div className="flex-grow space-y-2">
                  <div className="h-2 w-3/4 bg-white/10 rounded"></div>
                  <div className="h-2 w-1/2 bg-white/10 rounded"></div>
                </div>
              </div>
            ))}
          </div>
          <div className="absolute text-9xl font-bold opacity-10 select-none">NEXT</div>
          <div className="absolute w-32 h-32 border-4 border-white/20 rounded-full flex items-center justify-center animate-pulse">
            <div className={`w-4 h-4 ${shapeColor} rounded-full`}></div>
          </div>
        </div>
      )}

    </div>
  );
};

export default FutureTimeline;
