import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { authenticatedRoutes, nonAuthenticatedRoutes } from 'configs'
import { Loading, PublicRoute, PrivateRoute } from 'components'
import { connect } from 'react-redux'

const Components = {}
for (const c of authenticatedRoutes) {
  Components[c.component] = lazy(() => import(`./` + c.component))
}

for (const c of nonAuthenticatedRoutes) {
  Components[c.component] = lazy(() => import("./" + c.component))
}
const App = ({ isAuthenticated }) => {
  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Switch>
          {nonAuthenticatedRoutes.map(c => {
            // Route khong can bao ve, nhung khong duoc truy cap khi da authenticated
            const C = Components[c.component];
            return (
              <Route
                key={c.path}
                exact={c.isExact}
                path={c.path}
                render={(props) => (
                  <PublicRoute isAuth={isAuthenticated}>
                    <C {...props} />
                  </PublicRoute>
                )}
              />
            );
          })}
          {authenticatedRoutes.map(c => {
            const C = Components[c.component];
            return (
              <Route
                key={c.path}
                exact={c.isExact}
                path={c.path}
                render={(props) => (
                  // Bao ve Route can authentication bang Redirect
                  <PrivateRoute {...props} isAuth={isAuthenticated}>
                    <C {...props} />
                  </PrivateRoute>
                )}
              />
            );
          })}
          {isAuthenticated ? (
            <Redirect to="/home" />
          ) : (
            <Redirect to="/login" />
          )}
        </Switch>
      </BrowserRouter>
    </Suspense>
  )
}

const mapStateToProps = store => ({
  isAuthenticated: store.auth.isAuthenticated,
})

export default connect(mapStateToProps, {})(App)