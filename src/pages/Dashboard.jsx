import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { getLocalStorage } from "../helpers/local-storage";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!getLocalStorage("user")) navigate("/");
  }, []);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <main style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
        <Outlet />
      </main>
    </div>
  );
}

export default Dashboard;