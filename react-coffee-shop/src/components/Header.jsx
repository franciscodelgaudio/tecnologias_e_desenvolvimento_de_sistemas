import coffeeBeans from '/coffee-beans.svg'
import './Header.css'

export function Header({ title, searchTerm, onSearchTermChange, cartCount, viewportWidth }) {
  return (
    <header className="header">
      <div className="brand">
        <img className="brandLogo" src={coffeeBeans} alt="Coffee beans" />
        <div className="brandText">
          <h1 className="brandTitle">{title}</h1>
        </div>
      </div>

      {/* Campo de busca com limpeza pelo ESC. */}
      <div className="searchWrap">
        <input
          id="search"
          className="searchInput"
          type="text"
          placeholder="Buscar cafés..."
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') onSearchTermChange('')
          }}
        />
      </div>

      {/* Indicador simples da quantidade no carrinho. */}
      <div className="cartBadge" title="Itens no carrinho">
        Sacola: <strong>{cartCount}</strong>
      </div>
    </header>
  )
}
