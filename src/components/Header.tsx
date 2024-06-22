import React from 'react'
import { Link } from 'react-router-dom'

import { AppBar, Box, Button } from '@mui/material'

import Logo from '@/assets/logo.svg?react'
import { useFromLink } from '@/hooks/useFromNavigate'

const Header = () => {
  const fromLink = useFromLink()

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
      <Link to='/home' title='Home page' style={{ marginTop: '10px' }}>
        <Logo />
      </Link>
      <Box sx={{ display: 'inline' }}>
        <Link to={fromLink('/signup')}>
          <Button variant='outlined' sx={{ mr: 2 }}>
            Sign up
          </Button>
        </Link>
        <Link to={fromLink('/login')}>
          <Button variant='contained'>Log in</Button>
        </Link>
      </Box>
    </AppBar>
  )
}

export default React.memo(Header)
