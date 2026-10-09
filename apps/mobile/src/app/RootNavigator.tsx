import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList, TabParamList } from './routes';
import { TabBar } from './TabBar';
import { HomeScreen } from '../features/home/HomeScreen';
import { DiscoverScreen } from '../features/discover/DiscoverScreen';
import { LibraryScreen } from '../features/library/LibraryScreen';
import { ListenScreen } from '../features/audio/ListenScreen';
import { BookDetailScreen } from '../features/catalog/BookDetailScreen';
import {
  SearchScreen,
  SearchResultsScreen,
} from '../features/search/SearchScreens';
import { EditorialScreen } from '../features/discover/EditorialScreen';
import {
  CheckoutScreen,
  PurchaseSuccessScreen,
} from '../features/commerce/CommerceScreens';
import {
  ReaderScreen,
  ReaderSettingsScreen,
} from '../features/reader/ReaderScreens';
import {
  AudioPlayerScreen,
  ChapterListScreen,
  SleepTimerScreen,
} from '../features/audio/AudioScreens';
import {
  AccountScreen,
  DevicesScreen,
  PurchasesScreen,
  SettingsScreen,
  StorageScreen,
  HelpScreen,
  InviteScreen,
  AuthScreen,
  OnboardingScreen,
  DownloadsScreen,
  NotesScreen,
  SplashScreen,
} from '../features/account/AccountScreens';

const Tabs = createBottomTabNavigator<TabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

function MainTabs() {
  return (
    <Tabs.Navigator
      tabBar={props => <TabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="Home" component={HomeScreen} />
      <Tabs.Screen name="Discover" component={DiscoverScreen} />
      <Tabs.Screen name="Library" component={LibraryScreen} />
      <Tabs.Screen name="Listen" component={ListenScreen} />
    </Tabs.Navigator>
  );
}

export function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Tabs"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          contentStyle: { backgroundColor: '#FFFFFF' },
        }}
      >
        <Stack.Screen name="Tabs" component={MainTabs} />
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ animation: 'fade' }}
        />
        <Stack.Screen name="BookDetail" component={BookDetailScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="SearchResults" component={SearchResultsScreen} />
        <Stack.Screen name="Category" component={EditorialScreen} />
        <Stack.Screen name="Collection" component={EditorialScreen} />
        <Stack.Screen name="Author" component={EditorialScreen} />
        <Stack.Screen name="Series" component={EditorialScreen} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
        <Stack.Screen
          name="PurchaseSuccess"
          component={PurchaseSuccessScreen}
          options={{ animation: 'fade_from_bottom' }}
        />
        <Stack.Screen
          name="Reader"
          component={ReaderScreen}
          options={{ animation: 'fade' }}
        />
        <Stack.Screen
          name="ReaderSettings"
          component={ReaderSettingsScreen}
          options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
        />
        <Stack.Screen
          name="AudioPlayer"
          component={AudioPlayerScreen}
          options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
        />
        <Stack.Screen
          name="ChapterList"
          component={ChapterListScreen}
          options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
        />
        <Stack.Screen
          name="SleepTimer"
          component={SleepTimerScreen}
          options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
        />
        <Stack.Screen name="Downloads" component={DownloadsScreen} />
        <Stack.Screen name="Bookmarks" component={NotesScreen} />
        <Stack.Screen name="Highlights" component={NotesScreen} />
        <Stack.Screen name="Invite" component={InviteScreen} />
        <Stack.Screen name="Profile" component={AccountScreen} />
        <Stack.Screen name="Devices" component={DevicesScreen} />
        <Stack.Screen name="Purchases" component={PurchasesScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Storage" component={StorageScreen} />
        <Stack.Screen name="Help" component={HelpScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="SignIn" component={AuthScreen} />
        <Stack.Screen name="SignUp" component={AuthScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
