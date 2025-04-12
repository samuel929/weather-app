
interface ImportMetaEnv {
    readonly VITE_BASE_URL: string
    readonly VITE_API_KEY: string
    // add more env vars as needed
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
  