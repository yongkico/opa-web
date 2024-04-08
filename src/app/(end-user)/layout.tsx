'use client'

import { useEffect, useState, JSX } from 'react'
import Footer from '@/components/partials/enduser/Footer'
import Navbar from '@/components/partials/enduser/Navbar'
import { usePathname } from 'next/navigation'

export default function AppLayout({ children }: { children: React.ReactNode }): JSX.Element {
    // router
    const pathname = usePathname()

    // states
    const [isHydrationFinished, setIsHydrationFinished] = useState<boolean>(false)

    useEffect(() => {
        setIsHydrationFinished(true)
    }, [])

    return (
        <>
            {isHydrationFinished && (
                <main>
                    {!pathname.includes('/auth') && <Navbar />}

                    <div className='apply-dark min-h-screen'>{children}</div>

                    {!pathname.includes('/auth') && <Footer />}
                </main>
            )}
        </>
    )
}
