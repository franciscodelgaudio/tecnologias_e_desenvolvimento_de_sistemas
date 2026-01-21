import styles from './ProductCard.module.css'
import { formatMoneyBRL } from '../utils/format'

export function ProductCard({ product, selected, onSelect, onAdd }) {
  const tagLine = (product.tags || []).join(' - ')

  return (
    <article
      className={`${styles.card} ${selected ? styles.selected : ''}`}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') onSelect()
      }}
    >
      <img className={styles.image} src={product.image} alt={product.name} />

      <div className={styles.body}>
        <div className={styles.titleRow}>
          <h3 className={styles.title}>{product.name}</h3>
          {product.featured ? <span className={styles.badge}>Destaque</span> : null}
        </div>

        <p className={styles.desc}>{product.description}</p>
        {tagLine ? <p className={styles.tags}>{tagLine}</p> : null}

        <div className={styles.footer}>
          <span className={styles.price}>{formatMoneyBRL(product.price)}</span>
          <button
            type="button"
            className={styles.button}
            onClick={(e) => {
              e.stopPropagation()
              onAdd()
            }}
          >
            Adicionar
          </button>
        </div>
      </div>
    </article>
  )
}
