import { JSX, ReactNode } from 'react'
import ValidateUser from '../validate-user'
import { Suspense } from 'react'
import { Spinner } from '@nextui-org/react'

type Props = {
    children: ReactNode
}

export default function layout({ children }: Props): JSX.Element {
    return (
        <Suspense
            fallback={
                <div className='flex h-screen items-center justify-center'>
                    <Spinner />
                </div>
            }
        >
            <ValidateUser />

            {children}
        </Suspense>
    )
}
