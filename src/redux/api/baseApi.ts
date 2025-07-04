import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { createApi } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({ baseUrl: `https://backend-eight-xi-31.vercel.app/api` }),
    tagTypes: ['book'],
    endpoints: (build) => ({
        getAllBooks: build.query({
            query: () => '/books',
            providesTags: ['book']
        }),
        createTask: build.mutation({
            query: (bookData) => ({
                url: '/books',
                method: 'POST',
                body: bookData,
            }),
            invalidatesTags: ['book']
        }),
        updateTask: build.mutation({
            query: ({ bookId, ...updatedFields }) => ({
                url: `/books/${bookId}`,
                method: 'PATCH',
                body: updatedFields, // ✅ flat fields, not wrapped in updatedData
            }),
            invalidatesTags: ['book'], // ✅ Capitalize if you used `tagTypes: ['Book']`
        }),

        deleteBook: build.mutation({
            query: (id: string) => ({
                url: `/books/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['book']
        }),
        createBorrow: build.mutation({
            query: (borrowData) => ({
                url: '/borrows',
                method: 'POST',
                body: borrowData,
            }),
            invalidatesTags: ['book']
        }),
        borrowedSummery: build.query({
            query: () => '/borrows/summary'
        })
    })
})

export const { useGetAllBooksQuery, useCreateTaskMutation, useUpdateTaskMutation, useDeleteBookMutation, useCreateBorrowMutation, useBorrowedSummeryQuery } = baseApi