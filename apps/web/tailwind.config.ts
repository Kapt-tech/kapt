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
                volt: "#CEFF00",      // action-volt
                asphalt: "#0A0A0A",   // asphalt-black
                pavement: "#262626",  // pavement-gray
            },
            fontFamily: {
                mono: ["JetBrains Mono", "ui-monospace", "monospace"],
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