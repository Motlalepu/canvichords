import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  ChevronLeft, 
  ChevronRight, 
  X,
  Instagram,
  Youtube,
  Music,
  Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { artists, Artist } from "@/data/artists";
import { useAudioContext } from "@/contexts/AudioContext";
import { cn } from "@/lib/utils";

const ListeningRoom = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { muteGlobalAudio, unmuteGlobalAudio } = useAudioContext();

  const currentArtist: Artist = artists[currentIndex];

  // Mute global audio on mount, restore on unmount
  useEffect(() => {
    muteGlobalAudio();
    return () => unmuteGlobalAudio();
  }, [muteGlobalAudio, unmuteGlobalAudio]);

  // Handle audio time updates
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setProgress(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentIndex]);

  // Sync volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Play/pause control
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Sync video with playback state
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    // Sync volume
    video.volume = isMuted ? 0 : volume;
    
    if (isPlaying) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isPlaying, currentIndex, volume, isMuted]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleMute = () => setIsMuted(!isMuted);

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    if (value[0] > 0) setIsMuted(false);
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setProgress(value[0]);
    }
  };

  const changeArtist = useCallback((direction: "next" | "prev") => {
    setIsTransitioning(true);
    setIsPlaying(false);
    
    setTimeout(() => {
      if (direction === "next") {
        setCurrentIndex((prev) => (prev + 1) % artists.length);
      } else {
        setCurrentIndex((prev) => (prev - 1 + artists.length) % artists.length);
      }
      setProgress(0);
      
      setTimeout(() => {
        setIsTransitioning(false);
      }, 100);
    }, 300);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case " ":
          e.preventDefault();
          togglePlay();
          break;
        case "ArrowLeft":
          changeArtist("prev");
          break;
        case "ArrowRight":
          changeArtist("next");
          break;
        case "m":
        case "M":
          toggleMute();
          break;
        case "Escape":
          // Exit is handled by Link
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [changeArtist, isPlaying]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getLinkIcon = (type: string) => {
    switch (type) {
      case "instagram": 
        return <Instagram className="h-4 w-4 text-pink-500 hover:text-pink-400" />;
      case "youtube": 
        return <Youtube className="h-4 w-4 text-red-600 hover:text-red-500" />;
      case "spotify": 
        return <Music className="h-4 w-4 text-green-500 hover:text-green-400" />;
      default: 
        return <Globe className="h-4 w-4 text-blue-500 hover:text-blue-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-listening-room overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-listening-room via-listening-room/95 to-listening-room" />

      {/* Subtle grain texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Exit button */}
      <Link
        to="/"
        className="absolute top-6 right-6 p-3 rounded-full bg-listening-card/50 backdrop-blur-sm border border-listening-border hover:bg-listening-card transition-colors duration-300 z-20"
        aria-label="Exit Listening Room"
      >
        <X className="h-5 w-5 text-listening-foreground/70" />
      </Link>

      {/* Navigation arrows */}
      <button
        onClick={() => changeArtist("prev")}
        className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-listening-card/50 backdrop-blur-sm border border-listening-border hover:bg-listening-card transition-colors duration-300 z-20"
        aria-label="Previous artist"
      >
        <ChevronLeft className="h-6 w-6 text-listening-foreground/70" />
      </button>

      <button
        onClick={() => changeArtist("next")}
        className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-listening-card/50 backdrop-blur-sm border border-listening-border hover:bg-listening-card transition-colors duration-300 z-20"
        aria-label="Next artist"
      >
        <ChevronRight className="h-6 w-6 text-listening-foreground/70" />
      </button>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12">
        {/* Artist card */}
        <div 
          className={cn(
            "w-full max-w-lg bg-listening-card/80 backdrop-blur-md rounded-3xl border border-listening-border shadow-2xl p-8 md:p-10 transition-all duration-500",
            isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
          )}
        >
          {/* Artist info */}
          <div className="text-center mb-8">
            <h1 className="font-serif text-2xl md:text-3xl font-light tracking-wide text-listening-foreground mb-2">
              {currentArtist.name}
            </h1>
            <p className="text-lg text-listening-accent font-light mb-4">
              {currentArtist.trackTitle}
            </p>
            <p className="text-sm text-listening-muted font-sans leading-relaxed max-w-sm mx-auto">
              {currentArtist.bio}
            </p>
          </div>

          {/* Video frame (if available) */}
          {currentArtist.video && (
            <div className="aspect-video bg-listening-room/50 rounded-xl overflow-hidden mb-8 border border-listening-border">
              <video
                ref={videoRef}
                src={currentArtist.video}
                className="w-full h-full object-cover"
                loop
                playsInline
                muted
              />
            </div>
          )}

          {/* Progress bar */}
          <div className="mb-6">
            <Slider
              value={[progress]}
              max={duration || 100}
              step={0.1}
              onValueChange={handleSeek}
              className="cursor-pointer [&_[role=slider]]:bg-listening-accent [&_[role=slider]]:border-0 [&_[role=slider]]:h-3 [&_[role=slider]]:w-3 [&_.bg-primary]:bg-listening-accent"
            />
            <div className="flex justify-between mt-2 text-xs text-listening-muted font-mono">
              <span>{formatTime(progress)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6">
            {/* Volume */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleMute}
                className="p-2 rounded-full hover:bg-listening-border/50 transition-colors"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="h-5 w-5 text-listening-muted" />
                ) : (
                  <Volume2 className="h-5 w-5 text-listening-foreground/70" />
                )}
              </button>
              <Slider
                value={[isMuted ? 0 : volume]}
                max={1}
                step={0.01}
                onValueChange={handleVolumeChange}
                className="w-20 cursor-pointer [&_[role=slider]]:bg-listening-accent [&_[role=slider]]:border-0 [&_[role=slider]]:h-2.5 [&_[role=slider]]:w-2.5 [&_.bg-primary]:bg-listening-accent"
              />
            </div>

            {/* Play/Pause */}
            <Button
              onClick={togglePlay}
              size="lg"
              className="h-16 w-16 rounded-full bg-listening-accent hover:bg-listening-accent/90 text-listening-room shadow-lg transition-all duration-300 hover:scale-105"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause className="h-7 w-7" />
              ) : (
                <Play className="h-7 w-7 ml-1" />
              )}
            </Button>

            {/* Spacer for symmetry */}
            <div className="w-[88px]" />
          </div>

          {/* Social links */}
          {currentArtist.links && Object.keys(currentArtist.links).length > 0 && (
            <div className="flex items-center justify-center gap-3 mt-8 pt-6 border-t border-listening-border">
              {Object.entries(currentArtist.links).map(([type, url]) => (
                <a
                  key={type}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-listening-border/30 hover:bg-listening-border/60 transition-all duration-300"
                  aria-label={type}
                  title={type.charAt(0).toUpperCase() + type.slice(1)}
                >
                  {getLinkIcon(type)}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Artist counter */}
        <div className="mt-8 text-sm text-listening-muted font-mono">
          {currentIndex + 1} / {artists.length}
        </div>
      </div>

      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={currentArtist.audio}
        preload="metadata"
      />
    </div>
  );
};

export default ListeningRoom;
