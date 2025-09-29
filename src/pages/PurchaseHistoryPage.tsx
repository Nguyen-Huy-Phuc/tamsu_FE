import React, { useState } from 'react';
import {
    ShoppingBag,
    Calendar,
    Clock,
    CheckCircle,
    XCircle,
    AlertCircle,
    DollarSign,
    Filter,
    Search,
    Eye,
    Download,
    Star,
    MessageCircle,
    Package
} from 'lucide-react';

interface PurchaseHistory {
    id: string;
    packageName: string;
    packageType: 'basic' | 'advanced';
    price: number;
    purchaseDate: string;
    status: 'completed' | 'pending' | 'cancelled' | 'refunded';
    duration: number; // in minutes
    sessionDate?: string;
    rating?: number;
    feedback?: string;
    consultantName?: string;
}

const PurchaseHistoryPage: React.FC = () => {
    const [filter, setFilter] = useState<'all' | 'completed' | 'pending' | 'cancelled'>('all');
    const [searchTerm, setSearchTerm] = useState('');

    // Mock data - in real app this would come from API
    const purchaseHistory: PurchaseHistory[] = [
        {
            id: 'PH001',
            packageName: 'Tư Vấn Cơ Bản',
            packageType: 'basic',
            price: 35000,
            purchaseDate: '2024-09-15',
            status: 'completed',
            duration: 30,
            sessionDate: '2024-09-16',
            rating: 5,
            feedback: 'Rất hài lòng với buổi tư vấn. Chuyên gia rất tận tâm và chuyên nghiệp.',
            consultantName: 'Dr. Nguyễn Thị Mai'
        },
        {
            id: 'PH002',
            packageName: 'Tư Vấn Chuyên Sâu',
            packageType: 'advanced',
            price: 75000,
            purchaseDate: '2024-09-20',
            status: 'completed',
            duration: 60,
            sessionDate: '2024-09-22',
            rating: 5,
            feedback: 'Buổi tư vấn rất hữu ích, giúp tôi hiểu rõ hơn về vấn đề của mình.',
            consultantName: 'Dr. Trần Văn Hùng'
        },
        {
            id: 'PH003',
            packageName: 'Tư Vấn Cơ Bản',
            packageType: 'basic',
            price: 35000,
            purchaseDate: '2024-09-25',
            status: 'pending',
            duration: 30,
            sessionDate: '2024-09-28'
        },
        {
            id: 'PH004',
            packageName: 'Tư Vấn Chuyên Sâu',
            packageType: 'advanced',
            price: 75000,
            purchaseDate: '2024-08-10',
            status: 'cancelled',
            duration: 60
        }
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'from-rose-400 to-pink-400';
            case 'pending':
                return 'from-yellow-500 to-orange-500';
            case 'cancelled':
                return 'from-red-500 to-pink-500';
            case 'refunded':
                return 'from-gray-500 to-slate-500';
            default:
                return 'from-rose-500 to-pink-500';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed':
                return CheckCircle;
            case 'pending':
                return Clock;
            case 'cancelled':
                return XCircle;
            case 'refunded':
                return AlertCircle;
            default:
                return Clock;
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'completed':
                return 'Hoàn thành';
            case 'pending':
                return 'Chờ tư vấn';
            case 'cancelled':
                return 'Đã hủy';
            case 'refunded':
                return 'Đã hoàn tiền';
            default:
                return 'Chưa xác định';
        }
    };

    const filteredHistory = purchaseHistory.filter(item => {
        const matchesFilter = filter === 'all' || item.status === filter;
        const matchesSearch = item.packageName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.id.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const totalSpent = purchaseHistory
        .filter(item => item.status === 'completed')
        .reduce((sum, item) => sum + item.price, 0);

    const totalSessions = purchaseHistory.filter(item => item.status === 'completed').length;

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, index) => (
            <Star
                key={index}
                className={`w-4 h-4 ${index < rating
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                    }`}
            />
        ));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-rose-400 to-pink-500 rounded-lg flex items-center justify-center">
                            <ShoppingBag className="w-5 h-5 text-white" />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black text-gray-900">
                            Lịch Sử Mua Gói
                        </h1>
                    </div>
                    <p className="text-gray-600 text-lg">
                        Theo dõi tất cả các gói dịch vụ tư vấn đã mua và trạng thái của chúng
                    </p>
                </div>

                {/* Stats Overview */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-3xl p-6 shadow-xl border border-white/60 backdrop-blur-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 mb-1">Tổng chi tiêu</p>
                                <p className="text-2xl font-bold text-rose-600">
                                    {totalSpent.toLocaleString('vi-VN')}đ
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-r from-rose-400 to-pink-400 rounded-2xl flex items-center justify-center">
                                <DollarSign className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl p-6 shadow-xl border border-white/60 backdrop-blur-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 mb-1">Phiên đã hoàn thành</p>
                                <p className="text-2xl font-bold text-rose-600">{totalSessions}</p>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-r from-rose-500 to-pink-500 rounded-2xl flex items-center justify-center">
                                <CheckCircle className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl p-6 shadow-xl border border-white/60 backdrop-blur-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 mb-1">Phiên chờ tư vấn</p>
                                <p className="text-2xl font-bold text-pink-600">
                                    {purchaseHistory.filter(item => item.status === 'pending').length}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-rose-400 rounded-2xl flex items-center justify-center">
                                <Clock className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters and Search */}
                <div className="bg-white rounded-3xl p-6 shadow-xl border border-white/60 backdrop-blur-sm mb-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        {/* Search */}
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Tìm kiếm theo tên gói hoặc mã đơn hàng..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 focus:ring focus:ring-rose-200 transition-all duration-300"
                            />
                        </div>

                        {/* Filter Buttons */}
                        <div className="flex items-center gap-2">
                            <Filter className="w-5 h-5 text-gray-400" />
                            {[
                                { key: 'all', label: 'Tất cả', count: purchaseHistory.length },
                                { key: 'completed', label: 'Hoàn thành', count: purchaseHistory.filter(p => p.status === 'completed').length },
                                { key: 'pending', label: 'Chờ tư vấn', count: purchaseHistory.filter(p => p.status === 'pending').length },
                                { key: 'cancelled', label: 'Đã hủy', count: purchaseHistory.filter(p => p.status === 'cancelled').length }
                            ].map(({ key, label, count }) => (
                                <button
                                    key={key}
                                    onClick={() => setFilter(key as typeof filter)}
                                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${filter === key
                                        ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    {label} ({count})
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Purchase History List */}
                <div className="space-y-6">
                    {filteredHistory.length === 0 ? (
                        <div className="text-center py-12">
                            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-600 mb-2">Không tìm thấy kết quả</h3>
                            <p className="text-gray-500">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
                        </div>
                    ) : (
                        filteredHistory.map((purchase) => {
                            const StatusIcon = getStatusIcon(purchase.status);
                            return (
                                <div
                                    key={purchase.id}
                                    className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-white/60 backdrop-blur-sm hover:shadow-2xl transition-all duration-300"
                                >
                                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                                        {/* Main Info */}
                                        <div className="flex-1">
                                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                                                <div>
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <h3 className="text-xl font-bold text-gray-900">{purchase.packageName}</h3>
                                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${purchase.packageType === 'advanced'
                                                            ? 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700'
                                                            : 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700'
                                                            }`}>
                                                            {purchase.packageType === 'advanced' ? '💎 Premium' : '🎯 Cơ bản'}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                                                        <span className="flex items-center">
                                                            <Calendar className="w-4 h-4 mr-1" />
                                                            Mua: {new Date(purchase.purchaseDate).toLocaleDateString('vi-VN')}
                                                        </span>
                                                        <span className="flex items-center">
                                                            <Clock className="w-4 h-4 mr-1" />
                                                            {purchase.duration} phút
                                                        </span>
                                                        <span className="font-semibold text-gray-900">
                                                            Mã: {purchase.id}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="text-right">
                                                    <p className="text-2xl font-bold text-gray-900 mb-2">
                                                        {purchase.price.toLocaleString('vi-VN')}đ
                                                    </p>
                                                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold text-white bg-gradient-to-r ${getStatusColor(purchase.status)}`}>
                                                        <StatusIcon className="w-4 h-4 mr-2" />
                                                        {getStatusText(purchase.status)}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Session Details for Completed */}
                                            {purchase.status === 'completed' && purchase.sessionDate && (
                                                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-200">
                                                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                                                        <div className="flex-1">
                                                            <p className="text-sm font-semibold text-green-800 mb-1">
                                                                🎉 Phiên tư vấn đã hoàn thành
                                                            </p>
                                                            <p className="text-sm text-green-700">
                                                                <span className="font-medium">Ngày tư vấn:</span> {new Date(purchase.sessionDate).toLocaleDateString('vi-VN')}
                                                            </p>
                                                            {purchase.consultantName && (
                                                                <p className="text-sm text-green-700">
                                                                    <span className="font-medium">Chuyên gia:</span> {purchase.consultantName}
                                                                </p>
                                                            )}
                                                        </div>

                                                        {purchase.rating && (
                                                            <div className="flex flex-col items-start md:items-end">
                                                                <p className="text-sm font-medium text-green-800 mb-1">Đánh giá:</p>
                                                                <div className="flex items-center gap-1">
                                                                    {renderStars(purchase.rating)}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {purchase.feedback && (
                                                        <div className="mt-4 pt-4 border-t border-green-200">
                                                            <p className="text-sm font-medium text-green-800 mb-2 flex items-center">
                                                                <MessageCircle className="w-4 h-4 mr-1" />
                                                                Phản hồi của bạn:
                                                            </p>
                                                            <p className="text-sm text-green-700 italic">"{purchase.feedback}"</p>
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            {/* Pending Session Details */}
                                            {purchase.status === 'pending' && purchase.sessionDate && (
                                                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-4 border border-yellow-200">
                                                    <p className="text-sm font-semibold text-orange-800 mb-1">
                                                        ⏰ Phiên tư vấn đã được lên lịch
                                                    </p>
                                                    <p className="text-sm text-orange-700">
                                                        <span className="font-medium">Ngày tư vấn:</span> {new Date(purchase.sessionDate).toLocaleDateString('vi-VN')}
                                                    </p>
                                                    <p className="text-xs text-pink-600 mt-1">
                                                        Chúng tôi sẽ liên hệ với bạn trước 24h để xác nhận thời gian cụ thể
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:min-w-[140px]">
                                            <button className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                                                <Eye className="w-4 h-4 mr-2" />
                                                Chi tiết
                                            </button>

                                            {purchase.status === 'pending' && (
                                                <button className="flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors">
                                                    <XCircle className="w-4 h-4 mr-2" />
                                                    Hủy gói
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
};

export default PurchaseHistoryPage;