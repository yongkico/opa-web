import { DataResponse } from '@/@types'
import { Statistics } from '@/@types/Statistics'
import { findAll } from '@/modules/backoffice/statisticsModule'
import { statisticsStore } from '@/store/backoffice/statisticsStore'

export function useStatistics() {
    // global states
    const { setIsFetching, setStatistics } = statisticsStore()

    async function getStatistics(plantation_id: string, year: string) {
        setIsFetching(true)

        try {
            const res = await findAll(plantation_id, year)

            setStatistics(res)
        } catch (error) {
            // const err = error as DataResponse<string>
            // toast.error(err.message, failToast)

            setStatistics({} as DataResponse<Statistics>)

            throw error
        } finally {
            setIsFetching(false)
        }
    }

    return { getStatistics }
}
