const { soma, subtrai, multiplica, divide, ehPar, raiz, media } = require('./calculadora')

// Utilização de Diferentes "Asserts"
describe("soma", () => {
    test("soma com dois números positivos", () => {
        expect(soma(2, 3)).toBe(5);
    });
});

describe("raiz", () => {
    test("calcula a raiz de número não exato com precisão", () => {
        expect(raiz(2)).toBeCloseTo(1.414);
    });
    test("lançar erro para número negativo", () => {
        expect(() => raiz(-4)).toThrow("não é possível calcular raiz de número negativo");
    });
});

// Aula 5 - Exercícios: Testes Unitários com Jest
describe("subtrai", () => {
    test("subtrai com dois numeros positivos", () => {
        expect(subtrai(2, 1)).toBe(1);
    });
    test("subtrai para retornar número negativo", () => {
        expect(subtrai(1, 2)).toBe(-1)
    });
});

describe("multiplica", () => {
    test("multiplica dois números", () => {
        expect(multiplica(3, 2)).toBe(6)
    });
    test("retorno de 0 ao multiplicar", () => {
        expect(multiplica(0, 3)).toBe(0)
    });
    test("resultado maior que cada um dos fatores", () => {
        expect(multiplica(4, 3)).toBe(12)
    });
});

describe("divide", () => {
    test("divide dois valores", () => {
        expect(divide(6, 2)).toBe(3)
    });
    test("lançar erro para divisão com zero", () => {
        expect(() => divide(4, 0)).toThrow("não é possível dividir por zero");
    });
});

// Continuação...
describe("ehPar", () => {
    test("retorno de um valor verdadeiro para numero par", () => {
        expect()
    });
    test("retorno de um valor falso para numero impar", () => {
        expect()
    });
});

describe("media", () => {
    test("calcular corretamente a media de uma lista de inteiros", () => {
        expect()
    });
    test("calcular corretamente a media quando o resultado for decimal", () => {
        expect()
    });
    test("lançamento de erro quando lista estiver vazia", () => {
        expect()
    });
    test("lançamento de erro quando o argumento não for array", () => {
        expect()
    });
});
