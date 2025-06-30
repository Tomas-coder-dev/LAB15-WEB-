'use client';
import { useEffect, useState } from 'react';
import { getProductos, eliminarProducto } from '@/lib/api';
import { useRouter } from 'next/navigation';
import {
  FaCapsules, FaPlus, FaEdit, FaTrash, FaSearch, FaCheckCircle, FaTimesCircle, FaTag, FaBox
} from 'react-icons/fa';

export default function ProductosPage() {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const router = useRouter();

  useEffect(() => { cargarProductos(); }, []);

  const cargarProductos = async () => {
    const data = await getProductos();
    setProductos(data);
  };

  const eliminar = async (id) => {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      await eliminarProducto(id);
      cargarProductos();
    }
  };

  const productosFiltrados = productos.filter(producto =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    producto.descripcion?.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Fondo Spiderman */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[-12%] left-[-8%] w-[340px] h-[340px] bg-blue-400 opacity-25 rounded-full blur-3xl" />
        <div className="absolute bottom-[-12%] right-[-8%] w-[260px] h-[260px] bg-red-400 opacity-20 rounded-full blur-2xl" />
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center mb-9 relative z-10">
        <h1 className="flex items-center gap-3 text-3xl font-extrabold text-red-700 tracking-tight mb-5 md:mb-0 drop-shadow">
          <FaCapsules className="text-blue-600" />
          <span>
            <span className="text-blue-900">Medicamentos</span>
            <span className="block text-base font-semibold text-blue-600">Gestión de Inventario</span>
          </span>
        </h1>
        <button
          className="bg-gradient-to-r from-red-700 via-blue-700 to-red-600 hover:from-red-800 hover:to-blue-800 shadow-lg text-white px-6 py-2 rounded-xl flex items-center gap-2 transition-colors font-semibold border-2 border-blue-800"
          onClick={() => router.push('/productos/new')}
        >
          <FaPlus className="text-lg" />
          Nuevo Producto
        </button>
      </div>
      <div className="bg-white/95 rounded-2xl shadow-2xl border-2 border-blue-100 overflow-hidden mb-10 relative z-10">
        <div className="p-5 bg-gradient-to-r from-blue-50 to-red-50 border-b flex items-center">
          <div className="relative w-full max-w-sm mx-auto">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-blue-400">
              <FaSearch />
            </span>
            <input
              type="text"
              placeholder="Buscar medicamentos"
              className="pl-10 pr-3 py-2 w-full border border-red-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-blue-50 placeholder:text-blue-400 text-sm transition-all"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-blue-50 border-b">
              <tr>
                <th className="px-3 py-3 text-center text-xs font-extrabold text-blue-800 uppercase tracking-wider w-12">ID</th>
                <th className="px-3 py-3 text-left text-xs font-extrabold text-blue-800 uppercase tracking-wider">Producto</th>
                <th className="px-3 py-3 text-center text-xs font-extrabold text-blue-800 uppercase tracking-wider w-20">Precio</th>
                <th className="px-3 py-3 text-center text-xs font-extrabold text-blue-800 uppercase tracking-wider w-16">Stock</th>
                <th className="px-3 py-3 text-center text-xs font-extrabold text-blue-800 uppercase tracking-wider w-20">Categoría</th>
                <th className="px-3 py-3 text-center text-xs font-extrabold text-blue-800 uppercase tracking-wider w-20">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-blue-50">
              {productosFiltrados.map((producto) => (
                <tr key={producto.id} className="hover:bg-red-50/70 transition-colors">
                  <td className="px-3 py-3 text-center text-sm font-bold text-red-700">
                    #{producto.id}
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2">
                      <FaTag className="text-blue-400" />
                      <span className="text-sm font-semibold text-blue-900 truncate max-w-xs">
                        {producto.nombre}
                      </span>
                    </div>
                    {producto.descripcion && (
                      <div className="text-xs text-red-700 truncate max-w-xs">
                        {producto.descripcion}
                      </div>
                    )}
                  </td>
                  <td className="px-3 py-3 text-center text-sm font-bold text-blue-700">
                    S/. {producto.precio}
                  </td>
                  <td className="px-3 py-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      {producto.stock > 0 ? (
                        <FaCheckCircle className="text-blue-700" title="En stock" />
                      ) : (
                        <FaTimesCircle className="text-red-400" title="Sin stock" />
                      )}
                      <span className="text-sm font-semibold text-blue-900">
                        {producto.stock || 0}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-center text-sm text-blue-600">
                    <FaBox className="inline-block mr-1 text-red-400" />
                    {producto.categoriaId}
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => router.push(`/productos/${producto.id}/editar`)}
                        className="text-blue-700 hover:text-red-700 hover:bg-blue-50 p-1 rounded transition-colors"
                        title="Editar producto"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => eliminar(producto.id)}
                        className="text-red-600 hover:text-red-800 hover:bg-red-50 p-1 rounded transition-colors"
                        title="Eliminar producto"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {productosFiltrados.length === 0 && (
          <div className="p-10 text-center text-blue-700">
            <div className="text-4xl mb-2 flex justify-center">
              {busqueda ? <FaSearch /> : <FaCapsules />}
            </div>
            <p className="text-base font-semibold">
              {busqueda ? 'No se encontraron productos' : 'No hay productos registrados'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}