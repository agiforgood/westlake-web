"use client";
import { useEffect, useState } from "react";
import { Card, Divider, Button, Spinner } from "@heroui/react";
import ProfileReadOnly from "@/components/Profile/ProfileReadOnly";
import ProfileAnchor from "@/components/Profile/ProfileAnchor";
import { useRouter } from "next/navigation";
import { useLogto } from "@logto/react";

import { getMyProfile } from "@/lib/userProfileApi";
import { UserProfile } from "@/type";

export default function ProfileEditPage() {
  const router = useRouter();
  const { isAuthenticated } = useLogto();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      const accessToken = localStorage.getItem("accessToken") ?? "";
      setToken(accessToken);
      getMyProfile(accessToken).then((data) => {
        setProfile(data);
        setLoading(false);
      });
    }
  }, [isAuthenticated, router]);

  if (loading)
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow text-center mt-10">
          <Spinner label="加载中..." />
        </div>
      </div>
    );
  if (!profile)
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow text-center mt-10">未找到用户信息</div>
      </div>
    );
  return (
    <div className="flex flex-col items-center bg-gray-50 min-h-screen py-8 px-2 sm:px-0">
      <Card className="w-full max-w-3xl bg-white shadow-lg rounded-3xl mb-10 px-2 sm:px-6 py-6">
        <div className="flex justify-between items-center">
          <h1 className="">智能向善社会创新网络志愿者说明书</h1>
          <Button
            variant="bordered"
            radius="full"
            onPress={() => {
              router.push("/profile/edit");
            }}
          >
            编辑志愿者说明书
          </Button>
        </div>
        <Divider className="bg-primary/50 my-7" />
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 mt-4">
          <div className="hidden sm:block col-span-3">
            <ProfileAnchor />
          </div>
          <div className="col-span-9">
            <ProfileReadOnly profile={profile} />
          </div>
        </div>
      </Card>
    </div>
  );
}
