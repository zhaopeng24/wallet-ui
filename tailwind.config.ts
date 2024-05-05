<<<<<<< HEAD
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
=======
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
>>>>>>> 46e3dff45f1e10a18c8e69e466c68ba930f7a0db
  ],
  theme: {
    extend: {
      backgroundImage: {
<<<<<<< HEAD
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
=======
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
>>>>>>> 46e3dff45f1e10a18c8e69e466c68ba930f7a0db
      },
    },
  },
  plugins: [],
<<<<<<< HEAD
}
export default config
=======
};
export default config;
>>>>>>> 46e3dff45f1e10a18c8e69e466c68ba930f7a0db
