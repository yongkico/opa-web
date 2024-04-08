import { JSX } from 'react'
import Image from 'next/image'
import AssetLogo from '@/assets/svg/asset-logo-opa.svg'
import AssetLogoDark from '@/assets/svg/asset-logo-opa-dark.svg'

export default function Logo({ className, dark = false }: { className?: string; dark?: boolean }): JSX.Element {
    return (
        <figure>
            {dark ? (
                <Image className={className} src={AssetLogoDark} alt='Logo' priority />
            ) : (
                <Image className={className} src={AssetLogo} alt='Logo' priority />
            )}
        </figure>
    )
}
