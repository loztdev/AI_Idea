import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import openRouterService from '../services/openRouterService';
import {
  saveChatHistory,
  loadChatHistory,
  clearChatHistory,
  saveApiKey,
  loadApiKey,
  loadSelectedModel,
} from '../utils/storage';

export default function ChatScreen({ navigation }) {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [selectedModel, setSelectedModel] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const flatListRef = useRef(null);

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadSelectedModelData();
    });
    return unsubscribe;
  }, [navigation]);

  const loadInitialData = async () => {
    const storedApiKey = await loadApiKey();
    const storedHistory = await loadChatHistory();
    const storedModel = await loadSelectedModel();

    if (storedApiKey) {
      setApiKey(storedApiKey);
      openRouterService.setApiKey(storedApiKey);
    } else {
      setShowApiKeyInput(true);
    }

    if (storedHistory) {
      setMessages(storedHistory);
    }

    if (storedModel) {
      setSelectedModel(storedModel);
    }
  };

  const loadSelectedModelData = async () => {
    const storedModel = await loadSelectedModel();
    if (storedModel) {
      setSelectedModel(storedModel);
    }
  };

  const handleSaveApiKey = async () => {
    if (apiKey.trim()) {
      await saveApiKey(apiKey);
      openRouterService.setApiKey(apiKey);
      setShowApiKeyInput(false);
      Alert.alert('Success', 'API Key saved successfully');
    } else {
      Alert.alert('Error', 'Please enter a valid API key');
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    if (!apiKey) {
      Alert.alert('Error', 'Please set your OpenRouter API key first');
      setShowApiKeyInput(true);
      return;
    }

    if (!selectedModel) {
      Alert.alert('Error', 'Please select a model first');
      navigation.navigate('ModelSelector');
      return;
    }

    const userMessage = {
      role: 'user',
      content: inputText,
      timestamp: new Date().toISOString(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputText('');
    setIsLoading(true);

    try {
      const apiMessages = newMessages.map(msg => ({
        role: msg.role,
        content: msg.content,
      }));

      const assistantMessage = await openRouterService.sendMessage(
        apiMessages,
        selectedModel.id
      );

      const assistantMessageWithTimestamp = {
        ...assistantMessage,
        timestamp: new Date().toISOString(),
      };

      const updatedMessages = [...newMessages, assistantMessageWithTimestamp];
      setMessages(updatedMessages);
      await saveChatHistory(updatedMessages);

      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    } catch (error) {
      Alert.alert('Error', 'Failed to send message. Please check your API key and try again.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    Alert.alert(
      'Clear History',
      'Are you sure you want to clear all chat history?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            setMessages([]);
            await clearChatHistory();
          },
        },
      ]
    );
  };

  const renderMessage = ({ item }) => {
    const isUser = item.role === 'user';
    return (
      <View style={[styles.messageContainer, isUser ? styles.userMessage : styles.assistantMessage]}>
        <Text style={[styles.messageRole, isUser && styles.userText]}>{isUser ? 'You' : 'Assistant'}</Text>
        <Text style={[styles.messageText, isUser && styles.userText]}>{item.content}</Text>
        <Text style={[styles.messageTime, isUser && styles.userText]}>
          {new Date(item.timestamp).toLocaleTimeString()}
        </Text>
      </View>
    );
  };

  if (showApiKeyInput) {
    return (
      <View style={styles.container}>
        <View style={styles.apiKeyContainer}>
          <Text style={styles.apiKeyTitle}>Enter OpenRouter API Key</Text>
          <TextInput
            style={styles.apiKeyInput}
            placeholder="sk-or-v1-..."
            value={apiKey}
            onChangeText={setApiKey}
            secureTextEntry
            autoCapitalize="none"
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveApiKey}>
            <Text style={styles.saveButtonText}>Save API Key</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.modelButton}
          onPress={() => navigation.navigate('ModelSelector')}
        >
          <Text style={styles.modelButtonText}>
            {selectedModel ? selectedModel.name : 'Select Model'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.clearButton} onPress={handleClearHistory}>
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.clearButton}
          onPress={() => setShowApiKeyInput(true)}
        >
          <Text style={styles.clearButtonText}>API Key</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item, index) => index.toString()}
        style={styles.messageList}
        contentContainerStyle={styles.messageListContent}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />

      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#007AFF" />
          <Text style={styles.loadingText}>Thinking...</Text>
        </View>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={inputText}
          onChangeText={setInputText}
          multiline
          editable={!isLoading}
        />
        <TouchableOpacity
          style={[styles.sendButton, isLoading && styles.sendButtonDisabled]}
          onPress={handleSendMessage}
          disabled={isLoading}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
  },
  modelButton: {
    flex: 1,
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 5,
    marginRight: 10,
  },
  modelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  clearButton: {
    padding: 10,
    backgroundColor: '#FF3B30',
    borderRadius: 5,
    marginLeft: 5,
  },
  clearButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  messageList: {
    flex: 1,
  },
  messageListContent: {
    padding: 10,
  },
  messageContainer: {
    marginBottom: 15,
    padding: 12,
    borderRadius: 10,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
  },
  assistantMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  messageRole: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 12,
    opacity: 0.7,
  },
  messageText: {
    fontSize: 16,
    color: '#000',
  },
  userText: {
    color: '#fff',
  },
  messageTime: {
    fontSize: 10,
    marginTop: 5,
    opacity: 0.5,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
  loadingText: {
    marginLeft: 10,
    color: '#007AFF',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    maxHeight: 100,
    backgroundColor: '#f9f9f9',
  },
  sendButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#ccc',
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  apiKeyContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  apiKeyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  apiKeyInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
