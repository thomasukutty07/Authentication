import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isAuthenticated: localStorage.getItem("user") ? true : false,
    user: JSON.parse(localStorage.getItem("user")) || null,
    isLoading: false,
};

// **Register User**
export const registerUser = createAsyncThunk("auth/registerUser", async (formData, { rejectWithValue }) => {
    try {
        const response = await axios.post("https://authentication-30yl.onrender.com/api/auth/register", formData, { withCredentials: true });
        return response?.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Registration failed.");
    }
});

// **Login User**
export const loginUser = createAsyncThunk("auth/loginUser", async (formData, { rejectWithValue }) => {
    try {
        const response = await axios.post("https://authentication-30yl.onrender.com/api/auth/login", formData, { withCredentials: true });
        localStorage.setItem("user", JSON.stringify(response.data.user));
        return response?.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Login failed.");
    }
});

// **Check User Existence**
export const checkUserExists = createAsyncThunk("auth/check-user", async (formData, { rejectWithValue }) => {
    try {
        const response = await axios.post('https://authentication-30yl.onrender.com/api/auth/check-user', formData, { withCredentials: true });
        return response?.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "User not found");
    }
});

export const forgotPassword = createAsyncThunk("auth/forgotPassword", async (formData, { rejectWithValue }) => {
    try {
        const response = await axios.post('https://authentication-30yl.onrender.com/api/auth/change-password', formData, { withCredentials: true });
        return response?.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Couldn't change password");
    }
});

// **Check Auth**
export const checkAuth = createAsyncThunk("auth/checkAuth", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get("https://authentication-30yl.onrender.com/api/auth/check-auth", {
            withCredentials: true,
            headers: { "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate" },
        });
        localStorage.setItem("user", JSON.stringify(response?.data?.user));
        return response?.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to check authentication.");
    }
});
export const logoutUser = createAsyncThunk("auth/logoutUser", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.post("https://authentication-30yl.onrender.com/api/auth/logout", {}, {
            withCredentials: true,
        });
        localStorage.removeItem("user");
        return response?.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Logout failed.");
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // **Register User**
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.isAuthenticated = false;
                state.isLoading = false;
                state.user = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isAuthenticated = false;
                state.user = null;
                state.isLoading = false;
            })

            // **Login User**
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.isLoading = false;
                state.message = action?.payload?.message;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isAuthenticated = false;
                state.user = null;
                state.isLoading = false;
            })

            // **Check Auth**
            .addCase(checkAuth.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.isLoading = false;
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.isAuthenticated = false;
                state.user = null;
                state.isLoading = false;
            })

            // **Check User Existence**
            .addCase(checkUserExists.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(checkUserExists.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.isLoading = false;
            })
            .addCase(checkUserExists.rejected, (state, action) => {
                state.isLoading = false;
            })

            // **Forgot Password**
            .addCase(forgotPassword.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(forgotPassword.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.isLoading = false;
            })
            .addCase(logoutUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                console.log("logout fulfilled", action);
                state.isLoading = false;
                state.message = action?.payload?.message;
            })
            .addCase(logoutUser.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export default authSlice.reducer;
