import { lazy } from 'react'
import { Navigate, RouteObject } from 'react-router-dom'

const Home = lazy(() => import('@/pages/Home'))
const Search = lazy(() => import('@/pages/Search'))
const Login = lazy(() => import('@/pages/Login'))
const SignUp = lazy(() => import('@/pages/SignUp'))

const routes: RouteObject[] = [
  {
    path: 'home',
    element: <Home />
  },
  {
    path: 'search',
    element: <Search />
  },
  {
    path: 'login',
    element: <Login />
  },
  {
    path: 'signup',
    element: <SignUp />
  },
  {
    path: '/',
    element: <Navigate to='home' />
  }
]

export default routes
