'use client';
import { useEffect, useState } from 'react';
import { getProducto, actualizarProducto } from '@/lib/api';
import { useRouter, useParams } from 'next/navigation';
import { FaEdit, FaTag, FaDollarSign, FaBoxes } from 'react-icons/fa';

export default function EditarProducto() {
  const [producto, setProducto] = useState({ nombre: '', precio: '', stock: '', categoriaId: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    if (id) {
      getProducto(id)
        .then(setProducto)
        .catch(() => setError('No se pudo cargar el producto. Intenta nuevamente.'));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    // Validaciones básicas antes de enviar
    if (!producto.nombre || !producto.precio || !producto.stock || !producto.categoriaId) {
      setError('Todos los campos son obligatorios');
      return;
    }
    setLoading(true);
    try {
      await actualizarProducto(id, producto);
      router.push('/productos');
    } catch (err) {
      setError('Error al actualizar producto. Verifica los datos o conexión.');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white/95 rounded-2xl shadow-2xl border-2 border-blue-100 overflow-hidden p-8 mt-10 relative">
      {/* Glow/acento Spiderman */}
      <div className="pointer-events-none absolute -top-16 -left-16 w-40 h-40 bg-blue-400 opacity-30 rounded-full blur-2xl"></div>
      <div className="pointer-events-none absolute bottom-0 -right-16 w-36 h-36 bg-red-400 opacity-20 rounded-full blur-2xl"></div>
      <div className="text-center mb-8">
        <div className="flex justify-center items-center mb-2">
          <span className="bg-gradient-to-tr from-blue-100 via-red-100 to-white p-3 rounded-full shadow">
            <FaEdit className="text-red-700 text-3xl" />
          </span>
        </div>
        <h1 className="text-3xl font-extrabold text-red-700 tracking-tight mb-1">
          Editar Producto
        </h1>
        <p className="text-blue-700/80 font-medium">
          Modifica los campos que deseas actualizar
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="text-red-600 bg-red-50 border border-red-200 rounded p-2 text-center text-sm">
            {error}
          </div>
        )}
        <FormField
          label="Nombre del Producto"
          icon={<FaTag className="text-red-500" />}
          placeholder="Ej: Paracetamol 500mg"
          value={producto.nombre}
          onChange={e => setProducto({ ...producto, nombre: e.target.value })}
          required
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            label="Precio (S/.)"
            icon={<FaDollarSign className="text-blue-600" />}
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            value={producto.precio}
            onChange={e => setProducto({ ...producto, precio: e.target.value })}
            required
          />
          <FormField
            label="Stock"
            icon={<FaBoxes className="text-blue-400" />}
            type="number"
            min="0"
            placeholder="Cantidad"
            value={producto.stock}
            onChange={e => setProducto({ ...producto, stock: e.target.value })}
            required
          />
        </div>
        <FormField
          label="ID de Categoría"
          icon={<FaTag className="text-blue-400" />}
          placeholder="Ej: 1"
          value={producto.categoriaId}
          onChange={e => setProducto({ ...producto, categoriaId: e.target.value })}
          required
        />
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={() => router.push('/productos')}
            className="px-4 py-2 border border-blue-200 rounded-lg text-blue-700 hover:bg-blue-50 transition-colors"
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-gradient-to-r from-red-700 via-blue-700 to-red-600 text-white rounded-lg shadow-md hover:from-red-800 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-colors border-2 border-blue-800"
            disabled={loading}
          >
            {loading ? 'Actualizando...' : 'Actualizar Producto'}
          </button>
        </div>
      </form>
    </div>
  );
}

function FormField({ label, icon, ...props }) {
  return (
    <div className="space-y-2">
      <label className="flex items-center text-sm font-medium text-red-900 gap-2">
        {icon}
        {label}
      </label>
      <input
        className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-red-400 bg-blue-50/50 transition-all placeholder:text-blue-400"
        {...props}
      />
    </div>
  );
}