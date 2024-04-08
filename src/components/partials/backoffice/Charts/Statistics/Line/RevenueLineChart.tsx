'use client'

import { JSX } from 'react'
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Legend, Title, Tooltip } from 'chart.js'
import { Line } from 'react-chartjs-2'
import { statisticsStore } from '@/store/backoffice/statisticsStore'
import { months } from '@/constants'

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Legend, Title, Tooltip)

const options: any = {
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
            ticks: {
                callback: function (val: number) {
                    return val.toLocaleString('id-ID', {
                        currency: 'IDR',
                        style: 'currency',
                        maximumFractionDigits: 0,
                        notation: 'compact',
                    })
                },
            },
        },
    },
}

// const angka = 40000
// angka.

export default function RevenueLineChart(): JSX.Element {
    // global states
    const { statistics } = statisticsStore()

    const labels = [] as string[]
    const datasets = [] as string[]

    statistics.data?.pendapatan &&
        statistics.data?.pendapatan.forEach((pendapatan_item) => {
            months.forEach((month) => {
                if (pendapatan_item.bulan === month.value) {
                    labels.push(month.name.slice(0, 3))
                }
            })

            datasets.push(pendapatan_item.pendapatan)
        })

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Pendapatan',
                data: datasets,
                fill: false,
                borderColor: '#FA6E00',
                backgroundColor: '#F35A38',
                tension: 0.4,
                pointRadius: 5,
                pointHoverRadius: 8,
            },
        ],
    }

    return (
        <div className='h-full w-full'>
            <Line data={data} options={options} />
        </div>
    )
}
