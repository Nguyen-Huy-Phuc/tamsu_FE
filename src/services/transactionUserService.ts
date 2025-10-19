const API_BASE_URL = 'https://mine.orbitmap.cloud/api/v1';

export interface Transaction {
    id: string;
    amount: number;
    status: string;
    referenceCode: string;
    consultingPackage: string;
    fullName: string;
}

export interface TransactionsResponse {
    status: number;
    message: string;
    data: {
        currentPage: number;
        pageSize: number;
        totalPage: number;
        totalCount: number;
        data: Transaction[];
    };
}

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Vui lòng đăng nhập để xem lịch sử đơn hàng');
    }
    return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
};

export const fetchTransactions = async (page: number = 1, size: number = 30): Promise<TransactionsResponse> => {
    try {
        const response = await fetch(`${API_BASE_URL}/transactions?page=${page}&size=${size}`, {
            method: 'GET',
            headers: getAuthHeaders(),
        });

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại');
            }
            throw new Error('Không thể tải lịch sử đơn hàng');
        }

        return await response.json();
    } catch (error) {
        console.error('Fetch transactions error:', error);
        throw error;
    }
};

// Format transaction status to Vietnamese
export const formatTransactionStatus = (status: string): string => {
    const statusMap: { [key: string]: string } = {
        'Completed': 'Hoàn thành',
        'Processing': 'Đang xử lý',
        'Pending': 'Chờ thanh toán',
        'Failed': 'Thất bại',
        'Cancelled': 'Đã hủy',
        'Refunded': 'Đã hoàn tiền'
    };

    return statusMap[status] || status;
};

// Get status color for display
export const getStatusColor = (status: string): string => {
    const colorMap: { [key: string]: string } = {
        'Completed': 'bg-green-100 text-green-800',
        'Processing': 'bg-blue-100 text-blue-800',
        'Pending': 'bg-yellow-100 text-yellow-800',
        'Failed': 'bg-red-100 text-red-800',
        'Cancelled': 'bg-gray-100 text-gray-800',
        'Refunded': 'bg-purple-100 text-purple-800'
    };

    return colorMap[status] || 'bg-gray-100 text-gray-800';
};

// Format price to VND
export const formatPrice = (amount: number): string => {
    return amount.toLocaleString('vi-VN') + ' VNĐ';
};