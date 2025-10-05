import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Search, Filter, ExternalLink, Plus } from 'lucide-react';
import { mockBlogs } from '../lib/mockBlogData';
import { useAuth } from '../context/AuthContext';

const BlogListPage: React.FC = () => {
    const { isAuthenticated } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');
    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 6;

    // Filter và sort blogs
    const filteredAndSortedBlogs = useMemo(() => {
        let filtered = mockBlogs.filter(blog =>
            blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.description.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // Sort theo ngày tạo
        filtered.sort((a, b) => {
            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();
            return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
        });

        return filtered;
    }, [searchTerm, sortBy]);

    // Pagination
    const totalPages = Math.ceil(filteredAndSortedBlogs.length / blogsPerPage);
    const paginatedBlogs = filteredAndSortedBlogs.slice(
        (currentPage - 1) * blogsPerPage,
        currentPage * blogsPerPage
    );

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
                {/* Filter và Search */}
                <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-rose-100">
                    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                        {/* Search */}
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Tìm kiếm blog..."
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="w-full pl-12 pr-4 py-3 border border-rose-200 rounded-full focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none transition-all duration-200"
                            />
                        </div>

                        {/* Sort */}
                        <div className="flex items-center gap-2">
                            <Filter className="text-blue-400 w-5 h-5" />
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest')}
                                className="border border-rose-200 rounded-full px-4 py-2 focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none bg-white"
                            >
                                <option value="newest">Mới nhất</option>
                                <option value="oldest">Cũ nhất</option>
                            </select>
                        </div>

                        {/* Results count */}
                        <div className="text-gray-600 font-medium">
                            Tìm thấy {filteredAndSortedBlogs.length} bài viết
                        </div>
                    </div>
                </div>

                {/* Blog Grid */}
                {paginatedBlogs.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                            {paginatedBlogs.map((blog) => (
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
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-rose-50">
                                            <ExternalLink className="w-4 h-4 text-pink-300" />
                                        </div>
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
                                            {blog.description}
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
                            <div className="flex justify-center items-center gap-2">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 rounded-full border border-rose-200 text-rose-600 hover:bg-rose-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                                >
                                    ← Trước
                                </button>

                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => handlePageChange(page)}
                                        className={`w-10 h-10 rounded-full font-semibold transition-all duration-200 ${currentPage === page
                                            ? 'bg-pink-400 text-white shadow-lg'
                                            : 'border border-pink-200 text-pink-600 hover:bg-pink-50'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ))}

                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 rounded-full border border-rose-200 text-rose-600 hover:bg-rose-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                                >
                                    Sau →
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    // No Results
                    <div className="text-center py-16">
                        <div className="w-24 h-24 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Search className="w-12 h-12 text-rose-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy blog nào</h3>
                        <p className="text-gray-600 mb-8">
                            Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc để tìm thấy blog phù hợp
                        </p>
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                setSortBy('newest');
                                setCurrentPage(1);
                            }}
                            className="bg-rose-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-rose-600 transition-colors duration-200"
                        >
                            Xóa bộ lọc
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogListPage;