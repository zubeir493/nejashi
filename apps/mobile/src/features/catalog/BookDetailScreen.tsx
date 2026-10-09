import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, View, StyleSheet } from 'react-native';
import {
  Bookmark,
  Check,
  ChevronRight,
  Headphones,
  Share2,
} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import {
  AppText,
  BackHeader,
  BookCover,
  Chip,
  Page,
  PrimaryButton,
  SectionHeading,
} from '../../design-system/components';
import { colors, radius, space } from '../../design-system/theme';

const formats = [
  { label: 'Ebook', price: '180 ETB', note: 'Read on your devices' },
  { label: 'Audiobook', price: '240 ETB', note: '6 hr 42 min · 18 chapters' },
  { label: 'Both formats', price: '320 ETB', note: 'Save 100 ETB' },
];

export function BookDetailScreen() {
  const navigation = useNavigation<any>();
  const [format, setFormat] = useState('Ebook');
  const [tab, setTab] = useState('About');
  const selectedFormat =
    formats.find(item => item.label === format) ?? formats[0];
  return (
    <Page contentStyle={{ paddingTop: 10, paddingBottom: 34 }}>
      <BackHeader
        title="Book details"
        right={
          <TouchableOpacity accessibilityLabel="Save book">
            <Bookmark size={20} color={colors.body} />
          </TouchableOpacity>
        }
      />
      <View style={styles.hero}>
        <BookCover
          title="Riyad as-Salihin"
          author="Imam al-Nawawi"
          index={1}
          width={136}
          height={202}
        />
        <View style={styles.heroText}>
          <AppText variant="eyebrow" color={colors.blueDeep}>
            A CLASSIC COLLECTION
          </AppText>
          <AppText
            variant="title"
            weight="700"
            style={{ marginTop: 7, letterSpacing: -0.8, lineHeight: 35 }}
          >
            Riyad as-Salihin
          </AppText>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Author', { title: 'Imam al-Nawawi' })
            }
          >
            <AppText color={colors.body} style={{ marginTop: 5 }}>
              Imam al-Nawawi
            </AppText>
          </TouchableOpacity>
          <AppText
            variant="caption"
            color={colors.muted}
            style={{ marginTop: 8 }}
          >
            Amharic edition · Dar al-Minhaj
          </AppText>
          <View style={styles.rating}>
            <AppText color={colors.gold} weight="700">
              4.9
            </AppText>
            <AppText color={colors.body} variant="caption">
              {' '}
              · 2,408 reviews
            </AppText>
          </View>
        </View>
      </View>
      <View style={styles.contributors}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Author', { title: 'Imam al-Nawawi' })
          }
        >
          <AppText variant="caption" color={colors.muted}>
            AUTHOR
          </AppText>
          <AppText weight="600" style={{ marginTop: 3 }}>
            Imam al-Nawawi
          </AppText>
        </TouchableOpacity>
        <View style={styles.divider} />
        <View>
          <AppText variant="caption" color={colors.muted}>
            TRANSLATOR
          </AppText>
          <AppText weight="600" style={{ marginTop: 3 }}>
            Abdullah Yusuf
          </AppText>
        </View>
      </View>
      <View style={styles.formatHeader}>
        <AppText variant="heading" weight="700">
          Choose a format
        </AppText>
        <AppText variant="caption" color={colors.body}>
          Your purchase adds a format-specific license.
        </AppText>
      </View>
      <View style={{ gap: 9 }}>
        {formats.map(item => (
          <TouchableOpacity
            key={item.label}
            onPress={() => setFormat(item.label)}
            activeOpacity={0.78}
            style={[
              styles.formatOption,
              format === item.label && styles.formatSelected,
            ]}
          >
            <View
              style={[
                styles.radio,
                format === item.label && styles.radioSelected,
              ]}
            >
              {format === item.label ? <View style={styles.radioDot} /> : null}
            </View>
            <View style={{ flex: 1 }}>
              <AppText weight="700">{item.label}</AppText>
              <AppText
                variant="caption"
                color={colors.body}
                style={{ marginTop: 2 }}
              >
                {item.note}
              </AppText>
            </View>
            <AppText weight="700">{item.price}</AppText>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.sampleActions}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Reader')}
          style={styles.sampleButton}
        >
          <AppText variant="caption" weight="600" color={colors.blueDeep}>
            Read sample
          </AppText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('AudioPlayer')}
          style={styles.sampleButton}
        >
          <Headphones size={15} color={colors.blueDeep} />
          <AppText variant="caption" weight="600" color={colors.blueDeep}>
            Listen sample
          </AppText>
        </TouchableOpacity>
      </View>
      <PrimaryButton
        title={`Buy ${format.toLowerCase()} · ${selectedFormat.price}`}
        onPress={() => navigation.navigate('Checkout')}
        style={{ marginTop: 14 }}
      />
      <View style={styles.detailTabs}>
        {['About', 'Chapters', 'Details'].map(item => (
          <TouchableOpacity key={item} onPress={() => setTab(item)}>
            <AppText
              weight={tab === item ? '700' : '500'}
              color={tab === item ? colors.blueDeep : colors.body}
              style={{ paddingVertical: 12 }}
            >
              {item}
            </AppText>
          </TouchableOpacity>
        ))}
      </View>
      {tab === 'About' ? (
        <AppText color={colors.body} style={{ lineHeight: 23 }}>
          A much-loved collection of hadith on character, worship, and the
          everyday practice of faith. This edition includes a clear Amharic
          translation and a carefully structured table of contents.
        </AppText>
      ) : null}
      {tab === 'Chapters' ? (
        <View>
          {[
            'Sincerity and intention',
            'Repentance',
            'Patience',
            'Truthfulness',
          ].map((item, index) => (
            <TouchableOpacity
              key={item}
              style={styles.chapterRow}
              onPress={() => navigation.navigate('Reader')}
            >
              <AppText variant="caption" color={colors.muted}>
                {String(index + 1).padStart(2, '0')}
              </AppText>
              <AppText style={{ flex: 1, marginLeft: 12 }}>{item}</AppText>
              <ChevronRight size={16} color={colors.muted} />
            </TouchableOpacity>
          ))}
        </View>
      ) : null}
      {tab === 'Details' ? (
        <View style={{ gap: 12 }}>
          {[
            ['Language', 'Amharic'],
            ['Publisher', 'Dar al-Minhaj'],
            ['Publication year', '2024'],
            ['ISBN', '978-1-73928-014-2'],
          ].map(([a, b]) => (
            <View key={a} style={styles.metadataRow}>
              <AppText color={colors.body}>{a}</AppText>
              <AppText weight="600">{b}</AppText>
            </View>
          ))}
        </View>
      ) : null}
      <View style={styles.relatedHead}>
        <SectionHeading
          title="From this author"
          action="More"
          onAction={() =>
            navigation.navigate('Author', { title: 'Imam al-Nawawi' })
          }
        />
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 22 }}
      >
        {['The Forty Hadith', 'Garden of the Seekers'].map((title, index) => (
          <View key={title} style={{ width: 72, marginRight: 12 }}>
            <BookCover
              title={title}
              author="Imam al-Nawawi"
              index={index + 1}
              width={72}
              height={106}
            />
            <AppText
              variant="caption"
              weight="600"
              numberOfLines={2}
              style={{ marginTop: 5 }}
            >
              {title}
            </AppText>
          </View>
        ))}
      </ScrollView>
    </Page>
  );
}

const styles = StyleSheet.create({
  hero: {
    flexDirection: 'row',
    gap: 19,
    alignItems: 'center',
    marginTop: 3,
    marginBottom: 20,
  },
  heroText: { flex: 1, alignItems: 'flex-start' },
  rating: { flexDirection: 'row', alignItems: 'center', marginTop: 9 },
  contributors: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.line,
    marginBottom: 20,
  },
  divider: {
    width: 1,
    height: 32,
    backgroundColor: colors.line,
    marginHorizontal: 20,
  },
  formatHeader: { marginBottom: 12, gap: 3 },
  formatOption: {
    minHeight: 66,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.line,
    paddingHorizontal: 13,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  formatSelected: {
    backgroundColor: colors.blueSoft,
    borderColor: colors.blue,
  },
  radio: {
    width: 19,
    height: 19,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: colors.muted,
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
  sampleActions: { flexDirection: 'row', gap: 10, marginTop: 14 },
  sampleButton: {
    flex: 1,
    minHeight: 42,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceSubtle,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },
  detailTabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 24,
    marginBottom: 13,
    borderBottomWidth: 1,
    borderColor: colors.line,
  },
  chapterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 47,
    borderBottomWidth: 1,
    borderColor: colors.line,
  },
  metadataRow: { flexDirection: 'row', justifyContent: 'space-between' },
  relatedHead: { marginTop: 20 },
});
