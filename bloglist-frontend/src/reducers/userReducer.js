import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import userService from "../services/user";
import { notify } from "../reducers/notificationReducer";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export const getUser = () => {
  return (dispatch) => {
    const userFromStorage = userService.getUser();
    if (userFromStorage) {
      dispatch(setUser(userFromStorage));
    }
  };
};

export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username,
        password,
      });
      dispatch(setUser(user));
      userService.setUser(user);
      dispatch(notify(`${user.name} logged in!`));
    } catch (error) {
      dispatch(notify("wrong username/password", "alert"));
    }
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    dispatch(setUser(null));
    userService.clearUser();
    dispatch(notify("good bye!"));
  };
};

export default userSlice.reducer;
