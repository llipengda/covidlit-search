import { lazy } from 'react'
import { Navigate, RouteObject } from 'react-router-dom'

const Home = lazy(() => import('@/pages/Home'))
const Search = lazy(() => import('@/pages/Search'))

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
    path: '/',
    element: <Navigate to='home' />
  }
]

export default routes
