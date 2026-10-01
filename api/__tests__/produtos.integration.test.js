const request = require('supertest');
const app = require('../app'); // Importe a instância do seu servidor Express

describe('API /produtos - Integração', () => {

  describe('GET /produtos', () => {
    test('Deve retornar 200 e um array com os produtos', async () => {
      const res = await request(app).get('/produtos');

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('GET /produtos/:id', () => {
    test('Deve retornar 200 e o produto quando o id existe', async () => {
      const postRes = await request(app)
        .post('/produtos')
        .send({ nome: 'Empada', preco: 7.0 });

      const res = await request(app).get(`/produtos/${postRes.body.id}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('id', postRes.body.id);
      expect(res.body.nome).toBe('Empada');
    });

    test('Deve retornar 404 quando o produto nao existe', async () => {
      const res = await request(app).get('/produtos/999999');

      expect(res.status).toBe(404);
    });
  });

  describe('POST /produtos', () => {
    test('Deve retornar 201 e o produto criado', async () => {
      const res = await request(app)
        .post('/produtos')
        .send({ nome: 'Coxinha', preco: 5.0 });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.nome).toBe('Coxinha');
      expect(res.body.preco).toBe(5.0);
    });

    test('Deve retornar 400 quando o nome esta faltando', async () => {
      const res = await request(app)
        .post('/produtos')
        .send({ preco: 5.0 });

      expect(res.status).toBe(400);
    });

    test('Deve retornar 400 quando o preco e invalido ou ausente', async () => {
      const res = await request(app)
        .post('/produtos')
        .send({ nome: 'Kibe', preco: -3.0 });

      expect(res.status).toBe(400);
    });
  });

  describe('PUT /produtos/:id', () => {
    test('Deve retornar 200 e o produto atualizado', async () => {
      const postRes = await request(app)
        .post('/produtos')
        .send({ nome: 'Esfiha', preco: 6.0 });

      const res = await request(app)
        .put(`/produtos/${postRes.body.id}`)
        .send({ nome: 'Esfiha de Carne', preco: 6.5 });

      expect(res.status).toBe(200);
      expect(res.body.nome).toBe('Esfiha de Carne');
      expect(res.body.preco).toBe(6.5);
    });

    test('Deve retornar 404 ao tentar atualizar produto inexistente', async () => {
      const res = await request(app)
        .put('/produtos/999999')
        .send({ nome: 'Fantasma', preco: 10.0 });

      expect(res.status).toBe(404);
    });
  });

  describe('DELETE /produtos/:id', () => {
    test('Deve retornar 204 ao remover produto', async () => {
      const postRes = await request(app)
        .post('/produtos')
        .send({ nome: 'Pastel', preco: 6.0 });

      const res = await request(app).delete(`/produtos/${postRes.body.id}`);
      expect(res.status).toBe(204);
    });

    test('Produto removido nao deve mais aparecer na listagem', async () => {
      const postRes = await request(app)
        .post('/produtos')
        .send({ nome: 'Enroladinho', preco: 4.5 });

      const targetId = postRes.body.id;

      await request(app).delete(`/produtos/${targetId}`);

      const listRes = await request(app).get('/produtos');
      expect(listRes.body.some(p => p.id === targetId)).toBe(false);
    });

    test('Deve retornar 404 ao tentar remover produto inexistente', async () => {
      const res = await request(app).delete('/produtos/999999');

      expect(res.status).toBe(404);
    });
  });
});