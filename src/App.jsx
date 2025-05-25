import { Outlet } from "react-router-dom";
import NavigationBar from "./components/Navbar/Navbar";
import "./App.css";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
