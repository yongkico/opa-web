'use client'

import { validate } from '@/modules/authModule'
import { userStore } from '@/store/userStore'
import { getRole } from '@/utils'
import { usePathname, useRouter } from 'next/navigation'
import { JSX } from 'react'
import { useEffectOnce } from 'usehooks-ts'

export default function ValidateUser(): JSX.Element {
    // router
    const router = useRouter()

    // pathname
    const pathname = usePathname()

    // global states
    const { setLoggedInUser } = userStore()

    // for validating user
    async function validateUser() {
        // if user is not logged in, redirect to login page
        if (!localStorage.getItem(process.env.NEXT_PUBLIC_ACCESS_TOKEN)) {
            if (!pathname.includes('/auth')) {
                router.replace('/auth/login')
            }

            return
        }

        try {
            const res = await validate()

            setLoggedInUser(res)

            if (pathname.includes('/auth')) {
                router.replace(`/${getRole(res.data.role_name)}/dashboard`)
            }
        } catch (error) {
            if (!pathname.includes('/auth')) {
                router.replace('/auth/login')
            }
        }
    }

    useEffectOnce(() => {
        validateUser()
    })

    return <></>
}
