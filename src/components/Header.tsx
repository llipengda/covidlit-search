import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import LogoutIcon from '@mui/icons-material/Logout'
import PersonIcon from '@mui/icons-material/Person'
import SecurityIcon from '@mui/icons-material/Security'
import StarIcon from '@mui/icons-material/Star'
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography
} from '@mui/material'

import Logo from '@/assets/logo.svg?react'
import SearchBox from '@/components/SearchBox'
import { useFromLink } from '@/hooks/useFromNavigate'
import useTokenStore from '@/stores/tokenStore'
import useUserStore from '@/stores/userStore'
import Message from '@/utils/message'

const Header = () => {
  const fromLink = useFromLink()

  const needLogin = useTokenStore(state => !state.token)
  const userName = useUserStore(state => state.nickname)
  const removeToken = useTokenStore(state => state.removeToken)

  const location = useLocation()

  const navigate = useNavigate()

  const canSearch = () =>
    location.pathname.includes('/search') ||
    location.pathname.includes('/article') ||
    location.pathname.includes('/journal') ||
    location.pathname.includes('/author')

  const [focused, setFocused] = useState(false)

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
      <Box display='flex' alignItems='center' width='70%'>
        <Link to='/home' title='Home page' style={{ marginTop: '10px' }}>
          <Logo />
        </Link>
        {canSearch() && <SearchBox position='relative' />}
      </Box>
      {needLogin ? (
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
      ) : (
        <Box position='relative' onMouseLeave={() => setFocused(false)}>
          <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            pr='10px'
            onMouseEnter={() => setFocused(true)}
            sx={{
              cursor: 'pointer',
              transition: 'all 0.1s ease-in-out',
              padding: '10px',
              borderRadius: '5px',
              '&:hover': {
                bgcolor: 'primary.light'
              }
            }}
          >
            <Avatar>
              <PersonIcon />
            </Avatar>
            <Typography variant='body1' ml='10px'>
              <b>{userName}</b>
            </Typography>
          </Box>
          <Box
            position='absolute'
            left='50%'
            sx={{
              transform: 'translateX(-50%)'
            }}
          >
            <Collapse
              in={focused}
              orientation='vertical'
              timeout={150}
              easing='ease-in-out'
            >
              <Paper elevation={3}>
                <List
                  sx={{
                    bgcolor: 'secondary.main',
                    mt: '20px',
                    transition: 'all 0.5s ease-in-out'
                  }}
                >
                  <ListItemButton onClick={() => navigate(`/user/profile`)}>
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText>Profile</ListItemText>
                  </ListItemButton>
                  <ListItemButton onClick={() => navigate(`/user/collection`)}>
                    <ListItemIcon>
                      <StarIcon />
                    </ListItemIcon>
                    <ListItemText>Collection</ListItemText>
                  </ListItemButton>
                  <ListItemButton onClick={() => navigate(`/user/security`)}>
                    <ListItemIcon>
                      <SecurityIcon />
                    </ListItemIcon>
                    <ListItemText>Security</ListItemText>
                  </ListItemButton>
                  <ListItemButton
                    onClick={() => {
                      Message.info('Log out successfully', 5000)
                      removeToken()
                    }}
                  >
                    <ListItemIcon>
                      <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText>Log out</ListItemText>
                  </ListItemButton>
                </List>
              </Paper>
            </Collapse>
          </Box>
        </Box>
      )}
    </AppBar>
  )
}

export default React.memo(Header)
