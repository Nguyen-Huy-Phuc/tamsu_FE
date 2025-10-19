import React, { useState, useEffect } from 'react';
import {
    CheckCircle,
    XCircle,
    AlertCircle,
    DollarSign,
    Filter,
    Search,
    Package,
    ChevronLeft,
    ChevronRight,
    Clock,
    Eye,
    User,
    RefreshCw
} from 'lucide-react';
import {
    fetchTransactions,
    formatTransactionStatus,
    getStatusColor,
    formatPrice,
    type Transaction
} from '../../services/transactionUserService';
import LoadingSpinner from '../../components/LoadingSpinner';

const TransactionListAdmin: React.FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [filter, setFilter] = useState<'all' | 'Completed' | 'Processing' | 'Pending' | 'Failed' | 'Cancelled'>('all');
    const [searchTerm, setSearchTerm] = useState('');
    const pageSize = 10;

    useEffect(() => {
        loadTransactions();
    }, [currentPage]);

    const loadTransactions = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetchTransactions(currentPage, pageSize);
            setTransactions(response.data.data);
            setTotalPages(response.data.totalPage);
            setTotalCount(response.data.totalCount);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Có lỗi xảy ra khi tải danh sách giao dịch');
            console.error('Error loading transactions:', err);
        } finally {
            setLoading(false);
        }
    };

    // Filter transactions
    const filteredTransactions = transactions.filter(transaction => {
        const matchesFilter = filter === 'all' || transaction.status === filter;
        const matchesSearch =
            transaction.consultingPackage.toLowerCase().includes(searchTerm.toLowerCase()) ||
            transaction.referenceCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
            transaction.fullName.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Completed':
                return <CheckCircle className="w-4 h-4 text-green-600" />;
            case 'Processing':
                return <AlertCircle className="w-4 h-4 text-blue-600" />;
            case 'Pending':
                return <Clock className="w-4 h-4 text-yellow-600" />;
            case 'Failed':
            case 'Cancelled':
                return <XCircle className="w-4 h-4 text-red-600" />;
            default:
                return <AlertCircle className="w-4 h-4 text-gray-600" />;
        }
    };

    // Stats calculation
    const completedTransactions = transactions.filter(t => t.status === 'Completed');
    const pendingTransactions = transactions.filter(t => t.status === 'Pending' || t.status === 'Processing');
    const totalRevenue = completedTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Quản Lý Giao Dịch</h1>
                    <p className="text-gray-600 mt-1">
                        Xem và quản lý tất cả giao dịch trong hệ thống ({totalCount} giao dịch)
                    </p>
                </div>
                <div className="flex items-center space-x-3">
                    <button
                        onClick={loadTransactions}
                        className="btn-secondary flex items-center"
                        disabled={loading}
                    >
                        <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                        Làm mới
                    </button>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                    <button
                        onClick={loadTransactions}
                        className="ml-4 underline hover:no-underline"
                    >
                        Thử lại
                    </button>
                </div>
            )}

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <div className="flex items-center">
                        <div className="p-3 bg-green-100 rounded-lg">
                            <CheckCircle className="w-6 h-6 text-green-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Hoàn thành</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {completedTransactions.length}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <div className="flex items-center">
                        <div className="p-3 bg-yellow-100 rounded-lg">
                            <Clock className="w-6 h-6 text-yellow-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Đang xử lý</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {pendingTransactions.length}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <div className="flex items-center">
                        <div className="p-3 bg-blue-100 rounded-lg">
                            <DollarSign className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Tổng doanh thu</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {formatPrice(totalRevenue)}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <div className="flex items-center">
                        <div className="p-3 bg-purple-100 rounded-lg">
                            <Package className="w-6 h-6 text-purple-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Tổng giao dịch</p>
                            <p className="text-2xl font-bold text-gray-900">{totalCount}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo tên khách hàng, gói tư vấn hoặc mã giao dịch..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                        />
                    </div>

                    {/* Status Filter */}
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value as any)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 appearance-none bg-white"
                        >
                            <option value="all">Tất cả trạng thái</option>
                            <option value="Completed">Hoàn thành</option>
                            <option value="Processing">Đang xử lý</option>
                            <option value="Pending">Chờ thanh toán</option>
                            <option value="Failed">Thất bại</option>
                            <option value="Cancelled">Đã hủy</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Transactions Table */}
            <div className="bg-white rounded-lg shadow-sm border">
                {filteredTransactions.length === 0 ? (
                    <div className="p-12 text-center">
                        <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {searchTerm || filter !== 'all' ? 'Không tìm thấy giao dịch' : 'Chưa có giao dịch nào'}
                        </h3>
                        <p className="text-gray-600">
                            {searchTerm || filter !== 'all'
                                ? 'Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm'
                                : 'Hệ thống chưa có giao dịch nào được thực hiện'
                            }
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Khách hàng
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Gói tư vấn
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Mã giao dịch
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Số tiền
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Trạng thái
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Thao tác
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredTransactions.map((transaction) => (
                                        <tr key={transaction.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="p-2 bg-gray-100 rounded-full">
                                                        <User className="w-4 h-4 text-gray-600" />
                                                    </div>
                                                    <div className="ml-3">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {transaction.fullName}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{transaction.consultingPackage}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-mono text-gray-600">{transaction.referenceCode}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-semibold text-gray-900">
                                                    {formatPrice(transaction.amount)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    {getStatusIcon(transaction.status)}
                                                    <span className={`ml-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                                                        {formatTransactionStatus(transaction.status)}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <button className="text-pink-600 hover:text-pink-700 flex items-center">
                                                    <Eye className="w-4 h-4 mr-1" />
                                                    Xem chi tiết
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                                <div className="text-sm text-gray-600">
                                    Hiển thị {((currentPage - 1) * pageSize) + 1} - {Math.min(currentPage * pageSize, totalCount)} trong tổng số {totalCount} giao dịch
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => setCurrentPage(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                    </button>

                                    {[...Array(totalPages)].map((_, index) => {
                                        const page = index + 1;
                                        const isCurrentPage = page === currentPage;

                                        // Show first, last, current, and adjacent pages
                                        if (
                                            page === 1 ||
                                            page === totalPages ||
                                            (page >= currentPage - 1 && page <= currentPage + 1)
                                        ) {
                                            return (
                                                <button
                                                    key={page}
                                                    onClick={() => setCurrentPage(page)}
                                                    className={`px-3 py-2 border rounded-lg transition-colors ${isCurrentPage
                                                        ? 'bg-pink-600 text-white border-pink-600'
                                                        : 'border-gray-300 hover:bg-gray-50'
                                                        }`}
                                                >
                                                    {page}
                                                </button>
                                            );
                                        } else if (
                                            page === currentPage - 2 ||
                                            page === currentPage + 2
                                        ) {
                                            return (
                                                <span key={page} className="px-2">...</span>
                                            );
                                        }
                                        return null;
                                    })}

                                    <button
                                        onClick={() => setCurrentPage(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                                    >
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default TransactionListAdmin;