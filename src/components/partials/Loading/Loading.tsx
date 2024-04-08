import { JSX } from 'react'
import { Spinner } from '@nextui-org/react'

export default function Loading({
    className = 'w-24',
    isFullScreen = false,
}: {
    className?: string
    isFullScreen?: boolean
}): JSX.Element {
    return (
        <div
            className={`${
                isFullScreen
                    ? 'fixed inset-0 z-50 flex h-screen items-center justify-center bg-dark/50 backdrop-blur-sm'
                    : ''
            }`}
        >
            <Spinner className={`${className}`} />
        </div>
    )
}
