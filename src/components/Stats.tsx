import React from 'react';

interface StatItemProps {
    icon: React.ReactNode;
    number: string;
    label: string;
    color: string;
}

const StatItem: React.FC<StatItemProps> = ({ icon, number, label, color }) => (
    <div className="flex flex-col items-center">
        <div className={`w-16 h-16 ${color} rounded-lg flex items-center justify-center mb-4`}>
            {icon}
        </div>
        <div className="text-4xl font-bold mb-2">{number}</div>
        <div className="text-gray-600">{label}</div>
    </div>
);

const Stats = () => {
    return (
        <div className="py-20">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-4">智能向善平台数据</h2>
                <p className="text-xl text-gray-600">汇聚AI人才，共创美好未来</p>
            </div>

            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <StatItem
                        icon={
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        }
                        number="1,000"
                        label="AI用户总数"
                        color="bg-blue-500"
                    />

                    <StatItem
                        icon={
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        }
                        number="500"
                        label="专业志愿者"
                        color="bg-green-500"
                    />

                    <StatItem
                        icon={
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                        }
                        number="200"
                        label="GitHub提交次数"
                        color="bg-purple-500"
                    />

                    <StatItem
                        icon={
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        }
                        number="1,300小时"
                        label="专业咨询时长"
                        color="bg-red-500"
                    />
                </div>
            </div>
        </div>
    );
};

export default Stats; 