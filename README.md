# ThunderBoard
Система управления проектами.

## Команда
+ [Воротников Андрей](https://github.com/aVorotnikov)
+ [Кожевникова Диана](https://github.com/diakozhh)
+ [Павлов Илья](https://github.com/IlyaP01)

## Структура репозитория
+ [Документы](docs)
+ [Скрипты для базы данных](sql)

## Зависимости:
Необходимые пакеты:
* Python 3.10
* pip
* python3.10-venv
* nodejs не ниже 12.22.9

Действия ниже выполняются из корня проекта.

Установка зависимостей фронтенда:
```sh
npm install
```

Установка зависимостей бэкенда:
```sh
cd api
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### База данных
Установка PostgreSQL:
```sh
sudo apt install postgresql
```

Конфигурирование PostgreSQL. В командной оболочке PostgreSQL(`sudo -u postgres psql`):
```psql
CREATE DATABASE thunder_board;
\password postgres # Ввести пароль (aaaaaa)
```

Создание БД:
```sh
export PGPASSWORD=aaaaaa
psql -U postgres -d thunder_board -a -f ./sql/create_db.sql
psql -U postgres -d thunder_board -a -f ./sql/test_data/insert.sql # Вставить тестовые данные
```

## Запуск проекта в режиме разработки:
Запуск фронта:
```sh
npm start
```
Запуск API-сервера (из корня проекта):
```sh
npm run start-api
```

Фронтенд запускается на порте 3000 и проксирует запросы API-серверу на порт 5000.

## Деплой
Сборка бандла фронтенда:
```sh
npm run build
```
