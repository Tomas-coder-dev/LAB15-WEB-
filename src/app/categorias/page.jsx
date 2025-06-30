'use client';
import { useEffect, useState } from 'react';
import { getCategorias, eliminarCategoria } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { FaFolderOpen, FaPlus, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';

export default function CategoriasPage() {
  const [categorias, setCategorias] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const router = useRouter();

  useEffect(() => { cargar(); }, []);

  const cargar = async () => {
    const data = await getCategorias();
    setCategorias(data);
  };

  const eliminar = async (id) => {
    if (confirm('¿Está seguro que desea eliminar esta categoría?')) {
      await eliminarCategoria(id);
      cargar();
    }
  };

  const categoriasFiltradas = categorias.filter(categoria =>
    categoria.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Fondo Spiderman */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[-12%] left-[-12%] w-[220px] h-[220px] bg-blue-400 opacity-30 rounded-full blur-3xl" />
        <div className="absolute bottom-[-12%] right-[-12%] w-[180px] h-[180px] bg-red-400 opacity-20 rounded-full blur-2xl" />
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center mb-7 relative z-10">
        <h1 className="flex items-center gap-2 text-2xl font-extrabold text-red-700 tracking-tight mb-4 md:mb-0 drop-shadow">
          <FaFolderOpen className="text-blue-600" />
          Categorías de Productos
        </h1>
        <button
          className="bg-gradient-to-r from-red-700 via-blue-700 to-red-600 hover:from-red-800 hover:to-blue-800 shadow text-white px-5 py-2 rounded-lg flex items-center gap-2 transition-colors font-semibold border-2 border-blue-800"
          onClick={() => router.push('/categorias/new')}
        >
          <FaPlus />
          Nueva Categoría
        </button>
      </div>
      <div className="bg-white/95 rounded-2xl shadow-2xl border-2 border-blue-100 overflow-hidden mb-10 relative z-10">
        <div className="p-4 bg-gradient-to-r from-blue-50 to-red-50 border-b flex items-center">
          <div className="relative w-full max-w-xs mx-auto">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-blue-400">
              <FaSearch />
            </span>
            <input
              type="text"
              placeholder="Buscar categorías..."
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
                <th className="px-3 py-3 text-center text-xs font-extrabold text-blue-800 uppercase tracking-wider w-16">ID</th>
                <th className="px-3 py-3 text-left text-xs font-extrabold text-blue-800 uppercase tracking-wider">Nombre</th>
                <th className="px-3 py-3 text-center text-xs font-extrabold text-blue-800 uppercase tracking-wider w-24">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-blue-50">
              {categoriasFiltradas.map((categoria) => (
                <tr key={categoria.id} className="hover:bg-red-50/70 transition-colors">
                  <td className="px-3 py-3 text-center text-sm font-bold text-red-700">
                    #{categoria.id}
                  </td>
                  <td className="px-3 py-3">
                    <span className="text-sm font-semibold text-blue-900">{categoria.nombre}</span>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => router.push(`/categorias/${categoria.id}/editar`)}
                        className="text-blue-700 hover:text-red-700 hover:bg-blue-50 p-2 rounded transition-colors"
                        title="Editar categoría"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => eliminar(categoria.id)}
                        className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded transition-colors"
                        title="Eliminar categoría"
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
        {categoriasFiltradas.length === 0 && (
          <div className="p-8 text-center text-blue-700">
            <div className="text-4xl mb-2 flex justify-center">
              {busqueda ? <FaSearch /> : <FaFolderOpen />}
            </div>
            <p className="text-base font-medium">
              {busqueda ? 'No se encontraron categorías' : 'No hay categorías registradas'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}