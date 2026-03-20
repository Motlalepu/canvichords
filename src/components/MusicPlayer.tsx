import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";

const tracks = [
  { 
    id: 1,
    title: "Darego",
    artist: "Azlink ft Gudhee",
    duration: "2:27",
    src: "/songs/AZLINK X GUDHEE - DAREGO (MM SIQESTSOUND).mp3",
  },
  {
    id: 2,
    title: "Heaven Hi",
    artist: "Nikosi",
    duration: "2:17",
    src: "/songs/Heaven Hi - Nikosi.mp3",
  },
  { 
    id: 3,
    title: "My life",
    artist: "Louie X",
    duration: "4:46",
    src: "/songs/My life - Louie X.mp3",
  },
  {
    id: 4,
    title: "Element",
    artist:
      "RA I, Big Belly Bufu, Initialed Endee, Swanker Teyise, Slim Dojeur, MC LA",
    duration: "6:28",
    src: "/songs/ELEMENT Ft RA I,Big Belly Bufu, Initialed Endee, Swanker Teyise, Slim Dojeur, MC LA [_J4ypHifmhI].mp3",
  },
  {
    id: 5,
    title: "Pemi",
    artist: "Azlink",
    duration: "3:13",
    src: "/songs/PEMI AZLINK .mp3",
  },
  {
    id: 6,
    title: "Nomba",
    artist: "Louie X ft Misfit",
    duration: "3:51",
    src: "/songs/LOUIE X FEAT MISFIT @SHANI NOMBA [ez-epY4Oyhs].mp3",
  },
  {
    id: 7,
    title: "Xam",
    artist: "Ra I",
    duration: "3:10",
    src: "/songs/RA I - XAM .mp3",
  },
];

const MusicPlayer = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [progress, setProgress] = useState([0]);
  const [volume, setVolume] = useState([70]);

  // 🔁 Handle play / pause
  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  // 🔁 Handle next / previous
  const handlePrevious = () => {
    setCurrentTrack((prev) => (prev > 0 ? prev - 1 : tracks.length - 1));
  };

  const handleNext = () => {
    setCurrentTrack((prev) => (prev < tracks.length - 1 ? prev + 1 : 0));
  };

  // 🔁 Update progress as song plays
  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio && audio.duration) {
      const current = (audio.currentTime / audio.duration) * 100;
      setProgress([current]);
    }
  };

  // 🔁 Seek
  const handleSeek = (value) => {
    const audio = audioRef.current;
    if (audio && audio.duration) {
      const time = (value[0] / 100) * audio.duration;
      audio.currentTime = time;
      setProgress(value);
    }
  };

  // 🔁 Auto play next song
  const handleEnded = () => {
    handleNext();
  };

  // 🔁 Change track when user skips
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = tracks[currentTrack].src;
    audio.load();

    if (isPlaying) {
      audio.play();
    }
  }, [currentTrack]);

  // 🔁 Volume control
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume[0] / 100;
    }
  }, [volume]);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border backdrop-blur-lg">
      {/* 🎵 Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={tracks[currentTrack].src}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />

      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center gap-6">

          {/* 🎶 Track Info */}
          <div className="flex-1 min-w-0">
            <div className="font-bold text-sm uppercase tracking-wide truncate">
              {tracks[currentTrack].title}
            </div>
            <div className="text-xs text-muted-foreground truncate">
              {tracks[currentTrack].artist}
            </div>
          </div>

          {/* ⏯️ Controls */}
          <div className="flex items-center gap-4">
            <button onClick={handlePrevious} className="p-2 hover:bg-secondary transition-smooth">
              <SkipBack className="w-5 h-5" />
            </button>

            <button
              onClick={togglePlayPause}
              className="p-3 bg-primary text-primary-foreground hover:opacity-90 transition-smooth rounded-full"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5" fill="currentColor" />
              ) : (
                <Play className="w-5 h-5" fill="currentColor" />
              )}
            </button>

            <button onClick={handleNext} className="p-2 hover:bg-secondary transition-smooth">
              <SkipForward className="w-5 h-5" />
            </button>
          </div>

          {/* 📈 Progress Bar */}
          <div className="hidden md:flex flex-1 items-center gap-3">
            <Slider
              value={progress}
              onValueChange={handleSeek}
              max={100}
              step={0.1}
              className="flex-1"
            />
            <span className="text-xs text-muted-foreground min-w-[40px]">
              {tracks[currentTrack].duration}
            </span>
          </div>

          {/* 🔊 Volume Control */}
          <div className="hidden lg:flex items-center gap-2 w-32">
            <Volume2 className="w-4 h-4 text-muted-foreground" />
            <Slider value={volume} onValueChange={setVolume} max={100} step={1} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
