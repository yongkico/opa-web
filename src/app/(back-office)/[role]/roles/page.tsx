'use client'

import AddRoleModal from '@/components/partials/backoffice/Modals/Roles/AddRoleModal'
import RolesTable from '@/components/partials/backoffice/Tables/Roles/RolesTable'
import { useRole } from '@/hooks/backoffice/useRole'
import { roleStore } from '@/store/backoffice/roleStore'
import { Pagination } from '@nextui-org/react'
import { useSearchParams } from 'next/navigation'
import { JSX } from 'react'
import { useEffectOnce } from 'usehooks-ts'

export default function Roles(): JSX.Element {
    // custom hooks
    const { getRoles } = useRole()

    // global states
    const { roles } = roleStore()

    // params
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams.toString())

    useEffectOnce(() => {
        getRoles('1')
    })

    return (
        <div className='container min-h-screen space-y-4 px-0 py-4 lg:space-y-8 lg:py-8'>
            {/* users table section */}
            <section>
                <div className='apply-dark space-y-4 rounded-lg p-4 lg:p-8'>
                    <div className='apply-dark flex items-center justify-between pb-4'>
                        <p className='font-bold lg:text-xl'>Manajemen Peran</p>

                        <AddRoleModal />
                    </div>

                    <div className='overflow-x-auto'>
                        {/* table */}
                        <RolesTable list={roles} />
                        {/* end of table */}
                    </div>

                    {/* pagination */}
                    <div className='flex flex-col items-center justify-between gap-4 py-4 lg:flex-row lg:py-8'>
                        <p className='text-sm'>
                            Showing {roles.pagination?.from} to {roles.pagination?.to} of {roles.pagination?.total}{' '}
                            entries
                        </p>

                        <div className='flex items-center gap-x-2'>
                            <Pagination
                                onChange={(page) => {
                                    params.set('page', page.toString())
                                    window.history.pushState(null, '', `?${params.toString()}`)

                                    getRoles(page.toString())
                                }}
                                classNames={{
                                    item: 'bg-primary/10',
                                }}
                                total={Math.ceil(roles.pagination?.total! / 10) || 1}
                                initialPage={1}
                            />
                        </div>
                    </div>
                </div>
            </section>
            {/* end of users table section */}
        </div>
    )
}
