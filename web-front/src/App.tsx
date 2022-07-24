import React from 'react'
import { Router } from '@reach/router'
import LoginView from './unauth-views/LoginView'
import RegisterView from './unauth-views/RegisterView'
import ForgotPasswordView from './unauth-views/ForgotPasswordView'
import DashboardView from './authed-views/DashboardView'
import useAuth from './custom-hooks/useAuth'
import Layout from './components/redux-components/Layout'
import SearchView from './authed-views/DashboardView/SearchView'
import PlaylistsView from './authed-views/DashboardView/PlaylistsView'
import PlaylistView from './authed-views/DashboardView/PlaylistView'

const AuthRoutes = () => {
  return (
    <Router>
      <DashboardView path='/'>
        <SearchView path='/search' />
        <PlaylistsView path='/playlists' />
        <PlaylistView path='/playlists/:id' />
      </DashboardView>
    </Router>
  )
}

const UnAuthRoutes = () => {
  return (
    <Router>
      <LoginView path='/' />
      <RegisterView path='/register' />
      <ForgotPasswordView path='/forgot-password' />
    </Router>
  )
}

const App = () => {
  const [isAuth] = useAuth()
  return <Layout>{isAuth ? <AuthRoutes /> : <UnAuthRoutes />}</Layout>
}

export default App
