import { useState } from 'react'

import {
  Box,
  Button,
  FormControlLabel,
  Switch,
  TextField,
  Typography
} from '@mui/material'

import styled from '@emotion/styled'

import UserApi from '@/api/User'
import useUserStore from '@/stores/userStore'
import Message from '@/utils/message'

const Times = styled('span')({
  fontFamily: 'Times New Roman'
})

const Profile = () => {
  const { nickname, motto, college, saveHistory } = useUserStore(state => ({
    nickname: state.nickname,
    motto: state.motto,
    college: state.collage,
    saveHistory: state.saveHistory
  }))

  const [newNickname, setNewNickname] = useState(nickname)
  const [newMotto, setNewMotto] = useState(motto)
  const [newCollege, setNewCollege] = useState(college)
  const [newSaveHistory, setNewSaveHistory] = useState(saveHistory)

  const handleSave = async () => {
    useUserStore.setState({
      nickname: newNickname,
      motto: newMotto,
      collage: newCollege,
      saveHistory: newSaveHistory
    })
    const user = useUserStore.getState()
    await UserApi.update({
      ...user,
      nickname: newNickname,
      motto: newMotto,
      collage: newCollege,
      saveHistory: newSaveHistory
    })
    Message.success('Profile updated', 2500)
  }

  return (
    <Box ml='120px' mt='40px'>
      <Typography variant='h4'>
        <Times>Profile</Times>
      </Typography>
      <Box
        mt='20px'
        display='flex'
        flexDirection='column'
        width='50%'
        gap='15px'
      >
        <TextField
          label='Nickname'
          value={newNickname}
          onChange={e => setNewNickname(e.target.value)}
        />
        <TextField
          label='Motto'
          multiline
          minRows={4}
          value={newMotto}
          onChange={e => setNewMotto(e.target.value)}
        />
        <TextField
          label='College'
          value={newCollege}
          onChange={e => setNewCollege(e.target.value)}
        />
        <FormControlLabel
          control={
            <Switch
              defaultChecked={saveHistory}
              value={newSaveHistory}
              onChange={e => setNewSaveHistory(e.target.checked)}
            />
          }
          label='Save history'
        />
        <Button
          variant='contained'
          onClick={handleSave}
          sx={{ width: '120px' }}
        >
          Save
        </Button>
      </Box>
    </Box>
  )
}

export default Profile
