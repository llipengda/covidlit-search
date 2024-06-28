import ArticleSearchBy from '@/types/ArticleSearchBy'

export type ArticleSearchByValue = ('Title' | 'Author' | 'Journal')

const getArray = (value: number): ArticleSearchByValue[] => {
  const res: ArticleSearchByValue[] = []
  if (value & ArticleSearchBy.title) {
    res.push('Title')
  }
  if (value & ArticleSearchBy.author) {
    res.push('Author')
  }
  if (value & ArticleSearchBy.journal) {
    res.push('Journal')
  }
  return res
}

const getNumber = (value: ArticleSearchByValue[]) => {
  let res = 0
  if (value.includes('Title')) {
    res |= ArticleSearchBy.title
  }
  if (value.includes('Author')) {
    res |= ArticleSearchBy.author
  }
  if (value.includes('Journal')) {
    res |= ArticleSearchBy.journal
  }
  return res
}

const SearchBy = {
  getArray,
  getNumber
}

export default SearchBy
