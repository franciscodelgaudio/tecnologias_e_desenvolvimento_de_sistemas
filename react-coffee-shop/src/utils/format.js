export function formatMoneyBRL(value) {
  const safe = Number(value || 0)
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(safe)
}

export function clampInt(value, min, max) {
  const n = Number.parseInt(value, 10)
  const safe = Number.isFinite(n) ? n : min
  return Math.max(min, Math.min(max, safe))
}
