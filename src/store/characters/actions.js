import Axios from "axios";

const URL = "https://api.disneyapi.dev/";

export const fetchCharacters = () => async (dispatch) => {
  dispatch({
    type: "FETCH_CHARACTERS_START",
  });

  try {
    const response = await Axios.get(URL + "characters");
    dispatch({
      type: "FETCH_CHARACTERS_SUCCESS",
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: "FETCH_CHARACTERS_ERROR",
      error,
    });
  }
};

export const fetchFilteredCharacters = (params, type) => async (dispatch) => {
  dispatch({
    type: "FETCH_FILTERED_CHARACTERS_START",
  });

  const parseParams = Object.keys(params)
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
    )
    .join("&");

  try {
    const response = await Axios.get(
      URL + `character${type === "pagination" ? "s" : ""}?${parseParams}`
    );
    dispatch({
      type: "FETCH_FILTERED_CHARACTERS_SUCCESS",
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: "FETCH_FILTERED_CHARACTERS_ERROR",
      payload: error.message,
    });
  }
};

export const changePage = (url) => async (dispatch) => {
  dispatch({
    type: "CHANGE_PAGE_START",
  });

  try {
    const response = await Axios.get(url);
    dispatch({
      type: "CHANGE_PAGE_SUCCESS",
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: "CHANGE_PAGE_ERROR",
      payload: error.message,
    });
  }
};
