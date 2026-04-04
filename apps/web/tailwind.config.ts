import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                actionVolt: "#CEFF00",
                asphaltBlack: "#0A0A0A",
                pavementGray: "#262626",
            },
            fontFamily: {
                mono: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"],
            },
            borderRadius: {
                card: "16px",
            },
            transitionTimingFunction: {
                kapt: "cubic-bezier(0.4, 0, 0.2, 1)",
            },
            transitionDuration: {
                kapt: "200ms",
            },
        },
    },
    plugins: [],
};

export default config;