import { useNavigate } from 'react-router-dom'

import { Box, Typography, styled } from '@mui/material'

import HighlightText from '@/components/HighlightText'
import type Author from '@/types/Author'

interface AuthorListItemProps {
  author: Author
  keywords: string[]
}

const Times = styled('span')({
  fontFamily: 'Times New Roman'
})

const Roboto = styled('span')({
  fontFamily: 'Roboto'
})

const Upper = styled('span')({
  textTransform: 'uppercase'
})

const AuthorListItem: React.FC<AuthorListItemProps> = ({
  author,
  keywords
}) => {
  const navigate = useNavigate()

  return (
    <Box display='flex' width='100%' mb='20px'>
      <Box
        width='80%'
        mr='40px'
        onClick={() => navigate(`/author/${author.name}`)}
        sx={{ cursor: 'pointer' }}
      >
        <Typography variant='h5'>
          <Upper>
            <Times>
              <HighlightText text={author.name} keywords={keywords} />
            </Times>
          </Upper>
        </Typography>
        {author.email && (
          <Typography variant='body1' color='GrayText'>
            <Roboto>{author.email}</Roboto>
          </Typography>
        )}
        {author.institution && <>{author.institution}</>}
        <Typography variant='body1' color='GrayText'>
          <Roboto>
            {author.postCode && <i> {author.postCode}</i>}
            {author.settlement && <i> {author.settlement}</i>}
            {author.country && <i> {author.country}</i>}
          </Roboto>
        </Typography>
      </Box>
    </Box>
  )
}

export default AuthorListItem
