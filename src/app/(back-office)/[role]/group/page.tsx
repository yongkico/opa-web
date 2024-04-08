'use client'

import { useGroup } from '@/hooks/backoffice/useGroup'
import { JSX } from 'react'
import { useEffectOnce } from 'usehooks-ts'
import GroupDetail from '@/components/partials/backoffice/Group/GroupDetail'
import GroupList from '@/components/partials/backoffice/Group/GroupList'

export default function Group(): JSX.Element {
    // custom hooks
    const { getGroups } = useGroup()

    useEffectOnce(() => {
        getGroups()
    })

    return (
        <main className='apply-dark container mt-4 rounded-lg bg-white p-4 md:mt-8 md:px-8'>
            <div className='relative flex h-[80vh] overflow-hidden md:max-h-[80vh] md:min-h-[80vh]'>
                {/* group list */}
                <GroupList />
                {/* end of group list */}

                {/* group detail */}
                <GroupDetail />
                {/* end of group detail */}
            </div>
        </main>
    )
}
