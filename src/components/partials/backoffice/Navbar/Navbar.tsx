import { Dispatch, JSX, SetStateAction } from 'react'
import { Bars3Icon } from '@heroicons/react/24/outline'
import DropdownUserMenu from './DropdownUserMenu'
import DarkModeToggle from './DarkModeToggle'
import { usePathname } from 'next/navigation'
import Breadcrumb from './BreadCrumb'

export default function Navbar({
    setIsSideBarOpen,
}: {
    setIsSideBarOpen: Dispatch<SetStateAction<boolean>>
}): JSX.Element {
    // router
    const pathname = usePathname()

    return (
        <nav className='sticky top-4 z-40 mx-auto h-16 w-[calc(100%)] rounded-lg bg-white p-4 duration-300 dark:bg-dark md:h-20 md:p-8'>
            <div className='flex h-full items-center justify-between'>
                <Bars3Icon
                    onClick={() => setIsSideBarOpen(true)}
                    className='h-6 w-6 cursor-pointer text-dark dark:text-light xl:hidden'
                />

                <div className='hidden xl:block'>
                    {pathname !== '/' && <Breadcrumb pageName={pathname.split('/')[2]} />}
                </div>

                <div className='ml-auto flex items-center gap-x-4 md:gap-x-6'>
                    <DarkModeToggle />

                    <DropdownUserMenu />
                </div>
            </div>
        </nav>
    )
}
