import { NavLink } from '@/@types'
import { AssetsNavLink } from '@/assets'
import { Roles } from '@/enums'
import { getRole } from '@/utils'
import Image from 'next/image'
import Link from 'next/link'
import { Dispatch, JSX, SetStateAction, useRef } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import Logo from '../../Logo'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { usePathname } from 'next/navigation'
import { useTranslation } from '@/i18n/client'

const contentManagementLinks: NavLink[] = [
    {
        name: 'article',
        url: `/${getRole(Roles.AUTHOR)}/articles`,
        asset: AssetsNavLink.asset_articles,
    },
    {
        name: 'news',
        url: `/${getRole(Roles.AUTHOR)}/news`,
        asset: AssetsNavLink.asset_news,
    },
    {
        name: 'advertisement',
        url: `/${getRole(Roles.AUTHOR)}/advertisement`,
        asset: AssetsNavLink.asset_advertisement,
    },
]

export default function AuthorSidebar({
    isSidebarOpen,
    setIsSideBarOpen,
}: {
    isSidebarOpen: boolean
    setIsSideBarOpen: Dispatch<SetStateAction<boolean>>
}): JSX.Element {
    // translation
    const { t } = useTranslation('sidebar')

    // get url path
    const pathname = usePathname()

    // refs
    const sideBarRef = useRef<HTMLDivElement | null>(null)

    // close sidebar when click outside
    useOnClickOutside(sideBarRef, () => setIsSideBarOpen(false))

    return (
        <aside
            ref={sideBarRef}
            className={`${
                isSidebarOpen ? 'translate-x-0' : '-translate-x-[100%]'
            } container fixed left-0 top-0 z-50 h-screen w-72 flex-col bg-white py-6 pl-0 pr-4 duration-300 dark:bg-dark lg:flex xl:translate-x-0`}
        >
            <div className='flex items-start justify-between pl-4'>
                <div className='w-24'>
                    <Link href='/'>
                        <Logo className='w-24' />
                    </Link>
                </div>

                <XMarkIcon onClick={() => setIsSideBarOpen(false)} className='h-6 w-6 dark:text-light lg:hidden' />
            </div>

            <nav className='mt-6 h-screen space-y-4 overflow-y-auto pb-28 text-dark dark:text-light lg:pb-0 lg:pr-2'>
                {/* content management */}
                <div>
                    <p className='pl-4 text-xs font-bold uppercase text-neutral-500'>{t('content_management')}</p>

                    <ul className='mt-2'>
                        {contentManagementLinks.map((nav: NavLink, index: number) => (
                            <li key={`nav-${index}`}>
                                <Link
                                    onClick={() => setIsSideBarOpen(false)}
                                    href={nav.url}
                                    className={`${
                                        pathname === nav.url || pathname.includes(nav.url)
                                            ? 'bg-primary font-extrabold text-light'
                                            : 'group text-primary hover:bg-primary/25 dark:text-light'
                                    } flex items-center gap-x-2 rounded-r-full px-4 py-2.5 font-medium duration-150`}
                                >
                                    <div className='flex gap-x-2 duration-150 group-hover:pl-2'>
                                        <Image
                                            className={`h-6 w-6 rounded-full bg-white p-0.5 dark:bg-dark`}
                                            src={nav.asset}
                                            alt='Asset'
                                        />

                                        <span>{t(nav.name)}</span>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                {/* end of content management */}
            </nav>
        </aside>
    )
}
