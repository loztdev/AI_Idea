# Development Guide

## Project Structure

```
AI_Idea/
├── App.js                          # Main entry point with navigation setup
├── app.json                        # Expo configuration
├── package.json                    # Dependencies and scripts
├── babel.config.js                 # Babel configuration for React Native
├── metro.config.js                 # Metro bundler configuration
├── .gitignore                      # Git ignore rules
├── .env.example                    # Example environment file
├── src/
│   ├── screens/                    # Screen components
│   │   ├── ChatScreen.js          # Main chat interface
│   │   └── ModelSelectorScreen.js # Model selection screen
│   ├── services/                   # API and external services
│   │   └── openRouterService.js   # OpenRouter API client
│   └── utils/                      # Utility functions
│       └── storage.js             # AsyncStorage helpers
└── assets/                         # Images, icons, fonts
    └── README.md                  # Asset documentation
```

## Development Setup

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Expo CLI (installed automatically)
- iOS Simulator (Mac only) or Android Emulator
- Physical device with Expo Go app (recommended)

### Running the Development Server

```bash
# Install dependencies
npm install

# Start the Expo development server
npm start
```

This will open the Expo DevTools in your browser. From there you can:
- Press `i` to open in iOS Simulator
- Press `a` to open in Android Emulator
- Scan QR code with Expo Go app on your physical device

### Development Commands

```bash
# Start development server
npm start

# Start with cache cleared
npx expo start --clear

# Run on specific platform
npm run ios      # iOS Simulator
npm run android  # Android Emulator
npm run web      # Web browser

# Check for issues
npx expo-doctor
```

## Code Organization

### Component Structure
- Each screen is a self-contained component
- Screens manage their own state and side effects
- Shared utilities are in the `utils` directory
- API calls are centralized in `services`

### State Management
- Using React hooks (useState, useEffect)
- AsyncStorage for persistence
- Navigation state managed by React Navigation

### Styling
- StyleSheet API for styles
- Inline conditional styles for dynamic styling
- Consistent color scheme across app

## Key Technologies

### React Native & Expo
- **React Native**: Core framework for building mobile apps with React
- **Expo**: Toolchain and platform for universal React applications

### Navigation
- **React Navigation**: Industry-standard navigation library
- **Stack Navigator**: For hierarchical navigation between screens

### Storage
- **AsyncStorage**: Key-value storage system for React Native
- Used for: API keys, chat history, selected model

### HTTP Client
- **Axios**: Promise-based HTTP client
- Used for all OpenRouter API calls

## API Integration

### OpenRouter API
Base URL: `https://openrouter.ai/api/v1`

#### Endpoints Used:
1. **GET /models**
   - Fetches list of available models
   - Requires: API key in Authorization header
   
2. **POST /chat/completions**
   - Sends chat messages and receives responses
   - Requires: API key, model ID, messages array

#### Headers Required:
```javascript
{
  'Authorization': 'Bearer YOUR_API_KEY',
  'HTTP-Referer': 'https://github.com/loztdev/AI_Idea',
  'X-Title': 'AI Idea App',
  'Content-Type': 'application/json'
}
```

## Testing

### Manual Testing Checklist
- [ ] API key can be set and persisted
- [ ] Models can be fetched and displayed
- [ ] Model search works correctly
- [ ] Model can be selected
- [ ] Messages can be sent
- [ ] Responses are received and displayed
- [ ] Chat history persists across restarts
- [ ] Chat history can be cleared
- [ ] Navigation works smoothly
- [ ] Error messages display appropriately
- [ ] Keyboard doesn't hide input field
- [ ] Long messages display correctly
- [ ] App works on both iOS and Android

### Test with Different Models
- Test with various OpenRouter models
- Verify different response formats
- Check pricing display for different models

## Common Issues & Solutions

### Issue: "API key not set"
**Solution**: Make sure to enter your OpenRouter API key in the app on first launch

### Issue: "Failed to fetch models"
**Solution**: Check your internet connection and verify API key is valid

### Issue: Metro bundler won't start
**Solution**: 
```bash
npx expo start --clear
```

### Issue: Dependencies out of sync
**Solution**:
```bash
rm -rf node_modules
npm install
```

## Building for Production

### iOS
```bash
# Build for iOS (requires Mac)
eas build --platform ios
```

### Android
```bash
# Build for Android
eas build --platform android
```

Note: You'll need to set up an Expo account and configure `eas.json` for production builds.

## Contributing

When contributing:
1. Follow existing code style
2. Test on both iOS and Android
3. Update documentation if adding features
4. Keep commits focused and atomic
5. Write descriptive commit messages

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [React Navigation Documentation](https://reactnavigation.org/)
- [OpenRouter API Documentation](https://openrouter.ai/docs)
- [AsyncStorage Documentation](https://react-native-async-storage.github.io/async-storage/)
