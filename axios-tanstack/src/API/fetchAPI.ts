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