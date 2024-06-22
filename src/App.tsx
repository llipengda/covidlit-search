import { Analytics } from '@vercel/analytics/react'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Main from '@/components/Main'

const App = () => {
  return (
    <>
      <Analytics />
      <Header />
      <Main />
      <Footer />
    </>
  )
}

export default App
