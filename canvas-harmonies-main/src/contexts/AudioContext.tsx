import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface AudioContextType {
  isGlobalAudioMuted: boolean;
  muteGlobalAudio: () => void;
  unmuteGlobalAudio: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  const [isGlobalAudioMuted, setIsGlobalAudioMuted] = useState(false);

  const muteGlobalAudio = useCallback(() => {
    setIsGlobalAudioMuted(true);
  }, []);

  const unmuteGlobalAudio = useCallback(() => {
    setIsGlobalAudioMuted(false);
  }, []);

  return (
    <AudioContext.Provider value={{ isGlobalAudioMuted, muteGlobalAudio, unmuteGlobalAudio }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudioContext = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudioContext must be used within an AudioProvider");
  }
  return context;
};
