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
                    return value.toLocaleString('id-ID')
                },
            },
        },
    },
}

export default function NumberOfStemsLineChart(): JSX.Element {
    // global states
    const { statistics } = statisticsStore()

    const labels = [] as string[]
    const datasets = [] as string[]

    statistics.data?.jumlah_tandan &&
        statistics.data?.jumlah_tandan.forEach((jumlah_tandan_item) => {
            months.forEach((month) => {
                if (jumlah_tandan_item.bulan === month.value) {
                    labels.push(month.name.slice(0, 3))
                }
            })

            datasets.push(jumlah_tandan_item.total_tandan.toString())
        })

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Jumlah Tandan',
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