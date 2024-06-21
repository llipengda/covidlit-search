import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import logger from '@/utils/logMiddleware'

type tokenStore = {
  token: string | undefined
  setToken: (token: string) => void
  removeToken: () => void
}

const useTokenStore = create<tokenStore>()(
  persist(
    logger(
      set => ({
        token: undefined as string | undefined,
        setToken: token => set({ token }),
        removeToken: () => set({ token: undefined })
      }),
      'tokenStore'
    ),
    {
      name: 'token-store',
      storage: createJSONStorage(() => localStorage)
    }
  )
)

export default useTokenStore
