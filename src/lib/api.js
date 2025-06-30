const BASE_URL = procces.env.API_URL;

// PRODUCTOS
export async function getProductos() {
  const res = await fetch(`${BASE_URL}/productos`);
  return res.json();
}

export async function getProducto(id) {
  const res = await fetch(`${BASE_URL}/productos/${id}`);
  return res.json();
}

export async function crearProducto(data) {
  const res = await fetch(`${BASE_URL}/productos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function actualizarProducto(id, data) {
  const res = await fetch(`${BASE_URL}/productos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function eliminarProducto(id) {
  const res = await fetch(`${BASE_URL}/productos/${id}`, {
    method: 'DELETE'
  });
  return res.json();
}

// CATEGORÍAS
export async function getCategorias() {
  const res = await fetch(`${BASE_URL}/categorias`);
  return res.json();
}


export async function getCategoria(id) {
  const res = await fetch(`${BASE_URL}/categorias/${id}`);
  return res.json();
}

export async function crearCategoria(data) {
  const res = await fetch(`${BASE_URL}/categorias`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function actualizarCategoria(id, data) {
  const res = await fetch(`${BASE_URL}/categorias/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function eliminarCategoria(id) {
  const res = await fetch(`${BASE_URL}/categorias/${id}`, {
    method: 'DELETE'
  });
  return res.json();
}
