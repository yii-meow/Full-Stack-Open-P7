import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import blogService from "../services/blogs";
import userService from "../services/users";

const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    password: "",
    loggedInUser: "",
    allUser: [],
  },
  reducers: {
    setUsername(state, action) {
      state.username = action.payload.username;
    },
    setPassword(state, action) {
      state.password = action.payload.password;
    },
    setUser(state, action) {
      state.username = "";
      state.password = "";
      state.loggedInUser = action.payload;
    },
    setAllUserInfo(state, action) {
      state.allUser = action.payload;
    },
  },
});

export const { setUsername, setPassword, setUser, setAllUserInfo } =
  userSlice.actions;

export const fillForm = (content) => {
  return async (dispatch) => {
    dispatch(setUsername(content));
    dispatch(setPassword(content));
  };
};

export const loginUser = (user) => {
  return async (dispatch) => {
    window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
    blogService.setToken(user.token);

    dispatch(setUser(user));
  };
};

export const allUserInfo = () => {
  return async (dispatch) => {
    const allUser = await userService.getAll();
    dispatch(setAllUserInfo(allUser));
  };
};

export default userSlice.reducer;
