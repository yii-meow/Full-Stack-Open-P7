import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    message: "",
    type: "",
  },
  reducers: {
    createNotification(state, action) {
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    removeNotification(state, action) {
      state.message = "";
      state.type = "";
    },
  },
});

export const { createNotification, removeNotification } =
  notificationSlice.actions;

export const setNotification = (content) => {
  return async (dispatch) => {
    dispatch(
      createNotification({
        message: content.message,
        type: content.type,
      })
    );

    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  };
};

export default notificationSlice.reducer;
