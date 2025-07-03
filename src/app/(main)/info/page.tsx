import React from 'react';
import { FaInfoCircle, FaCalendarAlt } from 'react-icons/fa';

export default function info() {
  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Thông tin Tiêm chủng</h1>
        
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FaInfoCircle className="text-cyan-600 mr-2" />
              Tại sao cần tiêm chủng?
            </h2>
            <div className="prose text-gray-600">
              <p className="mb-3">
                Tiêm chủng là một trong những biện pháp y tế công cộng hiệu quả nhất để ngăn ngừa các bệnh truyền nhiễm nguy hiểm. 
                Vắc xin giúp hệ miễn dịch của cơ thể nhận biết và chống lại các mầm bệnh.
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Bảo vệ bản thân khỏi các bệnh nguy hiểm</li>
                <li>Bảo vệ cộng đồng thông qua miễn dịch cộng đồng</li>
                <li>Ngăn ngừa các biến chứng nghiêm trọng</li>
                <li>Giảm chi phí điều trị bệnh</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FaCalendarAlt className="text-green-600 mr-2" />
              Lịch tiêm chủng mở rộng
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2 text-left">Tuổi</th>
                    <th className="px-4 py-2 text-left">Vắc xin</th>
                    <th className="px-4 py-2 text-left">Bệnh phòng chống</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-2">Sơ sinh</td>
                    <td className="px-4 py-2">BCG, Viêm gan B</td>
                    <td className="px-4 py-2">Lao, Viêm gan B</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">2 tháng</td>
                    <td className="px-4 py-2">DPT, Polio, Hib</td>
                    <td className="px-4 py-2">Bạch hầu, Ho gà, Uốn ván, Bại liệt</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">9 tháng</td>
                    <td className="px-4 py-2">Sởi</td>
                    <td className="px-4 py-2">Sởi</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">18 tháng</td>
                    <td className="px-4 py-2">DPT, Sởi-Rubella</td>
                    <td className="px-4 py-2">Nhắc lại miễn dịch</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="flex">
              <FaInfoCircle className="text-yellow-400 mt-1 mr-2" />
              <div>
                <p className="text-sm">
                  <strong>Lưu ý:</strong> Trước khi tiêm chủng, hãy tham khảo ý kiến bác sĩ để đảm bảo an toàn. 
                  Mang theo sổ tiêm chủng khi đến tiêm.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}