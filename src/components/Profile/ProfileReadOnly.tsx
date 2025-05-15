/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Form, Button, addToast, Image } from "@heroui/react";

import AgAvatar from "@/components/Form/AgAvatar";

import { UserProfile } from "@/type";
import { useRouter } from "next/navigation";
type FormItem = {
  label: string;
  name: string;
  type: "text" | "radio" | "textarea" | "address" | "checkbox";
  placeholder?: string;
  isRequired?: boolean;
  options?: Array<{ label: string; value: string }>;
  defaultValue?: string | string[];
  disabled?: boolean;
  description?: string;
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
    label: "我能贡献的核心技能",
    name: "coreSkills",
    type: "checkbox",
    description:
      "为了更好地发挥您的专长并确保项目资源的有效配置，请您在以下核心技能清单中，仅勾选您确实具备专业水平并愿意贡献的技能领域）",
    isRequired: true,
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

const ProfileReadOnlyComponent = ({ item }: { item: FormItem }) => {
  let value = "未填写";
  if (item.type === "text") {
    value = item.defaultValue as string;
  } else if (item.type === "textarea") {
    value = item.defaultValue as string;
  } else if (item.type === "radio") {
    value =
      item.options?.find(
        (option) => option.value === item.defaultValue?.toString()
      )?.label ?? "未填写";
  } else if (item.type === "checkbox") {
    value = item.defaultValue?.toString().split(",").join(", ") as string;
  } else if (item.type === "address") {
    value = item.defaultValue?.toString().split(",").join(" ") as string;
  }

  return (
    <div id={item.name} className="space-y-2">
      <div className="text-sm text-[#333]">
        <span>{item.label}</span>
        {item.isRequired && <span className="text-red-500 ml-2">*</span>}
      </div>
      <div className="text-xs text-[#333]">{item.description}</div>
      <div className="text-xs text-[#666]">{value || "未填写"}</div>
    </div>
  );
};

export default function ProfileReadOnly({
  profile,
  isOther = false,
}: {
  profile: UserProfile | null;
  isOther?: boolean;
}) {
  console.log(profile);
  const router = useRouter();
  const [profileFormData, setProfileFormData] = useState<FormItem[]>([]);

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

      return newItem;
    });

    setProfileFormData(updatedForm);
  };

  useEffect(() => {
    if (profile) {
      updateProfileFormData(profile);
    }
  }, [profile]);

  const getWeekdayText = (weekday: number) => {
    return ["周日", "周一", "周二", "周三", "周四", "周五", "周六"][weekday];
  };

  const getTimeSlotText = (timeSlot: number) => {
    return ["上午", "下午", "晚上"][timeSlot];
  };

  return (
    <div className="w-full space-y-8">
      <div className="flex items-center justify-between gap-2">
        <AgAvatar profile={profile} />
        {isOther && (
          <Button
            variant="bordered"
            radius="full"
            onPress={() => {
              if (profile?.profile.userId) {
                router.push(`/chat/?userId=${profile.profile.userId}`);
              } else {
                router.push(`/chat`);
              }
            }}
          >
            私信
          </Button>
        )}
      </div>
      {profileFormData.map((item) => {
        if (isOther && item.name === "wechat") {
          return null;
        }
        return <ProfileReadOnlyComponent key={item.name} item={item} />;
      })}

      <div id="weekDay" className="space-y-2">
        <div className="text-sm text-[#333]">
          <span>可参与时间</span>
        </div>
        <div className="text-xs text-[#666]">
          {Array.from({ length: 7 }, (_, i) => (
            <div key={i} className="flex flex-row gap-6">
              <p>{getWeekdayText(i)}</p>
              <div className="flex flex-row gap-2">
                {Array.from({ length: 3 }, (_, j) => (
                  <span key={j}>{getTimeSlotText(j)}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
