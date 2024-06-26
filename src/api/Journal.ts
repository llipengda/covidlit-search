import axios from 'axios'

import type Journal from '@/types/Journal'

const getJournals = async (search: string, page: number, pageSize: number) => {
  return await axios.get<Journal[]>('/journals', {
    params: {
      search,
      page,
      pageSize
    }
  })
}

const getJournalsCnt = async (search: string) => {
  return await axios.get<number>('/journals/count', {
    params: {
      search
    }
  })
}

const getJournal = async (name: string) => {
  return await axios.get<Journal>(`/journals/${name}`)
}

const JournalApi = {
  getJournals,
  getJournalsCnt,
  getJournal
}

export default JournalApi
