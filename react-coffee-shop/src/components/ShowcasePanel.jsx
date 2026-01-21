import { useMemo, useState } from 'react'
import beansIcon from '/coffee-beans.svg'
import './ShowcasePanel.css'

const roastInfo = {
  label: 'Médio',
  intensity: 3,
  humidity: 62,
}

const brewSteps = ['Moer os grãos', 'Aquecer a água', 'Extrair o café']

function formatRoast(value) {
  return value.toUpperCase()
}

export function ShowcasePanel() {
  const [showTips, setShowTips] = useState(true)
  const [rating, setRating] = useState(4)
  const [focusState, setFocusState] = useState(false)

  const formatPercent = function (value) {
    return `${value}%`
  }

  const stepsList = useMemo(() => brewSteps.map((step) => step.toLowerCase()), [])

  return (
    <section className="showcase container-fluid">
      <div className="showcaseHeader">
        <div>
          <h4 className="showcaseTitle">Laboratório do Barista</h4>
          <p className="showcaseSubtitle">
            Explore os componentes Bootstrap, listas e tabelas.
          </p>
        </div>
        <button
          type="button"
          className="btn btn-outline-light"
          onClick={() => setShowTips((prev) => !prev)}
        >
          {showTips ? 'Ocultar' : 'Mostrar'} dicas
        </button>
      </div>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
        <div className="col">
          <div className="card h-100 shadow-sm promoCard">
            <div className="promoPin">Novo</div>
            <img src={beansIcon} className="card-img-top promoImage" alt="Grãos" />
            <div className="card-body">
              <h5 className="card-title">Roast & Dados</h5>
              <h6 className="card-subtitle mb-2 text-body-secondary">
                {formatRoast(roastInfo.label)}
              </h6>
              <p className="card-text promoText">
                Intensidade {roastInfo.intensity}/5 · Umidade{' '}
                {formatPercent(roastInfo.humidity)}
              </p>
              <a
                className="btn btn-sm btn-primary"
                href="https://getbootstrap.com/docs/5.3/components/accordion/"
                target="_blank"
                rel="noreferrer"
              >
                Guia Bootstrap <i className="bi bi-box-arrow-up-right" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Checklist de preparo</h5>
              <p className="card-text">Passos essenciais para um espresso equilibrado.</p>
              <ul className="list-group list-group-flush">
                {stepsList.map((step) => (
                  <li key={step} className="list-group-item">
                    {step}
                  </li>
                ))}
              </ul>
              <ol className="mt-3">
                <li>Escolha o moinho</li>
                <li>Teste a moagem</li>
                <li>Registre ajustes</li>
              </ol>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Tabela de torra</h5>
              <p className="card-text">Comparativo rápido de perfis.</p>
              <table className="table table-dark table-striped">
                <thead>
                  <tr>
                    <th>Perfil</th>
                    <th>Notas</th>
                    <th>Tempo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Claro</td>
                    <td>Frutas</td>
                    <td>8 min</td>
                  </tr>
                  <tr>
                    <td>Médio</td>
                    <td>Caramelo</td>
                    <td>10 min</td>
                  </tr>
                  <tr>
                    <td>Escuro</td>
                    <td>Chocolate</td>
                    <td>12 min</td>
                  </tr>
                </tbody>
              </table>
              <span className="miniBadge">Tabela viva</span>
            </div>
          </div>
        </div>
      </div>

      {showTips ? (
        <div className="accordion mt-4" id="tipsAccordion">
          <div className="accordion-item">
            <h2 className="accordion-header" id="tipHeadingOne">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#tipCollapseOne"
                aria-expanded="true"
                aria-controls="tipCollapseOne"
              >
                Dicas de extração
              </button>
            </h2>
            <div
              id="tipCollapseOne"
              className="accordion-collapse collapse show"
              aria-labelledby="tipHeadingOne"
              data-bs-parent="#tipsAccordion"
            >
              <div className="accordion-body">
                <p>
                  Ajuste a moagem, acompanhe o peso e observe a crema para manter o padrão.
                </p>
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="tipHeadingTwo">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#tipCollapseTwo"
                aria-expanded="false"
                aria-controls="tipCollapseTwo"
              >
                Avaliação rápida
              </button>
            </h2>
            <div
              id="tipCollapseTwo"
              className="accordion-collapse collapse"
              aria-labelledby="tipHeadingTwo"
              data-bs-parent="#tipsAccordion"
            >
              <div className="accordion-body">
                <div className="ratingRow">
                  <span className="me-2">Nota:</span>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={rating}
                    className="form-range"
                    onChange={(e) => setRating(Number(e.target.value))}
                    onFocus={() => setFocusState(true)}
                    onBlur={() => setFocusState(false)}
                  />
                  <span className={focusState ? 'ratingValue focus' : 'ratingValue'}>
                    {rating}
                  </span>
                </div>
                <p className="mt-2">Use o controle para registrar seu feedback.</p>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div id="coffeeCarousel" className="carousel slide mt-4" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#coffeeCarousel"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          />
          <button
            type="button"
            data-bs-target="#coffeeCarousel"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          />
          <button
            type="button"
            data-bs-target="#coffeeCarousel"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          />
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1200&q=60"
              className="d-block w-100 carouselImage"
              alt="Espresso"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1512568400610-62da28bc8a13?auto=format&fit=crop&w=1200&q=60"
              className="d-block w-100 carouselImage"
              alt="Mocha"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1200&q=60"
              className="d-block w-100 carouselImage"
              alt="Cappuccino"
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#coffeeCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#coffeeCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <p className="hiddenNote">Nota oculta para demonstrar display none.</p>
    </section>
  )
}
