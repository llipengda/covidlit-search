import axios from 'axios'

const noAuth = async () => {
  await axios.get('/test/no-auth')
}

const auth = async () => {
  await axios.get('/test/auth')
}

const TestApi = {
  noAuth,
  auth
}

export default TestApi
