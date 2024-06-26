import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  LinearProgress,
  Typography,
  styled
} from '@mui/material'

import AuthorApi from '@/api/Author'
import ArticleList from '@/components/ArticleList'
import TAuthor from '@/types/Author'

const Roboto = styled('span')({
  fontFamily: 'Roboto'
})

const Times = styled('span')({
  fontFamily: 'Times New Roman'
})

const Upper = styled('span')({
  textTransform: 'uppercase'
})

const Author = () => {
  const name = useParams()['name']!

  const [author, setAuthor] = useState<TAuthor | null>(null)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    AuthorApi.getAuthor(name).then(res => setAuthor(res.data))
  }, [name])

  if (!author) {
    return null
  }

  return (
    <Box mb='40px'>
      <Container maxWidth='xl' sx={{ mt: '40px' }}>
        <Typography variant='h3'>
          <Upper>
            <Times>{author.name}</Times>
          </Upper>
        </Typography>
        <Box mt='20px'>
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
        <Box mt='40px'>
          {author.email && (
            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <b>Email</b>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant='body1'>{author.email}</Typography>
              </AccordionDetails>
            </Accordion>
          )}
          {author.institution && (
            <Accordion defaultExpanded={!author.email}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <b>Institution</b>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant='body1'>{author.institution}</Typography>
              </AccordionDetails>
            </Accordion>
          )}
          {author.lab && (
            <Accordion defaultExpanded={!author.email && !author.institution}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <b>Lab</b>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant='body1'>{author.lab}</Typography>
              </AccordionDetails>
            </Accordion>
          )}
          {author.settlement && (
            <Accordion
              defaultExpanded={
                !author.email && !author.institution && !author.lab
              }
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <b>Settlement</b>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant='body1'>
                  {author.postCode && <i> {author.postCode}</i>}
                  {author.settlement && <i> {author.settlement}</i>}
                  {author.country && <i> {author.country}</i>}
                </Typography>
              </AccordionDetails>
            </Accordion>
          )}
          {loading && <LinearProgress />}
          <Accordion
            defaultExpanded={
              !author.email &&
              !author.institution &&
              !author.lab &&
              !author.settlement
            }
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <b>Articles</b>
            </AccordionSummary>
            <AccordionDetails>
              <ArticleList
                getFromType='author'
                getFrom={name}
                loading={loading}
                setLoading={setLoading}
              />
            </AccordionDetails>
          </Accordion>
        </Box>
      </Container>
    </Box>
  )
}

export default Author
