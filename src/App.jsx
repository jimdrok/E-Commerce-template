import { Outlet } from "react-router-dom";
import NavigationBar from "./components/Navbar/Navbar";
import "./App.css";
import Footer from "./components/Footer/Footer";
import { Helmet } from "react-helmet";

function App() {
  return (
    <div className="App">
      <Helmet>
        <title>Tienda React con API</title>
        <meta name="description" content="" />
      </Helmet>
      <NavigationBar />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
