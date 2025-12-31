# Torch 🔦

A modern flashlight/torch application built with Expo and React Native. Turn your device's camera flash into a powerful torch with a simple, intuitive interface.

## Features

- ✨ **Simple Interface** - Clean, minimal design with easy-to-use controls
- 🌓 **Dark Mode Support** - Automatically adapts to your system theme
- 📱 **Cross-Platform** - Works on iOS, Android, and Web
- ⚡ **Instant Toggle** - Quick on/off switch for the torch
- 🎨 **Modern UI** - Built with NativeWind (Tailwind CSS) for beautiful styling
- 🔒 **Permission Handling** - Graceful camera permission requests

## Tech Stack

- **Framework**: [Expo](https://expo.dev) ~54.0.30
- **Routing**: [Expo Router](https://docs.expo.dev/router/introduction/) ~6.0.21
- **UI**: [NativeWind](https://www.nativewind.dev/) v4.2.1 (Tailwind CSS for React Native)
- **Camera**: [expo-camera](https://docs.expo.dev/versions/latest/sdk/camera/) ~17.0.10
- **Language**: TypeScript
- **React**: 19.1.0
- **React Native**: 0.81.5

## Prerequisites

- Node.js (v18 or later)
- npm, yarn, pnpm, or bun
- iOS Simulator (for iOS development) or Android Studio (for Android development)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (optional, but recommended)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd torch
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. Start the development server:
   ```bash
   npm start
   # or
   npx expo start
   ```

## Usage

### Development

Start the Expo development server:

```bash
npm start
```

Then choose how to run the app:

- Press `i` to open in iOS Simulator
- Press `a` to open in Android Emulator
- Press `w` to open in web browser
- Scan the QR code with [Expo Go](https://expo.dev/go) on your physical device

### Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Start and open on Android emulator
- `npm run ios` - Start and open on iOS simulator
- `npm run web` - Start and open in web browser
- `npm run lint` - Run ESLint
- `npm run reset-project` - Reset to a blank project (moves current code to `app-example`)

## Project Structure

```
torch/
├── app/                    # App routes (Expo Router file-based routing)
│   ├── (tabs)/            # Tab navigation screens
│   │   ├── index.tsx      # Home/Torch screen
│   │   └── settings.tsx   # Settings screen
│   ├── _layout.tsx        # Root layout
│   └── modal.tsx          # Modal screen
├── assets/                 # Images, fonts, and other static assets
│   └── images/            # App icons and images
├── components/             # Reusable React components
│   ├── ui/                # UI components
│   ├── themed-text.tsx    # Themed text component
│   └── themed-view.tsx    # Themed view component
├── constants/              # App constants
│   └── theme.ts           # Theme configuration
├── hooks/                  # Custom React hooks
├── scripts/                # Utility scripts
├── app.json               # Expo configuration
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind CSS configuration
└── tsconfig.json          # TypeScript configuration
```

## How It Works

The app uses the device's camera flash as a torch. When you toggle the switch:

1. The app requests camera permissions (if not already granted)
2. Uses `expo-camera`'s `CameraView` component with `enableTorch` prop
3. The torch state is managed with React's `useState` hook
4. The UI updates to reflect the current torch state

## Building for Production

### iOS

```bash
eas build --platform ios
```

### Android

```bash
eas build --platform android
```

### Web

```bash
npx expo export:web
```

For more information on building, see the [Expo documentation](https://docs.expo.dev/build/introduction/).

## Configuration

The app configuration is in `app.json`. Key settings:

- **New Architecture**: Enabled (`newArchEnabled: true`)
- **React Compiler**: Enabled (experimental)
- **Typed Routes**: Enabled (experimental)
- **Camera Permission**: Configured for torch functionality

## Development Notes

- The app uses Expo Router for file-based routing
- Styling is done with NativeWind (Tailwind CSS)
- The torch functionality requires camera permissions
- The app supports both light and dark modes automatically

## Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
- [NativeWind Documentation](https://www.nativewind.dev/)
- [React Native Documentation](https://reactnative.dev/)

## License

This project is private.
