import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

export const HOST: string = "http://budru.com.ru/social-network/api/";

const baseQuery = fetchBaseQuery({
    baseUrl: HOST,
    prepareHeaders(headers, { getState }) {
        const token = (getState() as RootState).auth.user?.token ||
                        localStorage.getItem('token');
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
    },
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 });

export const api = createApi({
    reducerPath: 'splitApi',
    baseQuery: baseQueryWithRetry,
    refetchOnMountOrArgChange: true,
    endpoints: () => ({})
});


// import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';

// export const HOST: string = "http://budru.com.ru/social-network/api/";

// export const api = createApi({
//     reducerPath: "api",
//     baseQuery: fetchBaseQuery({ baseUrl: HOST }),
//     endpoints: (build) => ({
//         getPost: build.query({
//             query: () => `posts/`,
//         })
//     })
// });

// export const { useGetPostQuery } = api;
