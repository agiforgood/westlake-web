"use client";
import { useState, useEffect } from "react";
import { Card, CardBody, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useLogto } from "@logto/react";
import { getMyProfile } from "@/lib/userProfileApi";

import { UserProfile } from "@/type";

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { isAuthenticated } = useLogto();

  useEffect(() => {
    if (isAuthenticated) {
      const token = localStorage.getItem("accessToken") ?? "";
      if (token == "") {
        router.push("/");
      }
      getMyProfile(token).then((data) => {
        console.log(data);
        setProfile(data);
        setLoading(false);
      });
    }
  }, [isAuthenticated, router]);

  return (
    <div className="flex flex-col items-center bg-gray-50 min-h-screen py-8 px-2 sm:px-0">
      {/* 个人信息卡片 */}
      <Card className="w-full max-w-3xl bg-white shadow-lg rounded-3xl mb-10 px-2 sm:px-6 py-6">
        <div className="flex flex-col sm:flex-row items-start gap-6 relative">
          {/* 头像 */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gray-200 flex items-center justify-center text-4xl sm:text-5xl shrink-0 ml-0 sm:ml-2 mt-2">
            <span role="img" aria-label="avatar">
              👤
            </span>
          </div>
          {/* 主要信息区 */}
          <div className="flex flex-col flex-1 mt-2">
            <div className="flex flex-col sm:flex-col items-start gap-2 sm:gap-4">
              <span className="text-2xl  leading-tight">
                {profile?.profile.name || profile?.profile.newSnapshot?.name}
              </span>
              <span className="text-gray-400 text-base font-normal">
                ID:
                {profile?.profile.handle || profile?.profile.newSnapshot?.handle}
              </span>
            </div>
            {/* <div className="flex flex-row flex-wrap gap-2 sm:gap-3 mt-3 sm:mt-4">
              <span className="bg-purple-50 text-purple-600 text-sm sm:text-base rounded-xl px-2 sm:px-3 py-1 font-medium">
                全栈工程师
              </span>
              <span className="bg-gray-100 text-gray-500 text-sm sm:text-base rounded-xl px-2 sm:px-3 py-1 font-medium">
                正在参与齐家AI项目开发
              </span>
            </div> */}
            <div className="mt-6 text-base text-gray-800 leading-relaxed font-normal">
              {profile?.profile.bio || profile?.profile.newSnapshot?.bio}
            </div>
          </div>
          {/* 编辑按钮 */}
          <Button
            size="md"
            variant="bordered"
            className="absolute right-4 top-4 sm:right-0 sm:top-0 rounded-full border-1 text-base px-4 py-2 font-medium min-w-[48px]"
            onPress={() => router.push("/profile/edit")}
          >
            编辑
          </Button>
        </div>
      </Card>

      {/* 专业能力与贡献意向 */}
      <Card className="w-full max-w-3xl bg-white shadow-lg rounded-3xl mb-10 px-2 sm:px-6 py-8">
        <CardBody className="px-2 sm:px-6 py-4">
          <div className="text-xl sm:text-2xl  mb-6 sm:mb-8 text-left">
            专业能力与贡献意向
          </div>
          <div className="mb-6 sm:mb-8">
            <div className="text-blue-600  mb-1 sm:mb-2 text-base sm:text-lg text-left">
              我的专业背景介绍
            </div>
            <div className="text-gray-700 text-sm sm:text-base leading-7 text-left">
              {profile?.profile.backgroundDescription ||
                profile?.profile.newSnapshot?.backgroundDescription}
            </div>
          </div>
          <div className="mb-6 sm:mb-8">
            <div className="text-blue-600  mb-1 sm:mb-2 text-base sm:text-lg text-left">
              我干过哪些令人印象深刻的事情
            </div>
            <div className="text-gray-700 text-sm sm:text-base leading-7 text-left">
              {profile?.profile.achievements ||
                profile?.profile.newSnapshot?.achievements}
            </div>
          </div>
          <div>
            <div className="text-blue-600  mb-1 sm:mb-2 text-base sm:text-lg text-left">
              除了家庭心理健康外，我还想或正在解决哪些社会问题
            </div>
            <div className="text-gray-700 text-sm sm:text-base leading-7 text-left">
              {profile?.profile.otherSocialIssues ||
                profile?.profile.newSnapshot?.otherSocialIssues}
            </div>
          </div>
        </CardBody>
      </Card>

      {/* 价值观与期望连接 */}
      <Card className="w-full max-w-3xl bg-white shadow-lg rounded-3xl px-2 sm:px-6 py-8">
        <CardBody className="px-2 sm:px-6 py-4">
          <div className="text-xl sm:text-2xl  mb-6 sm:mb-8 text-left">
            价值观与期望连接
          </div>
          <div className="mb-6 sm:mb-8">
            <div className="text-blue-600  mb-1 sm:mb-2 text-base sm:text-lg text-left">
              为什么选择加入智能向善社会创新网络和亲友AI家庭心理联络
            </div>
            <div className="text-gray-700 text-sm sm:text-base leading-7 text-left">
              {profile?.profile.motivation ||
                profile?.profile.newSnapshot?.motivation}
            </div>
          </div>
          <div className="mb-6 sm:mb-8">
            <div className="text-blue-600  mb-1 sm:mb-2 text-base sm:text-lg text-left">
              我的心愿清单或希望从智能向善网络获得的支持
            </div>
            <div className="text-gray-700 text-sm sm:text-base leading-7 text-left">
              {profile?.profile.expectations ||
                profile?.profile.newSnapshot?.expectations}
            </div>
          </div>
          <div className="mb-6 sm:mb-8">
            <div className="text-blue-600  mb-1 sm:mb-2 text-base sm:text-lg text-left">
              除了专业技能外，我的其他兴趣爱好
            </div>
            <div className="text-gray-700 text-sm sm:text-base leading-7 text-left">
              {profile?.profile.hobbies || profile?.profile.newSnapshot?.hobbies}
            </div>
          </div>
          <div>
            <div className="text-blue-600  mb-1 sm:mb-2 text-base sm:text-lg text-left">
              我的思想和灵感的来源
            </div>
            <div className="text-gray-700 text-sm sm:text-base leading-7 text-left">
              {profile?.profile.inspirations ||
                profile?.profile.newSnapshot?.inspirations}
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
