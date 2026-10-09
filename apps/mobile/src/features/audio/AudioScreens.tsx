import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import {
  ArrowDownToLine,
  ChevronDown,
  ChevronRight,
  Clock3,
  ListMusic,
  Pause,
  Play,
  Plus,
  SkipBack,
  SkipForward,
  TimerReset,
  Volume2,
} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import {
  AppText,
  BackHeader,
  BookCover,
  Chip,
  Page,
  PrimaryButton,
  ProgressBar,
} from '../../design-system/components';
import { colors, radius } from '../../design-system/theme';
import { useAudioPlayback } from '../../app/audio-playback';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';

const chapters = [
  'An Introduction',
  'Sincerity and Intention',
  'Repentance',
  'Patience',
  'Truthfulness',
  'Reliance upon Allah',
  'Gratitude',
  'Good Character',
];

export function AudioPlayerScreen() {
  const navigation = useNavigation<any>();
  const audio = useAudioPlayback();
  const [speed, setSpeed] = useState('1×');
  const toggle = () =>
    audio.isPlaying
      ? audio.pause()
      : audio.play('The Sealed Nectar', 'Safi al-Rahman al-Mubarakfuri');
  return (
    <SafeAreaView style={styles.playerPage} edges={['top', 'bottom']}>
      <StatusBar barStyle="light-content" backgroundColor={colors.night} />
      <View style={styles.playerHeader}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.playerTopButton}
        >
          <ChevronDown size={22} color="#FFFFFF" />
        </TouchableOpacity>
        <AppText variant="caption" color="#CFDCE5" weight="600">
          NOW PLAYING
        </AppText>
        <TouchableOpacity
          onPress={() => navigation.navigate('Downloads')}
          style={styles.playerTopButton}
        >
          <ArrowDownToLine size={19} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      <View style={styles.playerMain}>
        <BookCover
          title="The Sealed Nectar"
          author="Safi al-Rahman"
          index={0}
          width={230}
          height={334}
        />
        <AppText
          variant="heading"
          weight="700"
          color="#FFFFFF"
          style={{ marginTop: 28, textAlign: 'center' }}
        >
          The Sealed Nectar
        </AppText>
        <AppText color="#BDCBD5" style={{ marginTop: 5 }}>
          Safi al-Rahman al-Mubarakfuri
        </AppText>
        <TouchableOpacity
          onPress={() => navigation.navigate('ChapterList')}
          style={styles.chapterLabel}
        >
          <AppText variant="caption" color="#D8E7EF">
            Chapter 8 · The early years
          </AppText>
          <ChevronRight size={15} color="#D8E7EF" />
        </TouchableOpacity>
      </View>
      <View style={styles.playerControls}>
        <View style={styles.scrubInfo}>
          <AppText variant="caption" color="#C0CFD8">
            24:18
          </AppText>
          <AppText variant="caption" color="#C0CFD8">
            1:08:42
          </AppText>
        </View>
        <ProgressBar value={36} light />
        <View style={styles.transport}>
          <TouchableOpacity
            onPress={() =>
              setSpeed(
                speed === '1×' ? '1.25×' : speed === '1.25×' ? '1.5×' : '1×',
              )
            }
            style={styles.speedButton}
          >
            <AppText variant="caption" color="#FFFFFF" weight="700">
              {speed}
            </AppText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.seekButton}>
            <SkipBack size={23} color="#FFFFFF" />
            <AppText variant="caption" color="#FFFFFF" style={styles.seekText}>
              15
            </AppText>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggle} style={styles.playButton}>
            {audio.isPlaying ? (
              <Pause size={25} color={colors.night} fill={colors.night} />
            ) : (
              <Play size={25} color={colors.night} fill={colors.night} />
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.seekButton}>
            <SkipForward size={23} color="#FFFFFF" />
            <AppText variant="caption" color="#FFFFFF" style={styles.seekText}>
              15
            </AppText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('SleepTimer')}
            style={styles.speedButton}
          >
            <Clock3 size={19} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        <View style={styles.playerBottomLinks}>
          <TouchableOpacity onPress={() => navigation.navigate('ChapterList')}>
            <ListMusic size={19} color="#CAD7DF" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('SleepTimer')}>
            <TimerReset size={19} color="#CAD7DF" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Devices')}>
            <Volume2 size={19} color="#CAD7DF" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export function ChapterListScreen() {
  const navigation = useNavigation<any>();
  const [selected, setSelected] = useState(7);
  return (
    <Page contentStyle={{ paddingTop: 8, paddingBottom: 24 }}>
      <View style={styles.sheetHandle} />
      <BackHeader title="Chapters" />
      <View style={styles.chapterBook}>
        <BookCover
          title="The Sealed Nectar"
          author="Safi al-Rahman"
          index={0}
          width={50}
          height={74}
          compact
        />
        <View style={{ marginLeft: 12, flex: 1 }}>
          <AppText weight="700">The Sealed Nectar</AppText>
          <AppText variant="caption" color={colors.body}>
            Safi al-Rahman · 18 chapters
          </AppText>
        </View>
      </View>
      {chapters.map((title, index) => (
        <TouchableOpacity
          key={title}
          onPress={() => setSelected(index)}
          style={[
            styles.chapterListRow,
            selected === index && styles.chapterListSelected,
          ]}
        >
          <View style={{ width: 27 }}>
            <AppText
              variant="caption"
              color={selected === index ? colors.blueDeep : colors.muted}
              weight="700"
            >
              {String(index + 1).padStart(2, '0')}
            </AppText>
          </View>
          <View style={{ flex: 1 }}>
            <AppText weight={selected === index ? '700' : '500'}>
              {title}
            </AppText>
            {selected === index ? (
              <AppText
                variant="caption"
                color={colors.blueDeep}
                style={{ marginTop: 2 }}
              >
                Now playing
              </AppText>
            ) : null}
          </View>
          <AppText variant="caption" color={colors.muted}>
            {index === 7 ? '18:24' : `${12 + index}:0${index % 6}`}
          </AppText>
        </TouchableOpacity>
      ))}
      <PrimaryButton
        title="Back to player"
        onPress={() => navigation.goBack()}
        style={{ marginTop: 16 }}
      />
    </Page>
  );
}

export function SleepTimerScreen() {
  const navigation = useNavigation<any>();
  const [timer, setTimer] = useState('15 minutes');
  const [endOfChapter, setEndOfChapter] = useState(false);
  return (
    <Page contentStyle={{ paddingTop: 8, paddingBottom: 26 }}>
      <View style={styles.sheetHandle} />
      <BackHeader title="Sleep timer" />
      <View style={styles.timerIcon}>
        <Clock3 size={27} color={colors.blueDeep} />
      </View>
      <AppText
        variant="title"
        weight="700"
        style={{ textAlign: 'center', marginTop: 15 }}
      >
        Set a gentle stop
      </AppText>
      <AppText
        color={colors.body}
        style={{ textAlign: 'center', marginTop: 5 }}
      >
        Audio will pause when your timer ends.
      </AppText>
      <View style={styles.timerOptions}>
        {['5 minutes', '15 minutes', '30 minutes', '45 minutes'].map(item => (
          <TouchableOpacity
            key={item}
            onPress={() => {
              setTimer(item);
              setEndOfChapter(false);
            }}
            style={[
              styles.timerOption,
              timer === item && !endOfChapter && styles.timerSelected,
            ]}
          >
            <AppText
              weight={timer === item && !endOfChapter ? '700' : '500'}
              color={
                timer === item && !endOfChapter ? colors.blueDeep : colors.ink
              }
            >
              {item}
            </AppText>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        onPress={() => setEndOfChapter(!endOfChapter)}
        style={[styles.endChapter, endOfChapter && styles.timerSelected]}
      >
        <AppText weight="600">End of chapter</AppText>
        <View style={[styles.radio, endOfChapter && styles.radioSelected]}>
          {endOfChapter ? <View style={styles.radioDot} /> : null}
        </View>
      </TouchableOpacity>
      <View style={styles.timerStatus}>
        <AppText variant="caption" color={colors.body}>
          Playing “The Sealed Nectar” · Chapter 8
        </AppText>
      </View>
      <PrimaryButton
        title="Start timer"
        onPress={() => navigation.goBack()}
        style={{ marginTop: 22 }}
      />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ alignItems: 'center', padding: 14 }}
      >
        <AppText color={colors.body}>Cancel</AppText>
      </TouchableOpacity>
    </Page>
  );
}

const styles = StyleSheet.create({
  playerPage: {
    flex: 1,
    backgroundColor: colors.night,
    paddingHorizontal: 25,
    paddingTop: 16,
    paddingBottom: 24,
    justifyContent: 'space-between',
  },
  playerHeader: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  playerTopButton: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.nightSurface,
    borderRadius: 21,
  },
  playerMain: { alignItems: 'center', paddingTop: 4 },
  chapterLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 9,
  },
  playerControls: { marginBottom: 5 },
  scrubInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 9,
  },
  transport: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 21,
  },
  speedButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  seekButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  seekText: { position: 'absolute', top: 17, fontSize: 8 },
  playButton: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playerBottomLinks: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 24,
  },
  sheetHandle: {
    width: 38,
    height: 4,
    borderRadius: 3,
    backgroundColor: colors.line,
    alignSelf: 'center',
    marginBottom: 12,
  },
  chapterBook: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.line,
    marginBottom: 8,
  },
  chapterListRow: {
    minHeight: 55,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: colors.line,
  },
  chapterListSelected: {
    backgroundColor: colors.blueSoft,
    borderRadius: radius.md,
    borderColor: 'transparent',
  },
  timerIcon: {
    alignSelf: 'center',
    width: 68,
    height: 68,
    backgroundColor: colors.blueSoft,
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 17,
  },
  timerOptions: { gap: 8, marginTop: 23 },
  timerOption: {
    height: 49,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerSelected: { borderColor: colors.blue, backgroundColor: colors.blueSoft },
  endChapter: {
    height: 53,
    marginTop: 9,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.line,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  radio: {
    width: 19,
    height: 19,
    borderWidth: 1.4,
    borderColor: colors.muted,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: { borderColor: colors.blueDeep },
  radioDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: colors.blueDeep,
  },
  timerStatus: { alignItems: 'center', marginTop: 18 },
});
