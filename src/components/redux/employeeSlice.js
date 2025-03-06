import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const FIREBASE_URL = "https://testfirbase-6083e-default-rtdb.firebaseio.com/employees.json";

export const submitEmployeeToFirebase = createAsyncThunk(

  "employee/submitEmployeeToFirebase",
  async (employeeData, { rejectWithValue }) => {
    try {
      const response = await axios.post(FIREBASE_URL, employeeData);
      alert("employee data submitted successfully");

      return { id: response.data.name, ...employeeData }; 

    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  submittedData: [],
  loading: false,
  error: null,
};

console.log(222, initialState)
const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(submitEmployeeToFirebase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(submitEmployeeToFirebase.fulfilled, (state, action) => {
        state.loading = false;
        state.submittedData.push(action.payload);
      })
      .addCase(submitEmployeeToFirebase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default employeeSlice.reducer;
