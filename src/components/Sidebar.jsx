import { getLocalStorage, removeLocalStorage } from "../helpers/local-storage";
import { initials } from "../helpers/generators";
import { redirect } from "../helpers/alerts";
import { Link } from "react-router-dom";
import "../pages/Dashboard.css";

let auth = getLocalStorage("user");

const Sidebar = () => {
  function logout() {
    removeLocalStorage("user");
    redirect("Cerrando sesión...", "/", "info");
  const auth = getLocalStorage("user");
  if (!auth) return null;
  }

  return (
    <aside className="container-sidebar">
      <div>
        <h2>{initials(auth.username)}</h2>
        <p>{auth.username}</p>
        <p>Admin ID: {auth.id_admin}</p>
      </div>
      <nav>
        <Link to="/dashboard/incidents/">Incidencias</Link>
        <Link to="/dashboard/create-incident/">Nueva incidencia</Link>
      </nav>
      <button onClick={logout}>Cerrar sesión</button>
    </aside>
  );
};

export default Sidebar;