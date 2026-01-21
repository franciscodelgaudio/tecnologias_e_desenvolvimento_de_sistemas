import './App.css'
import { useEffect, useMemo, useState } from 'react'
import { Header } from './components/Header'
import { ProductGrid } from './components/ProductGrid'
import { CartSidebar } from './components/CartSidebar'
import { CheckoutForm } from './components/CheckoutForm'
import { ShowcasePanel } from './components/ShowcasePanel'
import { useHttp } from './hooks/useHttp'

function calcCartTotal(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0)
}

function App() {
  const shopName = 'Coffee Shop'
  const shopInfo = { city: 'Foz do Iguaçu' }

  const [searchTerm, setSearchTerm] = useState('')
  const [products, setProducts] = useState([])
  const [selectedProductId, setSelectedProductId] = useState(null)

  const [cart, setCart] = useState([])
  const [lastOrder, setLastOrder] = useState(null)

  const { loadingGet, error, clearError, get, post } = useHttp()

  useEffect(() => {
    let active = true

      ; (async () => {
        try {
          const data = await get('/api/products.json')
          if (!active) return
          const list = Array.isArray(data?.products) ? data.products : []
          setProducts(list)
          if (list.length) {
            setSelectedProductId((prev) => prev ?? list[0].id)
          }
        } catch {

        }
      })()

    return () => {
      active = false
    }
  }, [get])

  const filteredProducts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()
    if (!term) return products

    return products.filter((p) => {
      const hay = `${p.name} ${p.description} ${(p.tags || []).join(' ')}`.toLowerCase()
      return hay.includes(term)
    })
  }, [products, searchTerm])

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.qty, 0),
    [cart],
  )

  const total = useMemo(() => calcCartTotal(cart), [cart])

  function addToCart(product) {
    setCart((prev) => {
      const existing = prev.find((i) => i.productId === product.id)
      if (existing) {
        return prev.map((i) =>
          i.productId === product.id ? { ...i, qty: i.qty + 1 } : i,
        )
      }
      return [
        ...prev,
        { productId: product.id, name: product.name, price: product.price, qty: 1 },
      ]
    })
  }

  function changeQty(productId, nextQty) {
    setCart((prev) => {
      const safeQty = Math.max(1, Math.min(99, Number(nextQty) || 1))
      return prev.map((i) => (i.productId === productId ? { ...i, qty: safeQty } : i))
    })
  }

  function removeItem(productId) {
    setCart((prev) => prev.filter((i) => i.productId !== productId))
  }

  return (
    <div className="app">
      <Header
        title={`${shopName} - ${shopInfo.city}`}
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        cartCount={cartCount}
      />

      {error ? (
        <div className="banner error" role="alert">
          <div>
            <strong>Erro:</strong> {error}
          </div>
          <button type="button" onClick={clearError}>
            Fechar
          </button>
        </div>
      ) : null}

      {lastOrder ? (
        <div className="banner ok">
          {'\u00daltimo pedido: '}
          <strong>{lastOrder.customer.name}</strong> -{' '}
          {lastOrder.order.cart.length} item(ns)
        </div>
      ) : null}

      <div className="content">
        <main className="main">
          <div className="topRow">
            <div
              className="hero"
              style={{
                borderColor:
                  cartCount > 0 ? 'rgba(255, 210, 138, 0.35)' : undefined,
              }}
            >
              <div className="heroTitle">{'Vamos comprar caf\u00e9'}</div>
              <div className="heroDesc">
                {loadingGet
                  ? 'Carregando menu (GET)...'
                  : 'Procure seus favoritos e adicione \u00e0 sacola.'}
              </div>
              <div className="heroMeta">
                Dica: aperte <kbd>Esc</kbd> para limpar a busca.
              </div>
            </div>
          </div>

          <ShowcasePanel />

          <ProductGrid
            products={filteredProducts}
            selectedProductId={selectedProductId}
            onSelect={setSelectedProductId}
            onAddToCart={addToCart}
          />

          <CheckoutForm cart={cart} total={total} onOrderSent={setLastOrder} post={post} />
        </main>

        <CartSidebar cart={cart} onChangeQty={changeQty} onRemoveItem={removeItem} total={total} />
      </div>

      <footer className="footer">
        <span>
          {shopName} - Itens no menu: {products.length} - Termo atual: "{searchTerm || '-'}"
        </span>
      </footer>
    </div>
  )
}

export default App
