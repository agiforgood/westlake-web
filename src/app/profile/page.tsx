'use client'
import { useEffect, useState } from 'react';
import { getMyProfile } from '@/lib/userProfileApi';
import { authClient } from '@/lib/authClient';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useRouter } from 'next/navigation';
const { useSession } = authClient
import { Spinner, Card, CardHeader, CardBody, CardFooter, Divider, Image, Button } from '@heroui/react';

interface UserProfile {
    profile: Profile;
    tags: UserTag[];
    availability: UserAvailability[];
}

interface Profile {
    userId: string;
    handle: string;
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
    tagId: string;
    content: string;
    category: string;
}

interface UserAvailability {
    weekday: number;
    timeSlot: number;
}

export default function ProfilePage() {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const {
        data: session,
    } = useSession()

    useEffect(() => {
        if (session?.session) {
            getMyProfile().then(data => {
                console.log(data);
                setProfile(data);
                setLoading(false);
            });
        }
    }, [session, router]);

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
                        <Image src={profile.profile.avatarUrl} alt="头像" className="w-24 h-24 rounded-full border" />
                        <div className="flex flex-col">
                            <div className="text-2xl font-bold">{session?.user.name} <span className="text-gray-400 text-base">ID: {profile.profile.handle}</span></div>
                            <div className="text-gray-400 text-base">{profile.profile.statusMessage}</div>
                        </div>
                        <Button className="max-w-1 m-4" >编辑</Button>
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        <div className="flex flex-col gap-4 p-4">
                            <h3 className="font-semibold">专业一句话介绍</h3>
                            <div className="text-gray-600 mt-1">{profile.profile.expertiseSummary}</div>
                            <h3 className="font-semibold">个人简介</h3>
                            <div className="text-gray-600 mt-1">{profile.profile.bio}</div>
                            <h3 className="font-semibold">背景介绍</h3>
                            <div className="text-gray-600 mt-1">{profile.profile.backgroundDescription}</div>
                            <h3 className="font-semibold">加入原因</h3>
                            <div className="text-gray-600 mt-1">{profile.profile.motivation}</div>
                            <h3 className="font-semibold">想要获得的帮助</h3>
                            <div className="text-gray-600 mt-1">{profile.profile.expectations}</div>
                            <h3 className="font-semibold">可以提供的资源</h3>
                            <div className="text-gray-600 mt-1">{profile.profile.canOffer}</div>
                        </div>
                        <Divider />
                        <div className="flex flex-col gap-4 p-4">
                            <h3 className="font-semibold">地址</h3>
                            <div className="text-gray-600 mt-1">{profile.profile.province} {profile.profile.city} {profile.profile.district}</div>
                        </div>
                        <Divider />
                        <div className="flex flex-col gap-4 p-4">
                            <h3 className="font-semibold">联系方式</h3>
                            <div className="text-gray-600 mt-1">{profile.profile.wechat}</div>
                        </div>
                        <Divider />
                        <div className="flex flex-col gap-4 p-4">
                            <h3 className="font-semibold">标签</h3>
                            <div className="flex flex-wrap gap-2">
                                {profile.tags.map(tag => (
                                    <div key={tag.tagId} className="bg-gray-100 px-2 py-1 rounded-full text-sm">
                                        {tag.content}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <Divider />
                        <div className="flex flex-col gap-4 p-4">
                            <h3 className="font-semibold">可参与时间</h3>
                            <div className="flex flex-wrap gap-2">
                                {profile.availability.map(availability => (
                                    <div key={availability.weekday} className="bg-gray-100 px-2 py-1 rounded-full text-sm">
                                        {availability.weekday} {availability.timeSlot}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardBody>

                </Card>

            </div>
            <Footer />
        </div>
    );
} 