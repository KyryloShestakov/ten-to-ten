// types/telegram.d.ts

interface TelegramUser {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
    is_premium?: boolean;
}

interface TelegramWebAppInitDataUnsafe {
    query_id?: string;
    user?: TelegramUser;
    auth_date?: number;
    hash?: string;
    [key: string]: any;
}

interface TelegramWebApp {
    initData: string;
    initDataUnsafe: TelegramWebAppInitDataUnsafe;
    close(): void;
    expand(): void;
    showAlert(message: string): void;
    showConfirm(message: string): Promise<boolean>;
    // и другие методы по необходимости
}

interface Window {
    Telegram?: {
        WebApp: TelegramWebApp;
    };
}
