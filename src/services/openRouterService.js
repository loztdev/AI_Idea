import axios from 'axios';

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1';

class OpenRouterService {
  constructor() {
    this.apiKey = null;
  }

  setApiKey(apiKey) {
    this.apiKey = apiKey;
  }

  async getModels() {
    try {
      const response = await axios.get(`${OPENROUTER_API_URL}/models`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'HTTP-Referer': 'https://github.com/loztdev/AI_Idea',
          'X-Title': 'AI Idea App'
        }
      });
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching models:', error);
      throw error;
    }
  }

  async sendMessage(messages, modelId) {
    try {
      const response = await axios.post(
        `${OPENROUTER_API_URL}/chat/completions`,
        {
          model: modelId,
          messages: messages,
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'HTTP-Referer': 'https://github.com/loztdev/AI_Idea',
            'X-Title': 'AI Idea App',
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (!response.data.choices || response.data.choices.length === 0) {
        throw new Error('No response from model');
      }
      
      return response.data.choices[0].message;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }
}

export default new OpenRouterService();
