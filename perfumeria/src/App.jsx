import React, { useEffect, useState } from "react";
import axios from "axios";

const URL_CSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSfSDzWTpBQrQszDsIoatQ2ZWEi_KnCwcH1S5RsOnUld7fQreZA3PDAdDFnBQVEuHt3NkmmLHrlLAOs/pub?gid=0&single=true&output=csv";

function App() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    axios.get(URL_CSV).then((res) => {
      const rows = res.data.split("\n").slice(1); // eliminar encabezado
      const parsed = rows.map((row) => {
        const [nombre, descripcion, precio, imagen, original] = row.split(",");
        return {
          nombre: nombre?.trim(),
          descripcion: descripcion?.trim(),
          precio: parseFloat(precio),
          imagen: imagen?.trim(),
          original: parseFloat(original),
        };
      });
      setProductos(parsed.filter(p => p.nombre));
    });
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Perfumes para Hombre</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {productos.map((p, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-md p-4 relative">
            <span className="absolute top-2 left-2 bg-red-500 text-white text-sm px-3 py-1 rounded-full">Oferta</span>
            <img src={p.imagen} alt={p.nombre} className="w-full h-64 object-contain mb-4 rounded-lg" />
            <h2 className="text-lg font-semibold">{p.nombre}</h2>
            <p className="text-red-500 text-xl font-bold">${p.precio.toLocaleString()} COP</p>
            <p className="line-through text-gray-500 text-sm">${p.original.toLocaleString()} COP</p>
            <p className="text-gray-600 mt-2 mb-4">{p.descripcion?.slice(0, 50)}...</p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 w-full rounded-xl">
              🛒 Agregar al Carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
