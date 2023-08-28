/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './sections/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: "#02DAC5",
        background: "#040D1F",
        textWhite: "#D3D3D3",
        bgHeader: "rgba(0, 168, 204, 0.5)"
      }
    },
    fontSize: {
      xxs: '8px',
      xs: '12px',
      sm: '14px',
      base: '16px',
      md: '20px',
      lg: '32px',
      xl: '36px',
      '2xl': '48px',
      '3xl': '56px',
      '4xl': '64px',
    }
  },
  plugins: [],
}
