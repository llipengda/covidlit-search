import { Container, Skeleton } from '@mui/material'

const Loading = () => {
  return (
    <Container maxWidth='xl'>
      <Skeleton height='200px' animation='wave' />
      <Skeleton height='600px' animation={false} />
    </Container>
  )
}

export default Loading
