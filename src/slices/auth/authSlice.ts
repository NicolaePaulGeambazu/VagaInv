import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  isLoading: false,
  error: null,
};

export const loginAsync = createAsyncThunk(
  "auth/login",
  async (_credentials: { email: string; password: string }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return "FAKE_TOKEN_123";
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.token = action.payload;
      })
      .addCase(loginAsync.rejected, (state) => {
        state.isLoading = false;
        state.error = "Login failed.";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
