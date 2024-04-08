import { successToast } from '@/configs/toastConfig'
import { findAll } from '@/modules/backoffice/dashboardModule'
import { dashboardStore } from '@/store/backoffice/dashboardStore'
import { toast } from 'sonner'

export function useDashboard() {
    // global states
    const { setDashboard, setIsFetching } = dashboardStore()

    async function getDashboard(plantation_id: string, year: string) {
        setIsFetching(true)
        try {
            const res = await findAll(plantation_id, year)

            setDashboard(res)

            toast.success('Data dashboard fetched successfully', successToast)
        } catch (error) {
            // const err = error as DataResponse<string>
            // toast.error(err.message, failToast)
        } finally {
            setIsFetching(false)
        }
    }

    return {
        getDashboard,
    }
}
