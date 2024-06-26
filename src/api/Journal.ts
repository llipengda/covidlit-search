import axios from 'axios'

import type Article from '@/types/Article'
import type Journal from '@/types/Journal'

const getJournals = async (
  search: string,
  page: number,
  pageSize: number,
  refine?: string
) => {
  return await axios.get<Journal[]>('/journals', {
    params: {
      search,
      page,
      pageSize,
      refine
    }
  })
}

const getJournalsCnt = async (search: string, refine?: string) => {
  return await axios.get<number>('/journals/count', {
    params: {
      search,
      refine
    }
  })
}

const getJournal = async (name: string) => {
  return await axios.get<Journal>(`/journals/${name}`)
}

const getArticles = async (name: string, page: number, pageSize: number) => {
  return await axios.get<Article[]>(`/journals/${name}/articles`, {
    params: {
      name,
      page,
      pageSize
    }
  })
}

const JournalApi = {
  getJournals,
  getJournalsCnt,
  getJournal,
  getArticles
}

export default JournalApi
