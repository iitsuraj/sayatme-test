import axios from "axios";
import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  GET_WRITE
} from "./types";

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile/")
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err => dispatch({ type: GET_PROFILE, payload: {} }));
};

// Get Profile by Handle
export const getProfileByHandle = handle => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/write/${handle}/`)
    .then(res =>
      dispatch({
        type: GET_WRITE,
        payload: res.data
      })
    )
    .catch(err => dispatch({ type: GET_WRITE, payload: null }));
};

// Get Profile by Handle
export const postOnProfileByHandle = (userData, handle) => dispatch => {
  axios
    .post(`/api/write/${handle}/`, userData)
    .then(res => {
      console.log("message submit");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Create Profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post("/api/portfolio/create-portfolio/", profileData)
    .then(res => history.push("/"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
