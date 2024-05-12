# Описание API
Для генерации документации WebAPI через `redocly`:
```
redocly build-docs openapi.yml -o openapi.html
```
Через официальный докер-образ:
```
sudo docker run --rm -v $PWD:/spec redocly/cli build-docs openapi.yml -o openapi.html
```

В директории сгенерируется HTML-страница [`openapi.html`](openapi.html)
