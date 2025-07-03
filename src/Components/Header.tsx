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
    FaHome,
    FaBars,
    FaTimes
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
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
    const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);

    const MENU_ITEMS: MenuItem[] = [
        { id: 'home', label: 'Trang chủ', icon: <FaHome className="text-xl" /> },
        { id: 'chat', label: 'Chat với bác sĩ', icon: <FaUserMd className="text-xl" /> },
        { id: 'vaccines', label: 'Danh mục vắc xin', icon: <FaSyringe className="text-xl" /> },
        { id: 'info', label: 'Thông tin tiêm chủng', icon: <FaInfoCircle className="text-xl" /> },
        { id: 'management', label: 'Quản lý', icon: <FaClipboardList className="text-xl" /> },
    ];

    const handleMenuClick = (menuId: string): void => {
        setActiveMenu(menuId);
        setIsMobileMenuOpen(false);
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

    const toggleMobileMenu = (): void => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const toggleMobileSearch = (): void => {
        setIsSearchVisible(!isSearchVisible);
    };

    return (
        <header className="bg-gradient-to-r from-cyan-600 to-teal-600 w-full sticky top-0 z-50 shadow-lg">
            <style jsx>{`
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-slideDown {
                    animation: slideDown 0.3s ease-out forwards;
                }
            `}</style>
            {/* Main Header */}
            <div className="px-3 sm:px-6 lg:px-8 py-3">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center flex-shrink-0">
                        <Link
                            href="/"
                            className="flex items-center hover:opacity-90 transition-opacity"
                            onClick={() => handleMenuClick('home')}
                            aria-label="Về trang chủ"
                        >
                            <div className="relative w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20">
                                <Image
                                    alt="Logo Tiêm Chủng"
                                    src="/logo.png"
                                    fill
                                    className="object-contain"
                                    priority
                                    quality={100}
                                />
                            </div>
                            <span className="ml-3 text-white font-semibold text-lg sm:text-xl lg:text-2xl hidden sm:block">
                                Tiêm Chủng
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Search Bar */}
                    <form
                        onSubmit={handleSearch}
                        className="hidden md:flex items-center flex-1 max-w-md mx-4 lg:mx-8 bg-white rounded-full px-1 py-1 shadow-sm"
                        role="search"
                    >
                        <label htmlFor="search-input" className="sr-only">
                            Tìm kiếm vắc xin
                        </label>
                        <input
                            id="search-input"
                            className="flex-grow text-gray-700 placeholder-gray-400 text-sm focus:outline-none rounded-full py-2 px-3"
                            placeholder="Tìm kiếm vắc xin..."
                            type="search"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <button
                            className="text-cyan-600 ml-2 hover:text-cyan-700 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded-full p-2"
                            type="submit"
                            aria-label="Tìm kiếm"
                        >
                            <FaSearch className="text-lg" />
                        </button>
                    </form>

                    {/* Desktop Actions */}
                    <div className="hidden lg:flex items-center gap-3">
                        {/* Hotline */}
                        <a
                            href="tel:18006928"
                            className="flex items-center bg-cyan-900 hover:bg-cyan-800 text-white text-xs xl:text-sm rounded-full px-3 py-2 whitespace-nowrap transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            aria-label="Gọi hotline 1800 6928"
                        >
                            <FaPhoneAlt className="mr-2 text-xs" />
                            <span className="hidden xl:inline">Hotline:</span> 1800 6928
                        </a>

                        {/* Login Button */}
                        <Link href="/login">
                            <button
                                className="flex items-center bg-white hover:bg-gray-100 text-cyan-600 rounded-full px-4 py-2 whitespace-nowrap transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                aria-label="Đăng nhập"
                            >
                                <FaSignInAlt className="mr-2 text-xs" />
                                <span className="text-xs xl:text-sm">Đăng nhập</span>
                            </button>
                        </Link>
                    </div>

                    {/* Mobile Actions */}
                    <div className="flex items-center gap-2 md:gap-3 lg:hidden">
                        {/* Mobile Search Button */}
                        <button
                            onClick={toggleMobileSearch}
                            className="text-white hover:text-gray-200 transition-colors p-2"
                            aria-label="Tìm kiếm"
                        >
                            <FaSearch className="text-lg" />
                        </button>

                        {/* Mobile Hotline (tablet only) */}
                        <a
                            href="tel:18006928"
                            className="hidden md:flex lg:hidden items-center bg-cyan-900 hover:bg-cyan-800 text-white text-xs rounded-full px-3 py-2 transition-colors"
                            aria-label="Gọi hotline 1800 6928"
                        >
                            <FaPhoneAlt className="text-xs" />
                        </a>

                        {/* Mobile Login Button */}
                        <Link href="/login" className="md:hidden">
                            <button
                                className="flex items-center bg-white hover:bg-gray-100 text-cyan-600 rounded-full px-3 py-1.5 transition-colors"
                                aria-label="Đăng nhập"
                            >
                                <FaSignInAlt className="text-sm" />
                            </button>
                        </Link>

                        {/* Tablet Login Button */}
                        <Link href="/login" className="hidden md:flex lg:hidden">
                            <button
                                className="flex items-center bg-white hover:bg-gray-100 text-cyan-600 rounded-full px-4 py-2 transition-colors"
                                aria-label="Đăng nhập"
                            >
                                <FaSignInAlt className="mr-2 text-xs" />
                                <span className="text-xs">Đăng nhập</span>
                            </button>
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={toggleMobileMenu}
                            className="text-white hover:text-gray-200 transition-colors p-2 md:hidden"
                            aria-label="Menu"
                        >
                            {isMobileMenuOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Search Overlay */}
            {isSearchVisible && (
                <div className="md:hidden fixed inset-x-0 top-0 bg-white shadow-lg z-50 animate-slideDown">
                    <div className="px-4 py-4">
                        {/* Search Header */}
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">Tìm kiếm</h3>
                            <button
                                onClick={toggleMobileSearch}
                                className="p-2 text-gray-500 hover:text-gray-700 transition-colors rounded-full hover:bg-gray-100"
                                aria-label="Đóng tìm kiếm"
                            >
                                <FaTimes className="text-lg" />
                            </button>
                        </div>

                        {/* Search Form */}
                        <form onSubmit={handleSearch} className="space-y-4" role="search">
                            <div className="relative">
                                <input
                                    className="w-full text-gray-700 placeholder-gray-400 text-base border-2 border-gray-200 focus:border-cyan-500 focus:outline-none rounded-xl py-4 px-4 pr-12 transition-colors"
                                    placeholder="Nhập tên vắc xin cần tìm..."
                                    type="search"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    autoFocus
                                />
                                <button
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyan-600 hover:text-cyan-700 transition-colors p-2 rounded-full hover:bg-cyan-50"
                                    type="submit"
                                    aria-label="Tìm kiếm"
                                >
                                    <FaSearch className="text-xl" />
                                </button>
                            </div>

                            {/* Quick Search Suggestions */}
                            <div className="space-y-2">
                                <p className="text-sm font-medium text-gray-600">Tìm kiếm phổ biến:</p>
                                <div className="flex flex-wrap gap-2">
                                    {['COVID-19', 'Cúm', 'Viêm gan B', 'HPV', 'Phế cầu'].map((suggestion) => (
                                        <button
                                            key={suggestion}
                                            type="button"
                                            onClick={() => setSearchQuery(suggestion)}
                                            className="px-3 py-2 bg-gray-100 hover:bg-cyan-50 text-gray-700 hover:text-cyan-700 text-sm rounded-full transition-colors border border-gray-200 hover:border-cyan-200"
                                        >
                                            {suggestion}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Search Button */}
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white font-semibold py-4 rounded-xl transition-all duration-200 transform hover:scale-[0.98] active:scale-95"
                            >
                                <FaSearch className="inline mr-2" />
                                Tìm kiếm
                            </button>
                        </form>

                        {/* Recent Searches (if any) */}
                        {searchQuery.length === 0 && (
                            <div className="mt-6 pt-4 border-t border-gray-100">
                                <p className="text-sm font-medium text-gray-600 mb-3">Danh mục vắc xin:</p>
                                <div className="grid grid-cols-2 gap-2">
                                    {[
                                        { name: 'Vắc xin trẻ em', icon: '👶' },
                                        { name: 'Vắc xin người lớn', icon: '👨‍⚕️' },
                                        { name: 'Vắc xin du lịch', icon: '✈️' },
                                        { name: 'Vắc xin dịch vụ', icon: '💉' }
                                    ].map((category) => (
                                        <button
                                            key={category.name}
                                            type="button"
                                            className="flex items-center p-3 bg-gray-50 hover:bg-cyan-50 rounded-lg text-left transition-colors"
                                        >
                                            <span className="text-xl mr-3">{category.icon}</span>
                                            <span className="text-sm text-gray-700">{category.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Mobile Search Backdrop */}
            {isSearchVisible && (
                <div
                    className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={toggleMobileSearch}
                    aria-hidden="true"
                />
            )}

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-cyan-700 border-t border-cyan-500">
                    <div className="px-3 py-2 space-y-1">
                        {MENU_ITEMS.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleMenuClick(item.id)}
                                className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeMenu === item.id
                                        ? 'bg-cyan-800 text-white'
                                        : 'text-cyan-100 hover:bg-cyan-600 hover:text-white'
                                    }`}
                            >
                                <span className="mr-3">{item.icon}</span>
                                {item.label}
                            </button>
                        ))}

                        {/* Mobile Hotline in Menu */}
                        <a
                            href="tel:18006928"
                            className="w-full flex items-center px-3 py-2 rounded-md text-sm font-medium text-cyan-100 hover:bg-cyan-600 hover:text-white transition-colors"
                        >
                            <FaPhoneAlt className="mr-3 text-lg" />
                            Hotline: 1800 6928
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
}