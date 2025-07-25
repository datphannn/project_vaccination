"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useAuthStore from "@/stores/useAuthStore";
import { FaSignInAlt } from "react-icons/fa";

export default function ButtonSwitch() {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);
    const router = useRouter();

    useEffect(() => {
        if (typeof window === "undefined") return;

        const verifyToken = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/VerifyToken`, {
                    method: "GET",
                    credentials: "include",
                });
                if (res.ok) {
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                }
                console.log(isLoggedIn);
            } catch (error) {
                console.error("Verify token error:", error);
                setIsLoggedIn(false);
            }
        };

        verifyToken();
    }, [setIsLoggedIn]);

    const logOut = async () => {
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/Logout`, {
            method: "GET",
            credentials: "include",
        });
        setIsLoggedIn(false);
        window.location.reload();
    };

    return (
        isLoggedIn ? (
            <button
                className="flex items-center bg-white hover:bg-gray-100 text-cyan-600 rounded-full px-4 py-2 transition-colors"
                aria-label="Đăng xuất"
                onClick={logOut}
            >
                <FaSignInAlt className="mr-2 text-xs" />
                <span className="text-xs">Đăng xuất</span>
            </button>
        ) : (
            <Link href="/Login">
                <button
                    className="flex items-center bg-white hover:bg-gray-100 text-cyan-600 rounded-full px-4 py-2 transition-colors"
                    aria-label="Đăng nhập"
                >
                    <FaSignInAlt className="mr-2 text-xs" />
                    <span className="text-xs">Đăng nhập</span>
                </button>
            </Link>
        )
    );
}
