'use client';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Table, TableBody, TableHeader, TableRow, TableCell, TableColumn, getKeyValue } from "@heroui/react";
import { useState, useEffect } from "react";
import { adminGetWaitingProfiles } from "@/lib/userProfileApi";

interface Profile {
    userId: string;
    newSnapshot?: object;
}

const columns = [
    {
        key: "userId",
        label: "userId"
    },
    {
        key: "handle",
        label: "handle"
    },
    {
        key: "avatarUrl",
        label: "avatarUrl"
    },
    {
        key: "bannerUrl",
        label: "bannerUrl"
    },
    {
        key: "statusMessage",
        label: "statusMessage"
    },
    {
        key: "expertiseSummary",
        label: "expertiseSummary"
    },
    {
        key: "bio",
        label: "bio"
    },
    {
        key: "backgroundDescription",
        label: "backgroundDescription"
    },
    {
        key: "motivation",
        label: "motivation"
    },
    {
        key: "expectations",
        label: "expectations"
    },
    {
        key: "canOffer",
        label: "canOffer"
    },
    {
        key: "wechat",
        label: "wechat"
    },
    {
        key: "locationVisibility",
        label: "locationVisibility"
    },
    {
        key: "province",
        label: "province"
    },
    {
        key: "city",
        label: "city"
    },
    {
        key: "district",
        label: "district"
    }
]

export default function AdminProfilesPage() {
    const [profiles, setProfiles] = useState<Profile[]>([]);
    // const [rows, setRows] = useState<Profile[]>([]);
    useEffect(() => {
        adminGetWaitingProfiles().then((data) => {
            setProfiles(data.profiles);
        });
    }, []);

    if (!profiles) return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow text-center mt-10">未找到用户信息</div>
            <Footer />
        </div>
    );

    const getValue = (profile: Profile, columnKey: string) => {
        if (columnKey == "userId") {
            return profile.userId;
        }
        const newSnapshot = profile.newSnapshot as object;
        return getKeyValue(newSnapshot, columnKey);
    }


    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                    <Table>
                        <TableHeader columns={columns}>
                            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                        </TableHeader>
                        <TableBody>
                            {profiles.map((profile) =>
                                <TableRow key={profile.userId}>
                                    {(columnKey) => <TableCell>{getValue(profile, columnKey as string)}</TableCell>}
                                </TableRow>)}
                        </TableBody>
                    </Table>
                </div>
                <Footer />
            </div>
        </>
    );
}
