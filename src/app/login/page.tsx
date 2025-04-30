'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/authClient';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button, Form, Input, addToast } from '@heroui/react';

export default function LoginPage() {
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget));
        const email = data.email as string;
        const password = data.password as string;

        try {
            const { error: authError } = await authClient.signIn.email({
                email,
                password,
            });
            if (authError) {
                addToast({
                    title: '登录失败',
                    description: '请检查您的邮箱和密码',
                    color: 'danger',
                });
                return;
            }
            router.push('/profile');
        } catch {
            addToast({
                title: '登录失败',
                description: '请稍后重试',
                color: 'danger',
            });
        }
    };

    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <div className="flex-grow flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-md w-full space-y-8">
                        <div>
                            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                                登录您的账号
                            </h2>
                            <p className="mt-2 text-center text-sm text-gray-600">
                                没有账号？{' '}
                                <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
                                    注册新账号
                                </Link>
                            </p>
                        </div>
                        <Form onSubmit={handleSubmit}>
                            <Input
                                isRequired
                                errorMessage="请输入邮箱地址"
                                label="邮箱地址"
                                labelPlacement="inside"
                                name="email"
                                placeholder="输入邮箱地址"
                                type="email"
                            />
                            <Input
                                isRequired
                                errorMessage="请输入密码"
                                label="密码"
                                labelPlacement="inside"
                                name="password"
                                placeholder="输入密码"
                                type="password"
                            />
                            <Button type="submit" className="w-full" color="secondary">登录</Button>
                        </Form>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
} 