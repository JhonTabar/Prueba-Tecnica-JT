import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Incidencia from "../pages/incidencia";
import IncidenciaCreate from "../pages/incidenciaCreate";
import IncidenciaEdit from "../pages/incidenciaEdit";
import React from "react";

export let routerApp = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard/",
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: <Incidencia />,
      },
      {
        path: "incidents/",
        element: <Incidencia />,
      },
      {
        path: "create-incident/",
        element: <IncidenciaCreate />,
      },
      {
        path: "edit-incident/:id",
        element: <IncidenciaEdit />,
      },
    ],
  },
];