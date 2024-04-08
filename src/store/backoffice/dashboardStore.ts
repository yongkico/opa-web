import { DataResponse } from '@/@types'
import { Dashboard } from '@/@types/Dashboard'
import { create } from 'zustand'

type DashboardStore = {
    isFetching: boolean
    setIsFetching: (isFetching: boolean) => void
    dashboard: DataResponse<Dashboard>
    setDashboard: (dashboard: DataResponse<Dashboard>) => void
}

export const dashboardStore = create<DashboardStore>()((set) => ({
    isFetching: false,
    setIsFetching: (isFetching: boolean) => set({ isFetching }),
    dashboard: {} as DataResponse<Dashboard>,
    setDashboard: (dashboard: DataResponse<Dashboard>) => set({ dashboard }),
}))
