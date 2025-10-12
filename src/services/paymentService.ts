const API_BASE_URL = 'https://mine.orbitmap.cloud/api/v1';

export interface PaymentRequest {
    packageId: string;
}

export interface PaymentData {
    bin: string;
    accountNumber: string;
    accountName: string;
    amount: number;
    description: string;
    orderCode: number;
    currency: string;
    paymentLinkId: string;
    status: string;
    expiredAt: number;
    checkoutUrl: string;
    qrCode: string;
}

export interface PaymentResponse {
    status: number;
    message: string;
    data: PaymentData;
}

export const createPayment = async (packageId: string): Promise<PaymentResponse> => {
    const token = localStorage.getItem('token');

    if (!token) {
        console.log('🔧 No token found, throwing error');
        throw new Error('Vui lòng đăng nhập để thực hiện thanh toán');
    }

    console.log('🔧 Making API call to:', `${API_BASE_URL}/transactions`);

    // Tạo success URL với package ID
    const baseUrl = window.location.origin;
    const successUrl = `${baseUrl}/payment/success?packageId=${packageId}`;
    const cancelUrl = `${baseUrl}/payment/fail`;

    const response = await fetch(`${API_BASE_URL}/transactions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            packageId: packageId,
            returnUrl: successUrl,
            cancelUrl: cancelUrl
        }),
    });

    if (!response.ok) {
        if (response.status === 401) {
            throw new Error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại');
        }

        const errorText = await response.text();
        console.error('Payment API Error:', errorText);
        throw new Error('Có lỗi xảy ra khi tạo thanh toán. Vui lòng thử lại');
    }

    const data: PaymentResponse = await response.json();
    return data;
};