import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//action for users
export const fetchUsersAction = createAsyncThunk(
  "users/list",
  async (users, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `https://api.github.com/users?per_page=100&since=01.01.2022`
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response.data);
    }
  }
);

//action for user profile
export const fetchProfileAction = createAsyncThunk(
  "profile/list",
  async (selectedUser, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `https://api.github.com/users/${selectedUser}`
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response.data);
    }
  }
);

//slices
const repposSlices = createSlice({
  name: "repos",
  initialState: {},
  extraReducers: (builder) => {
    // users builders
    builder.addCase(fetchUsersAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchUsersAction.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action?.payload;
      state.error = undefined;
    });
    builder.addCase(fetchUsersAction.rejected, (state, action) => {
      state.loading = false;
      state.profiles = undefined;
      state.error = action?.payload;
    });

    // profile builders
    builder.addCase(fetchProfileAction.pending, (state, action) => {
      state.loading = true;
      state.profile = undefined;
    });
    builder.addCase(fetchProfileAction.fulfilled, (state, action) => {
      state.loading = false;
      state.profile = action?.payload;
      state.error = undefined;
    });
    builder.addCase(fetchProfileAction.rejected, (state, action) => {
      state.loading = false;
      state.profile = undefined;
      state.error = action?.payload;
    });
  },
});

//get reducer
export default repposSlices.reducer;
