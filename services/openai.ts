import Constants from 'expo-constants';

const OPENAI_API_KEY =
  process.env.EXPO_PUBLIC_OPENAI_API_KEY ||
  Constants.expoConfig?.extra?.EXPO_PUBLIC_OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface ChatResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export class OpenAIService {
  private static instance: OpenAIService;
  private conversationHistories: Record<string, ChatMessage[]> = {};

  static getInstance(): OpenAIService {
    if (!OpenAIService.instance) {
      OpenAIService.instance = new OpenAIService();
    }
    return OpenAIService.instance;
  }

  async sendMessage(userMessage: string, featureKey: string, systemPrompt: string): Promise<ChatResponse> {
    try {
      if (!OPENAI_API_KEY) {
        throw new Error('OpenAI API key not configured');
      }

      if (!this.conversationHistories[featureKey]) {
        this.conversationHistories[featureKey] = [];
      }

      // Add user message to conversation history
      const userMsg: ChatMessage = {
        id: Date.now().toString(),
        content: userMessage,
        role: 'user',
        timestamp: new Date(),
      };
      this.conversationHistories[featureKey].push(userMsg);

      // Prepare messages for OpenAI API
      const messages = [
        {
          role: 'system',
          content: systemPrompt,
        },
        ...this.conversationHistories[featureKey].map(msg => ({
          role: msg.role,
          content: msg.content,
        })),
      ];

      const response = await fetch(OPENAI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages,
          max_tokens: 500,
          temperature: 0.7,
          presence_penalty: 0.1,
          frequency_penalty: 0.1,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = data.choices[0]?.message?.content;

      if (!aiResponse) {
        throw new Error('No response from AI');
      }

      // Add AI response to conversation history
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        role: 'assistant',
        timestamp: new Date(),
      };
      this.conversationHistories[featureKey].push(aiMsg);

      return {
        success: true,
        message: aiResponse,
      };
    } catch (error) {
      console.error('OpenAI API Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  getConversationHistory(featureKey: string): ChatMessage[] {
    return [...(this.conversationHistories[featureKey] || [])];
  }

  clearConversation(featureKey: string): void {
    this.conversationHistories[featureKey] = [];
  }

  addMessage(featureKey: string, message: ChatMessage): void {
    if (!this.conversationHistories[featureKey]) {
      this.conversationHistories[featureKey] = [];
    }
    this.conversationHistories[featureKey].push(message);
  }
}

export default OpenAIService.getInstance(); 