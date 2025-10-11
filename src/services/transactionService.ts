const API_BASE_URL = 'https://mine.orbitmap.cloud/api/v1';

export interface TransactionDetails {
    id: string;
    orderCode: string;
    amount: number;
    status: 'PENDING' | 'PAID' | 'CANCELLED' | 'EXPIRED';
    createdAt: string;
    expiredAt: string;
    packageId: string;
    userId: string;
    paymentMethod?: string;
    description: string;
}

export interface TransactionResponse {
    status: number;
    message: string;
    data: TransactionDetails;
}

export interface OrderDetails {
    id: string;
    packageId: string;
    packageName: string;
    amount: number;
    status: string;
    orderCode: string;
    createdAt: string;
    transaction?: TransactionDetails;
}

export interface OrderResponse {
    status: number;
    message: string;
    data: OrderDetails;
}

export const getTransactionByOrderCode = async (orderCode: string): Promise<TransactionResponse> => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('Vui lòng đăng nhập để xem thông tin giao dịch');
    } const response = await fetch(`${API_BASE_URL}/transactions/order/${orderCode}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        if (response.status === 401) {
            throw new Error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại');
        }
        if (response.status === 404) {
            throw new Error('Không tìm thấy thông tin giao dịch');
        }

        const errorText = await response.text();
        console.error('Transaction API Error:', errorText);
        throw new Error('Có lỗi xảy ra khi lấy thông tin giao dịch');
    }

    const data: TransactionResponse = await response.json();
    return data;
};

export const getOrderByCode = async (orderCode: string): Promise<OrderResponse> => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('Vui lòng đăng nhập để xem thông tin đơn hàng');
    } const response = await fetch(`${API_BASE_URL}/orders/code/${orderCode}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        if (response.status === 401) {
            throw new Error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại');
        }
        if (response.status === 404) {
            throw new Error('Không tìm thấy thông tin đơn hàng');
        }

        const errorText = await response.text();
        console.error('Order API Error:', errorText);
        throw new Error('Có lỗi xảy ra khi lấy thông tin đơn hàng');
    }

    const data: OrderResponse = await response.json();
    return data;
};

// Utility function để format trạng thái
export const formatTransactionStatus = (status: string): string => {
    switch (status) {
        case 'PENDING':
            return 'Đang xử lý';
        case 'PAID':
            return 'Đã thanh toán';
        case 'CANCELLED':
            return 'Đã hủy';
        case 'EXPIRED':
            return 'Đã hết hạn';
        default:
            return status;
    }
};

// Utility function để tạo Zalo link (có thể cần thiết cho success page)
export const generateZaloLink = (orderCode: string, packageName: string): string => {
    const message = `Xin chào! Tôi đã thanh toán thành công cho gói "${packageName}" với mã đơn hàng: ${orderCode}. Vui lòng hỗ trợ tôi bắt đầu buổi tư vấn.`;
    const encodedMessage = encodeURIComponent(message);
    return `https://zalo.me/g/your-zalo-group?message=${encodedMessage}`;
};