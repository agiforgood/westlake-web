import React from "react";

interface FooterProps {
  showOnlyCopyright?: boolean;
}

const Footer: React.FC<FooterProps> = ({ showOnlyCopyright = true }) => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {!showOnlyCopyright && (
        <>
          {/* Contact Section */}
          <div className="container mx-auto px-4 pt-20 pb-12">
            {/* Footer Content */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-1 gap-12 mb-12 pt-12 border-t border-gray-800">
              <div className="flex flex-col items-center justify-center">
                <p className="text-lg font-semibold mb-4">
                  西湖智能向善社会创新网络，为志愿者创造有意义的链接，帮助他们取得专业成功。
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Copyright */}
      <div
        className={`text-center ${
          showOnlyCopyright ? "py-8" : "pt-8 border-t border-gray-800"
        }`}
      >
        <p className="text-sm text-gray-500">
          © 2025 智能向善社会创新网络. 保留所有权利
        </p>
        <p className="text-sm text-gray-500 mt-2">
          <a
            href="https://beian.miit.gov.cn/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            浙ICP备2025166409号-1
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
