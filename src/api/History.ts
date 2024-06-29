import axios from 'axios'

import History from '@/types/History'

const get = async (page: number, pageSize: number) => {
  return await axios.get<History[]>('/histories', {
    params: {
      page,
      pageSize
    }
  })
}

const getCnt = async () => {
  return await axios.get<number>('/histories/count')
}

const HistoryApi = {
  get,
  getCnt
}

export default HistoryApi
