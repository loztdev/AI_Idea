import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAT_HISTORY_KEY = '@chat_history';
const API_KEY_STORAGE_KEY = '@api_key';
const SELECTED_MODEL_KEY = '@selected_model';

export const saveChatHistory = async (messages) => {
  try {
    await AsyncStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(messages));
  } catch (error) {
    console.error('Error saving chat history:', error);
  }
};

export const loadChatHistory = async () => {
  try {
    const history = await AsyncStorage.getItem(CHAT_HISTORY_KEY);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Error loading chat history:', error);
    return [];
  }
};

export const clearChatHistory = async () => {
  try {
    await AsyncStorage.removeItem(CHAT_HISTORY_KEY);
  } catch (error) {
    console.error('Error clearing chat history:', error);
  }
};

export const saveApiKey = async (apiKey) => {
  try {
    await AsyncStorage.setItem(API_KEY_STORAGE_KEY, apiKey);
  } catch (error) {
    console.error('Error saving API key:', error);
  }
};

export const loadApiKey = async () => {
  try {
    const apiKey = await AsyncStorage.getItem(API_KEY_STORAGE_KEY);
    return apiKey;
  } catch (error) {
    console.error('Error loading API key:', error);
    return null;
  }
};

export const saveSelectedModel = async (model) => {
  try {
    await AsyncStorage.setItem(SELECTED_MODEL_KEY, JSON.stringify(model));
  } catch (error) {
    console.error('Error saving selected model:', error);
  }
};

export const loadSelectedModel = async () => {
  try {
    const model = await AsyncStorage.getItem(SELECTED_MODEL_KEY);
    return model ? JSON.parse(model) : null;
  } catch (error) {
    console.error('Error loading selected model:', error);
    return null;
  }
};
