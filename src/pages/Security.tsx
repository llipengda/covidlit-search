import { Link } from 'react-router-dom'

import { Box, Button, Typography, styled } from '@mui/material'

const Times = styled('span')({
  fontFamily: 'Times New Roman'
})

const Security = () => {
  return (
    <Box ml='120px' mt='40px'>
      <Typography variant='h4' sx={{ mt: '20px' }}>
        <Times>Security</Times>
      </Typography>
      <Link to='/reset-password'>
        <Button variant='contained' color='primary' sx={{ mt: '20px' }}>
          Reset Password
        </Button>
      </Link>
    </Box>
  )
}

export default Security
