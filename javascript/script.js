// =======================
// Arrays + Objetos (Requisito)
// =======================
const cart = [
  { id: 'coffee-gayo', name: 'Coffee Gayo', price: 21.4, qty: 1 }
];

// =======================
// Funções (3 formatos)
// =======================

// 1) Function declaration
function calcularTotal() {
  const total = cart.reduce((s, item) => s + item.price * item.qty, 0);
  const totalEls = document.querySelectorAll('#totalValor, .linha-total span');
  totalEls.forEach(el => {
    if (!el) return;
    el.textContent = formatCurrency(total);
  });
  return total;
}

// 2) Function expression
const formatCurrency = function (n) {
  return '$' + (Number(n).toFixed(2));
};

// 3) Arrow function
const findItem = id => cart.find(i => i.id === id);

// Auxiliar: atualiza quantidade de um item e reflete na UI
function setQty(id, qty, inputEl) {
  const item = findItem(id);
  if (!item) return;
  const min = 1;
  const safe = Math.max(min, parseInt(qty || '1', 10));
  item.qty = safe;
  if (inputEl) inputEl.value = safe;
  calcularTotal();
}

// =======================
// Eventos (Requisito: 2 tipos no mínimo)
// - click (mouse) nos botões +/-
// - input (teclado) no <input type="number">
// - submit (formulário) para enviar pedido
// =======================
document.addEventListener('DOMContentLoaded', () => {
  // Delegação de clique para botões +/- (MOUSE)
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

  // Alteração via teclado no input numérico (TECLADO)
  document.body.addEventListener('input', (e) => {
    if (!e.target.matches('.controles input[type="number"]')) return;
    const input = e.target;
    const id = input.closest('.controles').dataset.itemId || 'coffee-gayo';
    setQty(id, input.value, input);
  });

  // Submit do primeiro formulário da página (FORMULÁRIO)
  const form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', (ev) => {
      ev.preventDefault();
      // Apenas para demonstração: mostra o carrinho (array de objetos)
      alert('Pedido enviado!\n' + JSON.stringify(cart, null, 2));
      form.reset();
      // após reset, recontabiliza total considerando qty padrão 1
      cart.forEach(i => (i.qty = 1));
      calcularTotal();
    });
  }

  // Inicializa total ao abrir a página
  calcularTotal();
});

// =======================
// Compat com inline onclick (se você mantiver no HTML antigo)
// =======================
window.decIncTotal = function (btn, delta) {
  const box = btn.closest('.controles');
  if (!box) return;
  const input = box.querySelector('input[type="number"]');
  const id = box.dataset.itemId || 'coffee-gayo';
  const atual = parseInt(input.value || '1', 10);
  setQty(id, atual + delta, input);
};
