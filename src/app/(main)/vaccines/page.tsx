import React from 'react';
import { FaSyringe } from 'react-icons/fa';

interface Vaccine {
  id: number;
  name: string;
  age: string;
  price: string;
  description: string;
}

export default function vaccines() {
  const vaccines: Vaccine[] = [
    { id: 1, name: "Vắc xin COVID-19", age: "12+ tuổi", price: "Miễn phí", description: "Phòng chống COVID-19" },
    { id: 2, name: "Vắc xin Cúm", age: "6 tháng+", price: "200.000đ", description: "Phòng chống cúm mùa" },
    { id: 3, name: "Vắc xin HPV", age: "9-26 tuổi", price: "1.500.000đ", description: "Phòng chống ung thư cổ tử cung" },
    { id: 4, name: "Vắc xin Viêm gan B", age: "Sơ sinh+", price: "300.000đ", description: "Phòng chống viêm gan B" },
    { id: 5, name: "Vắc xin Sởi-Rubella", age: "12-15 tháng", price: "150.000đ", description: "Phòng chống sởi và rubella" },
    { id: 6, name: "Vắc xin Thủy đậu", age: "12 tháng+", price: "800.000đ", description: "Phòng chống bệnh thủy đậu" }
  ];

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Danh mục Vắc xin</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vaccines.map((vaccine) => (
            <div key={vaccine.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <FaSyringe className="text-2xl text-cyan-600 mr-3" />
                <h3 className="text-lg font-semibold">{vaccine.name}</h3>
              </div>
              
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Độ tuổi:</span> {vaccine.age}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Giá:</span> <span className="text-cyan-600 font-semibold">{vaccine.price}</span>
                </p>
                <p className="text-sm text-gray-600">{vaccine.description}</p>
              </div>
              
              <button className="w-full bg-cyan-600 text-white py-2 rounded-lg hover:bg-cyan-700 transition-colors">
                Đặt lịch tiêm
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}