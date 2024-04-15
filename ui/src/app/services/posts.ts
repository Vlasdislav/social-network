import { api } from './api';
import { Post } from './types';

export const postApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllPosts: builder.query<Post[], void>({
            query: () => ({
                url: '/posts/',
                method: 'GET'
            })
        }),
        getPost: builder.query<Post, string>({
            query: (id) => ({
                url: `/posts/${id}`,
                method: 'GET'
            })
        }),
        updatePost: builder.mutation<string, Post>({
            query: (post) => ({
                url: `/posts/edit/${post.id}`,
                method: 'PATCH'
            })
        }),
        deletePost: builder.mutation<string, string>({
            query: (id) => ({
                url: `/posts/delete/${id}`,
                method: 'DELETE'
            })
        }),
        addPost: builder.query<Post, Post>({
            query: (post) => ({
                url: '/posts/add',
                method: 'POST',
                body: post
            })
        }),
    })
});

export const {
    useAddPostQuery,
    useDeletePostMutation,
    useGetAllPostsQuery,
    useGetPostQuery,
    useUpdatePostMutation
} = postApi;

export const { endpoints: { addPost, deletePost, getAllPosts, getPost, updatePost } } = postApi;




// Пример как получать посты
// import { configureStore } from '@reduxjs/toolkit';
// import { api } from './api';

// export const store = configureStore({
//     reducer: {
//         [api.reducerPath]: api.reducer
//     },
//     middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
// })
