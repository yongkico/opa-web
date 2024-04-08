'use client'

import { JSX } from 'react'
import {
    Chart,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Legend,
    Title,
    Tooltip,
    BarElement,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { rainfallStore } from '@/store/backoffice/rainfallStore'
import { months } from '@/constants'
import Loading from '@/components/partials/Loading'

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Legend, Title, Tooltip, BarElement)

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        tooltip: {
            callbacks: {
                label: function (context) {
                    let label = context.dataset.label || ''
                    if (label) {
                        label += ': '
                    }
                    label += context.parsed.y.toLocaleString('id-ID', {
                        maximumFractionDigits: 2,
                    })
                    return label
                },
            },
        },
    },
    scales: {
        x: {
            grid: {
                display: false,
            },
        },
        y: {
            grid: {
                lineWidth: 0.5,
            },
            ticks: {
                beginAtZero: true,
                callback: function (value) {
                    return value.toLocaleString('id-ID', {
                        maximumFractionDigits: 2,
                    })
                },
            },
        },
    },
}

export default function RainfallBarChart(): JSX.Element {
    // global states
    const { rainfalls, isFetching } = rainfallStore()

    const labels = [] as string[]
    const datasets = [] as string[]

    rainfalls.data?.forEach((rainfall) => {
        months.forEach((month) => {
            if (rainfall.bulan === month.value) {
                labels.push(month.name)
            }
        })

        datasets.push(rainfall.curah_hujan)
    })

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Curah Hujan',
                data: datasets,
                fill: false,
                borderColor: '#F35A38',
                backgroundColor: '#FA6E00',
                // borderColor: '#05A18F',
                // backgroundColor: '#01B6A2',
                tension: 0.4,
            },
        ],
    }

    return (
        <div className='relative h-full w-full lg:p-4'>
            <p className='mb-4 rounded-md bg-primary p-2.5 text-center font-bold text-light'>Grafik Curah Hujan</p>

            <Bar data={data} options={options} />

            {/* loading */}
            {isFetching && (
                <div className='absolute inset-0 flex items-center justify-center rounded-lg backdrop-blur-sm'>
                    <Loading className='sm:w-32' />
                </div>
            )}
        </div>
    )
}
