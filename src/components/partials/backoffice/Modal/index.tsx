import { XMarkIcon } from '@heroicons/react/24/solid'
import { Dispatch, HTMLAttributes, JSX, ReactNode, SetStateAction } from 'react'

type Props = {
    children: ReactNode
    footer?: JSX.Element
    header?: JSX.Element
    isOpen: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>>
    size?: 'small' | 'medium' | 'large'
} & HTMLAttributes<HTMLDivElement>

function modalSize(size: string = '') {
    switch (true) {
        case size === 'small':
            return 'lg:max-w-lg'
        case size === 'medium':
            return 'lg:max-w-xl'
        case size === 'large':
            return 'lg:max-w-2xl'
        default:
            return 'lg:max-w-3xl'
    }
}

export default function Modal(props: Props): JSX.Element {
    const { children, isOpen, setIsOpen, header, footer, size } = props

    return (
        <>
            <div
                className={`absolute bottom-0 ${
                    isOpen ? 'pointer-events-auto z-50' : 'pointer-events-none invisible z-20'
                }`}
                aria-labelledby='modal-title'
                role='dialog'
                aria-modal='true'
            >
                <div
                    onClick={() => setIsOpen(false)}
                    className={`fixed inset-0 bg-gray-500/75 backdrop-blur transition-opacity ${
                        isOpen ? 'opacity-100 duration-300 ease-out' : 'opacity-0 duration-200 ease-in'
                    }`}
                ></div>

                <div className='pointer-events-none fixed inset-0 z-10'>
                    <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
                        <div
                            className={`${modalSize(
                                size,
                            )} apply-dark pointer-events-auto relative z-20 w-full transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:w-full sm:max-w-xl ${
                                isOpen
                                    ? 'translate-y-0 opacity-100 duration-300 ease-out sm:scale-100'
                                    : 'translate-y-4 opacity-0 duration-200 ease-in sm:translate-y-0 sm:scale-95'
                            }`}
                        >
                            <div className='flex flex-col'>
                                <div className='flex justify-between px-8 pb-2 pt-8'>
                                    <div className='text-xl font-bold'>{header}</div>

                                    <button onClick={() => setIsOpen(false)} className='' aria-label='Close Modal'>
                                        <XMarkIcon className='h-6 w-6 ' />
                                    </button>
                                </div>

                                <div className='max-h-[calc(100vh-16rem)] overflow-y-auto p-4'>{children}</div>

                                <div className='px-8 pb-8'>{footer}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
