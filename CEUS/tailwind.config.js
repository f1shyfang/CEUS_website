/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        editorial: ['var(--font-literata)', 'Georgia', 'serif'],
      },
      keyframes: {
        'collage-scroll': {
          // Starts one full photo-set above its resting position and settles
          // back to it, so the duplicated track loops without a visible seam.
          from: { transform: 'translateY(-50%)' },
          to: { transform: 'translateY(0)' },
        },
      },
      animation: {
        'collage-scroll': 'collage-scroll 50s linear infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
