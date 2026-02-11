import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import openRouterService from '../services/openRouterService';
import { saveSelectedModel, loadApiKey } from '../utils/storage';

export default function ModelSelectorScreen({ navigation }) {
  const [models, setModels] = useState([]);
  const [filteredModels, setFilteredModels] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchModels();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredModels(models);
    } else {
      const filtered = models.filter(model =>
        model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        model.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredModels(filtered);
    }
  }, [searchQuery, models]);

  const fetchModels = async () => {
    setIsLoading(true);
    try {
      const apiKey = await loadApiKey();
      if (!apiKey) {
        Alert.alert('Error', 'Please set your API key first');
        navigation.goBack();
        return;
      }

      openRouterService.setApiKey(apiKey);
      const fetchedModels = await openRouterService.getModels();
      setModels(fetchedModels);
      setFilteredModels(fetchedModels);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch models. Please check your API key.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectModel = async (model) => {
    await saveSelectedModel(model);
    Alert.alert('Success', `Selected model: ${model.name}`);
    navigation.goBack();
  };

  const renderModelItem = ({ item }) => (
    <TouchableOpacity
      style={styles.modelItem}
      onPress={() => handleSelectModel(item)}
    >
      <View>
        <Text style={styles.modelName}>{item.name}</Text>
        <Text style={styles.modelId}>{item.id}</Text>
        {item.description && (
          <Text style={styles.modelDescription} numberOfLines={2}>
            {item.description}
          </Text>
        )}
        {item.pricing && (
          <View style={styles.pricingContainer}>
            <Text style={styles.pricingText}>
              Prompt: ${item.pricing.prompt} / Completion: ${item.pricing.completion}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading models...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search models..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCapitalize="none"
        />
      </View>

      <FlatList
        data={filteredModels}
        renderItem={renderModelItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {searchQuery ? 'No models found' : 'No models available'}
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  listContent: {
    padding: 10,
  },
  modelItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  modelName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
  },
  modelId: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  modelDescription: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
  },
  pricingContainer: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  pricingText: {
    fontSize: 12,
    color: '#007AFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});
