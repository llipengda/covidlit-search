import axios from 'axios'

import type Article from '@/types/Article'
import type Author from '@/types/Author'

const getAuthors = async (
  search: string,
  page: number,
  pageSize: number,
  refine?: string
) => {
  return await axios.get<Author[]>('/authors', {
    params: {
      search,
      page,
      pageSize,
      refine
    }
  })
}

const getAuthorsCnt = async (search: string, refine?: string) => {
  return await axios.get<number>('/authors/count', {
    params: {
      search,
      refine
    }
  })
}

const getAuthor = async (name: string) => {
  return await axios.get<Author>(`/authors/${name}`)
}

const getArticles = async (name: string, page: number, pageSize: number) => {
  return await axios.get<Article[]>(`/authors/${name}/articles`, {
    params: {
      name,
      page,
      pageSize
    }
  })
}

const AuthorApi = {
  getAuthors,
  getAuthorsCnt,
  getAuthor,
  getArticles
}

export default AuthorApi
