import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, View, StyleSheet } from 'react-native';
import {
  ArrowLeft,
  Bookmark,
  MoreHorizontal,
  Search,
  Settings2,
  Sun,
} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import {
  AppText,
  Chip,
  IconButton,
  Page,
  PrimaryButton,
} from '../../design-system/components';
import { colors, radius } from '../../design-system/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

export function ReaderScreen() {
  const navigation = useNavigation<any>();
  const [bookmarked, setBookmarked] = useState(false);
  const [toolbar, setToolbar] = useState(true);
  return (
    <SafeAreaView style={styles.reader} edges={['top', 'bottom']}>
      <View style={styles.readerTop}>
        <IconButton
          accessibilityLabel="Close reader"
          onPress={() => navigation.goBack()}
          style={styles.readerIcon}
        >
          <ArrowLeft size={20} color={colors.ink} />
        </IconButton>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <AppText variant="caption" color={colors.body}>
            RIYAD AS-SALIHIN
          </AppText>
          <AppText variant="caption" weight="600" style={{ marginTop: 2 }}>
            Sincerity and intention
          </AppText>
        </View>
        <IconButton
          accessibilityLabel="Reader settings"
          onPress={() => navigation.navigate('ReaderSettings')}
          style={styles.readerIcon}
        >
          <Settings2 size={19} color={colors.ink} />
        </IconButton>
      </View>
      <ScrollView
        contentContainerStyle={styles.readerText}
        onScrollBeginDrag={() => setToolbar(false)}
        onScrollEndDrag={() => setToolbar(true)}
      >
        <AppText
          variant="eyebrow"
          color={colors.blueDeep}
          style={{ textAlign: 'center', marginBottom: 20 }}
        >
          CHAPTER ONE
        </AppText>
        <AppText
          variant="title"
          weight="600"
          style={{
            fontFamily: 'Georgia',
            textAlign: 'center',
            marginBottom: 27,
            lineHeight: 39,
          }}
        >
          Sincerity and intention
        </AppText>
        <AppText style={styles.bookParagraph}>
          The Messenger of Allah ﷺ said: “Actions are according to intentions,
          and everyone will be rewarded according to what they intended.”
        </AppText>
        <AppText style={styles.bookParagraph}>
          This opening chapter gathers narrations on the quiet purpose behind
          every act. It invites the reader to return to intention with care, in
          worship and in the ordinary work of each day.
        </AppText>
        <AppText style={styles.bookParagraph}>
          A person may undertake one action with many intentions, and each is
          written for them according to what they sought. The heart gives
          direction to what the hands begin.
        </AppText>
        <TouchableOpacity
          onPress={() => navigation.navigate('Highlights')}
          style={styles.annotation}
        >
          <AppText variant="caption" color={colors.blueDeep} weight="600">
            VIEW 3 HIGHLIGHTS IN THIS CHAPTER
          </AppText>
          <MoreHorizontal size={17} color={colors.blueDeep} />
        </TouchableOpacity>
      </ScrollView>
      {toolbar ? (
        <View style={styles.readerBottom}>
          <View style={styles.readerProgress}>
            <View style={[styles.readerProgressFill, { width: '42%' }]} />
          </View>
          <View style={styles.readerActions}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Bookmarks')}
              style={styles.readerAction}
            >
              <Bookmark
                size={19}
                color={bookmarked ? colors.blueDeep : colors.body}
                fill={bookmarked ? colors.blueDeep : 'transparent'}
              />
              <AppText
                variant="caption"
                color={colors.body}
                style={{ marginTop: 4 }}
              >
                Bookmark
              </AppText>
            </TouchableOpacity>
            <AppText variant="caption" color={colors.body}>
              42% · Page 86 of 204
            </AppText>
            <TouchableOpacity
              onPress={() => navigation.navigate('Search', { query: '' })}
              style={styles.readerAction}
            >
              <Search size={19} color={colors.body} />
              <AppText
                variant="caption"
                color={colors.body}
                style={{ marginTop: 4 }}
              >
                Find
              </AppText>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => setBookmarked(!bookmarked)}
            onLongPress={() => navigation.navigate('Highlights')}
            style={styles.markPage}
          >
            <AppText variant="caption" color={colors.blueDeep} weight="600">
              Tap text to highlight · Long press for note
            </AppText>
          </TouchableOpacity>
        </View>
      ) : null}
    </SafeAreaView>
  );
}

export function ReaderSettingsScreen() {
  const navigation = useNavigation<any>();
  const [size, setSize] = useState('Medium');
  const [theme, setTheme] = useState('Paper');
  return (
    <Page contentStyle={{ paddingTop: 8, paddingBottom: 28 }}>
      <View style={styles.sheetHandle} />
      <View style={styles.sheetHeading}>
        <AppText variant="heading" weight="700">
          Reading settings
        </AppText>
        <IconButton
          accessibilityLabel="Close settings"
          onPress={() => navigation.goBack()}
        >
          <Sun size={18} color={colors.body} />
        </IconButton>
      </View>
      <AppText variant="subheading" weight="600" style={{ marginTop: 20 }}>
        Text size
      </AppText>
      <View style={styles.chipRow}>
        {['Small', 'Medium', 'Large', 'Extra large'].map(item => (
          <Chip
            key={item}
            label={item}
            selected={size === item}
            onPress={() => setSize(item)}
          />
        ))}
      </View>
      <AppText variant="subheading" weight="600" style={{ marginTop: 15 }}>
        Typeface
      </AppText>
      <View style={styles.typefaceRow}>
        {['System', 'Serif', 'Dyslexic'].map((item, index) => (
          <TouchableOpacity key={item} style={styles.typeface}>
            <AppText
              variant={index === 1 ? 'heading' : 'subheading'}
              weight="600"
            >
              Aa
            </AppText>
            <AppText
              variant="caption"
              color={colors.body}
              style={{ marginTop: 4 }}
            >
              {item}
            </AppText>
          </TouchableOpacity>
        ))}
      </View>
      <AppText variant="subheading" weight="600" style={{ marginTop: 18 }}>
        Page theme
      </AppText>
      <View style={styles.themeRow}>
        {['Paper', 'Light', 'Dark'].map(item => (
          <TouchableOpacity
            key={item}
            onPress={() => setTheme(item)}
            style={[
              styles.themeChoice,
              theme === item && { borderColor: colors.blue },
            ]}
          >
            <View
              style={[
                styles.themeSample,
                {
                  backgroundColor:
                    item === 'Paper'
                      ? colors.sand
                      : item === 'Dark'
                      ? colors.night
                      : '#FFFFFF',
                },
              ]}
            />
            <AppText variant="caption" weight="600">
              {item}
            </AppText>
          </TouchableOpacity>
        ))}
      </View>
      <AppText variant="subheading" weight="600" style={{ marginTop: 18 }}>
        Line spacing
      </AppText>
      <View style={styles.chipRow}>
        {['Compact', 'Comfortable', 'Wide'].map(item => (
          <Chip key={item} label={item} selected={item === 'Comfortable'} />
        ))}
      </View>
      <View style={styles.rtlNote}>
        <AppText variant="caption" color={colors.body}>
          This publication is Amharic. Reader direction and script support
          follow the edition settings.
        </AppText>
      </View>
      <PrimaryButton
        title="Done"
        onPress={() => navigation.goBack()}
        style={{ marginTop: 22 }}
      />
    </Page>
  );
}

const styles = StyleSheet.create({
  reader: {
    flex: 1,
    backgroundColor: '#FBF9F4',
    paddingHorizontal: 22,
    paddingTop: 8,
    paddingBottom: 12,
  },
  readerTop: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  readerIcon: { backgroundColor: '#F1EEE6' },
  readerText: {
    paddingTop: 52,
    paddingBottom: 38,
    maxWidth: 520,
    alignSelf: 'center',
  },
  bookParagraph: {
    fontFamily: 'Georgia',
    fontSize: 18,
    color: '#293642',
    lineHeight: 31,
    marginBottom: 20,
  },
  annotation: {
    backgroundColor: '#EAF6FC',
    borderRadius: radius.md,
    paddingHorizontal: 13,
    paddingVertical: 11,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
  },
  readerBottom: { paddingTop: 10 },
  readerProgress: {
    height: 3,
    backgroundColor: '#E4E3DE',
    borderRadius: 3,
    overflow: 'hidden',
  },
  readerProgressFill: { height: '100%', backgroundColor: colors.blue },
  readerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  readerAction: { alignItems: 'center', minWidth: 50 },
  markPage: { alignItems: 'center', paddingTop: 5 },
  sheetHandle: {
    width: 38,
    height: 4,
    borderRadius: 3,
    backgroundColor: colors.line,
    alignSelf: 'center',
    marginBottom: 14,
  },
  sheetHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 11 },
  typefaceRow: { flexDirection: 'row', gap: 10, marginTop: 11 },
  typeface: {
    width: 94,
    height: 72,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  themeRow: { flexDirection: 'row', gap: 10, marginTop: 11 },
  themeChoice: {
    width: 92,
    padding: 7,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radius.md,
    alignItems: 'center',
    gap: 6,
  },
  themeSample: {
    height: 37,
    width: '100%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.line,
  },
  rtlNote: {
    marginTop: 18,
    padding: 12,
    backgroundColor: colors.surfaceSubtle,
    borderRadius: radius.md,
  },
});
