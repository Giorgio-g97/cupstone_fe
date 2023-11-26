import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import ProtectedRoutes from "./middlewares/ProtectedRoutes";
import NavbarIndie from './components/Navbarindie'


function App() {
  return (
    <h1 className="text-3xl font-bold underline">
      <BrowserRouter>
        <NavbarIndie />
        <div className="pages">
          <Routes>
            <Route exact path="/" element={<Login />} />

            {/* Qualsiasi rotta metto all'interno qui sotto, seguirà la logica del
            middleware ProtectedRoutes */}
            <Route element={<ProtectedRoutes />}>
              <Route path="/home" element={<Home />} />
            </Route>
            
          </Routes>
        </div>
      </BrowserRouter>
    </h1>
  );
}

export default App;
