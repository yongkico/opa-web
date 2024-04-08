import { DataResponse } from '@/@types'
import { User } from '@/@types/Auth'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type UserStore = {
    loggedInUser: DataResponse<User>
    setLoggedInUser: (user: DataResponse<User>) => void
}

export const userStore = create<UserStore>()(
    persist(
        (set) => ({
            loggedInUser: {} as DataResponse<User>,
            setLoggedInUser: (user: DataResponse<User>) => set(() => ({ loggedInUser: user })),
        }),
        {
            name: 'user',
            storage: createJSONStorage(() => localStorage),
        },
    ),
)
