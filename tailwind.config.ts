import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
    darkMode: ["class"],
    content: ["./src/**/*.tsx"],
  theme: {
  	extend: {
		lineHeight: {
			'extra-loose': '3',
		  },
  		fontFamily: {
  			sans: ["var(--font-geist-sans)", ...fontFamily.sans],
			  Thai: ['Noto Sans Thai'],
			  BaiJamjuree: ['Bai Jamjuree'],

  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
			  grumpyGreen: {
				100: '#85AF97',
				300: '#5E8C7B',
				500: '#39675D',
				700: '#21443E',
			  },
			  oldyGoldy: '#E5A827',
			  cream: '#F7EFC2',
			  redWine: '#A72305',
			  greenText: '#0C453E',
			  buttonMiddle: '#15786C',
			  buttonFirst: '#ADDB64',
			  heroFirst: '#ADDB64',
			  heroMiddle: '#15786C',
			  gray: '#D9D9D9',
			  formText: '#141547',
			  greenishCream: '#ECF5C8',
			  landingGreen: 'ADDB64',
  		}
  	}
  },
//   plugins: [require("tailwindcss-animate")],
} satisfies Config;
