import React from 'react';
import { ScrollView, TouchableOpacity, View, StyleSheet } from 'react-native';
import { ArrowUpRight, BookOpen, Headphones } from 'lucide-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  AppText,
  BackHeader,
  BookCover,
  BookListRow,
  Chip,
  Page,
  SectionHeading,
} from '../../design-system/components';
import { colors, radius } from '../../design-system/theme';

const titles = [
  ['Riyad as-Salihin', 'Imam al-Nawawi', 'Ebook · Amharic'],
  ['The Forty Hadith', 'Imam al-Nawawi', 'Ebook + Audiobook · English'],
  ['A Garden of the Seekers', 'Imam al-Nawawi', 'Audiobook · Arabic'],
  ['Purification of the Soul', 'Ibn al-Qayyim', 'Ebook · Arabic'],
];

export function EditorialScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const routeName = route.name ?? 'Collection';
  const label =
    route.params?.title ??
    (routeName === 'Author'
      ? 'Contributors'
      : routeName === 'Series'
      ? 'Series'
      : 'Featured collection');
  const isAuthor = routeName === 'Author';
  return (
    <Page contentStyle={{ paddingTop: 10, paddingBottom: 32 }}>
      <BackHeader
        title={
          isAuthor ? 'Author' : routeName === 'Series' ? 'Series' : 'Browse'
        }
      />
      {isAuthor ? (
        <View style={styles.authorHero}>
          <View style={styles.authorAvatar}>
            <AppText variant="title" weight="600" color={colors.blueDeep}>
              ن
            </AppText>
          </View>
          <View style={{ flex: 1 }}>
            <AppText
              variant="title"
              weight="700"
              style={{ letterSpacing: -0.5 }}
            >
              {label}
            </AppText>
            <AppText
              variant="caption"
              color={colors.body}
              style={{ marginTop: 4 }}
            >
              Scholar · 12 titles in Nejashi
            </AppText>
          </View>
        </View>
      ) : (
        <View style={styles.collectionHero}>
          <AppText variant="eyebrow" color={colors.blueDeep}>
            {routeName === 'Category' ? 'SUBJECT' : 'CURATED COLLECTION'}
          </AppText>
          <AppText
            variant="title"
            weight="700"
            style={{ marginTop: 7, letterSpacing: -0.7 }}
          >
            {label}
          </AppText>
          <AppText color={colors.body} style={{ marginTop: 7, lineHeight: 22 }}>
            A considered selection of books to help you explore this subject in
            depth.
          </AppText>
          <AppText
            variant="caption"
            color={colors.muted}
            style={{ marginTop: 10 }}
          >
            18 books · 7 audiobooks
          </AppText>
        </View>
      )}
      {routeName === 'Series' ? (
        <View style={styles.seriesCard}>
          <BookCover
            title="Stories of the Prophets"
            author="Ibn Kathir"
            index={1}
            width={75}
            height={111}
          />
          <View style={{ flex: 1, marginLeft: 14 }}>
            <AppText variant="subheading" weight="700">
              Stories of the Prophets
            </AppText>
            <AppText
              variant="caption"
              color={colors.body}
              style={{ marginTop: 4 }}
            >
              A 4-volume series
            </AppText>
            <TouchableOpacity
              style={{ marginTop: 11 }}
              onPress={() => navigation.navigate('BookDetail')}
            >
              <AppText variant="caption" weight="700" color={colors.blueDeep}>
                View series
              </AppText>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
      <View style={styles.filterRow}>
        <Chip label="All formats" selected />
        <Chip label="Ebooks" />
        <Chip label="Audiobooks" />
      </View>
      <SectionHeading title="Titles" action="Filter" onAction={() => {}} />
      {titles.map(([title, author, metadata], index) => (
        <BookListRow
          key={title}
          title={title}
          author={author}
          index={index}
          metadata={metadata}
          onPress={() => navigation.navigate('BookDetail')}
          action={
            index === 1 ? (
              <Headphones size={17} color={colors.blueDeep} />
            ) : (
              <ArrowUpRight size={17} color={colors.muted} />
            )
          }
        />
      ))}
      <SectionHeading
        title="More to explore"
        action="Discover"
        onAction={() => navigation.navigate('Discover')}
      />
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {['Faith & practice', 'Lives & history', 'Character'].map(
          (item, index) => (
            <TouchableOpacity
              key={item}
              onPress={() => navigation.navigate('Collection', { title: item })}
              style={[
                styles.moreTile,
                {
                  backgroundColor: [colors.blueSoft, colors.mint, colors.sand][
                    index
                  ],
                },
              ]}
            >
              <BookOpen size={19} color={colors.blueDeep} />
              <AppText weight="600" style={{ marginTop: 9 }}>
                {item}
              </AppText>
            </TouchableOpacity>
          ),
        )}
      </ScrollView>
    </Page>
  );
}

const styles = StyleSheet.create({
  authorHero: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginBottom: 23,
  },
  authorAvatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.blueSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  collectionHero: {
    paddingVertical: 17,
    paddingHorizontal: 18,
    backgroundColor: colors.blueSoft,
    borderRadius: radius.lg,
    marginBottom: 20,
  },
  filterRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  seriesCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    backgroundColor: colors.surfaceSubtle,
    borderRadius: radius.md,
    marginBottom: 18,
  },
  moreTile: {
    width: 142,
    height: 106,
    borderRadius: radius.md,
    padding: 15,
    marginRight: 10,
    justifyContent: 'center',
  },
});
