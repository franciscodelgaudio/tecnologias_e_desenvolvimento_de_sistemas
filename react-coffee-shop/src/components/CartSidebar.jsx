import { formatMoneyBRL, clampInt } from '../utils/format'
import './CartSidebar.css'

export function CartSidebar({ cart, onChangeQty, onRemoveItem, total }) {
  return (
    <aside className="sidebar">
      <div className="sidebarHeader">
        <h2 className="sidebarTitle">Sacola</h2>
        <span className="sidebarMeta">{cart.length} item(ns)</span>
      </div>

      {cart.length === 0 ? (
        <p className="empty">{'Seu carrinho est\u00e1 vazio. Clique em "Adicionar".'}</p>
      ) : (
        <ul className="cartList">
          {cart.map((item) => (
            <li key={item.productId} className="cartItem">
              <div className="cartLine">
                <div>
                  <div className="cartName">{item.name}</div>
                  <div className="cartSub">
                    {formatMoneyBRL(item.price)} x {item.qty}
                  </div>
                </div>

                <button
                  type="button"
                  className="removeBtn"
                  onClick={() => onRemoveItem(item.productId)}
                >
                  Remover
                </button>
              </div>

              <div className="qtyRow">
                <button
                  type="button"
                  className="qtyBtn"
                  onClick={() => onChangeQty(item.productId, item.qty - 1)}
                >
                  -
                </button>

                <input
                  className="qtyInput"
                  type="number"
                  min={1}
                  max={99}
                  value={item.qty}
                  onChange={(e) =>
                    onChangeQty(item.productId, clampInt(e.target.value, 1, 99))
                  }
                />

                <button
                  type="button"
                  className="qtyBtn"
                  onClick={() => onChangeQty(item.productId, item.qty + 1)}
                >
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="totalRow">
        <span>Total</span>
        <span className={total > 50 ? 'totalValue highlight' : 'totalValue'}>
          {formatMoneyBRL(total)}
        </span>
      </div>
    </aside>
  )
}
