import { DataResponse } from '@/@types'
import { AnnualRainfall, Rainfall } from '@/@types/Rainfall'
import { create } from 'zustand'

type RainfallStore = {
    isFetching: boolean
    setIsFetching: (isFetching: boolean) => void
    rainfalls: DataResponse<Rainfall[]>
    setRainfalls: (rainfalls: DataResponse<Rainfall[]>) => void
    annualRainfalls: DataResponse<AnnualRainfall[]>
    setAnnualRainfalls: (annualRainfalls: DataResponse<AnnualRainfall[]>) => void
}

export const rainfallStore = create<RainfallStore>()((set) => ({
    isFetching: false,
    setIsFetching: (isFetching: boolean) => set(() => ({ isFetching })),
    rainfalls: {} as DataResponse<Rainfall[]>,
    setRainfalls: (rainfalls: DataResponse<Rainfall[]>) => set(() => ({ rainfalls })),
    annualRainfalls: {} as DataResponse<AnnualRainfall[]>,
    setAnnualRainfalls: (annualRainfalls: DataResponse<AnnualRainfall[]>) => set(() => ({ annualRainfalls })),
}))
