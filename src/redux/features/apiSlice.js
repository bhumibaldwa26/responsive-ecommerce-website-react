import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ page = 1, limit = 8, category = "", search = "" } = {}) => {
        let path = "products";
        if (category) {
          path = `products/category/${category}`;
        } else if (search) {
          path = `products/search`;
        }

        const skip = (page - 1) * limit;
        let queryParams = `?limit=${limit}&skip=${skip}`;

        if (search && !category) {
          queryParams += `&q=${encodeURIComponent(search)}`;
        }

        return `${path}${queryParams}`;
      },
      providesTags: ["Product"],
    }),

    getProduct: builder.query({
      query: (id) => `products/${id}`,
    }),

    getCategories: builder.query({
      query: () => "products/categories",
    }),

    createProduct: builder.mutation({
      query: (product) => ({
        url: "products/",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Product"],
    }),

    updateProduct: builder.mutation({
      query: ({ id, ...updates }) => ({
        url: `product/${id}`,
        method: "PATCH",
        body: updates,
      }),
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `product/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetCategoriesQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = apiSlice;



