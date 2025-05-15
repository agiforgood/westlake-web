"use client";
import { useEffect, useState } from "react";
import { getUserProfile } from "@/lib/userProfileApi";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";
import {
  Spinner,
  Card,
  CardHeader,
  CardBody,
  Divider,
  Image,
  Button,
} from "@heroui/react";
import Avatar from "boring-avatars";
import { useLogto } from "@logto/react";
import ProfileAnchor from "@/components/Profile/ProfileAnchor";
import ProfileReadOnly from "@/components/Profile/ProfileReadOnly";
import { useRouter } from "next/navigation";
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
  const [isOther, setIsOther] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const userId = pathname.split("/").pop();
  const { isAuthenticated } = useLogto();
  const router = useRouter();
  useEffect(() => {
    if (isAuthenticated) {
      const token = localStorage.getItem("accessToken") ?? "";
      getUserProfile(userId as string, token).then((data) => {
        console.log(data);
        setIsOther(data.profile?.userId != localStorage.getItem('userId'));
        setProfile(data);
        setLoading(false);
      });
    }
  }, [userId, isAuthenticated]);

  const getAvailabilityText = (weekDay: number, timeSlot: number) => {
    const weekdayText = [
      "周一",
      "周二",
      "周三",
      "周四",
      "周五",
      "周六",
      "周日",
    ];
    const timeSlotText = ["上午", "下午", "晚上"];
    return `${weekdayText[weekDay]} ${timeSlotText[timeSlot]}`;
  };

  if (loading)
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow text-center mt-10">
          <Spinner label="加载中..." />
        </div>
        <Footer />
      </div>
    );
  if (!profile)
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow text-center mt-10">未找到用户信息</div>
        <Footer />
      </div>
    );

  return (
    <div className="flex flex-col items-center bg-gray-50 min-h-screen py-8 px-2 sm:px-0">
      <Card className="w-full max-w-3xl bg-white shadow-lg rounded-3xl mb-10 px-2 sm:px-6 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 mt-4">
          <div className="hidden sm:block col-span-3">
            <ProfileAnchor />
          </div>
          <div className="col-span-9">
            <ProfileReadOnly profile={profile} isOther={isOther} />
          </div>
        </div>
      </Card>
    </div>
  );
}
