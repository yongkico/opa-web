'use client'

import { JSX, useState } from 'react'
import { Autocomplete, useJsApiLoader } from '@react-google-maps/api'
import { Input } from '@nextui-org/react'
import { Library } from '@googlemaps/js-api-loader'
import { globalStore } from '@/store/backoffice/global'

// this is solve warning from gmaps
const libraries: Library[] = ['places']

type Props = {
    initialAddress?: string
}

export default function AutoCompleteMap({ initialAddress }: Props): JSX.Element {
    // states
    const [selectedPlace, setSelectedPlace] = useState<string>()
    const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null)

    // global states
    const { setCoordinate } = globalStore()

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
        libraries: libraries,
    })

    const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
        setAutocomplete(autocomplete)
    }

    return (
        <div>
            {isLoaded && (
                <Autocomplete
                    onLoad={onLoad}
                    restrictions={{ country: 'id' }}
                    onPlaceChanged={() => {
                        const place = autocomplete?.getPlace()

                        setCoordinate({
                            lat: place?.geometry?.location?.lat().toString()!,
                            lng: place?.geometry?.location?.lng().toString()!,
                        })

                        setSelectedPlace(`${place?.formatted_address}`)
                    }}
                >
                    <div>
                        <Input
                            classNames={{
                                inputWrapper: 'border apply-dark',
                            }}
                            onChange={(e) => setSelectedPlace(e.target.value)}
                            name='address'
                            labelPlacement='outside'
                            radius='sm'
                            variant='bordered'
                            placeholder='Masukkan alamat kebun'
                            value={selectedPlace ?? initialAddress}
                        />
                    </div>
                </Autocomplete>
            )}
        </div>
    )
}
