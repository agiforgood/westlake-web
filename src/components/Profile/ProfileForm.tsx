/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Form, Button, addToast, Spinner } from "@heroui/react";
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
  popoverContent?: string;
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
      { label: "仅显示省份", value: "1" },
      { label: "显示省份和城市", value: "2" },
      { label: "显示省份、城市和区县", value: "3" },
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
    placeholder: "50字以内",
    popoverContent:
      "示例:AI伦理研究者，致力于将人工智能与家庭心理学结合，创造有温度的技术，让每个家庭都能获得高质量的心理健康支持。专业能力与贡献意向",
  },
  {
    label: "我的专业背景介绍",
    name: "backgroundDescription",
    type: "textarea",
    popoverContent:
      "示例： 心理学博士，专注于家庭系统治疗与儿童发展心理学研究10年。曾在北京师范大学心理学院任教5年，目前在科技企业担任AI伦理顾问，负责大模型在心理健康领域应用的伦理审查与指导。熟悉提示词工程与心理咨询流程设计。",
  },
  {
    label: "我干过哪些令人印象深刻的事情",
    name: "achievements",
    type: "textarea",
    popoverContent:
      '参与设计了国内首个针对青少年心理健康的AI辅助干预系统，该系统已在15所中学试点，帮助识别超过200例早期抑郁风险；主导开发"亲子对话助手"，通过分析亲子对话模式，为父母提供个性化沟通建议，获得2023年社会创新奖；发表《人工智能在家庭治疗中的应用与伦理》等学术论文5篇。',
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
    popoverContent:
      "示例：正在探索AI技术在特殊教育领域的应用，为自闭症儿童开发个性化互动学习助手；关注数字鸿沟问题，参与老年人数字素养提升计划；志愿服务于偏远地区教师心理支持项目，希望通过技术降低优质心理健康资源获取的门槛。",
  },
  {
    label: "我为什么选择加入智能向善社会创新网络和齐家AI家庭心理教练",
    name: "motivation",
    type: "textarea",
    isRequired: true,
    popoverContent:
      "示例：我相信技术与人文的结合能创造真正的社会价值。齐家项目将AI与家庭心理学完美融合，既有技术创新性，又有明确的社会意义。我希望与志同道合者一起，探索AI向善的边界，并将理论研究落地为能帮助普通家庭的实用工具。",
  },
  {
    label: "我的心愿清单或希望从智能向善网络获得的支持",
    name: "expectations",
    type: "textarea",
    popoverContent:
      "示例：希望找到技术与心理学的跨领域合作伙伴，共同设计有深度的AI应用；期待在实践中验证理论假设，获得研究灵感；渴望与同样关注科技伦理的同道者交流，共同探索技术向善的可能性；也期待通过这个平台，让自己的专业能力创造更大的社会价值。",
  },
  {
    label: "除了专业技能外，我的其他兴趣爱好",
    name: "hobbies",
    type: "textarea",
    popoverContent:
      "示例：热爱户外徒步和摄影，每年至少一次长线徒步；钢琴爱好者，喜欢即兴演奏；收集世界各地的绘本和儿童文学作品；业余时间学习木工，希望能亲手为孩子制作一些玩具和家具。",
  },
  {
    label: "我的思想和灵感的来源",
    name: "inspirations",
    type: "textarea",
    popoverContent:
      '示例：维果茨基的社会文化发展理论深刻影响了我的研究方向；《未来简史》让我重新思考技术与人类发展的关系；TED演讲人布琳·布朗关于脆弱性的研究启发我关注心理健康；参与"一千零一夜"亲子共读项目的经历，让我看到了家庭教育的无限可能。',
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
  popoverContent,
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
          placeholder={placeholder}
          isRequired={isRequired}
          defaultValue={defaultValue?.toString()}
          popoverContent={popoverContent}
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
        const coreSkills =
          (data.profile as any).coreSkills ||
          (data.profile as any).newSnapshot?.coreSkills ||
          [];
        setCoreSkills(coreSkills);
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
    <Form className="w-full space-y-10" onSubmit={handleSubmitProfile}>
      {profileFormData.map((item) => (
        <div className="w-full" key={item.name} id={item.name}>
          <ProfileFormComponent
            key={item.name}
            {...item}
            onChange={handleCoreSkillsChange}
          />
        </div>
      ))}
      <div id="weekDay">{profile && <AgWeekCheckBox profile={profile} />}</div>
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
