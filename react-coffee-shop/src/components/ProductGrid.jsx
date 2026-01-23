import { ProductCard } from './ProductCard'
import './ProductGrid.css'

export function ProductGrid({ products, selectedProductId, onSelect, onAddToCart }) {
  return (
    <section className="gridSection">
      <div className="gridHeader">
        <h2 className="gridTitle">{'Escolha um caf\u00e9 do menu'}</h2>
        <div className="gridMeta">
          Mostrando <strong>{products.length}</strong> item(ns)
        </div>
      </div>

      <div className="grid">
        {/* Lista os produtos com destaque para o item selecionado. */}
        {products.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            selected={p.id === selectedProductId}
            onSelect={() => onSelect(p.id)}
            onAdd={() => onAddToCart(p)}
          />
        ))}
      </div>
    </section>
  )
}
