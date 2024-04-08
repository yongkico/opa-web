import { JSX } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import { breadcrumbs } from '@/constants/breadcrumb'

export default function Breadcrumb({ pageName }: { pageName: string }): JSX.Element {
    // router
    const router = useRouter()

    return (
        <div className='flex items-center gap-x-2'>
            <ChevronLeftIcon onClick={() => router.back()} className='h-6 w-6 cursor-pointer' />

            <p className='w-max font-bold capitalize md:text-2xl'>
                {breadcrumbs.find((breadcrumb) => breadcrumb.en === pageName)?.id}
            </p>
        </div>
    )
}
