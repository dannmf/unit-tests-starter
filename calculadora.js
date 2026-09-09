function soma(a, b) {
  return a + b;
}

function subtrai(a, b) {
  return a - b;
}

function multiplica(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) throw new Error('Nao e possivel dividir por zero');
  return a / b;
}

module.exports = { soma, subtrai, multiplica, divide };
