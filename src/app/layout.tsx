import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'
import NextTopLoader from 'nextjs-toploader'
import Script from 'next/script'
import { Toaster } from 'sonner'
import { getLocale } from '@/i18n/server'
import { LocaleProvider } from '@/hooks/useLocalProvider'

export const metadata: Metadata = {
    title: 'OPA - Oil Palm Assistant (OPA)',
    description: 'OPA - Oil Palm Assistant (OPA)',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const locale = getLocale()

    return (
        <html lang={locale}>
            <Script
                id='google-tag-manager'
                dangerouslySetInnerHTML={{
                    __html: `
        <!-- Google Tag Manager -->
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-MM88QBJ2');
        <!-- End Google Tag Manager -->
        `,
                }}
            ></Script>

            <body>
                <noscript
                    dangerouslySetInnerHTML={{
                        __html: `
            <!-- Google Tag Manager (noscript) -->
            <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MM88QBJ2"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>
            <!-- End Google Tag Manager (noscript) -->
            `,
                    }}
                ></noscript>

                {/* <ChangeLocale /> */}

                <Toaster />

                <NextTopLoader color='#01B6A2' showSpinner={false} />
                <LocaleProvider value={locale}>
                    <Providers>{children}</Providers>
                </LocaleProvider>
            </body>
        </html>
    )
}
