import "./App.css";
import "./assets/main.scss";
import Sidebar from "./components/Sidebar";
import DashboardRoutes from "./routing";

const App = () => {
  return (
    <Sidebar>
      <DashboardRoutes />
    </Sidebar>
  );
};

export default App;
