import type { Config } from 'tailwindcss'
import { nextui } from '@nextui-org/react'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            colors: {
                primary: '#01B6A2',
                secondary: '#FA6E00',
                tertiary: '#F35A38',
                accent: '#05A18F',
                dark: '#022b3a',
                light: '#FAFAFA',
                grey: '#808080',
            },
            fontFamily: {
                quicksand: ['Quicksand', 'sans-serif'],
                poppins: ['Poppins', 'sans-serif'],
                inter: ['Inter', 'sans-serif'],
            },
            container: {
                center: true,
                padding: '1rem',
                screens: {
                    sm: '640px',
                    md: '768px',
                    lg: '1024px',
                    xl: '1200px',
                    '2xl': '1320px',
                },
            },
            minWidth: {
                '1/2': '50%',
                '1/3': '33.333%',
                '3/4': '75%',
            },
        },
    },
    darkMode: 'class',
    plugins: [require('@tailwindcss/typography'), nextui()],
}
export default config
