# Environment Variables

Документация по переменным окружения для проекта.

## Обязательные переменные

### Mapbox Configuration

```bash
# Токен доступа к Mapbox API
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here

# URL стиля карты Mapbox
NEXT_PUBLIC_MAPBOX_STYLE_URL=mapbox://styles/your_username/your_style_id
```

**Где получить:**
- Зарегистрируйтесь на [mapbox.com](https://www.mapbox.com/)
- Создайте токен в разделе "Access tokens"
- Создайте стиль карты в Mapbox Studio

---

## Опциональные переменные

### Cruise Configuration

```bash
# Код круиза для отображения на лендинге
# По умолчанию: CPTUSH25
NEXT_PUBLIC_CRUISE_CODE=CPTUSH25
```

**Доступные коды:**
- `CPTUSH25` - Cape Town to Ushuaia 2025 (14 Jan - 12 Feb 2025)
- `CPTUSH26` - Cape Town to Ushuaia 2026 (14 Jan - 12 Feb 2026)

**Использование:**
```typescript
import { getCurrentCruiseConfig } from '@/lib/cruise-config'

const config = getCurrentCruiseConfig()
console.log(config.year) // "2025" или "2026"
```

---

## Файлы окружения

### `.env.local` (для локальной разработки)
```bash
NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ1...
NEXT_PUBLIC_MAPBOX_STYLE_URL=mapbox://styles/...
NEXT_PUBLIC_CRUISE_CODE=CPTUSH25
```

### `.env.production` (для продакшена)
Установите через Vercel Dashboard или другую платформу деплоя.

### `.env.example` (шаблон)
```bash
# Mapbox
NEXT_PUBLIC_MAPBOX_TOKEN=
NEXT_PUBLIC_MAPBOX_STYLE_URL=

# Cruise Configuration (optional)
NEXT_PUBLIC_CRUISE_CODE=CPTUSH25
```

---

## Важные заметки

### Префикс `NEXT_PUBLIC_`

⚠️ **Все переменные для клиентской части должны начинаться с `NEXT_PUBLIC_`**

- **С префиксом** (`NEXT_PUBLIC_*`) - доступны в браузере
- **Без префикса** - доступны только на сервере

### Безопасность

- ❌ **НЕ коммитьте** `.env.local` в git
- ✅ **Коммитьте** `.env.example` как шаблон
- ✅ `.env.local` уже в `.gitignore`

### Изменение переменных

После изменения переменных окружения:

```bash
# Перезапустите dev сервер
npm run dev
```

Для продакшена:
- Обновите переменные в Vercel/другой платформе
- Сделайте redeploy

---

## Troubleshooting

### Переменная не работает

1. Проверьте префикс `NEXT_PUBLIC_`
2. Перезапустите dev сервер
3. Проверьте `.env.local` на опечатки
4. Убедитесь, что файл в корне проекта

### Карта не загружается

```bash
# Проверьте токен Mapbox
echo $NEXT_PUBLIC_MAPBOX_TOKEN

# Должен начинаться с "pk."
```

### Круиз не переключается

```bash
# Проверьте код круиза
echo $NEXT_PUBLIC_CRUISE_CODE

# Должен быть: CPTUSH25 или CPTUSH26
```

---

## Дополнительная информация

- [Next.js Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)
- [Mapbox Documentation](https://docs.mapbox.com/)
- [Cruise Configuration Guide](./lib/cruise-config.md)
