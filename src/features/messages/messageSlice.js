// redux toolkit
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// api config
import {
  fetchUsers,
  addUsers,
  fetchMessages,
  addMessages,
  updateMessages,
  deleteMessages,
} from "./messageApi.js";

const initialState = {
  users: {},
  messages: {},
  signedinUser: {
    author: "",
  },
  loading: false,
  signin: false,
};

export const fetchMessagesAsync = createAsyncThunk(
  "messages/fetchMessages",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchMessages();
      // The value we return becomes the `fulfilled` action payload
      return response;
    } catch (err) {
      // Use `err.response.data` as `action.payload` for a `rejected` action,
      // by explicitly returning it using the `rejectWithValue()` utility
      return rejectWithValue(err.response.data);
    }
  }
);

export const addThreadAsync = createAsyncThunk(
  "messages/addThreads",
  async (params, { rejectWithValue }) => {
    try {
      const { message, author } = params;
      await addMessages({
        author: author,
        message: message,
        replies: [],
      });
    } catch (err) {
      // Use `err.response.data` as `action.payload` for a `rejected` action,
      // by explicitly returning it using the `rejectWithValue()` utility
      return rejectWithValue(err.response.data);
    }
  }
);

export const editThreadAsync = createAsyncThunk(
  "messages/editThreads",
  async (params, { rejectWithValue }) => {
    try {
      const { item } = params;
      await updateMessages(item.id, item);
    } catch (err) {
      // Use `err.response.data` as `action.payload` for a `rejected` action,
      // by explicitly returning it using the `rejectWithValue()` utility
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteThreadAsync = createAsyncThunk(
  "messages/deleteThreads",
  async (params, { rejectWithValue }) => {
    try {
      const { item } = params;
      await deleteMessages(item.id);
    } catch (err) {
      // Use `err.response.data` as `action.payload` for a `rejected` action,
      // by explicitly returning it using the `rejectWithValue()` utility
      return rejectWithValue(err.response.data);
    }
  }
);

export const addMessagesAsync = createAsyncThunk(
  "messages/addMessages",
  async (params, { rejectWithValue }) => {
    try {
      let { id, value, item, author } = params;
      let replies = [...item.replies];
      if (value.length) {
        replies = [
          ...replies,
          {
            id: Math.floor(Math.random() * 1000),
            message: value,
            author: author,
          },
        ];
      }
      await updateMessages(id, {
        id: item.id,
        message: item.message,
        author: item.author,
        replies: replies,
      });
    } catch (err) {
      // Use `err.response.data` as `action.payload` for a `rejected` action,
      // by explicitly returning it using the `rejectWithValue()` utility
      return rejectWithValue(err.response.data);
    }
  }
);

export const editMessagesAsync = createAsyncThunk(
  "messages/editMessages",
  async (params, { rejectWithValue }) => {
    try {
      const { item, element } = params;
      let replies = [...item.replies];
      const indexOfReply = replies.findIndex(
        (reply) => reply.id === element.id
      );
      replies[indexOfReply] = element;
      await updateMessages(item.id, {
        id: item.id,
        message: item.message,
        author: item.author,
        replies: replies,
      });
    } catch (err) {
      // Use `err.response.data` as `action.payload` for a `rejected` action,
      // by explicitly returning it using the `rejectWithValue()` utility
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteMessagesAsync = createAsyncThunk(
  "messages/deleteMessages",
  async (params, { rejectWithValue }) => {
    try {
      const { item, element } = params;
      const replies = [...item.replies];
      await updateMessages(item.id, {
        id: item.id,
        message: item.message,
        author: item.author,
        replies: replies.filter((reply) => reply.id !== element.id),
      });
    } catch (err) {
      // Use `err.response.data` as `action.payload` for a `rejected` action,
      // by explicitly returning it using the `rejectWithValue()` utility
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchUsersAsync = createAsyncThunk(
  "messages/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchUsers();
      // The value we return becomes the `fulfilled` action payload
      return response;
    } catch (err) {
      // Use `err.response.data` as `action.payload` for a `rejected` action,
      // by explicitly returning it using the `rejectWithValue()` utility
      return rejectWithValue(err.response.data);
    }
  }
);

export const addUsersAsync = createAsyncThunk(
  "messages/addUsers",
  async (params, { rejectWithValue }) => {
    try {
      const { user } = params;
      const response = await addUsers(user);
      toast.success(
        "You have succesfully signed up, please proceed to the sign in page."
      );
      // The value we return becomes the `fulfilled` action payload
      return response;
    } catch (err) {
      // Use `err.response.data` as `action.payload` for a `rejected` action,
      // by explicitly returning it using the `rejectWithValue()` utility
      return rejectWithValue(err.response.data);
    }
  }
);

/**
 * @name imageSlice
 * @description The `reducers` field lets us define reducers and generate associated actions
 * Redux Toolkit allows us to write "mutating" logic in reducers. It
 * doesn't actually mutate the state because it uses the Immer library,
 * which detects changes to a "draft state" and produces a brand new
 * immutable state based off those changes
 * @returns returns none explicitly, we have to export the following new state, actions, reducers that are below
 */
export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    signedin: (state, action) => {
      state.signin = action.payload;
    },
    signedinUser: (state, action) => {
      state.signedinUser = action.payload;
    },
    loadingState: (state, action) => {
      state.loading = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessagesAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMessagesAsync.fulfilled, (state, action) => {
        let messages = {};
        action.payload.forEach((item) => {
          messages = {
            ...messages,
            [item.id]: item,
          };
        });
        state.messages = messages;
        state.loading = false;
      })
      .addCase(fetchMessagesAsync.rejected, (state) => {
        state.loading = false;
        toast.error("Unable to fetch messages, please try again later!");
      })
      .addCase(addThreadAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(addThreadAsync.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addThreadAsync.rejected, (state) => {
        state.loading = false;
        toast.error("Unable to add threads, please try again later!");
      })
      .addCase(editThreadAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(editThreadAsync.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(editThreadAsync.rejected, (state) => {
        state.loading = false;
        toast.error("Unable to edit threads, please try again later!");
      })
      .addCase(deleteThreadAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteThreadAsync.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteThreadAsync.rejected, (state) => {
        state.loading = false;
        toast.error("Unable to delete threads, please try again later!");
      })
      .addCase(addMessagesAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(addMessagesAsync.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addMessagesAsync.rejected, (state) => {
        state.loading = false;
        toast.error("Unable to update messages, please try again later!");
      })
      .addCase(editMessagesAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(editMessagesAsync.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(editMessagesAsync.rejected, (state) => {
        state.loading = false;
        toast.error("Unable to edit messages, please try again later!");
      })
      .addCase(deleteMessagesAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteMessagesAsync.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteMessagesAsync.rejected, (state) => {
        state.loading = false;
        toast.error("Unable to delete messages, please try again later!");
      })
      .addCase(fetchUsersAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsersAsync.fulfilled, (state, action) => {
        let users = {};
        action.payload.forEach((item) => {
          users = {
            ...users,
            [item.email]: item,
          };
        });
        state.users = users;
        state.loading = false;
      })
      .addCase(fetchUsersAsync.rejected, (state) => {
        state.loading = false;
        toast.error("Unable to fetch users, please try again later!");
      })
      .addCase(addUsersAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(addUsersAsync.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addUsersAsync.rejected, (state) => {
        state.loading = false;
        toast.error("Unable to delete messages, please try again later!");
      });
  },
});

// exports the actions
export const { signedin, signedinUser, loadingState } = messageSlice.actions;

export const getMessages = (state) => state.message.messages;

export const getUsers = (state) => state.message.users;

export const getLoadingState = (state) => state.message.loading;

export const getSigninState = (state) => state.message.signin;

export const getSigninUserState = (state) => state.message.signedinUser;

export default messageSlice.reducer;
