import React from 'react';

interface SectionProps {
    children: React.ReactNode;
    className?: string;
    bgColor?: 'white' | 'gray';
    id?: string;
}

const Section: React.FC<SectionProps> = ({
    children,
    className = '',
    bgColor = 'white',
    id,
}) => {
    const bgColors = {
        white: 'bg-white',
        gray: 'bg-gray-50',
    };

    return (
        <section
            id={id}
            className={`py-20 ${bgColors[bgColor]} ${className}`}
        >
            <div className="container mx-auto px-4">
                {children}
            </div>
        </section>
    );
};

export default Section; 