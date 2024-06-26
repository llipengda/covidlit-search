import { Box, Button } from '@mui/material'

import Image404 from '@/assets/404.png'
import { Link } from 'react-router-dom'

const Page404 = () => {
  return (
    <Box display='flex' alignItems='center' justifyContent='center'>
      <Box component='img' src={Image404} width='40%' />
      <Box display='flex' flexDirection='column' alignItems='center'>
        <Box fontSize='40px' fontWeight='bold'>
          404
        </Box>
        <Box fontSize='20px'>Page not found</Box>
        <Link to='/'>
          <Button variant='contained' color='primary' sx={{mt: '20px'}}>
            Back to Home
          </Button>
        </Link>
        </Box>
    </Box>
  )
}

export default Page404
