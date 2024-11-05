import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home, Login, Signup } from "./pages";
import { Navbar } from "./components/common";

function App() {
  return (
    <div className="w-screen min-h-screen bg-rich-black-900 flex flex-col font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
