import { AssetsHeader } from '@/assets'
import clsx from 'clsx'
import { ClassValue } from 'clsx'
import { FormEvent } from 'react'
import { twMerge } from 'tailwind-merge'

/** tailwind classnames merger */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

/** get period of day like morning, afternoon, etc */
export function getPeriod() {
    const time: number = new Date().getHours()

    switch (true) {
        case time > 0 && time <= 11:
            return 'Selamat Pagi'
        case time > 11 && time <= 14:
            return 'Selamat Siang'
        case time > 14 && time <= 18:
            return 'Selamat Sore'
        case (time > 18 && time <= 24) || time === 0:
            return 'Selamat Malam'
        default:
            return ''
    }
}

/** return false if not in array */
export function inArray<T>(needle: T, haystack: Array<T>, strict: boolean = true): boolean {
    if (strict) {
        for (let i: number = 0; i <= haystack.length; i++) {
            if (haystack[i] === needle) return true
        }

        return false
    }

    for (let i: number = 0; i <= haystack.length; i++) {
        if (haystack[i] == needle) return true
    }

    return false
}

export const getTodayDate = (): string => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate())

    return tomorrow.toJSON().slice(0, 10)
}

export const getRole = (currentRole: string) => {
    switch (true) {
        case currentRole === 'Administrator':
            return 'administrator'
        case currentRole === 'Member':
            return 'member'
        case currentRole === 'Author':
            return 'author'
        default:
            return ''
    }
}

export function setPeriodAsset() {
    switch (true) {
        case getPeriod() === 'Selamat Pagi':
            return AssetsHeader.asset_morning
        case getPeriod() === 'Selamat Siang':
            return AssetsHeader.asset_daylight
        case getPeriod() === 'Selamat Sore':
            return AssetsHeader.asset_afternoon
        default:
            return AssetsHeader.asset_evening
    }
}

export function setPeriodMascotAsset() {
    switch (true) {
        case getPeriod() === 'Selamat Pagi':
            return AssetsHeader.asset_mascot_morning
        case getPeriod() === 'Selamat Siang':
            return AssetsHeader.asset_mascot_daylight
        case getPeriod() === 'Selamat Sore':
            return AssetsHeader.asset_mascot_afternoon
        default:
            return AssetsHeader.asset_mascot_evening
    }
}

export function formatInput(e: FormEvent<HTMLInputElement>) {
    let value = e.currentTarget.value
        .replace(/[^0-9,]/g, '')
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
        .replace(/(\,\d{2})\d+/g, '$1')

    e.currentTarget.value = value
}

export function formatNumberToLocal(input: string) {
    // Menggunakan regex untuk memisahkan bagian bilangan bulat dan desimal, termasuk nilai minus
    let parts = input?.match(/^(-?\d+)(?:\.(\d+))?$/)

    if (parts) {
        let integerPart = parts[1].replace(/\B(?=(\d{3})+(?!\d))/g, '.')

        // Menangani jika desimal tidak ada
        let decimalPart = parts[2] ? ',' + parts[2] : ''

        return integerPart + decimalPart
    }

    // Jika input tidak sesuai format, maka kembalikan input asli
    return input
}

export function formatNumberToIndonesian(input: string) {
    // Pisahkan nilai menjadi bagian sebelum dan sesudah titik/koma
    var splitValue = input.toString().split(/[.,]/)

    // Bagian sebelum titik/koma
    var firstPart = splitValue[0]

    // Bagian sesudah titik/koma, jika ada
    var secondPart = splitValue[1] || ''

    // Tambahkan titik sebagai pemisah ribuan
    firstPart = firstPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.')

    // Gabungkan kembali bagian-bagian
    return firstPart + (secondPart.length ? ',' + secondPart : '')
}

export function formatDateToHumanReadable(date: string) {
    return new Date(date).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}

export function filterArrayOfObjects(array, keys) {
    return array.map(function (obj) {
        let result = {}

        keys.forEach(function (key) {
            if (obj.hasOwnProperty(key)) {
                result[key] = formatNumberToLocal(obj[key])
            }
        })
        return result
    })
}

export function getCookie(cname: string) {
    let name = cname + '='
    let ca = document.cookie.split(';')
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i]
        while (c.charAt(0) == ' ') {
            c = c.substring(1)
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length)
        }
    }
    return ''
}
