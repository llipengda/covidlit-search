import { lazy } from 'react'
import { Navigate, RouteObject } from 'react-router-dom'

const Home = lazy(() => import('@/pages/Home'))
const Search = lazy(() => import('@/pages/Search'))
const Login = lazy(() => import('@/pages/Login'))
const SignUp = lazy(() => import('@/pages/SignUp'))
const ResetPassword = lazy(() => import('@/pages/ResetPassword'))
const Article = lazy(() => import('@/pages/Article'))
const Journal = lazy(() => import('@/pages/Journal'))

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
    path: 'reset-password',
    element: <ResetPassword />
  },
  {
    path: 'article/:id',
    element: <Article />
  },
  {
    path: 'journal/:name',
    element: <Journal />
  },
  {
    path: '/',
    element: <Navigate to='home' />
  }
]

export default routes
