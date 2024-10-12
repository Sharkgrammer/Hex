/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'main': '#F4A300',
                'main-dark': '#D68800',
                'main-darker': '#A96500',
                'main-darkest': '#804C00',
                'main-light': '#FFC45E',
            },
            scale: {
                '175': '1.75',
                '200': '2',
            },
            screens: {
                'xs': '440px',
            },
            animation: {
                'fade-in': 'fade-in 500ms',
                'op-fade': 'op-fade 500ms',
            },
            keyframes: {
                'fade-in': {
                    '0%': {opacity: 0, transform: "scale(0.5)"},
                    '100%': {opacity: 1, transform: "scale(1)"},
                },
                'op-fade': {
                    '0%': {opacity: 1},
                    '100%': {opacity: 0.5},
                },
            },
        },
    },
    plugins: [],
}

