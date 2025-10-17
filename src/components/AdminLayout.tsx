import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    BookOpen,
    Package,
    LayoutDashboard,
    LogOut,
    Menu,
    X
} from 'lucide-react';
import { useState } from 'react';

const AdminLayout: React.FC = () => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navigation = [
        { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        { name: 'Quản lý Blog', href: '/admin/blogs', icon: BookOpen },
        { name: 'Quản lý Package', href: '/admin/packages', icon: Package },
    ];

    const handleLogout = () => {
        logout();
        window.location.href = '/';
    };

    return (
        <div className="h-screen flex bg-gray-100">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-40 lg:hidden">
                    <div
                        className="fixed inset-0 bg-gray-600 bg-opacity-75"
                        onClick={() => setSidebarOpen(false)}
                    />
                </div>
            )}

            {/* Sidebar */}
            <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
                <div className="flex items-center justify-between h-16 px-6 border-b">
                    <div className="flex items-center">
                        <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">T</span>
                        </div>
                        <span className="ml-2 text-xl font-bold text-gray-900">TamSu Admin</span>
                    </div>
                    <button
                        className="lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <nav className="mt-8 px-4">
                    <div className="space-y-2">
                        {navigation.map((item) => {
                            const isActive = location.pathname === item.href ||
                                (item.href !== '/admin' && location.pathname.startsWith(item.href));
                            return (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={`
                    group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200
                    ${isActive
                                            ? 'bg-pink-50 text-pink-700 border-r-2 border-pink-500'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                        }
                  `}
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    <item.icon className={`
                    mr-3 h-5 w-5 transition-colors duration-200
                    ${isActive ? 'text-pink-500' : 'text-gray-400 group-hover:text-gray-500'}
                  `} />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </div>
                </nav>

                {/* User info and logout */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                                <span className="text-gray-600 font-medium text-sm">
                                    {user?.fullName?.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-900">{user?.fullName}</p>
                                <p className="text-xs text-gray-500">{user?.role}</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                            title="Đăng xuất"
                        >
                            <LogOut className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top bar */}
                <header className="bg-white shadow-sm border-b h-16 flex items-center justify-between px-6">
                    <button
                        className="lg:hidden"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Menu className="w-6 h-6" />
                    </button>

                    <div className="flex items-center space-x-4">
                        <h1 className="text-xl font-semibold text-gray-900">
                            Admin Panel
                        </h1>
                    </div>

                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-600">
                            Xin chào, {user?.fullName}
                        </span>
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-1 overflow-auto bg-gray-50">
                    <div className="p-6">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;