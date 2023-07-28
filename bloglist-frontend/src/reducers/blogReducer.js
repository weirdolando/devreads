import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { notify } from "./notificationReducer";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload.sort((a, b) => b.likes - a.likes);
    },
    newBlog(state, action) {
      return [...state, action.payload];
    },
    deleteBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload);
    },
    likeBlog(state, action) {
      return state
        .map((blog) => {
          return blog.id === action.payload.id ? action.payload : blog;
        })
        .sort((a, b) => b.likes - a.likes);
    },
    setComments(state, action) {
      /* Do a deep clone of the state, so it won't mutate original state 
      when I initialize the new comments below */
      const blogs = JSON.parse(JSON.stringify(state));
      return blogs.map((blog) => {
        return blog.id === action.payload.id
          ? (blog.comments = action.payload.comments)
          : blog;
      });
    },
  },
});

export const { setBlogs, newBlog, deleteBlog, likeBlog, setComments } =
  blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const createdBlog = await blogService.create(blog);
      dispatch(newBlog(createdBlog));
      dispatch(
        notify(
          `a new blog '${createdBlog.title}' by ${createdBlog.author} added`
        )
      );
    } catch (error) {
      dispatch(
        notify("creating a blog failed: " + error.response.data.error, "alert")
      );
    }
  };
};

export const removeABlog = (id) => {
  return async (dispatch, getState) => {
    const blogs = getState().blogs;
    const toRemove = blogs.find((b) => b.id === id);
    const ok = window.confirm(
      `remove '${toRemove.title}' by ${toRemove.author}?`
    );

    if (!ok) {
      return;
    }

    await blogService.remove(id);
    dispatch(deleteBlog(id));
  };
};

export const likeABlog = (id) => {
  return async (dispatch, getState) => {
    const blogs = getState().blogs;
    const toLike = blogs.find((b) => b.id === id);
    const liked = {
      ...toLike,
      likes: (toLike.likes || 0) + 1,
      user: toLike.user.id,
    };

    const updatedBlog = await blogService.update(liked.id, liked);
    dispatch(
      notify(`you liked '${updatedBlog.title}' by ${updatedBlog.author}`)
    );
    dispatch(likeBlog(liked));
  };
};

export const addComment = (id, comment) => {
  return async (dispatch) => {
    const commentObj = {
      comment,
    };
    const comments = await blogService.addComment(id, commentObj);
    dispatch(setComments({ id, comments }));
  };
};

export default blogSlice.reducer;
