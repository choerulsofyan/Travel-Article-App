interface AppConfig {
    apiBaseUrl: string;
}

const config: AppConfig = {
    apiBaseUrl: "https://extra-brooke-yeremiadio-46b2183e.koyeb.app/api", // import.meta.env.VITE_API_BASE_URL,
};

if (!config.apiBaseUrl) {
    console.warn("API base URL is not set");
}

export default config;
