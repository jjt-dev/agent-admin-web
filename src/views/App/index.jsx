import React, { useEffect } from 'react'
import { Spin } from 'antd'
import Header from 'src/views/App/Header'
import { local, AGENT_CODE, session } from 'src/utils/storage'
import { useSelector, useDispatch } from 'react-redux'
import * as appAction from 'src/actions/app'
import SideMenu from 'src/views/App/SideMenu'
import useDidMount from 'src/hooks/useDidMount'
import ErrorBoundary from 'src/components/ErrorBoundary'
import JjtBreadcrumb from 'src/views/App/JjtBreadcrumb'
import classnames from 'classnames'
import useActiveRoute from 'src/hooks/useActiveRoute'
import useLogin from 'src/hooks/useLogin'
import useSearch from 'src/hooks/useSearch'
import Router from '../Router'
import './index.less'
import ChromeCheck from './ChromeCheck'

const App = () => {
  const dispatch = useDispatch()
  const activeRoute = useActiveRoute()
  const isLogin = useLogin()
  const { loading, user } = useSelector((state) => state.app)
  const { agentCode } = useSearch()

  /**
   * 从用户输入的url中拿到agentCode
   */
  useDidMount(() => {
    if (agentCode) {
      local.setItem(AGENT_CODE, agentCode)
    }
    session.clear()
  })

  useEffect(() => {
    if (!isLogin) {
      dispatch(appAction.getUserInfo())
    }
  }, [dispatch, isLogin])

  useEffect(() => {
    if (user) {
      dispatch(appAction.getAgentLevels())
      dispatch(appAction.getAllCourses())
    }
  }, [dispatch, user])

  return (
    <div
      className={classnames('app', {
        'breadcrumb-active': activeRoute.back,
        'login-page': isLogin,
      })}
    >
      {/* <Header user={user} /> */}
      <main>
        <SideMenu />
        <ErrorBoundary>
          <JjtBreadcrumb />
          <Router />
        </ErrorBoundary>
      </main>
      {loading && <Spin />}
      <ChromeCheck />
    </div>
  )
}

export default App
