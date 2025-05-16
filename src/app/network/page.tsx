"use client";

import Footer from "@/components/Footer";
import { getAllProfiles } from "@/lib/userProfileApi";
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Image,
  Spinner,
} from "@heroui/react";
import { useEffect, useState } from "react";
import Avatar from "boring-avatars";
import { useRouter } from "next/navigation";
import { useLogto } from "@logto/react";

import AgAvatar from "@/components/Form/AgAvatar";

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
  const { isAuthenticated } = useLogto();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      const token = localStorage.getItem("accessToken") ?? "";
      getAllProfiles(token).then((data) => {
        console.log(data);
        setProfiles(data.profiles);
        setLoading(false);
      });
    }
  }, [isAuthenticated]);

  if (loading)
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow text-center mt-10">
          <Spinner label="加载中..." />
        </div>
      </div>
    );
  if (!profiles) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow text-center mt-10">
          暂时无法访问，请等待用户认证完成
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow flex py-12 px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">志愿者网络</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {profiles &&
                profiles
                  .filter((profile) => profile.profile.name !== "")
                  .map((profile) => (
                    <Card
                      className="p-2"
                      key={profile.profile.userId}
                      onPress={() =>
                        router.push(`/profile/${profile.profile.userId}`)
                      }
                      isPressable
                    >
                      <CardHeader>
                        <div className="flex flex-row gap-4 items-center">
                          <AgAvatar profile={profile} />
                          <div className="flex flex-col gap-2 items-start justify-start">
                            <div className="text-2xl font-bold flex items-center gap-2">
                              <span className="line-clamp-1">
                                {profile.profile.name}
                              </span>
                              <span className="text-gray-500 text-sm">
                                {profile.profile.gender === 1 && (
                                  <Image
                                    width={16}
                                    height={16}
                                    src="/male.svg"
                                    alt="male"
                                  />
                                )}
                                {profile.profile.gender === 2 && (
                                  <Image
                                    width={16}
                                    height={16}
                                    src="/female.svg"
                                    alt="female"
                                  />
                                )}
                              </span>
                            </div>
                            <div className="text-gray-300 text-sm break-all">
                              ID: {profile.profile.handle}
                            </div>
                            {/* <div className="text-gray-400 text-sm text-left line-clamp-3">
                              {profile.profile.statusMessage}
                            </div> */}
                          </div>
                        </div>
                      </CardHeader>
                      <CardBody>
                        {/* <div className="text-gray-400 text-base">
                          {profile.profile.expertiseSummary}
                        </div>
                        <Divider />
                        <div className="flex flex-col gap-4 p-4">
                          <div className="flex flex-wrap gap-2">
                            {profile.tags.length > 0
                              ? profile.tags.map((tag) => (
                                  <div
                                    key={tag.id}
                                    className="bg-gray-100 px-2 py-1 rounded-full text-sm"
                                  >
                                    {tag.content}
                                  </div>
                                ))
                              : null}
                          </div>
                        </div> */}
                        <div className="text-gray-500 text-sm text-left line-clamp-3">
                          {profile.profile.statusMessage || "暂无自我介绍..."}
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
