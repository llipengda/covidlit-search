import React, { useEffect, useState } from 'react'

import { Box, List, ListItem, Pagination } from '@mui/material'

import JournalApi from '@/api/Journal'
import JournalListItem from '@/components/JournalListItem'
import type Journal from '@/types/Journal'

interface JournalListProps {
  search: string
  total: number
  setTotal: (total: number) => void
  setLoading: (loading: boolean) => void
}

const JournalList: React.FC<JournalListProps> = ({
  search,
  total,
  setTotal,
  setLoading
}) => {
  const pageSize = 20

  const [journals, setJournals] = useState<Journal[]>([])
  const [index, setIndex] = useState(1)

  useEffect(() => {
    Promise.all([
      JournalApi.getJournalsCnt(search).then(res => setTotal(res.data)),
      JournalApi.getJournals(search, 1, pageSize).then(res =>
        setJournals(res.data)
      )
    ]).then(() => setLoading(false))
  }, [search, setTotal, setLoading])

  return (
    <Box>
      <List>
        {journals.map(article => (
          <ListItem key={article.name}>
            <JournalListItem journal={article} keywords={[search]} />
          </ListItem>
        ))}
      </List>
      <Box
        width='80%'
        display='flex'
        flexDirection='column'
        alignItems='center'
      >
        <Pagination
          variant='outlined'
          color='primary'
          sx={{
            mt: '40px'
          }}
          count={Math.ceil(total / pageSize)}
          page={index}
          onChange={(_, page) => {
            window.scrollTo(0, 0)
            setIndex(page)
            setLoading(true)
            JournalApi.getJournals(search, page, pageSize).then(res => {
              setJournals(res.data)
              setLoading(false)
            })
          }}
        />
      </Box>
    </Box>
  )
}

export default React.memo(JournalList)
