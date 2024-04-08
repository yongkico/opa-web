declare namespace NodeJS {
    export interface ProcessEnv {
        readonly NEXT_PUBLIC_API_URL: string
        readonly NEXT_PUBLIC_BACKEND_URL: string
        readonly NEXT_PUBLIC_ACCESS_TOKEN: string
        readonly NEXT_PUBLIC_ROLE: string
        readonly NEXT_PUBLIC_GOOGLE_API_KEY: string
    }
}
