import { useState } from 'react'

import { Box, LinearProgress, Typography, styled } from '@mui/material'

import ArticleList from '@/components/ArticleList'

const Times = styled('span')({
  fontFamily: 'Times New Roman'
})

const History = () => {
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  return (
    <Box ml='120px' mt='40px'>
      {loading && <LinearProgress />}
      <Typography variant='h4' sx={{ mt: '20px' }}>
        <Times>History</Times>
      </Typography>
      <Typography variant='body1' color='GrayText'>
        <i>
          {typeof total === 'number' ? total : 0}{' '}
          {total > 1 ? 'histories' : 'history'} in total
        </i>
      </Typography>
      <Box>
        <ArticleList
          getFromType='history'
          getFrom=''
          total={total}
          setTotal={setTotal}
          loading={loading}
          setLoading={setLoading}
        />
      </Box>
    </Box>
  )
}

export default History
