"use client";

import React, { useState } from 'react';
import { User, Send, Phone, Video, MoreVertical, Paperclip, Smile, Mic, Search, Info, Settings } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'doctor';
  time: string;
}

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  online: boolean;
  avatar: string;
}

export default function chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Xin chào! Tôi có thể giúp gì cho bạn về tiêm chủng?",
      sender: "doctor",
      time: "10:00"
    },
    {
      id: 2,
      text: "Chào bác sĩ, tôi muốn tư vấn về lịch tiêm chủng cho con tôi 2 tuổi ạ.",
      sender: "user",
      time: "10:05"
    },
    {
      id: 3,
      text: "Tôi sẽ tư vấn chi tiết cho bạn. Bé hiện tại đã tiêm những loại vaccine nào rồi ạ?",
      sender: "doctor",
      time: "10:06"
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor>({
    id: 1,
    name: "BS. Nguyễn Văn A",
    specialty: "Chuyên khoa Nhi - Tiêm chủng",
    online: true,
    avatar: ""
  });

  const doctors: Doctor[] = [
    {
      id: 1,
      name: "BS. Nguyễn Văn A",
      specialty: "Chuyên khoa Nhi - Tiêm chủng",
      online: true,
      avatar: ""
    },
    {
      id: 2,
      name: "BS. Trần Thị B",
      specialty: "Chuyên khoa Nhi - Dinh dưỡng",
      online: true,
      avatar: ""
    },
    {
      id: 3,
      name: "BS. Lê Văn C",
      specialty: "Chuyên khoa Nội tổng quát",
      online: false,
      avatar: ""
    },
    {
      id: 4,
      name: "BS. Phạm Thị D",
      specialty: "Chuyên khoa Sản phụ khoa",
      online: true,
      avatar: ""
    }
  ];

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
          text: "Cảm ơn bạn đã chia sẻ thông tin. Tôi sẽ tư vấn cụ thể về lịch tiêm phù hợp cho bé.",
          sender: "doctor",
          time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, doctorMessage]);
      }, 1000);
    }
  };

  const selectDoctor = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    // Clear messages when switching doctors
    setMessages([
      {
        id: 1,
        text: `Xin chào! Tôi là ${doctor.name.split(' ')[1]}, tôi có thể giúp gì cho bạn về ${doctor.specialty.split('- ')[1]}?`,
        sender: "doctor",
        time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 flex">
      {/* Sidebar - Desktop only */}
      <div className="hidden lg:flex lg:w-80 bg-white shadow-lg border-r border-gray-200 flex-col">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Tư vấn Y tế</h3>
              <p className="text-cyan-100 text-sm">Hệ thống chat</p>
            </div>
          </div>
        </div>

        {/* Doctor Info */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                <User className="text-white w-7 h-7" />
              </div>
              <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${selectedDoctor.online ? 'bg-green-400' : 'bg-gray-400'} rounded-full border-2 border-white`}></div>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800">{selectedDoctor.name}</h4>
              <p className={`text-sm ${selectedDoctor.online ? 'text-green-500' : 'text-gray-500'} font-medium`}>
                {selectedDoctor.online ? '● Đang online' : '● Offline'}
              </p>
              <p className="text-xs text-gray-500 mt-1">{selectedDoctor.specialty}</p>
            </div>
          </div>
        </div>

        {/* Doctors List */}
        <div className="p-4 border-b border-gray-200">
          <h5 className="text-sm font-medium text-gray-700 mb-3">Chọn bác sĩ để chat</h5>
          <div className="space-y-3">
            {doctors.map((doctor) => (
              <button 
                key={doctor.id}
                onClick={() => selectDoctor(doctor)}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors text-left ${selectedDoctor.id === doctor.id ? 'bg-cyan-50 border border-cyan-100' : 'hover:bg-gray-50'}`}
              >
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                    <User className="text-white w-5 h-5" />
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${doctor.online ? 'bg-green-400' : 'bg-gray-400'} rounded-full border-2 border-white`}></div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-800 truncate">{doctor.name}</h4>
                  <p className="text-xs text-gray-500 truncate">{doctor.specialty}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Topics */}
        <div className="p-4 flex-1">
          <h5 className="text-sm font-medium text-gray-700 mb-3">Chủ đề gần đây</h5>
          <div className="space-y-2 text-sm">
            <div className="p-2 bg-gray-50 rounded-lg">
              <p className="text-gray-700">Lịch tiêm chủng trẻ em</p>
              <p className="text-xs text-gray-500 mt-1">Hôm qua</p>
            </div>
            <div className="p-2 bg-gray-50 rounded-lg">
              <p className="text-gray-700">Vaccine COVID-19</p>
              <p className="text-xs text-gray-500 mt-1">2 ngày trước</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-4 py-4 lg:px-6 lg:py-5">
            <div className="flex items-center justify-between max-w-none">
              <div className="flex items-center space-x-3 lg:space-x-4">
                <div className="relative lg:hidden">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                    <User className="text-white w-5 h-5" />
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${selectedDoctor.online ? 'bg-green-400' : 'bg-gray-400'} rounded-full border-2 border-white`}></div>
                </div>
                <div>
                  <h2 className="text-lg lg:text-xl font-bold text-gray-800">
                    <span className="lg:hidden">{selectedDoctor.name}</span>
                    <span className="hidden lg:block">Tư vấn với {selectedDoctor.name}</span>
                  </h2>
                  <p className={`text-sm ${selectedDoctor.online ? 'text-green-500' : 'text-gray-500'} font-medium lg:hidden`}>
                    {selectedDoctor.online ? '● Đang online' : '● Offline'}
                  </p>
                  <p className="hidden lg:block text-sm text-gray-500">
                    {selectedDoctor.specialty} • {selectedDoctor.online ? 'Đang online' : 'Offline'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-600 hover:text-cyan-600 hover:bg-cyan-50 rounded-full transition-colors">
                  <Search className="w-4 h-4 lg:w-5 lg:h-5" />
                </button>
                <button className="p-2 text-gray-600 hover:text-cyan-600 hover:bg-cyan-50 rounded-full transition-colors">
                  <Phone className="w-4 h-4 lg:w-5 lg:h-5" />
                </button>
                <button className="p-2 text-gray-600 hover:text-cyan-600 hover:bg-cyan-50 rounded-full transition-colors">
                  <Video className="w-4 h-4 lg:w-5 lg:h-5" />
                </button>
                <button className="p-2 text-gray-600 hover:text-cyan-600 hover:bg-cyan-50 rounded-full transition-colors">
                  <MoreVertical className="w-4 h-4 lg:w-5 lg:h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-50 to-white">
          <div className="px-4 py-4 lg:px-8 lg:py-6">
            <div className="max-w-4xl mx-auto space-y-4 lg:space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-end space-x-3 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-2xl ${
                    message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    {message.sender === 'doctor' && (
                      <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="text-white w-4 h-4 lg:w-5 lg:h-5" />
                      </div>
                    )}
                    <div
                      className={`px-4 py-3 lg:px-5 lg:py-4 rounded-2xl shadow-sm ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-br-md'
                          : 'bg-white text-gray-800 border border-gray-200 rounded-bl-md shadow-md'
                      }`}
                    >
                      <p className="text-sm lg:text-base leading-relaxed">{message.text}</p>
                      <p className={`text-xs lg:text-sm mt-2 ${
                        message.sender === 'user' ? 'text-cyan-100' : 'text-gray-500'
                      }`}>
                        {message.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Message Input */}
        <div className="bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-3 lg:px-8 lg:py-5">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center space-x-3 lg:space-x-4">
                {/* Desktop additional buttons */}
                <div className="hidden lg:flex items-center space-x-2">
                  <button className="p-2 text-gray-500 hover:text-cyan-600 hover:bg-cyan-50 rounded-full transition-colors">
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-cyan-600 hover:bg-cyan-50 rounded-full transition-colors">
                    <Smile className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Message input */}
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Nhập tin nhắn..."
                    className="w-full px-4 py-3 lg:px-5 lg:py-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm lg:text-base shadow-sm"
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  />
                </div>
                
                {/* Mobile microphone button */}
                <button className="lg:hidden p-2 text-gray-500 hover:text-cyan-600 hover:bg-cyan-50 rounded-full transition-colors">
                  <Mic className="w-5 h-5" />
                </button>
                
                {/* Send button */}
                <button
                  onClick={sendMessage}
                  className="p-3 lg:p-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full hover:from-cyan-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
                  disabled={!newMessage.trim()}
                >
                  <Send className="w-4 h-4 lg:w-5 lg:h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}