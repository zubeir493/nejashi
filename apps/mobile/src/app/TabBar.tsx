import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import {
  Compass,
  Headphones,
  Home,
  Library,
  Pause,
  Play,
} from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText } from '../design-system/components';
import { colors, radius } from '../design-system/theme';
import { useAudioPlayback } from './audio-playback';

const tabIcons: Record<string, typeof Home> = {
  Home,
  Discover: Compass,
  Library,
  Listen: Headphones,
};

export function TabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const audio = useAudioPlayback();
  const openPlayer = () =>
    (navigation.getParent() as any)?.navigate('AudioPlayer');
  return (
    <View style={[styles.dock, { paddingBottom: Math.max(insets.bottom, 10) }]}>
      {audio.isPlaying ? (
        <TouchableOpacity
          onPress={openPlayer}
          activeOpacity={0.8}
          style={styles.miniPlayer}
        >
          <View style={styles.miniCover}>
            <Headphones size={17} color={colors.blueDeep} />
          </View>
          <View style={{ flex: 1 }}>
            <AppText variant="caption" weight="700" numberOfLines={1}>
              {audio.title}
            </AppText>
            <AppText variant="caption" color={colors.body} numberOfLines={1}>
              {audio.author}
            </AppText>
          </View>
          <View style={styles.miniProgress}>
            <View
              style={[styles.miniProgressFill, { width: `${audio.progress}%` }]}
            />
          </View>
          <TouchableOpacity
            onPress={event => {
              event.stopPropagation();
              audio.pause();
            }}
            accessibilityLabel="Pause audio"
            style={{ padding: 8 }}
          >
            <Pause size={18} color={colors.ink} fill={colors.ink} />
          </TouchableOpacity>
        </TouchableOpacity>
      ) : null}
      <View style={styles.pill}>
        {state.routes.map((route, index) => {
          const focused = state.index === index;
          const Icon = tabIcons[route.name] ?? Home;
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!focused && !event.defaultPrevented)
              navigation.navigate(route.name as never);
          };
          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              activeOpacity={0.75}
              accessibilityRole="tab"
              accessibilityState={{ selected: focused }}
              style={styles.tab}
            >
              <Icon
                size={21}
                strokeWidth={focused ? 2.5 : 1.8}
                color={focused ? colors.blueDeep : colors.muted}
              />
              <AppText
                variant="caption"
                weight={focused ? '700' : '500'}
                color={focused ? colors.blueDeep : colors.muted}
                style={{ marginTop: 3, fontSize: 10 }}
              >
                {route.name}
              </AppText>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dock: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: 7,
    backgroundColor: 'rgba(255,255,255,0.96)',
  },
  pill: {
    minHeight: 62,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 6,
    shadowColor: '#183144',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 18,
    elevation: 6,
  },
  tab: {
    minWidth: 58,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 7,
  },
  miniPlayer: {
    height: 58,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.surface,
    marginBottom: 8,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    shadowColor: '#183144',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  miniCover: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.blueSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  miniProgress: {
    width: 34,
    height: 3,
    borderRadius: 3,
    backgroundColor: colors.line,
    overflow: 'hidden',
  },
  miniProgressFill: { height: '100%', backgroundColor: colors.blue },
});
