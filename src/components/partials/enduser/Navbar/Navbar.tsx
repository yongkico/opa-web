'use client'

import Link from 'next/link'
import { JSX, useState } from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid'
import { usePathname } from 'next/navigation'
import Logo from '../../Logo'
import DarkModeToggle from '../../backoffice/Navbar/DarkModeToggle'
import { userStore } from '@/store/userStore'
import { getRole } from '@/utils'
import { Button } from '@nextui-org/react'
import ChangeLocale from '../../locale/ChangeLocale'
import { useTranslation } from '@/i18n/client'
import { DataResponse } from '@/@types'
import { User } from '@/@types/Auth'

type NavLink = {
    name: string
    url: string
}

const navLinks: NavLink[] = [
    {
        name: 'Beranda',
        url: '/',
    },
    {
        name: 'Artikel',
        url: '/articles',
    },
    {
        name: 'Berita',
        url: '/news',
    },
    {
        name: 'Tentang',
        url: '/about',
    },
]

export default function Navbar(): JSX.Element {
    // translation
    const { t } = useTranslation('navbar')

    // pathname
    const pathname = usePathname()

    // states
    const [isNavOpen, setIsNavOpen] = useState<boolean>(false)

    // global states
    const { loggedInUser, setLoggedInUser } = userStore()

    return (
        <>
            {/* desktop nav */}
            <nav className='fixed inset-x-0 top-0 z-40 hidden h-24 items-center bg-white shadow duration-300 dark:bg-dark lg:flex'>
                <div className='container'>
                    <div className='flex items-center justify-between gap-x-4'>
                        <Link onClick={() => setLoggedInUser({} as DataResponse<User>)} href='/'>
                            <Logo className='w-24' />
                        </Link>

                        <ul className='flex gap-x-8 font-semibold text-grey dark:text-light'>
                            <li
                                className={`${
                                    pathname === '/home' ? 'font-bold text-secondary' : 'whitespace-nowrap'
                                } duration-150 hover:text-secondary`}
                            >
                                <Link href={'/'}>
                                    <span>{t('beranda')}</span>
                                </Link>
                            </li>

                            {navLinks.slice(1).map((navlink: NavLink, index: number) => (
                                <li
                                    className={`${
                                        pathname === navlink.url || pathname.includes(navlink.url)
                                            ? 'font-bold text-secondary'
                                            : 'whitespace-nowrap'
                                    } duration-150 hover:text-secondary`}
                                    key={`navlink-${index}`}
                                >
                                    <Link href={navlink.url}>
                                        <span>{t(navlink.name)}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <div className='flex items-center gap-x-4'>
                            <ChangeLocale />

                            <div>
                                <DarkModeToggle />
                            </div>

                            {/* check is user logged in */}
                            {loggedInUser.data?.role_id ? (
                                <Button
                                    className='font-semibold'
                                    as={Link}
                                    href={`/${getRole(loggedInUser.data?.role_name)}`}
                                    color='primary'
                                    radius='sm'
                                >
                                    Dashboard
                                </Button>
                            ) : (
                                <div className='flex gap-x-2'>
                                    <Button
                                        className='font-semibold'
                                        as={Link}
                                        href={'/auth/login'}
                                        color='primary'
                                        variant='bordered'
                                        radius='sm'
                                    >
                                        {t('masuk')}
                                    </Button>

                                    <Button
                                        className='font-semibold'
                                        as={Link}
                                        href={'/auth/register'}
                                        color='primary'
                                        radius='sm'
                                    >
                                        {t('daftar')}
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
            {/* end of desktop nav */}

            {/* mobile nav */}
            <nav className='relative z-40 lg:hidden'>
                <div className='fixed top-0 flex h-20 w-full items-center justify-between bg-white p-4 dark:bg-dark'>
                    <Link onClick={() => setLoggedInUser({} as DataResponse<User>)} href='/'>
                        <Logo className='w-20' />
                    </Link>

                    <div className='flex gap-x-4'>
                        <Bars3Icon onClick={() => setIsNavOpen(true)} className='h-8 w-8 text-primary' />
                    </div>
                </div>

                <div
                    className={`${
                        isNavOpen ? 'translate-y-0' : '-translate-y-full'
                    } fixed flex min-h-screen w-screen flex-col items-center justify-between bg-white p-4 duration-300 dark:bg-dark md:p-8`}
                >
                    <div className='flex w-full items-center justify-between'>
                        <Logo className='w-20' />

                        <XMarkIcon onClick={() => setIsNavOpen(false)} className='h-8 w-8 text-primary' />
                    </div>

                    <ul className='flex flex-col items-center gap-y-8 text-3xl font-medium text-grey'>
                        <li
                            onClick={() => setIsNavOpen(false)}
                            className={`${
                                pathname === '/home' ? 'font-bold text-secondary' : 'whitespace-nowrap'
                            } duration-150 hover:text-secondary`}
                        >
                            <Link href={'/'}>
                                <span>{t('beranda')}</span>
                            </Link>
                        </li>

                        {navLinks.slice(1).map((navlink: NavLink, index: number) => (
                            <li
                                onClick={() => setIsNavOpen(false)}
                                className={`${
                                    pathname === navlink.url || pathname.includes(navlink.url)
                                        ? 'font-bold text-secondary'
                                        : ''
                                }`}
                                key={`navlink-${index}`}
                            >
                                <Link href={navlink.url}>
                                    <span>{t(navlink.name)}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* check is user logged in */}
                    {loggedInUser.data?.role_id ? (
                        <Button
                            className='font-semibold'
                            as={Link}
                            href={`/${getRole(loggedInUser.data?.role_name)}`}
                            color='primary'
                            radius='sm'
                            size='lg'
                        >
                            Dashboard
                        </Button>
                    ) : (
                        <div className='flex gap-x-4'>
                            <Button
                                className='font-semibold'
                                as={Link}
                                href={'/auth/login'}
                                color='primary'
                                size='lg'
                                variant='bordered'
                                radius='sm'
                            >
                                {t('masuk')}
                            </Button>

                            <Button
                                className='font-semibold'
                                as={Link}
                                href={'/auth/register'}
                                color='primary'
                                size='lg'
                                radius='sm'
                            >
                                {t('daftar')}
                            </Button>
                        </div>
                    )}

                    <div className='flex items-center gap-x-4'>
                        <div>
                            <DarkModeToggle />
                        </div>

                        <ChangeLocale />
                    </div>
                </div>
            </nav>
            {/* end of mobile nav */}
        </>
    )
}
