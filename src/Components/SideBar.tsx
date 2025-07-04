'use client';
import { useState, useMemo, ReactNode } from 'react';
import { 
  FaUserMd, 
  FaSyringe, 
  FaInfoCircle, 
  FaClipboardList,
  FaHome
} from 'react-icons/fa';
import Link from 'next/link';

// Types
interface MenuItem {
  id: string;
  label: string;
  icon: ReactNode;
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

export default function NavBar() {
  const [activeMenu, setActiveMenu] = useState<string>('home');

  // Memoized current menu label

  const handleMenuClick = (menuId: string): void => {
    setActiveMenu(menuId);
  };
  return (
        <aside className="bg-cyan-800 text-white w-full md:w-64 flex-shrink-0 sticky md:h-screen md:top-16 z-5 hidden lg:flex lg:flex-col">
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
  );
}