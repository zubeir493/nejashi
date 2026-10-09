export type TabParamList = {
  Home: undefined;
  Discover: undefined;
  Library: undefined;
  Listen: undefined;
};

export type RootStackParamList = {
  Tabs: undefined;
  Splash: undefined;
  BookDetail: { bookId?: string } | undefined;
  Search: { query?: string } | undefined;
  SearchResults: { query?: string } | undefined;
  Category: { title?: string } | undefined;
  Collection: { title?: string } | undefined;
  Author: { title?: string } | undefined;
  Series: { title?: string } | undefined;
  Checkout: undefined;
  PurchaseSuccess: undefined;
  Reader: undefined;
  ReaderSettings: undefined;
  AudioPlayer: undefined;
  ChapterList: undefined;
  SleepTimer: undefined;
  Downloads: undefined;
  Bookmarks: undefined;
  Highlights: undefined;
  Invite: undefined;
  Profile: undefined;
  Devices: undefined;
  Purchases: undefined;
  Settings: undefined;
  Storage: undefined;
  Help: undefined;
  Onboarding: undefined;
  SignIn: undefined;
  SignUp: undefined;
};
