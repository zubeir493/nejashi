import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AudioPlaybackProvider } from './src/app/audio-playback';
import { RootNavigator } from './src/app/RootNavigator';
import { colors } from './src/design-system/theme';

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <AudioPlaybackProvider>
        <RootNavigator />
      </AudioPlaybackProvider>
    </SafeAreaProvider>
  );
}

export default App;
