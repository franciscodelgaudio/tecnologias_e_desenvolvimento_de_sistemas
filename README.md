# ☕ Coffee Shop — React Web App

Aplicação web para simular a experiência de uma **loja de cafés**, com catálogo, sacola e formulário de checkout.  
Projeto front-end desenvolvido com **React + Vite** e **Bootstrap 5**.

![Status](https://img.shields.io/badge/Status-Completo-brightgreen?style=flat-square)
![Frontend](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB?style=flat-square)
![Bootstrap](https://img.shields.io/badge/Framework-Bootstrap%205-7952B3?style=flat-square)

---

## 📌 Sobre o projeto

- Catálogo de cafés com destaque, tags e preço
- Busca por nome/descrição/tags
- Sacola lateral com ajuste de quantidade e remoção
- Total calculado automaticamente (BRL)
- Painel “Laboratório do Barista” com componentes do Bootstrap (cards/accordion/tabela/carrossel)
- Checkout com formulário completo e envio simulado via `POST`

Sem backend próprio: produtos são carregados de um JSON local e o envio do pedido usa um endpoint de teste.

---

## 🧠 Tecnologias

- **React**
- **Vite**
- **Bootstrap 5** + **Bootstrap Icons**
- **CSS** (inclui CSS Modules em componentes)

---

## 📂 Estrutura

```
/
└── react-coffee-shop/
    ├── public/
    │   └── api/products.json
    └── src/
        ├── components/
        ├── hooks/
        └── utils/
```

---

## 🛠️ Como executar

Pré-requisitos: **Node.js** (recomendado 18+).

```bash
cd react-coffee-shop
npm install
npm run dev
```

---

## 🔧 Dados / API

- Produtos: `react-coffee-shop/public/api/products.json`
- Envio do pedido: `POST` para `https://jsonplaceholder.typicode.com/posts`

---

## 👨‍💻 Autor

Francisco Castro Del`Gaudio Junior

