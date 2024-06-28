import { Container, Skeleton } from '@mui/material'

const Loading = () => {
  return (
    <Container
      maxWidth='xl'
      sx={{ height: 'calc(100vh - 160px)', display: 'flex', gap: '20px', margin: '20px auto'}}
    >
      <Skeleton variant='rounded' height='100%' width='20%' animation={false} />
      <Skeleton variant='rounded' height='100%' width='80%' animation='wave' />
    </Container>
  )
}

export default Loading
