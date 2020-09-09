import { createAction } from 'redux-actions'
import api from 'src/utils/api'

export const APP_SHOW_LOADING = 'APP_SHOW_LOADING'
export const APP_CLOSE_LOADING = 'APP_CLOSE_LOADING'

export const APP_OAUTH_USER = 'APP_OAUTH_USER'

export const GET_ALL_COACHES = 'GET_ALL_COACHES'

// 显示/隐藏顶层loading bar
export const showLoadingBar = createAction(APP_SHOW_LOADING)

export const closeLoadingBar = createAction(APP_CLOSE_LOADING)

export const getUserInfo = createAction(APP_OAUTH_USER, () =>
  api.get(`/user/userInfo`)
)

export const getAllCoaches = createAction(GET_ALL_COACHES, () =>
  api.get(`/coach/page?page=1&rows=10000`)
)
