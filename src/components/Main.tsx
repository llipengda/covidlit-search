import React, { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'

import { Box } from '@mui/material'

import Loading from '@/components/Loading'
import routes from '@/routes'

const Main = () => {
  const content = useRoutes(routes)
  return (
    <Box
      sx={{
        pt: '80px',
        minHeight: 'calc(100vh - 120px)',
        paddingLeft: 0,
        paddingRight: 0
      }}
    >
      <Suspense fallback={<Loading />}>{content}</Suspense>
    </Box>
  )
}

export default React.memo(Main)
