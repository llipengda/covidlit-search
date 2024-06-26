import React, { useEffect, useState } from 'react'

import { Box, List, ListItem, Pagination } from '@mui/material'

import AuthorApi from '@/api/Author'
import AuthorListItem from '@/components/AuthorListItem'
import type Author from '@/types/Author'

interface AuthorListProps {
  search: string
  total: number
  setTotal: (total: number) => void
  setLoading: (loading: boolean) => void
}

const AuthorList: React.FC<AuthorListProps> = ({
  search,
  total,
  setTotal,
  setLoading
}) => {
  const pageSize = 20

  const [authors, setAuthors] = useState<Author[]>([])
  const [index, setIndex] = useState(1)

  useEffect(() => {
    Promise.all([
      AuthorApi.getAuthorsCnt(search).then(res => setTotal(res.data)),
      AuthorApi.getAuthors(search, 1, pageSize).then(res =>
        setAuthors(res.data)
      )
    ]).then(
      () => setLoading(false),
      () => setLoading(false)
    )
  }, [search, setTotal, setLoading])

  return (
    <Box>
      <List>
        {authors.map(author => (
          <ListItem key={author.name}>
            <AuthorListItem author={author} keywords={[search]} />
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
            AuthorApi.getAuthors(search, page, pageSize).then(
              res => {
                setAuthors(res.data)
                setLoading(false)
              },
              () => setLoading(false)
            )
          }}
        />
      </Box>
    </Box>
  )
}

export default React.memo(AuthorList)
