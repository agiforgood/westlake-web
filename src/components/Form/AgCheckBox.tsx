import { useState } from "react";
import { CheckboxGroup, Checkbox } from "@heroui/react";

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

export default function AgCheckBox({
  name,
  defaultValue,
  onChange,
  isRequired,
}: {
  name: string;
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  isRequired?: boolean;
}) {
  const [selected, setSelected] = useState<string[]>(defaultValue || []);

  const handleChange = (value: string[]) => {
    setSelected(value);
    onChange?.(value);
  };

  return (
    <div className="w-full">
      <div className="text-sm mb-2">
        我能贡献的核心技能 <span className="text-red-500">*</span>
      </div>
      <div className="text-gray-600 text-sm mb-6">
        为了更好地发挥您的专长并确保项目资源的有效配置，请您在以下核心技能清单中，仅勾选您确实具备专业水平并愿意贡献的技能领域
      </div>
      <CheckboxGroup
        value={selected}
        onChange={handleChange}
        name={name}
        defaultValue={defaultValue}
        isRequired={isRequired}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillGroups.map((group) => (
            <div key={group.title}>
              <div className="font-bold text-base mb-2">{group.title}</div>
              <div className="flex flex-col gap-2">
                {group.options.map((option) => (
                  <Checkbox
                    key={option}
                    value={option}
                    className="flex items-center cursor-pointer select-none gap-2"
                  >
                    <span className="text-gray-800 text-sm">{option}</span>
                  </Checkbox>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CheckboxGroup>
    </div>
  );
}
