import type { Config } from 'tailwindcss'

const config: Config = {
  theme: {
    extend: {
      colors: {
        'background-page': '#f3f4f6',
        'background-surface': '#ffffff',
        'border-subtle': '#d1d5db',
        'text-primary': '#111827',
        'text-secondary': '#6b7280',
        'text-brand': '#1d4ed8',
        success: '#16a34a',
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
        card: '0 2px 4px rgba(17, 24, 39, 0.06), 0 8px 24px rgba(17, 24, 39, 0.05)',
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
