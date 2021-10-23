/**
 * @name loadState
 * @description method that fetches the state from local storage to maintain persistence
 * @param {*} keyName
 * @returns pre loaded state from local storage if present
 */
export const loadState = (keyName = "message-board-app-state") => {
  try {
    const state = localStorage.getItem(keyName);
    if (state === null) {
      return undefined;
    }
    // state is in string format, parsing it to json
    return JSON.parse(state);
  } catch (err) {
    // state will undefined if nothing is found in local storage
    return undefined;
  }
};

/**
 * @name saveState
 * @description method that updates the state to local storage for persistence
 * @param {*} state
 * @param {*} keyName
 * @returns none
 */
export const saveState = (state, keyName = "message-board-app-state") => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(keyName, serializedState);
  } catch (err) {
    console.log("localstorage write error", err);
  }
};
