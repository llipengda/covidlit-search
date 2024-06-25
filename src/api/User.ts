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

const updatePasswordByCode = async (
  email: string,
  code: string,
  password: string
) => {
  const formData = new FormData()
  formData.append('email', email)
  formData.append('code', code)
  formData.append('newPwd', password)

  return axios.put<User>('/user/update-password', formData, {
    headers: {
      'Content-Type': 'mutipart/form-data'
    }
  })
}

const updatePasswordByPassword = async (
  email: string,
  oldPwd: string,
  newPwd: string
) => {
  const formData = new FormData()
  formData.append('email', email)
  formData.append('oldPwd', oldPwd)
  formData.append('newPwd', newPwd)

  return axios.put<User>('/user/update-password', formData, {
    headers: {
      'Content-Type': 'mutipart/form-data'
    }
  })
}

const UserApi = {
  login,
  signup,
  updatePasswordByCode,
  updatePasswordByPassword
}

export default UserApi
