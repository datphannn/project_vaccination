'use client';

import Image from 'next/image';
import { useState, useMemo } from 'react';
import { 
  FaSearch, 
  FaPhoneAlt,
  FaUserMd, 
  FaSyringe, 
  FaInfoCircle, 
  FaClipboardList,
  FaUserCircle,
  FaSignInAlt,
  FaSignOutAlt,
  FaHome
} from 'react-icons/fa';
import Link from 'next/link';

// Types
interface MenuItem {
  id: string;
  label: string;
  icon: JSX.Element;
}

interface Vaccine {
  name: string;
  desc: string;
  price: string;
}

// Constants
const MENU_ITEMS: MenuItem[] = [
  { id: 'home', label: 'Trang chủ', icon: <FaHome className="text-xl" /> },
  { id: 'chat', label: 'Chat với bác sĩ', icon: <FaUserMd className="text-xl" /> },
  { id: 'vaccines', label: 'Danh mục vắc xin', icon: <FaSyringe className="text-xl" /> },
  { id: 'info', label: 'Thông tin tiêm chủng', icon: <FaInfoCircle className="text-xl" /> },
  { id: 'management', label: 'Quản lý', icon: <FaClipboardList className="text-xl" /> },
];

const VACCINE_LIST: Vaccine[] = [
  { name: 'Vắc xin Covid-19', desc: 'Phòng ngừa virus SARS-CoV-2', price: '500,000 VNĐ' },
  { name: 'Vắc xin Viêm gan B', desc: 'Phòng bệnh viêm gan B', price: '300,000 VNĐ' },
  { name: 'Vắc xin Sởi - Quai bị - Rubella', desc: 'Phòng 3 bệnh', price: '400,000 VNĐ' },
];

export default function VaccinationSystem() {
  const [activeMenu, setActiveMenu] = useState<string>('home');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Memoized current menu label
  const currentMenuLabel = useMemo(() => {
    return MENU_ITEMS.find(item => item.id === activeMenu)?.label || 'Hệ thống tiêm chủng';
  }, [activeMenu]);

  const handleMenuClick = (menuId: string): void => {
    setActiveMenu(menuId);
  };

  const toggleLogin = (): void => {
    setIsLoggedIn(!isLoggedIn);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Implement search logic here
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="bg-white flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-cyan-600 to-teal-600 px-4 sm:px-6 lg:px-8 py-3 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-3 md:gap-0">
          {/* Logo và nút đăng nhập */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <Link 
              href="/" 
              className="flex items-center flex-shrink-0 hover:opacity-90 transition-opacity"
              onClick={() => handleMenuClick('home')}
              aria-label="Về trang chủ"
            >
              <div className="relative w-10 h-10 sm:w-12 sm:h-12">
                {/* Fallback cho trường hợp không có logo */}
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                  <FaSyringe className="text-cyan-600 text-2xl" />
                </div>
                {/* Uncomment khi có logo thật */}
                {/* <Image
                  alt="Logo Tiêm Chủng"
                  src="/logo.jpg"
                  fill
                  className="object-contain"
                  priority
                  quality={100}
                /> */}
              </div>
              <h1 className="ml-2 text-white font-bold text-lg sm:text-xl whitespace-nowrap">
                HỆ THỐNG TIÊM CHỦNG
              </h1>
            </Link>
          </div>

          {/* Thanh tìm kiếm và các nút chức năng */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4 w-full">
            <form 
              onSubmit={handleSearch}
              className="flex items-center w-full max-w-xl bg-white rounded-full px-4 py-1 shadow-sm"
              role="search"
            >
              <label htmlFor="search-input" className="sr-only">
                Tìm kiếm vắc xin
              </label>
              <input
                id="search-input"
                className="flex-grow text-gray-700 placeholder-gray-400 text-sm sm:text-base focus:outline-none rounded-full py-2 px-3"
                placeholder="Tìm kiếm vắc xin..."
                type="search"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <button 
                className="text-cyan-600 ml-2 hover:text-cyan-700 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded-full p-1" 
                type="submit"
                aria-label="Tìm kiếm"
              >
                <FaSearch className="text-lg sm:text-xl" />
              </button>
            </form>

            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
              <a 
                href="tel:18006928" 
                className="flex items-center bg-cyan-900 hover:bg-cyan-800 text-white text-xs sm:text-sm rounded-full px-3 py-1 whitespace-nowrap transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400"
                aria-label="Gọi hotline 1800 6928"
              >
                <FaPhoneAlt className="mr-2 text-xs" />
                <span className="hidden sm:inline">Hotline:</span> 1800 6928
              </a>
              
              {/* Nút đăng nhập/đăng xuất */}
              <button 
                onClick={toggleLogin}
                className={`flex items-center rounded-full px-4 py-1 whitespace-nowrap transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                  isLoggedIn 
                    ? 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-400'
                    : 'bg-white hover:bg-gray-100 text-cyan-600 focus:ring-cyan-400'
                }`}
                aria-label={isLoggedIn ? 'Đăng xuất' : 'Đăng nhập'}
              >
                {isLoggedIn ? (
                  <>
                    <FaSignOutAlt className="mr-2 text-xs" />
                    <span className="text-xs sm:text-sm">Đăng xuất</span>
                  </>
                ) : (
                  <>
                    <FaSignInAlt className="mr-2 text-xs" />
                    <span className="text-xs sm:text-sm">Đăng nhập</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 flex-col md:flex-row">
        {/* Sidebar Menu */}
        <aside className="bg-cyan-800 text-white w-full md:w-64 flex-shrink-0 sticky md:h-screen md:top-16 z-5">
          <nav className="flex overflow-x-auto md:block md:overflow-visible" role="navigation" aria-label="Menu chính">
            <div className="p-4 border-b border-cyan-700 hidden md:block">
              <h2 className="text-xl font-bold">MENU CHÍNH</h2>
            </div>
            
            <div className="flex md:flex-col">
              {MENU_ITEMS.map((item) => (
                <Link
                  key={item.id}
                  href={item.id === 'home' ? '/' : `/${item.id}`}
                  className={`flex items-center p-4 md:w-full text-left hover:bg-cyan-700 transition-colors whitespace-nowrap focus:outline-none focus:bg-cyan-700 ${
                    activeMenu === item.id ? 'bg-cyan-900 md:border-l-4 border-yellow-400' : ''
                  }`}
                  onClick={() => handleMenuClick(item.id)}
                  aria-current={activeMenu === item.id ? 'page' : undefined}
                >
                  <span className="mr-3 text-cyan-200" aria-hidden="true">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </div>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-4 bg-gray-50 min-h-[calc(100vh-120px)]" role="main">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {currentMenuLabel}
            </h2>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              {/* Trang chủ */}
              {activeMenu === 'home' && (
                <div>
                  <div className="text-center py-8">
                    <div className="text-cyan-600 mb-6" aria-hidden="true">
                      <FaHome className="mx-auto text-6xl" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-800 mb-4">
                      HỆ THỐNG TIÊM CHỦNG QUỐC GIA
                    </h3>
                    <p className="text-gray-600 mb-6 max-w-3xl mx-auto text-lg">
                      Cung cấp dịch vụ tiêm chủng an toàn, chất lượng cao với đội ngũ bác sĩ chuyên nghiệp 
                      và hệ thống vắc xin đa dạng, đầy đủ.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-6 rounded-xl border border-gray-100">
                      <div className="text-cyan-600 mb-4 flex justify-center" aria-hidden="true">
                        <FaSyringe className="text-4xl" />
                      </div>
                      <h4 className="font-bold text-xl text-center mb-3">Vắc xin đa dạng</h4>
                      <p className="text-gray-600 text-center">
                        Cung cấp đầy đủ các loại vắc xin phòng bệnh từ các hãng uy tín trên thế giới
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-6 rounded-xl border border-gray-100">
                      <div className="text-cyan-600 mb-4 flex justify-center" aria-hidden="true">
                        <FaUserMd className="text-4xl" />
                      </div>
                      <h4 className="font-bold text-xl text-center mb-3">Bác sĩ chuyên môn</h4>
                      <p className="text-gray-600 text-center">
                        Đội ngũ bác sĩ giàu kinh nghiệm, tư vấn tận tình trước và sau tiêm chủng
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-6 rounded-xl border border-gray-100">
                      <div className="text-cyan-600 mb-4 flex justify-center" aria-hidden="true">
                        <FaClipboardList className="text-4xl" />
                      </div>
                      <h4 className="font-bold text-xl text-center mb-3">Quản lý tiện lợi</h4>
                      <p className="text-gray-600 text-center">
                        Theo dõi lịch sử tiêm chủng, nhắc lịch tiêm tự động trên ứng dụng di động
                      </p>
                    </div>
                  </div>

                  <div className="mt-12">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                      CÁC DỊCH VỤ TIÊM CHỦNG
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                        <h4 className="font-bold text-lg mb-2">Tiêm chủng trẻ em</h4>
                        <p className="text-gray-600 mb-4">
                          Đầy đủ các loại vắc xin trong chương trình tiêm chủng mở rộng và dịch vụ
                        </p>
                        <button 
                          className="text-cyan-600 font-medium hover:text-cyan-700 focus:outline-none focus:underline"
                          onClick={() => handleMenuClick('vaccines')}
                        >
                          Xem lịch tiêm →
                        </button>
                      </div>
                      <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                        <h4 className="font-bold text-lg mb-2">Tiêm chủng người lớn</h4>
                        <p className="text-gray-600 mb-4">
                          Vắc xin phòng cúm, viêm gan, uốn ván, HPV và các bệnh truyền nhiễm khác
                        </p>
                        <button 
                          className="text-cyan-600 font-medium hover:text-cyan-700 focus:outline-none focus:underline"
                          onClick={() => handleMenuClick('vaccines')}
                        >
                          Đặt lịch ngay →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Chat với bác sĩ */}
              {activeMenu === 'chat' && (
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">CHAT VỚI BÁC SĨ</h3>
                  <div className="bg-gray-50 rounded-lg p-8 text-center">
                    <FaUserMd className="mx-auto text-5xl text-cyan-600 mb-4" aria-hidden="true" />
                    <h4 className="text-xl font-semibold mb-3">Kết nối với bác sĩ chuyên khoa</h4>
                    <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                      Tính năng này cho phép bạn trò chuyện trực tiếp với các bác sĩ để được tư vấn về:
                    </p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-left max-w-2xl mx-auto">
                      <li className="flex items-start">
                        <span className="text-cyan-600 mr-2" aria-hidden="true">✓</span>
                        <span>Lịch tiêm chủng phù hợp</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-cyan-600 mr-2" aria-hidden="true">✓</span>
                        <span>Tác dụng phụ của vắc xin</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-cyan-600 mr-2" aria-hidden="true">✓</span>
                        <span>Chăm sóc sau tiêm</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-cyan-600 mr-2" aria-hidden="true">✓</span>
                        <span>Giải đáp thắc mắc sức khỏe</span>
                      </li>
                    </ul>
                    <button className="bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-2 px-6 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400">
                      Bắt đầu trò chuyện
                    </button>
                  </div>
                </div>
              )}

              {/* Danh mục vắc xin */}
              {activeMenu === 'vaccines' && (
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">DANH MỤC VẮC XIN</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                      <thead className="bg-cyan-600 text-white">
                        <tr>
                          <th className="py-3 px-4 text-left" scope="col">Tên vắc xin</th>
                          <th className="py-3 px-4 text-left" scope="col">Công dụng</th>
                          <th className="py-3 px-4 text-left" scope="col">Giá tiền</th>
                          <th className="py-3 px-4 text-left" scope="col">Đặt lịch</th>
                        </tr>
                      </thead>
                      <tbody>
                        {VACCINE_LIST.map((vaccine, index) => (
                          <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                            <td className="py-3 px-4 border-b border-gray-200 font-medium">{vaccine.name}</td>
                            <td className="py-3 px-4 border-b border-gray-200">{vaccine.desc}</td>
                            <td className="py-3 px-4 border-b border-gray-200">{vaccine.price}</td>
                            <td className="py-3 px-4 border-b border-gray-200">
                              <button className="text-cyan-600 hover:text-cyan-700 font-medium focus:outline-none focus:underline">
                                Đặt ngay
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Thông tin tiêm chủng */}
              {activeMenu === 'info' && (
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">THÔNG TIN TIÊM CHỦNG</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                      <h4 className="font-bold text-lg mb-3">Lợi ích của tiêm chủng</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-start">
                          <span className="text-cyan-600 mr-2" aria-hidden="true">•</span>
                          <span>Phòng ngừa các bệnh truyền nhiễm nguy hiểm</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-cyan-600 mr-2" aria-hidden="true">•</span>
                          <span>Giảm nguy cơ biến chứng và tử vong</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-cyan-600 mr-2" aria-hidden="true">•</span>
                          <span>Bảo vệ cộng đồng qua miễn dịch cộng đồng</span>
                        </li>
                      </ul>
                    </div>
                    <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                      <h4 className="font-bold text-lg mb-3">Quy trình tiêm chủng</h4>
                      <ol className="space-y-2 text-gray-600 list-decimal pl-5">
                        <li>Đăng ký thông tin và chọn vắc xin</li>
                        <li>Khám sàng lọc trước tiêm</li>
                        <li>Tiêm chủng theo đúng quy trình</li>
                        <li>Theo dõi 30 phút sau tiêm</li>
                      </ol>
                    </div>
                  </div>
                </div>
              )}

              {/* Quản lý */}
              {activeMenu === 'management' && (
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">QUẢN LÝ THÔNG TIN</h3>
                  <div className="bg-gray-50 rounded-lg p-8 text-center">
                    <FaClipboardList className="mx-auto text-5xl text-cyan-600 mb-4" aria-hidden="true" />
                    <h4 className="text-xl font-semibold mb-3">Quản lý thông tin cá nhân</h4>
                    <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                      {isLoggedIn 
                        ? "Bạn có thể xem và cập nhật thông tin cá nhân, lịch sử tiêm chủng tại đây"
                        : "Vui lòng đăng nhập để xem thông tin quản lý cá nhân"}
                    </p>
                    {!isLoggedIn && (
                      <button 
                        onClick={toggleLogin}
                        className="bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-2 px-6 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400"
                      >
                        Đăng nhập ngay
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">HỆ THỐNG TIÊM CHỦNG</h3>
              <p className="text-gray-300">
                Cung cấp dịch vụ tiêm chủng chất lượng cao với đội ngũ y bác sĩ chuyên nghiệp.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">LIÊN HỆ</h3>
              <ul className="space-y-2 text-gray-300">
                <li>Hotline: 1800 6928</li>
                <li>Email: info@tiemchung.vn</li>
                <li>Địa chỉ: Hà Nội, Việt Nam</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">GIỜ LÀM VIỆC</h3>
              <ul className="space-y-2 text-gray-300">
                <li>Thứ 2 - Thứ 6: 7:30 - 17:00</li>
                <li>Thứ 7: 7:30 - 12:00</li>
                <li>Chủ nhật: Nghỉ</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
            <p>© 2025 Hệ thống Tiêm chủng. Bảo lưu mọi quyền.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}