import { useContext, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, useLocation, useNavigate } from "react-router";
import Dashboard from "./components/dashboard/Dashboard";
import { Expired } from "./components/Expired";
import { Loader } from "./components/Loader";
import { AuthContext } from "./components/context/AuthContext";
import Signup from "./components/account/Signup";
import Error404 from "./components/Error404";
import ForgotPassword from "./components/account/ForgotPassword";
import ActivateAccount from "./components/account/ActivateAccount";

function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { userInfo, setUserInfo, expiredLogin, logout, loading } =
    useContext(AuthContext);

  // useEffect(() => {

  // }, [pathname]);

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
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/activate_account" element={<ActivateAccount />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </>
    </div>
  );
}

export default App;
