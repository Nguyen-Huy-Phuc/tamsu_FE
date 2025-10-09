import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Calendar, ArrowLeft } from 'lucide-react';
import { fetchBlogById, type BlogDetailResponse } from '../services/blogService';
import LoadingSpinner from '../components/LoadingSpinner';
import type { Blog } from '../types';

const BlogDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        const loadBlog = async () => {
            try {
                setLoading(true);
                setError(null);
                const response: BlogDetailResponse = await fetchBlogById(id);
                setBlog(response.data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Có lỗi xảy ra khi tải dữ liệu');
            } finally {
                setLoading(false);
            }
        };

        loadBlog();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100 flex items-center justify-center">
                <LoadingSpinner />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100 flex items-center justify-center">
                <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-4 text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-red-600 font-bold text-xl">!</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Có lỗi xảy ra</h3>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <div className="flex gap-3 justify-center">
                        <Link
                            to="/blog"
                            className="bg-gray-600 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-colors"
                        >
                            Quay lại
                        </Link>
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-rose-600 text-white px-4 py-2 rounded-full hover:bg-rose-700 transition-colors"
                        >
                            Thử lại
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!blog) {
        return <Navigate to="/blog" replace />;
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long'
        });
    };

    const formatLastModified = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100">
            {/* Hero Section with Image */}
            <div className="relative h-[70vh] overflow-hidden">
                <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://via.placeholder.com/1200x800/f3f4f6/9ca3af?text=Blog+Image';
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                {/* Back Button */}
                <Link
                    to="/blog"
                    className="absolute top-8 left-8 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 rounded-full p-3 transition-all duration-300 hover:scale-110 shadow-lg"
                >
                    <ArrowLeft className="w-6 h-6" />
                </Link>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                    <div className="max-w-4xl mx-auto">
                        {/* Date */}
                        <div className="flex items-center gap-2 text-rose-200 text-lg font-medium mb-4">
                            <Calendar className="w-5 h-5" />
                            {formatDate(blog.createdAt)}
                        </div>

                        {/* Last Modified */}
                        {blog.lastModifiedAt && (
                            <div className="flex items-center gap-2 text-rose-300 text-sm font-medium mb-4">
                                <span>Cập nhật lần cuối: {formatLastModified(blog.lastModifiedAt)}</span>
                            </div>
                        )}

                        {/* Title */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                            {blog.title}
                        </h1>

                        {/* Short Description */}
                        <p className="text-xl md:text-2xl text-rose-100 mb-6 max-w-3xl">
                            {blog.shortDescription}
                        </p>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-4xl mx-auto px-6 md:px-8 py-12">
                {/* Main Content */}
                <div className="bg-white rounded-3xl shadow-xl border border-rose-100 p-8 md:p-12 mb-8">
                    <div className="prose prose-lg max-w-none">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                            Nội dung bài viết
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full mx-auto mb-8" />

                        <div className="text-lg leading-relaxed text-gray-700 whitespace-pre-line">
                            {blog.content || 'Nội dung đang được cập nhật...'}
                        </div>

                        {/* Key Points */}
                        <div className="grid md:grid-cols-2 gap-6 mt-12">
                            <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-6 border border-rose-100">
                                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <div className="w-3 h-3 bg-rose-400 rounded-full"></div>
                                    Điểm nổi bật
                                </h3>
                                <ul className="space-y-3 text-gray-700">
                                    <li className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-rose-400 rounded-full mt-2 flex-shrink-0"></div>
                                        <span>Kiến thức được chuyên gia tâm lý xác thực</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-rose-400 rounded-full mt-2 flex-shrink-0"></div>
                                        <span>Phương pháp thực tế và dễ áp dụng</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-rose-400 rounded-full mt-2 flex-shrink-0"></div>
                                        <span>Nghiên cứu khoa học làm nền tảng</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 border border-pink-100">
                                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <div className="w-3 h-3 bg-pink-400 rounded-full"></div>
                                    Lợi ích khi đọc
                                </h3>
                                <ul className="space-y-3 text-gray-700">
                                    <li className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                                        <span>Cải thiện sức khỏe tâm lý</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                                        <span>Phát triển kỹ năng sống</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                                        <span>Tăng cường nhận thức bản thân</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Back to Blog List */}
                <div className="text-center">
                    <Link
                        to="/blog"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-400 via-pink-400 to-rose-500 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Quay lại danh sách blog
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BlogDetailPage;