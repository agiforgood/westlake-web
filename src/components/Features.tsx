import React from "react";

interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({
  icon,
  title,
  description,
}) => (
  <div className="flex items-start space-x-6">
    <div className="flex-shrink-0">
      <div className="w-14 h-14 bg-emerald-500 rounded-lg flex items-center justify-center">
        {icon}
      </div>
    </div>
    <div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  </div>
);

const Features = () => {
  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">特色功能</h2>
                    <p className="text-xl text-gray-600">智能赋能，共创美好</p>
                    <p className="text-lg text-gray-600 mt-2">我们将科技与公益相结合，打造一个充满爱与智慧的志愿者社区</p>
                </div> */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <FeatureItem
            icon={
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            }
            title="内部通讯录"
            description="构建一个可搜索、可筛选的志愿者与专业人士数据库，支持多维度检索，促进志同道合的伙伴之间的联系与合作。"
          />

          <FeatureItem
            icon={
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            }
            title="勋章激励系统"
            description="以游戏化设计为核心，为志愿者提供任务、成长和奖励机制，辅以心理学理论以激发持续参与的动力。"
          />

          <FeatureItem
            icon={
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            }
            title="齐家AI心理教练"
            description="免费、公益、开源的AI家庭心理教练，为每一个需要支持的家庭提供温暖、专业、可及的心理服务。"
          />

          <FeatureItem
            icon={
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            }
            title="社会影响力"
            description="通过志愿者网络的协作，扩大社会公益影响力，让每一份爱心都能产生最大的社会价值。"
          />
        </div>
      </div>
    </div>
  );
};

export default Features;
