// Carrinho básico com 1 item inicial (id, nome, preço unitário, quantidade)
const cart = [
  { id: 'coffee-gayo', name: 'Coffee Gayo', price: 21.4, qty: 1 }
];

/* Soma total do carrinho e atualiza todos os elementos de total na página. */
function calcularTotal() {
  const total = cart.reduce((s, item) => s + item.price * item.qty, 0);
  const totalEls = document.querySelectorAll('#totalValor, .linha-total span');
  totalEls.forEach(el => {
    if (!el) return;
    el.textContent = formatCurrency(total);
  });
  return total;
}

/* Formata número como moeda simples (USD, com 2 casas) */
const formatCurrency = function (n) {
  return '$' + (Number(n).toFixed(2));
};

/* Busca um item pelo id dentro do cart. */
const findItem = id => cart.find(i => i.id === id);

/* escreve no input (se fornecido) e recalcula total. */
function setQty(id, qty, inputEl) {
  const item = findItem(id);
  if (!item) return;
  const min = 1;
  const safe = Math.max(min, parseInt(qty || '1', 10));
  item.qty = safe;
  if (inputEl) inputEl.value = safe;
  calcularTotal();
}

// Inicializa listeners quando o DOM está pronto
document.addEventListener('DOMContentLoaded', () => {
  /* Ajusta a quantidade do item associado (data-item-id da .controles) */
  document.body.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-action]');
    if (!btn) return;

    const box = btn.closest('.controles');
    if (!box) return;

    const input = box.querySelector('input[type="number"]');
    const id = box.dataset.itemId || 'coffee-gayo';
    const delta = btn.dataset.action === 'inc' ? 1 : -1;

    const atual = parseInt(input.value || '1', 10);
    setQty(id, atual + delta, input);
  });

  /* Sincroniza o valor digitado manualmente com o cart */
  document.body.addEventListener('input', (e) => {
    if (!e.target.matches('.controles input[type="number"]')) return;
    const input = e.target;
    const id = input.closest('.controles').dataset.itemId || 'coffee-gayo';
    setQty(id, input.value, input);
  });

  /* Mostra alerta com JSON do carrinho */
  const form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', (ev) => {
      ev.preventDefault();
      alert('Pedido enviado!\n' + JSON.stringify(cart, null, 2));
      form.reset();
      cart.forEach(i => (i.qty = 1));
      calcularTotal();
    });
  }

  // Primeira atualização do total ao carregar a página
  calcularTotal();
});