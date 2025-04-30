'use client';

import { Navbar as HeroNavbar, NavbarBrand, NavbarContent, NavbarItem, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from '@heroui/react';
import Link from 'next/link';
import Avatar, { genConfig } from 'react-nice-avatar'
import { authClient } from '@/lib/authClient';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getMyProfile } from '@/lib/userProfileApi';
const { useSession } = authClient

interface Profile {
    userId: string,
    gender: number,
}

export default function Navbar() {
    const { data: session } = useSession()
    const router = useRouter()
    const [profile, setProfile] = useState<Profile | null>(null)
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (session) {
            getMyProfile().then((data) => {
                setProfile(data.profile)
            })
        }
    }, [session])

    const getAvatarConfig = (userId: string, gender: number | undefined) => {
        if (gender == undefined || gender == 0) {
            return genConfig(userId)
        }
        const config = genConfig(userId)
        let sex: 'man' | 'woman' = 'man'
        if (gender == 1) {
            sex = 'woman'
        }
        return {
            ...config,
            sex: sex
        }
    }

    const handleLogout = async () => {
        await authClient.signOut();
        router.push('/')
    };

    return (
        <HeroNavbar onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <Link href="/">
                        <p className="font-bold text-inherit">智能向善</p>
                    </Link>
                </NavbarBrand>
            </NavbarContent>

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
                <NavbarItem>
                    {session?.user ? (
                        <Link color="foreground" href="/network">
                            志愿者网络
                        </Link>
                    ) : (
                        <Link color="foreground" href="/login">
                            志愿者网络
                        </Link>
                    )}
                </NavbarItem>
            </NavbarContent>

            <NavbarContent as="div" justify="end">
                {session?.user ? (
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <Button variant="light" color="secondary" size="sm" radius="full" className="w-24" isIconOnly>
                                <div className="flex items-center gap-2">
                                    <Avatar className="w-8 h-8" {...getAvatarConfig(session?.user?.id, profile?.gender)} />
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

            <NavbarMenu>
                <NavbarMenuItem>
                    <Link color="foreground" href="https://westlakeaiforgood.feishu.cn/wiki/JNXXwuhMairUVxk1wfocW2lcnkc" target="_blank">
                        路线图
                    </Link>
                </NavbarMenuItem>
                <NavbarMenuItem>
                    <Link color="foreground" href="https://westlakeaiforgood.feishu.cn/wiki/E88hwBpPeiOE6vkDumxcvRITnIe" target="_blank">
                        任务
                    </Link>
                </NavbarMenuItem>
                <NavbarMenuItem>
                    {session?.user ? (
                        <Link color="foreground" href="/network">
                            志愿者网络
                        </Link>
                    ) : (
                        <Link color="foreground" href="/login">
                            志愿者网络
                        </Link>
                    )}
                </NavbarMenuItem>
            </NavbarMenu>
        </HeroNavbar>
    );
} 