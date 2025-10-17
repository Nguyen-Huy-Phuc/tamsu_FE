const API_BASE_URL = 'https://mine.orbitmap.cloud/api/v1';

export interface CreatePackageRequest {
    name: string;
    duration: string;
    description: string;
    price: number;
}

export interface UpdatePackageRequest {
    name: string;
    duration: string;
    description: string;
    price: number;
}

export interface PackageResponse {
    status: number;
    message: string;
    data: any;
}

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Vui lòng đăng nhập để thực hiện thao tác này');
    }
    return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
};

// Format price to VND (remove decimal places for display)
export const formatPriceVND = (price: number): string => {
    return price.toLocaleString('vi-VN') + ' VNĐ';
};

// Parse VND string back to number (for form inputs)
export const parsePriceFromVND = (priceString: string): number => {
    return parseFloat(priceString.replace(/[^0-9.]/g, ''));
};

export const createPackage = async (packageData: CreatePackageRequest): Promise<PackageResponse> => {
    try {
        const response = await fetch(`${API_BASE_URL}/consulting-packages`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(packageData),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Có lỗi xảy ra khi tạo package');
        }

        return await response.json();
    } catch (error) {
        console.error('Create package error:', error);
        throw error;
    }
};

export const updatePackage = async (packageId: string, packageData: UpdatePackageRequest): Promise<PackageResponse> => {
    try {
        const response = await fetch(`${API_BASE_URL}/consulting-packages/${packageId}`, {
            method: 'PATCH',
            headers: getAuthHeaders(),
            body: JSON.stringify(packageData),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Có lỗi xảy ra khi cập nhật package');
        }

        return await response.json();
    } catch (error) {
        console.error('Update package error:', error);
        throw error;
    }
};