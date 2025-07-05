import React, { useState } from 'react';
import { FaUserMd } from 'react-icons/fa';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'doctor';
  time: string;
}

export default function chat() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      text: "Xin chào! Tôi có thể giúp gì cho bạn về tiêm chủng?", 
      sender: "doctor", 
      time: "10:00" 
    }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (newMessage.trim()) {
      const userMessage: Message = {
        id: Date.now(),
        text: newMessage,
        sender: "user",
        time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, userMessage]);
      setNewMessage('');
      
      // Simulate doctor response
      setTimeout(() => {
        const doctorMessage: Message = {
          id: Date.now() + 1,
          text: "Cảm ơn bạn đã liên hệ. Tôi sẽ tư vấn chi tiết cho bạn về vấn đề này.",
          sender: "doctor",
          time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, doctorMessage]);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b p-4">
        <h1 className="text-xl font-bold text-gray-800 text-center">Chat với Bác sĩ</h1>
      </div>
      
      {/* Doctor Info */}
      <div className="bg-white border-b p-4 flex items-center space-x-3">
        <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center">
          <FaUserMd className="text-white text-lg" />
        </div>
        <div>
          <h2 className="font-semibold text-gray-800">BS. Nguyễn Văn A</h2>
          <p className="text-sm text-green-500">● Đang online</p>
        </div>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-cyan-500 text-white'
                  : 'bg-white text-gray-800 border'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p className={`text-xs mt-1 ${
                message.sender === 'user' ? 'text-cyan-100' : 'text-gray-500'
              }`}>
                {message.time}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Input */}
      <div className="bg-white border-t p-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Nhập tin nhắn..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            Gửi
          </button>
        </div>
      </div>
    </div>
  );
}