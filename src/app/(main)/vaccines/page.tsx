"use client"
import React, { useState, useEffect } from 'react';
import { FaSyringe } from 'react-icons/fa';

interface Vaccine {
  id: number;
  name: string;
  age_range: string;
  price: string;
  description: string;
  stock_quantity?: number;
  manufacturer?: string;
}

export default function Vaccines() {
  const [vaccines, setVaccines] = useState<Vaccine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchVaccines();
  }, []);

  const fetchVaccines = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/vaccines`);
      const data = await response.json();
      
      if (data.success) {
        setVaccines(data.data);
      } else {
        setError(data.message || 'Lỗi khi tải danh sách vắc xin');
      }
    } catch (error) {
      setError('Lỗi kết nối. Vui lòng thử lại sau.');
      console.error('Error fetching vaccines:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookAppointment = async (vaccineId: number) => {
    try {
      // Implement booking logic here
      // Có thể redirect tới trang booking hoặc mở modal
      console.log('Booking appointment for vaccine:', vaccineId);
      
      // Ví dụ: redirect tới trang booking
      // router.push(`/booking/${vaccineId}`);
      
      // Hoặc gọi API booking
      // const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/appointments`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${token}`
      //   },
      //   body: JSON.stringify({
      //     vaccine_id: vaccineId,
      //     appointment_date: selectedDate,
      //     appointment_time: selectedTime
      //   })
      // });
      
      alert(`Đặt lịch cho vắc xin ID: ${vaccineId}`);
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Có lỗi xảy ra khi đặt lịch. Vui lòng thử lại.');
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Danh mục Vắc xin</h1>
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600"></div>
            <p className="ml-4 text-gray-600">Đang tải danh sách vắc xin...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Danh mục Vắc xin</h1>
          <div className="text-center py-12">
            <div className="text-red-600 mb-4">
              <FaSyringe className="text-4xl mx-auto mb-2 opacity-50" />
              <p className="text-lg">{error}</p>
            </div>
            <button 
              onClick={fetchVaccines}
              className="bg-cyan-600 text-white px-6 py-2 rounded-lg hover:bg-cyan-700 transition-colors"
            >
              Thử lại
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-cyan-600">
      <div className="w-full h-full p-3 mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-black-800">Danh mục Vắc xin</h1>
          <button 
            onClick={fetchVaccines}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Làm mới
          </button>
        </div>

        {vaccines.length === 0 ? (
          <div className="text-center py-12">
            <FaSyringe className="text-4xl text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Hiện tại chưa có vắc xin nào</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vaccines.map((vaccine) => (
              <div key={vaccine.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <FaSyringe className="text-2xl text-cyan-600 mr-3" />
                  <h3 className="text-lg font-semibold text-black">{vaccine.name}</h3>
                </div>
                
                <div className="space-y-2 mb-4">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Độ tuổi:</span> {vaccine.age_range}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Giá:</span> 
                    <span className="text-cyan-600 font-semibold ml-1">{vaccine.price}</span>
                  </p>
                  <p className="text-sm text-gray-600">{vaccine.description}</p>
                  
                  {vaccine.stock_quantity !== undefined && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Còn lại:</span> 
                      <span className={`ml-1 ${vaccine.stock_quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {vaccine.stock_quantity > 0 ? `${vaccine.stock_quantity} liều` : 'Hết hàng'}
                      </span>
                    </p>
                  )}
                  
                  {vaccine.manufacturer && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Nhà sản xuất:</span> {vaccine.manufacturer}
                    </p>
                  )}
                </div>
                
                <button 
                  onClick={() => handleBookAppointment(vaccine.id)}
                  disabled={vaccine.stock_quantity === 0}
                  className={`w-full py-2 rounded-lg transition-colors ${
                    vaccine.stock_quantity === 0 
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                      : 'bg-cyan-600 text-white hover:bg-cyan-700'
                  }`}
                >
                  {vaccine.stock_quantity === 0 ? 'Hết hàng' : 'Đặt lịch tiêm'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}