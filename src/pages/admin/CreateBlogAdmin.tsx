import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Image as ImageIcon } from 'lucide-react';
import { createBlog } from '../../services/adminBlogService';
import LoadingSpinner from '../../components/LoadingSpinner';

interface FormData {
    title: string;
    shortDescription: string;
    content: string;
    image: File | null;
}

const CreateBlogAdmin: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const [formData, setFormData] = useState<FormData>({
        title: '',
        shortDescription: '',
        content: '',
        image: null
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                image: file
            }));

            // Create preview
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
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
            await createBlog({
                title: formData.title.trim(),
                shortDescription: formData.shortDescription.trim(),
                content: formData.content.trim(),
                image: formData.image
            });

            // Success - redirect to blog list
            navigate('/admin/blogs');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Có lỗi xảy ra khi tạo blog');
        } finally {
            setLoading(false);
        }
    };

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
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Tạo Blog mới</h1>
                    <p className="text-gray-600">Tạo bài viết blog mới cho website</p>
                </div>
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

                    {/* Image Upload */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Hình ảnh
                        </label>
                        <div className="space-y-4">
                            {imagePreview && (
                                <div className="relative">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-full max-w-md h-48 object-cover rounded-lg border"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setImagePreview(null);
                                            setFormData(prev => ({ ...prev, image: null }));
                                        }}
                                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                                    >
                                        ×
                                    </button>
                                </div>
                            )}

                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                    id="image-upload"
                                />
                                <label htmlFor="image-upload" className="cursor-pointer">
                                    <div className="flex flex-col items-center">
                                        {imagePreview ? (
                                            <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                        ) : (
                                            <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
                                        )}
                                        <p className="text-sm text-gray-600">
                                            {imagePreview ? 'Thay đổi hình ảnh' : 'Tải lên hình ảnh'}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            PNG, JPG, JPEG (Max 5MB)
                                        </p>
                                    </div>
                                </label>
                            </div>
                        </div>
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
                        {loading ? 'Đang tạo...' : 'Tạo Blog'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateBlogAdmin;