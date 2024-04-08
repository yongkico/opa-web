import { DataResponse, Year } from '@/@types'
import { findAllVarieties, findAllYears } from '@/modules/backoffice/globalModule'
import { globalStore } from '@/store/backoffice/global'

export function useGlobal() {
    // global states
    const { setIsFetching, setVarieties, setYears } = globalStore()

    async function getAllVarieties() {
        setIsFetching(true)

        try {
            const res = await findAllVarieties()

            setVarieties(res)
        } catch (error) {
            // toast.error('Something went wrong when fetching varieties', failToast)
        } finally {
            setIsFetching(false)
        }
    }

    async function getAllYears(plantation_id: string) {
        setIsFetching(true)

        try {
            const res = await findAllYears(plantation_id)

            setYears(res)

            // toast.success(res.message, successToast)
        } catch (error) {
            // const err = error as DataResponse<string>
            // toast.error(err.message, failToast)

            setYears({} as DataResponse<Year[]>)
        } finally {
            setIsFetching(false)
        }
    }

    return {
        getAllVarieties,
        getAllYears,
    }
}
