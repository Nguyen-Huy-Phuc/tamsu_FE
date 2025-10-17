import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, DollarSign } from 'lucide-react';
import { createPackage, formatPriceVND } from '../../services/adminPackageService';
import LoadingSpinner from '../../components/LoadingSpinner';

interface FormData {
    name: string;
    duration: string;
    description: string;
    price: string; // Keep as string for input handling
}

const CreatePackageAdmin: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState<FormData>({
        name: '',
        duration: '',
        description: '',
        price: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // Only allow numbers and one decimal point
        const numericValue = value.replace(/[^0-9.]/g, '');
        setFormData(prev => ({
            ...prev,
            price: numericValue
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // Validation
        if (!formData.name.trim()) {
            setError('Vui lòng nhập tên package');
            return;
        }
        if (!formData.duration.trim()) {
            setError('Vui lòng nhập thời gian tư vấn');
            return;
        }
        if (!formData.description.trim()) {
            setError('Vui lòng nhập mô tả');
            return;
        }
        if (!formData.price.trim()) {
            setError('Vui lòng nhập giá');
            return;
        }

        const priceValue = parseFloat(formData.price);
        if (isNaN(priceValue) || priceValue <= 0) {
            setError('Giá phải là số lớn hơn 0');
            return;
        }

        try {
            setLoading(true);
            await createPackage({
                name: formData.name.trim(),
                duration: formData.duration.trim(),
                description: formData.description.trim(),
                price: priceValue
            });

            // Success - redirect to package list
            navigate('/admin/packages');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Có lỗi xảy ra khi tạo package');
        } finally {
            setLoading(false);
        }
    };

    const previewPrice = formData.price ? formatPriceVND(parseFloat(formData.price) || 0) : '';

    return (
        <div>
            {/* Header */}
            <div className="flex items-center mb-8">
                <button
                    onClick={() => navigate('/admin/packages')}
                    className="mr-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Tạo Package mới</h1>
                    <p className="text-gray-600">Tạo gói tư vấn mới cho website</p>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    {/* Name */}
                    <div className="mb-6">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            Tên Package *
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="VD: Tư vấn cơ bản, Tư vấn chuyên sâu..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            required
                        />
                    </div>

                    {/* Duration */}
                    <div className="mb-6">
                        <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
                            Thời gian tư vấn *
                        </label>
                        <input
                            type="text"
                            id="duration"
                            name="duration"
                            value={formData.duration}
                            onChange={handleInputChange}
                            placeholder="VD: 30 phút, 1 giờ, 90 phút..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            required
                        />
                        <p className="text-sm text-gray-500 mt-1">
                            Nhập thời gian tư vấn (VD: 30 phút, 1 giờ)
                        </p>
                    </div>

                    {/* Price */}
                    <div className="mb-6">
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                            Giá (VNĐ) *
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <DollarSign className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                id="price"
                                name="price"
                                value={formData.price}
                                onChange={handlePriceChange}
                                placeholder="75000"
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                required
                            />
                        </div>
                        {previewPrice && (
                            <p className="text-sm text-gray-600 mt-1">
                                Hiển thị: <span className="font-medium text-green-600">{previewPrice}</span>
                            </p>
                        )}
                    </div>

                    {/* Description */}
                    <div className="mb-6">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                            Mô tả *
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Mô tả chi tiết về gói tư vấn này..."
                            rows={6}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-y"
                            required
                        />
                        <p className="text-sm text-gray-500 mt-1">
                            Mô tả này sẽ hiển thị khi người dùng xem chi tiết package
                        </p>
                    </div>
                </div>

                {/* Preview Card */}
                {(formData.name || formData.duration || formData.price || formData.description) && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Xem trước Package:</h3>
                        <div className="bg-white p-4 rounded-lg border">
                            <h4 className="font-medium text-gray-900">{formData.name || 'Tên package'}</h4>
                            <div className="flex items-center justify-between mt-2">
                                <span className="text-sm text-gray-600">{formData.duration || 'Thời gian'}</span>
                                <span className="font-bold text-green-600">{previewPrice || 'Giá'}</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                                {formData.description || 'Mô tả package...'}
                            </p>
                        </div>
                    </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between">
                    <button
                        type="button"
                        onClick={() => navigate('/admin/packages')}
                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Hủy
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                    >
                        {loading && (
                            <div className="w-4 h-4 mr-2">
                                <LoadingSpinner size="sm" color="white" />
                            </div>
                        )}
                        {loading ? 'Đang tạo...' : 'Tạo Package'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreatePackageAdmin;