'use client';

import { Navbar as HeroNavbar, NavbarBrand, NavbarContent, NavbarItem, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@heroui/react';
import Link from 'next/link';
import Avatar, { genConfig } from 'react-nice-avatar'
import { authClient } from '@/lib/authClient';
import { useRouter } from 'next/navigation';
const { useSession } = authClient

export default function Navbar() {
    const { data: session } = useSession()
    const router = useRouter()

    const handleLogout = async () => {
        await authClient.signOut();
        router.push('/')
    };

    return (
        <HeroNavbar>
            <NavbarBrand>
                <Link href="/">
                    <p className="font-bold text-inherit">智能向善</p>
                </Link>
            </NavbarBrand>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link color="foreground" href="https://westlakeaiforgood.feishu.cn/wiki/JNXXwuhMairUVxk1wfocW2lcnkc" target="_blank">
                        路线图
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="https://westlakeaiforgood.feishu.cn/wiki/E88hwBpPeiOE6vkDumxcvRITnIe" target="_blank">
                        任务
                    </Link>
                </NavbarItem>
                {
                    session?.user ? (
                        <NavbarItem>
                            <Link color="foreground" href="/network">
                                志愿者网络
                            </Link>
                        </NavbarItem>
                    ) : null
                }
            </NavbarContent>

            <NavbarContent as="div" justify="end">
                {session?.user ? (
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <Button variant="light" color="secondary" size="sm" radius="full" className="w-24" isIconOnly>
                                <div className="flex items-center gap-2">
                                    <Avatar className="w-8 h-8" {...genConfig(session?.user?.id)} />
                                    <p className="text-sm">{session?.user?.name}</p>
                                </div>
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Profile Actions" variant="flat">
                            <DropdownItem key="user" className="h-14 gap-2">
                                <p className="font-semibold">已登录</p>
                                <p className="font-semibold">{session?.user?.email}</p>
                            </DropdownItem>
                            <DropdownItem key="profile" href="/profile">个人资料</DropdownItem>
                            {session?.user?.role === 'admin' ? (
                                <DropdownItem key="admin" href="/admin">管理后台</DropdownItem>
                            ) : null}
                            <DropdownItem key="logout" color="danger" onPress={handleLogout}>
                                退出登录
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                ) : (
                    <Button color="secondary" variant="flat" as="a" href="/login">登录</Button>
                )}
            </NavbarContent>
        </HeroNavbar>
    );
} 