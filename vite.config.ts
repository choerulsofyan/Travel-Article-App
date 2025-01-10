import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: "autoUpdate",
            devOptions: {
                enabled: true,
            },
            manifest: {
                name: "Travel Article App",
                short_name: "AdminApp",
                description: "Travel Article App description",
                theme_color: "#ffffff",
                icons: [
                    {
                        src: "pwa-192x192.png", // Path to your icon
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "pwa-512x512.png", // Path to your icon
                        sizes: "512x512",
                        type: "image/png",
                    },
                    {
                        src: "pwa-512x512.png", // Path to your icon
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "any maskable", // Add maskable icon for better display
                    },
                ],
            },
        }),
    ],
});
