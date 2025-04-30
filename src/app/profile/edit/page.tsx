'use client'
import { useEffect, useState } from 'react';
import { addTag, deleteMyAvailability, deleteTag, getAllTags, getMyProfile, updateMyAvailability, updateMyProfile } from '@/lib/userProfileApi';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { authClient } from '@/lib/authClient';
const { useSession } = authClient
import { Spinner, Card, CardHeader, CardBody, Divider, Button, Form, Input, Textarea, Select, SelectItem, addToast, Checkbox, RadioGroup, Radio } from '@heroui/react';
import { nanoid } from 'nanoid';
import pca from '@/lib/pca.json';

interface UserProfile {
    profile: Profile;
    tags: UserTag[];
    availability: UserAvailability[];
}

interface Profile {
    userId: string;
    handle: string;
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

interface Tag {
    id: string;
    content: string;
    category: string;
}

export default function ProfileEditPage() {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [handle, setHandle] = useState('');
    const [province, setProvince] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [tags, setTags] = useState<Tag[]>([]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [provinceList, setProvinceList] = useState<{ key: string, label: string }[]>(pca.map(object => ({ key: object.name, label: object.name })));
    const [cityList, setCityList] = useState<{ key: string, label: string }[]>([]);
    const [districtList, setDistrictList] = useState<{ key: string, label: string }[]>([]);
    const router = useRouter();
    const {
        data: session,
    } = useSession()

    useEffect(() => {
        getMyProfile().then(data => {
            setProfile(data);
            setLoading(false);
            setHandle(data.profile.handle);
        });
    }, []);

    useEffect(() => {
        getAllTags().then(data => {
            setTags(data.tags);
        });
    }, []);

    const getWeekdayText = (weekday: number) => {
        return ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][weekday];
    }

    const getTimeSlotText = (timeSlot: number) => {
        return ['上午', '下午', '晚上'][timeSlot];
    }

    const handleProvinceChange = (province: string | undefined) => {
        if (!province) return;
        const provinceObj = pca.find(object => object.name == province)
        if (!provinceObj) return;
        setCityList(provinceObj.children.map(object => ({ key: object.name, label: object.name })));
        setProvince(province);
    }

    const handleCityChange = (city: string | undefined) => {
        if (!city) return;
        if (province) {
            const provinceObj = pca.find(object => object.name == province)
            if (!provinceObj) return;
            const cityObj = provinceObj.children.find(object => object.name == city)
            if (!cityObj) return;
            setDistrictList(cityObj.children.map(object => ({ key: object.name, label: object.name })));
            setCity(city);
        }
    }

    const handleAvailabilityChange = async (weekday: number, timeSlot: number, isSelected: boolean) => {
        if (isSelected) {
            const response = await updateMyAvailability({
                timeSlots: [
                    {
                        weekDay: weekday,
                        timeSlot: timeSlot,
                    }
                ]
            })
            if (response) {
                addToast({
                    title: '保存成功',
                    description: '可参与时间已更新',
                    color: 'success',
                })
            } else {
                addToast({
                    title: '保存失败',
                    description: response.message,
                    color: 'danger',
                })
            }
        } else {
            const response = await deleteMyAvailability(weekday, timeSlot)
            if (response) {
                addToast({
                    title: '保存成功',
                    description: '可参与时间已更新',
                    color: 'success',
                })
            } else {
                addToast({
                    title: '保存失败',
                    description: response.message,
                    color: 'danger',
                })
            }
        }
    }

    const handleTagChange = async (tagId: string, isSelected: boolean) => {
        if (isSelected) {
            const response = await addTag(tagId)
            if (response) {
                addToast({
                    title: '保存成功',
                    description: '标签已更新',
                    color: 'success',
                })
            } else {
                addToast({
                    title: '保存失败',
                    description: response.message,
                    color: 'danger',
                })
            }
        } else {
            const response = await deleteTag(tagId)
            if (response) {
                addToast({
                    title: '保存成功',
                    description: '标签已更新',
                    color: 'success',
                })
            } else {
                addToast({
                    title: '保存失败',
                    description: response.message,
                    color: 'danger',
                })
            }
        }
    }

    const handleSubmitProfile = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = Object.fromEntries(new FormData(e.currentTarget));

        const snapshot = {
            handle: handle,
            gender: parseInt(data.gender as string),
            avatarUrl: profile?.profile.avatarUrl,
            bannerUrl: profile?.profile.bannerUrl,
            statusMessage: data.statusMessage,
            expertiseSummary: data.expertiseSummary,
            bio: data.bio,
            backgroundDescription: data.backgroundDescription,
            motivation: data.motivation,
            expectations: data.expectations,
            canOffer: data.canOffer,
            wechat: data.wechat,
            locationVisibility: parseInt(data.locationVisibility as string),
            province: province,
            city: city,
            district: district,
        }

        const response = await updateMyProfile({ snapshot })
        if (response) {
            addToast({
                title: '保存成功',
                description: '等待审核后生效',
                color: 'warning',
            })
            router.push('/profile');
        } else {
            addToast({
                title: '保存失败',
                description: response.message,
                color: 'danger',
            })
        }
    }

    if (loading) return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow text-center mt-10">
                <Spinner label="加载中..." />
            </div>
            <Footer />
        </div>
    );
    if (!profile) return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow text-center mt-10">未找到用户信息</div>
            <Footer />
        </div>
    );

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow py-12">
                <Card className="max-w-3xl mx-auto">
                    <CardHeader>
                        <h2 className="text-2xl font-bold p-4">编辑个人信息</h2>
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        <div className="p-4">
                            <Form onSubmit={handleSubmitProfile}>
                                <Input
                                    isDisabled
                                    label="姓名"
                                    labelPlacement="inside"
                                    name="name"
                                    value={session?.user.name}
                                    type="text"
                                />
                                <RadioGroup label="性别" orientation="horizontal" name="gender" defaultValue={profile.profile.gender.toString()}>
                                    <Radio value="0">保密</Radio>
                                    <Radio value="1">男</Radio>
                                    <Radio value="2">女</Radio>
                                </RadioGroup>
                                <div className="grid grid-cols-4 w-full gap-4 items-baseline">
                                    <Input
                                        className="col-span-3"
                                        isClearable
                                        label="唯一ID"
                                        labelPlacement="inside"
                                        name="handle"
                                        defaultValue={profile.profile.handle}
                                        value={handle}
                                        type="text"
                                        onClear={() => {
                                            setHandle(profile.profile.handle)
                                        }}
                                        onValueChange={setHandle}
                                    />
                                    <Button className="col-span-1" onPress={() => {
                                        setHandle(nanoid(10))
                                    }}>随机生成</Button>
                                </div>
                                <Input
                                    label="状态消息"
                                    labelPlacement="inside"
                                    name="statusMessage"
                                    defaultValue={profile.profile.statusMessage}
                                    type="text"
                                />
                                <Textarea
                                    label="个人简介"
                                    labelPlacement="inside"
                                    name="bio"
                                    defaultValue={profile.profile.bio}
                                    type="text"
                                />
                                <Textarea
                                    label="背景介绍"
                                    labelPlacement="inside"
                                    name="backgroundDescription"
                                    defaultValue={profile.profile.backgroundDescription}
                                />
                                <Textarea
                                    label="专业一句话介绍"
                                    labelPlacement="inside"
                                    name="expertiseSummary"
                                    defaultValue={profile.profile.expertiseSummary}
                                />
                                <Textarea
                                    label="加入原因"
                                    labelPlacement="inside"
                                    name="motivation"
                                    defaultValue={profile.profile.motivation}
                                    type="text"
                                />
                                <Textarea
                                    label="想要获得的帮助"
                                    labelPlacement="inside"
                                    name="expectations"
                                    defaultValue={profile.profile.expectations}
                                    type="text"
                                />
                                <Textarea
                                    label="可以提供的资源"
                                    labelPlacement="inside"
                                    name="canOffer"
                                    defaultValue={profile.profile.canOffer}
                                    type="text"
                                />
                                <Divider />
                                <h2 className="text-lg font-bold">联系方式</h2>
                                <Input
                                    label="微信"
                                    labelPlacement="inside"
                                    name="wechat"
                                    defaultValue={profile.profile.wechat}
                                    type="text"
                                />
                                <h3 className="text-md font-bold">地址显示精度</h3>
                                <RadioGroup label="地址显示精度" name="locationVisibility" defaultValue={profile.profile.locationVisibility?.toString()}>
                                    <Radio value="0">仅显示省份</Radio>
                                    <Radio value="1">显示省份和城市</Radio>
                                    <Radio value="2">显示省份、城市和区县</Radio>
                                </RadioGroup>
                                <h3 className="text-md font-bold">当前地址</h3>
                                <p>{profile.profile.province} {profile.profile.city} {profile.profile.district}</p>

                                <div className="grid grid-cols-3 w-full gap-4">
                                    <Select
                                        className="col-span-1"
                                        label="省份"
                                        items={provinceList}
                                        labelPlacement="inside"
                                        name="province"
                                        onSelectionChange={(e) => {
                                            const province = e.currentKey;
                                            handleProvinceChange(province);
                                        }}
                                    >
                                        {(province) => <SelectItem>{province.label}</SelectItem>}
                                    </Select>
                                    <Select
                                        className="col-span-1"
                                        label="城市"
                                        items={cityList}
                                        labelPlacement="inside"
                                        name="city"
                                        onSelectionChange={(e) => {
                                            const city = e.currentKey;
                                            handleCityChange(city);
                                        }}
                                    >
                                        {(city) => <SelectItem>{city.label}</SelectItem>}
                                    </Select>
                                    <Select
                                        className="col-span-1"
                                        label="区县"
                                        items={districtList}
                                        labelPlacement="inside"
                                        name="district"
                                        onSelectionChange={(e) => {
                                            const district = e.currentKey;
                                            if (district) {
                                                setDistrict(district);
                                            }
                                        }}
                                    >
                                        {(district) => <SelectItem>{district.label}</SelectItem>}
                                    </Select>
                                </div>
                                <Button type="submit">保存上述所有信息</Button>
                                <Divider />
                                <h2 className="text-lg font-bold">可参与时间</h2>
                                <div className="grid grid-cols-2 w-full gap-4">
                                    {Array.from({ length: 7 }, (_, i) => (
                                        <div key={i} className="flex flex-row gap-6">
                                            <p>{getWeekdayText(i)}</p>
                                            <div className="flex flex-row gap-2">
                                                {Array.from({ length: 3 }, (_, j) => (
                                                    <Checkbox
                                                        key={j}
                                                        defaultSelected={
                                                            profile.availability.some(availability => availability.weekDay === i && availability.timeSlot === j)
                                                        }
                                                        onValueChange={(isSelected) => {
                                                            handleAvailabilityChange(i, j, isSelected);
                                                        }}
                                                    >{getTimeSlotText(j)}</Checkbox>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Divider />
                                <h2 className="text-lg font-bold">标签</h2>
                                <div className="grid grid-cols-6 w-full gap-4">
                                    {tags.map((tag) => (
                                        <Checkbox key={tag.id}
                                            defaultSelected={
                                                profile.tags.some(t => t.id === tag.id)
                                            }
                                            onValueChange={(isSelected) => {
                                                handleTagChange(tag.id, isSelected);
                                            }}
                                        >
                                            {tag.content}, {tag.category}
                                        </Checkbox>
                                    ))}
                                </div>
                            </Form>
                        </div>
                    </CardBody>
                </Card>
            </div>
            <Footer />
        </div>
    );
}
