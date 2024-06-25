import axios from 'axios'

import type Article from '@/types/Article'
import type ArticleSearchBy from '@/types/ArticleSearchBy'

const getArticles = async (
  page: number,
  pageSize: number,
  search: string,
  searchBy: ArticleSearchBy,
  allowNoUrl: boolean = false
) => {
  return await axios.get<Article[]>(`/articles`, {
    params: {
      page,
      pageSize,
      search,
      searchBy,
      allowNoUrl
    }
  })
}

const getArticlesCnt = async (
  search: string,
  searchBy: ArticleSearchBy,
  allowNoUrl: boolean = false
) => {
  return await axios.get<number>(`/articles/count`, {
    params: {
      search,
      searchBy,
      allowNoUrl
    }
  })
}

const getArticle = async (id: string) => {
  return await axios.get<Article>(`/articles/${id}`)
}

const ArticleApi = {
  getArticles,
  getArticlesCnt,
  getArticle
}

export default ArticleApi
