import { api } from "./axiosInstance";



type Post = {
    userId: number;
    id: number;
    title: string;
    body: string;
}


export const fetchPosts = async () => {
    const response = await api.get<Post[]>('/posts');
    return response.data;
}


export const createPost = async (title: string, body: string, id: number): Promise<Post> => {
    const response = await api.post<Post>('/posts', { userId: 1, title, body, id });
    return response.data;
}

export const updatePost = async (id: number, title: string, body: string) => {
    const response = await api.put<Post>(`/posts/${id}`, { title, body });
    return response.data;
}


export const deletePost = async (id: number) => {
    const response = await api.delete<Post>(`/posts/${id}`);
    return response.data;
}