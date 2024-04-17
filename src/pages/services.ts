import {requests} from "../apiSetup/api";
import {Post, PostContent} from "../interfaces/types";

export const API_BASE_URL = 'https://jsonplaceholder.typicode.com';


export const ApiCalls = {
    getAllPosts: (): Promise<Post[]> => requests.get(`${API_BASE_URL}/posts`),
    getPost: (postId: number): Promise<PostContent> => requests.get(`${API_BASE_URL}/posts/${postId}`),
    createPost: (postData: PostContent): Promise<PostContent> => requests.post(`${API_BASE_URL}/posts`, postData),
    updatePost: (postId: number, postData: PostContent) => requests.put(`${API_BASE_URL}/posts/${postId}`, postData),
    deletePost: (postId: number) => requests.delete(`${API_BASE_URL}/posts/${postId}`),
}