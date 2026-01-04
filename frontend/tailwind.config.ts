import type { Config } from 'tailwindcss'

const config: Config = {
    darkMode: ['class'],
    content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
	theme: {
    	extend: {
    		colors: {
    			brand: {
    				black: '#000000',
    				white: '#ffffff',
    				blue: '#3b82f6',
    				'blue-light': '#60a5fa',
    				'blue-dark': '#2563eb',
    				orange: '#f97316',
    				'orange-light': '#fb923c',
    				'orange-dark': '#ea580c'
    			},
    			dark: {
    				'50': '#f8fafc',
    				'100': '#f1f5f9',
    				'200': '#e2e8f0',
    				'300': '#cbd5e1',
    				'400': '#94a3b8',
    				'500': '#64748b',
    				'600': '#475569',
    				'700': '#334155',
    				'800': '#1e293b',
    				'900': '#0f172a',
    				'950': '#020617'
    			},
    			background: 'oklch(var(--background))',
    			foreground: 'oklch(var(--foreground))',
    			card: {
    				DEFAULT: 'oklch(var(--card))',
    				foreground: 'oklch(var(--card-foreground))'
    			},
    			popover: {
    				DEFAULT: 'oklch(var(--popover))',
    				foreground: 'oklch(var(--popover-foreground))'
    			},
    			primary: {
    				DEFAULT: 'oklch(var(--primary))',
    				foreground: 'oklch(var(--primary-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'oklch(var(--secondary))',
    				foreground: 'oklch(var(--secondary-foreground))'
    			},
    			muted: {
    				DEFAULT: 'oklch(var(--muted))',
    				foreground: 'oklch(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'oklch(var(--accent))',
    				foreground: 'oklch(var(--accent-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'oklch(var(--destructive))',
    				foreground: 'oklch(var(--destructive-foreground))'
    			},
    			border: 'oklch(var(--border))',
    			input: 'oklch(var(--input))',
    			ring: 'oklch(var(--ring))',
    			chart: {
    				'1': 'var(--chart-1)',
    				'2': 'var(--chart-2)',
    				'3': 'var(--chart-3)',
    				'4': 'var(--chart-4)',
    				'5': 'var(--chart-5)'
    			},
    			sidebar: {
    				DEFAULT: 'hsl(var(--sidebar-background))',
    				foreground: 'hsl(var(--sidebar-foreground))',
    				primary: 'hsl(var(--sidebar-primary))',
    				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
    				accent: 'hsl(var(--sidebar-accent))',
    				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
    				border: 'hsl(var(--sidebar-border))',
    				ring: 'hsl(var(--sidebar-ring))'
    			}
    		},
    		fontFamily: {
    			sans: [
    				'var(--font-geist-sans)',
    				'system-ui',
    				'-apple-system',
    				'BlinkMacSystemFont',
    				'Segoe UI"',
    				'Roboto',
    				'Helvetica Neue"',
    				'Arial',
    				'sans-serif'
    			],
    			body: [
    				'var(--font-geist-sans)',
    				'system-ui',
    				'-apple-system',
    				'sans-serif'
    			],
    			mono: [
    				'var(--font-jetbrains)',
    				'monospace'
    			]
    		},
    		animation: {
    			gradient: 'gradient 8s linear infinite',
    			'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite'
    		},
    		keyframes: {
    			gradient: {
    				'0%, 100%': {
    					backgroundPosition: '0% 50%'
    				},
    				'50%': {
    					backgroundPosition: '100% 50%'
    				}
    			}
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		}
    	}
    },
  plugins: [require("tailwindcss-animate")],
}
export default config
