import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import type User from '@/types/User'
import logger from '@/utils/logMiddleware'

type UserStore = {
  nickname: string
  avatar?: string
  motto?: string
  collage?: string
  subscribeEmail?: boolean
  saveHistory?: boolean
  email: string
  setUser: (user: User) => void
}

const useUserStore = create<UserStore>()(
  persist(
    logger(
      set => ({
        nickname: '',
        email: '',
        avatar: undefined as string | undefined,
        motto: undefined as string | undefined,
        collage: undefined as string | undefined,
        subscribeEmail: false,
        saveHistory: true,
        setUser: user => set(user)
      }),
      'userStore'
    ),
    {
      name: 'user-store',
      storage: createJSONStorage(() => localStorage)
    }
  )
)

export default useUserStore
