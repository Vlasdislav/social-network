import { createSlice } from "@reduxjs/toolkit";
import { Post } from "../../app/services/types";
import { postApi } from "../../app/services/posts";
import { RootState } from "../../app/store";

interface InitialState {
    posts: Post[] | null
}

const initialState: InitialState = {
    posts: null,
}

const slice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        logout: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(postApi.endpoints.getAllPosts.matchFulfilled, (state, action) => {
                state.posts = action.payload
            })
    }
})

export default slice.reducer;

export const selectPosts = (state: RootState) => state.posts;
