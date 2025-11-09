function decIncTotal(botao, delta) {
  const input = botao.parentNode.querySelector('input[type="number"]');
  let valor = parseInt(input.value) || 0;
  valor += delta;
  if (valor < 1) valor = 1;
  input.value = valor;
}
