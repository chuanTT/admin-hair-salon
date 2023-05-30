/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require("tailwindcss/plugin")
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  important: false,
  theme: {
    extend: {
      width: {
        16: '16.25rem'
      },

      screens: {
        1200: '1200px'
      }
    }
  },
  plugins: [
    plugin(({ addComponents, theme }) => {
      addComponents({
        ".zoomin": {
          "--tw-scale-x": "1 !important",
          "--tw-scale-y": "1 !important",
          transform: `translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)) !important`
        },

        ".zoomout": {
          "--tw-scale-x": "0.8",
          "--tw-scale-y": "0.8",
          transform: `translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))`
        },

        // '.content': {
        //   'width': `calc(100% - ${theme('width.16')} - 26px * 2)`,

        
      // },
      })
    })
  ]
}
