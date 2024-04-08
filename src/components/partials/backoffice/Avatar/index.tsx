import { JSX } from 'react'
import AssetAvatar from '@/assets/asset-avatar.png'
import Image from 'next/image'

export default function Avatar(): JSX.Element {
    return (
        <figure>
            <Image src={AssetAvatar} alt='Avatar' />
        </figure>
    )
}
