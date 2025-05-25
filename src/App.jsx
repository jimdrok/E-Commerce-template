import { Outlet } from "react-router-dom";
import NavigationBar from "./components/Navbar/Navbar";
import "./App.css";

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
