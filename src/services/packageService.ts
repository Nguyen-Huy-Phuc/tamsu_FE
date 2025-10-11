import type { ConsultationPackage, ReviewSubmission } from '../types';

export interface PackagesResponse {
    status: number;
    message: string;
    data: {
        currentPage: number;
        pageSize: number;
        totalPage: number;
        totalCount: number;
        data: ConsultationPackage[];
    };
}

export interface PackageDetailResponse {
    status: number;
    message: string;
    data: ConsultationPackage;
}

export interface ReviewSubmissionResponse {
    status: number;
    message: string;
    data: {
        id: string;
        rating: number;
        comment: string;
        consultingPackageId: string;
        createdAt: string;
        lastModifiedAt: string | null;
    };
}export const fetchConsultingPackages = async (page: number = 1, size: number = 30): Promise<PackagesResponse> => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('Token không tồn tại. Vui lòng đăng nhập lại.');
    }

    try {
        const response = await fetch(`https://mine.orbitmap.cloud/api/v1/consulting-packages?page=${page}&size=${size}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.');
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.status !== 200) {
            throw new Error(result.message || 'Lỗi khi tải dữ liệu gói tư vấn');
        }

        return result;
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('Có lỗi xảy ra khi tải dữ liệu gói tư vấn. Vui lòng thử lại.');
    }
};

// Helper function to parse features from description
export const parseFeatures = (description: string): string[] => {
    return description
        .split(',')
        .map(feature => feature.trim())
        .filter(feature => feature.length > 0);
};

// Helper function to determine package type from name
export const getPackageType = (name: string): 'basic' | 'advanced' => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('nâng cao') || lowerName.includes('advanced') || lowerName.includes('premium')) {
        return 'advanced';
    }
    return 'basic';
};

// Helper function to process packages for UI
export const processPackageForUI = (pkg: ConsultationPackage): ConsultationPackage => {
    return {
        ...pkg,
        features: parseFeatures(pkg.description),
        type: getPackageType(pkg.name)
    };
};

// Fetch single package by ID
export const fetchPackageById = async (packageId: string): Promise<PackageDetailResponse> => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('Token không tồn tại. Vui lòng đăng nhập lại.');
    }

    try {
        const response = await fetch(`https://mine.orbitmap.cloud/api/v1/consulting-packages/${packageId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.');
            }
            if (response.status === 404) {
                throw new Error('Không tìm thấy gói tư vấn này.');
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.status !== 200) {
            throw new Error(result.message || 'Lỗi khi tải dữ liệu gói tư vấn');
        }

        return result;
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('Có lỗi xảy ra khi tải dữ liệu gói tư vấn. Vui lòng thử lại.');
    }
};

// Submit review for package
export const submitReview = async (packageId: string, reviewData: ReviewSubmission): Promise<ReviewSubmissionResponse> => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('Token không tồn tại. Vui lòng đăng nhập lại.');
    }

    try {
        const response = await fetch(`https://mine.orbitmap.cloud/api/v1/consulting-packages/${packageId}/reviews`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reviewData),
        });

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.');
            }
            if (response.status === 400) {
                throw new Error('Dữ liệu đánh giá không hợp lệ.');
            }
            if (response.status === 404) {
                throw new Error('Không tìm thấy gói tư vấn này.');
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.status !== 201) {
            throw new Error(result.message || 'Lỗi khi gửi đánh giá');
        }

        return result;
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('Có lỗi xảy ra khi gửi đánh giá. Vui lòng thử lại.');
    }
};