import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { getLocalStorage } from "../helpers/local-storage";
import Sidebar from "../components/Sidebar";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!getLocalStorage("user")) navigate("/");
  }, []);

  return (
    <div className="container-dashboard">
      <Sidebar />
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;