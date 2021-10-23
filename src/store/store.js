import { configureStore } from "@reduxjs/toolkit";

// reducer
import messageReducer from "../features/messages/messageSlice.js";

// persist from local storage
import { loadState, saveState } from "../utils/localStorage";

// throttle
import { throttle } from "../utils/utils";

// reducer
const reducer = { message: messageReducer };

// pre loaded state from state
const preloadedState = loadState();

/**
 * @name store
 * @description method creating the store with configure store
 * @param {*} reducer
 * @param {*} preloadedState
 * @returns store with reducers and pre-loaded state if present
 */
export const store = configureStore({
  reducer,
  preloadedState,
});

// whenever the state changes, the store will publish the same state to local storage
store.subscribe(() => {
  // in case of fast state changes, the throttle function will reduce the overhead
  // by calling the local storage APIs in a given time interval
  throttle(() => saveState(store.getState(), 1000));
});