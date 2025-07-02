'use client'
import Image from 'next/image';
import Link from 'next/link';
import { useState, useMemo, ReactNode } from 'react';
import {
    FaSearch,
    FaPhoneAlt,
    FaUserCircle,
    FaSignInAlt,
    FaSignOutAlt,
    FaUserMd,
    FaSyringe,
    FaInfoCircle,
    FaClipboardList,
    FaHome
} from 'react-icons/fa';

interface MenuItem {
    id: string;
    label: string;
    icon: ReactNode;
}

export default function Header() {
    const [activeMenu, setActiveMenu] = useState<string>('home');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    const MENU_ITEMS: MenuItem[] = [
        { id: 'home', label: 'Trang chủ', icon: <FaHome className="text-xl" /> },
        { id: 'chat', label: 'Chat với bác sĩ', icon: <FaUserMd className="text-xl" /> },
        { id: 'vaccines', label: 'Danh mục vắc xin', icon: <FaSyringe className="text-xl" /> },
        { id: 'info', label: 'Thông tin tiêm chủng', icon: <FaInfoCircle className="text-xl" /> },
        { id: 'management', label: 'Quản lý', icon: <FaClipboardList className="text-xl" /> },
    ];

    const handleMenuClick = (menuId: string): void => {
        setActiveMenu(menuId);
    };

    const currentMenuLabel = useMemo(() => {
        return MENU_ITEMS.find(item => item.id === activeMenu)?.label || 'Hệ thống tiêm chủng';
    }, [activeMenu]);

    const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        console.log('Searching for:', searchQuery);
        // Implement search logic here
    };
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setSearchQuery(e.target.value);
    };
    const toggleLogin = (): void => {
        setIsLoggedIn(!isLoggedIn);
    };

    return (
        <header className="bg-gradient-to-r from-cyan-600 to-teal-600 w-full h-full px-2 sm:px-6 lg:px-8 py-3 sticky top-0 z-10">
            <div className="x-auto flex justify-between md:gap-0 gap-6">
                {/* Logo và nút đăng nhập */}
                <div className="flex items-center justify-between w-1/5">
                    <Link
                        href="/"
                        className="flex items-center flex-shrink-0 hover:opacity-90 transition-opacity"
                        onClick={() => handleMenuClick('home')}
                        aria-label="Về trang chủ"
                    >
                        <div className="relative w-10 h-10 sm:w-12 sm:h-12">
                            {/* Fallback cho trường hợp không có logo
                    <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                    <FaSyringe className="text-cyan-600 text-2xl" />
                    </div> */}
                            {/* Uncomment khi có logo thật */}
                            <Image
                                alt="Logo Tiêm Chủng"
                                src="/logo.jpg"
                                fill
                                className="object-contain"
                                priority
                                quality={100}
                            />
                        </div>
                    </Link>
                </div>

                {/* Thanh tìm kiếm và các nút chức năng */}
                <form
                    onSubmit={handleSearch}
                    className="flex items-center w-2/5 md:w-3/5 max-w-xl bg-white rounded-full px-1 py-1 shadow-sm"
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

                <div className="flex gap-3 w-2/5 md:w-1/5">
                    <a
                        href="tel:18006928"
                        className="flex items-center bg-cyan-900 hidden md:flex hover:bg-cyan-800 text-white text-xs sm:text-sm rounded-full px-3 py-1 whitespace-nowrap transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        aria-label="Gọi hotline 1800 6928"
                    >
                        <FaPhoneAlt className="mr-2 text-xs" />
                        <span className="hidden sm:inline">Hotline:</span> 1800 6928
                    </a>

                    {/* Nút đăng nhập/đăng xuất */}
                    <button
                        onClick={toggleLogin}
                        className={`flex items-center rounded-full px-4 py-1 whitespace-nowrap transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50 ${isLoggedIn
                            ? 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-400'
                            : 'bg-white hover:bg-gray-100 text-cyan-600 focus:ring-cyan-400'
                            }`}
                        aria-label={isLoggedIn ? 'Đăng xuất' : 'Đăng nhập'}
                    >
                        <Link href='/login'>
                            Dang nhap
                        </Link>
                        {/* {isLoggedIn ? (
                                <>
                                    <FaSignOutAlt className="mr-2 text-xs" />
                                    <span className="text-xs sm:text-sm">Đăng xuất</span>
                                </>
                            ) : (
                                <>
                                    <FaSignInAlt className="mr-2 text-xs" />
                                    <span className="text-xs sm:text-sm">Đăng nhập</span>
                                </>
                            )} */}
                    </button>
                </div>
            </div>
        </header>
    );
}