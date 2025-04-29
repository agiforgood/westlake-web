'use client';

import { Navbar as HeroNavbar, NavbarBrand, NavbarContent, NavbarItem, Dropdown, DropdownTrigger, Avatar, DropdownMenu, DropdownItem, Button } from '@heroui/react';
import Link from 'next/link';
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
                    <p className="font-bold text-inherit">AGI for Good</p>
                </Link>
            </NavbarBrand>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link color="foreground" href="#">
                        路线图
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#">
                        任务
                    </Link>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent as="div" justify="end">
                {session?.user ? (
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <Avatar
                                isBordered
                                as="button"
                                className="transition-transform"
                                color="secondary"
                                name="Jason Hughes"
                                size="sm"
                                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                            />
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