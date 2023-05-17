/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require("tailwindcss/plugin")
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  important: false,
  theme: {
    extend: {}
  },
  plugins: [
    plugin(({ addComponents }) => {
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
        }
      })
    })
  ]
}
