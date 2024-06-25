import ArticleSearchBy from '@/types/ArticleSearchBy'

const getArray = (value: number): ('title' | 'author' | 'journal')[] => {
  const res: ('title' | 'author' | 'journal')[] = []
  if (value & ArticleSearchBy.title) {
    res.push('title')
  }
  if (value & ArticleSearchBy.author) {
    res.push('author')
  }
  if (value & ArticleSearchBy.journal) {
    res.push('journal')
  }
  return res
}

const getNumber = (value: ('title' | 'author' | 'journal')[]) => {
  let res = 0
  if (value.includes('title')) {
    res |= ArticleSearchBy.title
  }
  if (value.includes('author')) {
    res |= ArticleSearchBy.author
  }
  if (value.includes('journal')) {
    res |= ArticleSearchBy.journal
  }
  return res
}

const SearchBy = {
  getArray,
  getNumber
}

export default SearchBy
