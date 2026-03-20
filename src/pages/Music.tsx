import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

// Declare YT globally
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}
const tracks = [
  {
    id: 1,
    title: "Darego",
    artist: "Azlink ft Gudhee",
    duration: "2:27",
    src: "/songs/AZLINK X GUDHEE - DAREGO (MM SIQESTSOUND).mp3",
    video: {
    type: "local",
    src: "/public/videos/azlink.mp4"
  }
  },
  {
    id: 2,
    title: "Heaven Hi",
    artist: "Nikosi",
    duration: "2:17",
    src: "/songs/Heaven Hi - Nikosi.mp3",
    video: {
      type: "youtube",
      id: "FVh1JUq8xs4",
    },
  },
  {
    id: 3,
    title: "My life",
    artist: "Louie X",
    duration: "4:46",
    src: "/songs/My life - Louie X.mp3",
    video: {
    type: "local",
    src: "/videos/louiexx.mp4"
  }

  },
  {
    id: 4,
    title: "Element",
    artist:
      "RA I, Big Belly Bufu, Initialed Endee, Swanker Teyise, Slim Dojeur, MC LA",
    duration: "6:28",
    src: "/songs/ELEMENT Ft RA I,Big Belly Bufu, Initialed Endee, Swanker Teyise, Slim Dojeur, MC LA [_J4ypHifmhI].mp3",
    video: {
      type: "youtube",
      id: "_J4ypHifmhI",
    },
  },
  {
    id: 5,
    title: "Pemi",
    artist: "Azlink",
    duration: "3:13",
    src: "/songs/PEMI AZLINK .mp3",
     video: {
    type: "local",
    src: "/videos/azlinkkk.mp4"
  }
  },

  {
    id: 6,
    title: "Nomba",
    artist: "Louie X ft Misfit",
    duration: "3:51",
    src: "/songs/LOUIE X FEAT MISFIT @SHANI NOMBA [ez-epY4Oyhs].mp3",
    video: {
      type: "youtube",
      id: "ez-epY4Oyhs",
    },
  },
  {
    id: 7,
    title: "Xam",
    artist: "Ra I",
    duration: "3:10",
    src: "/songs/RA I - XAM .mp3",
    video: {
      type: "youtube",
      id: "R_YQ1mY7afo",
    },
  },


];

const Music = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const youtubePlayerRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [progress, setProgress] = useState([0]);
  const [volume, setVolume] = useState([70]);
  const [youtubeReady, setYoutubeReady] = useState(false);

  // Load YouTube API
  useEffect(() => {
    if (!window.YT) {
      console.log("Loading YouTube API...");
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.onload = () => console.log("YouTube API script loaded");
      script.onerror = () => console.error("Failed to load YouTube API script");
      document.body.appendChild(script);
    } else {
      console.log("YouTube API already loaded");
      setYoutubeReady(true);
    }

    window.onYouTubeIframeAPIReady = () => {
      console.log("YouTube API ready");
      setYoutubeReady(true);
    };

    return () => {
      if (youtubePlayerRef.current) {
        console.log("Destroying YouTube player");
        youtubePlayerRef.current.destroy();
        youtubePlayerRef.current = null;
      }
    };
  }, []);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      console.log("Pausing playback");
      audio.pause();
      if (
        youtubePlayerRef.current &&
        typeof youtubePlayerRef.current.pauseVideo === "function"
      ) {
        youtubePlayerRef.current.pauseVideo();
      } else if (videoRef.current) {
        videoRef.current.pause();
      }
      setIsPlaying(false);
    } else {
      console.log("Starting playback");
      audio.play();
      if (
        youtubePlayerRef.current &&
        typeof youtubePlayerRef.current.playVideo === "function"
      ) {
        console.log("Playing YouTube video");
        youtubePlayerRef.current.playVideo();
      } else if (videoRef.current) {
        videoRef.current.play();
      }
      setIsPlaying(true);
    }
  };

  const handlePrevious = () => {
    setCurrentTrack((prev) => (prev > 0 ? prev - 1 : tracks.length - 1));
  };

  const handleNext = () => {
    setCurrentTrack((prev) => (prev < tracks.length - 1 ? prev + 1 : 0));
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio && audio.duration) {
      const current = (audio.currentTime / audio.duration) * 100;
      setProgress([current]);
    }
  };

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current;
    if (audio && audio.duration) {
      const time = (value[0] / 100) * audio.duration;
      audio.currentTime = time;
      setProgress(value);
    }
  };

  const handleEnded = () => {
    handleNext();
  };

  const selectTrack = (index: number) => {
    setCurrentTrack(index);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Always set up audio for the current track
    audio.src = tracks[currentTrack].src;
    audio.load();

    // Handle YouTube player
    if (tracks[currentTrack].video?.type === "youtube") {
      if (youtubeReady && window.YT) {
        // Keep audio playing normally - video is just for visuals

        if (!youtubePlayerRef.current) {
          // Create player ONCE
          youtubePlayerRef.current = new window.YT.Player("youtube-player", {
            videoId: tracks[currentTrack].video.id,
            playerVars: {
              autoplay: 0,
              mute: 1,
              loop: 1,
              controls: 0,
              modestbranding: 1,
              rel: 0,
              playlist: tracks[currentTrack].video.id,
            },
            events: {
              onReady: (event: any) => {
                console.log(
                  "YouTube player ready for video:",
                  tracks[currentTrack].video.id
                );
                if (isPlaying) {
                  event.target.playVideo();
                }
              },
              onStateChange: (event: any) => {
                console.log("YouTube player state changed:", event.data);
              },
              onError: (event: any) => {
                console.error("YouTube player error:", event.data);
              },
            },
          });
        } else if (
          youtubePlayerRef.current &&
          typeof youtubePlayerRef.current.loadVideoById === "function"
        ) {
          // Player exists and is ready → load new video
          console.log(
            "Loading new YouTube video:",
            tracks[currentTrack].video.id
          );
          youtubePlayerRef.current.loadVideoById(tracks[currentTrack].video.id);
          if (isPlaying) {
            setTimeout(() => {
              if (
                youtubePlayerRef.current &&
                typeof youtubePlayerRef.current.playVideo === "function"
              ) {
                youtubePlayerRef.current.playVideo();
              }
            }, 500);
          }
        } else {
          // Player not ready yet, recreate it
          console.log(
            "Recreating YouTube player for:",
            tracks[currentTrack].video.id
          );
          youtubePlayerRef.current = new window.YT.Player("youtube-player", {
            videoId: tracks[currentTrack].video.id,
            playerVars: {
              autoplay: 0,
              mute: 1,
              loop: 1,
              controls: 0,
              modestbranding: 1,
              rel: 0,
              playlist: tracks[currentTrack].video.id,
            },
            events: {
              onReady: (event: any) => {
                console.log(
                  "YouTube player ready for video:",
                  tracks[currentTrack].video.id
                );
                if (isPlaying) {
                  event.target.playVideo();
                }
              },
              onStateChange: (event: any) => {
                console.log("YouTube player state changed:", event.data);
              },
              onError: (event: any) => {
                console.error("YouTube player error:", event.data);
              },
            },
          });
        }
      }
    } else {
      // Non-YouTube track → destroy player
      if (youtubePlayerRef.current) {
        console.log("Destroying YouTube player");
        youtubePlayerRef.current.destroy();
        youtubePlayerRef.current = null;
      }
    }

    // Audio should always play if isPlaying is true (already set up above)
    if (isPlaying) {
      audio.play().catch((error) => {
        console.log("Audio play failed:", error);
      });
    }
  }, [currentTrack, youtubeReady, isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume[0] / 100;
    }
  }, [volume]);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background Video */}
      {tracks[currentTrack].video?.type === "youtube" ? (
        <div className="absolute inset-0">
          <div id="youtube-player" className="w-full h-full opacity-30"></div>
          {/* Clickable Overlay */}
          <div
            className="absolute inset-0 cursor-pointer bg-transparent"
            onClick={() =>
              window.open(
                `https://www.youtube.com/watch?v=${tracks[currentTrack].video.id}`,
                "_blank"
              )
            }
          ></div>
        </div>
      ) : (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover opacity-30 cursor-pointer"
          loop
          muted
          autoPlay
          playsInline
          onClick={() => window.open("/videos/music-bg.mp4", "_blank")} // Or handle local video differently
        >
          <source src="/videos/music-bg.mp4" type="video/mp4" />
          {/* Fallback */}
          Your browser does not support the video tag.
        </video>
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
        {/* Player */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-md w-full text-white">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-light mb-2">
              {tracks[currentTrack].title}
            </h2>
            <p className="text-white/70">{tracks[currentTrack].artist}</p>
          </div>

          {/* Progress */}
          <Slider
            value={progress}
            onValueChange={handleSeek}
            max={100}
            step={1}
            className="mb-6"
          />

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <Button variant="ghost" size="icon" onClick={handlePrevious}>
              <SkipBack className="w-6 h-6" />
            </Button>
            <Button
              size="lg"
              onClick={togglePlayPause}
              className="rounded-full"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8" />
              ) : (
                <Play className="w-8 h-8" />
              )}
            </Button>
            <Button variant="ghost" size="icon" onClick={handleNext}>
              <SkipForward className="w-6 h-6" />
            </Button>
          </div>

          {/* Volume */}
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4" />
            <Slider
              value={volume}
              onValueChange={setVolume}
              max={100}
              step={1}
              className="flex-1"
            />
          </div>
        </div>

        {/* Track List */}
        <div className="mt-8 max-w-md w-full">
          <h3 className="text-white text-lg mb-4">Playlist</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {tracks.map((track, index) => (
              <button
                key={`track-${track.id}`}
                onClick={() => selectTrack(index)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  index === currentTrack
                    ? "bg-white/20"
                    : "bg-white/5 hover:bg-white/10"
                }`}
              >
                <div className="font-medium">{track.title}</div>
                <div className="text-sm text-white/70">{track.artist}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Hidden Audio */}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />
    </div>
  );
};

export default Music;
