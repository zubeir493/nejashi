import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from 'react';

type PlaybackState = {
  isPlaying: boolean;
  title: string;
  author: string;
  progress: number;
  play: (title?: string, author?: string) => void;
  pause: () => void;
};

const AudioPlaybackContext = createContext<PlaybackState | null>(null);

export function AudioPlaybackProvider({ children }: PropsWithChildren) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [title, setTitle] = useState('The Sealed Nectar');
  const [author, setAuthor] = useState('Safi al-Rahman al-Mubarakfuri');
  const value = useMemo<PlaybackState>(
    () => ({
      isPlaying,
      title,
      author,
      progress: 36,
      play: (nextTitle, nextAuthor) => {
        if (nextTitle) setTitle(nextTitle);
        if (nextAuthor) setAuthor(nextAuthor);
        setIsPlaying(true);
      },
      pause: () => setIsPlaying(false),
    }),
    [isPlaying, title, author],
  );
  return (
    <AudioPlaybackContext.Provider value={value}>
      {children}
    </AudioPlaybackContext.Provider>
  );
}

export function useAudioPlayback() {
  const value = useContext(AudioPlaybackContext);
  if (!value)
    throw new Error(
      'useAudioPlayback must be used within AudioPlaybackProvider',
    );
  return value;
}
