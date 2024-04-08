import { BellIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { JSX, useRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts'

export default function Notifications(): JSX.Element {
    // states
    const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false)

    // refs
    const notificationsRef = useRef<HTMLDivElement | null>(null)

    // close dropdown when click outside
    useOnClickOutside(notificationsRef, () => setIsNotificationsOpen(false))

    return (
        <div ref={notificationsRef} className='relative'>
            <BellIcon onClick={() => setIsNotificationsOpen(!isNotificationsOpen)} className='h-6 w-6 cursor-pointer' />

            {/* dropdown content */}
            <div
                className={`${
                    isNotificationsOpen ? 'h-64 w-52 opacity-100' : 'h-0 w-0 opacity-0'
                } absolute right-0 top-12 space-y-4 overflow-y-auto rounded-lg bg-light p-4 shadow duration-300 dark:border dark:border-gray-600 dark:bg-dark`}
            >
                <div className='relative'>
                    <ul className='whitespace-nowrap dark:text-light'>
                        <li>
                            <Link href='/#' className='flex items-center border-b p-4 hover:bg-primary/25'>
                                <span>Notification 1</span>
                            </Link>
                        </li>

                        <li>
                            <Link href='/#' className='flex items-center border-b p-4 hover:bg-primary/25'>
                                <span>Notification 2</span>
                            </Link>
                        </li>

                        <li>
                            <Link href='/#' className='flex items-center border-b p-4 hover:bg-primary/25'>
                                <span>Notification 3</span>
                            </Link>
                        </li>

                        <li>
                            <Link href='/#' className='flex items-center border-b p-4 hover:bg-primary/25'>
                                <span>Notification 4</span>
                            </Link>
                        </li>

                        <li>
                            <Link href='/#' className='flex items-center border-b p-4 hover:bg-primary/25'>
                                <span>Notification 5</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
