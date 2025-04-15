import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    ...props
}) => {
    const baseStyles = 'font-medium rounded-lg transition-all duration-200 text-center inline-flex items-center justify-center';

    const variantStyles = {
        primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow',
        secondary: 'bg-gray-600 hover:bg-gray-700 text-white shadow-sm hover:shadow',
        outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 hover:border-blue-700 hover:text-blue-700',
    };

    const sizeStyles = {
        sm: 'py-2 px-4 text-sm min-w-[100px]',
        md: 'py-3 px-6 text-base min-w-[120px]',
        lg: 'py-4 px-8 text-lg min-w-[140px]',
    };

    return (
        <button
            className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button; 