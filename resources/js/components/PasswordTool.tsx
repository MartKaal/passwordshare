import React from 'react';

type PasswordToolProps = {
    title?: string;
    subtitle?: string;
    children: React.ReactNode;
};

export default function PasswordTool({ title, subtitle, children }: PasswordToolProps) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
            <h1 className="mb-2 text-6xl font-black">{title}</h1>
            <p className="text-lg">{subtitle}</p>

            <div className="vertical mt-8 mb-6 flex w-1/3 flex-col items-center gap-4">{children}</div>
        </div>
    );
}
