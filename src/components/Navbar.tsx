'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { authClient } from '@/lib/authClient';
const { useSession } = authClient

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const { data: session } = useSession()
    const profileRef = useRef<HTMLDivElement>(null);

    // 点击外部关闭下拉菜单
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = async () => {
        // TODO: 实现登出逻辑
        setIsProfileOpen(false);
    };

    return (
        <nav className="fixed w-full bg-white/80 backdrop-blur-sm z-50 shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="text-xl font-bold text-gray-900">
                        西湖区智能向善
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-8">
                        <Link href="#stats" className="text-gray-600 hover:text-gray-900">
                            数据统计
                        </Link>
                        <Link href="#features" className="text-gray-600 hover:text-gray-900">
                            特色功能
                        </Link>
                        <Link href="#about" className="text-gray-600 hover:text-gray-900">
                            关于我们
                        </Link>
                    </div>

                    {/* User Profile or Login Button */}
                    <div className="hidden md:block" ref={profileRef}>
                        {session?.user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="flex items-center text-gray-600 hover:text-gray-900 focus:outline-none"
                                >
                                    <span className="mr-2">{session.user.name}</span>
                                    <svg
                                        className={`w-4 h-4 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                {isProfileOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                                        <Link
                                            href="/profile"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={() => setIsProfileOpen(false)}
                                        >
                                            个人资料
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            退出登录
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                className="text-gray-600 hover:text-gray-900"
                            >
                                登录
                            </Link>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-600 hover:text-gray-900 focus:outline-none"
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {isOpen ? (
                                    <path d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            <Link
                                href="#stats"
                                className="block px-3 py-2 text-gray-600 hover:text-gray-900"
                                onClick={() => setIsOpen(false)}
                            >
                                数据统计
                            </Link>
                            <Link
                                href="#features"
                                className="block px-3 py-2 text-gray-600 hover:text-gray-900"
                                onClick={() => setIsOpen(false)}
                            >
                                特色功能
                            </Link>
                            <Link
                                href="#about"
                                className="block px-3 py-2 text-gray-600 hover:text-gray-900"
                                onClick={() => setIsOpen(false)}
                            >
                                关于我们
                            </Link>
                            {session?.user ? (
                                <>
                                    <Link
                                        href="/profile"
                                        className="block px-3 py-2 text-gray-600 hover:text-gray-900"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        个人资料
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900"
                                    >
                                        退出登录
                                    </button>
                                </>
                            ) : (
                                <Link
                                    href="/login"
                                    className="block px-3 py-2 text-gray-600 hover:text-gray-900"
                                    onClick={() => setIsOpen(false)}
                                >
                                    登录
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
} 