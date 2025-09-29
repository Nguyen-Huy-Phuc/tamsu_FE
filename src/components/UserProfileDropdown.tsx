import React, { useState, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const UserIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);



const LogOutIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
);

const ShoppingBag = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" x2="21" y1="6" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
);

interface DropdownMenuProps {
    children: ReactNode;
    trigger: ReactNode;
}

const DropdownMenu = ({ children, trigger }: DropdownMenuProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleTriggerClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <div onClick={handleTriggerClick} className="cursor-pointer">
                {trigger}
            </div>
            {isOpen && (
                <div
                    className="origin-top-right absolute right-0 mt-2 w-80 rounded-2xl shadow-2xl bg-white/98 backdrop-blur-xl ring-1 ring-white/30 focus:outline-none z-50 animate-in fade-in-0 zoom-in-95 duration-200 border border-gray-100 overflow-hidden"
                    role="menu"
                    aria-orientation="vertical"
                >
                    {children}
                </div>
            )}
        </div>
    );
};

interface DropdownMenuItemProps {
    children: ReactNode;
    onClick?: () => void;
}

const DropdownMenuItem = ({ children, onClick }: DropdownMenuItemProps) => (
    <button
        onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            if (onClick) onClick();
        }}
        className="w-full text-gray-700 group flex items-center px-3 py-2.5 text-sm rounded-lg hover:bg-gradient-to-r hover:from-rose-50 hover:to-pink-50 hover:text-rose-600 transition-all duration-200 transform hover:scale-[1.02]"
        role="menuitem"
    >
        {children}
    </button>
);

const DropdownMenuSeparator = () => (
    <div className="my-1 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
);

const UserProfileDropdown: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    if (!user) return null;

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    // Get user initials
    const getInitials = (username: string) => {
        return username.substring(0, 2).toUpperCase();
    };

    return (
        <DropdownMenu
            trigger={
                <button className="flex items-center space-x-3 p-2 rounded-xl hover:bg-rose-100/30 backdrop-blur-sm transition-all duration-300 border border-rose-200/30">
                    <div className="w-8 h-8 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-lg">
                        {getInitials(user.username)}
                    </div>
                    <div className="text-left hidden sm:block">
                        <div className="text-sm font-medium text-gray-700">
                            {user.username}
                        </div>
                        <div className="text-xs text-gray-500">
                            {user.email}
                        </div>
                    </div>
                </button>
            }
        >
            {/* Enhanced User Info Section */}
            <div className="px-4 py-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-t-lg border-b border-gray-100">
                <div className="flex items-center space-x-3">
                    <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-rose-400 via-pink-400 to-rose-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg ring-2 ring-white">
                            {getInitials(user.username)}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                        <div className="text-sm font-bold text-gray-900">
                            {user.username}
                        </div>
                        <div className="text-xs text-gray-600 bg-white/70 px-2 py-0.5 rounded-full">
                            {user.email}
                        </div>
                    </div>
                </div>
            </div>

            <DropdownMenuSeparator />

            {/* Profile Menu Items */}
            <div className="py-2">
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <div className="w-full flex items-center p-2 rounded-lg hover:bg-gradient-to-r hover:from-rose-50 hover:to-pink-50 transition-all duration-200">
                        <div className="w-8 h-8 bg-gradient-to-r from-rose-400 to-pink-400 rounded-lg flex items-center justify-center mr-3 shadow-md">
                            <UserIcon className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-semibold text-gray-700">Hồ sơ cá nhân</span>
                    </div>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => navigate('/purchase-history')}>
                    <div className="w-full flex items-center p-2 rounded-lg hover:bg-gradient-to-r hover:from-rose-50 hover:to-pink-50 transition-all duration-200">
                        <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-rose-400 rounded-lg flex items-center justify-center mr-3 shadow-md">
                            <ShoppingBag className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-semibold text-gray-700">Lịch sử mua gói</span>
                    </div>
                </DropdownMenuItem>
            </div>

            <DropdownMenuSeparator />

            {/* Enhanced Logout Section */}
            <div className="py-2">
                <DropdownMenuItem onClick={handleLogout}>
                    <div className="w-full flex items-center justify-between p-2 rounded-lg bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200 hover:from-rose-100 hover:to-pink-100 transition-all duration-200">
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-gradient-to-r from-rose-400 to-pink-400 rounded-lg flex items-center justify-center mr-3 shadow-md">
                                <LogOutIcon className="h-4 w-4 text-white" />
                            </div>
                            <span className="font-semibold text-rose-700">Đăng xuất</span>
                        </div>
                    </div>
                </DropdownMenuItem>
            </div>
        </DropdownMenu>
    );
};

export default UserProfileDropdown;