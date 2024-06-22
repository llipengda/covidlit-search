import { useLocation, useNavigate } from 'react-router-dom'

export const useFromLink = () => {
  const location = useLocation()
  return (to: string) => {
    if (to.includes(location.pathname)) {
      return to
    }
    if (to.includes('?')) {
      return `${to}&from=${location.pathname}`
    }
    return `${to}?from=${location.pathname}`
  }
}

const useFromNavigate = () => {
  const navigate = useNavigate()
  const fromLink = useFromLink()
  return (to: string) => navigate(fromLink(to))
}

export default useFromNavigate
