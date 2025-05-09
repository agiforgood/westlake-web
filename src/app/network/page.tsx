'use client';

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getAllProfiles } from "@/lib/userProfileApi";
import { Card, CardBody, CardHeader, Divider, Image } from "@heroui/react";
import { useEffect, useState } from "react";
import Avatar from "boring-avatars"
import { useRouter } from "next/navigation";
import { useLogto } from '@logto/react';
interface UserProfile {
    profile: Profile;
    tags: Tag[];
    availability: UserAvailability[];
}

interface Tag {
    id: string;
    content: string;
    category: string;
}

interface UserAvailability {
    weekDay: number;
    timeSlot: number;
}

interface Profile {
    userId: string;
    handle: string;
    name: string;
    gender: number;
    avatarUrl?: string;
    statusMessage?: string;
    expertiseSummary?: string;
}

export default function NetworkPage() {
    const [profiles, setProfiles] = useState<UserProfile[]>([]);
    const router = useRouter();
    const { isAuthenticated } = useLogto()

    useEffect(() => {
        if (isAuthenticated) {
            const token = localStorage.getItem('accessToken') ?? ""
            getAllProfiles(token).then((data) => {
                console.log(data);
                setProfiles(data.profiles);
            });
        }
    }, [isAuthenticated]);

    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <div className="flex-grow flex py-12 px-4 sm:px-6 lg:px-12">
                    <div className="flex flex-col gap-4">
                        <h2 className="text-2xl font-bold">志愿者网络</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {profiles.map((profile) => (
                                <Card key={profile.profile.userId} onPress={() => router.push(`/profile/${profile.profile.userId}`)} isPressable>
                                    <CardHeader>
                                        <div className="flex flex-row gap-4 p-4 items-center">
                                            {profile.profile.avatarUrl ?
                                                <Image src={profile.profile.avatarUrl} alt="头像" className="w-24 h-24 rounded-full border" />
                                                :
                                                <Avatar className="w-24 h-24 rounded-full border" name={profile.profile.userId} variant="beam" />
                                            }
                                            <div className="flex flex-col items-start">
                                                <div className="text-2xl font-bold">{profile.profile.name}</div>
                                                <div className="text-gray-400 text-base">ID: {profile.profile.handle}</div>
                                                <div className="text-gray-400 text-base">{profile.profile.statusMessage}</div>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardBody>
                                        <div className="text-gray-400 text-base">{profile.profile.expertiseSummary}</div>
                                        <Divider />
                                        <div className="flex flex-col gap-4 p-4">
                                            <div className="flex flex-wrap gap-2">
                                                {profile.tags.length > 0 ?
                                                    profile.tags.map(tag => (
                                                        <div key={tag.id} className="bg-gray-100 px-2 py-1 rounded-full text-sm">
                                                            {tag.content}
                                                        </div>
                                                    ))
                                                    : null
                                                }
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}
