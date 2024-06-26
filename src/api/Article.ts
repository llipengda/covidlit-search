import axios from 'axios'

import type Article from '@/types/Article'
import type ArticleSearchBy from '@/types/ArticleSearchBy'

const getArticles = async (
  page: number,
  pageSize: number,
  search: string,
  searchBy: ArticleSearchBy,
  orderBy: string = 'publish_time',
  desc: boolean = true,
  allowNoUrl: boolean = false,
  refine?: string,
  from?: string,
  to?: string
) => {
  return await axios.get<Article[]>(`/articles`, {
    params: {
      page,
      pageSize,
      search,
      searchBy,
      allowNoUrl,
      orderBy,
      desc,
      refine,
      from,
      to
    }
  })
}

const getArticlesCnt = async (
  search: string,
  searchBy: ArticleSearchBy,
  allowNoUrl: boolean = false,
  refine?: string,
  from?: string,
  to?: string
) => {
  return await axios.get<number>(`/articles/count`, {
    params: {
      search,
      searchBy,
      allowNoUrl,
      refine,
      from,
      to
    }
  })
}

const getArticle = async (id: string) => {
  return await axios.get<Article>(`/articles/${id}`)
}

const getCites = async (id: string) => {
  return await axios.get<
    {
      id: string
      title: string
      flag: number
    }[]
  >(`/articles/${id}/cites`)
}

const ArticleApi = {
  getArticles,
  getArticlesCnt,
  getArticle,
  getCites
}

export default ArticleApi
