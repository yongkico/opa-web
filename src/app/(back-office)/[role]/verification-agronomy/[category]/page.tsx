'use client'

import { JSX } from 'react'
// import FloodedPlants from '@/components/partials/backoffice/VerificationAgronomy/FloodedPlants'
// import NumberOfStems from '@/components/partials/backoffice/VerificationAgronomy/NumberOfStems'
// import NutrientAvailibility from '@/components/partials/backoffice/VerificationAgronomy/NutrientAvailibility'
// import PopulationSize from '@/components/partials/backoffice/VerificationAgronomy/PopulationSize'
import { VerificationType } from '@/enums'
// import PlantIllegitim from '@/components/partials/backoffice/VerificationAgronomy/PlantIllegitim'
import { useParams } from 'next/navigation'
import ComingSoon from '@/components/partials/backoffice/VerificationAgronomy/ComingSoon'

export default function VerificationAgronomy(): JSX.Element {
    // query
    const query = useParams()

    // for showing agronomy verification info based on category
    function showVerificationType(query: VerificationType) {
        // switch (query) {
        //     case VerificationType.POPULATION_SIZE:
        //         return <PopulationSize />
        //     case VerificationType.NUMBER_OF_STEMS:
        //         return <NumberOfStems />
        //     case VerificationType.NUTRIENT_AVAILABILITY:
        //         return <NutrientAvailibility />
        //     case VerificationType.PLANT_MATERIAL:
        //         return <PlantIllegitim />
        //     case VerificationType.FLOODED_PLANTS:
        //         return <FloodedPlants />
        //     default:
        //         return <ComingSoon />
        // }
        switch (query) {
            case VerificationType.POPULATION_SIZE:
                return <ComingSoon />
            case VerificationType.NUMBER_OF_STEMS:
                return <ComingSoon />
            case VerificationType.NUTRIENT_AVAILABILITY:
                return <ComingSoon />
            case VerificationType.PLANT_MATERIAL:
                return <ComingSoon />
            case VerificationType.FLOODED_PLANTS:
                return <ComingSoon />
            default:
                return <ComingSoon />
        }
    }

    return (
        <div className='container min-h-screen px-0 py-4 lg:py-8'>
            {showVerificationType(query.category as VerificationType)}
        </div>
    )
}
