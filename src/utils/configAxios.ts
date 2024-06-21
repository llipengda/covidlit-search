import axios from 'axios'

import { API_URL } from '@/api/constants'
import useTokenStore from '@/stores/tokenStore'

axios.defaults.baseURL = API_URL

axios.interceptors.request.use(config => {
  config.headers.Authorization = 'Bearer ' + useTokenStore.getState().token
  config.validateStatus = status => status < 500
  return config
})
