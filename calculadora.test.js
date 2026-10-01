const {
    soma,
    subtrai,
    multiplica,
    divide,
    ehPar,
    raiz,
    media,
} = require('./calculadora');

describe("soma", () => {
    test("soma dois números positivos", () => {
        expect(soma(2, 3)).toBe(5)
    })
})

describe("raiz", () => {
    test("Calcula a raíz de um número não exato com precisão", () => {
        expect(raiz(2)).toBeCloseTo(1.414)
    })
})

describe("raiz", () => {
    test("Erro para número negativo", () => {
        expect(() => raiz(-4)).toThrow("Nao e possivel calcular raiz de numero negativo")
    })
})

// Exercícios aula ---------------------------------------------------------------------------------------------------------

describe("subtrai", () => {
    test("Calcula uma operação de subtração", () => {
        expect(subtrai(8, 3)).toBe(5)
    })
})

describe("subtrai", () => {
    test("Calcula uma operação de subtração de resultado negativo", () => {
        expect(subtrai(3, 8)).toBe(-5)
    })
})

// ---------------------------------------------------------------------------------------------------------

describe("multiplica", () => {
    test("Calcula uma operação de multiplicação", () => {
        expect(multiplica(3, 5)).toBe(15)
    })
})

describe("multiplica", () => {
    test("Calcula uma operação de multiplicação com 0", () => {
        expect(multiplica(3, 0)).toBe(0)
    })
})

describe("multiplica", () => {
    test("Calcula uma operação de multiplicação", () => {
        expect(multiplica(3, 5)).toBe(15)
    })
})

describe("multiplica", () => {
    test("Calcula uma operação de multiplicação de um número negativo", () => {
        expect(multiplica(-3, 5)).toBe(-15)
    })
})

describe("multiplica", () => {
    test("Calcula uma operação de multiplicação de dois números negativos", () => {
        expect(multiplica(-3, -5)).toBe(15)
    })
})

// ----------------------------------------------------------------------------------------------------------

describe("divide", () => {
    test("Calcula uma operação de divisão", () => {
        expect(divide(10, 2)).toBe(5)
    })
})

describe("divide", () => {
    test("Resulta em erro caso uma operação conter 0", () => {
        expect(() => divide(20, 0)).toThrow("Nao e possivel dividir por zero")
    })
})

// ---------------------------------------------------------------------------------------------------------

describe("ehPar", () => {
    test("Verifica se um número é par", () => {
        expect(ehPar(18)).toBe(true)
    })
})

describe("ehPar", () => {
    test("Verifica se um número é par", () => {
        expect(ehPar(17)).toBe(false)
    })
})

// ---------------------------------------------------------------------------------------------------------

describe("media", () => {
    test("Calcula a média entre números inteiros", () => {
        expect(media(4, 8, 15)).toBe(9)
    })
})

describe("media", () => {
    test("Calcula a média entre números decimais", () => {
        expect(media(4.3, 8.6, 15.1)).toBe(9,333333333333333)
    })
})

describe("media", () => {
    test("Retorna erro na função média quando a lista estiver vazia", () => {
        expect(() => media(4.3, 8.6, 15.1)).toThrow("Não é possível fazer uma média com dados vazios")
    })
})

describe("media", () => {
    test("Erro quando o argumento não for um array", () => {
        expect(() => media(4)).toThrow("Não é possível fazer uma média com dados faltando")
    })
})