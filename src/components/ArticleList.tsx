import { useEffect, useState } from 'react'

import { Box, List, ListItem, Pagination } from '@mui/material'

import ArticleApi from '@/api/Article'
import ArticleListItem from '@/components/ArticleListItem'
import type Article from '@/types/Article'
import type ArticleSearchBy from '@/types/ArticleSearchBy'

interface ArticleListProps {
  search: string
  searchBy: ArticleSearchBy
  total: number
  setTotal: (total: number) => void
  setLoading: (loading: boolean) => void
}

const ArticleList: React.FC<ArticleListProps> = ({
  search,
  searchBy,
  total,
  setTotal,
  setLoading
}) => {
  const pageSize = 20

  const [articles, setArticles] = useState<Article[]>([])
  const [index, setIndex] = useState(1)

  useEffect(() => {
    Promise.all([
      ArticleApi.getArticlesCnt(search, searchBy).then(res => {
        setTotal(res.data)
        console.log('total ok')
      }),
      ArticleApi.getArticles(1, pageSize, search, searchBy).then(res => {
        setArticles(res.data)
        console.log('articles ok')
      })
    ]).then(() => setLoading(false))
  }, [search, searchBy, setTotal, setLoading])

  return (
    <Box>
      <List>
        {articles.map(article => (
          <ListItem key={article.id}>
            <ArticleListItem
              article={article}
              keywords={[search]}
              searchBy={searchBy}
            />
          </ListItem>
        ))}
      </List>
      <Box
        width='80%'
        display='flex'
        flexDirection='column'
        alignItems='center'
      >
        <Pagination
          sx={{
            mt: '40px'
          }}
          count={Math.ceil(total / pageSize)}
          page={index}
          onChange={(_, page) => {
            setIndex(page)
            setLoading(true)
            ArticleApi.getArticles(page, pageSize, search, searchBy).then(
              res => {
                setArticles(res.data)
                setLoading(false)
              }
            )
          }}
        />
      </Box>
    </Box>
  )
}

export default ArticleList
