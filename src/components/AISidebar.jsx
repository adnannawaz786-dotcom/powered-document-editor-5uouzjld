import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, MessageSquare, Code, Edit3, FileText, Lightbulb } from 'lucide-react';
import { mockAIResponses } from '../data/mockData.js';

const AISidebar = ({ isOpen, onClose, selectedText = '', documentContent = '' }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');

  const tabs = [
    { id: 'chat', label: 'Chat', icon: MessageSquare },
    { id: 'suggestions', label: 'Suggestions', icon: Lightbulb },
    { id: 'code', label: 'Code', icon: Code },
    { id: 'edit', label: 'Edit', icon: Edit3 }
  ];

  const quickActions = [
    { label: 'Improve writing', action: 'improve' },
    { label: 'Fix grammar', action: 'grammar' },
    { label: 'Make shorter', action: 'shorten' },
    { label: 'Explain this', action: 'explain' },
    { label: 'Continue writing', action: 'continue' },
    { label: 'Summarize', action: 'summarize' }
  ];

  useEffect(() => {
    if (selectedText && isOpen) {
      setMessages([
        {
          id: Date.now(),
          type: 'system',
          content: `Selected text: "${selectedText}"`,
          timestamp: new Date()
        }
      ]);
    }
  }, [selectedText, isOpen]);

  const handleSendMessage = async (message = inputValue, isQuickAction = false) => {
    if (!message.trim() && !isQuickAction) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const randomResponse = mockAIResponses[Math.floor(Math.random() * mockAIResponses.length)];
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: randomResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleQuickAction = (action) => {
    const actionMessages = {
      improve: `Please improve this text: "${selectedText}"`,
      grammar: `Fix the grammar in: "${selectedText}"`,
      shorten: `Make this text shorter: "${selectedText}"`,
      explain: `Explain this: "${selectedText}"`,
      continue: `Continue writing from: "${selectedText}"`,
      summarize: `Summarize this: "${selectedText}"`
    };

    handleSendMessage(actionMessages[action] || `Help me with: ${action}`, true);
  };

  const renderChatContent = () => (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto space-y-4 p-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            <Sparkles className="w-12 h-12 mx-auto mb-4 text-blue-400" />
            <p className="text-sm">Ask me anything about your document</p>
          </div>
        )}
        
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-lg p-3 ${
                message.type === 'user'
                  ? 'bg-blue-600 text-white'
                  : message.type === 'system'
                  ? 'bg-yellow-100 text-yellow-800 text-xs'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              <p className={`text-xs mt-1 opacity-70`}>
                {message.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </motion.div>
        ))}
        
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-gray-100 rounded-lg p-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {selectedText && (
        <div className="border-t bg-gray-50 p-3">
          <p className="text-xs text-gray-600 mb-2">Quick actions:</p>
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((action) => (
              <button
                key={action.action}
                onClick={() => handleQuickAction(action.action)}
                className="text-xs bg-white border rounded px-2 py-1 hover:bg-gray-50 transition-colors"
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="border-t p-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask AI anything..."
            className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={isLoading || !inputValue.trim()}
            className="bg-blue-600 text-white rounded-lg px-3 py-2 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderSuggestionsContent = () => (
    <div className="p-4 space-y-4">
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-900">Writing Suggestions</h3>
        <div className="space-y-2">
          {[
            'Consider adding more specific examples to support your main points',
            'The transition between paragraphs 2 and 3 could be smoother',
            'This section might benefit from a clearer topic sentence',
            'Consider breaking this long paragraph into smaller ones'
          ].map((suggestion, index) => (
            <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-900">{suggestion}</p>
              <div className="mt-2 flex space-x-2">
                <button className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700">
                  Apply
                </button>
                <button className="text-xs border border-blue-300 text-blue-700 px-2 py-1 rounded hover:bg-blue-50">
                  Ignore
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCodeContent = () => (
    <div className="p-4 space-y-4">
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-900">Code Assistance</h3>
        <div className="bg-gray-900 rounded-lg p-4 text-green-400 font-mono text-sm">
          <div>// AI Code Helper</div>
          <div>function generateCode() {'{'}  </div>
          <div>  return "AI-generated code";</div>
          <div>{'}'}</div>
        </div>
        <div className="space-y-2">
          <button className="w-full text-left bg-gray-50 border rounded-lg p-3 hover:bg-gray-100 transition-colors">
            <div className="text-sm font-medium">Generate React Component</div>
            <div className="text-xs text-gray-600">Create a new component based on description</div>
          </button>
          <button className="w-full text-left bg-gray-50 border rounded-lg p-3 hover:bg-gray-100 transition-colors">
            <div className="text-sm font-medium">Optimize Code</div>
            <div className="text-xs text-gray-600">Improve performance and readability</div>
          </button>
          <button className="w-full text-left bg-gray-50 border rounded-lg p-3 hover:bg-gray-100 transition-colors">
            <div className="text-sm font-medium">Add Comments</div>
            <div className="text-xs text-gray-600">Generate documentation comments</div>
          </button>
        </div>
      </div>
    </div>
  );

  const renderEditContent = () => (
    <div className="p-4 space-y-4">
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-900">Edit Options</h3>
        <div className="space-y-2">
          {[
            { label: 'Rewrite for clarity', desc: 'Make the text clearer and more concise' },
            { label: 'Change tone', desc: 'Adjust the tone to be more formal/casual' },
            { label: 'Expand content', desc: 'Add more detail and examples' },
            { label: 'Fix grammar', desc: 'Correct grammatical errors' }
          ].map((option, index) => (
            <button key={index} className="w-full text-left bg-gray-50 border rounded-lg p-3 hover:bg-gray-100 transition-colors">
              <div className="text-sm font-medium">{option.label}</div>
              <div className="text-xs text-gray-600">{option.desc}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'chat':
        return renderChatContent();
      case 'suggestions':
        return renderSuggestionsContent();
      case 'code':
        return renderCodeContent();
      case 'edit':
        return renderEditContent();
      default:
        return renderChatContent();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5" />
                <h2 className="text-lg font-semibold">AI Assistant</h2>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-1 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex border-b">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center space-x-1 py-3 text-xs font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex-1 overflow-hidden">
              {renderTabContent()}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AISidebar;