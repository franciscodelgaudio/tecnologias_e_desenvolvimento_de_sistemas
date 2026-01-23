import { useMemo, useState } from 'react'
import { formatMoneyBRL, clampInt } from '../utils/format'
import './CheckoutForm.css'

const initialForm = {
  name: '',
  email: '',
  password: '',
  city: 'Foz do Iguaçu',
  pickupDate: '',
  uf: 'PR',
  notes: '',
  size: 'M',
  extras: { cinnamon: false, chocolate: false, chantilly: false },
  coupon: '',
  qty: 1,
  agree: false,
  proofFileName: '',
}

export function CheckoutForm({ cart, total, onOrderSent, post }) {
  const [form, setForm] = useState(initialForm)
  const [sending, setSending] = useState(false)
  const [result, setResult] = useState(null)

  const cartSummary = useMemo(() => {
    return cart.map((i) => ({ id: i.productId, name: i.name, qty: i.qty }))
  }, [cart])

  const canSubmit = cart.length > 0 && form.agree && !sending

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function updateExtra(key, checked) {
    setForm((prev) => ({ ...prev, extras: { ...prev.extras, [key]: checked } }))
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (!canSubmit) return

    setSending(true)
    setResult(null)

    const payload = {
      createdAt: new Date().toISOString(),
      customer: {
        name: form.name,
        email: form.email,
        password: form.password,
        city: form.city,
        uf: form.uf,
      },
      order: {
        cart: cartSummary,
        total,
        size: form.size,
        qty: form.qty,
        extras: Object.keys(form.extras).filter((k) => form.extras[k]),
        pickupDate: form.pickupDate,
        coupon: form.coupon,
        notes: form.notes,
        proofFileName: form.proofFileName,
      },
    }

    try {
      const response = await post('https://jsonplaceholder.typicode.com/posts', payload)
      setResult({ ok: true, id: response.id || '-' })
      onOrderSent(payload)
      setForm(initialForm)
    } catch (err) {
      setResult({ ok: false, message: err instanceof Error ? err.message : String(err) })
    } finally {
      setSending(false)
    }
  }

  return (
    <section className="checkout">
      <h2 className="checkoutTitle">Finalizar pedido</h2>
      <p className="checkoutSubtitle">
        Total atual: <strong>{formatMoneyBRL(total)}</strong>
      </p>

      <form className="form" onSubmit={handleSubmit}>
        <fieldset className="block">
          <legend>Dados pessoais</legend>
          <div className="formRow">
            <label>
              Nome (text)
              <input
                className="form-control"
                type="text"
                required
                value={form.name}
                onChange={(e) => updateField('name', e.target.value)}
              />
            </label>
            <label>
              E-mail (email)
              <input
                className="form-control"
                type="email"
                required
                value={form.email}
                onChange={(e) => updateField('email', e.target.value)}
              />
            </label>
          </div>

          <div className="formRow">
            <label>
              Senha (password)
              <input
                className="form-control"
                type="password"
                required
                value={form.password}
                onChange={(e) => updateField('password', e.target.value)}
              />
            </label>

            <label>
              Cidade (datalist)
              <input
                className="form-control"
                list="cities"
                value={form.city}
                onChange={(e) => updateField('city', e.target.value)}
              />
              <datalist id="cities">
                <option value="Cascavel" />
                <option value="Toledo" />
                <option value="Foz do Igua\u00e7u" />
              </datalist>
            </label>
          </div>

          <div className="formRow">
            <label>
              Data de retirada
              <input
                className="form-control"
                type="date"
                required
                value={form.pickupDate}
                onChange={(e) => updateField('pickupDate', e.target.value)}
              />
            </label>

            <label>
              Quantidade (number)
              <input
                className="form-control"
                type="number"
                min={1}
                max={99}
                value={form.qty}
                onChange={(e) => updateField('qty', clampInt(e.target.value, 1, 99))}
              />
            </label>
          </div>
        </fieldset>

        <fieldset className="block">
          <legend>{'Prefer\u00eancias'}</legend>

          <div className="formRow">
            <div className="group">
              <div className="groupTitle">Tamanho (radio)</div>
              <label className="inline form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="size"
                  value="P"
                  checked={form.size === 'P'}
                  onChange={() => updateField('size', 'P')}
                />
                <span className="form-check-label">Pequeno</span>
              </label>
              <label className="inline form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="size"
                  value="M"
                  checked={form.size === 'M'}
                  onChange={() => updateField('size', 'M')}
                />
                <span className="form-check-label">Médio</span>
              </label>
              <label className="inline form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="size"
                  value="G"
                  checked={form.size === 'G'}
                  onChange={() => updateField('size', 'G')}
                />
                <span className="form-check-label">Grande</span>
              </label>
            </div>

            <div className="group">
              <div className="groupTitle">Adicionais (checkbox)</div>
              <label className="inline form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={form.extras.cinnamon}
                  onChange={(e) => updateExtra('cinnamon', e.target.checked)}
                />
                <span className="form-check-label">Canela</span>
              </label>
              <label className="inline form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={form.extras.chocolate}
                  onChange={(e) => updateExtra('chocolate', e.target.checked)}
                />
                <span className="form-check-label">Chocolate</span>
              </label>
              <label className="inline form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={form.extras.chantilly}
                  onChange={(e) => updateExtra('chantilly', e.target.checked)}
                />
                <span className="form-check-label">Chantilly</span>
              </label>
            </div>
          </div>

          <div className="formRow">
            <label>
              UF (select)
              <select
                className="form-select"
                value={form.uf}
                onChange={(e) => updateField('uf', e.target.value)}
              >
                <option value="PR">PR</option>
                <option value="SP">SP</option>
                <option value="RJ">RJ</option>
                <option value="MG">MG</option>
              </select>
            </label>

            <label>
              Cupom (text)
              <input
                className="form-control"
                type="text"
                placeholder="EX: CAFE10"
                value={form.coupon}
                onChange={(e) => updateField('coupon', e.target.value.toUpperCase())}
              />
            </label>
          </div>

          <div className="formRow">
            <label className="full">
              {'Observações (textarea)'}
              <textarea
                className="form-control"
                rows={3}
                value={form.notes}
                onChange={(e) => updateField('notes', e.target.value)}
              />
            </label>
          </div>

          <div className="formRow">
            <label className="full">
              Comprovante (file)
              <input
                className="form-control"
                type="file"
                accept=".jpg,.png,.pdf"
                onChange={(e) =>
                  updateField('proofFileName', e.target.files?.[0]?.name || '')
                }
              />
              {form.proofFileName ? (
                <div className="fileName">Arquivo: {form.proofFileName}</div>
              ) : null}
            </label>
          </div>
        </fieldset>

        <div className="row">
          <label className="inline form-check">
            <input
              className="form-check-input"
              type="checkbox"
              checked={form.agree}
              onChange={(e) => updateField('agree', e.target.checked)}
            />
            <span className="form-check-label">Confirmo que revisei meu pedido</span>
          </label>
        </div>

        <div className="actions">
          <button type="button" className="btn btn-outline-light" onClick={() => setForm(initialForm)}>
            Limpar
          </button>
          <button type="submit" className="btn btn-primary" disabled={!canSubmit}>
            {sending ? 'Enviando...' : 'Enviar pedido (POST)'}
          </button>
        </div>

        {result ? (
          <div className={result.ok ? 'result ok' : 'result error'}>
            {result.ok ? (
              <span>Pedido enviado! ID retornado: {result.id}</span>
            ) : (
              <span>Falha ao enviar: {result.message}</span>
            )}
          </div>
        ) : null}
      </form>
    </section>
  )
}
