'use client';
import Image from 'next/image';
import { useState } from 'react';
import { 
  FaSearch, 
  FaPhoneAlt, 
  FaCommentAlt,
  FaUserMd, 
  FaSyringe, 
  FaInfoCircle, 
  FaClipboardList
} from 'react-icons/fa';

export default function Home() {
  const [activeMenu, setActiveMenu] = useState('');

  const menuItems = [
    { id: 'chat', label: 'Chat với bác sĩ', icon: <FaUserMd className="text-xl" /> },
    { id: 'vaccines', label: 'Danh mục vắc xin', icon: <FaSyringe className="text-xl" /> },
    { id: 'info', label: 'Thông tin tiêm chủng', icon: <FaInfoCircle className="text-xl" /> },
    { id: 'management', label: 'Quản lý', icon: <FaClipboardList className="text-xl" /> },
  ];

  const handleMenuClick = (menuId: string) => {
    setActiveMenu(menuId);
    console.log(`Đã chọn menu: ${menuId}`);
  };

  return (
    <div className="bg-white flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-cyan-600 to-teal-600 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center flex-shrink-0">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12">
              <Image
                alt="Logo Tiêm Chủng"
                src="/logo.jpg"
                fill
                className="object-contain"
                priority
                quality={100}
              />
            </div>
            <h1 className="ml-2 text-white font-bold text-lg sm:text-xl whitespace-nowrap">
              LE SSERAFIM
            </h1>
          </div>

          <form className="hidden md:flex items-center w-full max-w-xl bg-white rounded-full px-4 py-1">
            <input
              className="flex-grow text-gray-700 placeholder-gray-400 text-sm sm:text-base focus:outline-none rounded-full py-2 px-3"
              placeholder="Bạn cần tìm vắc xin gì?"
              type="search"
            />
            <button className="text-cyan-600 ml-2" type="submit">
              <FaSearch className="text-lg sm:text-xl" />
            </button>
          </form>

          <div className="hidden md:flex items-center gap-3">
            <a className="flex items-center bg-cyan-900 hover:bg-cyan-800 text-white text-xs sm:text-sm rounded-full px-3 py-1">
              <FaPhoneAlt className="mr-2 text-xs" />
              Gọi Hotline: 1800 6928
            </a>
            <button className="flex items-center bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white text-xs sm:text-sm rounded-full px-4 py-1">
              <FaCommentAlt className="mr-2 text-xs" />
              Yêu cầu tư vấn
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar Menu */}
        <aside className="bg-cyan-800 text-white w-64 flex-shrink-0">
          <div className="p-4 border-b border-cyan-700">
            <h2 className="text-xl font-bold">Menu Chính</h2>
          </div>
          
          <nav className="mt-4">
            {menuItems.map((item) => (
              <button
                key={item.id}
                className={`flex items-center w-full p-4 text-left hover:bg-cyan-700 transition-colors ${
                  activeMenu === item.id ? 'bg-cyan-900 border-l-4 border-yellow-400' : ''
                }`}
                onClick={() => handleMenuClick(item.id)}
              >
                <span className="mr-3 text-cyan-200">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {menuItems.find(item => item.id === activeMenu)?.label || 'Chào mừng đến với hệ thống'}
            </h2>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              {!activeMenu && (
                <div className="text-center py-12">
                  <div className="text-cyan-600 mb-4">
                    <FaInfoCircle className="mx-auto text-5xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    Chào mừng bạn đến với hệ thống tiêm chủng
                  </h3>
                  <p className="text-gray-600">
                    Vui lòng chọn một mục trong menu bên trái để bắt đầu
                  </p>
                </div>
              )}
              
              {activeMenu === 'chat' && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Chat với bác sĩ</h3>
                  <p className="text-gray-700">
                    Tính năng này cho phép bạn trò chuyện trực tiếp với các bác sĩ chuyên khoa để được tư vấn về:
                  </p>
                  <ul className="list-disc pl-5 mt-3 space-y-2">
                    <li>Lịch tiêm chủng phù hợp</li>
                    <li>Tác dụng phụ của vắc xin</li>
                    <li>Chăm sóc sau tiêm</li>
                    <li>Giải đáp thắc mắc về sức khỏe</li>
                  </ul>
                </div>
              )}
              
              {activeMenu === 'vaccines' && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Danh mục vắc xin</h3>
                  <p className="text-gray-700">
                    Tra cứu thông tin chi tiết về các loại vắc xin hiện có:
                  </p>
                </div>
              )}
              
              {activeMenu === 'info' && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Thông tin tiêm chủng</h3>
                  <p className="text-gray-700">
                    Cập nhật kiến thức và thông tin mới nhất về tiêm chủng:
                  </p>
                </div>
              )}
              
              {activeMenu === 'management' && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Quản lý</h3>
                  <p className="text-gray-700">
                    Quản lý thông tin cá nhân và lịch sử tiêm chủng:
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}