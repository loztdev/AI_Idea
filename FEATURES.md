# Features Overview

## Core Features

### 1. OpenRouter Integration
- Direct integration with OpenRouter API
- Support for all models available through OpenRouter
- Secure API key management

### 2. Chat Interface
- Clean, modern chat UI with message bubbles
- User messages displayed in blue on the right
- Assistant messages displayed in white on the left
- Message timestamps for tracking conversation history
- Loading indicator while waiting for responses
- Scrollable message history
- Text input with multi-line support

### 3. Persistent Chat History
- All messages automatically saved to device storage
- Chat history restored when app reopens
- Clear history option with confirmation dialog
- Uses AsyncStorage for reliable local persistence

### 4. Model Selector & Searcher
- Browse all available OpenRouter models
- Search models by name or ID
- Display model details including:
  - Model name
  - Model ID
  - Description (when available)
  - Pricing information (prompt & completion costs)
- Tap to select and immediately use any model
- Selected model persists across app sessions

### 5. API Key Management
- Secure API key storage on device
- Easy API key setup on first launch
- Change API key anytime via settings
- API key validation when making requests

## User Experience Features

### Navigation
- Simple two-screen navigation
- Header buttons for quick access to:
  - Model selector
  - Clear history
  - API key settings

### Error Handling
- Clear error messages for common issues
- API key validation
- Network error handling
- Model selection prompts

### Visual Design
- Clean, minimalist interface
- High contrast for readability
- Responsive design for different screen sizes
- Keyboard-aware layout (no hidden inputs)

## Technical Features

### Cross-Platform Support
- iOS support
- Android support
- Web support (via Expo)

### Performance
- Efficient message rendering with FlatList
- Optimized storage operations
- Minimal re-renders

### Security
- API keys stored securely on device
- No server-side storage of user data
- All API communication over HTTPS
- No tracking or analytics

## Future Enhancement Ideas

Potential features that could be added:
- Message editing
- Message regeneration
- Export chat history
- Multiple conversation threads
- Voice input
- Image support (for vision models)
- System message customization
- Temperature and other parameter controls
- Model presets/favorites
- Dark mode
- Markdown rendering for code blocks
- Conversation search
