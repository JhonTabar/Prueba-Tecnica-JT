import { useState, useEffect } from "react";
import { end_points } from "../services/api";
import { redirect } from "../helpers/alerts";
import { useParams, Link } from "react-router-dom";

function IncidenciaEdit() {
  const [nombre, setNombre] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [estado, setEstado] = useState(false);
  const [prioridad, setPrioridad] = useState(0);
  const { id } = useParams();

  function getIncidencia() {
    fetch(end_points.incidentes + "/" + id)
      .then((response) => response.json())
      .then((data) => {
        setNombre(data.nombre);
        setTitulo(data.titulo);
        setDescripcion(data.descripcion);
        setEstado(data.estado);
        setPrioridad(data.prioridad);
      });
  }

  useEffect(() => {
    getIncidencia();
  }, []);

  function updateIncidencia() {
    const incidencia = { nombre, titulo, descripcion, estado, prioridad };

    fetch(end_points.incidentes + "/" + id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(incidencia),
    })
      .then((response) => response.json())
      .then(() => {
        redirect("Incidencia editada", "/dashboard/incidents/", "success");
      });
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-slate-900 text-lg font-bold tracking-tight">
            Editar incidencia
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">Formulario acorde al modelo</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200 whitespace-nowrap">
            {estado ? "Resuelto" : "Pendiente"}
          </span>
          <Link
            to="/dashboard/incidents/"
            className="rounded-lg px-3 py-2 text-sm font-semibold border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Cancelar
          </Link>
          <button
            onClick={updateIncidencia}
            type="button"
            className="rounded-lg px-3 py-2 text-sm font-semibold bg-primary hover:bg-primary/90 text-white transition-colors"
          >
            Guardar cambios
          </button>
        </div>
      </div>

      <form className="p-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">

          <div className="lg:col-span-12">
            <p className="text-xs font-semibold text-slate-500">Datos</p>
          </div>

          <div className="lg:col-span-6">
            <label className="text-xs font-semibold text-slate-600">Nombre</label>
            <input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              type="text"
              className="mt-1 w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          <div className="lg:col-span-6">
            <label className="text-xs font-semibold text-slate-600">Título</label>
            <input
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              type="text"
              className="mt-1 w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          <div className="lg:col-span-9">
            <label className="text-xs font-semibold text-slate-600">Descripción</label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              rows={3}
              className="mt-1 w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
            />
          </div>

          <div className="lg:col-span-3">
            <label className="text-xs font-semibold text-slate-600">Prioridad</label>
            <input
              value={prioridad}
              onChange={(e) => setPrioridad(e.target.value)}
              type="number"
              min="0"
              className="mt-1 w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          <div className="lg:col-span-12">
            <label className="text-xs font-semibold text-slate-600">Estado</label>
            <select
              value={estado}
              onChange={(e) => setEstado(e.target.value === "true")}
              className="mt-1 w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              <option value="false">Pendiente</option>
              <option value="true">Resuelto</option>
            </select>
          </div>

        </div>
      </form>
    </div>
  );
}

export default IncidenciaEdit;
