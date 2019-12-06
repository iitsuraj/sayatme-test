import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_WRITE
} from "../actions/types";
const initialState = {
  message: null,
  loading: false,
  msgsubmit: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PROFILE:
      return {
        ...state,
        loading: false,
        message: action.payload
      };
    case GET_WRITE:
      return {
        ...state,
        loading: false,
        profile: action.payload
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        message: null
      };
    default:
      return state;
  }
}
