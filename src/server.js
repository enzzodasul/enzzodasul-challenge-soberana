const express = require('express');
const cors = require('cors');
const { initDatabase, run, get, all } = require('./db');

const app = express();
const port = process.env.PORT || 3000;
const productFields = 'id, name, description, price, stock, created_at, updated_at';

app.use(cors());
app.use(express.json());

function normalizeProductPayload(body) {
  return {
    name: typeof body.name === 'string' ? body.name.trim() : '',
    description: typeof body.description === 'string' ? body.description.trim() : '',
    price: Number(body.price),
    stock: body.stock === undefined ? 0 : Number(body.stock)
  };
}

function validateProduct(product, body) {
  const errors = [];

  if (!product.name) {
    errors.push('O campo name e obrigatorio.');
  }

  const hasPrice = !(body.price === undefined || body.price === null || body.price === '');

  if (!hasPrice) {
    errors.push('O campo price e obrigatorio.');
  }

  if (hasPrice && (!Number.isFinite(product.price) || product.price < 0)) {
    errors.push('O campo price deve ser um numero maior ou igual a zero.');
  }

  if (!Number.isInteger(product.stock) || product.stock < 0) {
    errors.push('O campo stock deve ser um inteiro maior ou igual a zero.');
  }

  return errors;
}

app.get('/', (request, response) => {
  response.json({
    message: 'API de produtos',
    endpoints: [
      'GET /products',
      'GET /products/:id',
      'POST /products',
      'PUT /products/:id',
      'DELETE /products/:id'
    ]
  });
});

app.get('/products', async (request, response, next) => {
  try {
    const products = await all(`SELECT ${productFields} FROM products`);
    response.json(products);
  } catch (error) {
    next(error);
  }
});

app.get('/products/:id', async (request, response, next) => {
  try {
    const product = await get(`SELECT ${productFields} FROM products WHERE id = ?`, [request.params.id]);

    if (!product) {
      response.status(404).json({ message: 'Produto nao encontrado.' });
      return;
    }

    response.json(product);
  } catch (error) {
    next(error);
  }
});

app.post('/products', async (request, response, next) => {
  try {
    const product = normalizeProductPayload(request.body);
    const errors = validateProduct(product, request.body);

    if (errors.length > 0) {
      response.status(400).json({ errors });
      return;
    }

    const result = await run(
      `INSERT INTO products (name, description, price, stock)
       VALUES (?, ?, ?, ?)`,
      [product.name, product.description, product.price, product.stock]
    );

    const createdProduct = await get(`SELECT ${productFields} FROM products WHERE id = ?`, [result.id]);
    response.status(201).json(createdProduct);
  } catch (error) {
    next(error);
  }
});

app.put('/products/:id', async (request, response, next) => {
  try {
    const existingProduct = await get(`SELECT ${productFields} FROM products WHERE id = ?`, [request.params.id]);

    if (!existingProduct) {
      response.status(404).json({ message: 'Produto nao encontrado.' });
      return;
    }

    const product = normalizeProductPayload(request.body);
    const errors = validateProduct(product, request.body);

    if (errors.length > 0) {
      response.status(400).json({ errors });
      return;
    }

    await run(
      `UPDATE products
       SET name = ?, description = ?, price = ?, stock = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [
        product.name,
        product.description,
        product.price,
        product.stock,
        request.params.id
      ]
    );

    const updatedProduct = await get(`SELECT ${productFields} FROM products WHERE id = ?`, [request.params.id]);
    response.json(updatedProduct);
  } catch (error) {
    next(error);
  }
});

app.delete('/products/:id', async (request, response, next) => {
  try {
    const result = await run('DELETE FROM products WHERE id = ?', [request.params.id]);

    if (result.changes === 0) {
      response.status(404).json({ message: 'Produto nao encontrado.' });
      return;
    }

    response.status(204).send();
  } catch (error) {
    next(error);
  }
});

app.use((error, request, response, next) => {
  console.error(error);
  response.status(500).json({ message: 'Erro interno do servidor.' });
});

async function start() {
  await initDatabase();

  return app.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`);
  });
}

if (require.main === module) {
  start().catch((error) => {
    console.error('Erro ao iniciar o banco de dados:', error);
    process.exit(1);
  });
}

module.exports = {
  app,
  start
};
