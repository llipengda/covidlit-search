import axios from 'axios'

import { API_URL } from '@/api/constants'
import useTokenStore from '@/stores/tokenStore'
import Message from '@/utils/message'

axios.defaults.baseURL = API_URL

axios.interceptors.request.use(config => {
  config.headers.Authorization = 'Bearer ' + useTokenStore.getState().token
  config.validateStatus = status => status < 500
  return config
})

axios.interceptors.response.use(
  response => {
    if (response.status === 401 && response.data?.code === 10) {
      useTokenStore.getState().removeToken()
      Message.error('Please login again', 2500)
      window.location.href = '/login'
    }
    if (response.status === 404) {
      window.location.href = '/404'
    }
    return response
  },
  error => {
    return Promise.reject(error)
  }
)
