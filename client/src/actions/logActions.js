import axios from "axios";

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
} from "./types";

// export const getLogs = () => {
// return async (dispatch) => {
//     setLoading();

//     const res = await fetch('/logs');
//     const data = await res.json();

//     dispatch({
//         type: GET_LOGS,
//         payload: data
//     })
// }
// }

// Get logs from server
export const getLogs = () => async dispatch => {
  try {
    setLoading();

    const res = await axios.get("api/logs");

    dispatch({
      type: GET_LOGS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.message
    });
  }
};

//  Add new log
export const addLog = log => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    setLoading();

    const res = await axios.post("/api/logs", log, config);

    dispatch({
      type: ADD_LOG,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.message
    });
  }
};

// Delete log from server
export const deleteLog = id => async dispatch => {
  try {
    setLoading();

    await axios.delete(`/api/logs/${id}`);

    dispatch({
      type: DELETE_LOG,
      payload: id
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.message
    });
  }
};

// Update log on server
export const updateLog = log => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
    setLoading();
    
    const res = await axios.put(`/api/logs/${log._id}`, log, config)
    dispatch({
      type: UPDATE_LOG,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.message
    });
  }
};

// Search server logs
export const searchLogs = text => async dispatch => {
  dispatch({
    type: SEARCH_LOGS,
    payload: text
  })
};

// Clear current log
export const clearSearch = () => {
  return {
    type: CLEAR_SEARCH
  };
};

// Set current log
export const setCurrent = log => {
  return {
    type: SET_CURRENT,
    payload: log
  };
};

// Clear current log
export const clearCurrent = () => {
  return {
    type: CLEAR_CURRENT
  };
};

// Set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING
  };
};
