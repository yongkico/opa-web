import { JSX, useState, useRef } from 'react'
import { UserIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useOnClickOutside } from 'usehooks-ts'
import { useRouter } from 'next/navigation'
import { userStore } from '@/store/userStore'
import { Avatar, Button } from '@nextui-org/react'
import { getRole } from '@/utils'
import { globalStore } from '@/store/backoffice/global'
import { plantationStore } from '@/store/backoffice/plantationStore'
import { DataResponse, Year } from '@/@types'
import { Plantation } from '@/@types/Plantation'
import { dashboardStore } from '@/store/backoffice/dashboardStore'
import { Dashboard } from '@/@types/Dashboard'
import { avatarStore } from '@/store/avatarStore'
import ChangeLocale from '../../locale/ChangeLocale'

export default function DropdownUserMenu(): JSX.Element {
    // states
    const [isDropdownOpen, setIsDropDownOpen] = useState<boolean>(false)
    const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false)

    // refs
    const dropdownUserRef = useRef<HTMLDivElement | null>(null)

    // router
    const router = useRouter()

    // global states
    const { loggedInUser } = userStore()
    const { setPlantations } = plantationStore()
    const { setYears } = globalStore()
    const { setDashboard } = dashboardStore()
    const { avatar } = avatarStore()

    // close dropdown when click outside
    useOnClickOutside(dropdownUserRef, () => setIsDropDownOpen(false))

    function handleLogout() {
        setIsLoggingOut(true)

        localStorage.removeItem(process.env.NEXT_PUBLIC_ACCESS_TOKEN)
        localStorage.removeItem('user')

        setPlantations({} as DataResponse<Plantation[]>)
        setYears({} as DataResponse<Year[]>)

        router.push('/auth/login')

        // clear current dashboard state

        setTimeout(() => {
            setIsLoggingOut(false)
            setDashboard({} as DataResponse<Dashboard>)
        }, 1000)
    }

    return (
        <div ref={dropdownUserRef} className='relative flex items-center gap-x-4'>
            <div className='text-right dark:text-light'>
                <p className='text-sm font-semibold sm:text-base'>{loggedInUser.data?.name}</p>

                <p className='text-xs'>{loggedInUser.data?.role_name}</p>
            </div>

            <div>
                <Avatar
                    onClick={() => setIsDropDownOpen(!isDropdownOpen)}
                    className='cursor-pointer'
                    name={loggedInUser.data?.name}
                    src={avatar}
                    color='primary'
                    isBordered
                    size='sm'
                    showFallback
                />
            </div>

            {/* dropdown content */}
            <div
                className={`${
                    isDropdownOpen ? 'h-52 w-max p-4 opacity-100' : 'h-0 opacity-0'
                } absolute right-0 top-14 min-w-[10rem] space-y-4 overflow-hidden rounded-lg bg-light shadow duration-300 dark:border dark:border-gray-600 dark:bg-dark`}
            >
                <ul className='whitespace-nowrap dark:text-light'>
                    <li>
                        <Link
                            onClick={() => setIsDropDownOpen(false)}
                            href={`/${getRole(loggedInUser.data.role_name)}/account`}
                            className='flex items-center gap-x-1 rounded px-2 py-1 duration-150 hover:bg-primary/25'
                        >
                            <UserIcon className='icon' />

                            <span>Akun</span>
                        </Link>
                    </li>

                    <li>
                        <Link
                            onClick={() => setIsDropDownOpen(false)}
                            href={`/${getRole(loggedInUser.data.role_name)}/faq`}
                            className='flex items-center gap-x-1 rounded px-2 py-1 duration-150 hover:bg-primary/25'
                        >
                            <QuestionMarkCircleIcon className='icon' />

                            <span>Faq</span>
                        </Link>
                    </li>
                </ul>

                <div className='flex flex-col gap-y-4 px-2'>
                    <ChangeLocale />

                    <Button
                        onPress={() => handleLogout()}
                        variant='bordered'
                        color='primary'
                        radius='sm'
                        isLoading={isLoggingOut}
                    >
                        {isLoggingOut ? 'Sedang Keluar..' : 'Keluar'}
                    </Button>
                </div>
            </div>
            {/* dropdown content */}
        </div>
    )
}
