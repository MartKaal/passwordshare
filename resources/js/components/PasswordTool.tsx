import React from 'react'

type PasswordToolProps = {
    mode?: "input" | "generated" | "opened";
    title?: string;
    subtitle?: string;
    inputValue?: string;
    setInputValue?: (value: string) => void;
    buttonText?: string;
    onButtonClick?: () => void;
    placeholder?: string;
};

export default function PasswordTool({
    mode = "input",
    title,
    subtitle,
    inputValue,
    setInputValue,
    buttonText,
    onButtonClick,
    placeholder,
}: PasswordToolProps) {

    const isGenerated = mode === "generated";
    const isOpened = mode === "opened";

    return (
        <div className="flex bg-gray-100 flex-col items-center justify-center min-h-screen">
            <h1 className="text-6xl font-black mb-2">{title}</h1>
            <p className="text-lg">{subtitle}</p>

            <div className="mb-6 flex flex-col w-1/3 mt-8 gap-4 vertical items-center">
                <input
                    type="text"
                    id="default-input"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-0 focus:border-violet-600"
                    placeholder={placeholder}
                    value={inputValue ?? ""}
                    onChange={(e) => !isGenerated && !isOpened && setInputValue?.(e.target.value)}
                    disabled={isGenerated || isOpened}
                    required={!isGenerated}
                />
                <button
                    type="button"
                    className="text-white bg-violet-600 hover:bg-violet-700 focus:ring-1 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none hover:cursor-pointer w-1/3"
                    onClick={onButtonClick}
                >
                    {buttonText}
                </button>
            </div>
        </div>
    );
}