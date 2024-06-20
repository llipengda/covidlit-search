import React from 'react'

import { Box } from '@mui/material'

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
        width: '100vw',
        minHeight: '40px',
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      &copy; CovidLit Search {new Date().getFullYear()}
    </Box>
  )
}

export default React.memo(Footer)
