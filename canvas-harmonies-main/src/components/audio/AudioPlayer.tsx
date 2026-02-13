import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useAudioContext } from "@/contexts/AudioContext";
import { cn } from "@/lib/utils";

interface AudioPlayerProps {
  src: string;
  title?: string;
  autoPlay?: boolean;
  className?: string;
}

const AudioPlayer = ({ src, title, autoPlay = false, className }: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const { isGlobalAudioMuted } = useAudioContext();
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [isMuted, setIsMuted] = useState(false);
  const [showVolume, setShowVolume] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Handle global mute state (for Listening Room)
  useEffect(() => {
    if (audioRef.current) {
      if (isGlobalAudioMuted) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else if (autoPlay && !isPlaying) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          setIsPlaying(false);
        });
      }
    }
  }, [isGlobalAudioMuted, autoPlay]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      if (autoPlay && !isGlobalAudioMuted) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          setIsPlaying(false);
        });
      }
    }
  }, [src, autoPlay, isGlobalAudioMuted]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Detect scroll to show/hide player
  useEffect(() => {
    const handleScroll = () => {
      if (playerRef.current) {
        const rect = playerRef.current.getBoundingClientRect();
        // Show player when it's near the viewport
        const isNearViewport = rect.bottom > -100 && rect.top < window.innerHeight + 100;
        setIsVisible(isNearViewport);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const togglePlay = () => {
    if (isGlobalAudioMuted) return;
    
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    if (value[0] > 0) {
      setIsMuted(false);
    }
  };

  // Hide player when global audio is muted (Listening Room active)
  if (isGlobalAudioMuted) {
    return null;
  }

  return (
    <div 
      ref={playerRef}
      className={cn(
        "flex items-center gap-3 p-3 rounded-full bg-card/50 backdrop-blur-sm border border-border/50 transition-all duration-300",
        !isVisible && "opacity-50",
        className
      )}
      onMouseEnter={() => setShowVolume(true)}
      onMouseLeave={() => setShowVolume(false)}
    >
      <audio ref={audioRef} src={src} loop />
      
      <Button
        variant="galleryGhost"
        size="icon"
        onClick={togglePlay}
        className="h-8 w-8 rounded-full"
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? (
          <Pause className="h-4 w-4" />
        ) : (
          <Play className="h-4 w-4 ml-0.5" />
        )}
      </Button>

      {title && (
        <span className="text-xs font-sans text-muted-foreground tracking-wide hidden md:block">
          {isPlaying ? "Now playing" : "Soundscape"}
        </span>
      )}

      <div 
        className={cn(
          "flex items-center gap-2 transition-all duration-300",
          showVolume ? "w-24 opacity-100" : "w-24 opacity-100"
        )}
      >
        <Slider
          value={[isMuted ? 0 : volume]}
          max={1}
          step={0.01}
          onValueChange={handleVolumeChange}
          className="w-20"
        />
      </div>

      <Button
        variant="galleryGhost"
        size="icon"
        onClick={toggleMute}
        className="h-8 w-8 rounded-full"
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted || volume === 0 ? (
          <VolumeX className="h-4 w-4" />
        ) : (
          <Volume2 className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
};

export default AudioPlayer;
