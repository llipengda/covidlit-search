import { lazy } from 'react'
import { Navigate, RouteObject } from 'react-router-dom'

const Home = lazy(() => import('@/pages/Home'))
const Search = lazy(() => import('@/pages/Search'))
const Login = lazy(() => import('@/pages/Login'))
const SignUp = lazy(() => import('@/pages/SignUp'))
const ResetPassword = lazy(() => import('@/pages/ResetPassword'))
const Article = lazy(() => import('@/pages/Article'))
const Journal = lazy(() => import('@/pages/Journal'))
const Author = lazy(() => import('@/pages/Author'))
const User = lazy(() => import('@/pages/User'))
const Profile = lazy(() => import('@/pages/Profile'))
const Collection = lazy(() => import('@/pages/Collection'))
const History = lazy(() => import('@/pages/History'))
const Security = lazy(() => import('@/pages/Security'))
const Page404 = lazy(() => import('@/pages/404'))

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
    path: 'author/:name',
    element: <Author />
  },
  {
    path: 'user',
    element: <User />,
    children: [
      {
        path: 'profile',
        element: <Profile />
      },
      {
        path: 'collection',
        element: <Collection />
      },
      {
        path: 'history',
        element: <History />
      },
      {
        path: 'security',
        element: <Security />
      }
    ]
  },
  {
    path: '404',
    element: <Page404 />
  },
  {
    path: '/',
    element: <Navigate to='home' />
  },
  {
    path: '*',
    element: <Navigate to='404' />
  }
]

export default routes
