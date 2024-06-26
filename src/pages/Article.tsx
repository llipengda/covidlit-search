import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  Link as MLink,
  Typography,
  styled
} from '@mui/material'

import ArticleApi from '@/api/Article'
import TArticle from '@/types/Article'
import getDate from '@/utils/getDate'

const Roboto = styled('span')({
  fontFamily: 'Roboto'
})

const Times = styled('span')({
  fontFamily: 'Times New Roman'
})

const YaHei = styled('span')({
  fontFamily: 'Microsoft YaHei'
})

const Upper = styled('span')({
  textTransform: 'uppercase'
})

const Underline = styled('span')({
  textDecoration: 'underline'
})

const Article = () => {
  const id = useParams()['id']!

  const [article, setArticle] = useState<TArticle | null>(null)
  const [cites, setCites] = useState<{ id: string; title: string }[]>([])

  useEffect(() => {
    ArticleApi.getArticle(id).then(res => setArticle(res.data))
    ArticleApi.getCites(id).then(res => setCites(res.data))
  }, [id])

  if (!article) {
    return null
  }

  const authors = article.authors?.split(';').map(a => a.trim()) ?? []

  return (
    <Box mb='40px'>
      <Container maxWidth='xl'>
        <Box display='flex' mt='40px' width='100%'>
          <Box width='80%'>
            <Typography variant='h5'>
              <Upper>
                <Times>{article.title}</Times>
              </Upper>
            </Typography>
            {article.authors && (
              <Typography variant='body1'>
                <YaHei>
                  {authors.map((author, index) => (
                    <span key={index}>
                      <Underline>{author}</Underline>
                      {index === authors.length - 1 ? '' : <>;&nbsp;&nbsp;</>}
                    </span>
                  ))}
                </YaHei>
              </Typography>
            )}
            {article.doi && (
              <Typography variant='body1' color='GrayText'>
                <Roboto>DOI: {article.doi}</Roboto>
              </Typography>
            )}
            {article.journalName && (
              <Typography variant='body1' color='GrayText'>
                <Roboto>
                  <i>
                    {article.journalName}
                    {article.volume && ` ${article.volume}`}
                    {article.pages && ` ${article.pages}`}
                    {article.publishTime &&
                      ` (${getDate(article.publishTime)})`}
                  </i>
                </Roboto>
              </Typography>
            )}
          </Box>
          <Box width='20%' display='flex' justifyContent='center'>
            {article.url && (
              <Link to={article.url.split(';')[0]} target='_blank'>
                <Button variant='contained'>
                  <OpenInNewIcon sx={{ mr: '10px' }} />
                  Visit
                </Button>
              </Link>
            )}
          </Box>
        </Box>
        <Box mt='20px'>
          {article.abstract && (
            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <b>Abstract</b>
              </AccordionSummary>
              <AccordionDetails>{article.abstract}</AccordionDetails>
            </Accordion>
          )}
          {article.journalName && (
            <Accordion defaultExpanded={!article.abstract}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <b>Journal</b>
              </AccordionSummary>
              <AccordionDetails>
                {article.journalName}
                {article.volume && ` ${article.volume}`}
                {article.pages && ` ${article.pages}`}
              </AccordionDetails>
            </Accordion>
          )}
          {article.publishTime && (
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <b>Publish Time</b>
              </AccordionSummary>
              <AccordionDetails>
                {getDate(article.publishTime)}
              </AccordionDetails>
            </Accordion>
          )}
          {article.license && (
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <b>License</b>
              </AccordionSummary>
              <AccordionDetails>{article.license}</AccordionDetails>
            </Accordion>
          )}
          {article.authors && (
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <b>Authors</b>
              </AccordionSummary>
              <AccordionDetails>
                {authors.map((author, index) => (
                  <Typography key={index}>{author}</Typography>
                ))}
              </AccordionDetails>
            </Accordion>
          )}
          {!!cites.length && (
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <b>Cites</b>
              </AccordionSummary>
              <AccordionDetails>
                {cites.map(cite => (
                  <Typography key={cite.id}>
                    <Link to={`/article/${cite.id}`}>
                      <MLink>{cite.title}</MLink>
                    </Link>
                  </Typography>
                ))}
              </AccordionDetails>
            </Accordion>
          )}
        </Box>
      </Container>
    </Box>
  )
}

export default Article
