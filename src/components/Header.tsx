import React from 'react'

import { AppBar, Box, Button } from '@mui/material'

import Logo from '@/assets/logo.svg?react'

const Header = () => {
  return (
    <AppBar
      position='fixed'
      sx={{
        w: '100vw',
        minHeight: '80px',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        pl: 2,
        pr: 2,
        boxShadow: 'none',
        borderBottom: '1px solid rgba(0, 0, 0, 0.3)'
      }}
      color='secondary'
    >
      <Logo />
      <Box sx={{ display: 'inline' }}>
        <Button variant='outlined' sx={{ mr: 2 }}>
          Register
        </Button>
        <Button variant='contained'>Log in</Button>
      </Box>
    </AppBar>
  )
}

export default React.memo(Header)
