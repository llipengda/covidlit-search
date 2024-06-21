import axios from 'axios'

const sendCode = async (email: string) => {
  return axios.post(`/codes?email=${email}`)
}

const CodeApi = {
  sendCode
}

export default CodeApi
