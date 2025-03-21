import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  imageList: [],
  isLoading: false,
  message: null

};

export const fetchImages = createAsyncThunk(
  "fetch-image",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("https://authentication-30yl.onrender.com/api/image/get-image", {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Fetching image failed");
    }
  }
);

export const addImage = createAsyncThunk("add-image", async (file, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    formData.append("image", file);
    const response = await axios.post("https://authentication-30yl.onrender.com/api/image/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "File upload failed");
  }
});

export const deleteImage = createAsyncThunk('delete-image', async (id, { rejectWithValue }) => {
  try {
    console.log(id);
    const response = await axios.delete(`https://authentication-30yl.onrender.com/api/image/delete/${id}`, { withCredentials: true })
    return response?.data
  } catch (error) {
    return rejectWithValue(error.response?.data || "Image delete failed")
  }
})

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addImage.pending, (state, action) => {
        state.isLoading = true;
        state.message = action?.payload?.message
      })
      .addCase(addImage.fulfilled, (state, action) => {
        console.log("action fulfilled", action);
        state.isLoading = false;
        state.message = action?.payload?.message
      })
      .addCase(addImage.rejected, (state) => {
        state.isLoading = false;
        state.message = action?.payload?.message
      })
      .addCase(fetchImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.imageList = action.payload.data;
      })
      .addCase(fetchImages.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action?.payload?.message
      })
      .addCase(deleteImage.rejected, (state) => {
        state.isLoading = false;
      })
  },
});

export default imageSlice.reducer;
