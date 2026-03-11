'use client'
import Image from 'next/image';
import Link from 'next/link';
import { useState, useMemo, ReactNode, useEffect } from 'react';
import NotificationBell from './NotificationBell';
import {
    FaSearch,
    FaPhoneAlt,
    FaUserMd,
    FaSyringe,
    FaInfoCircle,
    FaClipboardList,
    FaHome,
    FaBars,
    FaTimes
} from 'react-icons/fa';
import ButtonSwitch from './ButtonSwitch';

interface MenuItem {
    id: string;
    label: string;
    icon: ReactNode;
}

    
    const USER_ITEMS: MenuItem[] = [
        { id: 'home', label: 'Trang chủ', icon: <FaHome className="text-xl" /> },
        { id: 'chat', label: 'Chat với trợ lý AI', icon: <FaUserMd className="text-xl" /> },
        { id: 'vaccines', label: 'Danh mục vắc xin', icon: <FaSyringe className="text-xl" /> },
        { id: 'info', label: 'Thông tin tiêm chủng', icon: <FaInfoCircle className="text-xl" /> },
    ];
    const STAFF_ITEMS: MenuItem[] = [
        { id: 'home', label: 'Trang chủ', icon: <FaHome className="text-xl" /> },
        { id: 'chat', label: 'Chat với trợ lý AI', icon: <FaUserMd className="text-xl" /> },
        { id: 'vaccines', label: 'Danh mục vắc xin', icon: <FaSyringe className="text-xl" /> },
        { id: 'management', label: 'Quản lý', icon: <FaClipboardList className="text-xl" /> },
    ];
export default function Header() {
    const [activeMenu, setActiveMenu] = useState<string>('home');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
    const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);
	const [role, setRole] = useState<string | null>(null);

    const [menuItems, setMenuItems] = useState<MenuItem[]>(USER_ITEMS);

    useEffect(() => {
            const fetchRole = async () => {
                try {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/VerifyToken`, {
                        method: 'GET',
                        credentials: 'include',
                    });
                    const data = await res.json();
                    const userRole = data.user?.role;
                    setRole(userRole);
                    console.log(userRole);
                    if(userRole === 'staff') setMenuItems(STAFF_ITEMS);
                    else setMenuItems(USER_ITEMS);
                } catch (err) {
                    console.error("Không xác định được role:", err);
                    setRole(null);
                }
            };
    
            fetchRole();
        }, []);

    const handleMenuClick = (menuId: string): void => {
        setActiveMenu(menuId);
        setIsMobileMenuOpen(false);
    };

    const currentMenuLabel = useMemo(() => {
        return menuItems.find(item => item.id === activeMenu)?.label || 'Hệ thống tiêm chủng';
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
            <div className="px-3 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center flex-shrink-0">
                        <Link
                            href="/"
                            className="flex items-center hover:opacity-90 transition-opacity"
                            onClick={() => handleMenuClick('home')}
                            aria-label="Về trang chủ"
                        >
                            <div className="relative w-16 h-16 lg:w-20 lg:h-20">
                                <Image
                                    alt="Logo Tiêm Chủng"
                                    src="/logo.png"
                                    fill
                                    className="object-contain"
                                    priority
                                    quality={100}
                                />
                            </div>
                        </Link>
                    </div>

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
                        <NotificationBell />

                        {/* Login Button */}
                        <ButtonSwitch></ButtonSwitch>
                    </div>

                    {/* Mobile Actions */}
                    <div className="flex items-center gap-2 md:gap-3 lg:hidden">
                        {/* Mobile Search Button */}

                        {/* Mobile Hotline (tablet only) */}
                        <a
                            href="tel:18006928"
                            className="hidden md:flex lg:hidden items-center bg-cyan-900 hover:bg-cyan-800 text-white text-xs rounded-full px-3 py-2 transition-colors"
                            aria-label="Gọi hotline 1800 6928"
                        >
                            <FaPhoneAlt className="text-xs" />
                        </a>
                        <NotificationBell />

                        {/* Login Button */}
                        <ButtonSwitch></ButtonSwitch>

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
           

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-cyan-700 border-t border-cyan-500">
                    <div className="px-3 py-2 space-y-1">
                        {menuItems.map((item) => (
                           
                            
                            <Link
                                key={item.id}
                                href={item.id === 'home' ? '/' : `/${item.id}`}
                                className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeMenu === item.id
                                        ? 'bg-cyan-800 text-white'
                                        : 'text-cyan-100 hover:bg-cyan-600 hover:text-white'
                                    }`}
                                onClick={() => {handleMenuClick(item.id)
                                }}
                                aria-current={activeMenu === item.id ? 'page' : undefined}
                            >
                                <span className="mr-3 text-cyan-200" aria-hidden="true">{item.icon}</span>
                                <span className="font-medium">{item.label}</span>
                            </Link>
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