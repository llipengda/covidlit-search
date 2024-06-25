import dayjs from 'dayjs'

const getDate = (dateString: string) => {
  const date = dayjs(dateString)
  if (date.month() === 0 && date.date() === 1) {
    return date.format('YYYY')
  }
  return date.format('YYYY-MM-DD')
}

export default getDate
