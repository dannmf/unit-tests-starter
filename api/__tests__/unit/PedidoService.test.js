const PedidoService = require("../../services/PedidoService");

// Teste unitario: o service e testado em isolamento total.
// O repository e substituido por um mock (jest.fn()), assim testamos so a
// logica do service, sem depender de dados reais.

describe("PedidoService (unitario com mocks)", () => {
  let service;
  let mockRepository;

  beforeEach(() => {
    mockRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      updateStatus: jest.fn(),
      delete: jest.fn(),
    };

    service = new PedidoService(mockRepository);
  });

  describe("listar", () => {
    test("chama repository.findAll uma vez e retorna o resultado", () => {
      const pedidos = [
        {
          id: 1,
          cliente: "Ana Souza",
          itens: [],
          status: "pendente",
          total: 0,
        },
      ];
      mockRepository.findAll.mockReturnValue(pedidos);

      const resultado = service.listar();

      expect(mockRepository.findAll).toHaveBeenCalledTimes(1);
      expect(resultado).toEqual(pedidos);
    });
  });

  describe("buscarPorId", () => {
    test("repassa o id ao repository e retorna o pedido encontrado", () => {
      const pedido = { id: 1, cliente: "Ana Souza", itens: [], total: 100 };
      mockRepository.findById.mockReturnValue(pedido);

      const resultado = service.buscarPorId(1);

      expect(mockRepository.findById).toHaveBeenCalledWith(1);
      expect(resultado).toEqual(pedido);
    });

    test("lanca erro 'Pedido nao encontrado' quando o repository retorna null", () => {
      mockRepository.findById.mockReturnValue(null);

      expect(() => service.buscarPorId(999)).toThrow("Pedido nao encontrado");
      expect(mockRepository.findById).toHaveBeenCalledWith(999);
    });
  });

  describe("criar", () => {
    test("repassa os dados ao repository e retorna o pedido criado com o total calculated", () => {
      const novoPedido = {
        cliente: "Carlos",
        itens: [
          { descricao: "Item 1", preco: 20, quantidade: 2 },
          { descricao: "Item 2", preco: 10, quantidade: 1 },
        ],
      };

      const pedidoCriado = { id: 1, ...novoPedido, total: 50, status: "PENDENTE" };

      mockRepository.create.mockReturnValue(pedidoCriado);

      const resultado = service.criar(novoPedido);

      expect(mockRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          cliente: "Carlos",
          total: 50,
        })
      );
      expect(resultado).toEqual(pedidoCriado);
    });

    test("propaga o erro quando o cliente estiver faltando", () => {
      const pedidoInvalido = {
        itens: [{ descricao: "Item 1", preco: 10, quantidade: 1 }],
      };

      expect(() => service.criar(pedidoInvalido)).toThrow();
    });

    test("propaga o erro quando a lista de itens estiver vazia", () => {
      const pedidoInvalido = {
        cliente: "Carlos",
        itens: [],
      };

      expect(() => service.criar(pedidoInvalido)).toThrow();
    });

    test("propaga o erro quando algum item tiver preco ou quantidade invalidos", () => {
      const pedidoComPrecoInvalido = {
        cliente: "Carlos",
        itens: [{ descricao: "Item 1", preco: -10, quantidade: 1 }],
      };

      const pedidoComQtdInvalida = {
        cliente: "Carlos",
        itens: [{ descricao: "Item 1", preco: 10, quantidade: 0 }],
      };

      expect(() => service.criar(pedidoComPrecoInvalido)).toThrow();
      expect(() => service.criar(pedidoComQtdInvalida)).toThrow();
    });
  });

  describe("atualizarStatus", () => {
    test("chama repository.findById e repository.updateStatus quando o pedido existe", () => {
      const pedidoExistente = { id: 1, cliente: "Ana", status: "PENDENTE" };
      const pedidoAtualizado = { ...pedidoExistente, status: "ENVIADO" };

      mockRepository.findById.mockReturnValue(pedidoExistente);
      mockRepository.updateStatus.mockReturnValue(pedidoAtualizado);

      const resultado = service.atualizarStatus(1, "ENVIADO");

      expect(mockRepository.findById).toHaveBeenCalledWith(1);
      expect(mockRepository.updateStatus).toHaveBeenCalledWith(1, "ENVIADO");
      expect(resultado).toEqual(pedidoAtualizado);
    });

    test("lanca erro 'Pedido nao encontrado' sem chamar repository.updateStatus quando o pedido nao existe", () => {
      mockRepository.findById.mockReturnValue(null);

      expect(() => service.atualizarStatus(999, "ENVIADO")).toThrow("Pedido nao encontrado");
      expect(mockRepository.updateStatus).not.toHaveBeenCalled();
    });

    test("propaga o erro quando o novo status for invalido", () => {
      const pedidoExistente = { id: 1, cliente: "Ana", status: "PENDENTE" };
      mockRepository.findById.mockReturnValue(pedidoExistente);

      expect(() => service.atualizarStatus(1, "STATUS_INEXISTENTE")).toThrow();
      expect(mockRepository.updateStatus).not.toHaveBeenCalled();
    });

    test("propaga o erro quando o pedido ja estiver cancelado", () => {
      const pedidoCancelado = { id: 1, cliente: "Ana", status: "CANCELADO" };
      mockRepository.findById.mockReturnValue(pedidoCancelado);

      expect(() => service.atualizarStatus(1, "ENVIADO")).toThrow();
      expect(mockRepository.updateStatus).not.toHaveBeenCalled();
    });
  });

  describe("remover", () => {
    test("chama repository.delete com o id correto quando o pedido existe", () => {
      mockRepository.delete.mockReturnValue(true);

      const resultado = service.remover(1);

      expect(mockRepository.delete).toHaveBeenCalledWith(1);
      expect(resultado).toBe(true);
    });

    test("lanca erro 'Pedido nao encontrado' quando o repository retorna false", () => {
      mockRepository.delete.mockReturnValue(false);

      expect(() => service.remover(999)).toThrow("Pedido nao encontrado");
      expect(mockRepository.delete).toHaveBeenCalledWith(999);
    });
  });
});