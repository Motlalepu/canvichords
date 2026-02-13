import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Play, Pause, Volume2, VolumeX, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Artwork, getNextArtwork } from "@/data/artworks";
import { useAudioContext } from "@/contexts/AudioContext";
import { cn } from "@/lib/utils";

interface ListeningRoomProps {
  artwork: Artwork;
}

const ListeningRoom = ({ artwork }: ListeningRoomProps) => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { muteGlobalAudio, unmuteGlobalAudio } = useAudioContext();

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Mute global audio on mount, restore on unmount
  useEffect(() => {
    muteGlobalAudio();
    // Fade in
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => {
      clearTimeout(timer);
      unmuteGlobalAudio();
    };
  }, [muteGlobalAudio, unmuteGlobalAudio]);

  // Update volume on the active media element
  useEffect(() => {
    const el = videoRef.current ?? audioRef.current;
    if (el) el.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  // Hide controls after inactivity
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setTimeout(() => setShowControls(false), 3000);
    return () => clearTimeout(timer);
  }, [showControls, isPlaying]);

  // Sync progress with the active media element during playback
  useEffect(() => {
    const el = videoRef.current ?? audioRef.current;
    if (!el || isDragging) return;

    const updateProgress = () => setProgress(el.currentTime);
    el.addEventListener("timeupdate", updateProgress);
    return () => el.removeEventListener("timeupdate", updateProgress);
  }, [isDragging]);

  // Track playing/paused state from whichever media element is rendered
  useEffect(
    () => {
      const videoEl = videoRef.current;
      const audioEl = audioRef.current;

      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);

      if (videoEl) {
        videoEl.addEventListener("play", handlePlay);
        videoEl.addEventListener("pause", handlePause);
      }
      if (audioEl) {
        audioEl.addEventListener("play", handlePlay);
        audioEl.addEventListener("pause", handlePause);
      }

      return () => {
        if (videoEl) {
          videoEl.removeEventListener("play", handlePlay);
          videoEl.removeEventListener("pause", handlePause);
        }
        if (audioEl) {
          audioEl.removeEventListener("play", handlePlay);
          audioEl.removeEventListener("pause", handlePause);
        }
      };
    },
    [
      /* run after refs update */
    ],
  );

  const getActiveEl = () => videoRef.current ?? audioRef.current;

  const handleTimeUpdate = () => {
    const el = getActiveEl();
    if (el && !isDragging) setProgress(el.currentTime);
  };

  const handleLoadedMetadata = () => {
    const el = getActiveEl();
    if (el) setDuration(el.duration);
  };

  const togglePlay = async () => {
    const el = getActiveEl();
    if (!el) return;
    try {
      if (isPlaying) {
        el.pause();
        setIsPlaying(false);
      } else {
        await el.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Play/pause failed:", error);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    if (value[0] > 0) setIsMuted(false);
  };

  const handleSeek = (value: number[]) => {
    const el = getActiveEl();
    if (el) {
      el.currentTime = value[0];
      setProgress(value[0]);
    }
  };

  const handleMouseMove = () => setShowControls(true);

  const handleDragStart = () => setIsDragging(true);
  const handleDragEnd = () => setIsDragging(false);

  const handleExit = () => {
    navigate(`/artwork/${artwork.id}`);
  };

  const handleMediaEnded = () => {
    const nextArtwork = getNextArtwork(artwork.id);
    if (nextArtwork) navigate(`/listening-room/${nextArtwork.id}`);
  };

  const startPlayback = async () => {
    const el = getActiveEl();
    if (!el) return;
    try {
      await el.play();
      setHasInteracted(true);
    } catch (error) {
      console.error("Playback failed:", error);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // If there's neither video nor audio, nothing to play
  if (!artwork.musicVideo && !artwork.soundscape) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 bg-[hsl(30,15%,5%)] transition-opacity duration-700",
        isVisible ? "opacity-100" : "opacity-0",
      )}
      onMouseMove={handleMouseMove}
    >
      {/* Exit button */}
      <div
        className={cn(
          "absolute top-6 left-6 z-50 transition-opacity duration-500",
          showControls ? "opacity-100" : "opacity-0",
        )}
      >
        <Button
          variant="galleryGhost"
          size="sm"
          onClick={handleExit}
          className="gap-2 text-foreground/70 hover:text-foreground"
        >
          <X className="h-4 w-4" />
          <span className="hidden md:inline">Exit Room</span>
        </Button>
      </div>

      {/* Artist info */}
      <div
        className={cn(
          "absolute top-6 right-6 z-50 text-right transition-opacity duration-500",
          showControls ? "opacity-100" : "opacity-0",
        )}
      >
        <p className="text-xs uppercase tracking-widest text-foreground/50 font-sans">
          Listening Room
        </p>
        <h1 className="font-serif text-lg text-foreground/80 mt-1">
          {artwork.artist}
        </h1>
      </div>

      {/* Video container */}
      <div className="absolute inset-0 flex items-center justify-center p-8 md:p-16">
        {hasError ? (
          <div className="text-center space-y-4">
            <p className="text-foreground/60 font-sans text-lg">
              Unable to load video
            </p>
            <Link to={`/artwork/${artwork.id}`}>
              <Button variant="gallery">Return to Artwork</Button>
            </Link>
          </div>
        ) : // Render video if available, otherwise render audio element
        artwork.musicVideo ? (
          <video
            ref={videoRef}
            src={artwork.musicVideo}
            className="max-w-full max-h-full object-contain"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={handleMediaEnded}
            onError={() => setHasError(true)}
            playsInline
            autoPlay={hasInteracted}
            muted={!hasInteracted}
          />
        ) : (
          <audio
            ref={audioRef}
            src={artwork.soundscape}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={handleMediaEnded}
            onError={() => setHasError(true)}
            autoPlay={hasInteracted}
            muted={true}
          />
        )}
      </div>
      {/* Start Listening button (initial interaction) */}
      {!hasInteracted && !hasError && (
        <button
          onClick={startPlayback}
          className="absolute inset-0 flex items-center justify-center z-40 cursor-pointer group"
          aria-label="Start listening"
        >
          <div className="w-20 h-20 rounded-full bg-foreground/10 backdrop-blur-sm border border-foreground/20 flex items-center justify-center transition-all duration-300 group-hover:bg-foreground/20 group-hover:scale-110">
            <Play className="h-8 w-8 text-foreground/80 ml-1" />
          </div>
        </button>
      )}

      {/* Play button overlay (when paused after interaction) */}
      {hasInteracted && !isPlaying && !hasError && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center z-40 cursor-pointer group"
          aria-label="Play video"
        >
          <div className="w-20 h-20 rounded-full bg-foreground/10 backdrop-blur-sm border border-foreground/20 flex items-center justify-center transition-all duration-300 group-hover:bg-foreground/20 group-hover:scale-110">
            <Play className="h-8 w-8 text-foreground/80 ml-1" />
          </div>
        </button>
      )}

      {/* Bottom controls */}
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 z-50 transition-opacity duration-500",
          showControls ? "opacity-100" : "opacity-0",
        )}
      >
        <div className="bg-gradient-to-t from-[hsl(30,15%,5%)] to-transparent pt-16 pb-8 px-8">
          {/* Progress bar */}
          <div className="mb-4">
            <Slider
              value={[progress]}
              max={duration || 100}
              step={0.1}
              onValueChange={handleSeek}
              onPointerDown={handleDragStart}
              onPointerUp={handleDragEnd}
              onTouchStart={handleDragStart}
              onTouchEnd={handleDragEnd}
              className="w-full"
            />
            <div className="flex justify-between mt-2 text-xs text-foreground/50 font-sans">
              <span>{formatTime(progress)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls row */}
          <div className="flex items-center justify-center gap-6">
            <Button
              variant="galleryGhost"
              size="icon"
              onClick={togglePlay}
              className="h-12 w-12 rounded-full bg-foreground/10 hover:bg-foreground/20"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5 ml-0.5" />
              )}
            </Button>

            <div className="flex items-center gap-3">
              <Button
                variant="galleryGhost"
                size="icon"
                onClick={toggleMute}
                className="h-10 w-10 rounded-full"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </Button>
              <Slider
                value={[isMuted ? 0 : volume]}
                max={1}
                step={0.01}
                onValueChange={handleVolumeChange}
                className="w-24"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListeningRoom;
