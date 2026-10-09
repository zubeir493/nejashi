import React from 'react';
import { ScrollView, TouchableOpacity, View, StyleSheet } from 'react-native';
import { ChevronRight, Clock3, ListMusic, Play } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import {
  AppText,
  BookCover,
  BookListRow,
  BookTile,
  Page,
  PageHeading,
  ProgressBar,
  SectionHeading,
} from '../../design-system/components';
import { colors, radius } from '../../design-system/theme';
import { useAudioPlayback } from '../../app/audio-playback';

const audioTitles = [
  ['Purification of the Soul', 'Hamza Yusuf', '6 hr 10 min'],
  ['Stories of the Prophets', 'Yasir Qadhi', '9 hr 25 min'],
  ['The Forty Hadith', 'Abdul Nasir Jangda', '3 hr 42 min'],
];

export function ListenScreen() {
  const navigation = useNavigation<any>();
  const audio = useAudioPlayback();
  const play = () => {
    audio.play('The Sealed Nectar', 'Safi al-Rahman al-Mubarakfuri');
    navigation.navigate('AudioPlayer');
  };
  return (
    <Page contentStyle={{ paddingTop: 15, paddingBottom: 130 }}>
      <PageHeading
        title="Listen"
        subtitle="Stories and ideas, wherever you go."
      />
      <TouchableOpacity
        onPress={() => navigation.navigate('AudioPlayer')}
        activeOpacity={0.82}
        style={styles.resumeCard}
      >
        <BookCover
          title="The Sealed Nectar"
          author="Safi al-Rahman"
          index={0}
          width={88}
          height={128}
        />
        <View style={styles.resumeInfo}>
          <AppText variant="eyebrow" color="#D8F1FC">
            CONTINUE LISTENING
          </AppText>
          <AppText
            variant="subheading"
            weight="700"
            color="#FFFFFF"
            style={{ marginTop: 7 }}
          >
            The Sealed Nectar
          </AppText>
          <AppText variant="caption" color="#D5E2E9" style={{ marginTop: 2 }}>
            Chapter 8 · 1h 23m left
          </AppText>
          <View style={{ marginTop: 14 }}>
            <ProgressBar value={36} light />
          </View>
          <View style={styles.resumeActions}>
            <TouchableOpacity
              onPress={e => {
                e.stopPropagation();
                play();
              }}
              style={styles.resumePlay}
            >
              <Play size={14} color={colors.ink} fill={colors.ink} />
              <AppText variant="caption" weight="700">
                Resume
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('ChapterList')}
            >
              <ListMusic size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
      <SectionHeading
        title="Made for listening"
        action="See all"
        onAction={() =>
          navigation.navigate('Collection', { title: 'Made for listening' })
        }
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 22 }}
      >
        {audioTitles.map(([title, author], index) => (
          <BookTile
            key={title}
            title={title}
            author={author}
            index={index + 1}
            onPress={play}
          />
        ))}
      </ScrollView>
      <View style={{ marginTop: 15 }}>
        <SectionHeading
          title="New audiobooks"
          action="Browse"
          onAction={() => navigation.navigate('Discover')}
        />
      </View>
      {audioTitles.map(([title, author, duration], index) => (
        <BookListRow
          key={title}
          title={title}
          author={author}
          index={index + 1}
          metadata={`${duration} · Audiobook`}
          onPress={play}
          action={<ChevronRight size={17} color={colors.muted} />}
        />
      ))}
      <TouchableOpacity
        onPress={() => navigation.navigate('SleepTimer')}
        style={styles.sleepShortcut}
      >
        <Clock3 size={17} color={colors.blueDeep} />
        <AppText variant="caption" color={colors.blueDeep} weight="600">
          Set a sleep timer
        </AppText>
        <ChevronRight size={15} color={colors.blueDeep} />
      </TouchableOpacity>
    </Page>
  );
}

const styles = StyleSheet.create({
  resumeCard: {
    backgroundColor: colors.night,
    borderRadius: radius.lg,
    padding: 15,
    flexDirection: 'row',
    gap: 14,
    marginBottom: 18,
  },
  resumeInfo: { flex: 1, justifyContent: 'center' },
  resumeActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 11,
  },
  resumePlay: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingHorizontal: 13,
    height: 34,
    borderRadius: radius.pill,
    backgroundColor: '#FFFFFF',
  },
  sleepShortcut: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 18,
    minHeight: 43,
    backgroundColor: colors.blueSoft,
    borderRadius: radius.pill,
  },
});
