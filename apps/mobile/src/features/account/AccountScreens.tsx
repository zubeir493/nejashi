import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import {
  Bell,
  BookMarked,
  BookOpen,
  Check,
  ChevronRight,
  CircleHelp,
  CloudDownload,
  Copy,
  CreditCard,
  Gift,
  Globe2,
  HardDrive,
  Headphones,
  Languages,
  LogIn,
  Mail,
  MonitorSmartphone,
  Moon,
  ShieldCheck,
  Smartphone,
  UserRound,
  Wifi,
} from 'lucide-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  AppText,
  BackHeader,
  BookCover,
  Chip,
  Page,
  PageHeading,
  PrimaryButton,
  ProgressBar,
  SecondaryButton,
  SectionHeading,
} from '../../design-system/components';
import { colors, radius } from '../../design-system/theme';

function MenuRow({
  icon: Icon,
  title,
  subtitle,
  onPress,
  trailing,
}: {
  icon: any;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  trailing?: React.ReactNode;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.75}
      style={styles.menuRow}
    >
      <View style={styles.menuIcon}>
        <Icon size={18} color={colors.blueDeep} strokeWidth={1.8} />
      </View>
      <View style={{ flex: 1 }}>
        <AppText weight="600">{title}</AppText>
        {subtitle ? (
          <AppText
            variant="caption"
            color={colors.body}
            style={{ marginTop: 2 }}
          >
            {subtitle}
          </AppText>
        ) : null}
      </View>
      {trailing ?? <ChevronRight size={17} color={colors.muted} />}
    </TouchableOpacity>
  );
}

export function AccountScreen() {
  const navigation = useNavigation<any>();
  return (
    <Page contentStyle={{ paddingTop: 10, paddingBottom: 30 }}>
      <BackHeader title="Your account" />
      <View style={styles.profileHero}>
        <View style={styles.profileAvatar}>
          <UserRound size={28} color={colors.blueDeep} />
        </View>
        <View style={{ flex: 1 }}>
          <AppText variant="heading" weight="700">
            Welcome to Nejashi
          </AppText>
          <AppText
            variant="caption"
            color={colors.body}
            style={{ marginTop: 4 }}
          >
            Sign in to sync your books and progress.
          </AppText>
        </View>
      </View>
      <PrimaryButton
        title="Sign in or create account"
        onPress={() => navigation.navigate('SignIn')}
        icon={<LogIn size={18} color="#FFFFFF" />}
      />
      <SectionHeading title="Your Nejashi" />
      <MenuRow
        icon={CreditCard}
        title="Purchases"
        subtitle="Receipts and payment history"
        onPress={() => navigation.navigate('Purchases')}
      />
      <MenuRow
        icon={MonitorSmartphone}
        title="Devices"
        subtitle="Manage reading and listening devices"
        onPress={() => navigation.navigate('Devices')}
      />
      <MenuRow
        icon={CloudDownload}
        title="Downloads & storage"
        subtitle="Offline books and space used"
        onPress={() => navigation.navigate('Downloads')}
      />
      <MenuRow
        icon={BookMarked}
        title="Bookmarks & highlights"
        subtitle="Your saved passages and notes"
        onPress={() => navigation.navigate('Bookmarks')}
      />
      <SectionHeading title="More" />
      <MenuRow
        icon={Gift}
        title="Invite a friend"
        subtitle="Share a book you love"
        onPress={() => navigation.navigate('Invite')}
      />
      <MenuRow
        icon={Languages}
        title="App language"
        subtitle="English · Amharic · العربية"
        onPress={() => navigation.navigate('Settings')}
      />
      <MenuRow
        icon={CircleHelp}
        title="Help & support"
        onPress={() => navigation.navigate('Help')}
      />
      <MenuRow
        icon={Globe2}
        title="About Nejashi"
        onPress={() => navigation.navigate('Onboarding')}
      />
      <AppText
        variant="caption"
        color={colors.muted}
        style={{ textAlign: 'center', marginTop: 22 }}
      >
        NEJASHI DIGITAL BOOKS · VERSION 1.0
      </AppText>
    </Page>
  );
}

export function DevicesScreen() {
  const navigation = useNavigation<any>();
  const [removed, setRemoved] = useState(false);
  return (
    <Page contentStyle={{ paddingTop: 10, paddingBottom: 28 }}>
      <BackHeader title="Your devices" />
      <AppText variant="title" weight="700" style={{ letterSpacing: -0.6 }}>
        Reading stays in sync
      </AppText>
      <AppText color={colors.body} style={{ marginTop: 5, marginBottom: 18 }}>
        Your protected books are licensed to your registered devices.
      </AppText>
      <View style={styles.deviceCard}>
        <View style={styles.deviceIcon}>
          <Smartphone size={20} color={colors.blueDeep} />
        </View>
        <View style={{ flex: 1 }}>
          <AppText weight="700">This iPhone</AppText>
          <AppText
            variant="caption"
            color={colors.body}
            style={{ marginTop: 3 }}
          >
            Current device · Active now
          </AppText>
          <AppText
            variant="caption"
            color={colors.muted}
            style={{ marginTop: 2 }}
          >
            Added today
          </AppText>
        </View>
        <View style={styles.currentBadge}>
          <AppText variant="caption" weight="700" color={colors.mintInk}>
            THIS DEVICE
          </AppText>
        </View>
      </View>
      {!removed ? (
        <View style={styles.deviceCard}>
          <View style={styles.deviceIcon}>
            <MonitorSmartphone size={20} color={colors.body} />
          </View>
          <View style={{ flex: 1 }}>
            <AppText weight="700">Android tablet</AppText>
            <AppText
              variant="caption"
              color={colors.body}
              style={{ marginTop: 3 }}
            >
              Last active 3 days ago
            </AppText>
            <AppText
              variant="caption"
              color={colors.muted}
              style={{ marginTop: 2 }}
            >
              Added 12 Sep 2026
            </AppText>
          </View>
          <TouchableOpacity onPress={() => setRemoved(true)}>
            <AppText variant="caption" color={colors.danger} weight="600">
              Remove
            </AppText>
          </TouchableOpacity>
        </View>
      ) : null}
      <View style={styles.infoCard}>
        <ShieldCheck size={18} color={colors.mintInk} />
        <AppText
          variant="caption"
          color={colors.body}
          style={{ flex: 1, marginLeft: 9 }}
        >
          Offline downloads are encrypted and can only open on a device with a
          current Nejashi license.
        </AppText>
      </View>
      <SecondaryButton
        title="Add another device"
        onPress={() => {}}
        style={{ marginTop: 18 }}
      />
      <AppText
        variant="caption"
        color={colors.muted}
        style={{ marginTop: 10, textAlign: 'center' }}
      >
        You can register up to 5 devices.
      </AppText>
    </Page>
  );
}

export function PurchasesScreen() {
  const navigation = useNavigation<any>();
  return (
    <Page contentStyle={{ paddingTop: 10, paddingBottom: 30 }}>
      <BackHeader title="Purchases" />
      <PageHeading
        title="Payment history"
        subtitle="Receipts and format licenses."
      />
      {[
        {
          title: 'The Forty Hadith',
          date: '14 Sep 2026',
          price: '120 ETB',
          status: 'Paid · Ebook',
        },
        {
          title: 'Stories of the Prophets',
          date: '06 Sep 2026',
          price: '260 ETB',
          status: 'Paid · Ebook + Audio',
        },
        {
          title: 'Purification of the Soul',
          date: '21 Aug 2026',
          price: '240 ETB',
          status: 'Paid · Audiobook',
        },
      ].map((item, index) => (
        <TouchableOpacity
          key={item.title}
          style={styles.purchaseRow}
          onPress={() => navigation.navigate('BookDetail')}
        >
          <BookCover
            title={item.title}
            author="Nejashi edition"
            index={index}
            width={52}
            height={77}
            compact
          />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <AppText weight="700">{item.title}</AppText>
            <AppText
              variant="caption"
              color={colors.body}
              style={{ marginTop: 3 }}
            >
              {item.date} · {item.status}
            </AppText>
            <AppText
              variant="caption"
              color={colors.blueDeep}
              weight="600"
              style={{ marginTop: 5 }}
            >
              View receipt
            </AppText>
          </View>
          <AppText weight="700">{item.price}</AppText>
        </TouchableOpacity>
      ))}
      <View style={styles.paymentHelp}>
        <AppText variant="caption" color={colors.body}>
          Need help with a payment?
        </AppText>
        <TouchableOpacity onPress={() => navigation.navigate('Help')}>
          <AppText variant="caption" color={colors.blueDeep} weight="700">
            {' '}
            Contact support
          </AppText>
        </TouchableOpacity>
      </View>
    </Page>
  );
}

export function SettingsScreen() {
  const navigation = useNavigation<any>();
  const [language, setLanguage] = useState('English');
  const [wifiOnly, setWifiOnly] = useState(true);
  return (
    <Page contentStyle={{ paddingTop: 10, paddingBottom: 32 }}>
      <BackHeader title="Settings" />
      <PageHeading
        title="Preferences"
        subtitle="Make Nejashi feel like yours."
      />
      <SectionHeading title="App language" />
      <View style={styles.languageChoices}>
        {['English', 'አማርኛ', 'العربية'].map(item => (
          <Chip
            key={item}
            label={item}
            selected={language === item}
            onPress={() => setLanguage(item)}
          />
        ))}
      </View>
      <MenuRow
        icon={BookOpen}
        title="Reading preferences"
        subtitle="Font, text size, theme"
        onPress={() => navigation.navigate('ReaderSettings')}
      />
      <MenuRow
        icon={Bell}
        title="Notifications"
        subtitle="New releases and reading reminders"
        onPress={() => {}}
        trailing={
          <View style={styles.toggleOn}>
            <View style={styles.toggleThumb} />
          </View>
        }
      />
      <TouchableOpacity
        onPress={() => setWifiOnly(!wifiOnly)}
        style={styles.settingToggle}
      >
        <View style={styles.menuIcon}>
          <Wifi size={18} color={colors.blueDeep} />
        </View>
        <View style={{ flex: 1 }}>
          <AppText weight="600">Download on Wi-Fi only</AppText>
          <AppText
            variant="caption"
            color={colors.body}
            style={{ marginTop: 2 }}
          >
            Save mobile data
          </AppText>
        </View>
        <View style={[styles.toggleOn, !wifiOnly && styles.toggleOff]}>
          <View
            style={[styles.toggleThumb, !wifiOnly && styles.toggleThumbOff]}
          />
        </View>
      </TouchableOpacity>
      <MenuRow
        icon={HardDrive}
        title="Downloads & storage"
        onPress={() => navigation.navigate('Storage')}
      />
      <MenuRow
        icon={Moon}
        title="Appearance"
        subtitle="Light · follows system later"
        onPress={() => {}}
      />
      <View style={styles.languageNote}>
        <AppText variant="caption" color={colors.body}>
          Book language is set per edition and stays separate from your app
          language. Arabic and Amharic layouts adapt in the reader.
        </AppText>
      </View>
    </Page>
  );
}

export function StorageScreen() {
  const navigation = useNavigation<any>();
  return (
    <Page contentStyle={{ paddingTop: 10, paddingBottom: 28 }}>
      <BackHeader title="Downloads & storage" />
      <AppText variant="title" weight="700" style={{ letterSpacing: -0.6 }}>
        Offline books
      </AppText>
      <AppText color={colors.body} style={{ marginTop: 5 }}>
        Protected downloads stay inside Nejashi.
      </AppText>
      <View style={styles.storageCard}>
        <View style={styles.storageTop}>
          <View style={styles.storageIcon}>
            <HardDrive size={19} color={colors.blueDeep} />
          </View>
          <View style={{ flex: 1 }}>
            <AppText weight="700">Storage used</AppText>
            <AppText
              variant="caption"
              color={colors.body}
              style={{ marginTop: 2 }}
            >
              1.8 GB of 8 GB available
            </AppText>
          </View>
          <AppText weight="700">1.8 GB</AppText>
        </View>
        <ProgressBar value={23} />
        <View style={styles.storageLegend}>
          <AppText variant="caption" color={colors.body}>
            Audio 1.4 GB
          </AppText>
          <AppText variant="caption" color={colors.body}>
            Ebooks 420 MB
          </AppText>
        </View>
      </View>
      <MenuRow
        icon={CloudDownload}
        title="Manage downloads"
        subtitle="3 protected titles on this device"
        onPress={() => navigation.navigate('Downloads')}
      />
      <MenuRow
        icon={Wifi}
        title="Wi-Fi only downloads"
        subtitle="Enabled"
        trailing={<Check size={17} color={colors.mintInk} />}
      />
      <View style={styles.infoCard}>
        <ShieldCheck size={18} color={colors.mintInk} />
        <AppText
          variant="caption"
          color={colors.body}
          style={{ flex: 1, marginLeft: 9 }}
        >
          Download packages are encrypted and tied to your device license. They
          are not regular EPUB or audio files.
        </AppText>
      </View>
      <SecondaryButton
        title="Remove all downloads"
        onPress={() => {}}
        style={{ marginTop: 18 }}
      />
    </Page>
  );
}

export function DownloadsScreen() {
  const navigation = useNavigation<any>();
  const [filter, setFilter] = useState('All');
  return (
    <Page contentStyle={{ paddingTop: 10, paddingBottom: 28 }}>
      <BackHeader
        title="Downloads"
        right={
          <TouchableOpacity onPress={() => navigation.navigate('Storage')}>
            <HardDrive size={19} color={colors.body} />
          </TouchableOpacity>
        }
      />
      <PageHeading
        title="Ready offline"
        subtitle="Protected books saved on this device."
      />
      <View style={styles.languageChoices}>
        {['All', 'Ebooks', 'Audiobooks'].map(item => (
          <Chip
            key={item}
            label={item}
            selected={filter === item}
            onPress={() => setFilter(item)}
          />
        ))}
      </View>
      <View style={styles.downloadState}>
        <View style={styles.downloadStateDot} />
        <View style={{ flex: 1 }}>
          <AppText weight="700">The Sealed Nectar</AppText>
          <AppText
            variant="caption"
            color={colors.body}
            style={{ marginTop: 3 }}
          >
            Audiobook · Downloading · 68%
          </AppText>
          <View style={{ marginTop: 8 }}>
            <ProgressBar value={68} />
          </View>
        </View>
        <AppText variant="caption" color={colors.blueDeep} weight="700">
          Pause
        </AppText>
      </View>
      <View style={styles.downloadState}>
        <View
          style={[styles.downloadStateDot, { backgroundColor: colors.mintInk }]}
        />
        <View style={{ flex: 1 }}>
          <AppText weight="700">The Forty Hadith</AppText>
          <AppText
            variant="caption"
            color={colors.body}
            style={{ marginTop: 3 }}
          >
            Ebook · Downloaded · 18 MB
          </AppText>
          <AppText
            variant="caption"
            color={colors.mintInk}
            style={{ marginTop: 5 }}
          >
            License active · Available offline
          </AppText>
        </View>
        <TouchableOpacity>
          <AppText variant="caption" color={colors.body}>
            Remove
          </AppText>
        </TouchableOpacity>
      </View>
      <View style={styles.downloadState}>
        <View
          style={[styles.downloadStateDot, { backgroundColor: colors.gold }]}
        />
        <View style={{ flex: 1 }}>
          <AppText weight="700">Purification of the Soul</AppText>
          <AppText
            variant="caption"
            color={colors.body}
            style={{ marginTop: 3 }}
          >
            Audiobook · Queued · 310 MB
          </AppText>
        </View>
        <TouchableOpacity>
          <AppText variant="caption" color={colors.blueDeep} weight="700">
            Cancel
          </AppText>
        </TouchableOpacity>
      </View>
      <View style={styles.downloadState}>
        <View
          style={[styles.downloadStateDot, { backgroundColor: colors.danger }]}
        />
        <View style={{ flex: 1 }}>
          <AppText weight="700">Love and Patience</AppText>
          <AppText
            variant="caption"
            color={colors.body}
            style={{ marginTop: 3 }}
          >
            Audiobook · Failed · Connection interrupted
          </AppText>
        </View>
        <TouchableOpacity>
          <AppText variant="caption" color={colors.blueDeep} weight="700">
            Retry
          </AppText>
        </TouchableOpacity>
      </View>
      <View style={styles.storageLine}>
        <HardDrive size={16} color={colors.body} />
        <AppText
          variant="caption"
          color={colors.body}
          style={{ flex: 1, marginLeft: 8 }}
        >
          1.8 GB used by Nejashi downloads
        </AppText>
        <TouchableOpacity onPress={() => navigation.navigate('Storage')}>
          <AppText variant="caption" color={colors.blueDeep} weight="600">
            Manage
          </AppText>
        </TouchableOpacity>
      </View>
      <View style={styles.wifiBanner}>
        <Wifi size={17} color={colors.blueDeep} />
        <AppText
          variant="caption"
          color={colors.body}
          style={{ flex: 1, marginLeft: 9 }}
        >
          Wi-Fi only downloads are on
        </AppText>
        <Check size={16} color={colors.mintInk} />
      </View>
    </Page>
  );
}

export function NotesScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const isHighlight = route.name === 'Highlights';
  return (
    <Page contentStyle={{ paddingTop: 10, paddingBottom: 30 }}>
      <BackHeader title={isHighlight ? 'Highlights & notes' : 'Bookmarks'} />
      <PageHeading
        title={isHighlight ? 'Saved passages' : 'Your bookmarks'}
        subtitle={
          isHighlight
            ? 'Thoughts and passages worth keeping.'
            : 'Jump back into a saved place.'
        }
      />
      {isHighlight
        ? [
            [
              '“Actions are according to intentions…”',
              'The Forty Hadith · Chapter 1',
              'Yellow highlight · 2 notes',
            ],
            [
              '“The heart gives direction to what the hands begin.”',
              'Riyad as-Salihin · Sincerity',
              'Blue highlight',
            ],
            [
              'Remember to return to this passage',
              'Purposeful Living · Chapter 4',
              'Personal note',
            ],
          ].map(([quote, source, meta]) => (
            <TouchableOpacity
              key={quote}
              onPress={() => navigation.navigate('Reader')}
              style={styles.noteCard}
            >
              <View style={styles.highlightBar} />
              <AppText
                style={{
                  flex: 1,
                  fontFamily: 'Georgia',
                  fontSize: 17,
                  lineHeight: 24,
                }}
              >
                {quote}
              </AppText>
              <AppText
                variant="caption"
                color={colors.body}
                style={{ marginTop: 9 }}
              >
                {source}
              </AppText>
              <AppText
                variant="caption"
                color={colors.muted}
                style={{ marginTop: 3 }}
              >
                {meta}
              </AppText>
            </TouchableOpacity>
          ))
        : [
            ['Riyad as-Salihin', 'Chapter 1 · Page 86', 1],
            ['The Forty Hadith', 'Hadith 12 · Page 24', 2],
            ['Purposeful Living', 'Chapter 4 · Page 102', 3],
          ].map(([title, location, index]) => (
            <TouchableOpacity
              key={title}
              onPress={() => navigation.navigate('Reader')}
              style={styles.bookmarkRow}
            >
              <BookCover
                title={String(title)}
                author="Nejashi edition"
                index={Number(index)}
                width={56}
                height={82}
                compact
              />
              <View style={{ flex: 1, marginLeft: 13 }}>
                <AppText weight="700">{title}</AppText>
                <AppText
                  variant="caption"
                  color={colors.body}
                  style={{ marginTop: 3 }}
                >
                  {location}
                </AppText>
                <AppText
                  variant="caption"
                  color={colors.blueDeep}
                  weight="600"
                  style={{ marginTop: 8 }}
                >
                  Open at bookmark
                </AppText>
              </View>
            </TouchableOpacity>
          ))}
    </Page>
  );
}

export function InviteScreen() {
  const [copied, setCopied] = useState(false);
  return (
    <Page contentStyle={{ paddingTop: 10, paddingBottom: 30 }}>
      <BackHeader title="Invite a friend" />
      <View style={styles.inviteMark}>
        <Gift size={27} color={colors.blueDeep} />
      </View>
      <AppText
        variant="title"
        weight="700"
        style={{ textAlign: 'center', marginTop: 15 }}
      >
        Share a good book
      </AppText>
      <AppText
        color={colors.body}
        style={{ textAlign: 'center', marginTop: 7, lineHeight: 22 }}
      >
        Give a friend 15% off their first purchase. You’ll receive 8% of
        eligible purchases as Nejashi credit.
      </AppText>
      <View style={styles.referralCode}>
        <AppText variant="eyebrow" color={colors.muted}>
          YOUR REFERRAL CODE
        </AppText>
        <View style={styles.codeLine}>
          <AppText
            variant="heading"
            weight="700"
            color={colors.blueDeep}
            style={{ letterSpacing: 2 }}
          >
            ZUBEYR15
          </AppText>
          <TouchableOpacity onPress={() => setCopied(true)}>
            <Copy size={18} color={colors.blueDeep} />
          </TouchableOpacity>
        </View>
        <AppText variant="caption" color={colors.mintInk}>
          {copied ? 'Code copied' : 'Your friend saves 15% · You earn 8%'}
        </AppText>
      </View>
      <PrimaryButton
        title="Share invite link"
        onPress={() => setCopied(true)}
        icon={<Gift size={17} color="#FFFFFF" />}
        style={{ marginTop: 18 }}
      />
      <View style={styles.referralStats}>
        <View>
          <AppText variant="caption" color={colors.body}>
            FRIENDS INVITED
          </AppText>
          <AppText variant="heading" weight="700" style={{ marginTop: 5 }}>
            12
          </AppText>
        </View>
        <View style={styles.statDivider} />
        <View>
          <AppText variant="caption" color={colors.body}>
            CREDIT EARNED
          </AppText>
          <AppText variant="heading" weight="700" style={{ marginTop: 5 }}>
            420 ETB
          </AppText>
        </View>
      </View>
      <AppText
        variant="caption"
        color={colors.muted}
        style={{ textAlign: 'center', marginTop: 18 }}
      >
        Rewards are confirmed after payment verification. See referral terms for
        eligible titles and campaign dates.
      </AppText>
    </Page>
  );
}

export function HelpScreen() {
  const navigation = useNavigation<any>();
  return (
    <Page contentStyle={{ paddingTop: 10, paddingBottom: 30 }}>
      <BackHeader title="Help & support" />
      <PageHeading
        title="How can we help?"
        subtitle="Clear answers for your reading and listening."
      />
      <View style={styles.helpSearch}>
        <AppText color={colors.muted}>Search help articles</AppText>
      </View>
      {[
        [
          'Purchases and payments',
          CreditCard,
          'Chapa payments, receipts and refunds',
        ],
        [
          'Offline downloads',
          CloudDownload,
          'Download status and device access',
        ],
        [
          'Reading and listening',
          Headphones,
          'Reader controls, chapters and progress',
        ],
        [
          'Account and privacy',
          ShieldCheck,
          'Sign-in, devices and personal data',
        ],
        ['Contact support', Mail, 'We usually reply within one business day'],
      ].map(([title, Icon, subtitle]) => (
        <MenuRow
          key={String(title)}
          icon={Icon}
          title={String(title)}
          subtitle={String(subtitle)}
          onPress={() => {}}
        />
      ))}
      <SecondaryButton
        title="Contact Nejashi support"
        onPress={() => {}}
        style={{ marginTop: 19 }}
      />
    </Page>
  );
}

export function OnboardingScreen() {
  const navigation = useNavigation<any>();
  return (
    <Page contentStyle={styles.onboardingPage}>
      <View style={styles.onboardTop}>
        <AppText variant="subheading" weight="700" color={colors.blueDeep}>
          Nejashi
        </AppText>
        <TouchableOpacity onPress={() => navigation.navigate('Tabs')}>
          <AppText color={colors.body}>Skip</AppText>
        </TouchableOpacity>
      </View>
      <View style={styles.onboardArt}>
        <BookCover
          title="A life of learning"
          author="NEJASHI EDITIONS"
          index={2}
          width={142}
          height={210}
        />
        <View style={styles.orbit}>
          <BookCover
            title="Stories that guide us"
            author="NEJASHI"
            index={4}
            width={88}
            height={130}
          />
        </View>
      </View>
      <View style={{ alignItems: 'center' }}>
        <View style={styles.dots}>
          <View style={styles.dotActive} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
        <AppText
          variant="title"
          weight="700"
          style={{ textAlign: 'center', marginTop: 20 }}
        >
          A thoughtful library, wherever you are.
        </AppText>
        <AppText
          color={colors.body}
          style={{ textAlign: 'center', lineHeight: 23, marginTop: 9 }}
        >
          Read and listen to books you love, pick up where you left off, and
          keep your library with you offline.
        </AppText>
      </View>
      <View>
        <PrimaryButton
          title="Get started"
          onPress={() => navigation.navigate('SignUp')}
        />
        <SecondaryButton
          title="I already have an account"
          onPress={() => navigation.navigate('SignIn')}
          style={{ marginTop: 10 }}
        />
      </View>
    </Page>
  );
}

export function SplashScreen() {
  const navigation = useNavigation<any>();
  return (
    <Page contentStyle={styles.splashPage}>
      <View style={styles.splashBrand}>
        <View style={styles.splashMark}>
          <BookOpen size={31} color="#FFFFFF" strokeWidth={1.7} />
        </View>
        <AppText
          variant="title"
          weight="700"
          color={colors.ink}
          style={{ marginTop: 17, letterSpacing: -0.6 }}
        >
          Nejashi
        </AppText>
        <AppText
          variant="caption"
          color={colors.body}
          style={{ marginTop: 2, letterSpacing: 1.4 }}
        >
          DIGITAL BOOKS
        </AppText>
      </View>
      <View style={styles.splashFooter}>
        <AppText
          variant="caption"
          color={colors.muted}
          style={{ textAlign: 'center', marginBottom: 12 }}
        >
          A library for stories that stay with you.
        </AppText>
        <PrimaryButton
          title="Continue"
          onPress={() => navigation.navigate('Onboarding')}
        />
      </View>
    </Page>
  );
}

export function AuthScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const signUp = route.name === 'SignUp';
  const [method, setMethod] = useState('Phone');
  return (
    <Page contentStyle={{ paddingTop: 10, paddingBottom: 30 }}>
      <BackHeader title={signUp ? 'Create account' : 'Sign in'} />
      <View style={styles.authBrand}>
        <AppText variant="heading" weight="700" color={colors.blueDeep}>
          Nejashi
        </AppText>
        <AppText variant="caption" color={colors.body}>
          Digital Books
        </AppText>
      </View>
      <AppText
        variant="title"
        weight="700"
        style={{ letterSpacing: -0.5, marginTop: 18 }}
      >
        {signUp ? 'Your library starts here.' : 'Welcome back.'}
      </AppText>
      <AppText color={colors.body} style={{ marginTop: 6, lineHeight: 21 }}>
        Use your email or phone. We’ll send a secure code to confirm it’s you.
      </AppText>
      <View style={styles.languageChoices}>
        <Chip
          label="Phone"
          selected={method === 'Phone'}
          onPress={() => setMethod('Phone')}
        />
        <Chip
          label="Email"
          selected={method === 'Email'}
          onPress={() => setMethod('Email')}
        />
      </View>
      <AppText
        variant="caption"
        weight="700"
        color={colors.body}
        style={{ marginBottom: 7 }}
      >
        {method.toUpperCase()}
      </AppText>
      <View style={styles.authInput}>
        <AppText color={colors.muted}>
          {method === 'Phone' ? '+251 9__ ___ ____' : 'you@example.com'}
        </AppText>
      </View>
      <PrimaryButton
        title={signUp ? 'Create account' : 'Continue'}
        onPress={() => navigation.navigate('Tabs')}
        style={{ marginTop: 16 }}
      />
      <AppText
        variant="caption"
        color={colors.muted}
        style={{ textAlign: 'center', marginTop: 12 }}
      >
        No password needed. Verification code expires after 10 minutes.
      </AppText>
      <TouchableOpacity
        onPress={() => navigation.navigate(signUp ? 'SignIn' : 'SignUp')}
        style={{ alignItems: 'center', padding: 18 }}
      >
        <AppText color={colors.blueDeep} weight="600">
          {signUp
            ? 'Already have an account? Sign in'
            : 'New to Nejashi? Create account'}
        </AppText>
      </TouchableOpacity>
      <View style={styles.authFooter}>
        <ShieldCheck size={16} color={colors.mintInk} />
        <AppText
          variant="caption"
          color={colors.body}
          style={{ marginLeft: 7 }}
        >
          Your purchases and reading progress sync securely.
        </AppText>
      </View>
    </Page>
  );
}

const styles = StyleSheet.create({
  profileHero: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
    marginBottom: 17,
    paddingVertical: 10,
  },
  profileAvatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: colors.blueSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuRow: {
    minHeight: 61,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: colors.line,
    gap: 12,
  },
  menuIcon: {
    width: 35,
    height: 35,
    borderRadius: 18,
    backgroundColor: colors.blueSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deviceCard: {
    minHeight: 86,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: colors.line,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
  },
  deviceIcon: {
    width: 43,
    height: 43,
    borderRadius: 13,
    backgroundColor: colors.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  currentBadge: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    backgroundColor: colors.mint,
    borderRadius: radius.pill,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 13,
    borderRadius: radius.md,
    backgroundColor: colors.mint,
    marginTop: 17,
  },
  purchaseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: colors.line,
  },
  paymentHelp: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 18,
  },
  languageChoices: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
    marginBottom: 10,
  },
  settingToggle: {
    minHeight: 68,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: colors.line,
    gap: 12,
  },
  toggleOn: {
    width: 42,
    height: 25,
    borderRadius: 13,
    backgroundColor: colors.blue,
    padding: 3,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  toggleOff: { backgroundColor: colors.line, alignItems: 'flex-start' },
  toggleThumb: {
    width: 19,
    height: 19,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  toggleThumbOff: { alignSelf: 'flex-start' },
  languageNote: {
    backgroundColor: colors.surfaceSubtle,
    padding: 13,
    borderRadius: radius.md,
    marginTop: 20,
  },
  storageCard: {
    padding: 15,
    backgroundColor: colors.surfaceSubtle,
    borderRadius: radius.md,
    marginTop: 10,
    marginBottom: 10,
  },
  storageTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    gap: 9,
  },
  storageIcon: {
    width: 37,
    height: 37,
    borderRadius: 19,
    backgroundColor: colors.blueSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  storageLegend: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 9,
  },
  downloadState: {
    minHeight: 86,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderBottomWidth: 1,
    borderColor: colors.line,
    paddingVertical: 13,
  },
  downloadStateDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: colors.blue,
    marginLeft: 4,
  },
  storageLine: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    marginTop: 7,
  },
  wifiBanner: {
    minHeight: 44,
    backgroundColor: colors.blueSoft,
    borderRadius: radius.md,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginTop: 7,
  },
  noteCard: {
    borderRadius: radius.md,
    backgroundColor: colors.surfaceSubtle,
    padding: 14,
    marginBottom: 11,
    borderLeftWidth: 3,
    borderLeftColor: colors.blue,
  },
  highlightBar: {
    width: 25,
    height: 3,
    borderRadius: 3,
    backgroundColor: colors.gold,
    marginBottom: 11,
  },
  bookmarkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: colors.line,
  },
  inviteMark: {
    width: 68,
    height: 68,
    borderRadius: 34,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.blueSoft,
    marginTop: 22,
  },
  referralCode: {
    backgroundColor: colors.surfaceSubtle,
    borderRadius: radius.md,
    padding: 18,
    marginTop: 23,
    alignItems: 'center',
    gap: 7,
  },
  codeLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 3,
  },
  referralStats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 18,
    marginTop: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.line,
  },
  statDivider: { width: 1, height: 38, backgroundColor: colors.line },
  helpSearch: {
    height: 48,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceSubtle,
    justifyContent: 'center',
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  onboardingPage: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingTop: 13,
    paddingBottom: 23,
  },
  onboardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  onboardArt: {
    height: 330,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  orbit: {
    position: 'absolute',
    right: 24,
    bottom: 36,
    transform: [{ rotate: '8deg' }],
  },
  dots: { flexDirection: 'row', gap: 7 },
  dotActive: {
    width: 19,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.blue,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.blueLine,
  },
  authBrand: { paddingTop: 11, alignItems: 'flex-start' },
  authInput: {
    height: 52,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radius.md,
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  authFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 22,
  },
  splashPage: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 24,
  },
  splashBrand: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  splashMark: {
    width: 74,
    height: 74,
    borderRadius: 23,
    backgroundColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashFooter: { width: '100%' },
});
