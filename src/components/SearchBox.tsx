import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import SearchIcon from '@mui/icons-material/Search'
import {
  Box,
  Collapse,
  InputBase,
  List,
  ListItemButton,
  Typography
} from '@mui/material'

import sleep from '@/utils/sleep'

const getType = (selectedBtn: number) => {
  switch (selectedBtn) {
    case 0:
      return 'article'
    case 1:
      return 'journal'
    case 2:
      return 'author'
    default:
      return 'article'
  }
}

const SearchBox: typeof Box = (props: { [key: string]: any }) => {
  const navigate = useNavigate()
  const q = useSearchParams()[0].get('q')
  const searchBy = parseInt(useSearchParams()[0].get('searchBy') || '1')
  const allowNoUrl = useSearchParams()[0].get('allowNoUrl') || false
  const type = useSearchParams()[0].get('type') || 'article'

  const [value, setValue] = useState(q)
  const [focused, setFocused] = useState(false)
  const [selectedBtn, setSelectedBtn] = useState(0)

  const [helperText, setHelperText] = useState('')

  const search = (index?: number) => () => {
    index && setSelectedBtn(index)
    navigate(
      `/search?q=${value}&type=${getType(index ?? selectedBtn)}&searchBy=${searchBy}&allowNoUrl=${allowNoUrl}&sortBy=publish_time&desc=true`
    )
    sleep(200).then(() => setFocused(false))
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!value || value.length < 3) {
      return
    }
    if (e.key === 'Enter') {
      !!value && search()()
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedBtn(prev => (prev + 1) % 3)
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedBtn(prev => (prev + 2) % 3)
    }
  }

  const isSelected = (index: number) => selectedBtn === index

  return (
    <Box
      width='80%'
      height='50px'
      border='1px solid #ddd'
      bgcolor='secondary.main'
      onMouseLeave={() => {
        setFocused(false)
        setSelectedBtn(type === 'article' ? 0 : type === 'journal' ? 1 : 2)
      }}
      {...props}
    >
      <InputBase
        fullWidth
        placeholder='Search articles, journals, and authors...'
        value={value}
        onFocus={() => setFocused(true)}
        onChange={e => {
          setFocused(true)
          if (e.target.value.length < 3) {
            setHelperText('Input at least 3 characters to search.')
          } else {
            setHelperText('')
          }
          if (e.target.value === '') {
            setHelperText('')
          }
          setValue(e.target.value)
        }}
        onKeyDown={onKeyDown}
        sx={{ lineHeight: '50px', height: '100%', ml: '15px', mr: '40px' }}
      />
      <Typography
        variant='body1'
        color='error'
        sx={{
          left: '45px',
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)'
        }}
      >
        {helperText}
      </Typography>
      <SearchIcon
        sx={{
          position: 'absolute',
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          mr: '10px'
        }}
      />
      <Collapse
        in={focused && !!value}
        orientation='vertical'
        timeout={250}
        easing='ease-in-out'
      >
        <List
          sx={{
            bgcolor: 'secondary.main',
            width: '100%',
            transition: 'all 0.5s ease-in-out'
          }}
        >
          <ListItemButton
            selected={isSelected(0)}
            onClick={search(0)}
            sx={{
              transition: 'all 0.1s ease',
              height: isSelected(0) ? '50px' : '40px',
              fontWeight: isSelected(0) ? 'bold' : 'normal'
            }}
          >
            Search article:&nbsp;<i>{value}</i>
          </ListItemButton>
          <ListItemButton
            selected={isSelected(1)}
            onClick={search(1)}
            sx={{
              transition: 'all 0.1s ease',
              height: isSelected(1) ? '50px' : '40px',
              fontWeight: isSelected(1) ? 'bold' : 'normal'
            }}
          >
            Search journal:&nbsp;<i>{value}</i>
          </ListItemButton>
          <ListItemButton
            selected={isSelected(2)}
            onClick={search(2)}
            sx={{
              transition: 'all 0.1s ease',
              height: isSelected(2) ? '50px' : '40px',
              fontWeight: isSelected(2) ? 'bold' : 'normal'
            }}
          >
            Search author:&nbsp;<i>{value}</i>
          </ListItemButton>
        </List>
      </Collapse>
    </Box>
  )
}

export default React.memo(SearchBox)
