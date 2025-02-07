import { ReactNode } from "react";

export const Code = ({ children, clickToCopy = false }: { children: ReactNode; clickToCopy?: boolean }) => {
    const copyToClipboard = () => {
        if (typeof children === "string" && clickToCopy) {
            navigator.clipboard.writeText(children).catch(err => console.error("Failed to copy: ", err));
        }
    };

    return (
        <span
            className={`font-mono bg-gray-200 px-2 rounded-sm ${clickToCopy ? "cursor-pointer hover:bg-gray-300" : ""}`}
            onClick={clickToCopy ? copyToClipboard : undefined} 
            title={clickToCopy ? "Click to copy" : ""}
        >
            {children}
        </span>
    );
};
