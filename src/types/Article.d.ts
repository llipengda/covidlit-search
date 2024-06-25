type Article = {
  id: string
  title: string
  abstract?: string | null
  doi?: string | null
  license?: string | null
  publishTime?: string | null
  url?: string | null
  studyType?: string | null
  addressedPopulation?: string | null
  challenge?: string | null
  focus?: string | null
  authors?: string | null
  journalName?: string | null
  volume?: string | null
  pages?: string | null
}

export default Article
