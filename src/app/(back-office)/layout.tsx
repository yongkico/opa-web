'use client'

import { DataResponse } from '@/@types'
import Navbar from '@/components/partials/backoffice/Navbar'
import Sidebar from '@/components/partials/backoffice/Sidebar'
import { failToast } from '@/configs/toastConfig'
import { administrator, author, member } from '@/constants/route'
import { validate } from '@/modules/authModule'
import { userStore } from '@/store/userStore'
import { getRole } from '@/utils'
import { notFound, useParams, usePathname, useRouter } from 'next/navigation'
import { JSX, ReactNode, useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function DashboardLayout({ children }: { children: ReactNode }): JSX.Element {
    // states
    const [isSidebarOpen, setIsSideBarOpen] = useState<boolean>(false)
    const [isHydrationFinished, setIsHydrationFinished] = useState<boolean>(false)

    // pathname
    const pathname = usePathname()

    // params
    const params = useParams()

    // router
    const router = useRouter()

    // global states
    const { loggedInUser, setLoggedInUser } = userStore()

    const pathArray = pathname.split('/')

    const route = pathArray[2]

    function checkRoute(role: string) {
        switch (true) {
            case role === 'administrator':
                if (!administrator.includes(route)) {
                    router.push(`/${getRole(loggedInUser.data?.role_name)}/dashboard`)

                    return
                }
                break
            case role === 'member':
                if (!member.includes(route)) {
                    router.push(`/${getRole(loggedInUser.data?.role_name)}/dashboard`)
                    return
                }
                break
            case role === 'author':
                if (!author.includes(route)) {
                    router.push(`/${getRole(loggedInUser.data?.role_name)}/articles`)
                    return
                }
                break
            default:
                return
        }
    }

    // validate token
    async function validateToken() {
        try {
            const res = await validate()

            setLoggedInUser(res)
        } catch (error) {
            const err = error as DataResponse<string>

            // console.log(error)

            if (err.message === 'Expired token') {
                router.push('/auth/login')

                toast.error('Your session has expired, please login again', failToast)

                return
            }

            // if (err.message === 'Invalid token') {
            //     router.push(`${getRole(loggedInUser.data?.role_name)}/dashboard`)
            // }

            router.push('/auth/login')
            toast.error('Your session is invalid, please login again', failToast)
        }
    }

    useEffect(() => {
        setIsHydrationFinished(true)
    }, [])

    useEffect(() => {
        validateToken()
        checkRoute(getRole(loggedInUser.data?.role_name))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname])

    // check if user direct access path url
    if (params.role !== loggedInUser.data?.role_name.toLowerCase()) {
        return notFound()
    }

    return (
        <>
            {isHydrationFinished && (
                <>
                    <Sidebar isSidebarOpen={isSidebarOpen} setIsSideBarOpen={setIsSideBarOpen} />

                    <div className='relative ml-auto min-h-screen bg-[#f5f5f5] p-4 duration-300 dark:bg-[#012432] dark:text-light md:px-8 xl:w-[calc(100%-18rem)]'>
                        <Navbar setIsSideBarOpen={setIsSideBarOpen} />

                        {children}

                        {/* overlay */}
                        {isSidebarOpen && <div className='absolute inset-0 z-40 bg-black/50 backdrop-blur-sm'></div>}
                    </div>
                </>
            )}
        </>
    )
}
