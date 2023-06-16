import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../../utils/request';

export const vector_endpoints = createApi({
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    postVector: builder.mutation({
      query: (data) => ({
        url: '/vector',
        method: 'POST',
        body: data,
      }),
    }),

    fetchAllBooks: builder.query({
      query: () => '/vector',
    }),
  }),
});

export const { usePostVectorMutation, useFetchAllBooksQuery } =
  vector_endpoints;
