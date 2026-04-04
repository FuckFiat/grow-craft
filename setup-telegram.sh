#!/bin/bash

# Grow Craft - Telegram Web App Setup

BOT_TOKEN="8417204944:AAFjb_ByjdFtYq4iVqloarh97zz7XKyp_2E"
WEB_APP_URL="https://growcraft.loca.lt"

echo "🌿 Grow Craft - Telegram Web App Setup"
echo "========================================"
echo ""
echo "🌐 Public URL: $WEB_APP_URL/tg-app.html"
echo ""
echo "📱 Чтобы запустить в Telegram:"
echo ""
echo "1. Открой @BotFather в Telegram"
echo "2. Отправь: /newapp"
echo "3. Выбери бота: @NanoFuckerBot"
echo "4. Введи название: Grow Craft"
echo "5. Введи описание: Симулятор выращивания конопли"
echo "6. Введи URL: $WEB_APP_URL/tg-app.html"
echo "7. Загрузи иконку (512x512 PNG)"
echo ""
echo "🔗 Альтернативно, открой напрямую:"
echo ""
echo "   https://t.me/NanoFuckerBot?startapp=grow"
echo ""
echo "✅ Файлы готовы:"
echo "   - index.html (полная версия)"
echo "   - tg-app.html (мобильная версия)"
echo ""
echo "🚀 Сервер запущен на порту 8082"

# Запуск сервера на порту 8082
cd /Users/zero_mini/.openclaw/workspace/grow-game
npx http-server -p 8082