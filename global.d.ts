namespace NodeJS {
    interface ProcessEnv {
        BACKEND_PORT: number,
        CONTEXT: string,
        DB_HOST: string,
        DB_PORT: number,
        DB_USER: string,
        DB_PASSWORD: string | number,
        DB_DATABASE: string,
        DB_SYNC: boolean,
        MAIL_HOST: string,
        MAIL_PORT: number,
        MAIL_USER: string,
        MAIL_PASSWORD: string | number,
        REDIS_PORT: number,
        REDIS_HOST: string,
        JWT_SECRET_PASSWORD: string | number,
        JWT_TIME_VALID_TOKEN: number | string
    }
}