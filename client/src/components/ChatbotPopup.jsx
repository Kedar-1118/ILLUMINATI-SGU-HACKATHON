import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const ChatbotPopup = () => {
  // States for managing the chatbot UI and functionality
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! How can I help you today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Scroll to bottom of messages when new messages are added
  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // Toggle chatbot open/closed
  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };
  
  // Handle input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  
 // Handle form submission
const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    // Add user message to chat
    const userMessage = inputValue.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInputValue('');
    setIsLoading(true);
    
    try {
      // Direct API call to Groq
      const response = await axios.post(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          messages: [{ role: 'user', content: userMessage },
            { role: "system", content: "You are an Open Source Helper: you will only answer queries about code, open‑source contributions, libraries, tools, and governance. If asked anything outside that domain, reply “Please stick to coding and contributions, sir.” Keep every answer as short as possible: 2–3 sentences for minor questions, up to 6–7 sentences for more complex topics." }
          ],
          model: "llama-3.3-70b-versatile",
        },
        {
          headers: {
            'Authorization': 'Bearer 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', // Replace with your actual API key
            'Content-Type': 'application/json'
          }
        }
      );
      
      // Add AI response to chat
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: response.data.choices[0].message.content 
      }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error processing your request. Please try again.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Format message content with basic markdown support
  const formatMessage = (content) => {
    // Replace markdown-style formatting with HTML
    let formatted = content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
      .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic
      .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>') // Code blocks
      .replace(/`(.*?)`/g, '<code>$1</code>') // Inline code
      .replace(/\n/g, '<br>'); // Line breaks
    
    return { __html: formatted };
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Main chatbot container, conditionally expanded */}
      <div 
        className={`flex flex-col bg-gray-800 border border-gray-700 rounded-2xl shadow-xl transition-all duration-300 overflow-hidden ${
          isOpen 
            ? 'h-[500px] w-[350px] opacity-100' 
            : 'h-0 w-0 opacity-0 pointer-events-none'
        }`}
      >
        {/* Chat header */}
        <div className="flex items-center justify-between px-4 py-3 bg-gray-900 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
                />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-gray-200">GitGenie</h3>
              <p className="text-xs text-gray-400">Powered by Gemini</p>
            </div>
          </div>
          <button 
            onClick={toggleChatbot}
            className="text-gray-400 hover:text-gray-200 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Messages container */}
        <div className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`mb-3 ${
                message.role === 'user' ? 'text-right' : 'text-left'
              }`}
            >
              <div 
                className={`inline-block max-w-[85%] px-4 py-2 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-purple-600 text-white rounded-tr-none'
                    : 'bg-gray-700 text-gray-200 rounded-tl-none'
                }`}
              >
                <div 
                  className="text-sm"
                  dangerouslySetInnerHTML={formatMessage(message.content)}
                />
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="text-left mb-3">
              <div className="inline-block bg-gray-700 text-gray-200 px-4 py-2 rounded-lg rounded-tl-none">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input form */}
        <form 
          onSubmit={handleSubmit}
          className="border-t border-gray-700 p-3 bg-gray-900"
        >
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Ask something..."
              className="flex-1 bg-gray-800 text-gray-200 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500 transition-colors"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className={`p-2 rounded-lg ${
                isLoading || !inputValue.trim()
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-purple-600 text-white hover:bg-purple-700'
              } transition-colors`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </form>
      </div>
      
      {/* Chat button */}
      <button
        onClick={toggleChatbot}
        className={`w-14 h-14 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-lg hover:bg-purple-700 transition-colors ${
          isOpen ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100'
        }`}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
          />
        </svg>
      </button>
    </div>
  );
};

export default ChatbotPopup;
