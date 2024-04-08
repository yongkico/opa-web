import { DataResponse, Year } from '@/@types'
import { Variety } from '@/@types/Variety'
import { create } from 'zustand'

type GlobalStore = {
    isFetching: boolean
    setIsFetching: (isFetching: boolean) => void
    varieties: DataResponse<Variety[]>
    setVarieties: (varieties: DataResponse<Variety[]>) => void
    coordinate: {
        lat: string
        lng: string
    }
    setCoordinate: (coordinate: { lat: string; lng: string }) => void
    years: DataResponse<Year[]>
    setYears: (years: DataResponse<Year[]>) => void
}

export const globalStore = create<GlobalStore>()((set) => ({
    isFetching: false,
    setIsFetching: (isFetching: boolean) => set({ isFetching }),
    varieties: {} as DataResponse<Variety[]>,
    setVarieties: (varieties: DataResponse<Variety[]>) => set({ varieties }),
    coordinate: {
        lat: '',
        lng: '',
    },
    setCoordinate: (coordinate: { lat: string; lng: string }) => set({ coordinate }),
    years: {} as DataResponse<Year[]>,
    setYears: (years: DataResponse<Year[]>) => set({ years }),
}))
