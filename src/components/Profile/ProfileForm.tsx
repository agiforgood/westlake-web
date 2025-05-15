/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Form, Button, addToast } from "@heroui/react";
import AgInput from "@/components/Form/AgInput";
import AgRadio from "@/components/Form/AgRadio";
import AgTextarea from "@/components/Form/AgTextarea";
import AgAddressSelect from "@/components/Form/AgAddressSelect";
import AgCheckBox from "@/components/Form/AgCheckBox";
import AgWeekCheckBox from "@/components/Form/AgWeekCheckBox";
import { useRouter } from "next/navigation";
import { useLogto } from "@logto/react";

import {
  addTag,
  deleteMyAvailability,
  deleteTag,
  getAllTags,
  getMyProfile,
  updateMyAvailability,
  updateMyProfile,
} from "@/lib/userProfileApi";

import { UserProfile } from "@/type";

type FormItem = {
  label: string;
  name: string;
  type: "text" | "radio" | "textarea" | "address" | "checkbox";
  placeholder?: string;
  isRequired?: boolean;
  options?: Array<{ label: string; value: string }>;
  defaultValue?: string | string[];
  disabled?: boolean;
};

const profileForm: FormItem[] = [
  {
    label: "姓名/昵称/希望被称呼的名字",
    name: "name",
    type: "text",
    isRequired: true,
  },
  {
    label: "性别",
    name: "gender",
    type: "radio",
    options: [
      { label: "男", value: "1" },
      { label: "女", value: "2" },
      { label: "保密", value: "0" },
    ],
    isRequired: true,
  },
  {
    label: "唯一ID",
    name: "handle",
    type: "text",
    isRequired: true,
    disabled: true,
  },
  {
    label: "状态信息",
    name: "statusMessage",
    type: "text",
    isRequired: true,
  },
  {
    label: "联系方式",
    name: "wechat",
    type: "text",
    isRequired: true,
  },
  {
    label: "地址显示精度",
    name: "locationVisibility",
    type: "radio",
    options: [
      { label: "仅显示省份", value: "0" },
      { label: "显示省份和城市", value: "1" },
      { label: "显示省份、城市和区县", value: "2" },
    ],
    isRequired: true,
  },
  {
    label: "当前地址",
    name: "address",
    type: "address",
  },
  {
    label: "一句话介绍自己",
    name: "bio",
    type: "textarea",
    isRequired: true,
  },
  {
    label: "我的专业背景介绍",
    name: "backgroundDescription",
    type: "textarea",
  },
  {
    label: "我干过哪些令人印象深刻的事情",
    name: "achievements",
    type: "textarea",
  },
  {
    label: "coreSkills",
    name: "coreSkills",
    type: "checkbox",
  },
  {
    label: "除了家庭心理健康外，我还想或正在解决哪些社会问题",
    name: "otherSocialIssues",
    type: "textarea",
  },
  {
    label: "我为什么选择加入智能向善社会创新网络和齐家AI家庭心理教练",
    name: "motivation",
    type: "textarea",
    isRequired: true,
  },
  {
    label: "我的心愿清单或希望从智能向善网络获得的支持",
    name: "expectations",
    type: "textarea",
  },
  {
    label: "除了专业技能外，我的其他兴趣爱好",
    name: "hobbies",
    type: "textarea",
  },
  {
    label: "我的思想和灵感的来源",
    name: "inspirations",
    type: "textarea",
  },
];

const ProfileFormComponent = ({
  type,
  label,
  name,
  options,
  placeholder,
  isRequired,
  defaultValue,
  disabled,
  onChange,
}: FormItem & { onChange?: (value: string[]) => void }) => {
  switch (type) {
    case "text":
      return (
        <AgInput
          label={label}
          name={name}
          type={type}
          placeholder={placeholder}
          isRequired={isRequired}
          defaultValue={defaultValue?.toString()}
          disabled={disabled}
        />
      );
    case "radio":
      return options ? (
        <AgRadio
          label={label}
          name={name}
          options={options}
          defaultValue={defaultValue?.toString()}
        />
      ) : null;
    case "address":
      return <AgAddressSelect defaultValue={defaultValue as string[]} />;
    case "textarea":
      return (
        <AgTextarea
          label={label}
          name={name}
          isRequired={isRequired}
          defaultValue={defaultValue?.toString()}
        />
      );
    case "checkbox":
      return (
        <AgCheckBox
          name={name}
          defaultValue={defaultValue as string[]}
          onChange={onChange}
        />
      );
    default:
      return null;
  }
};

export default function ProfileForm() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [handle, setHandle] = useState("");
  const [coreSkills, setCoreSkills] = useState<string[]>([]);
  const [profileFormData, setProfileFormData] = useState<FormItem[]>([]);
  const router = useRouter();
  const { isAuthenticated } = useLogto();
  const [token, setToken] = useState("");

  const updateProfileFormData = (data: UserProfile) => {
    const updatedForm = profileForm.map((item) => {
      const newItem = { ...item };
      if (
        (data.profile as any)[item.name] ||
        ((data.profile as any).newSnapshot &&
          (data.profile as any).newSnapshot[item.name])
      ) {
        newItem.defaultValue =
          (data.profile as any)[item.name] ||
          ((data.profile as any).newSnapshot &&
            (data.profile as any).newSnapshot[item.name]);
      }
      if (item.name == "address") {
        newItem.defaultValue = [
          (data.profile as any).province ||
            (data.profile as any).newSnapshot?.province,
          (data.profile as any).city || (data.profile as any).newSnapshot?.city,
          (data.profile as any).district ||
            (data.profile as any).newSnapshot?.district,
        ];
      }
      if (item.name == "coreSkills") {
        setCoreSkills((data.profile as any).newSnapshot?.coreSkills ?? []);
      }
      return newItem;
    });

    setProfileFormData(updatedForm);
  };

  const handleCoreSkillsChange = (value: string[]) => {
    setCoreSkills(value);
  };

  useEffect(() => {
    if (isAuthenticated) {
      const accessToken = localStorage.getItem("accessToken") ?? "";
      setToken(accessToken);
      getMyProfile(accessToken).then((data) => {
        setProfile(data);
        setLoading(false);
        setHandle(data.profile.handle);
        updateProfileFormData(data);
      });
    }
  }, [isAuthenticated, router]);

  const handleSubmitProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));
    console.log(data);
    console.log(coreSkills);
    const snapshot = {
      handle: handle,
      gender: parseInt(data.gender as string),
      name: data.name,
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
      province: data.province,
      city: data.city,
      district: data.district,
      achievements: data.achievements,
      otherSocialIssues: data.otherSocialIssues,
      hobbies: data.hobbies,
      inspirations: data.inspirations,
      coreSkills: coreSkills,
    };
    const response = await updateMyProfile({ snapshot }, token);
    if (response) {
      addToast({
        title: "保存成功",
        description: "等待审核后生效",
        color: "warning",
      });
      router.push("/profile");
    } else {
      addToast({
        title: "保存失败",
        description: response.message,
        color: "danger",
      });
    }
  };

  return (
    <Form className="w-full space-y-10" onSubmit={handleSubmitProfile}>
      {profileFormData.map((item) => (
        <ProfileFormComponent
          key={item.name}
          {...item}
          onChange={handleCoreSkillsChange}
        />
      ))}
      {profile && <AgWeekCheckBox profile={profile} />}
      <div className="w-full flex items-center justify-center">
        <Button
          className="w-12"
          color="primary"
          type="submit"
          size="md"
          radius="full"
          variant="bordered"
        >
          确认
        </Button>
      </div>
    </Form>
  );
}
