# Torch 🔦

Just a simple flashlight app. Nothing fancy, just turn your phone's flash on/off. That's it.

## What is this?

It's a torch app. You know, like the one on your phone but... as an app? Yeah, I know. But sometimes you just want a big button to turn your flash on. So here we are.

## Features

- 🎯 **One Job** - Turn flash on/off. Does it well.
- 🌓 **Looks Nice** - Dark mode support because why not
- 📱 **Works Everywhere** - iOS, Android, Web (though web doesn't have a flash, so...)
- ⚡ **Fast** - No loading screens, no ads, just flash

## Quick Start

```bash
# Install stuff
bun install

# Run it
npx expo start
```

Then press `i` for iOS, `a` for Android, or scan the QR code with Expo Go.

## Tech Stuff

- Expo (because why make it complicated)
- React Native
- NativeWind (Tailwind but for React Native)
- TypeScript (for that type safety vibe)
- expo-camera (to actually control the flash)

## Project Structure

```
torch/
├── app/              # The screens
├── components/       # Reusable stuff
├── assets/           # Images and icons
└── ...other stuff
```

It's pretty straightforward. The main torch logic is in `app/(tabs)/index.tsx` if you're curious.

## How It Works

1. Ask for camera permission (need it for the flash)
2. Show a switch
3. Flip the switch → flash goes on/off
4. That's literally it

## Building

Want to actually build this? Use EAS Build:

```bash
eas build --platform ios
eas build --platform android
```

Or don't. It's just a torch app.

## Why?

Why not? Sometimes you just want to build something simple. No big plans, no monetization strategy, just a torch app that works.

---

Made with ✨ and probably too much coffee ☕
