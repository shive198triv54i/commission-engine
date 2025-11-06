import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { calculateCommission } from "../../services/api";

export const fetchCommission = createAsyncThunk(
  "commission/fetchCommission",
  async (requestData, { rejectWithValue }) => {
    try {
      const response = await calculateCommission(requestData);
      console.log("API Response:", response);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to calculate commission");
    }
  }
);

const initialState = {
  requestData: null,
  responseData: null,
  isLoading: false,
  error: null,
};

const commissionSlice = createSlice({
  name: "commission",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },

    resetCommission: (state) => {
      state.requestData = null;
      state.responseData = null;
      state.error = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchCommission.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
        state.requestData = action.meta.arg;
      })

      .addCase(fetchCommission.fulfilled, (state, action) => {
        state.isLoading = false;

        const payload = action.payload || {};
        state.responseData = {
          avalphaTechnologiesCommission:
            payload.avalphaTechnologiesCommissionAmount ??
            payload.avalphaTechnologiesCommission ??
            0,
          competitorCommission:
            payload.competitorCommissionAmount ??
            payload.competitorCommission ??
            0,
        };
        state.error = null;
      })

      .addCase(fetchCommission.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.responseData = null;
      });
  },
});

export const { clearError, resetCommission } = commissionSlice.actions;
export default commissionSlice.reducer;
