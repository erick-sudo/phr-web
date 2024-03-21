import { useContext, useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, useLocation, useNavigate } from "react-router";
import Dashboard from "./components/dashboard/Dashboard";
import { Expired } from "./components/Expired";
import { Loader } from "./components/Loader";
import { Login } from "./components/account/Login";
import { useSession } from "./components/hooks/useSession";
import { AuthContext } from "./components/context/AuthContext";
import Signup from "./components/account/Signup";

function App() {
  const { pathname } = useLocation();
  const [handleSession] = useSession();
  const navigate = useNavigate();
  const { userInfo, setUserInfo, expiredLogin, logout, loading } =
    useContext(AuthContext);

  useEffect(() => {
    setUserInfo(handleSession());
  }, [pathname]);

  return (
    <div className="fixed inset-0 flex flex-col text-sm">
      {userInfo && expiredLogin && (
        <Expired
          onCancel={() => {
            navigate("/");
            logout();
          }}
          onLogin={logout}
        />
      )}
      {loading && <Loader className="bg-white/75 z-50 fixed" />}
      <>
        <Routes>
          <Route path="/*" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </>
    </div>
  );
}

export default App;
