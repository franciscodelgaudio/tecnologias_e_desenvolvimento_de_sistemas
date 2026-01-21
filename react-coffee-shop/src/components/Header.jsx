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

      <div className="cartBadge" title="Itens no carrinho">
        Sacola: <strong>{cartCount}</strong>
      </div>
    </header>
  )
}
