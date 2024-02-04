const initialState = {
  isLoading: false,
};

export function loaderReducer(state = initialState, action) {
  switch (action.type) {
    case 'SHOW_LOADER':
      return { isLoading: true };
    case 'HIDE_LOADER':
      return { isLoading: false };
    default:
      return state;
  }
};