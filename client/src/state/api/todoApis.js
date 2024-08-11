// src/features/todos/todosApiSlice.js

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const todosApi = createApi({
  reducerPath: "todosApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3030/api/" }),
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => "todos",
    }),
    addTodo: builder.mutation({
      query: (newTodo) => ({
        url: "todos/create",
        method: "POST",
        body: newTodo,
      }),
    }),
    updateTodo: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `todos/update/${id}`,
        method: "PATCH",
        body: patch,
      }),
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `todos/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

// Export the auto-generated hooks for the endpoints
export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todosApi;
