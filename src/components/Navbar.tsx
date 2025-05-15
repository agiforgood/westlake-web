"use client";

import {
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
} from "@heroui/react";
// import Link from "next/link";
import Avatar from "boring-avatars";
import { useEffect, useState } from "react";
import { getMyProfile } from "@/lib/userProfileApi";
import { useLogto } from "@logto/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
interface Profile {
  userId: string;
  gender: number;
  handle: string;
  avatarUrl: string;
  role: string;
}

const routes = [
  {
    label: "路线图",
    href: "https://westlakeaiforgood.feishu.cn/wiki/JNXXwuhMairUVxk1wfocW2lcnkc",
    isExternal: true,
  },
  {
    label: "任务",
    href: "https://westlakeaiforgood.feishu.cn/wiki/E88hwBpPeiOE6vkDumxcvRITnIe",
    isExternal: true,
  },
  {
    label: "志愿者",
    href: "/network",
    isExternal: false,
  },
];

export default function Navbar() {
  const { signIn, signOut, isAuthenticated, getAccessToken } = useLogto();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // 获取当前路径
  const pathname = usePathname();

  useEffect(() => {
    if (isAuthenticated) {
      getAccessToken("https://api.westlakeaiforgood.com").then((token) => {
        localStorage.setItem("accessToken", token ?? "");
        
        getMyProfile(token ?? "").then((data) => {
          localStorage.setItem("userId", data.profile?.userId||"")
          setProfile(data.profile);
        }).catch((ex)=>{
            console.error('loading profile failed',ex);
        });
      });
    }
  }, [isAuthenticated, getAccessToken]);

  return (
    <HeroNavbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        ></NavbarMenuToggle>
        <NavbarBrand className="hidden sm:flex">
          <Link href="/" color="foreground" className="flex items-center gap-2">
            <Image src="/agi_logo.svg" alt="logo" width={36} height={36} />
            <p className="font-bold text-inherit">智能向善</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-15" justify="center">
        {routes.map((route) => (
          <NavbarItem key={route.label}>
            <Link
              // className="text-lg"
              color={pathname === route.href ? "primary" : "foreground"}
              href={route.href}
              isExternal={route.isExternal}
            >
              {route.label}
            </Link>
          </NavbarItem>
        ))}

        <NavbarContent as="div" justify="end">
          {isAuthenticated ? (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Button
                  variant="light"
                  color="secondary"
                  size="sm"
                  radius="full"
                  className="w-8"
                  isIconOnly
                >
                  <div className="flex items-center gap-2">
                  {profile?.avatarUrl ? (
                        <Image
                          src={profile.avatarUrl}
                          alt="头像"
                          className="w-8 h-8"
                        />
                      ) : (
                        <Avatar
                          className="w-8 h-8"
                          name={profile?.userId??""}
                          variant="beam"
                        />
                      )}
                  </div>
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="user" className="h-14 gap-2">
                  <p className="font-semibold">已登录</p>
                  <p className="font-semibold">{profile?.handle}</p>
                </DropdownItem>
                <DropdownItem key="profile" href="/profile">
                  个人资料
                </DropdownItem>
                <DropdownItem key="chat" href="/chat">
                  我的私信
                </DropdownItem>
                {profile?.role == "admin" ? (
                  <DropdownItem key="admin" href="/admin">
                    管理后台
                  </DropdownItem>
                ) : null}
                <DropdownItem
                  key="logout"
                  color="danger"
                  onPress={() => {
                    signOut("https://westlakeaiforgood.com/");
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("userId");
                  }}
                >
                  退出登录
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <Button
              color="secondary"
              variant="flat"
              onPress={() => signIn("https://westlakeaiforgood.com/callback")}
            >
              登录
            </Button>
          )}
        </NavbarContent>
      </NavbarContent>

      <NavbarMenu>
        <NavbarMenuItem>
          <Link
            color="foreground"
            href="https://westlakeaiforgood.feishu.cn/wiki/JNXXwuhMairUVxk1wfocW2lcnkc"
            target="_blank"
          >
            路线图
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link
            color="foreground"
            href="https://westlakeaiforgood.feishu.cn/wiki/E88hwBpPeiOE6vkDumxcvRITnIe"
            target="_blank"
          >
            任务
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          {isAuthenticated ? (
            <Link color="foreground" href="/network">
              志愿者网络
            </Link>
          ) : (
            <Link color="foreground" href="/">
              志愿者网络
            </Link>
          )}
        </NavbarMenuItem>
      </NavbarMenu>
    </HeroNavbar>
  );
}
