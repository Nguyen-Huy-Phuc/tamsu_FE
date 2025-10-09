import type { Blog } from '../types';

export interface BlogsResponse {
    status: number;
    message: string;
    data: {
        currentPage: number;
        pageSize: number;
        totalPage: number;
        totalCount: number;
        data: Blog[];
    };
}

export interface BlogDetailResponse {
    status: number;
    message: string;
    data: Blog;
}

export const fetchBlogs = async (page: number = 1, size: number = 30): Promise<BlogsResponse> => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('Token không tồn tại. Vui lòng đăng nhập lại.');
    }

    try {
        const response = await fetch(`https://mine.orbitmap.cloud/api/v1/blogs?page=${page}&size=${size}`, {
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
            throw new Error(result.message || 'Lỗi khi tải dữ liệu blog');
        }

        return result;
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('Có lỗi xảy ra khi tải dữ liệu blog. Vui lòng thử lại.');
    }
};

export const fetchBlogById = async (blogId: string): Promise<BlogDetailResponse> => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('Token không tồn tại. Vui lòng đăng nhập lại.');
    }

    try {
        const response = await fetch(`https://mine.orbitmap.cloud/api/v1/blogs/${blogId}`, {
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
                throw new Error('Không tìm thấy bài blog này.');
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.status !== 200) {
            throw new Error(result.message || 'Lỗi khi tải dữ liệu blog');
        }

        return result;
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('Có lỗi xảy ra khi tải dữ liệu blog. Vui lòng thử lại.');
    }
};