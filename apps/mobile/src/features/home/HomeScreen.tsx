import React from 'react';
import { ScrollView, TouchableOpacity, View, StyleSheet } from 'react-native';
import { ChevronRight, CircleUserRound } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import {
  AppText,
  BookCover,
  BookTile,
  Page,
  ProgressBar,
  SearchField,
  SectionHeading,
} from '../../design-system/components';
import { colors, radius, space } from '../../design-system/theme';

const popular = [
  ['Riyad as-Salihin', 'Imam al-Nawawi'],
  ['The Righteous Character', 'Muhammad al-Ghazali'],
  ['Love and Patience', 'Lessons from the Prophets'],
  ['The Sealed Nectar', 'Safi al-Rahman'],
];

export function HomeScreen() {
  const navigation = useNavigation<any>();
  const openBook = () =>
    navigation.navigate('BookDetail', { bookId: 'sealed-nectar' });
  return (
    <Page contentStyle={{ paddingTop: 12, paddingBottom: 130 }}>
      <View style={styles.topBar}>
        <SearchField
          onPress={() => navigation.navigate('Search')}
          placeholder="Search books, authors or topics"
          style={styles.homeSearch}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile')}
          accessibilityLabel="Open profile"
          style={styles.profileButton}
        >
          <CircleUserRound
            size={22}
            color={colors.blueDeep}
            strokeWidth={1.7}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.featured}>
        <TouchableOpacity onPress={openBook} activeOpacity={0.8}>
          <BookCover
            title="The Sealed Nectar"
            author="Safi al-Rahman"
            index={0}
            width={112}
            height={164}
          />
        </TouchableOpacity>
        <View style={styles.featureCopy}>
          <AppText variant="eyebrow" color={colors.blueDeep}>
            NEW THIS WEEK
          </AppText>
          <AppText
            variant="heading"
            weight="700"
            style={{ marginTop: 7, letterSpacing: -0.4 }}
          >
            The Sealed Nectar
          </AppText>
          <AppText
            variant="caption"
            color={colors.body}
            style={{ marginTop: 5, letterSpacing: 0.5 }}
          >
            BIOGRAPHY · ENGLISH
          </AppText>
          <AppText
            variant="caption"
            color={colors.body}
            style={{ marginTop: 9, lineHeight: 18 }}
            numberOfLines={3}
          >
            A clear, authoritative biography of the Prophet Muhammad ﷺ.
          </AppText>
          <TouchableOpacity
            onPress={openBook}
            style={styles.viewBook}
            activeOpacity={0.8}
          >
            <AppText variant="caption" weight="700" color={colors.blueDeep}>
              View book
            </AppText>
            <ChevronRight size={15} color={colors.blueDeep} />
          </TouchableOpacity>
        </View>
      </View>

      <SectionHeading
        title="Explore collections"
        action="See all"
        onAction={() =>
          navigation.navigate('Collection', { title: 'Collections' })
        }
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 9, paddingBottom: 5 }}
      >
        {['Prophetic biography', 'Worship', 'Character', 'History'].map(
          (item, index) => (
            <TouchableOpacity
              key={item}
              onPress={() => navigation.navigate('Collection', { title: item })}
              style={[
                styles.collectionPill,
                index === 0 && styles.collectionPillActive,
              ]}
            >
              <AppText
                variant="caption"
                weight="600"
                color={index === 0 ? colors.blueDeep : colors.body}
              >
                {item}
              </AppText>
            </TouchableOpacity>
          ),
        )}
      </ScrollView>

      <SectionHeading
        title="Popular this week"
        action="See all"
        onAction={() =>
          navigation.navigate('Category', { title: 'Popular this week' })
        }
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 20 }}
      >
        {popular.map(([title, author], index) => (
          <BookTile
            key={title}
            title={title}
            author={author}
            index={index + 1}
            onPress={openBook}
          />
        ))}
      </ScrollView>

      <View style={styles.continueHeading}>
        <AppText variant="subheading" weight="700">
          Pick up where you left off
        </AppText>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Reader')}
        activeOpacity={0.75}
        style={styles.continueRow}
      >
        <BookCover
          title="Purposeful Living"
          author="Omar Suleiman"
          index={3}
          width={48}
          height={68}
          compact
        />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <View style={styles.continueTop}>
            <AppText weight="600">Purposeful Living</AppText>
            <AppText variant="caption" color={colors.body}>
              42%
            </AppText>
          </View>
          <AppText
            variant="caption"
            color={colors.muted}
            style={{ marginBottom: 7 }}
          >
            Omar Suleiman · Ebook
          </AppText>
          <ProgressBar value={42} />
        </View>
        <ChevronRight
          size={18}
          color={colors.muted}
          style={{ marginLeft: 8 }}
        />
      </TouchableOpacity>
    </Page>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 15,
  },
  homeSearch: { flex: 1, marginBottom: 0 },
  profileButton: {
    height: 44,
    width: 44,
    borderRadius: radius.pill,
    backgroundColor: colors.blueSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featured: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 17,
    paddingVertical: 5,
    marginBottom: 17,
  },
  featureCopy: { flex: 1, alignItems: 'flex-start' },
  viewBook: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 11,
    minHeight: 33,
    paddingHorizontal: 13,
    backgroundColor: colors.blueSoft,
    borderRadius: radius.pill,
    gap: 2,
  },
  collectionPill: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceSubtle,
  },
  collectionPillActive: {
    backgroundColor: colors.blueSoft,
    borderWidth: 1,
    borderColor: colors.blueLine,
  },
  continueHeading: { marginTop: 16, marginBottom: 8 },
  continueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.line,
  },
  continueTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
});
