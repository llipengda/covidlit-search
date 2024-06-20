import { Box, Container, Typography } from '@mui/material'

import home from '@/assets/home.png'
import SearchBox from '@/components/SearchBox'

const Home = () => {
  return (
    <Box width='100vw'>
      <Container maxWidth='xl' sx={{ marginTop: '80px' }}>
        <Typography variant='h2' fontFamily='Times New Roman'>
          Explore the world's insights to conquer global challenges
        </Typography>
        <SearchBox
          mt='20px'
          zIndex={1}
          pl='15px'
          pr='40px'
          sx={{
            transform: 'translateY(50%)'
          }}
        />
      </Container>
      <Box
        component='img'
        src={home}
        alt='home image'
        boxSizing='border-box'
        width='100%'
      />
    </Box>
  )
}

export default Home
