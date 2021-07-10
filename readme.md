# Presetting `.env`

Для успешной работы приложения, важно создать в корне проекта `.env` файл со следующими переменными окружения:

```shell
PORT=
MONGO_DB_URL=
JWT_SECRET=
SALT_ROUNDS=
```

# Работа с пользователями `users`

## @ POST /api/users/signup

Регистрация пользователя.

- Получает `body` в json-формате c обязательными полями `email` и `password`.
- `email` должен быть уникальным. В противном случае, возвращает json с ключом `"message": "Email in use"` и статусом `409`.
- По результату работы функции возвращает объект контакта со статусом `200`.

## @ POST /api/users/login

Логин пользователя.

- Получает `body` в json-формате c обязательными полями `email` и `password`.
- Если пользователя с таким `email` не найдно в базе данных или его пароль не совпал - возвращает json с ключом `"message": "Email or password is wrong"` со статусом `401`.
- Если с `email` и `password` все хорошо, то обновляет значение токена контакта в базе данных.
- По результату работы функции возвращает обновленный объект юзера с токеном и статусом `200`.

## @ POST /api/users/logout

Логаут пользователя

- Запрос должен содержать заголовок `Authorization` со значением токена и обязательным указанием его типа `Bearer`.
- Если токен валиден, удаляет значение токена юзера в базе данных. В противном случае, возвращает json с ключом `"message": "Not authorized"` и статусом `401`.
- По результату работы отправляет ответ со статусом `204`

## @ GET /api/users/current

Текущий пользователь - получить данные юзера по токену

- Запрос должен содержать заголовок `Authorization` со значением токена и обязательным указанием его типа `Bearer`.
- Проверяет валидность токена
- Если с токеном всё хорошо возвращает объект контакта со статусом `200`. В противном случае возвращает json с ключом `"message": "Not authorized"` и статусом `401`.

## @ PATCH /api/users/

Эндпоинт обновление подписки ( `subscription` ) пользователя

- Получает `body` в json-формате c обязательным полем `subscription`
- Запрос должен содержать заголовок `Authorization` со значением токена и обязательным указанием его типа `Bearer`.
- Подписка ( `subscription` ) должна иметь одно из следующих значений `['starter', 'pro', 'business']`
- Если с токеном всё хорошо возвращает объект контакта с обновлённым полем `subscription` и статусом `200`.

# Работа с коллекциями контактов `contacts`

Любой запрос должен содержать заголовок `Authorization` со значением токена и обязательным указанием его типа `Bearer`. В противном случае возвращает json с ключом `"message": "Not authorized"` и статусом `401`.

## @ GET /api/contacts/

Получение всего списка контактов с поддержкой пагинации

- Если с токеном всё хорошо возвращает объект контакта (со статусом `200`) и в полезную нагрузку такие поля как:
  - `totalDocs`: общее колличество контактов
  - `limit`: лимит контактов на одной странице `page` (лимит по умолчанию всегда `5`)
  - `page`: номер страницы (по умолчанию всегда `1`)
- Поддерживает следующие параметры запросов `query string`:
  - `page`: указание номера страницы,
  - `limit`: указание лимита контактов на одной странице,
  - `favorite`: сортировка контактов, которые добавлены\не добавлены в избранное (может содержать `favorite=true` или `favorite=false`)
- Параметры запроса настроены таким образом, что могут быть указаны все сразу, а можно использовать только один (или несколько)

## @ GET /api/contacts/:contactId

Получение контакта по его `id`.

- Получает `contactId`, обязательный динамический параметр, означающий id контакта, который хотим получить
- Можно получить только свои контакты (текущего авторизированного юзера)
- Получить данные по контакту другого юзера невозможно, будет возвращён json с ключом `"message": "Not found"` и статусом `404`.
- Если с токеном всё хорошо возвращает объект контакта по его `id` со статусом `200`.

## @ POST /api/contacts/

Добавление нового контакта

- Получает `body` в json-формате c обязательными полями `name`, `email` и `phone`. В противном случае возвращает json с ключом `"message"` и указание какое поле пропустили (со статусом `400`).
- По результату работы функции возвращает объект контакта со статусом `201`.

## @ PATCH /api/contacts/:contactId/favorite

Обновление статуса добавления в избранное контакта (`favorite`)

- Получает `contactId`, обязательный динамический параметр, означающий id контакта, который хотим обновить
- Получает `body` в json-формате c обязательным полем `favorite`. В противном случае возвращает json с ключом `"message": "missing field favorite"` и статусом `400`.
- Если контакта с указанным `id` не найдено, возвращает json с ключом `"message": "Not found"` и статусом `404`.
- По результату работы функции возвращает объект контакта с обновлённым значением `favorite` и статусом `200`.

## @ DELETE /api/contacts/:contactId

Удаление контакта по его `id`

- Получает `contactId`, обязательный динамический параметр, означающий id контакта, который хотим удалить
- Если контакта с указанным `id` не найдено, возвращает json с ключом `"message": "Not found"` и статусом `404`.
- По результату работы функции возвращает json с ключом `"message": "contact deleted` и статусом `200`.

## @ PUT /api/contacts/:contactId/

Обновление полей контакта по его `id`

- Получает `body` в json-формате c необязательными полями `name`, `email`, `phone` и `favorite`. (Можно обновить одно, или несколько сразу полей)
- Получает `contactId`, обязательный динамический параметр, означающий id контакта, который хотим обновить
- Если контакта с указанным `id` не найдено, возвращает json с ключом `"message": "Not found"` и статусом `404`.
- Обновить возможно только поля `name`, `email`, `phone` и `favorite`.
- По результату работы функции возвращает json с ключом `"message": "contact deleted` и статусом `200`.
