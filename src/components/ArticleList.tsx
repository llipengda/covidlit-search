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
import AuthorApi from '@/api/Author'
import JournalApi from '@/api/Journal'
import ArticleListItem from '@/components/ArticleListItem'
import type Article from '@/types/Article'
import type ArticleSearchBy from '@/types/ArticleSearchBy'

type ArticleListProps =
  | {
      sortBy: string
      search: string
      searchBy: ArticleSearchBy
      total: number
      allowNoUrl: boolean
      loading: boolean
      setTotal: (total: number) => void
      setLoading: (loading: boolean) => void
      getFromType: 'search'
      getFrom?: never
      desc?: boolean
      refine?: string
      from?: string
      to?: string
    }
  | {
      desc?: boolean
      sortBy?: string
      search?: string
      searchBy?: ArticleSearchBy
      allowNoUrl?: boolean
      total?: number
      loading: boolean
      setTotal?: (total: number) => void
      setLoading: (loading: boolean) => void
      getFromType: 'journal' | 'author'
      getFrom: string
      refine?: never
      from?: never
      to?: never
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
  setLoading,
  getFromType,
  getFrom,
  sortBy = 'publish_time',
  desc = true,
  refine,
  from,
  to
}) => {
  const [articles, setArticles] = useState<Article[]>([])
  const [index, setIndex] = useState(1)

  useEffect(() => {
    if (getFromType === 'search') {
      setArticles([])
      Promise.all([
        ArticleApi.getArticlesCnt(
          search,
          searchBy,
          allowNoUrl,
          refine,
          from,
          to
        ).then(res => setTotal(res.data)),
        ArticleApi.getArticles(
          1,
          pageSize,
          search,
          searchBy,
          sortBy,
          desc,
          allowNoUrl,
          refine,
          from,
          to
        ).then(res => setArticles(res.data))
      ]).then(
        () => setLoading(false),
        () => setLoading(false)
      )
    } else if (getFromType === 'journal') {
      JournalApi.getArticles(getFrom, 1, pageSize).then(res => {
        setArticles(res.data)
        setLoading && setLoading(false)
      })
    } else {
      AuthorApi.getArticles(getFrom, 1, pageSize).then(res => {
        setArticles(res.data)
        setLoading && setLoading(false)
      })
    }
  }, [
    search,
    searchBy,
    setTotal,
    setLoading,
    allowNoUrl,
    getFromType,
    getFrom,
    sortBy,
    desc,
    refine,
    from,
    to
  ])

  return (
    <Box>
      <List>
        {!loading ? (
          articles.map(article => (
            <ListItem key={article.id + article.journalName}>
              <ArticleListItem
                article={article}
                keywords={search ? [search] : []}
                searchBy={searchBy ?? 1}
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
        {(total === undefined || total > pageSize) && (
          <Pagination
            variant='outlined'
            color='primary'
            sx={{
              mt: '40px'
            }}
            count={total ? Math.ceil(total / pageSize) : NaN}
            page={index}
            onChange={(_, page) => {
              window.scrollTo(0, 0)
              setIndex(page)
              setLoading(true)
              setArticles([])
              if (getFromType === 'search') {
                ArticleApi.getArticles(
                  page,
                  pageSize,
                  search,
                  searchBy,
                  sortBy,
                  desc,
                  allowNoUrl,
                  refine,
                  from,
                  to
                ).then(
                  res => {
                    setArticles(res.data)
                    setLoading(false)
                  },
                  () => setLoading(false)
                )
              } else if (getFromType === 'journal') {
                JournalApi.getArticles(getFrom, page, pageSize).then(
                  res => {
                    setArticles(res.data)
                    setLoading && setLoading(false)
                  },
                  () => setLoading && setLoading(false)
                )
              } else {
                AuthorApi.getArticles(getFrom, page, pageSize).then(
                  res => {
                    setArticles(res.data)
                    setLoading && setLoading(false)
                  },
                  () => setLoading && setLoading(false)
                )
              }
            }}
          />
        )}
      </Box>
    </Box>
  )
}

export default React.memo(ArticleList)
