import axios from 'axios'

import User, { type UserWithToken } from '@/types/User'

const login = async (email: string, password: string) => {
  const formData = new FormData()
  formData.append('email', email)
  formData.append('password', password)

  return axios.post<UserWithToken>('/user/login', formData, {
    headers: {
      'Content-Type': 'mutipart/form-data'
    }
  })
}

const signup = async (email: string, password: string, code: string) => {
  const formData = new FormData()
  formData.append('email', email)
  formData.append('password', password)
  formData.append('code', code)

  return axios.post<User>('/user/signup', formData, {
    headers: {
      'Content-Type': 'mutipart/form-data'
    }
  })
}

const UserApi = {
  login,
  signup
}

export default UserApi
