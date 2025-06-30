import { FaCapsules, FaThList, FaChartBar } from "react-icons/fa";
import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  accent?: string;
}

function FeatureCard({ icon, title, description, accent }: FeatureCardProps) {
  return (
    <div
      className={`bg-gradient-to-br ${
        accent ||
        "from-white/95 via-blue-50 via-85% to-pink-50"
      } p-7 rounded-xl border-2 border-blue-200 shadow-lg hover:shadow-2xl transition-shadow flex flex-col items-center text-center`}
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-lg font-bold text-blue-900 mb-2 drop-shadow">{title}</h3>
      <p className="text-blue-800/80">{description}</p>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-red-50 to-pink-50 p-8 relative overflow-hidden">
      {/* Spiderverse blobs */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[-10%] left-[-8%] w-[320px] h-[320px] bg-gradient-to-br from-blue-400 via-yellow-100 to-fuchsia-200 opacity-30 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-8%] w-[260px] h-[260px] bg-gradient-to-tr from-red-400 via-pink-100 to-blue-200 opacity-20 rounded-full blur-2xl" />
        <div className="absolute top-1/2 left-[60%] w-[190px] h-[190px] bg-gradient-to-br from-amber-300 via-cyan-200 to-fuchsia-200 opacity-15 rounded-full blur-2xl" />
      </div>
      <main className="relative z-10 max-w-4xl mx-auto bg-white/95 rounded-2xl shadow-2xl overflow-hidden p-8 border-2 border-blue-200">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-red-700 mb-4 tracking-tight drop-shadow-lg">
            Farma
            <span className="text-blue-600">Spider</span>
            <span className="text-fuchsia-500">+</span>
            <span className="block text-lg font-semibold text-blue-600 mt-1">
              Sistema de Gestión Farmacéutica
            </span>
          </h1>
          <p className="text-lg text-blue-900/80 mb-7">
            Administra medicamentos y categorías de manera moderna, eficiente y heroica.
          </p>
          <div className="flex justify-center gap-6 mt-8 flex-wrap">
            <a href="/productos">
              <button className="flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-red-700 via-blue-700 to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:from-fuchsia-700 hover:to-blue-800 border-2 border-blue-700 hover:scale-105 transition-all duration-150">
                <FaCapsules className="text-lg drop-shadow" />
                Ver Medicamentos
              </button>
            </a>
            <a href="/categorias">
              <button className="flex items-center gap-2 px-7 py-3 border-2 border-fuchsia-500 text-fuchsia-700 font-semibold rounded-lg hover:bg-fuchsia-100 hover:border-blue-700 hover:text-blue-700 transition-all duration-150 hover:scale-105">
                <FaThList className="text-lg drop-shadow" />
                Ver Categorías
              </button>
            </a>
          </div>
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-7">
            <FeatureCard
              icon={
                <FaCapsules className="text-red-600 drop-shadow-lg bg-white/90 rounded-full p-3 border-2 border-blue-300" />
              }
              title="Gestión de Inventario"
              description="Controla stock, lotes, vencimientos y alertas ¡como un héroe!"
              accent="from-white/95 via-blue-100 to-red-50"
            />
            <FeatureCard
              icon={
                <FaThList className="text-blue-600 drop-shadow-lg bg-white/90 rounded-full p-3 border-2 border-fuchsia-300" />
              }
              title="Categorización Avanzada"
              description="Organiza productos con colores, subcategorías y máxima agilidad."
              accent="from-fuchsia-50 via-yellow-50 to-blue-100"
            />
            <FeatureCard
              icon={
                <FaChartBar className="text-yellow-500 drop-shadow-lg bg-white/90 rounded-full p-3 border-2 border-red-300" />
              }
              title="Reportes Inteligentes"
              description="Visualiza gráficos, ventas y existencias al instante."
              accent="from-yellow-50 via-blue-50 to-fuchsia-100"
            />
          </div>
        </div>
      </main>
    </div>
  );
}