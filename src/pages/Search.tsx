import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import SearchIcon from '@mui/icons-material/Search'
import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  TextField,
  Typography,
  styled
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'

import ArticleList from '@/components/ArticleList'

const Times = styled('span')({
  fontFamily: 'Times New Roman'
})

const Search = () => {
  const search = useSearchParams()[0].get('q')!
  const type = useSearchParams()[0].get('type')!
  const searchBy = parseInt(useSearchParams()[0].get('searchBy') || '1')
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    setTotal(0)
  }, [search, searchBy, type])

  const handleSetTotal = useCallback((total: number) => {
    setTotal(total)
  }, [])

  const handleLoad = useCallback((value: boolean) => {
    setLoading(value)
  }, [])

  return (
    <Box>
      {loading && <LinearProgress />}
      <Box
        width='100vw'
        display='flex'
        flexDirection='row'
        minHeight='calc(100vh - 120px)'
      >
        <Box width='15%' bgcolor='background.paper' p='15px'>
          <Typography variant='h5'>
            <Times>Refine Result</Times>
          </Typography>
          <Box
            bgcolor='secondary.main'
            mt='10px'
            position='relative'
            display='flex'
            alignItems='center'
          >
            <TextField
              size='small'
              fullWidth
              placeholder='Search within results...'
            />
            <SearchIcon
              sx={{
                position: 'absolute',
                color: 'GrayText',
                right: '5px',
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer'
              }}
            />
          </Box>
          <Divider flexItem sx={{ mt: '20px', mb: '10px' }} />
          <Box>
            <Typography variant='h5'>
              <Times>Date</Times>
            </Typography>
            <Typography variant='h6'>
              <Times>From</Times>
            </Typography>
            <DatePicker
              sx={{ mt: '10px', mb: '10px' }}
              slotProps={{
                textField: {
                  size: 'small'
                }
              }}
            />
            <Typography variant='h6'>
              <Times>To</Times>
            </Typography>
            <DatePicker
              sx={{ mt: '10px', mb: '10px' }}
              slotProps={{
                textField: {
                  size: 'small'
                }
              }}
            />
            <Button variant='contained' sx={{ top: '10px' }}>
              Apply
            </Button>
          </Box>
        </Box>
        <Divider orientation='vertical' flexItem />
        <Box width='85%' p='40px' pt='20px'>
          <Typography variant='h5'>
            <Times>{total} Results</Times>
          </Typography>
          <FormControl size='small' sx={{ width: '10%', mt: '15px' }}>
            <InputLabel>Sort by</InputLabel>
            <Select label='Sort by' defaultValue={0}>
              <MenuItem value={0}>None</MenuItem>
              <MenuItem value={1}>Title</MenuItem>
              <MenuItem value={2}>Author</MenuItem>
              <MenuItem value={4}>Journal</MenuItem>
            </Select>
          </FormControl>
          <Box mt='20px'>
            {type === 'article' && (
              <ArticleList
                search={search}
                searchBy={searchBy}
                total={total}
                setTotal={handleSetTotal}
                setLoading={handleLoad}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Search
