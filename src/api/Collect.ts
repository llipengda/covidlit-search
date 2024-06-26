import axios from 'axios'

import type Article from '@/types/Article'

const add = async (articleId: string) => {
  return await axios.post(`/collects/${articleId}`)
}

const remove = async (articleId: string) => {
  return await axios.delete(`/collects/${articleId}`)
}

const check = async (articleId: string) => {
  return await axios.get<boolean>(`/collects/is/${articleId}`)
}

const get = async (page: number, pageSize: number) => {
  return await axios.get<Article[]>(`/collects`, {
    params: {
      page,
      pageSize
    }
  })
}

const CollectApi = {
  add,
  remove,
  check,
  get
}

export default CollectApi
