import { useState, useEffect } from "react";
import { redirect } from "../helpers/alerts";
import { end_points } from "../services/api";
import { saveLocalStorage } from "../helpers/local-storage";

const Login = () => {
  const [getUsername, setUsername] = useState("");
  const [getPassword, setPassword] = useState("");
  const [getUsers, setUsers] = useState([]);

  function fetchUsers() {
    fetch(end_points.users)
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const findUser = () => {
    return getUsers.find(
      (item) => getUsername === item.username && getPassword === item.password
    );
  };

  function signIn() {
    const user = findUser();
    if (user) {
      saveLocalStorage("user", user);
      redirect("Bienvenido al sistema", "/dashboard/incidents/", "success");
    } else {
      redirect("Usuario o contraseña incorrectos", "/", "error");
    }
  }

  return (
    <div className="flex h-full grow flex-col">
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 px-6 lg:px-10 py-4 bg-white">
        <h2 className="text-slate-900 text-lg font-bold leading-tight tracking-tight">
          Issue Tracker
        </h2>
      </header>

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-xl shadow-sm border border-slate-200 p-8 lg:p-10">
          <div className="flex flex-col items-center mb-8">
            <h1 className="text-slate-900 text-2xl font-bold tracking-tight">
              Iniciar sesión
            </h1>
            <p className="text-slate-500 text-sm mt-2 text-center">
              Ingresa tus credenciales para continuar.
            </p>
          </div>

          <form className="space-y-5">
            <div className="flex flex-col gap-2">
              <label className="text-slate-700 text-sm font-medium">
                Usuario
              </label>
              <input
                onChange={(e) => setUsername(e.target.value)}
                value={getUsername}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none placeholder:text-slate-400"
                placeholder="Ej: username 1"
                type="text"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-slate-700 text-sm font-medium">
                Contraseña
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={getPassword}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none placeholder:text-slate-400"
                placeholder="Ej: password 1"
                type="password"
              />
            </div>

            <button
              onClick={signIn}
              className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
              type="button"
            >
              Ingresar
            </button>
          </form>
        </div>
      </main>

      <footer className="px-10 py-6 text-center text-slate-400 text-xs">
        <p>© 2026 Issue Tracker. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Login;