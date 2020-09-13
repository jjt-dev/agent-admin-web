import React from 'react'
import { Redirect, Switch } from 'react-router'
import { Route } from 'react-router-dom'

import agentRoute from './Agent/agentRoute'
import Login from './Login'
import schoolRoute from './School/schoolRoute'
import systemRoute from './System/systemRoute'

export const routes = [
  ...agentRoute,
  ...schoolRoute,
  ...systemRoute,
  { path: '/login', comp: Login },
]

const Router = () => (
  <Switch>
    {routes.map((route) => {
      const { path, comp } = route
      return <Route key={path} path={path} exact component={comp} />
    })}
    <Redirect
      to={{
        pathname: '/agent/list',
      }}
    />
  </Switch>
)

export default Router
