import { findAll, findAllAnnual } from '@/modules/backoffice/rainfallModule'
import { rainfallStore } from '@/store/backoffice/rainfallStore'

export function useRainfall() {
    // global states
    const { setIsFetching, setRainfalls, setAnnualRainfalls } = rainfallStore()

    async function getRainfalls(plantation_id: string, year: string) {
        setIsFetching(true)

        try {
            const res = await findAll(plantation_id, year)

            setRainfalls(res)
        } catch (error) {
            // const err = error as DataResponse<string>
            // toast.error(err.message, failToast)

            throw error
        } finally {
            setIsFetching(false)
        }
    }

    async function getAnnualRainfalls(plantation_id: string) {
        setIsFetching(true)

        try {
            const res = await findAllAnnual(plantation_id)

            setAnnualRainfalls(res)
        } catch (error) {
            // const err = error as DataResponse<string>
            // toast.error(err.message, failToast)

            throw error
        } finally {
            setIsFetching(false)
        }
    }

    return { getRainfalls, getAnnualRainfalls }
}
