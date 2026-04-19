import type { Config } from 'tailwindcss'

const config: Config = {
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#f8f3ec',
        },
        neutral: {
          0: '#ffffff',
          25: '#f9fbff',
          50: '#f3f4f6',
          150: '#e8ecf4',
          220: '#e2e6ef',
          240: '#dce2ee',
          260: '#d1d5db',
          280: '#cfd8eb',
          400: '#a7afc0',
          500: '#8a93a8',
          700: '#6b7280',
          800: '#25324a',
          850: '#1f2940',
          900: '#111827',
        },
        blue: {
          100: '#e8f0ff',
          500: '#4f86ff',
          600: '#1d4ed8',
          950: '#172554',
        },
        green: {
          100: '#e9f8ef',
          600: '#16a34a',
          700: '#2b8a4d',
        },
      },
      borderRadius: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
      },
      fontSize: {
        title: '1.25rem',
        subtitle: '1rem',
        body: '1rem',
        small: '0.875rem',
        price: '1.875rem',
      },
      boxShadow: {
        'soft-md': '0 2px 4px rgba(17, 24, 39, 0.06), 0 8px 24px rgba(17, 24, 39, 0.05)',
        'soft-lg': '0 6px 20px rgba(15, 23, 42, 0.06)',
      },
      fontFamily: {
        sans: [
          'Lato',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif',
        ],
      },
    },
  },
}

export default config
