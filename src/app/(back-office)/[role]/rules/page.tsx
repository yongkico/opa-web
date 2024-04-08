'use client'

import AddRuleModal from '@/components/partials/backoffice/Modals/Rules/AddRuleModal'
import RulesTable from '@/components/partials/backoffice/Tables/Rules/RulesTable'
import { useRule } from '@/hooks/backoffice/useRule'
import { ruleStore } from '@/store/backoffice/ruleStore'
import { Pagination } from '@nextui-org/react'
import { useSearchParams } from 'next/navigation'
import { JSX } from 'react'
import { useEffectOnce } from 'usehooks-ts'

export default function Rules(): JSX.Element {
    // custom hooks
    const { getRules } = useRule()

    // global states
    const { rules } = ruleStore()

    // params
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams.toString())

    useEffectOnce(() => {
        getRules('1')
    })

    return (
        <main className='container min-h-screen space-y-4 px-0 py-4 lg:space-y-8 lg:py-8'>
            {/* rules table section */}
            <section>
                <div className='apply-dark space-y-4 rounded-lg p-4 lg:p-8'>
                    <div className='apply-dark flex items-center justify-between pb-4'>
                        <p className='font-bold lg:text-xl'>Aturan Pakar</p>

                        <AddRuleModal />
                    </div>

                    <div className='overflow-x-auto'>
                        {/* table */}
                        <RulesTable list={rules} />
                        {/* end of table */}
                    </div>

                    {/* pagination */}
                    <div className='flex flex-col items-center justify-between gap-4 py-4 lg:flex-row lg:py-8'>
                        <p className='text-sm'>
                            Showing {rules.pagination?.from} to {rules.pagination?.to} of {rules.pagination?.total}{' '}
                            entries
                        </p>

                        <div className='flex items-center gap-x-2'>
                            <Pagination
                                onChange={(page) => {
                                    params.set('page', page.toString())
                                    window.history.pushState(null, '', `?${params.toString()}`)

                                    getRules(page.toString())
                                }}
                                classNames={{
                                    item: 'bg-primary/10',
                                }}
                                total={Math.ceil(rules.pagination?.total! / 10) || 1}
                                initialPage={1}
                            />
                        </div>
                    </div>
                </div>
            </section>
            {/* end of rules table section */}
        </main>
    )
}
