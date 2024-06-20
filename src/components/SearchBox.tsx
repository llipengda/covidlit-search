import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import SearchIcon from '@mui/icons-material/Search'
import { Box, InputBase } from '@mui/material'

const SearchBox: typeof Box = (props: { [key: string]: any }) => {
  const navigate = useNavigate()
  const [value, setValue] = useState('')

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      navigate(`/search?q=${value}`)
    }
  }

  return (
    <Box
      width='70%'
      height='50px'
      border='1px solid #ddd'
      bgcolor='secondary.main'
      {...props}
    >
      <InputBase
        fullWidth
        placeholder='Search articles, journals, and authors...'
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={onKeyDown}
        sx={{ lineHeight: '50px', height: '100%' }}
      />
      <SearchIcon
        sx={{
          position: 'absolute',
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          mr: '10px'
        }}
      />
    </Box>
  )
}

export default React.memo(SearchBox)
