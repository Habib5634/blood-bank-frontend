/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'herobg': "url('/assets/heroBg.jpg')",
      
        // 'footer-texture': "url('images/footer-texture.png')",
      },
      boxShadow: {
        shad: '0px 0px 6px 6px #c2c0c033',
        lightshad: '0px 0px 8px 0px #0000001A',
        custom: '0 0 20px 0 rgba(0, 0, 0, 0.1)',
        
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        red:'#ef4444',
        lightBlue:'#dbeafe',
        blue:'#3b82f6',
        darkBlue:'#4802BA'
      },
    },
  },
  plugins: [],
};
