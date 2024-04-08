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
                    return (
                        value.toLocaleString('id-ID', {
                            maximumFractionDigits: 2,
                        }) + ' kg'
                    )
                },
            },
        },
    },
}

export default function RealizationTargetLineChart(): JSX.Element {
    // global states
    const { statistics } = statisticsStore()

    const labels = [] as string[]
    const datasets = [] as string[]
    const targets = [] as string[]

    statistics.data?.target_realisasi &&
        statistics.data?.target_realisasi.forEach((target_realisasi_item) => {
            months.forEach((month) => {
                if (target_realisasi_item.bulan === month.value) {
                    labels.push(month.name.slice(0, 3))
                }
            })

            datasets.push(target_realisasi_item.realisasi)
            targets.push(target_realisasi_item.target.toString())
        })

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Realisasi',
                data: datasets,
                fill: false,
                borderColor: '#FA6E00',
                backgroundColor: '#F35A38',
                tension: 0.4,
                pointRadius: 5,
                pointHoverRadius: 8,
            },
            {
                label: 'Target',
                data: targets,
                fill: true,
                borderColor: '#05A18F',
                backgroundColor: '#01B6A220',
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
