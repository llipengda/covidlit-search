import { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'

import { Container } from '@mui/material'

import routes from '@/routes'

const Main = () => {
  const content = useRoutes(routes)
  return (
    <Container
      maxWidth='xl'
      sx={{
        mt: '80px',
        minHeight: 'calc(100vh - 120px)',
      }}
    >
      <Suspense fallback={<div>Loading...</div>}>{content}</Suspense>
    </Container>
  )
}

export default Main
