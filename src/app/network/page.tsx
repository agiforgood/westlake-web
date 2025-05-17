'use client';

import Footer from '@/components/Footer';
import { getAllProfiles } from '@/lib/userProfileApi';
import {
  Card,
  CardBody,
  CardHeader,
  Image,
  Spinner,
  Input,
} from '@heroui/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLogto } from '@logto/react';

import AgAvatar from '@/components/Form/AgAvatar';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const router = useRouter();
  const { isAuthenticated } = useLogto();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      const token = localStorage.getItem('accessToken') ?? '';
      getAllProfiles(token).then((data) => {
        console.log(data);
        setProfiles(data.profiles);
        setLoading(false);
      });
    }
  }, [isAuthenticated]);

  // Debounce search query to avoid excessive filtering
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const filteredProfiles = profiles.filter((profile) => {
    if (!debouncedQuery) return true;

    const name = profile.profile.name || '';
    const statusMessage = profile.profile.statusMessage || '';
    const query = debouncedQuery.toLowerCase();

    return (
      name.toLowerCase().includes(query) ||
      statusMessage.toLowerCase().includes(query)
    );
  });

  const hasResults =
    filteredProfiles.filter((profile) => profile.profile.name !== '').length >
    0;

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
            <div className="mb-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <Input
                  type="text"
                  placeholder="搜索昵称或自我介绍..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10"
                  isClearable
                />
              </div>
            </div>

            {debouncedQuery && (
              <div className="text-sm text-gray-500 mb-2">
                找到{' '}
                {
                  filteredProfiles.filter(
                    (profile) => profile.profile.name !== ''
                  ).length
                }{' '}
                个匹配结果
              </div>
            )}

            {debouncedQuery && !hasResults && (
              <div className="text-center py-8">
                <div className="text-gray-500">未找到匹配结果</div>
              </div>
            )}

            {(!debouncedQuery || hasResults) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredProfiles &&
                  filteredProfiles
                    .filter((profile) => profile.profile.name !== '')
                    .map((profile) => (
                      <Card
                        className="p-2"
                        key={profile.profile.userId}
                        onPress={() => {
                          router.push(`/profile/${profile.profile.userId}`);
                          window.scrollTo(0, 0);
                        }}
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
                            {profile.profile.statusMessage || '暂无自我介绍...'}
                          </div>
                        </CardBody>
                      </Card>
                    ))}
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
