'use client';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@heroui/react";
import Link from 'next/link';

export default function AdminDashboard() {
    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-4">
                        <Button>
                            <Link href="/admin/profiles">
                                志愿者档案
                            </Link>
                        </Button>
                        <Button>
                            <Link href="/admin/tags">
                                标签管理
                            </Link>
                        </Button>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}
