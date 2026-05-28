import { useState, useEffect } from "react";
import { end_points } from "../services/api";
import { confirm } from "../helpers/alerts";
import { Link } from "react-router-dom";

function Incidencia() {
  const [incidencias, setIncidencias] = useState([]);
  const [error, setError] = useState(null);

  function fetchData() {
    fetch(end_points.incidentes)
      .then((response) => response.json())
      .then((data) => setIncidencias(data))
      .catch((error) => setError(error));
  }

  useEffect(() => {
    fetchData();
  }, []);

  function deleteIncidencia(id) {
    confirm(
      "¿Seguro que desea eliminar?",
      "Esta acción no se podrá revertir",
      "warning",
      "Sí, eliminar",
      end_points.incidentes,
      id,
      fetchData,
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h2>Incidencias</h2>
          <p className="text-sm text-slate-600">Listado de incidencias</p>
        </div>
        <Link
          to="/dashboard/create-incident/"
          className="shrink-0 inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold bg-primary hover:bg-primary/90 text-white transition-colors"
        >
          Crear
        </Link>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="min-w-300 w-full table-auto">
            <thead className="bg-slate-50">
              <tr className="text-left">
                <th className="px-4 py-3 text-xs font-semibold text-slate-600">Nombre</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-600">Título</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-600">Descripción</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-600">Estado</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-600">Prioridad</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-600 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {incidencias.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-900 truncate">{item.nombre}</p>
                      <p className="mt-0.5 text-xs text-slate-500 truncate">ID: {item.id}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-slate-700 whitespace-nowrap">{item.titulo}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-slate-700">{item.descripcion}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200 whitespace-nowrap">
                      {item.estado ? "Resuelto" : "Pendiente"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 whitespace-nowrap">
                      {item.prioridad}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={"/dashboard/edit-incident/" + item.id}
                        className="rounded-lg px-3 py-2 text-xs font-semibold border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => deleteIncidencia(item.id)}
                        type="button"
                        className="rounded-lg px-3 py-2 text-xs font-semibold border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 transition-colors"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Incidencia;