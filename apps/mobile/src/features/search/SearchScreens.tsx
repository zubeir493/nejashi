import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import {
  ArrowRight,
  Clock3,
  Search as SearchIcon,
  X,
} from 'lucide-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  AppText,
  BackHeader,
  BookListRow,
  Chip,
  IconButton,
  Page,
  SearchField,
  SectionHeading,
} from '../../design-system/components';
import { colors, radius } from '../../design-system/theme';

const suggestions = [
  'Prophetic biography',
  'Patience',
  'Amharic books',
  'Audiobooks',
];
const resultRows = [
  ['Riyad as-Salihin', 'Imam al-Nawawi', 'Ebook · Amharic · 180 ETB'],
  [
    'The Sealed Nectar',
    'Safi al-Rahman al-Mubarakfuri',
    'Ebook + Audiobook · English',
  ],
  ['Purification of the Soul', 'Ibn al-Qayyim', 'Audiobook · Arabic · 240 ETB'],
  ['The Forty Hadith', 'Imam al-Nawawi', 'Ebook · English · 120 ETB'],
];

export function SearchScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const [query, setQuery] = useState(route.params?.query ?? '');
  const submit = (value = query) =>
    navigation.navigate('SearchResults', { query: value });
  return (
    <Page contentStyle={{ paddingTop: 10, paddingBottom: 30 }}>
      <BackHeader title="Search" />
      <SearchField
        value={query}
        onChangeText={setQuery}
        placeholder="Books, authors, narrators..."
      />
      <SectionHeading title="Popular searches" />
      <View style={styles.chips}>
        {suggestions.map(item => (
          <Chip
            key={item}
            label={item}
            onPress={() => {
              setQuery(item);
              submit(item);
            }}
          />
        ))}
      </View>
      <SectionHeading title="Recently searched" />
      {['Riyad as-Salihin', 'Books in Amharic', 'Stories of the Prophets'].map(
        item => (
          <TouchableOpacity
            key={item}
            onPress={() => submit(item)}
            style={styles.recentRow}
          >
            <Clock3 size={17} color={colors.muted} />
            <AppText style={{ flex: 1, marginLeft: 12 }}>{item}</AppText>
            <ArrowRight size={16} color={colors.muted} />
          </TouchableOpacity>
        ),
      )}
      <View style={styles.searchInfo}>
        <SearchIcon size={18} color={colors.blueDeep} />
        <AppText
          variant="caption"
          color={colors.body}
          style={{ flex: 1, marginLeft: 10 }}
        >
          Search titles, authors, translators, narrators, series and subjects.
        </AppText>
      </View>
    </Page>
  );
}

export function SearchResultsScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const query = route.params?.query ?? 'books';
  const [filter, setFilter] = useState('All');
  return (
    <Page contentStyle={{ paddingTop: 10, paddingBottom: 32 }}>
      <BackHeader
        title="Search results"
        right={
          <IconButton
            accessibilityLabel="Refine search"
            onPress={() => navigation.navigate('Search')}
          >
            <SearchIcon size={18} color={colors.body} />
          </IconButton>
        }
      />
      <AppText variant="heading" weight="700" style={{ marginBottom: 3 }}>
        Results for “{query}”
      </AppText>
      <AppText
        variant="caption"
        color={colors.body}
        style={{ marginBottom: 16 }}
      >
        28 titles and 6 contributors
      </AppText>
      <View style={styles.chips}>
        {['All', 'Ebooks', 'Audiobooks', 'Authors'].map(item => (
          <Chip
            key={item}
            label={item}
            selected={filter === item}
            onPress={() => setFilter(item)}
          />
        ))}
      </View>
      <SectionHeading title="Books" action="Sort" onAction={() => {}} />
      {resultRows.map(([title, author, metadata], index) => (
        <BookListRow
          key={title}
          title={title}
          author={author}
          index={index}
          metadata={metadata}
          onPress={() => navigation.navigate('BookDetail')}
        />
      ))}
      <SectionHeading title="Contributors" action="See all" />
      {['Imam al-Nawawi', 'Ibn al-Qayyim', 'Omar Suleiman'].map(
        (name, index) => (
          <TouchableOpacity
            key={name}
            onPress={() => navigation.navigate('Author', { title: name })}
            style={styles.contributorRow}
          >
            <View
              style={[
                styles.contributorAvatar,
                {
                  backgroundColor: [colors.blueSoft, colors.mint, colors.sand][
                    index
                  ],
                },
              ]}
            >
              <AppText weight="700" color={colors.blueDeep}>
                {name.charAt(0)}
              </AppText>
            </View>
            <AppText weight="600" style={{ flex: 1, marginLeft: 12 }}>
              {name}
            </AppText>
            <ArrowRight size={16} color={colors.muted} />
          </TouchableOpacity>
        ),
      )}
    </Page>
  );
}

const styles = StyleSheet.create({
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 17 },
  recentRow: {
    minHeight: 47,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: colors.line,
  },
  searchInfo: {
    marginTop: 24,
    padding: 14,
    borderRadius: radius.md,
    backgroundColor: colors.blueSoft,
    flexDirection: 'row',
    alignItems: 'center',
  },
  contributorRow: {
    minHeight: 58,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: colors.line,
  },
  contributorAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
