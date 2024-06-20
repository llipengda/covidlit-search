import { useSearchParams } from 'react-router-dom'

import { Container } from '@mui/material'

const Search = () => {
  const search = useSearchParams()[0].get('q')

  return <Container maxWidth='xl'>{search}</Container>
}

export default Search
