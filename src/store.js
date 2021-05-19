import {
  RESET_SESSION,
  SEEKING_SESSION_STATE,
  SESSION_INACTIVE_STATE,
  SET_SESSION_CODE,
  SET_SESSION_STATE,
} from './constants'

import React from 'react'

export const initialState = {
  // session information
  session: {
    code: null,
    state: SESSION_INACTIVE_STATE,
  },
}

export const reducer = (state, action) => {
  switch (action.type) {
    case RESET_SESSION: {
      return {
        ...state,
        session: initialState.session,
      }
    }
    case SET_SESSION_CODE: {
      return {
        ...state,
        session: {
          code: action.code,
          state: SEEKING_SESSION_STATE,
        },
      }
    }
    case SET_SESSION_STATE: {
      return {
        ...state,
        session: {
          ...state.session,
          state: action.state,
        },
      }
    }
    default: {
      return state
    }
  }
}

export const Context = React.createContext()
