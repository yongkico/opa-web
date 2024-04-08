import Link from 'next/link'
import { Dispatch, JSX, SetStateAction, useRef } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import Logo from '../../Logo'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { AssetsNavLink } from '@/assets'
import { getRole } from '@/utils'
import { NavLink } from '@/@types'
import { Roles } from '@/enums'
import { useParams, usePathname } from 'next/navigation'
import { useTranslation } from '@/i18n/client'

const plantationManagementLinks: NavLink[] = [
    {
        name: 'plantation',
        url: `/${getRole(Roles.MEMBER)}/plantation`,
        asset: AssetsNavLink.asset_farm,
    },
    {
        name: 'harvest',
        url: `/${getRole(Roles.MEMBER)}/harvest`,
        asset: AssetsNavLink.asset_harvest,
    },
    {
        name: 'target',
        url: `/${getRole(Roles.MEMBER)}/target`,
        asset: AssetsNavLink.asset_target,
    },
    {
        name: 'statistics',
        url: `/${getRole(Roles.MEMBER)}/statistic`,
        asset: AssetsNavLink.asset_statistic,
    },
]

const agronomyVerificationLinks: NavLink[] = [
    {
        name: 'population_size',
        url: `/${getRole(Roles.MEMBER)}/verification-agronomy/population-size`,
        asset: AssetsNavLink.asset_jumlah_populasi,
        query: 'population-size',
    },
    {
        name: 'number_of_stems',
        url: `/${getRole(Roles.MEMBER)}/verification-agronomy/number-of-stems`,
        asset: AssetsNavLink.asset_jumlah_pelepah,
        query: 'number-of-stems',
    },
    {
        name: 'nutrient_availibility',
        url: `/${getRole(Roles.MEMBER)}/verification-agronomy/nutrient-availability`,
        asset: AssetsNavLink.asset_ketersediaan_hara,
        query: 'nutrient-availability',
    },
    {
        name: 'plant_illegitim',
        url: `/${getRole(Roles.MEMBER)}/verification-agronomy/plant-illegitim`,
        asset: AssetsNavLink.asset_bahan_tanaman,
        query: 'plant-illegitim',
    },
    {
        name: 'flooded_plants',
        url: `/${getRole(Roles.MEMBER)}/verification-agronomy/flooded-plants`,
        asset: AssetsNavLink.asset_tanaman_tergenang,
        query: 'flooded-plants',
    },
]

const applicationLinks: NavLink[] = [
    {
        name: 'group',
        url: `/${getRole(Roles.MEMBER)}/group`,
        asset: AssetsNavLink.asset_group,
    },
    {
        name: 'rainfall',
        url: `/${getRole(Roles.MEMBER)}/rainfall`,
        asset: AssetsNavLink.asset_rainfall,
    },
    {
        name: 'prediction_production',
        url: `/${getRole(Roles.MEMBER)}/prediction`,
        asset: AssetsNavLink.asset_prediction,
    },
    {
        name: 'fertilizer_recommendation',
        url: `/${getRole(Roles.MEMBER)}/fertilizer`,
        asset: AssetsNavLink.asset_fertilizer,
    },
]

export default function MemberSidebar({
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

    const query = useParams()

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
                <Link
                    onClick={() => setIsSideBarOpen(false)}
                    href='/member/dashboard'
                    className={`${
                        pathname === '/member/dashboard'
                            ? 'bg-primary font-extrabold text-light'
                            : 'group text-primary hover:bg-primary/25 dark:text-light'
                    } flex items-center gap-x-2 rounded-r-full px-4 py-2.5 font-medium duration-150`}
                >
                    <div className='flex gap-x-2 duration-150 group-hover:pl-2'>
                        <Image
                            className={`h-6 w-6 rounded-full bg-white p-0.5 dark:bg-dark`}
                            src={AssetsNavLink.asset_dashboard}
                            alt='Asset'
                        />

                        <span>Dashboard</span>
                    </div>
                </Link>

                {/* farm management */}
                <div>
                    <p className='pl-4 text-xs font-bold uppercase text-neutral-500'>{t('plantation_management')}</p>

                    <ul className='mt-2'>
                        {plantationManagementLinks.map((nav: NavLink, index: number) => (
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
                {/* end of farm management */}

                {/* agronomic verification */}
                <div>
                    <p className='pl-4 text-xs font-bold uppercase text-neutral-500'>{t('agronomy_verification')}</p>

                    <ul className='mt-2'>
                        {agronomyVerificationLinks.map((nav: NavLink, index: number) => (
                            <li key={`nav-${index}`}>
                                <Link
                                    onClick={() => setIsSideBarOpen(false)}
                                    href={nav.url}
                                    className={`${
                                        // pathname === nav.url || pathname.includes(nav.url)
                                        query.category === nav.query
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
                {/* end of agronomic verification */}

                {/* application */}
                <div>
                    <p className='pl-4 text-xs font-bold uppercase text-neutral-500'>{t('application')}</p>

                    <ul className='mt-2'>
                        {applicationLinks.map((nav: NavLink, index: number) => (
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
                {/* end of application */}
            </nav>
        </aside>
    )
}
