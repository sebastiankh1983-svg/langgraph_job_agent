import React from 'react';
import { Message } from '../types';
import './MessageList.css';

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  if (messages.length === 0) return null;

  return (
    <div className="message-list">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`message ${message.role === 'user' ? 'message-user' : 'message-assistant'}`}
        >
          <div className="message-icon">
            {message.role === 'user' ? '👤' : '🤖'}
          </div>
          <div className="message-content">
            <div className="message-text">{message.content}</div>
            <div className="message-time">
              {new Date(message.timestamp).toLocaleTimeString('de-DE')}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;

