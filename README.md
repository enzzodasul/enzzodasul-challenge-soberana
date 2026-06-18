# API de Produtos

Backend para consumo de frontend.

A API permite criar, listar, detalhar, atualizar e deletar produtos.

## Tecnologias

- Node.js
- Express
- SQLite

## Requisitos

- Node.js 18 ou superior
- npm

## Instalar dependencias

```bash
npm install
```

## Rodar a aplicacao

Modo desenvolvimento:

```bash
npm run dev
```

A API ficara disponivel em:

```text
http://localhost:3000
```

O banco SQLite fica no arquivo `database.sqlite`, é criado automaticamente na primeira execucao.


Os testes cobrem o fluxo de criar, listar, detalhar, atualizar, deletar e validar payloads invalidos.

## Modelo de produto

```json
{
  "id": 1,
  "name": "Camiseta Basica",
  "description": "Camiseta 100% algodao",
  "price": 79.9,
  "stock": 10,
  "created_at": "2026-06-16 10:00:00",
  "updated_at": "2026-06-16 10:00:00"
}
```

Campos do payload:

- `name`: obrigatorio, texto
- `description`: opcional, texto
- `price`: obrigatorio, numero maior ou igual a zero
- `stock`: opcional, inteiro maior ou igual a zero; se omitido, usa `0`

## Endpoints

### Status e lista de rotas

```http
GET /
```

Resposta:

```json
{
  "message": "API de produtos",
  "endpoints": [
    "GET /products",
    "GET /products/:id",
    "POST /products",
    "PUT /products/:id",
    "DELETE /products/:id"
  ]
}
```

### Listar produtos

```http
GET /products
```

Resposta `200 OK`:

```json
[
  {
    "id": 1,
    "name": "Camiseta Basica",
    "description": "Camiseta 100% algodao",
    "price": 79.9,
    "stock": 10,
    "created_at": "2026-06-16 10:00:00",
    "updated_at": "2026-06-16 10:00:00"
  }
]
```

### Detalhar produto

```http
GET /products/:id
```

Resposta `200 OK`:

```json
{
  "id": 1,
  "name": "Camiseta Basica",
  "description": "Camiseta 100% algodao",
  "price": 79.9,
  "stock": 10,
  "created_at": "2026-06-16 10:00:00",
  "updated_at": "2026-06-16 10:00:00"
}
```

Se o produto nao existir, retorna `404 Not Found`:

```json
{
  "message": "Produto nao encontrado."
}
```

### Criar produto

```http
POST /products
Content-Type: application/json
```

Body:

```json
{
  "name": "Camiseta Basica",
  "description": "Camiseta 100% algodao",
  "price": 79.9,
  "stock": 10
}
```

Resposta `201 Created`:

```json
{
  "id": 1,
  "name": "Camiseta Basica",
  "description": "Camiseta 100% algodao",
  "price": 79.9,
  "stock": 10,
  "created_at": "2026-06-16 10:00:00",
  "updated_at": "2026-06-16 10:00:00"
}
```

### Atualizar produto

```http
PUT /products/:id
Content-Type: application/json
```

Body:

```json
{
  "name": "Camiseta Premium",
  "description": "Camiseta premium 100% algodao",
  "price": 99.9,
  "stock": 5
}
```

Resposta `200 OK` com o produto atualizado.

Se o produto nao existir, retorna `404 Not Found`.

### Deletar produto

```http
DELETE /products/:id
```

Resposta `204 No Content` quando o produto for removido.

Se o produto nao existir, retorna `404 Not Found`.

## Erros de validacao

Quando o payload for invalido, a API retorna `400 Bad Request`:

```json
{
  "errors": [
    "O campo name e obrigatorio.",
    "O campo price deve ser um numero maior ou igual a zero.",
    "O campo stock deve ser um inteiro maior ou igual a zero."
  ]
}
```

## Exemplos com curl

Criar produto:

```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Camiseta Basica","description":"Camiseta 100% algodao","price":79.9,"stock":10}'
```

Listar produtos:

```bash
curl http://localhost:3000/products
```

Detalhar produto:

```bash
curl http://localhost:3000/products/1
```

Atualizar produto:

```bash
curl -X PUT http://localhost:3000/products/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Camiseta Premium","description":"Camiseta premium 100% algodao","price":99.9,"stock":5}'
```

Deletar produto:

```bash
curl -X DELETE http://localhost:3000/products/1
```
