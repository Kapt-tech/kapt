import type { Config } from "tailwindcss";
import sharedConfig from "@kapt/tailwind-config";

const config: Config = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "../../packages/ui/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    presets: [sharedConfig],
};

export default config;