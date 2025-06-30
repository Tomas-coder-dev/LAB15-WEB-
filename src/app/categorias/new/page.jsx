'use client';
import { useState } from 'react';
import { crearCategoria } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { FaFolderPlus } from 'react-icons/fa';

export default function NuevaCategoria() {
  const [categoria, setCategoria] = useState({ nombre: '' });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await crearCategoria(categoria);
    router.push('/categorias');
  };

  return (
    <div className="max-w-lg mx-auto bg-white/95 rounded-2xl shadow-2xl border-2 border-blue-100 overflow-hidden p-8 mt-12 relative">
      {/* Glow/acento Spiderman */}
      <div className="pointer-events-none absolute -top-16 -left-16 w-40 h-40 bg-blue-400 opacity-30 rounded-full blur-2xl"></div>
      <div className="pointer-events-none absolute bottom-0 -right-16 w-36 h-36 bg-red-400 opacity-20 rounded-full blur-2xl"></div>
      <div className="text-center mb-8">
        <div className="flex justify-center items-center mb-2">
          <span className="bg-gradient-to-tr from-blue-100 via-red-100 to-white p-3 rounded-full shadow">
            <FaFolderPlus className="text-red-700 text-3xl" />
          </span>
        </div>
        <h1 className="text-3xl font-extrabold text-red-700 tracking-tight mb-1">
          Nueva Categoría
        </h1>
        <p className="text-blue-700/80 font-medium">Complete los datos de la categoría</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField
          label="Nombre de la categoría"
          placeholder="Ej: Analgésico, Antibiótico, etc."
          value={categoria.nombre}
          onChange={e => setCategoria({...categoria, nombre: e.target.value})}
          required
        />
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={() => router.push('/categorias')}
            className="px-4 py-2 border border-blue-200 rounded-lg text-blue-700 hover:bg-blue-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-gradient-to-r from-red-700 via-blue-700 to-red-600 text-white rounded-lg shadow-md hover:from-red-800 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-colors border-2 border-blue-800"
          >
            Guardar Categoría
          </button>
        </div>
      </form>
    </div>
  );
}

function FormField({ label, ...props }) {
  return (
    <div className="space-y-2">
      <label className="flex items-center text-sm font-medium text-red-900 gap-2">
        {label}
      </label>
      <input
        className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-red-400 bg-blue-50/50 transition-all placeholder:text-blue-400"
        {...props}
      />
    </div>
  );
}