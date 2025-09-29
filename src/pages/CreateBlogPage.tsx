import React, { useState, useRef } from 'react';
import type { DragEvent, ChangeEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, X, Image as ImageIcon, Link as LinkIcon, Type, FileText, Calendar, Save } from 'lucide-react';

interface BlogFormData {
    title: string;
    description: string;
    externalLink: string;
    imageFile: File | null;
    imagePreview: string;
}

interface BlogFormErrors {
    title?: string;
    description?: string;
    externalLink?: string;
    imageFile?: string;
}

const CreateBlogPage: React.FC = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [formData, setFormData] = useState<BlogFormData>({
        title: '',
        description: '',
        externalLink: '',
        imageFile: null,
        imagePreview: ''
    });
    const [isDragging, setIsDragging] = useState(false);
    const [errors, setErrors] = useState<BlogFormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handle drag events
    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);

        const files = Array.from(e.dataTransfer.files);
        const imageFile = files.find(file => file.type.startsWith('image/'));

        if (imageFile) {
            handleImageFile(imageFile);
        }
    };

    // Handle file selection
    const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            handleImageFile(file);
        }
    };

    const handleImageFile = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            setFormData(prev => ({
                ...prev,
                imageFile: file,
                imagePreview: e.target?.result as string
            }));
        };
        reader.readAsDataURL(file);

        // Clear image error if exists
        if (errors.imageFile) {
            setErrors(prev => ({ ...prev, imageFile: undefined }));
        }
    };

    const removeImage = () => {
        setFormData(prev => ({
            ...prev,
            imageFile: null,
            imagePreview: ''
        }));
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name as keyof BlogFormErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: BlogFormErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Tiêu đề là bắt buộc';
        } else if (formData.title.length < 10) {
            newErrors.title = 'Tiêu đề phải có ít nhất 10 ký tự';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Mô tả là bắt buộc';
        } else if (formData.description.length < 50) {
            newErrors.description = 'Mô tả phải có ít nhất 50 ký tự';
        }

        if (!formData.externalLink.trim()) {
            newErrors.externalLink = 'Link bài viết là bắt buộc';
        } else if (!/^https?:\/\/.+/.test(formData.externalLink)) {
            newErrors.externalLink = 'Link phải bắt đầu bằng http:// hoặc https://';
        }

        if (!formData.imageFile) {
            newErrors.imageFile = 'Ảnh đại diện là bắt buộc';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Show success message
            alert('Blog đã được tạo thành công! (Demo - không lưu thật)');

            // Navigate back to blog list
            navigate('/blog');
        } catch (error) {
            alert('Có lỗi xảy ra, vui lòng thử lại!');
        } finally {
            setIsSubmitting(false);
        }
    };

    const openImagePicker = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100">
            {/* Header */}
            <div className="bg-gradient-to-r from-rose-400 via-pink-400 to-rose-500 text-white">
                <div className="max-w-4xl mx-auto px-6 py-8">
                    <div className="flex items-center gap-4 mb-4">
                        <Link
                            to="/blog"
                            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 hover:scale-110"
                        >
                            <ArrowLeft className="w-6 h-6" />
                        </Link>
                        <h1 className="text-3xl md:text-4xl font-black">Tạo Blog Mới</h1>
                    </div>
                    <p className="text-rose-100 text-lg">
                        Chia sẻ kiến thức và kinh nghiệm của bạn với cộng đồng
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-12">
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Image Upload Section */}
                    <div className="bg-white rounded-3xl shadow-xl border border-rose-100 p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                                <ImageIcon className="w-5 h-5 text-rose-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Ảnh đại diện</h2>
                        </div>

                        {formData.imagePreview ? (
                            <div className="relative rounded-2xl overflow-hidden group">
                                <img
                                    src={formData.imagePreview}
                                    alt="Preview"
                                    className="w-full h-64 object-cover"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <button
                                        type="button"
                                        onClick={removeImage}
                                        className="bg-red-500 hover:bg-red-600 text-white rounded-full p-3 transition-colors duration-200"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                onClick={openImagePicker}
                                className={`
                  border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300
                  ${isDragging
                                        ? 'border-rose-400 bg-rose-50 scale-105'
                                        : 'border-rose-200 hover:border-rose-300 hover:bg-rose-50'
                                    }
                `}
                            >
                                <Upload className={`w-16 h-16 mx-auto mb-4 ${isDragging ? 'text-rose-500' : 'text-rose-300'}`} />
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    {isDragging ? 'Thả ảnh vào đây' : 'Tải lên ảnh đại diện'}
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Kéo thả ảnh vào đây hoặc nhấn để chọn file
                                </p>
                                <p className="text-sm text-gray-500">
                                    Hỗ trợ: JPG, PNG, GIF (Tối đa 5MB)
                                </p>
                            </div>
                        )}

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileSelect}
                            className="hidden"
                        />

                        {errors.imageFile && (
                            <p className="text-red-500 text-sm mt-2 flex items-center gap-2">
                                <X className="w-4 h-4" />
                                {errors.imageFile}
                            </p>
                        )}
                    </div>

                    {/* Title Section */}
                    <div className="bg-white rounded-3xl shadow-xl border border-rose-100 p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                                <Type className="w-5 h-5 text-pink-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Tiêu đề</h2>
                        </div>

                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="Nhập tiêu đề hấp dẫn cho blog của bạn..."
                            className={`
                w-full px-6 py-4 text-xl border rounded-2xl focus:ring-2 focus:border-transparent outline-none transition-all duration-200
                ${errors.title
                                    ? 'border-red-300 focus:ring-red-200'
                                    : 'border-rose-200 focus:ring-rose-200'
                                }
              `}
                        />

                        <div className="flex justify-between items-center mt-2">
                            {errors.title && (
                                <p className="text-red-500 text-sm flex items-center gap-2">
                                    <X className="w-4 h-4" />
                                    {errors.title}
                                </p>
                            )}
                            <p className={`text-sm ml-auto ${formData.title.length < 10 ? 'text-red-400' :
                                formData.title.length < 50 ? 'text-yellow-500' : 'text-green-500'
                                }`}>
                                {formData.title.length}/100 ký tự
                            </p>
                        </div>
                    </div>

                    {/* Description Section */}
                    <div className="bg-white rounded-3xl shadow-xl border border-rose-100 p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                                <FileText className="w-5 h-5 text-rose-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Mô tả</h2>
                        </div>

                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Viết mô tả chi tiết về nội dung blog..."
                            rows={6}
                            className={`
                w-full px-6 py-4 text-lg border rounded-2xl focus:ring-2 focus:border-transparent outline-none transition-all duration-200 resize-none
                ${errors.description
                                    ? 'border-red-300 focus:ring-red-200'
                                    : 'border-rose-200 focus:ring-rose-200'
                                }
              `}
                        />

                        <div className="flex justify-between items-center mt-2">
                            {errors.description && (
                                <p className="text-red-500 text-sm flex items-center gap-2">
                                    <X className="w-4 h-4" />
                                    {errors.description}
                                </p>
                            )}
                            <p className={`text-sm ml-auto ${formData.description.length < 50 ? 'text-red-400' :
                                formData.description.length < 200 ? 'text-yellow-500' : 'text-green-500'
                                }`}>
                                {formData.description.length}/500 ký tự
                            </p>
                        </div>
                    </div>

                    {/* External Link Section */}
                    <div className="bg-white rounded-3xl shadow-xl border border-rose-100 p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                                <LinkIcon className="w-5 h-5 text-pink-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Link bài viết gốc</h2>
                        </div>

                        <input
                            type="url"
                            name="externalLink"
                            value={formData.externalLink}
                            onChange={handleInputChange}
                            placeholder="https://example.com/your-article"
                            className={`
                w-full px-6 py-4 text-lg border rounded-2xl focus:ring-2 focus:border-transparent outline-none transition-all duration-200
                ${errors.externalLink
                                    ? 'border-red-300 focus:ring-red-200'
                                    : 'border-rose-200 focus:ring-rose-200'
                                }
              `}
                        />

                        {errors.externalLink && (
                            <p className="text-red-500 text-sm mt-2 flex items-center gap-2">
                                <X className="w-4 h-4" />
                                {errors.externalLink}
                            </p>
                        )}
                    </div>

                    {/* Submit Section */}
                    <div className="bg-gradient-to-r from-rose-400 via-pink-400 to-rose-500 rounded-3xl p-8 text-center text-white">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <Calendar className="w-8 h-8" />
                            <h2 className="text-2xl font-bold">Sẵn sàng xuất bản?</h2>
                        </div>

                        <p className="text-rose-100 text-lg mb-8 max-w-2xl mx-auto">
                            Kiểm tra lại thông tin và xuất bản blog để chia sẻ với cộng đồng
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex items-center gap-3 bg-white text-rose-500 hover:text-rose-600 px-8 py-4 rounded-full font-bold text-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-6 h-6 border-2 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
                                        Đang tạo blog...
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-6 h-6" />
                                        Tạo Blog
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateBlogPage;