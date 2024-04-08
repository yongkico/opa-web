import AddVarietyModal from '@/components/partials/backoffice/Modals/Varieties/AddVarietyModal'
import VarietiesTable from '@/components/partials/backoffice/Tables/Varieties/VarietiesTable'
import { JSX } from 'react'

export default function Varieties(): JSX.Element {
    return (
        <main className='container space-y-4 px-0 py-4 lg:space-y-8 lg:py-8'>
            <header className='apply-dark flex items-center justify-between gap-4 rounded-lg bg-white p-4 lg:p-8'>
                <h1 className='text-xl'>Varietas Tanaman</h1>

                <AddVarietyModal />
            </header>

            <section>
                <VarietiesTable />
            </section>
        </main>
    )
}
