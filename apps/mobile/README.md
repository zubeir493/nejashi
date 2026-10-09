# Nejashi mobile app

The app uses Expo SDK 57, React Native 0.86, and TypeScript. Its screen components are organized by feature under `src/features`, reusable controls and visual tokens live in `src/design-system`, and the four-tab shell plus modal/stack routes live in `src/app`.

The current screens use sample data for product review. Payment verification, API-backed catalog/library state, Readium, and protected offline media are not connected yet; see the root architecture and implementation plan.

```sh
npm ci
npx expo start
```

You can also use `npm run preview`. Install Expo Go on an iPhone or Android phone, connect the phone and computer to the same Wi-Fi, then scan the QR code shown by Expo. JavaScript and TypeScript changes refresh in Expo Go while the server is running.

For an Android emulator or iOS Simulator with Expo Go installed, use `npm run preview:android` or `npm run preview:ios`. You can also run `npx expo start`, then press `a` or `i` in the Expo terminal. These need the matching Android Studio emulator/SDK or Xcode simulator installed locally.

If Expo Go says the SDK is unsupported, update Expo Go to a version that supports this project's SDK 57. On a physical iPhone, sign in to the same Expo account in the CLI and Expo Go.

`npm start` also starts Expo. Expo Go is for previewing the current React Native screens; native integrations such as Readium and Keychain require a custom development build, which replaces Expo Go for that phase.
