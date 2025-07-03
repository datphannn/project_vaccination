import React from 'react';
import { FaUser, FaSyringe, FaCalendarAlt, FaVial, FaChartBar } from 'react-icons/fa';

interface Stat {
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export default function management() {
  const stats: Stat[] = [
    { title: "Tổng số bệnh nhân", value: "1,234", icon: FaUser, color: "blue" },
    { title: "Lượt tiêm hôm nay", value: "45", icon: FaSyringe, color: "green" },
    { title: "Lịch hẹn tuần này", value: "156", icon: FaCalendarAlt, color: "yellow" },
    { title: "Tổng vắc xin", value: "12", icon: FaVial, color: "purple" }
  ];

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Quản lý Hệ thống</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                </div>
                <stat.icon className={`text-3xl text-${stat.color}-500`} />
              </div>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <FaChartBar className="text-cyan-600 mr-2" />
              Thống kê tiêm chủng
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>COVID-19</span>
                  <span>75%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-cyan-600 h-2 rounded-full" style={{width: '75%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Cúm mùa</span>
                  <span>60%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{width: '60%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Viêm gan B</span>
                  <span>90%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{width: '90%'}}></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Hoạt động gần đây</h3>
            <div className="space-y-3">
              <div className="flex items-center p-3 bg-gray-50 rounded">
                <FaUser className="text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium">Bệnh nhân mới đăng ký</p>
                  <p className="text-xs text-gray-500">2 phút trước</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded">
                <FaSyringe className="text-green-400 mr-3" />
                <div>
                  <p className="text-sm font-medium">Hoàn thành tiêm vắc xin COVID-19</p>
                  <p className="text-xs text-gray-500">15 phút trước</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded">
                <FaCalendarAlt className="text-blue-400 mr-3" />
                <div>
                  <p className="text-sm font-medium">Lịch hẹn mới được tạo</p>
                  <p className="text-xs text-gray-500">1 giờ trước</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}