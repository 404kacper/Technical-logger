import {
  GET_LOGS,
  SET_LOADING,
  LOGS_ERROR,
  ADD_LOG,
  DELETE_LOG,
  UPDATE_LOG,
  SEARCH_LOGS,
  SET_CURRENT,
  CLEAR_CURRENT,
  CLEAR_SEARCH
} from "../actions/types";

const initialState = {
  logs: null,
  current: null,
  loading: false,
  error: null,
  searched: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LOGS:
      return {
        ...state,
        logs: action.payload,
        loading: false
      };
    case ADD_LOG:
      return {
        ...state,
        logs: [...state.logs, action.payload],
        loading: false
      };
    case DELETE_LOG:
      if (state.searched === null) {
        return {
          ...state,
          logs: state.logs.filter(log => log._id !== action.payload),
          loading: false
        };
      } else {
        return {
          ...state,
          logs: state.logs.filter(log => log._id !== action.payload),
          searched: state.searched.filter(log => log._id !== action.payload),
          loading: false
        };
      }
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case UPDATE_LOG:
      if (state.searched === null) {
        return {
          ...state,
          logs: state.logs.map(log =>
            log._id === action.payload._id ? action.payload : log
          )
        };
      } else {
        return {
          ...state,
          logs: state.logs.map(log =>
            log._id === action.payload._id ? action.payload : log
          ),
          searched: state.searched.map(log =>
            log._id === action.payload._id ? action.payload : log
          )
        };
      }
      
    case SEARCH_LOGS:
      return {
        ...state,
        searched: state.logs.filter(log => {
          const regex = new RegExp(`${action.payload}`, "gi");
          return (
            log._id.match(regex) ||
            log.message.match(regex) ||
            log.tech.match(regex) ||
            log.date.match(regex)
          );
        })
      };
    case CLEAR_SEARCH:
      return {
        ...state,
        searched: null
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    case LOGS_ERROR:
      console.error(action.payload);
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
