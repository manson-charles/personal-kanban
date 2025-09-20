# Kanban Personal Manager (Monorepo)

## Запуск проекта

### 1. Backend (NestJS)
- Установи зависимости:
  ```
  cd backend
  npm install
  ```
- Скопируй `.env.example` в `.env` и заполни параметры PostgreSQL.
- Запусти сервер:
  ```
  npm run start:dev
  ```
- Сервер стартует на http://localhost:3001

### 2. Frontend (React + Vite + Tailwind)
- Установи зависимости:
  ```
  cd frontend
  npm install
  ```
- Запусти фронтенд:
  ```
  npm run dev
  ```
- Приложение доступно на http://localhost:5173

---

## Структура
- `/backend` — NestJS API, подключение к PostgreSQL
- `/frontend` — React + Tailwind UI