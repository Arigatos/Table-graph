const initialState = {
  characters: [],
  totalPages: 1,
  count: 1,
  nextPage: "",
  previousPage: "",
  loading: false,
  error: null,
};

const charactersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_CHARACTERS_START":
    case "FETCH_FILTERED_CHARACTERS_START":
    case "CHANGE_PAGE_START":
      return {
        ...state,
        loading: true,
        characters: [],
        error: null,
      };

    case "FETCH_CHARACTERS_SUCCESS":
    case "FETCH_FILTERED_CHARACTERS_SUCCESS":
    case "CHANGE_PAGE_SUCCESS":
      return {
        ...state,
        loading: false,
        characters: action.payload.data,
        count: action.payload.count,
        totalPages: action.payload.totalPages,
        nextPage: action.payload?.nextPage,
        previousPage: action.payload?.previousPage,
      };

    case "FETCH_CHARACTERS_ERROR":
    case "FETCH_FILTERED_CHARACTERS_ERROR":
    case "CHANGE_PAGE_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};

export default charactersReducer;
