import { Link } from "react-router-dom";
import { end_points } from "../services/api";
import { redirect } from "../helpers/alerts";

function IncidenciaCreate() {
  function createIncidencia(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    data.estado = false;

    fetch(end_points.incidentes, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(() => {
        redirect("Incidencia creada", "/dashboard/incidents/", "success");
      });
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-slate-900 text-lg font-bold tracking-tight">
            Crear incidencia
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">Formulario acorde al modelo</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/dashboard/incidents/"
            className="rounded-lg px-3 py-2 text-sm font-semibold border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Cancelar
          </Link>
        </div>
      </div>

      <form onSubmit={createIncidencia} className="p-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">

          <div className="lg:col-span-12">
            <p className="text-xs font-semibold text-slate-500">Datos</p>
          </div>

          <div className="lg:col-span-6">
            <label className="text-xs font-semibold text-slate-600">Nombre</label>
            <input
              name="nombre"
              type="text"
              placeholder="Ej: Error en módulo de pagos"
              className="mt-1 w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder:text-slate-400"
            />
          </div>

          <div className="lg:col-span-6">
            <label className="text-xs font-semibold text-slate-600">Título</label>
            <input
              name="titulo"
              type="text"
              placeholder="Ej: Botón no responde en Safari"
              className="mt-1 w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder:text-slate-400"
            />
          </div>

          <div className="lg:col-span-9">
            <label className="text-xs font-semibold text-slate-600">Descripción</label>
            <textarea
              name="descripcion"
              rows={3}
              placeholder="Describe el problema detalladamente..."
              className="mt-1 w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder:text-slate-400 resize-none"
            />
          </div>

          <div className="lg:col-span-3">
            <label className="text-xs font-semibold text-slate-600">Prioridad</label>
            <input
              name="prioridad"
              type="number"
              min="0"
              placeholder="Ej: 55"
              className="mt-1 w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder:text-slate-400"
            />
          </div>

        </div>

        <button
          type="submit"
          className="rounded-lg mt-6 px-3 py-2 text-sm font-semibold bg-primary hover:bg-primary/90 text-white transition-colors"
        >
          Guardar
        </button>
      </form>
    </div>
  );
}

export default IncidenciaCreate;