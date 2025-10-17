import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Package, Plus } from 'lucide-react';
import { fetchBlogs } from '../../services/blogService';
import { fetchConsultingPackages } from '../../services/packageService';
import LoadingSpinner from '../../components/LoadingSpinner';

const AdminDashboard: React.FC = () => {
    const [blogCount, setBlogCount] = useState<number>(0);
    const [packageCount, setPackageCount] = useState<number>(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            setLoading(true);

            // Load blog count
            const blogResponse = await fetchBlogs();
            setBlogCount(blogResponse.data.totalCount);

            // Load package count  
            const packageResponse = await fetchConsultingPackages();
            setPackageCount(packageResponse.data.totalCount);

        } catch (error) {
            console.error('Error loading stats:', error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600">Quản lý hệ thống TamSu Health</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <BookOpen className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Tổng Blog</p>
                            <p className="text-2xl font-semibold text-gray-900">
                                {loading ? (
                                    <div className="w-8 h-8">
                                        <LoadingSpinner size="sm" />
                                    </div>
                                ) : (
                                    blogCount.toLocaleString()
                                )}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center">
                        <div className="p-2 bg-green-100 rounded-lg">
                            <Package className="w-6 h-6 text-green-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Tổng Package</p>
                            <p className="text-2xl font-semibold text-gray-900">
                                {loading ? (
                                    <div className="w-8 h-8">
                                        <LoadingSpinner size="sm" />
                                    </div>
                                ) : (
                                    packageCount.toLocaleString()
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Quản lý Blog</h2>
                    <p className="text-gray-600 mb-6">Tạo, chỉnh sửa và quản lý các bài viết blog</p>
                    <div className="space-y-3">
                        <Link
                            to="/admin/blogs"
                            className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <span className="font-medium text-gray-900">Xem tất cả Blog</span>
                            <BookOpen className="w-5 h-5 text-gray-400" />
                        </Link>
                        <Link
                            to="/admin/blogs/create"
                            className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
                        >
                            <span className="font-medium text-blue-700">Tạo Blog mới</span>
                            <Plus className="w-5 h-5 text-blue-600" />
                        </Link>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Quản lý Package</h2>
                    <p className="text-gray-600 mb-6">Tạo, chỉnh sửa và quản lý các gói tư vấn</p>
                    <div className="space-y-3">
                        <Link
                            to="/admin/packages"
                            className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <span className="font-medium text-gray-900">Xem tất cả Package</span>
                            <Package className="w-5 h-5 text-gray-400" />
                        </Link>
                        <Link
                            to="/admin/packages/create"
                            className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
                        >
                            <span className="font-medium text-green-700">Tạo Package mới</span>
                            <Plus className="w-5 h-5 text-green-600" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;