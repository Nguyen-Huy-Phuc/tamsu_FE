import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Edit3,
    Save,
    X,
    Clock,
    Heart,
    Award,
    Camera,
} from 'lucide-react';

const ProfilePage: React.FC = () => {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        username: user?.username || '',
        email: user?.email || '',
        phone: '+84 123 456 789',
        location: 'Hồ Chí Minh, Việt Nam',
        birthDate: '1990-01-01',
        bio: 'Tôi là một người quan tâm đến sức khỏe tâm lý và luôn tìm kiếm sự cân bằng trong cuộc sống.',
        occupation: 'Software Engineer',
        interests: ['Tâm lý học', 'Meditation', 'Đọc sách', 'Yoga']
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        // Save logic here
        setIsEditing(false);
        console.log('Profile updated:', formData);
    };

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100 py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-rose-400 to-pink-500 rounded-lg flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black text-gray-900">
                            Hồ Sơ Cá Nhân
                        </h1>
                    </div>
                    <p className="text-gray-600 text-lg">
                        Quản lý thông tin cá nhân và cài đặt tài khoản của bạn
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Sidebar - Profile Overview */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-3xl p-8 shadow-xl border border-white/60 backdrop-blur-sm">
                            {/* Profile Picture */}
                            <div className="text-center mb-8">
                                <div className="relative inline-block">
                                    <div className="w-32 h-32 bg-gradient-to-br from-rose-400 via-pink-400 to-rose-500 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-2xl">
                                        {getInitials(formData.username)}
                                    </div>
                                    <button className="absolute bottom-2 right-2 w-10 h-10 bg-white rounded-full shadow-lg border-2 border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
                                        <Camera className="w-5 h-5 text-gray-600" />
                                    </button>
                                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white shadow-lg"></div>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mt-4 mb-2">{formData.username}</h2>
                                <p className="text-gray-500 mb-1">{formData.occupation}</p>
                                <p className="text-sm text-gray-400 flex items-center justify-center">
                                    <MapPin className="w-4 h-4 mr-1" />
                                    {formData.location}
                                </p>
                            </div>

                            {/* Quick Stats */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 bg-rose-500 rounded-xl flex items-center justify-center">
                                            <Heart className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-gray-900">Phiên tư vấn</p>
                                            <p className="text-xs text-gray-500">Đã hoàn thành</p>
                                        </div>
                                    </div>
                                    <span className="text-xl font-bold text-rose-600">3</span>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 bg-pink-500 rounded-xl flex items-center justify-center">
                                            <Clock className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-gray-900">Thời gian</p>
                                            <p className="text-xs text-gray-500">Tổng tư vấn</p>
                                        </div>
                                    </div>
                                    <span className="text-xl font-bold text-pink-600">40m</span>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-rose-100 to-pink-100 rounded-2xl">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 bg-gradient-to-r from-rose-400 to-pink-400 rounded-xl flex items-center justify-center">
                                            <Award className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-gray-900">Thành viên</p>
                                            <p className="text-xs text-gray-500">Từ tháng 9/2024</p>
                                        </div>
                                    </div>
                                    <span className="text-xl font-bold text-rose-600">VIP</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Profile Details */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Personal Information */}
                        <div className="bg-white rounded-3xl p-8 shadow-xl border border-white/60 backdrop-blur-sm">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                                    <User className="w-6 h-6 mr-3 text-rose-600" />
                                    Thông Tin Cá Nhân
                                </h3>
                                <button
                                    onClick={() => setIsEditing(!isEditing)}
                                    className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${isEditing
                                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        : 'bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:from-rose-600 hover:to-pink-600 shadow-lg hover:shadow-xl'
                                        }`}
                                >
                                    {isEditing ? (
                                        <>
                                            <X className="w-4 h-4 mr-2" />
                                            Hủy
                                        </>
                                    ) : (
                                        <>
                                            <Edit3 className="w-4 h-4 mr-2" />
                                            Chỉnh sửa
                                        </>
                                    )}
                                </button>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Tên hiển thị
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 focus:ring focus:ring-rose-200 transition-all duration-300"
                                        />
                                    ) : (
                                        <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                                            <User className="w-5 h-5 text-gray-400 mr-3" />
                                            <span className="font-medium text-gray-900">{formData.username}</span>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Email
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 focus:ring focus:ring-rose-200 transition-all duration-300"
                                        />
                                    ) : (
                                        <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                                            <Mail className="w-5 h-5 text-gray-400 mr-3" />
                                            <span className="font-medium text-gray-900">{formData.email}</span>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Số điện thoại
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 focus:ring focus:ring-rose-200 transition-all duration-300"
                                        />
                                    ) : (
                                        <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                                            <Phone className="w-5 h-5 text-gray-400 mr-3" />
                                            <span className="font-medium text-gray-900">{formData.phone}</span>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Ngày sinh
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="date"
                                            name="birthDate"
                                            value={formData.birthDate}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 focus:ring focus:ring-rose-200 transition-all duration-300"
                                        />
                                    ) : (
                                        <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                                            <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                                            <span className="font-medium text-gray-900">
                                                {new Date(formData.birthDate).toLocaleDateString('vi-VN')}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Vị trí
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 focus:ring focus:ring-rose-200 transition-all duration-300"
                                        />
                                    ) : (
                                        <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                                            <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                                            <span className="font-medium text-gray-900">{formData.location}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Giới thiệu bản thân
                                    </label>
                                    {isEditing ? (
                                        <textarea
                                            name="bio"
                                            value={formData.bio}
                                            onChange={handleInputChange}
                                            rows={4}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 focus:ring focus:ring-rose-200 transition-all duration-300 resize-none"
                                        />
                                    ) : (
                                        <div className="p-4 bg-gray-50 rounded-xl">
                                            <p className="text-gray-900 leading-relaxed">{formData.bio}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {isEditing && (
                                <div className="mt-8 flex justify-end">
                                    <button
                                        onClick={handleSave}
                                        className="flex items-center px-8 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-xl font-semibold hover:from-rose-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                                    >
                                        <Save className="w-5 h-5 mr-2" />
                                        Lưu thay đổi
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;