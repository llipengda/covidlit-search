import React, { useEffect, useState } from 'react'

import {
  Box,
  Container,
  List,
  ListItem,
  Pagination,
  Skeleton
} from '@mui/material'

import ArticleApi from '@/api/Article'
import ArticleListItem from '@/components/ArticleListItem'
import type Article from '@/types/Article'
import type ArticleSearchBy from '@/types/ArticleSearchBy'

interface ArticleListProps {
  search: string
  searchBy: ArticleSearchBy
  total: number
  allowNoUrl: boolean
  loading: boolean
  setTotal: (total: number) => void
  setLoading: (loading: boolean) => void
}

const ArticleSkeleton = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        mt: '20px'
      }}
    >
      <Box width='80%'>
        <Box my={2}>
          <Skeleton variant='text' width='80%' />
          <Skeleton variant='text' width='60%' />
        </Box>
        <Box my={2}>
          <Skeleton variant='text' width='50%' />
          <Skeleton variant='text' width='30%' />
        </Box>
      </Box>
      <Box width='20%'>
        <Skeleton variant='rectangular' width='50%' height={40} />
      </Box>
    </Container>
  )
}

const pageSize = 10

const ArticleList: React.FC<ArticleListProps> = ({
  search,
  searchBy,
  total,
  allowNoUrl,
  loading,
  setTotal,
  setLoading
}) => {
  const [articles, setArticles] = useState<Article[]>([])
  const [index, setIndex] = useState(1)

  useEffect(() => {
    setArticles([])
    Promise.all([
      ArticleApi.getArticlesCnt(search, searchBy, allowNoUrl).then(res =>
        setTotal(res.data)
      ),
      ArticleApi.getArticles(1, pageSize, search, searchBy, allowNoUrl).then(
        res => setArticles(res.data)
      )
    ]).then(
      () => setLoading(false),
      () => setLoading(false)
    )
  }, [search, searchBy, setTotal, setLoading, allowNoUrl])

  return (
    <Box>
      <List>
        {!loading ? (
          articles.map(article => (
            <ListItem key={article.id + article.journalName}>
              <ArticleListItem
                article={article}
                keywords={[search]}
                searchBy={searchBy}
              />
            </ListItem>
          ))
        ) : (
          <>
            <ArticleSkeleton />
            <ArticleSkeleton />
            <ArticleSkeleton />
            <ArticleSkeleton />
            <ArticleSkeleton />
          </>
        )}
      </List>
      <Box
        width='80%'
        display='flex'
        flexDirection='column'
        alignItems='center'
      >
        <Pagination
          variant='outlined'
          color='primary'
          sx={{
            mt: '40px'
          }}
          count={Math.ceil(total / pageSize)}
          page={index}
          onChange={(_, page) => {
            window.scrollTo(0, 0)
            setIndex(page)
            setLoading(true)
            setArticles([])
            ArticleApi.getArticles(page, pageSize, search, searchBy).then(
              res => {
                setArticles(res.data)
                setLoading(false)
              },
              () => setLoading(false)
            )
          }}
        />
      </Box>
    </Box>
  )
}

export default React.memo(ArticleList)
