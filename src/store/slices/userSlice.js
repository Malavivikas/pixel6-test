import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async ({ page, size }) => {
    const response = await axios.get(
      `https://dummyjson.com/users?limit=${size}&skip=${(page - 1) * size}`
    );
    return {
      users: response.data.users,
      total: response.data.total,
      page,
      size,
    };
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 1,
    totalRecords: 0,
    pageSize: 10, // Default page size
  },
  reducers: {
    resetUsers: (state) => {
      state.users = [];
      state.loading = false;
      state.error = null;
      state.currentPage = 1;
      state.totalPages = 1;
      state.totalRecords = 0;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
      state.currentPage = 1; // Reset to first page when page size changes
      state.totalPages = 1; // Reset total pages to be recalculated
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
        state.currentPage = action.payload.page;
        state.totalRecords = action.payload.total;
        state.totalPages = Math.ceil(state.totalRecords / state.pageSize); // Calculate total pages dynamically
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { resetUsers, setPageSize } = userSlice.actions;
export default userSlice.reducer;
