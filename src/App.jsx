import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import {
  AccountConfirmation,
  ForgotPassword,
  Home,
  Login,
  MyProfile,
  ResetPassword,
  Signup,
} from "./pages";
import { Navbar } from "./components/common";
import { setNavigate } from "./hooks/setNavigate";

function App() {
  const navigate = useNavigate();
  setNavigate(navigate);
  return (
    <div className="w-screen min-h-screen bg-rich-black-900 flex flex-col font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/account-confirmation/"
          element={<AccountConfirmation />}
        />
        <Route
          path="/account-confirmation/:token"
          element={<AccountConfirmation />}
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/dashboard/my-profile" element={<MyProfile />} />
      </Routes>
    </div>
  );
}

export default App;
