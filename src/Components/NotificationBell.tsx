'use client';

import { useEffect, useState } from 'react';
import { FaBell } from 'react-icons/fa';

interface Notification {
    notification_id: number;
    content: string | null;
    is_read: boolean | null;
    send_date: string | null;
}

export default function NotificationBell() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false); // local state

    useEffect(() => {
        const verifyLogin = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/VerifyToken`, {
                    method: "GET",
                    credentials: "include",
                });

                const data = await res.json();
                console.log("VerifyToken trả về:", data);

                if (res.ok && data.LoggedIn === true) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error("Lỗi xác thực:", error);
                setIsAuthenticated(false);
            }
        };

        verifyLogin();
    }, []);

    useEffect(() => {
        const fetchNotifications = async () => {
            if (!isAuthenticated) return;

            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/Notifications`, {
                    credentials: 'include',
                    cache: 'no-store'
                });

                const data = await res.json();
                setNotifications(data);
            } catch (err) {
                console.error("Lỗi lấy thông báo:", err);
            }
        };

        fetchNotifications();
    }, [isAuthenticated]);

    const handleMarkAsRead = async (id: number) => {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/Notifications/${id}/read`, {
                method: 'POST',
                credentials: 'include',
            });

            setNotifications((prev) =>
                prev.map((n) =>
                    n.notification_id === id ? { ...n, is_read: true } : n
                )
            );
        } catch (err) {
            console.error("Lỗi đánh dấu đã đọc:", err);
        }
    };

    if (!isAuthenticated) return null;

    return (
        <div className="relative">
            <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="relative text-white hover:text-gray-200 p-2"
                aria-label="Thông báo"
            >
                <FaBell className="text-xl" />
                {notifications.some((n) => !n.is_read) && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                )}
            </button>

            {showDropdown && (
                <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg z-50">
                    <div className="p-3 text-black font-bold border-b">Thông báo</div>
                    <ul className="max-h-96 overflow-y-auto">
                        {notifications.map((n) => (
                            <li
                                key={n.notification_id}
                                onClick={() => handleMarkAsRead(n.notification_id)}
                                className={`pb-5 px-3 pt-2 cursor-pointer hover:bg-gray-100 border-b relative ${n.is_read ? 'text-gray-500' : 'text-black font-medium'
                                    }`}
                            >
                                {n.content || 'Không có nội dung'}
                                <div className='absolute text-xs r-1 b-1'>{n.send_date?new Date(n.send_date).toLocaleDateString("vi-VN"):'nul'}</div>
                            </li>
                        ))}
                    </ul>
                    {notifications.length === 0 && (
                        <div className="p-3 text-sm text-gray-500">Không có thông báo mới</div>
                    )}
                </div>
            )}
        </div>
    );
}
