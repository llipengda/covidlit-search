import { useSearchParams } from 'react-router-dom'

import { Container } from '@mui/material'

const Search = () => {
  const search = useSearchParams()[0].get('q')
  const type = useSearchParams()[0].get('type')

  return (
    <Container maxWidth='xl'>
      search string: {search}
      <br />
      search type: {type}
    </Container>
  )
}

export default Search
