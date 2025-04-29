'use client';

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getAllProfiles } from "@/lib/userProfileApi";
import { Card, CardBody, CardHeader, Image } from "@heroui/react";
import { useEffect, useState } from "react";
import Avatar, { genConfig } from 'react-nice-avatar'

interface Profile {
    userId: string;
    handle: string;
    name: string;
    avatarUrl?: string;
    statusMessage?: string;
    expertiseSummary?: string;
}

export default function NetworkPage() {
    const [profiles, setProfiles] = useState<Profile[]>([]);

    useEffect(() => {
        getAllProfiles().then((data) => {
            console.log(data);
            setProfiles(data.profiles);
        });
    }, []);

    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <div className="flex-grow flex py-12 px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-4">
                        <h2 className="text-2xl font-bold">志愿者网络</h2>
                        {profiles.map((profile) => (
                            <Card key={profile.userId}>
                                <CardHeader>
                                    {profile.avatarUrl ?
                                        <Image src={profile.avatarUrl} alt="头像" className="w-24 h-24 rounded-full border" />
                                        :
                                        <Avatar className="w-24 h-24 rounded-full border" {...genConfig(profile.userId)} />
                                    }
                                    <div className="flex flex-col">
                                        <div className="text-2xl font-bold">{profile.name} <span className="text-gray-400 text-base">ID: {profile.handle}</span></div>
                                        <div className="text-gray-400 text-base">{profile.statusMessage}</div>
                                    </div>
                                </CardHeader>
                                <CardBody>
                                    <div className="text-gray-400 text-base">{profile.expertiseSummary}</div>
                                </CardBody>
                            </Card>
                        ))}
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}
