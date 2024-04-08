import { DataResponse } from '@/@types'
import { Statistics } from '@/@types/Statistics'
import { create } from 'zustand'

type StatisticsStore = {
    isFetching: boolean
    setIsFetching: (isFetching: boolean) => void
    statistics: DataResponse<Statistics>
    setStatistics: (statistics: DataResponse<Statistics>) => void
}

export const statisticsStore = create<StatisticsStore>()((set) => ({
    isFetching: false,
    setIsFetching: (isFetching: boolean) => set(() => ({ isFetching })),
    statistics: {} as DataResponse<Statistics>,
    setStatistics: (statistics: DataResponse<Statistics>) => set(() => ({ statistics: statistics })),
}))
