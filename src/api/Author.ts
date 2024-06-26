import axios from 'axios'

import type Author from '@/types/Author'

const getAuthors = async (search: string, page: number, pageSize: number) => {
  return await axios.get<Author[]>('/authors', {
    params: {
      search,
      page,
      pageSize
    }
  })
}

const getAuthorsCnt = async (search: string) => {
  return await axios.get<number>('/authors/count', {
    params: {
      search
    }
  })
}

const getAuthor = async (name: string) => {
  return await axios.get<Author>(`/authors/${name}`)
}

const AuthorApi = {
  getAuthors,
  getAuthorsCnt,
  getAuthor
}

export default AuthorApi
