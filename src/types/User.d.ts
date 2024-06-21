type User = {
  nickname: string
  avatar?: string
  motto?: string
  collage?: string
  subscribeEmail?: boolean
  saveHistory?: boolean
  email: string
}

export type UserWithToken = User & {
  token: string
}

export default User
