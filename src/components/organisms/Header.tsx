// src/components/organisms/Header.tsx
import React from "react";

interface HeaderProps {
    title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
    return (
        <header className="bg-gray-200 p-4">
            <h1 className="text-xl font-bold">{title}</h1>
        </header>
    );
};

export default Header;
