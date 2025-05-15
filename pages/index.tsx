'use client';

import { useEffect, useState } from "react";

export default function HomePage() {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        console.log("[MiniApp] useEffect triggered");

        if (!window.Telegram) {
            console.warn("[MiniApp] window.Telegram не найден");
            return;
        }

        const tg = window.Telegram.WebApp;

        console.log("[MiniApp] Telegram WebApp объект:", tg);

        if (!tg.initData) {
            console.warn("[MiniApp] initData пустой");
        }

        if (!tg.initDataUnsafe) {
            console.warn("[MiniApp] initDataUnsafe пустой");
        }

        if (tg?.initDataUnsafe?.user) {
            console.log("[MiniApp] Данные пользователя найдены:", tg.initDataUnsafe.user);
            setUser(tg.initDataUnsafe.user);

            // Отправка на сервер
            fetch("/api/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    initData: tg.initData
                })
            })
                .then(res => res.json())
                .then(data => console.log("[MiniApp] Ответ от сервера /api/verify:", data))
                .catch(err => console.error("[MiniApp] Ошибка при отправке на сервер:", err));
        } else {
            console.warn("[MiniApp] Пользователь не найден в initDataUnsafe");
        }
    }, []);

    return (
        <main>
            <h1>Привет, {user?.first_name || "Гость"}</h1>
            {!user && <p>Пользователь не найден или не передан Telegram.</p>}
        </main>
    );
}
