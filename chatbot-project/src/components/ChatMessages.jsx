import { useRef, useEffect } from 'react';
import { ChatMessage } from './ChatMessage';
import './ChatMessages.css';

export function ChatMessages({chatMessages}) {
  const chatMessagesRef = useAutoScroll(chatMessages);
  return(
    <div 
    className="chat-message-container"
    ref={chatMessagesRef}
    >
    { 
      chatMessages.length === 0
      ? <p className="welcome-message">
          Welcome to the chatbot project! Send a message using the textbox below.
        </p>
      
      : chatMessages.map((chatMessage) => {
          return (
            <ChatMessage 
              message={chatMessage.message}
              sender={chatMessage.sender}
              key={chatMessage.key}
              time= {chatMessage.time}
            />
          )
        })    
    }
    </div>
  )
}

function useAutoScroll(dependencies) {
  const chatMessagesRef = useRef(null)

  useEffect(() => {
    const containerElem = chatMessagesRef.current;
    containerElem.scrollTop = containerElem.scrollHeight;
  }, [dependencies])

  return chatMessagesRef;
}
