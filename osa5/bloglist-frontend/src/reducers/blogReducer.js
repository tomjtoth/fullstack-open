import { createSlice } from '@reduxjs/toolkit';
import service from '../services/blogs';
import { setFeedback } from './feedbackReducer';

const slice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    update: (state, { payload }) =>
      state.map((blog) => (blog.id === payload.id ? payload : blog)),

    create: (state, { payload }) =>
      // payload might look like `[blog1, blog2, blog3, ... ]` OR `blog`
      // so I make a possibly nested array, then flatten and spread it for concat
      state.concat(...[payload].flat()),

    remove: (state, { payload }) =>
      state.filter((blog) => blog.id !== payload.id),
  },
});

const { create, update, remove } = slice.actions;

export const initBlogs = () => {
  return async (dispatch) => {
    const allBlogs = await service.getAll();
    dispatch(create(allBlogs));
  };
};

export const createBlog = (content) => {
  return async (dispatch) => {
    try {
      const createdBlog = await service.create(content);

      // the above createdBlog refers to the data of a response
      // had to clone it below, so I can use it in another place
      dispatch(create({ ...createdBlog }));
      dispatch(setFeedback([`added "${createdBlog.title}"`]));
    } catch (e) {
      dispatch(
        setFeedback([`creating blog failed: ${e.response.data.error}`, true])
      );
    }
  };
};

export const likeBlog = (content) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await service.update({
        ...content,
        likes: content.likes + 1,
      });
      dispatch(update(updatedBlog));
      dispatch(
        setFeedback([`${updatedBlog.title} has ${updatedBlog.likes} likes now`])
      );
    } catch (e) {
      dispatch(
        setFeedback([`updating blog failed: ${e.response.data.error}`, true])
      );
    }
  };
};

export const removeBlog = (content) => {
  return async (dispatch) => {
    try {
      const removedBlog = await service.remove(content);
      dispatch(remove(removedBlog));
      dispatch(
        setFeedback([`removed "${removedBlog.title}" by ${removedBlog.author}`])
      );
    } catch (e) {
      dispatch(setFeedback([`removal failed: ${e.response.data.error}`, true]));
    }
  };
};

export default slice.reducer;
