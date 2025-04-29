'use client'
import { useEffect, useState } from 'react';
import { getMyProfile } from '@/lib/userProfileApi';
import { authClient } from '@/lib/authClient';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
const { useSession } = authClient

interface UserProfile {
    profile: Profile;
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

export default function ProfilePage() {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const {
        data: session,
        isPending, //loading state
        error, //error object 
        refetch //refetch the session
    } = useSession()

    useEffect(() => {
        const userId = session?.user?.id;
        if (userId) {
            getMyProfile().then(data => {
                console.log(data);
                setProfile(data);
                setLoading(false);
            });
        }
    }, [session]);

    if (loading) return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow text-center mt-10">加载中...</div>
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
            <div className="flex-grow">
                <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-8 mt-8">
                    <div className="flex items-center space-x-6">
                        <img src={profile.profile.avatarUrl || '/default-avatar.png'} alt="头像" className="w-24 h-24 rounded-full border" />
                        <div>
                            <div className="text-2xl font-bold">{session?.user.name} <span className="text-gray-400 text-base">ID: {profile.profile.handle}</span></div>
                            <div className="text-gray-600 mt-1">{profile.profile.expertiseSummary}</div>
                            <div className="text-sm text-green-600 mt-1">{profile.profile.statusMessage}</div>
                            <div className="flex space-x-2 mt-2">
                                <span className="bg-gray-100 px-2 py-1 rounded text-xs">积分: 0</span>
                                <span className="bg-gray-100 px-2 py-1 rounded text-xs">经验: 0</span>
                                <span className="bg-gray-100 px-2 py-1 rounded text-xs">等级: 0</span>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                        <div>
                            <h3 className="font-semibold mb-2">个人简介</h3>
                            <div className="text-gray-700 text-sm mb-4">{profile.profile.bio}</div>
                            <h3 className="font-semibold mb-2">加入原因</h3>
                            <div className="text-gray-700 text-sm mb-4">{profile.profile.motivation}</div>
                            <h3 className="font-semibold mb-2">想要获得的帮助</h3>
                            <div className="text-gray-700 text-sm mb-4">{profile.profile.expectations}</div>
                            <h3 className="font-semibold mb-2">可以提供的资源</h3>
                            <div className="text-gray-700 text-sm">{profile.profile.canOffer}</div>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">基本信息</h3>
                            <div className="text-gray-700 text-sm mb-2">注册时间: {profile.profile.createdAt}</div>
                            <div className="text-gray-700 text-sm mb-2">项目参与: {profile.profile.projectCount} 个项目</div>
                            <div className="text-gray-700 text-sm mb-2">活动参与: {profile.eventCount} 次活动</div>
                            <div className="text-gray-700 text-sm mb-2">邮箱: {profile.email}</div>
                            <div className="text-gray-700 text-sm mb-2">电话: {profile.phone}</div>
                            <div className="text-gray-700 text-sm mb-2">地区: {profile.region}</div>
                            <h3 className="font-semibold mt-4 mb-2">专业技能</h3>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {profile.skills?.map((s: string) => (
                                    <span key={s} className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">{s}</span>
                                ))}
                            </div>
                            <h3 className="font-semibold mb-2">标签</h3>
                            <div className="flex flex-wrap gap-2">
                                {profile.tags?.map((t: string) => (
                                    <span key={t} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">{t}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="mt-8">
                        <h3 className="font-semibold mb-2">可参与时间</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            {profile.availableTime && Object.entries(profile.availableTime).map(([day, times]) => (
                                <div key={day}>
                                    <div className="font-medium text-sm">{day}</div>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                        {(times as string[]).map((t: string) => (
                                            <span key={t} className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded text-xs">{t}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
} 