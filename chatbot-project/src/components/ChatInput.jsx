import { useState } from 'react';
import { Chatbot } from 'supersimpledev';
import dayjs from 'dayjs';
import './ChatInput.css';
 
export function ChatInput({chatMessages, setChatMessages}) {

  const [inputText, setInputText] = useState('')

  const [isLoading, setIsLoading] = useState(false)

  async function sendMessage() {

    if (!isLoading && inputText) {
      setInputText('');

      const changedMessages = [
        ...chatMessages,
        {
          message: inputText,
          sender: "user",
          key: crypto.randomUUID(),
          time: dayjs().valueOf(),
        }
      ]

      setChatMessages(changedMessages);

      setChatMessages([
        ...changedMessages,
        {
          message: 'loading',
          sender: "robot",
          key: crypto.randomUUID()
        }
      ]);


      setIsLoading(true);

      const response = await Chatbot.getResponseAsync(inputText);

      setIsLoading(false);

      setChatMessages([
        ...changedMessages,
        {
          message: response,
          sender: "robot",
          key: crypto.randomUUID(),
          time: dayjs().valueOf(),
        }
      ]);
    }
 
  }

  function changeInputText(event) {
    setInputText(event.target.value);
  }

  function checkKey(event) {
    if(event.key === 'Enter') {
      if(!isLoading) {
        sendMessage();
      }
    }
    if(event.key === 'Escape') {
      setInputText('');
    }
  }

  function clearMessages() {
    setChatMessages([]);
  }

  return(
    <div className="chat-input-container">
      <input 
        placeholder="Send a message to Chatbot" 
        size="30"
        onChange={changeInputText} 
        onKeyDown={checkKey}
        value={inputText}
        className="chat-input-box"
      />
      <button 
        onClick={sendMessage}
        className="send-button"
      >
      Send
      </button>
      <button
        className="clear-button"
        onClick={clearMessages}
      >
        Clear
      </button>
    </div>
  )
}