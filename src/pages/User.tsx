import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import PersonIcon from '@mui/icons-material/Person'
import SecurityIcon from '@mui/icons-material/Security'
import StarIcon from '@mui/icons-material/Star'
import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper
} from '@mui/material'

const Profile = () => {
  const location = useLocation()
  const path = location.pathname

  const navigate = useNavigate()
  const nav = (path: string) => () => navigate(`/user/${path}`)

  return (
    <Box>
      <Box
        width='100vw'
        display='flex'
        flexDirection='row'
        minHeight='calc(100vh - 120px)'
      >
        <Box width='15%' bgcolor='background.paper' p='15px'>
          <Paper elevation={0}>
            <List
              sx={{
                bgcolor: 'secondary.main',
                mt: '20px',
                transition: 'all 0.5s ease-in-out'
              }}
            >
              <ListItemButton
                selected={path.includes('profile')}
                onClick={nav('profile')}
              >
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText>Profile</ListItemText>
              </ListItemButton>
              <ListItemButton
                selected={path.includes('collection')}
                onClick={nav('collection')}
              >
                <ListItemIcon>
                  <StarIcon />
                </ListItemIcon>
                <ListItemText>Collection</ListItemText>
              </ListItemButton>
              <ListItemButton
                selected={path.includes('security')}
                onClick={nav('security')}
              >
                <ListItemIcon>
                  <SecurityIcon />
                </ListItemIcon>
                <ListItemText>Security</ListItemText>
              </ListItemButton>
            </List>
          </Paper>
        </Box>
        <Divider orientation='vertical' flexItem />
        <Box width='85%' p='40px' pt='20px'>
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}

export default Profile
