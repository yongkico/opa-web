import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type AvatarStore = {
    avatar: string
    setAvatar: (avatar: string) => void
}

export const avatarStore = create<AvatarStore>()(
    persist(
        (set) => ({
            avatar: '',
            setAvatar: (avatar: string) => set({ avatar }),
        }),
        {
            name: 'avatar',
            storage: createJSONStorage(() => localStorage),
        },
    ),
)
