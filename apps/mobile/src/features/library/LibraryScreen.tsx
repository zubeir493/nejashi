import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import {
  ChevronRight,
  Download,
  Headphones,
  MoreHorizontal,
  Search,
} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import {
  AppText,
  BookCover,
  Chip,
  Page,
  PageHeading,
  ProgressBar,
} from '../../design-system/components';
import { colors, radius } from '../../design-system/theme';

const ownedBooks = [
  {
    title: 'Purposeful Living',
    author: 'Omar Suleiman',
    progress: 42,
    kind: 'Ebook',
    downloaded: true,
    index: 3,
  },
  {
    title: 'The Sealed Nectar',
    author: 'Safi al-Rahman',
    progress: 63,
    kind: 'Audiobook',
    downloaded: true,
    index: 0,
  },
  {
    title: 'The Forty Hadith',
    author: 'Imam al-Nawawi',
    progress: 18,
    kind: 'Ebook',
    downloaded: false,
    index: 1,
  },
];

export function LibraryScreen() {
  const navigation = useNavigation<any>();
  const [filter, setFilter] = useState('All');
  const filtered = ownedBooks.filter(book =>
    filter === 'All'
      ? true
      : filter === 'Downloaded'
      ? book.downloaded
      : book.kind === filter,
  );
  return (
    <Page contentStyle={{ paddingTop: 15, paddingBottom: 130 }}>
      <PageHeading
        title="Your library"
        subtitle="Everything you own, ready when you are."
        right={
          <TouchableOpacity
            onPress={() => navigation.navigate('Downloads')}
            style={styles.topIcon}
          >
            <Search size={19} color={colors.body} />
          </TouchableOpacity>
        }
      />
      <View style={styles.filterRow}>
        {['All', 'Ebooks', 'Audiobooks', 'Downloaded'].map(label => (
          <Chip
            key={label}
            label={label}
            selected={
              filter === label ||
              (label === 'Ebooks' && filter === 'Ebook') ||
              (label === 'Audiobooks' && filter === 'Audiobook')
            }
            onPress={() =>
              setFilter(
                label === 'Ebooks'
                  ? 'Ebook'
                  : label === 'Audiobooks'
                  ? 'Audiobook'
                  : label,
              )
            }
          />
        ))}
      </View>
      <View style={styles.librarySummary}>
        <View>
          <AppText variant="caption" color={colors.body}>
            YOUR COLLECTION
          </AppText>
          <AppText variant="heading" weight="700" style={{ marginTop: 3 }}>
            {ownedBooks.length} titles
          </AppText>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Downloads')}
          style={styles.downloadSummary}
        >
          <Download size={17} color={colors.blueDeep} />
          <AppText variant="caption" weight="600" color={colors.blueDeep}>
            Downloads
          </AppText>
          <ChevronRight size={15} color={colors.blueDeep} />
        </TouchableOpacity>
      </View>
      {filtered.map((book, index) => (
        <TouchableOpacity
          key={book.title}
          onPress={() =>
            navigation.navigate(
              book.kind === 'Ebook' ? 'Reader' : 'AudioPlayer',
            )
          }
          activeOpacity={0.78}
          style={styles.bookRow}
        >
          <BookCover
            title={book.title}
            author={book.author}
            index={book.index}
            width={76}
            height={112}
          />
          <View style={{ flex: 1, marginLeft: 14 }}>
            <View style={styles.titleRow}>
              <AppText weight="700" numberOfLines={1} style={{ flex: 1 }}>
                {book.title}
              </AppText>
              <MoreHorizontal size={19} color={colors.muted} />
            </View>
            <AppText
              variant="caption"
              color={colors.body}
              style={{ marginTop: 3 }}
            >
              {book.author}
            </AppText>
            <AppText
              variant="caption"
              color={colors.muted}
              style={{ marginTop: 8 }}
            >
              {book.kind === 'Ebook'
                ? `${book.progress}% read`
                : `Chapter ${Math.ceil(book.progress / 14)} · 1h 23m left`}
            </AppText>
            <ProgressBar value={book.progress} />
            <View style={styles.actionLine}>
              <AppText variant="caption" color={colors.blueDeep} weight="600">
                {book.kind === 'Ebook'
                  ? 'Continue reading'
                  : 'Continue listening'}
              </AppText>
              <TouchableOpacity
                accessibilityLabel="Download title"
                style={styles.downloadButton}
              >
                <Download size={15} color={colors.body} />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        onPress={() => navigation.navigate('Discover')}
        style={styles.emptyPrompt}
      >
        <AppText weight="600">Find something new to read</AppText>
        <ChevronRight size={17} color={colors.blueDeep} />
      </TouchableOpacity>
    </Page>
  );
}

const styles = StyleSheet.create({
  topIcon: {
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceSubtle,
  },
  filterRow: { flexDirection: 'row', gap: 7, marginBottom: 20 },
  librarySummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderColor: colors.line,
    marginBottom: 3,
  },
  downloadSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.blueSoft,
    paddingHorizontal: 10,
    paddingVertical: 9,
    borderRadius: radius.pill,
  },
  bookRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: colors.line,
  },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  actionLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 7,
  },
  downloadButton: {
    width: 31,
    height: 31,
    borderRadius: 16,
    backgroundColor: colors.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyPrompt: {
    marginTop: 20,
    minHeight: 53,
    borderRadius: radius.md,
    paddingHorizontal: 15,
    backgroundColor: colors.surfaceSubtle,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
