const API_BASE_URL = 'https://mine.orbitmap.cloud/api/v1';

export interface CreateBlogRequest {
    title: string;
    shortDescription: string;
    content: string;
    image?: File | null;
}

export interface UpdateBlogRequest {
    title: string;
    shortDescription: string;
    content: string;
    image: string; // URL string for update
}

export interface BlogResponse {
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
        'Authorization': `Bearer ${token}`
    };
};

export const createBlog = async (blogData: CreateBlogRequest): Promise<BlogResponse> => {
    try {
        const formData = new FormData();
        formData.append('title', blogData.title);
        formData.append('shortDescription', blogData.shortDescription);
        formData.append('content', blogData.content);

        if (blogData.image) {
            formData.append('image', blogData.image);
        }

        const response = await fetch(`${API_BASE_URL}/blogs`, {
            method: 'POST',
            headers: {
                ...getAuthHeaders()
                // Don't set Content-Type for FormData - browser will set it automatically with boundary
            },
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Có lỗi xảy ra khi tạo blog');
        }

        return await response.json();
    } catch (error) {
        console.error('Create blog error:', error);
        throw error;
    }
};

export const updateBlog = async (blogId: string, blogData: UpdateBlogRequest): Promise<BlogResponse> => {
    try {
        const response = await fetch(`${API_BASE_URL}/blogs/${blogId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeaders()
            },
            body: JSON.stringify(blogData),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Có lỗi xảy ra khi cập nhật blog');
        }

        return await response.json();
    } catch (error) {
        console.error('Update blog error:', error);
        throw error;
    }
};