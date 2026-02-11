# AI Idea - OpenRouter Mobile App

A React Native mobile application for accessing OpenRouter's AI models with chat history and model selection capabilities.

## Features

- 🤖 **OpenRouter Integration**: Access multiple AI models through OpenRouter's API
- 💬 **Chat History**: Persistent chat history stored locally on your device
- 🔍 **Model Selector/Searcher**: Browse and search through available AI models
- 📱 **Cross-Platform**: Works on iOS and Android devices
- 🔒 **Secure API Key Storage**: Your OpenRouter API key is stored securely on device

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Expo CLI
- An OpenRouter API key (get one at https://openrouter.ai/)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/loztdev/AI_Idea.git
cd AI_Idea
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run on your device or emulator:
   - For iOS: Press `i` or run `npm run ios`
   - For Android: Press `a` or run `npm run android`
   - For Web: Press `w` or run `npm run web`

### First Time Setup

1. When you first launch the app, you'll be prompted to enter your OpenRouter API key
2. Get your API key from https://openrouter.ai/
3. Enter the API key in the app
4. Select a model from the Model Selector
5. Start chatting!

## Usage

### Setting Your API Key

1. Open the app
2. If not already set, you'll see an API key input screen
3. Enter your OpenRouter API key (starts with `sk-or-v1-`)
4. Tap "Save API Key"

You can change your API key anytime by tapping the "API Key" button in the chat header.

### Selecting a Model

1. Tap the "Select Model" button in the chat header
2. Browse or search for available models
3. Tap on a model to select it
4. The selected model will be used for all future messages

### Chatting

1. Type your message in the input field at the bottom
2. Tap "Send"
3. Wait for the AI's response
4. Continue the conversation!

### Managing Chat History

- **View History**: All messages are displayed in the chat screen
- **Clear History**: Tap the "Clear" button in the header to delete all messages
- **Persistent Storage**: Your chat history is automatically saved and will be restored when you reopen the app

## Project Structure

```
AI_Idea/
├── App.js                      # Main app component with navigation
├── app.json                    # Expo configuration
├── package.json                # Dependencies and scripts
├── src/
│   ├── screens/
│   │   ├── ChatScreen.js       # Main chat interface
│   │   └── ModelSelectorScreen.js  # Model selection screen
│   ├── services/
│   │   └── openRouterService.js    # OpenRouter API integration
│   └── utils/
│       └── storage.js          # AsyncStorage utilities
└── assets/                     # App icons and images
```

## Technologies Used

- **React Native**: Cross-platform mobile development
- **Expo**: Development toolchain and runtime
- **React Navigation**: Navigation between screens
- **AsyncStorage**: Local data persistence
- **Axios**: HTTP client for API calls
- **OpenRouter API**: Access to multiple AI models

## API Reference

This app uses the OpenRouter API (https://openrouter.ai/docs):

- `GET /api/v1/models` - Fetch available models
- `POST /api/v1/chat/completions` - Send chat messages

## Security Notes

- API keys are stored locally on your device using AsyncStorage
- API keys are never sent to any server except OpenRouter's API
- All communication with OpenRouter is done over HTTPS

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC License - see LICENSE file for details

## Support

For issues and questions:
- Open an issue on GitHub: https://github.com/loztdev/AI_Idea/issues
- OpenRouter documentation: https://openrouter.ai/docs

## Acknowledgments

- Built with [Expo](https://expo.dev/)
- Powered by [OpenRouter](https://openrouter.ai/)
