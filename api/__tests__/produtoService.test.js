const ProdutoService = require('../ProdutoService'); // Ajuste o caminho se necessário

describe('ProdutoService - Teste Unitário', () => {
  let service;
  let mockRepository;

  beforeEach(() => {
    mockRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    service = new ProdutoService(mockRepository);
  });

  describe('listar', () => {
    test('chama repository.findAll e retorna os produtos', async () => {
      const produtos = [{ id: 1, nome: 'Coxinha', preco: 5.0 }];
      mockRepository.findAll.mockResolvedValue(produtos);

      const result = await service.listar();

      expect(mockRepository.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual(produtos);
    });
  });

  describe('buscarPorId', () => {
    test('repassa o id ao repository e retorna o produto encontrado', async () => {
      const produto = { id: 1, nome: 'Coxinha', preco: 5.0 };
      mockRepository.findById.mockResolvedValue(produto);

      const result = await service.buscarPorId(1);

      expect(mockRepository.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual(produto);
    });

    test('lanca erro "Produto nao encontrado" quando o repository retornar null ou undefined', async () => {
      mockRepository.findById.mockResolvedValue(null);

      await expect(service.buscarPorId(999)).rejects.toThrow('Produto nao encontrado');
      expect(mockRepository.findById).toHaveBeenCalledWith(999);
    });
  });

  describe('criar', () => {
    test('Deve repassar dados para mockRepository.create e retornar o produto criado', async () => {
      const dadosEntrada = { nome: 'Teclado', preco: 150 };
      const produtoEsperado = { id: 1, ...dadosEntrada };

      mockRepository.create.mockResolvedValue(produtoEsperado);

      const resultado = await service.criar(dadosEntrada);

      expect(mockRepository.create).toHaveBeenCalledWith(dadosEntrada);
      expect(resultado).toEqual(produtoEsperado);
    });

    test('Deve propagar o erro lancado pelo repository quando os dados forem invalidos', async () => {
      const dadosInvalidos = { nome: '' };
      mockRepository.create.mockRejectedValue(new Error('Dados inválidos'));

      await expect(service.criar(dadosInvalidos)).rejects.toThrow('Dados inválidos');
    });
  });

  describe('atualizar', () => {
    test('chama repository.findById e repository.update quando o produto existe', async () => {
      const produtoExistente = { id: 1, nome: 'Teclado', preco: 150 };
      const dadosNovos = { nome: 'Teclado Mecânico', preco: 250 };
      const produtoAtualizado = { id: 1, ...dadosNovos };

      mockRepository.findById.mockResolvedValue(produtoExistente);
      mockRepository.update.mockResolvedValue(produtoAtualizado);

      const resultado = await service.atualizar(1, dadosNovos);

      expect(mockRepository.findById).toHaveBeenCalledWith(1);
      expect(mockRepository.update).toHaveBeenCalledWith(1, dadosNovos);
      expect(resultado).toEqual(produtoAtualizado);
    });

    test('lanca erro "Produto nao encontrado" sem chamar repository.update quando o produto nao existe', async () => {
      mockRepository.findById.mockResolvedValue(null);

      await expect(
        service.atualizar(999, { nome: 'Inexistente', preco: 100 })
      ).rejects.toThrow('Produto nao encontrado');

      expect(mockRepository.update).not.toHaveBeenCalled();
    });
  });

  describe('remover', () => {
    test('Deve chamar mockRepository.delete com o id correto quando o produto existe', async () => {
      const idExistente = 1;
      mockRepository.delete.mockResolvedValue(true);

      const resultado = await service.remover(idExistente);

      expect(resultado).toBe(true);
      expect(mockRepository.delete).toHaveBeenCalledWith(idExistente);
    });

    test('Deve lancar erro "Produto nao encontrado" quando o repository retornar false', async () => {
      const idInexistente = 999;
      mockRepository.delete.mockResolvedValue(false);

      await expect(service.remover(idInexistente)).rejects.toThrow('Produto nao encontrado');
      expect(mockRepository.delete).toHaveBeenCalledWith(idInexistente);
    });
  });
});