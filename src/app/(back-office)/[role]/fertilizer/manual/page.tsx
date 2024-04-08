'use client'

import { JSX } from 'react'
import ManualStep1 from '@/components/partials/backoffice/Fertilizer/ManualStep1'
import ManualStep2 from '@/components/partials/backoffice/Fertilizer/ManualStep2'
import Result from '@/components/partials/backoffice/Fertilizer/Result'
import { useSearchParams } from 'next/navigation'
export default function ManualRecommendation(): JSX.Element {
    // search params
    const params = useSearchParams()

    function showStep(query: string | string[] | undefined) {
        switch (query) {
            case '1':
                return <ManualStep1 />
            case '2':
                return <ManualStep2 />
            case 'result':
                return <Result />
            default:
                return <div>not found</div>
        }
    }

    return (
        <div className='container min-h-screen p-4 md:p-8'>
            <header className='mb-8'>
                <h1 className='text-xl'>Rekomendasi Pupuk Manual</h1>
            </header>

            <div>{showStep(params.get('step') as string)}</div>
        </div>
    )
}
