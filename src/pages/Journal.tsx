import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Typography,
  styled
} from '@mui/material'

import JournalApi from '@/api/Journal'
import ArticleList from '@/components/ArticleList'
import TJournal from '@/types/Journal'

const Roboto = styled('span')({
  fontFamily: 'Roboto'
})

const Times = styled('span')({
  fontFamily: 'Times New Roman'
})

const Upper = styled('span')({
  textTransform: 'uppercase'
})

const Journal = () => {
  const name = useParams()['name']!

  const [journal, setJournal] = useState<TJournal | null>(null)

  useEffect(() => {
    JournalApi.getJournal(name).then(res => setJournal(res.data))
  }, [name])

  if (!journal) {
    return null
  }

  return (
    <Box mb='40px'>
      <Container maxWidth='xl' sx={{ mt: '40px' }}>
        <Typography variant='h3'>
          <Upper>
            <Times>{journal.name}</Times>
          </Upper>
        </Typography>
        <Box mt='20px'>
          {journal.description && (
            <Typography variant='body1' color='GrayText'>
              <Roboto>
                <i>{journal.description}</i>
              </Roboto>
            </Typography>
          )}
        </Box>
        <Box mt='40px'>
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <b>Articles</b>
            </AccordionSummary>
            <AccordionDetails>
              <ArticleList getFromType='journal' getFrom={name} />
            </AccordionDetails>
          </Accordion>
        </Box>
      </Container>
    </Box>
  )
}

export default Journal
