import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Link as LinkIcon } from 'lucide-react';
import { updateBlog } from '../../services/adminBlogService';
import { fetchBlogById } from '../../services/blogService';
import LoadingSpinner from '../../components/LoadingSpinner';
import type { Blog } from '../../types';

interface FormData {
    title: string;
    shortDescription: string;
    content: string;
    image: string; // URL string for update
}

const EditBlogAdmin: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [blog, setBlog] = useState<Blog | null>(null);

    const [formData, setFormData] = useState<FormData>({
        title: '',
        shortDescription: '',
        content: '',
        image: ''
    });

    useEffect(() => {
        if (id) {
            loadBlog();
        }
    }, [id]);

    const loadBlog = async () => {
        if (!id) return;

        try {
            setPageLoading(true);
            const response = await fetchBlogById(id);
            const blogData = response.data;
            setBlog(blogData);

            setFormData({
                title: blogData.title,
                shortDescription: blogData.shortDescription,
                content: blogData.content || '',
                image: blogData.imageUrl
            });
        } catch (err) {
            setError('Không thể tải thông tin blog');
            console.error('Error loading blog:', err);
        } finally {
            setPageLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) return;

        setError(null);

        // Validation
        if (!formData.title.trim()) {
            setError('Vui lòng nhập tiêu đề');
            return;
        }
        if (!formData.shortDescription.trim()) {
            setError('Vui lòng nhập mô tả ngắn');
            return;
        }
        if (!formData.content.trim()) {
            setError('Vui lòng nhập nội dung');
            return;
        }

        try {
            setLoading(true);
            await updateBlog(id, {
                title: formData.title.trim(),
                shortDescription: formData.shortDescription.trim(),
                content: formData.content.trim(),
                image: formData.image.trim()
            });

            // Success - redirect to blog list
            navigate('/admin/blogs');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Có lỗi xảy ra khi cập nhật blog');
        } finally {
            setLoading(false);
        }
    };

    if (pageLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <LoadingSpinner />
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="text-center py-12">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Không tìm thấy blog</h2>
                <button
                    onClick={() => navigate('/admin/blogs')}
                    className="text-blue-600 hover:text-blue-700"
                >
                    Quay về danh sách blog
                </button>
            </div>
        );
    }

    return (
        <div>
            {/* Header */}
            <div className="flex items-center mb-8">
                <button
                    onClick={() => navigate('/admin/blogs')}
                    className="mr-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="flex-1">
                    <h1 className="text-2xl font-bold text-gray-900">Chỉnh sửa Blog</h1>
                    <p className="text-gray-600">Cập nhật thông tin bài viết</p>
                </div>
                <a
                    href={`/blog/${id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                    <LinkIcon className="w-4 h-4 mr-2" />
                    Xem blog
                </a>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    {/* Title */}
                    <div className="mb-6">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                            Tiêu đề *
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="Nhập tiêu đề blog..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>

                    {/* Short Description */}
                    <div className="mb-6">
                        <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700 mb-2">
                            Mô tả ngắn *
                        </label>
                        <textarea
                            id="shortDescription"
                            name="shortDescription"
                            value={formData.shortDescription}
                            onChange={handleInputChange}
                            placeholder="Nhập mô tả ngắn cho blog..."
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            required
                        />
                        <p className="text-sm text-gray-500 mt-1">
                            Mô tả này sẽ hiển thị trong danh sách blog
                        </p>
                    </div>

                    {/* Content */}
                    <div className="mb-6">
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                            Nội dung *
                        </label>
                        <textarea
                            id="content"
                            name="content"
                            value={formData.content}
                            onChange={handleInputChange}
                            placeholder="Nhập nội dung chi tiết của blog..."
                            rows={12}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
                            required
                        />
                    </div>

                    {/* Image URL */}
                    <div className="mb-6">
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                            URL Hình ảnh
                        </label>
                        <input
                            type="url"
                            id="image"
                            name="image"
                            value={formData.image}
                            onChange={handleInputChange}
                            placeholder="https://example.com/image.jpg"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {formData.image && (
                            <div className="mt-3">
                                <p className="text-sm text-gray-600 mb-2">Xem trước:</p>
                                <img
                                    src={formData.image}
                                    alt="Preview"
                                    className="w-full max-w-md h-48 object-cover rounded-lg border"
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                    <button
                        type="button"
                        onClick={() => navigate('/admin/blogs')}
                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Hủy
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                    >
                        {loading && (
                            <div className="w-4 h-4 mr-2">
                                <LoadingSpinner size="sm" color="white" />
                            </div>
                        )}
                        {loading ? 'Đang cập nhật...' : 'Cập nhật Blog'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditBlogAdmin;