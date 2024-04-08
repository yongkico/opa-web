'use client'

import { User } from '@/@types/Auth'
import AddUserModal from '@/components/partials/backoffice/Modals/Users/AddUserModal'
import UsersTable from '@/components/partials/backoffice/Tables/Users/UsersTable'
import { useUserManagement } from '@/hooks/backoffice/useUserManagement'
import { useAsyncList } from '@react-stately/data'
import { JSX } from 'react'

export default function Users(): JSX.Element {
    // custom hooks
    const { getUsers } = useUserManagement()

    // global states

    // load data with asynclist react stately
    const asyncListOfUsers = useAsyncList({
        async load() {
            const res = await getUsers()

            return {
                items: res.data as User[],
            }
        },
        async sort({ items, sortDescriptor }) {
            return {
                items: items.sort((a, b) => {
                    const first = a[sortDescriptor.column as keyof User]
                    const second = b[sortDescriptor.column as keyof User]
                    let cmp = (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1

                    if (sortDescriptor.direction === 'descending') {
                        cmp *= -1
                    }

                    return cmp
                }),
            }
        },
    })

    return (
        <main className='container min-h-screen space-y-4 px-0 py-4 lg:space-y-8 lg:py-8'>
            {/* filter section */}
            {/* <section>
                <div className='apply-dark space-y-4 rounded-lg bg-white p-4 lg:p-8'>
                    <p className='font-bold lg:text-xl'>Filter Pencarian</p>

                    <div className='flex flex-col items-start justify-between gap-4 lg:flex-row'>
                        <div className='flex w-full flex-col gap-y-1'>
                            <select className='input-primary' name='farm' id='farm'>
                                <option value=''>Pilih Role</option>

                                <option value=''>Administrator</option>

                                <option value=''>Member</option>

                                <option value=''>Author</option>
                            </select>
                        </div>

                        <div className='flex w-full flex-col gap-y-1'>
                            <select className='input-primary' name='year' id='year'>
                                <option value=''>Pilih Status</option>

                                <option value=''>Aktif</option>

                                <option value=''>Tidak Aktif</option>
                            </select>
                        </div>
                    </div>
                </div>
            </section> */}
            {/* end of filter section */}

            {/* users table section */}
            <section>
                <div className='apply-dark space-y-4 rounded-lg bg-white p-4 lg:p-8'>
                    <div className='flex items-center justify-between pb-4'>
                        <p className='font-bold lg:text-xl'>Manajemen Pengguna</p>

                        <AddUserModal list={asyncListOfUsers} />
                    </div>

                    <div>
                        <UsersTable list={asyncListOfUsers} />
                    </div>
                </div>
            </section>
            {/* end of users table section */}
        </main>
    )
}
