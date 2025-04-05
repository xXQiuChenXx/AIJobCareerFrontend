import { useState, useEffect, useCallback } from 'react';
import { CozeAIService, type CozeMessage } from '../app/services/cozeAI';

interface UseCozeChat {
  messages: CozeMessage[];
  input: string;
  status: 'idle' | 'streaming' | 'submitting';
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  setInput: (input: string) => void;
}

interface UseCozeAIConfig {
  apiKey: string;
  botId: string;
  initialMessages?: CozeMessage[];
  conversationId?: string;
  streaming?: boolean;
}

export function useCozeChat({
  apiKey,
  botId,
  initialMessages = [],
  conversationId: initialConversationId,
  streaming = true,
}: UseCozeAIConfig): UseCozeChat {
  const [messages, setMessages] = useState<CozeMessage[]>(initialMessages);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<'idle' | 'streaming' | 'submitting'>('idle');
  const [conversationId, setConversationId] = useState<string | undefined>(initialConversationId);

  // Initialize the Coze service
  const cozeService = new CozeAIService({ apiKey, botId });

  // Function to handle input changes
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  }, []);

  // Function to handle message submission
  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      
      if (!input.trim()) return;
      
      // Create a temporary user message
      const userMessage: CozeMessage = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: input,
        createdAt: new Date(),
      };
      
      setMessages((prev) => [...prev, userMessage]);
      setInput('');
      
      try {
        // Create a new conversation if we don't have one
        if (!conversationId) {
          const newConversationId = await cozeService.createConversation();
          setConversationId(newConversationId);
        }

        if (streaming) {
          // Create a placeholder for the assistant's response
          const assistantPlaceholder: CozeMessage = {
            id: `placeholder-${Date.now()}`,
            role: 'assistant',
            content: '',
            createdAt: new Date(),
          };
          
          // Add placeholder message for streaming
          setMessages((prev) => [...prev, assistantPlaceholder]);
          setStatus('streaming');
          
          // Start streaming response
          const stream = await cozeService.sendMessage(input, conversationId);
          const reader = stream.getReader();
          let responseContent = '';
          
          while (true) {
            const { done, value } = await reader.read();
            
            if (done) break;
            
            // Append new content chunk
            responseContent += value.content || '';
            
            // Update the placeholder message with current content
            setMessages((prev) => 
              prev.map(msg => 
                msg.id === assistantPlaceholder.id 
                  ? { ...msg, content: responseContent }
                  : msg
              )
            );
          }
          
          // Finalize the message with a proper ID
          setMessages((prev) => 
            prev.map(msg => 
              msg.id === assistantPlaceholder.id 
                ? { ...msg, id: `assistant-${Date.now()}` }
                : msg
            )
          );
          
          setStatus('idle');
        } else {
          // Use non-streaming API
          setStatus('submitting');
          
          const responseMessage = await cozeService.sendMessage(input, conversationId);
          
          // Add the assistant message to the chat
          setMessages((prev) => [...prev, responseMessage]);
          setStatus('idle');
        }
      } catch (error) {
        console.error('Failed to send message:', error);
        setStatus('idle');
        // Could add an error message to the chat here
      }
    },
    [input, cozeService, conversationId, streaming]
  );

  // Load conversation history if we have a conversation ID
  useEffect(() => {
    if (conversationId && messages.length === 0) {
      cozeService.getConversationHistory(conversationId)
        .then(history => setMessages(history))
        .catch(error => console.error('Failed to load conversation history:', error));
    }
  }, [conversationId, cozeService, messages.length]);

  return {
    messages,
    input,
    status,
    handleInputChange,
    handleSubmit,
    setInput,
  };
}
