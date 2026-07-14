import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../supabaseClient";

// Sign Up

export const signUpNewUser = createAsyncThunk(
  "auth/signUp",
  async ({ email, password }, { rejectWithValue }) => {
    const { data, error } = await supabase.auth.signUp({
      email: email.toLowerCase(),
      password,
    });

    if (error) {
      console.error("Signup Error:", error);
      console.error("Message:", error.message);
      console.error("Status:", error.status);
      console.error("Code:", error.code);

      return rejectWithValue(error.message);
    }

    return data;
  },
);

// Sign In

export const signInUser = createAsyncThunk(
  "auth/signIn",
  async ({ email, password }, { rejectWithValue }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.toLowerCase(),
      password,
    });

    if (error) {
      return rejectWithValue(error.message);
    }

    return data;
  },
);

// Sign Out

export const signOutUser = createAsyncThunk(
  "auth/signOut",
  async (_, { rejectWithValue }) => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return rejectWithValue(error.message);
    }

    return null;
  },
);


// Get Existing Session

export const getSession = createAsyncThunk(
  "auth/getSession",
  async (_, { rejectWithValue }) => {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      console.error("Supabase Error:", error);
      return rejectWithValue(error.message);
    }

    return session;
  },
);

const initialState = {
  session: null,
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setSession(state, action) {
      state.session = action.payload;
      state.user = action.payload?.user ?? null;
    },

    clearError(state) {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

   
      // Get Session
     
      .addCase(getSession.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSession.fulfilled, (state, action) => {
        state.loading = false;
        state.session = action.payload;
        state.user = action.payload?.user ?? null;
        state.error = null;
      })
      .addCase(getSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      // Sign Up

      .addCase(signUpNewUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUpNewUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(signUpNewUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

     
      // Sign In
     
      .addCase(signInUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.loading = false;
        state.session = action.payload.session;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

     
      // Sign Out
     
      .addCase(signOutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signOutUser.fulfilled, (state) => {
        state.loading = false;
        state.session = null;
        state.user = null;
        state.error = null;
      })
      .addCase(signOutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSession, clearError } = authSlice.actions;

export default authSlice.reducer;
