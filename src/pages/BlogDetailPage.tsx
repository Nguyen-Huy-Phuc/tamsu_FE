import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Calendar, ExternalLink, ArrowLeft } from 'lucide-react';
import { mockBlogs } from '../lib/mockBlogData';

const BlogDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const blog = mockBlogs.find(b => b.id === id);

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

    const handleExternalLink = () => {
        window.open(blog.externalLink, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100">
            {/* Hero Section with Image */}
            <div className="relative h-[70vh] overflow-hidden">
                <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="w-full h-full object-cover"
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

                        {/* Title */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                            {blog.title}
                        </h1>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={handleExternalLink}
                                className="flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                            >
                                <ExternalLink className="w-5 h-5" />
                                Đi đến sản phẩm
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-4xl mx-auto px-6 md:px-8 py-12">
                {/* Description Card */}
                <div className="bg-white rounded-3xl shadow-xl border border-rose-100 p-8 md:p-12 mb-8">
                    <div className="prose prose-lg max-w-none">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                            Tóm tắt nội dung
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full mx-auto mb-8" />

                        <p className="text-xl leading-relaxed text-gray-700 text-center mb-8">
                            {blog.description}
                        </p>

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

                {/* CTA Section */}
                <div className="bg-gradient-to-r from-rose-400 via-pink-400 to-rose-500 rounded-3xl p-8 md:p-12 text-center text-white shadow-xl">
                    <h3 className="text-3xl font-bold mb-4">
                        Sẵn sàng khám phá thêm?
                    </h3>
                    <p className="text-xl text-rose-100 mb-8 max-w-2xl mx-auto">
                        Nhấn vào nút bên dưới để đọc bài viết đầy đủ và chi tiết từ nguồn gốc
                    </p>
                    <button
                        onClick={handleExternalLink}
                        className="bg-white text-rose-500 hover:text-rose-600 px-8 py-4 rounded-full font-bold text-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center gap-3"
                    >
                        <ExternalLink className="w-6 h-6" />
                        Đi đến sản phẩm
                    </button>
                </div>

                {/* Related Articles */}
                <div className="mt-12">
                    <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                        Bài viết liên quan
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {mockBlogs
                            .filter(b => b.id !== blog.id)
                            .slice(0, 3)
                            .map((relatedBlog) => (
                                <Link
                                    key={relatedBlog.id}
                                    to={`/blog/${relatedBlog.id}`}
                                    className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-rose-100 hover:border-rose-200 hover:scale-105"
                                >
                                    <img
                                        src={relatedBlog.imageUrl}
                                        alt={relatedBlog.title}
                                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="p-6">
                                        <div className="flex items-center gap-2 text-rose-500 text-sm font-medium mb-3">
                                            <Calendar className="w-4 h-4" />
                                            {formatDate(relatedBlog.createdAt)}
                                        </div>
                                        <h4 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-rose-600 transition-colors">
                                            {relatedBlog.title}
                                        </h4>
                                        <p className="text-gray-600 line-clamp-2 text-sm">
                                            {relatedBlog.description}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetailPage;