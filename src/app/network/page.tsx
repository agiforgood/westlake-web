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
  Select,
  SelectItem,
  CheckboxGroup,
  Checkbox,
  Button,
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
  createdAt?: string;
  coreSkills?: string[];
}

// 技能分组数据，与AgCheckBox中的skillGroups保持一致
const skillGroups = [
  {
    title: "AI相关",
    options: ["提示词工程", "大模型训练", "AI学术研究专家"],
  },
  {
    title: "伦理与安全",
    options: ["AI伦理与治理研究者", "法律/合规专家", "数据安全与隐私专家"],
  },
  {
    title: "产品和设计",
    options: [
      "UI/UX设计",
      "产品经理",
      "VI平面设计/视觉传达",
      "顶尖开发者/全栈工程师",
      "开源技术架构管理",
    ],
  },
  {
    title: "媒体传播",
    options: [
      "纪录片制作",
      "内容创作/写作",
      "市场/传播/品牌",
      "研究/数据分析",
      "算力资源募集",
    ],
  },
  {
    title: "心理和家庭教育",
    options: [
      "心理咨询师",
      "精神科医生",
      "心理学家",
      "家庭教育/青少年发展专家",
      "高认知家长",
    ],
  },
  {
    title: "社区",
    options: [
      "激励机制设计",
      "志愿者关系管理",
      "社群运营",
      "用户增长",
      "游戏策划",
      "开源社区管理",
      "开源文档与知识管理",
    ],
  },
];

// 获取所有技能选项的扁平数组
// const allSkills = skillGroups.flatMap(group => group.options);

export default function NetworkPage() {
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const router = useRouter();
  const { isAuthenticated } = useLogto();
  const [loading, setLoading] = useState(true);

  // Function to handle clearing the search input
  const handleClearSearch = () => {
    setSearchQuery('');
  };

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

  // 筛选和排序逻辑
  const filteredAndSortedProfiles = profiles
    ?.filter((profile) => {
      // 搜索过滤
      if (debouncedQuery) {
        const name = profile.profile.name || '';
        const statusMessage = profile.profile.statusMessage || '';
        const handle = profile.profile.handle || '';
        const query = debouncedQuery.toLowerCase();

        const matchesSearch = name.toLowerCase().includes(query) ||
                            statusMessage.toLowerCase().includes(query) ||
                            handle.toLowerCase().includes(query);

        if (!matchesSearch) return false;
      }

      // 技能过滤
      if (selectedSkills.length > 0) {
        const profileSkills = profile.profile.coreSkills || [];
        const hasAllSkills = selectedSkills.every(selectedSkill =>
          profileSkills.includes(selectedSkill)
        );
        if (!hasAllSkills) return false;
      }

      return true;
    })
    ?.sort((a, b) => {
      // 按照创建时间排序
      const timeA = new Date(a.profile.createdAt || '').getTime();

      const timeB = new Date(b.profile.createdAt || '').getTime();

      if (sortOrder === 'newest') {
        return timeB - timeA; // 最新的在前
      } else {
        return timeA - timeB; // 最早的在前
      }
    }) || [];

  const hasResults = filteredAndSortedProfiles.filter(profile => profile.profile.name !== '').length > 0;

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
          <div className="flex flex-col gap-4 w-full">
            <h2 className="text-2xl font-bold">志愿者网络</h2>

            {/* 搜索框 */}
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
                  placeholder="搜索昵称、ID或自我介绍..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10"
                  isClearable
                  onClear={handleClearSearch}
                />
              </div>
            </div>

            {/* 排序和筛选控件 */}
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              {/* 排序选择器 */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">排序：</span>
                <Select
                  selectedKeys={[sortOrder]}
                  onSelectionChange={(keys) => {
                    const key = Array.from(keys)[0] as string;
                    setSortOrder(key as 'newest' | 'oldest');
                  }}
                  className="w-48"
                  size="sm"
                >
                  <SelectItem key="newest">最近加入</SelectItem>
                  <SelectItem key="oldest">最早加入</SelectItem>
                </Select>
              </div>

              {/* 筛选按钮 */}
              <Button
                variant="bordered"
                size="sm"
                onPress={() => setShowFilters(!showFilters)}
                className="self-start"
              >
                技能筛选 {selectedSkills.length > 0 && `(${selectedSkills.length})`}
              </Button>

              {/* 清除筛选 */}
              {selectedSkills.length > 0 && (
                <Button
                  variant="light"
                  size="sm"
                  onPress={() => setSelectedSkills([])}
                  className="self-start text-gray-500"
                >
                  清除筛选
                </Button>
              )}
            </div>

            {/* 技能筛选面板 */}
            {showFilters && (
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <div className="mb-3">
                  <span className="text-sm font-medium">选择技能：</span>
                </div>
                <CheckboxGroup
                  value={selectedSkills}
                  onChange={setSelectedSkills}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skillGroups.map((group) => (
                      <div key={group.title}>
                        <div className="font-semibold text-sm mb-2 text-gray-700">{group.title}</div>
                        <div className="flex flex-col gap-1">
                          {group.options.map((option) => (
                            <Checkbox
                              key={option}
                              value={option}
                              size="sm"
                            >
                              <span className="text-xs">{option}</span>
                            </Checkbox>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CheckboxGroup>
              </div>
            )}

            {/* 结果统计 */}
            {(debouncedQuery || selectedSkills.length > 0) && (
              <div className="text-sm text-gray-500 mb-2">
                找到 {filteredAndSortedProfiles.filter(profile => profile.profile.name !== '').length} 个匹配结果
                {selectedSkills.length > 0 && ` (已选择 ${selectedSkills.length} 个技能筛选条件)`}
              </div>
            )}

            {/* 志愿者卡片网格 - 始终渲染同一个容器 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {/* 无结果提示 */}
              {(debouncedQuery || selectedSkills.length > 0) && !hasResults && (
                <div className="col-span-full text-center py-8">
                  <div className="text-gray-500">未找到匹配结果</div>
                </div>
              )}

              {/* 志愿者卡片 */}
              {((!debouncedQuery && selectedSkills.length === 0) || hasResults) &&
                filteredAndSortedProfiles &&
                filteredAndSortedProfiles
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
                          </div>
                        </div>
                      </CardHeader>
                      <CardBody>
                        <div className="text-gray-500 text-sm text-left line-clamp-3">
                          {profile.profile.statusMessage || '暂无自我介绍...'}
                        </div>
                      </CardBody>
                    </Card>
                  ))
              }
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
