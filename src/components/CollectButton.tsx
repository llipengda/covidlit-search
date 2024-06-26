import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import { Button } from '@mui/material'

import CollectApi from '@/api/Collect'
import useTokenStore from '@/stores/tokenStore'
import Message from '@/utils/message'

const CollectButton = ({ id }: { id: string }) => {
  const hasLogin = useTokenStore(state => !!state.token)

  const [collected, setCollected] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    setDisabled(true)
    if (hasLogin) {
      CollectApi.check(id).then(res => {
        setCollected(res.data)
      })
    }
    setDisabled(false)
  }, [hasLogin, id])

  const handleClick = async () => {
    if (!hasLogin) {
      Message.info('Please login first', 2500)
      navigate('/login')
      return
    }

    if (disabled) {
      return
    }

    setDisabled(true)
    if (collected) {
      await CollectApi.remove(id)
    } else {
      await CollectApi.add(id)
    }
    setDisabled(false)

    setCollected(!collected)
  }

  return (
    <Button
      variant={collected ? 'contained' : 'outlined'}
      sx={{ width: '120px', height: '40px' }}
      onClick={handleClick}
      disabled={disabled}
    >
      {collected ? (
        <StarIcon sx={{ mr: '10px' }} />
      ) : (
        <StarBorderIcon sx={{ mr: '10px' }} />
      )}
      {collected ? 'Remove' : 'Collect'}
    </Button>
  )
}

export default CollectButton
