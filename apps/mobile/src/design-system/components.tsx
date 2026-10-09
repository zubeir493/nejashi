import React, { PropsWithChildren } from 'react';
import {
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { Search } from 'lucide-react-native';
import { ArrowLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Circle, Path } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, radius, space, type } from './theme';

export function Page({
  children,
  contentStyle,
  scroll = true,
}: PropsWithChildren<{
  contentStyle?: StyleProp<ViewStyle>;
  scroll?: boolean;
}>) {
  if (!scroll) {
    return (
      <SafeAreaView edges={['top']} style={styles.safePage}>
        <View style={[styles.pageFixed, contentStyle]}>{children}</View>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView edges={['top']} style={styles.safePage}>
      <ScrollView
        style={styles.page}
        contentContainerStyle={[styles.pageContent, contentStyle]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

export function AppText({
  children,
  variant = 'body',
  color = colors.ink,
  weight,
  style,
  numberOfLines,
}: PropsWithChildren<{
  variant?:
    | 'large'
    | 'title'
    | 'heading'
    | 'subheading'
    | 'body'
    | 'caption'
    | 'eyebrow';
  color?: string;
  weight?: TextStyle['fontWeight'];
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
}>) {
  const size =
    variant === 'large'
      ? 34
      : variant === 'title'
      ? type.title
      : variant === 'heading'
      ? type.heading
      : variant === 'subheading'
      ? type.subheading
      : variant === 'caption' || variant === 'eyebrow'
      ? type.caption
      : type.body;
  return (
    <Text
      numberOfLines={numberOfLines}
      style={[
        {
          color,
          fontSize: size,
          fontWeight: weight ?? (variant === 'eyebrow' ? '700' : '400'),
          letterSpacing: variant === 'eyebrow' ? 1.1 : 0,
          lineHeight: Math.round(size * 1.35),
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

export function PageHeading({
  title,
  subtitle,
  right,
}: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
}) {
  return (
    <View style={styles.headingRow}>
      <View style={{ flex: 1 }}>
        <AppText variant="title" weight="700" style={{ letterSpacing: -0.7 }}>
          {title}
        </AppText>
        {subtitle ? (
          <AppText color={colors.body} style={{ marginTop: 4 }}>
            {subtitle}
          </AppText>
        ) : null}
      </View>
      {right}
    </View>
  );
}

export function BackHeader({
  title,
  right,
}: {
  title: string;
  right?: React.ReactNode;
}) {
  const navigation = useNavigation<any>();
  return (
    <View style={styles.backHeader}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        accessibilityRole="button"
        accessibilityLabel="Go back"
        style={styles.backButton}
      >
        <ArrowLeft size={21} color={colors.ink} />
      </TouchableOpacity>
      <AppText
        variant="subheading"
        weight="700"
        numberOfLines={1}
        style={{ flex: 1, textAlign: 'center' }}
      >
        {title}
      </AppText>
      <View style={{ width: 42, alignItems: 'flex-end' }}>
        {right ?? <View style={{ width: 32 }} />}
      </View>
    </View>
  );
}

export function SectionHeading({
  title,
  action,
  onAction,
}: {
  title: string;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <View style={styles.sectionHeading}>
      <AppText variant="heading" weight="700" style={{ letterSpacing: -0.35 }}>
        {title}
      </AppText>
      {action ? (
        <TouchableOpacity onPress={onAction} hitSlop={8}>
          <AppText color={colors.blueDeep} weight="600">
            {action}
          </AppText>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

export function PrimaryButton({
  title,
  onPress,
  icon,
  disabled = false,
  style,
}: {
  title: string;
  onPress?: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.82}
      disabled={disabled}
      onPress={onPress}
      style={[styles.primaryButton, disabled && { opacity: 0.45 }, style]}
    >
      {icon}
      <AppText color="#FFFFFF" weight="700">
        {title}
      </AppText>
    </TouchableOpacity>
  );
}

export function SecondaryButton({
  title,
  onPress,
  style,
}: {
  title: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={onPress}
      style={[styles.secondaryButton, style]}
    >
      <AppText color={colors.blueDeep} weight="600">
        {title}
      </AppText>
    </TouchableOpacity>
  );
}

export function IconButton({
  children,
  onPress,
  accessibilityLabel,
  style,
}: PropsWithChildren<{
  onPress?: () => void;
  accessibilityLabel: string;
  style?: StyleProp<ViewStyle>;
}>) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      activeOpacity={0.72}
      style={[styles.iconButton, style]}
    >
      {children}
    </TouchableOpacity>
  );
}

export function SearchField({
  placeholder = 'Search books, authors or topics',
  onPress,
  value,
  onChangeText,
  style,
}: {
  placeholder?: string;
  onPress?: () => void;
  value?: string;
  onChangeText?: (value: string) => void;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={[styles.searchField, style]}
    >
      <Search size={19} color={colors.muted} strokeWidth={1.8} />
      <TextInput
        editable={Boolean(onChangeText)}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        style={styles.searchInput}
        returnKeyType="search"
      />
    </TouchableOpacity>
  );
}

export function Chip({
  label,
  selected = false,
  onPress,
}: {
  label: string;
  selected?: boolean;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.75}
      style={[styles.chip, selected && styles.chipSelected]}
    >
      <AppText
        variant="caption"
        weight="600"
        color={selected ? colors.blueDeep : colors.body}
      >
        {label}
      </AppText>
    </TouchableOpacity>
  );
}

const coverPalettes = [
  { background: '#F2EBDD', ink: '#31516A', art: '#A6C4D1' },
  { background: '#173C4A', ink: '#F3E9D5', art: '#78A8B3' },
  { background: '#E6EFF1', ink: '#243B4F', art: '#9BB9C4' },
  { background: '#EFE1D0', ink: '#654E3C', art: '#D2A976' },
  { background: '#DDE7DC', ink: '#36554A', art: '#92AD9B' },
];

export function BookCover({
  title,
  author,
  index = 0,
  width = 96,
  height,
  compact = false,
}: {
  title: string;
  author?: string;
  index?: number;
  width?: number;
  height?: number;
  compact?: boolean;
}) {
  const palette = coverPalettes[Math.abs(index) % coverPalettes.length];
  const coverHeight = height ?? Math.round(width * 1.48);
  return (
    <View
      style={{
        width,
        height: coverHeight,
        borderRadius: 7,
        backgroundColor: palette.background,
        overflow: 'hidden',
        justifyContent: 'space-between',
        padding: compact ? 8 : 10,
        borderWidth: 1,
        borderColor: 'rgba(25,50,65,0.07)',
      }}
    >
      <Svg
        width="100%"
        height="46%"
        viewBox="0 0 100 70"
        style={{ position: 'absolute', bottom: 0, left: 0 }}
      >
        <Circle cx="75" cy="18" r="10" fill={palette.art} opacity="0.68" />
        <Path
          d="M0 48 Q25 28 52 48 T105 42 L105 80 L0 80Z"
          fill={palette.art}
          opacity="0.7"
        />
        <Path
          d="M0 58 Q28 42 51 58 T105 50 L105 80 L0 80Z"
          fill={palette.ink}
          opacity="0.16"
        />
      </Svg>
      <AppText
        variant="caption"
        weight="700"
        color={palette.ink}
        style={{ letterSpacing: 0.8, fontSize: compact ? 7 : 8 }}
        numberOfLines={1}
      >
        {author?.toUpperCase() ?? 'NEJASHI EDITIONS'}
      </AppText>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <AppText
          variant={compact ? 'caption' : 'subheading'}
          weight="700"
          color={palette.ink}
          style={{
            lineHeight: compact ? 12 : 20,
            textAlign: 'center',
            fontFamily: 'Georgia',
          }}
          numberOfLines={4}
        >
          {title}
        </AppText>
      </View>
      <View
        style={{
          height: 1,
          width: '38%',
          alignSelf: 'center',
          backgroundColor: palette.ink,
          opacity: 0.35,
          marginBottom: 2,
        }}
      />
    </View>
  );
}

export function ProgressBar({
  value,
  light = false,
}: {
  value: number;
  light?: boolean;
}) {
  return (
    <View
      style={[
        styles.progressTrack,
        light && { backgroundColor: 'rgba(255,255,255,0.22)' },
      ]}
    >
      <View
        style={[
          styles.progressFill,
          { width: `${Math.max(0, Math.min(100, value))}%` },
          light && { backgroundColor: '#FFFFFF' },
        ]}
      />
    </View>
  );
}

export function BookTile({
  title,
  author,
  index = 0,
  onPress,
  width = 108,
}: {
  title: string;
  author: string;
  index?: number;
  onPress?: () => void;
  width?: number;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.78}
      style={{ width, marginRight: 14 }}
    >
      <BookCover title={title} author={author} index={index} width={width} />
      <AppText
        variant="body"
        weight="600"
        numberOfLines={2}
        style={{ marginTop: 9, minHeight: 40 }}
      >
        {title}
      </AppText>
      <AppText
        variant="caption"
        color={colors.muted}
        numberOfLines={1}
        style={{ marginTop: 2 }}
      >
        {author}
      </AppText>
    </TouchableOpacity>
  );
}

export function BookListRow({
  title,
  author,
  index = 0,
  metadata,
  action,
  onPress,
}: {
  title: string;
  author: string;
  index?: number;
  metadata?: string;
  action?: React.ReactNode;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.78}
      style={styles.bookRow}
    >
      <BookCover
        title={title}
        author={author}
        index={index}
        width={58}
        compact
      />
      <View style={{ flex: 1, marginLeft: 14 }}>
        <AppText weight="600" numberOfLines={1}>
          {title}
        </AppText>
        <AppText variant="caption" color={colors.body} style={{ marginTop: 2 }}>
          {author}
        </AppText>
        {metadata ? (
          <AppText
            variant="caption"
            color={colors.muted}
            style={{ marginTop: 3 }}
          >
            {metadata}
          </AppText>
        ) : null}
      </View>
      {action}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safePage: { flex: 1, backgroundColor: colors.background },
  page: { flex: 1, backgroundColor: colors.background },
  pageContent: {
    paddingHorizontal: space.lg,
    paddingTop: space.sm,
    paddingBottom: 36,
  },
  pageFixed: { paddingHorizontal: space.lg, paddingTop: space.sm },
  headingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: space.lg,
  },
  backHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    minHeight: 44,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
    marginTop: 8,
  },
  primaryButton: {
    minHeight: 50,
    paddingHorizontal: 22,
    borderRadius: radius.pill,
    backgroundColor: colors.blue,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  secondaryButton: {
    minHeight: 46,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.blueLine,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  iconButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceSubtle,
  },
  searchField: {
    minHeight: 50,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceSubtle,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 22,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    paddingVertical: 0,
    color: colors.ink,
    fontSize: 15,
  },
  chip: {
    borderRadius: radius.pill,
    minHeight: 36,
    paddingHorizontal: 15,
    backgroundColor: colors.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  chipSelected: {
    backgroundColor: colors.blueSoft,
    borderColor: colors.blueLine,
  },
  progressTrack: {
    height: 4,
    borderRadius: radius.pill,
    overflow: 'hidden',
    backgroundColor: colors.line,
  },
  progressFill: {
    height: '100%',
    borderRadius: radius.pill,
    backgroundColor: colors.blue,
  },
  bookRow: {
    minHeight: 82,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
    paddingVertical: 11,
  },
});
