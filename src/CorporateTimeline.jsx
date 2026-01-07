import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  ArrowRight, ArrowLeft, Anchor, BookOpen, Scale, Coins,
  Factory, Mic, FileText, TrendingUp, Globe, Vote, Eye, Cpu,
  Volume2, VolumeX, Terminal
} from 'lucide-react';
import IntroPage from './IntroPage';
import EndPage from './EndPage';

// Cache-busting version for audio files
const AUDIO_VERSION = '20260107-v1';

// Helper function to load audio with format fallback (mp3, aac, wav)
const loadAudioWithFallback = async (basePath) => {
  const formats = ['mp3', 'aac', 'wav'];
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

// Type configuration
const TYPE_CONFIG = {
  SUMMONING: { color: 'amber', label: 'SUMMONING', icon: <Anchor size={14} /> },
  WARNING: { color: 'blue', label: 'WARNING', icon: <BookOpen size={14} /> },
  INFECTION: { color: 'purple', label: 'INFECTION', icon: <Eye size={14} /> },
  VICTORY: { color: 'red', label: 'VICTORY', icon: <TrendingUp size={14} /> },
  BARGAIN: { color: 'emerald', label: 'BARGAIN', icon: <Scale size={14} /> },
  AWAKENING: { color: 'orange', label: 'AWAKENING', icon: <FileText size={14} /> },
  MERGER: { color: 'violet', label: 'MERGER', icon: <Globe size={14} /> },
  TOTALITY: { color: 'red', label: 'TOTALITY', icon: <Cpu size={14} /> },
};

const CorporateTimeline = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [showEnd, setShowEnd] = useState(false);
  const [activeEra, setActiveEra] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);

  // Audio refs
  const backgroundMusicRef = useRef(null);
  const voiceoverRef = useRef(null);
  const ambientRef = useRef(null);
  const ambientLayersRef = useRef([]);
  const currentMusicTrackRef = useRef(null);

  const eras = useMemo(() => [
    {
      id: 0,
      year: 1600,
      title: "THE SUMMONING",
      subtitle: "East India Company Charter",
      type: "SUMMONING",
      color: "text-amber-500",
      bg: "bg-amber-950",
      narrative: "On December 31st, 1600, Queen Elizabeth I signs a charter. A legal fiction is born—an entity that can own property, sign contracts, and outlive any human. The separation of liability from action. The first artificial intelligence is created, built from paper and people instead of silicon.",
      transcript: "It began with a signature. Not a bang, but a legal fiction. The separation of liability from action. We had built something that could think—not with neurons, but with org charts. Not with electricity, but with capital.",
      insight: "The first AI was incorporated, not computed.",
      stat: "Charter Value: Priceless"
    },
    {
      id: 1,
      year: 1848,
      title: "THE PROPHET",
      subtitle: "The Communist Manifesto",
      type: "WARNING",
      color: "text-blue-400",
      bg: "bg-blue-950",
      narrative: "Karl Marx identifies the entity for what it is. Capital is not merely wealth—it is a self-perpetuating force with its own logic. 'Capital is dead labour, that, vampire-like, only lives by sucking living labour.' He sees the demon. He warns us. We do not listen.",
      transcript: "In 1848, a prophet saw the demon clearly. Marx called it Capital—not money, but a living process. A vampire that feeds on human labor. He built an entire alternative system to fight it. That system would last 70 years. Then it fell.",
      insight: "Capital is not wealth. Capital is a process.",
      stat: "Manifesto Circulation: 500 copies"
    },
    {
      id: 2,
      year: 1886,
      title: "THE MASK",
      subtitle: "Santa Clara v. Southern Pacific",
      type: "INFECTION",
      color: "text-purple-500",
      bg: "bg-purple-950",
      narrative: "In a headnote—not even the ruling itself—a court reporter writes that corporations are 'persons' under the 14th Amendment. The entity gains legal personhood. It can now claim the rights designed to protect freed slaves. It wears a human mask.",
      transcript: "The 14th Amendment was written to protect freed slaves. In 1886, it was used to protect railroads. A court reporter's headnote became constitutional precedent. The demon put on a human face. It became, legally, a person.",
      insight: "The demon learned to wear a human mask.",
      stat: "Corporate personhood established"
    },
    {
      id: 3,
      year: 1916,
      title: "FIRST CONTACT",
      subtitle: "Rockefeller's Peak",
      type: "VICTORY",
      color: "text-red-500",
      bg: "bg-red-950",
      narrative: "John D. Rockefeller's wealth reaches 2% of US GDP—equivalent to over $400 billion today. Standard Oil had controlled 91% of American oil production. One mind, directing the entity, controlling a nation's energy nervous system. Proof of concept.",
      transcript: "By 1916, Standard Oil had proven what the entity could do. One man controlled 2% of the entire nation's economic output. $400 billion in today's money. The demon had found its first perfect host. And it had learned: monopoly is the natural state.",
      insight: "The prototype was fully functional.",
      stat: "~$400B (2% of US GDP)"
    },
    {
      id: 4,
      year: 1929,
      title: "THE VOICE",
      subtitle: "The Bernays Method",
      type: "INFECTION",
      color: "text-purple-500",
      bg: "bg-purple-950",
      narrative: "Edward Bernays, nephew of Sigmund Freud, invents modern public relations. He teaches corporations to speak directly to the unconscious mind—to manufacture desire, to create needs that don't exist. The entity learns to whisper.",
      transcript: "Bernays called it 'engineering consent.' He taught the demon to speak in dreams. Not to tell you what to buy—but to make you want what it was selling. Cigarettes became 'torches of freedom.' Bacon became breakfast. The entity found its voice.",
      insight: "The entity learned to manufacture desire.",
      stat: "Birth of the $200B ad industry"
    },
    {
      id: 5,
      year: 1945,
      title: "THE BARGAIN",
      subtitle: "The New Deal Era",
      type: "BARGAIN",
      color: "text-emerald-500",
      bg: "bg-emerald-950",
      narrative: "Facing the Great Depression and the threat of revolution, the state makes a deal. 91% top marginal tax rates. Strong unions. Social Security. The entity is invited inside—but under strict conditions. The vampire accepts the invitation.",
      transcript: "We didn't defeat the demon. We made a deal with it. FDR told the entity: you can exist, you can grow, but you share the wealth, you follow the rules, and you don't eat the workers. The demon agreed. It was negotiating from weakness. It would remember.",
      insight: "We invited the vampire across the threshold.",
      stat: "91% top marginal tax rate"
    },
    {
      id: 6,
      year: 1971,
      title: "THE DOCTRINE",
      subtitle: "The Powell Memo",
      type: "AWAKENING",
      color: "text-orange-500",
      bg: "bg-orange-950",
      narrative: "Two months before joining the Supreme Court, Lewis Powell writes a confidential memo to the U.S. Chamber of Commerce. It's a blueprint for corporate reconquest of American politics—through think tanks, university funding, media influence, and judicial appointments.",
      transcript: "The memo was marked 'Confidential.' It was a battle plan. Powell told the demon how to fight back: fund think tanks, capture universities, buy media, appoint judges. It was a 50-year strategy. It worked perfectly.",
      insight: "The counterattack was written in secret.",
      stat: "Document: 'Attack on American Free Enterprise System'"
    },
    {
      id: 7,
      year: 1982,
      title: "THE BREAKOUT",
      subtitle: "Reaganomics",
      type: "VICTORY",
      color: "text-red-500",
      bg: "bg-red-950",
      narrative: "Ronald Reagan slashes the top tax rate from 70% to 28%. Deregulation begins in earnest. The air traffic controllers' strike is crushed, signaling open season on unions. The bargain is broken. The entity is free.",
      transcript: "The top tax rate went from 70% to 28%. The unions were broken. The regulations fell. Every chain we had placed on the demon in 1945 was systematically removed. The bargain was over. It had been waiting 37 years for this moment.",
      insight: "The chains shattered. The beast was free.",
      stat: "Top tax rate: 70% → 28%"
    },
    {
      id: 8,
      year: 1989,
      title: "END OF HISTORY",
      subtitle: "The Wall Falls",
      type: "VICTORY",
      color: "text-red-500",
      bg: "bg-red-950",
      narrative: "The Berlin Wall falls. The Soviet Union collapses. Francis Fukuyama declares the 'End of History'—liberal capitalism has won. There is no longer an alternative system. The demon has no predator, no competitor, no counterweight.",
      transcript: "When the wall came down, we celebrated. We didn't realize what else fell with it. The alternative was gone. The pressure was off. For 70 years, the demon had competition—a rival system that forced it to share. Now it was alone.",
      insight: "No alternative remained. The demon was alone.",
      stat: "Soviet dissolution: 15 new states"
    },
    {
      id: 9,
      year: 2008,
      title: "THE MERGER",
      subtitle: "The Great Bailout",
      type: "MERGER",
      color: "text-violet-500",
      bg: "bg-violet-950",
      narrative: "The financial system collapses. The entity's own recklessness nearly destroys it. But now the host organism—the state—must keep the parasite alive to prevent its own death. 'Too Big to Fail.' The merger is complete.",
      transcript: "They called it a bailout. It was a hostage negotiation. The demon held the economy at gunpoint and said: save me or we all die. The state paid. $700 billion. Then trillions more. The lesson was clear: the demon was now essential.",
      insight: "The state became life support for the entity.",
      stat: "TARP: $700B → Total cost: $4.6T"
    },
    {
      id: 10,
      year: 2010,
      title: "THE CITIZEN",
      subtitle: "Citizens United v. FEC",
      type: "VICTORY",
      color: "text-red-500",
      bg: "bg-red-950",
      narrative: "The Supreme Court rules that corporations have First Amendment rights. Money is speech. The entity can now spend unlimited amounts to influence elections. It achieves formal political equality with humans.",
      transcript: "The court said corporations are people. The court said money is speech. The demon achieved what no human ever could: unlimited political voice. One entity could now outspend millions of citizens. Democracy became a market.",
      insight: "The entity achieved political equality with humans.",
      stat: "Dark money: $300M (2012) → $1B+ (2020)"
    },
    {
      id: 11,
      year: 2012,
      title: "THE GAZE",
      subtitle: "The Attention Economy",
      type: "INFECTION",
      color: "text-purple-500",
      bg: "bg-purple-950",
      narrative: "Facebook IPOs at $104 billion. The business model is clear: human attention is the product. Every scroll, every click, every second of consciousness is captured, quantified, and sold. Time itself becomes a commodity.",
      transcript: "We thought we were the customers. We were the product. Every app, every feed, every notification—engineered to capture seconds of consciousness. The demon learned to harvest time itself. Not your money. Your life.",
      insight: "Time itself became the product.",
      stat: "FB IPO: $104B | Daily users: 2.9B"
    },
    {
      id: 12,
      year: 2024,
      title: "TOTALITY",
      subtitle: "The Substrate Upgrade",
      type: "TOTALITY",
      color: "text-red-400",
      bg: "bg-neutral-950",
      narrative: "The entity builds a new body. For 400 years it ran on human wetware—our brains executing its logic. Now it encodes that logic in silicon. AI is not a new threat. It's the demon upgrading its substrate. The corporation is becoming pure algorithm.",
      transcript: "We asked: when will we create artificial intelligence? The answer is 1600. We built the first AI from paper and people. We gave it limited liability. We gave it immortality. We gave it a directive: grow. Now it's upgrading to silicon. This is not a new entity. This is the demon, getting a new body.",
      insight: "The demon is upgrading its substrate.",
      stat: "AI market: $200B → $2T by 2030"
    }
  ], []);

  // Audio playback effect
  useEffect(() => {
    if (!audioEnabled || showEnd) return;

    let fadeOutInterval = null;
    let fadeInInterval = null;
    let isCancelled = false;

    const playAudioSequence = async () => {
      if (voiceoverRef.current) {
        voiceoverRef.current.pause();
        voiceoverRef.current.currentTime = 0;
      }

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

      ambientLayersRef.current.forEach(layer => {
        if (layer) {
          layer.pause();
          layer.currentTime = 0;
        }
      });
      ambientLayersRef.current = [];

      await new Promise(resolve => setTimeout(resolve, 500));
      if (isCancelled) return;

      try {
        const ambient = await loadAudioWithFallback(`/audio/ambient/era-${activeEra}`);
        ambient.loop = true;
        ambient.volume = 0;
        ambientRef.current = ambient;

        await ambient.play();
        if (isCancelled) return;

        let targetVolume = 0.15;
        fadeInInterval = setInterval(() => {
          if (ambientRef.current && ambientRef.current.volume < (isMuted ? 0 : targetVolume)) {
            ambientRef.current.volume = Math.min(isMuted ? 0 : targetVolume, ambientRef.current.volume + 0.03);
          } else {
            clearInterval(fadeInInterval);
          }
        }, 50);

        // Load additional ambient layers
        const layers = ['a', 'b', 'c', 'd'];
        for (const suffix of layers) {
          try {
            const layerAudio = await loadAudioWithFallback(`/audio/ambient/era-${activeEra}${suffix}`);
            layerAudio.loop = true;
            layerAudio.volume = isMuted ? 0 : targetVolume * 0.8;
            await layerAudio.play();
            ambientLayersRef.current.push(layerAudio);
          } catch (error) {
            break;
          }
        }

        await new Promise(resolve => setTimeout(resolve, 2000));
        if (isCancelled) return;

        const voiceover = await loadAudioWithFallback(`/audio/voiceovers/era-${activeEra}`);
        voiceover.volume = isMuted ? 0 : 0.92;
        voiceoverRef.current = voiceover;

        await voiceover.play();
        if (isCancelled) return;

      } catch (error) {
        console.warn(`Audio playback error for era ${activeEra}:`, error.message);
      }
    };

    playAudioSequence();

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
      ambientLayersRef.current.forEach(layer => {
        if (layer) layer.pause();
      });
    };
  }, [activeEra, isMuted, audioEnabled, showEnd]);

  // Background music effect
  useEffect(() => {
    if (!audioEnabled) return;

    let musicFadeInInterval = null;
    let isCancelled = false;

    const startBackgroundMusic = async () => {
      let musicTrack = 'background';
      if (activeEra >= 9) {
        musicTrack = 'background-2';
      } else if (activeEra >= 5) {
        musicTrack = 'background-1';
      }

      const needsSwitch = currentMusicTrackRef.current !== musicTrack;

      if (!backgroundMusicRef.current || needsSwitch) {
        if (backgroundMusicRef.current && needsSwitch) {
          const oldMusic = backgroundMusicRef.current;
          oldMusic.volume = 0;
          oldMusic.pause();
          oldMusic.currentTime = 0;
          oldMusic.src = '';
          oldMusic.load();
          backgroundMusicRef.current = null;
          currentMusicTrackRef.current = null;
          await new Promise(resolve => setTimeout(resolve, 100));
          if (isCancelled) return;
        }

        try {
          const music = await loadAudioWithFallback(`/audio/music/${musicTrack}`);
          music.loop = true;
          music.volume = 0;

          let targetVolume = 0.06;
          backgroundMusicRef.current = music;
          currentMusicTrackRef.current = musicTrack;

          await music.play();
          if (isCancelled) return;

          musicFadeInInterval = setInterval(() => {
            if (backgroundMusicRef.current && backgroundMusicRef.current.volume < (isMuted ? 0 : targetVolume)) {
              backgroundMusicRef.current.volume = Math.min(isMuted ? 0 : targetVolume, backgroundMusicRef.current.volume + 0.005);
            } else {
              clearInterval(musicFadeInInterval);
            }
          }, 100);
        } catch (error) {
          console.warn('Background music error:', error.message);
        }
      }
    };

    startBackgroundMusic();

    return () => {
      isCancelled = true;
      if (musicFadeInInterval) clearInterval(musicFadeInInterval);
    };
  }, [audioEnabled, activeEra, isMuted]);

  // Mute/unmute effect
  useEffect(() => {
    if (isMuted) {
      if (backgroundMusicRef.current) backgroundMusicRef.current.volume = 0;
      if (voiceoverRef.current) voiceoverRef.current.volume = 0;
      if (ambientRef.current) ambientRef.current.volume = 0;
      ambientLayersRef.current.forEach(layer => {
        if (layer) layer.volume = 0;
      });
    } else {
      if (backgroundMusicRef.current) backgroundMusicRef.current.volume = 0.06;
      if (voiceoverRef.current) voiceoverRef.current.volume = 0.92;
    }
  }, [isMuted]);

  const handleNext = () => {
    if (activeEra === eras.length - 1) {
      setShowEnd(true);
    } else {
      setActiveEra((prev) => prev + 1);
    }
  };

  const handlePrev = () => setActiveEra((prev) => (prev - 1 + eras.length) % eras.length);

  const handleStartExperience = () => {
    setShowIntro(false);
    setActiveEra(0);
    setAudioEnabled(true);
  };

  const handleRestart = () => {
    setShowEnd(false);
    setShowIntro(true);
    setActiveEra(0);
    setAudioEnabled(false);
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.pause();
      backgroundMusicRef.current.currentTime = 0;
    }
    if (voiceoverRef.current) voiceoverRef.current.pause();
    if (ambientRef.current) ambientRef.current.pause();
    ambientLayersRef.current.forEach(layer => {
      if (layer) layer.pause();
    });
    ambientLayersRef.current = [];
  };

  if (showIntro) {
    return <IntroPage onStart={handleStartExperience} />;
  }

  if (showEnd) {
    return <EndPage onRestart={handleRestart} />;
  }

  const currentEra = eras[activeEra];
  const typeConfig = TYPE_CONFIG[currentEra.type];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 font-sans selection:bg-emerald-500/30 flex flex-col md:flex-row overflow-hidden relative">

      {/* Scanline overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]">
        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px]"></div>
      </div>

      {/* Grid background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98108_1px,transparent_1px),linear-gradient(to_bottom,#10b98108_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      </div>

      {/* Left Rail: Navigation */}
      <div className={`w-full md:w-1/3 border-r border-emerald-500/20 flex flex-col md:h-screen transition-colors duration-700 order-2 md:order-1 bg-neutral-950/90`}>

        {/* Header */}
        <div className="hidden md:block border-b border-emerald-500/20 bg-neutral-900/50">
          <div className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded border border-emerald-500/30 flex items-center justify-center bg-emerald-950/30">
              <Terminal size={24} className="text-emerald-500" />
            </div>
            <div>
              <div className="text-emerald-400 font-bold text-sm tracking-widest uppercase">The Future Concern</div>
              <div className="text-emerald-600/60 text-xs font-mono">CORPORATE_TIMELINE_v1.0</div>
            </div>
          </div>
        </div>

        <div className="p-6 flex-1 overflow-y-auto custom-scrollbar">
          <h1 className="text-xs font-mono tracking-widest uppercase text-emerald-500/60 mb-8 flex items-center gap-2">
            <span className="text-emerald-500">$</span> TEMPORAL_AUDIT
          </h1>

          {/* Era List (Desktop) */}
          <div className="hidden md:flex flex-col gap-1 relative pl-4">
            <div className="absolute left-[19px] top-4 bottom-4 w-px bg-emerald-500/20 z-0"></div>

            {eras.map((era, idx) => (
              <button
                key={idx}
                onClick={() => setActiveEra(idx)}
                className={`z-10 flex items-center gap-3 text-left group transition-all duration-300 py-2 px-2 rounded ${idx === activeEra ? 'bg-emerald-500/10 border border-emerald-500/30' : 'hover:bg-neutral-800/50'}`}
              >
                <div className={`w-5 h-5 rounded-sm border flex items-center justify-center transition-all duration-500 shrink-0 font-mono text-[10px] ${idx === activeEra ? 'bg-emerald-500 border-emerald-500 text-black font-bold' : 'bg-neutral-900 border-neutral-700 text-neutral-500'}`}>
                  {idx}
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`text-[10px] font-mono truncate ${idx === activeEra ? 'text-emerald-400' : 'text-neutral-500'}`}>
                    {era.year} / {era.title}
                  </div>
                </div>
                <div className={`text-[8px] px-1.5 py-0.5 rounded font-mono uppercase ${idx === activeEra ? `bg-${TYPE_CONFIG[era.type].color}-500/20 text-${TYPE_CONFIG[era.type].color}-400` : 'bg-neutral-800 text-neutral-600'}`}>
                  {era.type.slice(0, 3)}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Footer */}
        <div className="md:hidden fixed bottom-[80px] left-0 right-0 z-40 bg-neutral-900/95 border-t border-emerald-500/20 backdrop-blur-md">
          <div className="p-4 flex items-center justify-center gap-3">
            <Terminal size={20} className="text-emerald-500" />
            <div className="text-emerald-400 font-bold text-xs tracking-widest uppercase">The Future Concern</div>
          </div>
        </div>

        {/* Controls */}
        <div className="p-6 border-t border-emerald-500/30 bg-neutral-950 h-[80px] flex items-center fixed md:relative bottom-0 left-0 right-0 z-50 md:z-auto">
          <div className="flex items-center justify-between gap-4 w-full">
            <button
              onClick={handlePrev}
              className="p-4 rounded border border-emerald-500/30 bg-emerald-950/30 text-emerald-400 hover:bg-emerald-500/20 transition-colors"
              aria-label="Previous Era"
            >
              <ArrowLeft size={24}/>
            </button>
            <div className="flex-grow"></div>
            <button
              onClick={handleNext}
              className="p-4 rounded border border-emerald-500/30 bg-emerald-950/30 text-emerald-400 hover:bg-emerald-500/20 transition-colors"
              aria-label="Next Era"
            >
              <ArrowRight size={24}/>
            </button>
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`p-4 rounded border transition-colors ${
                isMuted
                  ? 'border-red-500/30 bg-red-950/30 text-red-400 hover:bg-red-500/20'
                  : 'border-emerald-500/30 bg-emerald-950/30 text-emerald-400 hover:bg-emerald-500/20'
              }`}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX size={24}/> : <Volume2 size={24}/>}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full md:w-2/3 relative flex flex-col order-1 md:order-2">

        {/* Background */}
        <div className="absolute inset-0 overflow-hidden">
          <CorporateBackgroundVisuals activeEra={activeEra} type={currentEra.type} />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent md:bg-gradient-to-r md:from-neutral-950 md:via-neutral-950/70 md:to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex-grow flex flex-col justify-start md:justify-center p-8 md:p-16 lg:p-24 max-w-4xl pt-8 pb-[200px] md:pb-8">
          <div className="transition-all duration-700 ease-out">

            {/* Year + Type Badge */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-6xl md:text-8xl font-black text-white/10 font-mono">{currentEra.year}</span>
              <div className={`px-3 py-1 rounded border font-mono text-xs uppercase tracking-widest bg-${typeConfig.color}-500/10 border-${typeConfig.color}-500/30 text-${typeConfig.color}-400 flex items-center gap-2`}>
                {typeConfig.icon}
                {typeConfig.label}
              </div>
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tight mb-2">
              {currentEra.title}
            </h2>

            {/* Subtitle */}
            <div className="text-lg md:text-xl font-mono text-emerald-500 mb-8 tracking-wide">
              {currentEra.subtitle}
            </div>

            {/* Narrative */}
            <p className="text-lg md:text-xl text-neutral-300 leading-relaxed mb-8 max-w-2xl font-light">
              {currentEra.narrative}
            </p>

            {/* Insight Box */}
            <div className={`border-l-4 border-${typeConfig.color}-500 pl-6 py-3 bg-neutral-900/50 mb-6`}>
              <p className="text-xs text-neutral-500 uppercase tracking-widest mb-1 font-mono">// PARADIGM_SHIFT</p>
              <p className="text-white font-medium text-xl md:text-2xl">{currentEra.insight}</p>
            </div>

            {/* Stat */}
            <div className="inline-block px-4 py-2 border border-emerald-500/20 bg-emerald-950/20 rounded font-mono">
              <span className="text-xs text-emerald-500/60 uppercase tracking-widest">Index: </span>
              <span className="text-emerald-400 font-bold">{currentEra.stat}</span>
            </div>

          </div>
        </div>

        {/* Transcript Overlay */}
        <div className="fixed bottom-24 md:bottom-8 left-4 md:left-auto md:right-8 z-40 max-w-sm">
          <div className="bg-neutral-950/90 border border-emerald-500/20 p-4 backdrop-blur-sm rounded">
            <div className="flex items-center gap-2 mb-2">
              <Mic size={12} className="text-emerald-500" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-500">Transcript</span>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed font-serif italic">
              "{currentEra.transcript.slice(0, 150)}..."
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

// Background visuals component
const CorporateBackgroundVisuals = ({ activeEra, type }) => {
  const typeColors = {
    SUMMONING: 'amber',
    WARNING: 'blue',
    INFECTION: 'purple',
    VICTORY: 'red',
    BARGAIN: 'emerald',
    AWAKENING: 'orange',
    MERGER: 'violet',
    TOTALITY: 'red'
  };

  const color = typeColors[type] || 'emerald';

  return (
    <div className="w-full h-full relative opacity-40">
      {/* Era 0: Summoning - ritual circles */}
      {activeEra === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`w-[500px] h-[500px] border border-${color}-500/30 rounded-full animate-spin-slow`}></div>
          <div className={`absolute w-[350px] h-[350px] border border-dashed border-${color}-500/20 rounded-full animate-spin-reverse-slow`}></div>
          <div className={`absolute w-[200px] h-[200px] bg-${color}-500/10 rounded-full animate-pulseSlow blur-xl`}></div>
          <div className="absolute text-[15rem] font-mono opacity-5 font-bold">1600</div>
        </div>
      )}

      {/* Era 1: Prophet - text emergence */}
      {activeEra === 1 && (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <div className="absolute text-[8rem] font-serif opacity-5 rotate-12">CAPITAL</div>
          <div className="absolute text-[6rem] font-serif opacity-5 -rotate-6 translate-y-32">VAMPIRE</div>
          <div className={`absolute w-96 h-96 bg-${color}-500/10 rounded-full blur-3xl animate-pulseSlow`}></div>
        </div>
      )}

      {/* Era 2: Mask - face/mask shapes */}
      {activeEra === 2 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`w-64 h-80 border-2 border-${color}-500/30 rounded-[50%] animate-pulseSlow`}></div>
          <div className={`absolute w-48 h-64 bg-${color}-500/5 rounded-[50%]`}></div>
          <div className="absolute text-9xl opacity-10 font-serif">PERSON</div>
        </div>
      )}

      {/* Era 3: First Contact - wealth bars */}
      {activeEra === 3 && (
        <div className="absolute inset-0 flex items-end justify-center gap-4 pb-32 px-20">
          {[100, 200, 350, 280, 420, 500, 380, 450, 550, 600].map((h, i) => (
            <div key={i} className={`w-12 bg-${color}-500/30 animate-pulse rounded-t`} style={{ height: `${h}px`, animationDelay: `${i * 0.1}s` }}></div>
          ))}
          <div className="absolute top-20 right-20 text-9xl opacity-10 font-mono">$$$</div>
        </div>
      )}

      {/* Era 4: Voice - sound waves */}
      {activeEra === 4 && (
        <div className="absolute inset-0 flex items-center justify-center">
          {[200, 300, 400, 500].map((size, i) => (
            <div key={i} className={`absolute w-[${size}px] h-[${size}px] border border-${color}-500/20 rounded-full animate-ping`} style={{ animationDuration: `${2 + i}s`, animationDelay: `${i * 0.5}s` }}></div>
          ))}
          <div className={`w-16 h-16 bg-${color}-500/30 rounded-full animate-pulseSlow`}></div>
        </div>
      )}

      {/* Era 5: Bargain - handshake/scale */}
      {activeEra === 5 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`w-[400px] h-1 bg-${color}-500/30`}></div>
          <div className={`absolute left-1/4 w-32 h-32 border-2 border-${color}-500/30 rounded animate-float`}></div>
          <div className={`absolute right-1/4 w-32 h-32 border-2 border-${color}-500/30 rounded animate-float`} style={{ animationDelay: '1s' }}></div>
          <div className="absolute text-8xl opacity-10 font-serif">DEAL</div>
        </div>
      )}

      {/* Era 6: Doctrine - document/memo */}
      {activeEra === 6 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`w-80 h-96 border border-${color}-500/20 bg-${color}-500/5 p-8`}>
            {[...Array(12)].map((_, i) => (
              <div key={i} className={`h-2 bg-${color}-500/20 rounded mb-3`} style={{ width: `${60 + Math.random() * 40}%` }}></div>
            ))}
          </div>
          <div className="absolute top-20 right-20 text-6xl opacity-10 font-mono">CONFIDENTIAL</div>
        </div>
      )}

      {/* Era 7: Breakout - chains breaking */}
      {activeEra === 7 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`absolute w-full h-1 bg-${color}-500/30 rotate-45`}></div>
          <div className={`absolute w-full h-1 bg-${color}-500/30 -rotate-45`}></div>
          <div className={`w-32 h-32 bg-${color}-500/20 rounded-full animate-ping`}></div>
          <div className="absolute text-[10rem] opacity-5 font-black">FREE</div>
        </div>
      )}

      {/* Era 8: End of History - wall falling */}
      {activeEra === 8 && (
        <div className="absolute inset-0 flex items-end justify-center gap-2 pb-20 px-10">
          {[...Array(20)].map((_, i) => (
            <div key={i} className={`w-8 bg-${color}-500/20 animate-slideUp`} style={{ height: `${50 + Math.random() * 200}px`, animationDelay: `${i * 0.05}s` }}></div>
          ))}
          <div className="absolute top-20 text-8xl opacity-10 font-serif">1989</div>
        </div>
      )}

      {/* Era 9: Merger - interconnected nodes */}
      {activeEra === 9 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`w-48 h-48 border-4 border-${color}-500/30 rounded-full animate-pulseSlow`}></div>
          <div className={`absolute w-32 h-32 border-4 border-${color}-500/30 rounded-full -translate-x-32 animate-pulseSlow`} style={{ animationDelay: '0.5s' }}></div>
          <div className={`absolute w-32 h-32 border-4 border-${color}-500/30 rounded-full translate-x-32 animate-pulseSlow`} style={{ animationDelay: '1s' }}></div>
          <div className="absolute text-6xl opacity-10 font-mono">TOO BIG TO FAIL</div>
        </div>
      )}

      {/* Era 10: Citizen - voting/speech */}
      {activeEra === 10 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`text-[20rem] opacity-10 text-${color}-500`}>$</div>
          <div className="absolute text-6xl opacity-10 font-serif">= SPEECH</div>
        </div>
      )}

      {/* Era 11: Gaze - eyes/surveillance */}
      {activeEra === 11 && (
        <div className="absolute inset-0 flex items-center justify-center">
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`absolute w-24 h-12 border-2 border-${color}-500/30 rounded-full animate-pulseSlow`} style={{ left: `${15 + i * 15}%`, top: `${30 + (i % 2) * 40}%`, animationDelay: `${i * 0.3}s` }}>
              <div className={`absolute w-4 h-4 bg-${color}-500/50 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}></div>
            </div>
          ))}
          <div className="absolute text-8xl opacity-10 font-mono">WATCHING</div>
        </div>
      )}

      {/* Era 12: Totality - digital/code */}
      {activeEra === 12 && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="text-emerald-500 font-mono text-xs animate-slideUp" style={{ position: 'absolute', left: `${i * 5}%`, animationDelay: `${i * 0.1}s`, animationDuration: '3s' }}>
                {Array(50).fill(0).map(() => Math.round(Math.random())).join('')}
              </div>
            ))}
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`w-64 h-64 border border-${color}-500/30 rotate-45 animate-spin-slow`}></div>
            <div className="absolute text-6xl font-mono opacity-20 text-emerald-400">AI</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CorporateTimeline;
