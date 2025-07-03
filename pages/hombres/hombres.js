<script src="https://cdn.jsdelivr.net/npm/papaparse@5.4.1/papaparse.min.js"></script>

const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSfSDzWTpBQrQszDsIoatQ2ZWEi_KnCwcH1S5RsOnUld7fQreZA3PDAdDFnBQVEuHt3NkmmLHrlLAOs/pub?gid=0&single=true&output=csv";

async function cargarPerfumes() {
  const response = await fetch(CSV_URL);
  const data = await response.text();

  const productos = Papa.parse(data, { header: true }).data;

  const contenedor = document.getElementById('productContainer');

  productos.forEach(p => {
    const card = document.createElement('div');
    card.classList.add('product-card');

    card.innerHTML = `
      <div class="product-image">
        <img src="${p.imagen}" alt="${p.nombre}">
        ${p.oferta ? `<div class="offer-badge">${p.oferta}</div>` : ""}
      </div>
      <div class="product-info">
        <div class="product-name">${p.nombre}</div>
        <div class="product-price">
          <span class="current-price">${p.precio_actual}</span>
          ${p.precio_original ? `<span class="original-price">${p.precio_original}</span>` : ""}
        </div>
        <div class="product-description">${p.descripcion}</div>
        <button class="add-to-cart">Agregar al carrito</button>
      </div>
    `;

    contenedor.appendChild(card);
  });

  document.getElementById("searchInput").addEventListener("input", e => {
    const texto = e.target.value.toLowerCase();
    const cards = document.querySelectorAll(".product-card");
    cards.forEach(card => {
      const nombre = card.querySelector(".product-name").textContent.toLowerCase();
      card.style.display = nombre.includes(texto) ? "block" : "none";
    });
  });
}

window.addEventListener("DOMContentLoaded", cargarPerfumes);


if (imagen.includes('drive.google.com')) {
  const match = imagen.match(/[-\w]{25,}/); // Extraer ID del enlace de Drive
  if (match) {
      const fileId = match[0];
      imagen = `https://drive.google.com/uc?export=view&id=${fileId}`;
  }
}
