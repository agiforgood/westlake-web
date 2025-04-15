import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300">
            {/* Contact Section */}
            <div className="container mx-auto px-4 pt-20 pb-12">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-white mb-12 text-center">联系方式</h2>
                    <div className="flex flex-col md:flex-row gap-8 mb-16 justify-center">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <span className="text-lg">浙江省杭州市西湖区</span>
                        </div>
                        {/* <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <a href="mailto:contact@aiforgood.org" className="text-lg hover:text-white transition-colors">
                                contact@agiforgood.
                            </a>
                        </div> */}
                    </div>
                </div>

                {/* Footer Content */}
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 mb-12 pt-12 border-t border-gray-800">
                    <div>
                        <p className="text-lg font-semibold mb-4">西湖智能向善社会创新网络，为志愿者创造有意义的链接，帮助他们取得专业成功。</p>
                    </div>
                    <div>
                        <h3 className="font-bold mb-4">办公地址</h3>
                        <p className="text-lg mb-4">杭州市西湖区西溪首座5号楼3层 326 室</p>
                    </div>
                </div>

                {/* Copyright */}
                <div className="text-center pt-8 border-t border-gray-800">
                    <p className="text-sm text-gray-500">
                        © 2025 西湖智能向善社会创新网络. 保留所有权利
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 