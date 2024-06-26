import { Box, Typography, styled } from '@mui/material'

import HighlightText from '@/components/HighlightText'
import type Journal from '@/types/Journal'
import maxLength from '@/utils/maxLength'

interface JournalListItemProps {
  journal: Journal
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

const JournalListItem: React.FC<JournalListItemProps> = ({
  journal,
  keywords
}) => {
  return (
    <Box display='flex' width='100%' mb='20px'>
      <Box width='80%' mr='40px'>
        <Typography variant='h5'>
          <Upper>
            <Times>
              <HighlightText text={journal.name} keywords={keywords} />
            </Times>
          </Upper>
        </Typography>
        {journal.description && (
          <Typography variant='body1' color='GrayText' ml='20px'>
            <Roboto>
              <i>{maxLength(500)(journal.description)}</i>
            </Roboto>
          </Typography>
        )}
      </Box>
    </Box>
  )
}

export default JournalListItem
