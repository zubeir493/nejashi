import React from 'react';
import { ScrollView, TouchableOpacity, View, StyleSheet } from 'react-native';
import {
  ArrowUpRight,
  BookOpen,
  Headphones,
  Sparkles,
} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import {
  AppText,
  BookTile,
  Page,
  PageHeading,
  SearchField,
  SectionHeading,
} from '../../design-system/components';
import { colors, radius } from '../../design-system/theme';

const themes = [
  {
    title: 'Prophetic biography',
    detail: 'Lives, teachings and history',
    tint: '#ECF6FA',
    icon: BookOpen,
  },
  {
    title: 'Faith & worship',
    detail: 'Build a steady practice',
    tint: '#F0F5F1',
    icon: Sparkles,
  },
  {
    title: 'Listen & learn',
    detail: 'Audiobooks for your day',
    tint: '#F6F2EA',
    icon: Headphones,
  },
];

export function DiscoverScreen() {
  const navigation = useNavigation<any>();
  return (
    <Page contentStyle={{ paddingTop: 15, paddingBottom: 130 }}>
      <PageHeading
        title="Discover"
        subtitle="Thoughtful books for every season."
      />
      <SearchField onPress={() => navigation.navigate('Search')} />
      <SectionHeading title="Browse by subject" />
      {themes.map(({ title, detail, tint, icon: Icon }) => (
        <TouchableOpacity
          key={title}
          onPress={() => navigation.navigate('Category', { title })}
          activeOpacity={0.8}
          style={[styles.themeRow, { backgroundColor: tint }]}
        >
          <View style={styles.themeIcon}>
            <Icon size={19} color={colors.blueDeep} strokeWidth={1.8} />
          </View>
          <View style={{ flex: 1 }}>
            <AppText weight="700">{title}</AppText>
            <AppText
              variant="caption"
              color={colors.body}
              style={{ marginTop: 2 }}
            >
              {detail}
            </AppText>
          </View>
          <ArrowUpRight size={18} color={colors.body} />
        </TouchableOpacity>
      ))}
      <SectionHeading
        title="Curated for you"
        action="View all"
        onAction={() =>
          navigation.navigate('Collection', { title: 'Curated for you' })
        }
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 20 }}
      >
        {[
          ['A life of learning', '12 books'],
          ['Small acts, lasting change', '8 books'],
          ['Stories that guide us', '16 books'],
        ].map(([title, count], index) => (
          <TouchableOpacity
            key={title}
            onPress={() => navigation.navigate('Collection', { title })}
            style={[
              styles.collection,
              {
                backgroundColor: [colors.blueSoft, colors.mint, colors.sand][
                  index
                ],
              },
            ]}
          >
            <AppText variant="eyebrow" color={colors.blueDeep}>
              NEJASHI PICKS
            </AppText>
            <AppText
              variant="subheading"
              weight="700"
              style={{ marginTop: 18 }}
            >
              {title}
            </AppText>
            <AppText
              variant="caption"
              color={colors.body}
              style={{ marginTop: 6 }}
            >
              {count}
            </AppText>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <SectionHeading
        title="Authors to know"
        action="All authors"
        onAction={() => navigation.navigate('Author', { title: 'Authors' })}
      />
      <View style={styles.authorRow}>
        {['Imam al-Nawawi', 'Ibn al-Jawzi', 'Omar Suleiman'].map(
          (name, index) => (
            <TouchableOpacity
              key={name}
              onPress={() => navigation.navigate('Author', { title: name })}
              style={styles.authorItem}
            >
              <View
                style={[
                  styles.authorPortrait,
                  { backgroundColor: ['#DFEEF4', '#E8ECE5', '#F1E8DD'][index] },
                ]}
              >
                <AppText variant="heading" weight="600" color={colors.blueDeep}>
                  {name.charAt(0)}
                </AppText>
              </View>
              <AppText
                variant="caption"
                weight="600"
                numberOfLines={2}
                style={{ textAlign: 'center', marginTop: 8 }}
              >
                {name}
              </AppText>
            </TouchableOpacity>
          ),
        )}
      </View>
      <SectionHeading
        title="Popular audiobooks"
        action="Listen"
        onAction={() => navigation.navigate('Listen')}
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 20 }}
      >
        {[
          ['The Sealed Nectar', 'Safi al-Rahman'],
          ['Purification of the Soul', 'Ibn al-Qayyim'],
          ['Stories of the Prophets', 'Ibn Kathir'],
        ].map(([title, author], index) => (
          <BookTile
            key={title}
            title={title}
            author={author}
            index={index + 2}
            onPress={() => navigation.navigate('BookDetail')}
          />
        ))}
      </ScrollView>
    </Page>
  );
}

const styles = StyleSheet.create({
  themeRow: {
    borderRadius: radius.md,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 9,
  },
  themeIcon: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  collection: {
    width: 188,
    height: 144,
    borderRadius: radius.md,
    padding: 16,
    marginRight: 11,
    justifyContent: 'space-between',
  },
  authorRow: { flexDirection: 'row', gap: 18, marginBottom: 9 },
  authorItem: { width: 78, alignItems: 'center' },
  authorPortrait: {
    width: 62,
    height: 62,
    borderRadius: 31,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
