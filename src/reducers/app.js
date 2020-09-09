import { handleActions } from 'redux-actions'

import {
  APP_SHOW_LOADING,
  APP_CLOSE_LOADING,
  APP_OAUTH_USER,
  GET_ALL_COACHES,
} from 'src/actions/app'

const initState = {
  loading: false,
  user: null,
  allCoaches: [],
}

const app = handleActions(
  {
    [APP_SHOW_LOADING]: (state) => {
      return {
        ...state,
        loading: true,
      }
    },
    [APP_CLOSE_LOADING]: (state) => {
      return {
        ...state,
        loading: false,
      }
    },
    [APP_OAUTH_USER]: (state, { payload }) => {
      return {
        ...state,
        user: payload,
      }
    },
    [GET_ALL_COACHES]: (state, { payload }) => {
      const allCoaches = payload.data
      return {
        ...state,
        allCoaches,
        enabledCoaches: allCoaches.filter((item) => item.isEnable),
      }
    },
  },
  initState
)

export default app
