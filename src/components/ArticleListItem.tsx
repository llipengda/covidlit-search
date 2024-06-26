import { Link } from 'react-router-dom'

import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { Box, Button, Typography, styled } from '@mui/material'

import HighlightText from '@/components/HighlightText'
import type Article from '@/types/Article'
import ArticleSearchBy from '@/types/ArticleSearchBy'
import getDate from '@/utils/getDate'
import maxLength from '@/utils/maxLength'

interface ArticleListItemProps {
  article: Article
  keywords: string[]
  searchBy: ArticleSearchBy
}

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

const ArticleListItem: React.FC<ArticleListItemProps> = ({
  article,
  keywords,
  searchBy
}) => {
  const authors = article.authors?.split(';').map(a => a.trim()) ?? []

  return (
    <Box display='flex' width='100%' mb='30px'>
      <Box width='80%' mr='40px'>
        <Typography variant='h5'>
          <Upper>
            <Times>
              <HighlightText
                text={article.title}
                keywords={keywords}
                disabled={!(searchBy & ArticleSearchBy.title)}
              />
            </Times>
          </Upper>
        </Typography>
        {article.authors && (
          <Typography variant='body1'>
            <YaHei>
              {authors.map((author, index) => (
                <span key={index}>
                  <Underline>
                    <HighlightText
                      text={author}
                      keywords={keywords}
                      disabled={!(searchBy & ArticleSearchBy.author)}
                    />
                  </Underline>
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
                <HighlightText
                  text={article.journalName}
                  keywords={keywords}
                  disabled={!(searchBy & ArticleSearchBy.journal)}
                />
                {article.volume && ` ${article.volume}`}
                {article.pages && ` ${article.pages}`}
                {article.publishTime && ` (${getDate(article.publishTime)})`}
              </i>
            </Roboto>
          </Typography>
        )}
        {article.abstract && (
          <Typography variant='body1' color='GrayText' ml='20px'>
            <Roboto>
              <i>{maxLength(500)(article.abstract)}</i>
            </Roboto>
          </Typography>
        )}
      </Box>
      <Box width='20%'>
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
  )
}

export default ArticleListItem
