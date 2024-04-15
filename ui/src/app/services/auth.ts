import { api } from './api';
import { User } from './types';

export type UserData = Omit<User, "id">;
type ResponseAuthorizeData = User & { token: string };

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        authorize: builder.mutation<ResponseAuthorizeData, UserData>({
            query: (userData) => ({
                url: '/users/authorize.php',
                method: 'POST',
                body: userData
            })
        }),
        register: builder.mutation<ResponseAuthorizeData, UserData>({
            query: (userData) => ({
                url: '/users/register.php',
                method: 'POST',
                body: userData
            })
        }),
        feed: builder.query<ResponseAuthorizeData, void>({
            query: () => ({
                url: '/users/feed.php',
                method: 'POST'
            })
        }),
    })
});

export const { useAuthorizeMutation, useRegisterMutation, useFeedQuery } = authApi;

export const { endpoints: { authorize, register, feed } } = authApi;
