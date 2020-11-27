/* eslint-disable no-fallthrough */
const NewsReducer = (state, action) => {
    switch (action.type) {
          case "NEWS_DATA":
          return {
            ...state,
            newsData: action.payload.data
          };
        default:
          return state;
      }
};

export default NewsReducer
