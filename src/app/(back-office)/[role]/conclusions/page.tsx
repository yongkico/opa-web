'use client'

import { JSX } from 'react'
import { Pagination } from '@nextui-org/react'
import ConclusionsTable from '@/components/partials/backoffice/Tables/Conclusions/ConclusionsTable'
import { useEffectOnce } from 'usehooks-ts'
import { useSearchParams } from 'next/navigation'
import { useConclusion } from '@/hooks/backoffice/useConclusion'
import { conclusionStore } from '@/store/backoffice/conclusionStore'
import AddConclusionModal from '@/components/partials/backoffice/Modals/Conclusions/AddConclusionModal'

export default function Conclusions(): JSX.Element {
    // custom hooks
    const { getConclusions } = useConclusion()

    // global states
    const { conclusions } = conclusionStore()

    // params
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams.toString())

    useEffectOnce(() => {
        getConclusions('1')
    })

    return (
        <div className='container min-h-screen space-y-4 px-0 py-4 lg:space-y-8 lg:py-8'>
            {/* conclusions table section */}
            <section>
                <div className='apply-dark space-y-4 rounded-lg p-4 lg:p-8'>
                    <div className='apply-dark flex items-center justify-between pb-4'>
                        <p className='font-bold lg:text-xl'>Daftar Kesimpulan</p>

                        <AddConclusionModal />
                    </div>

                    <div className='overflow-x-auto'>
                        {/* table */}
                        <ConclusionsTable list={conclusions} />
                        {/* end of table */}
                    </div>

                    {/* pagination */}
                    <div className='flex flex-col items-center justify-between gap-4 py-4 lg:flex-row lg:py-8'>
                        <p className='text-sm'>
                            Showing {conclusions.pagination?.from} to {conclusions.pagination?.to} of{' '}
                            {conclusions.pagination?.total} entries
                        </p>

                        <div className='flex items-center gap-x-2'>
                            <Pagination
                                onChange={(page) => {
                                    params.set('page', page.toString())
                                    window.history.pushState(null, '', `?${params.toString()}`)

                                    getConclusions(page.toString())
                                }}
                                classNames={{
                                    item: 'bg-primary/10',
                                }}
                                total={Math.ceil(conclusions.pagination?.total! / 10) || 1}
                                initialPage={1}
                            />
                        </div>
                    </div>
                </div>
            </section>
            {/* end of conclusions table section */}
        </div>
    )
}
