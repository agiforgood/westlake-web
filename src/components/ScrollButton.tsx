'use client';

const ScrollButton = () => {
    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <a
            href="#features"
            className="inline-flex items-center justify-center w-12 h-12 rounded-full border-2 border-gray-300 hover:border-gray-400 transition-colors duration-300"
            onClick={handleScroll}
        >
            <svg
                className="w-6 h-6 text-gray-500 animate-bounce"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
            </svg>
        </a>
    );
};

export default ScrollButton; 