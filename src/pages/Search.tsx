import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import SearchIcon from '@mui/icons-material/Search'
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  InputLabel,
  LinearProgress,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  type SelectChangeEvent,
  Switch,
  TextField,
  Typography,
  styled
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'

import ArticleList from '@/components/ArticleList'
import AuthorList from '@/components/AuthorList'
import JournalList from '@/components/JournalList'
import SearchBy from '@/utils/SearchBy'

const Times = styled('span')({
  fontFamily: 'Times New Roman'
})

const Search = () => {
  const search = useSearchParams()[0].get('q')!
  const type = useSearchParams()[0].get('type')!
  const [searchBy, setSearchBy] = useState(
    parseInt(useSearchParams()[0].get('searchBy') || '1')
  )
  const [allowNoUrl, setAllowNoUrl] = useState(
    useSearchParams()[0].get('allowNoUrl') === 'true'
  )

  const isArticle = type === 'article'

  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  const [searchByValue, setSearchByValue] = useState<
    ('title' | 'author' | 'journal')[]
  >(SearchBy.getArray(searchBy))
  const searchByOptions = ['title', 'author', 'journal'] as (
    | 'title'
    | 'author'
    | 'journal'
  )[]

  const handleChange = (event: SelectChangeEvent<typeof searchByValue>) => {
    const value = event.target.value
    setSearchByValue(
      typeof value === 'string'
        ? (value.split(',') as ('title' | 'author' | 'journal')[])
        : value
    )
  }

  const handleClose = () => {
    setLoading(true)
    setSearchBy(SearchBy.getNumber(searchByValue))
    window.history.pushState(
      null,
      '',
      `/search?q=${search}&type=${type}&searchBy=${SearchBy.getNumber(searchByValue)}&allowNoUrl=${allowNoUrl}`
    )
  }

  const handleSwitchChange = () => {
    setAllowNoUrl(!allowNoUrl)
    setLoading(true)
    window.history.pushState(
      null,
      '',
      `/search?q=${search}&type=${type}&searchBy=${searchBy}&allowNoUrl=${!allowNoUrl}`
    )
  }

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
          {isArticle && (
            <>
              <Divider flexItem sx={{ mt: '20px', mb: '10px' }} />
              <Box>
                <Typography variant='h5'>
                  <Times>Date</Times>
                </Typography>
                <Typography variant='h6'>
                  <Times>From</Times>
                </Typography>
                <DatePicker
                  format='YYYY-MM-DD'
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
                  format='YYYY-MM-DD'
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
            </>
          )}
        </Box>
        <Divider orientation='vertical' flexItem />
        <Box width='85%' p='40px' pt='20px'>
          <Typography variant='h5'>
            <Times>
              {typeof total === 'number' ? total.toLocaleString() : ''} Results
            </Times>
          </Typography>
          {isArticle && (
            <Box mt='15px' display='flex' alignItems='center'>
              <FormControl size='small' sx={{ width: '15%', mr: '20px' }}>
                <InputLabel>Search by</InputLabel>
                <Select
                  labelId='demo-multiple-checkbox-label'
                  id='demo-multiple-checkbox'
                  multiple
                  value={searchByValue}
                  onChange={handleChange}
                  input={<OutlinedInput label='Search by' />}
                  renderValue={selected => selected.join(', ')}
                  onClose={handleClose}
                >
                  {searchByOptions.map(s => (
                    <MenuItem key={s} value={s}>
                      <Checkbox checked={searchByValue.indexOf(s) > -1} />
                      <ListItemText primary={s} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl size='small' sx={{ width: '10%', mr: '20px' }}>
                <InputLabel>Sort by</InputLabel>
                <Select label='Sort by' defaultValue={0}>
                  <MenuItem value={0}>
                    <i>None</i>
                  </MenuItem>
                  <MenuItem value={1}>Title</MenuItem>
                  <MenuItem value={2}>Author</MenuItem>
                  <MenuItem value={4}>Journal</MenuItem>
                </Select>
              </FormControl>
              <FormControlLabel
                control={
                  <Switch checked={allowNoUrl} onChange={handleSwitchChange} />
                }
                label='Show inaccessible articles'
              />
            </Box>
          )}
          <Box mt='20px'>
            {type === 'article' ? (
              <ArticleList
                loading={loading}
                search={search}
                searchBy={searchBy}
                allowNoUrl={allowNoUrl}
                total={total}
                setTotal={handleSetTotal}
                setLoading={handleLoad}
              />
            ) : type === 'journal' ? (
              <JournalList
                search={search}
                total={total}
                setTotal={handleSetTotal}
                setLoading={handleLoad}
              />
            ) : (
              <AuthorList
                search={search}
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
