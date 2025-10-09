import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchBlogs, type BlogsResponse } from '../services/blogService';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import type { Blog } from '../types';

const BlogListPage: React.FC = () => {
    const { isAuthenticated } = useAuth();
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(12);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);

    const loadBlogs = async (page: number, size: number) => {
        try {
            setLoading(true);
            setError(null);
            const response: BlogsResponse = await fetchBlogs(page, size);

            setBlogs(response.data.data);
            setTotalPages(response.data.totalPage);
            setTotalCount(response.data.totalCount);
            setCurrentPage(response.data.currentPage);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Có lỗi xảy ra khi tải dữ liệu');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadBlogs(currentPage, pageSize);
    }, [currentPage, pageSize]);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handlePageSizeChange = (size: number) => {
        setPageSize(size);
        setCurrentPage(1);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-pink-50 to-blue-100 flex items-center justify-center">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-pink-50 to-blue-100">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-blue-300 via-pink-300 to-blue-400 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
                            Blog Tâm Lý
                        </h1>
                        <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
                            Khám phá những kiến thức bổ ích về sức khỏe tâm lý và phát triển bản thân
                        </p>
                        {isAuthenticated && (
                            <Link
                                to="/blog/create"
                                className="inline-flex items-center gap-2 bg-white text-blue-500 px-6 py-3 rounded-full font-bold text-lg hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                            >
                                <Plus className="w-5 h-5" />
                                Tạo Blog Mới
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                                <span className="text-red-600 font-bold">!</span>
                            </div>
                            <div>
                                <h3 className="text-red-800 font-semibold mb-1">Có lỗi xảy ra</h3>
                                <p className="text-red-600">{error}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => loadBlogs(currentPage, pageSize)}
                            className="mt-4 bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-colors"
                        >
                            Thử lại
                        </button>
                    </div>
                )}

                {/* Controls */}
                <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-rose-100">
                    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                        {/* Blog count */}
                        <div className="text-gray-600 font-medium">
                            Tìm thấy {totalCount} bài viết
                        </div>

                        {/* Page size selector */}
                        <div className="flex items-center gap-2">
                            <span className="text-gray-600 font-medium">Hiển thị:</span>
                            <select
                                value={pageSize}
                                onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                                className="border border-rose-200 rounded-full px-4 py-2 focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none bg-white"
                            >
                                <option value={6}>6 bài</option>
                                <option value={12}>12 bài</option>
                                <option value={24}>24 bài</option>
                                <option value={30}>30 bài</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Blog Grid */}
                {blogs.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                            {blogs.map((blog) => (
                                <Link
                                    key={blog.id}
                                    to={`/blog/${blog.id}`}
                                    className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-rose-100 hover:border-rose-200 hover:scale-105 hover:bg-rose-50"
                                >
                                    {/* Blog Image */}
                                    <div className="relative overflow-hidden">
                                        <img
                                            src={blog.imageUrl}
                                            alt={blog.title}
                                            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.src = 'https://via.placeholder.com/400x300/f3f4f6/9ca3af?text=Blog+Image';
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>

                                    {/* Blog Content */}
                                    <div className="p-6">
                                        {/* Date */}
                                        <div className="flex items-center gap-2 text-pink-300 text-sm font-medium mb-3">
                                            <Calendar className="w-4 h-4" />
                                            {formatDate(blog.createdAt)}
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-pink-400 transition-colors">
                                            {blog.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-gray-600 line-clamp-3 mb-4">
                                            {blog.shortDescription}
                                        </p>

                                        {/* Read More Button */}
                                        <div className="flex items-center justify-between">
                                            <span className="text-pink-300 font-semibold group-hover:text-pink-400 transition-colors">
                                                Đọc thêm →
                                            </span>
                                            <div className="w-8 h-1 bg-pink-100 rounded-full group-hover:bg-pink-200 transition-colors" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                                {/* Previous Button */}
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-rose-200 text-rose-600 hover:bg-rose-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                    Trước
                                </button>

                                {/* Page Numbers */}
                                <div className="flex items-center gap-1 overflow-x-auto max-w-xs sm:max-w-none">
                                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                                        let pageNum;
                                        if (totalPages <= 5) {
                                            pageNum = i + 1;
                                        } else if (currentPage <= 3) {
                                            pageNum = i + 1;
                                        } else if (currentPage >= totalPages - 2) {
                                            pageNum = totalPages - 4 + i;
                                        } else {
                                            pageNum = currentPage - 2 + i;
                                        }

                                        return (
                                            <button
                                                key={pageNum}
                                                onClick={() => handlePageChange(pageNum)}
                                                className={`w-10 h-10 rounded-full font-semibold transition-all duration-200 ${currentPage === pageNum
                                                        ? 'bg-pink-400 text-white shadow-lg'
                                                        : 'border border-pink-200 text-pink-600 hover:bg-pink-50'
                                                    }`}
                                            >
                                                {pageNum}
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Next Button */}
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-rose-200 text-rose-600 hover:bg-rose-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                                >
                                    Sau
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    // No Results
                    <div className="text-center py-16">
                        <div className="w-24 h-24 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Calendar className="w-12 h-12 text-rose-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Chưa có blog nào</h3>
                        <p className="text-gray-600 mb-8">
                            Hiện tại chưa có bài blog nào. Hãy quay lại sau hoặc tạo blog mới!
                        </p>
                        {isAuthenticated && (
                            <Link
                                to="/blog/create"
                                className="inline-flex items-center gap-2 bg-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-pink-600 transition-colors duration-200"
                            >
                                <Plus className="w-5 h-5" />
                                Tạo Blog Mới
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogListPage;