'use client'

import { JSX } from 'react'
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Legend, Title, Tooltip, Filler } from 'chart.js'
import { Line } from 'react-chartjs-2'
import { statisticsStore } from '@/store/backoffice/statisticsStore'
import { months } from '@/constants'

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Legend, Title, Tooltip, Filler)

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
                    return value.toLocaleString('id-ID', {}) + ' ton'
                },
            },
        },
    },
}

export default function NumberOfStemsMaxMinLineChart(): JSX.Element {
    // global states
    const { statistics } = statisticsStore()

    const labels = [] as string[]
    const datasets = [] as string[]
    const max = [] as string[]
    const min = [] as string[]

    statistics.data?.jumlah_tandan_per_pohon &&
        statistics.data?.jumlah_tandan_per_pohon.forEach((jumlah_tandan_per_pohon_item) => {
            months.forEach((month) => {
                if (jumlah_tandan_per_pohon_item.bulan === month.value) {
                    labels.push(month.name.slice(0, 3))
                }
            })

            datasets.push(jumlah_tandan_per_pohon_item.jumlah_tandan_per_pohon.toString())
            max.push(jumlah_tandan_per_pohon_item.max.toString())
            min.push(jumlah_tandan_per_pohon_item.min.toString())
        })

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Max',
                data: max,
                fill: false,
                borderColor: '#05A18F',
                backgroundColor: '#01B6A2',
                tension: 0.4,
                pointRadius: 3,
                pointHoverRadius: 8,
            },
            {
                label: 'TBS / Ton',
                data: datasets,
                fill: true,
                borderColor: '#F35A38',
                backgroundColor: '#F35A3825',
                tension: 0.4,
                pointRadius: 3,
                pointHoverRadius: 8,
            },
            {
                label: 'Min',
                data: min,
                fill: false,
                borderColor: '#05A18F',
                backgroundColor: '#01B6A2',
                tension: 0.4,
                pointRadius: 3,
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
