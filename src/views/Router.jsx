import React from 'react'
import { Switch, Redirect } from 'react-router'
import { Route } from 'react-router-dom'
import Login from './Login'
import CoachList from './Coach/CoachList'
import Coach from './Coach/Coach'

export const routes = [
  { path: '/login', comp: Login },
  {
    path: '/coaches',
    editPath: '/coach',
    title: '教练',
    titleProp: 'username',
    comp: CoachList,
  },
  {
    path: '/coach',
    title: '教练',
    comp: Coach,
    back: { path: '/coaches', breadcrumbs: ['教练管理', '新增教练'] },
  },
  {
    path: '/coach/:id',
    defaultPath: '/coach',
    title: '教练',
    comp: Coach,
    back: { path: '/coaches', breadcrumbs: ['教练管理', '编辑教练'] },
  },
]

const Router = () => (
  <Switch>
    {routes.map((route) => {
      const { path, comp } = route
      return <Route key={path} path={path} exact component={comp} />
    })}
    <Redirect
      to={{
        pathname: '/coaches',
      }}
    />
  </Switch>
)

export default Router
