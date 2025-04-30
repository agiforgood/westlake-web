'use client'
import { useEffect, useState } from 'react';
import { getUserProfile } from '@/lib/userProfileApi';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { usePathname } from 'next/navigation';
import { Spinner, Card, CardHeader, CardBody, Divider, Image } from '@heroui/react';
import Avatar, { genConfig } from 'react-nice-avatar'

interface UserProfile {
    profile: Profile;
    tags: UserTag[];
    availability: UserAvailability[];
}

interface Profile {
    userId: string;
    handle: string;
    name: string;
    gender: number;
    avatarUrl?: string;
    bannerUrl?: string;
    statusMessage?: string;
    expertiseSummary?: string;
    bio?: string;
    backgroundDescription?: string;
    motivation?: string;
    expectations?: string;
    canOffer?: string;
    wechat?: string;
    locationVisibility?: number;
    province?: string;
    city?: string;
    district?: string;
}

interface UserTag {
    id: string;
    content: string;
    category: string;
}

interface UserAvailability {
    weekDay: number;
    timeSlot: number;
}

export default function UserProfilePage() {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const pathname = usePathname()
    const userId = pathname.split('/').pop()

    useEffect(() => {
        getUserProfile(userId as string).then(data => {
            console.log(data);
            setProfile(data);
            setLoading(false);
        });
    }, [userId]);

    const getAvailabilityText = (weekDay: number, timeSlot: number) => {
        const weekdayText = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
        const timeSlotText = ["上午", "下午", "晚上"];
        return `${weekdayText[weekDay]} ${timeSlotText[timeSlot]}`;
    }

    const getAvatarConfig = (userId: string, gender: number) => {
        if (gender == 0) {
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

    if (loading) return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow text-center mt-10">
                <Spinner label="加载中..." />
            </div>
            <Footer />
        </div>
    );
    if (!profile) return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow text-center mt-10">未找到用户信息</div>
            <Footer />
        </div>
    );

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow py-12">
                <Card className="max-w-3xl mx-auto">
                    <CardHeader>
                        <div className="p-4 flex flex-row items-center gap-4 w-full">
                            {profile.profile.avatarUrl ?
                                <Image src={profile.profile.avatarUrl} alt="头像" className="w-24 h-24 rounded-full border" />
                                :
                                <Avatar className="w-24 h-24 rounded-full border" {...getAvatarConfig(profile.profile.userId, profile.profile.gender)} />
                            }
                            <div className="flex flex-col">
                                <div className="text-2xl font-bold">{profile.profile.name}</div>
                                <div className="text-gray-400 text-base">ID: {profile.profile.handle}</div>
                                <div className="text-gray-400 text-base">性别：{profile.profile.gender == 0 ? "保密" : profile.profile.gender == 1 ? "男" : "女"}</div>
                                <div className="text-gray-400 text-base">{profile.profile.statusMessage}</div>
                            </div>
                        </div>
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        <div className="flex flex-col gap-4 p-4">
                            <h3 className="font-semibold">专业一句话介绍</h3>
                            <div className="text-gray-600 mt-1">{profile.profile.expertiseSummary || "未填写"}</div>
                            <h3 className="font-semibold">个人简介</h3>
                            <div className="text-gray-600 mt-1">{profile.profile.bio || "未填写"}</div>
                            <h3 className="font-semibold">背景介绍</h3>
                            <div className="text-gray-600 mt-1">{profile.profile.backgroundDescription || "未填写"}</div>
                            <h3 className="font-semibold">加入原因</h3>
                            <div className="text-gray-600 mt-1">{profile.profile.motivation || "未填写"}</div>
                            <h3 className="font-semibold">想要获得的帮助</h3>
                            <div className="text-gray-600 mt-1">{profile.profile.expectations || "未填写"}</div>
                            <h3 className="font-semibold">可以提供的资源</h3>
                            <div className="text-gray-600 mt-1">{profile.profile.canOffer || "未填写"}</div>
                        </div>
                        <Divider />
                        <div className="flex flex-col gap-4 p-4">
                            <h3 className="font-semibold">地址</h3>
                            <div className="text-gray-600 mt-1">{profile.profile.province} {profile.profile.city} {profile.profile.district || "未填写"}</div>
                        </div>
                        <Divider />
                        <div className="flex flex-col gap-4 p-4">
                            <h3 className="font-semibold">联系方式</h3>
                            <div className="text-gray-600 mt-1">{profile.profile.wechat || "未填写"}</div>
                        </div>
                        <Divider />
                        <div className="flex flex-col gap-4 p-4">
                            <h3 className="font-semibold">标签</h3>
                            <div className="flex flex-wrap gap-2">
                                {profile.tags.length > 0 ?
                                    profile.tags.map(tag => (
                                        <div key={tag.id} className="bg-gray-100 px-2 py-1 rounded-full text-sm">
                                            {tag.content}
                                        </div>
                                    ))
                                    :
                                    <div className="text-gray-400">未填写</div>
                                }
                            </div>
                        </div>
                        <Divider />
                        <div className="flex flex-col gap-4 p-4">
                            <h3 className="font-semibold">可参与时间</h3>
                            <div className="flex flex-wrap gap-2">
                                {profile.availability.length > 0 ?
                                    profile.availability.map(availability => (
                                        <div key={availability.weekDay} className="bg-gray-100 px-2 py-1 rounded-full text-sm">
                                            {getAvailabilityText(availability.weekDay, availability.timeSlot)}
                                        </div>
                                    ))
                                    :
                                    <div className="text-gray-400">未填写</div>
                                }
                            </div>
                        </div>
                    </CardBody>

                </Card>

            </div>
            <Footer />
        </div>
    );
} 