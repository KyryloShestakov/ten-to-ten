'use client'; // если используешь App Router

import { useEffect, useState } from "react";

export default function HomePage() {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const tg = window.Telegram?.WebApp;

        if (tg?.initDataUnsafe?.user) {
            setUser(tg.initDataUnsafe.user);
            console.log("Пользователь:", tg.initDataUnsafe.user);

            // Отправить данные на сервер для верификации
            fetch("/api/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    initData: tg.initData
                })
            })
                .then(res => res.json())
                .then(data => console.log("Проверка:", data))
                .catch(err => console.error(err));
        }
    }, []);

    return (
        <main>
            <h1>Привет, {user?.first_name || "Гость"}</h1>
        </main>
    );
}
