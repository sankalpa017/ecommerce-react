import { useState, useEffect } from 'react';
import { ChatInput } from './components/ChatInput';
import { ChatMessages } from './components/ChatMessages';
import { Chatbot } from 'supersimpledev';

import './App.css'

function App() {
  const [chatMessages, setChatMessages] = useState(JSON.parse(localStorage.getItem('chat-messages')) || []);

  useEffect(() => {
    Chatbot.addResponses({
      'which is the highest mountain in the world': 'Mt. Everest',
      'who is the richest man': 'Elon Musk'
    })
  }, []);

  useEffect(() => {
    localStorage.setItem('chat-messages', JSON.stringify(chatMessages));
  }, [chatMessages]);

  return (
    <div className="app">
      <ChatMessages 
        chatMessages={chatMessages}
      />
      <ChatInput 
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  )
}

export default App
