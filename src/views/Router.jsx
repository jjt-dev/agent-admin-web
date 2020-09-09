import React from 'react'
import { Switch, Redirect } from 'react-router'
import { Route } from 'react-router-dom'
import agentRoute from './Agent/agentRoute'
import Login from './Login'

export const routes = [...agentRoute, { path: '/login', comp: Login }]

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
