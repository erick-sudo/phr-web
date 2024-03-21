import { useState, useEffect, useContext } from "react";
import { useLogin } from "../hooks/useLogin";
import { useSession } from "../hooks/useSession";
import { faHomeLgAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navigate, useNavigate } from "react-router";
import {
  EyeIcon,
  EyeSlashIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export function Login() {
  const [loginErrors, setLoginErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [handleLogin] = useLogin();
  const [formData, setFormData] = useState({
    identity: "admin",
    password: "password",
  });
  const navigate = useNavigate();

  const [handleSession] = useSession();

  const { userInfo } = useContext(AuthContext);

  useEffect(() => {
    handleSession();
  }, []);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleLogin({
      payload: {
        ...formData,
        grant_type: "user",
      },
      errorCallback: setLoginErrors,
    });
  }

  if (userInfo) {
    return <Navigate to="/" />
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100">
      <div className="rounded-lg relative bg-white backdrop-blur px-4 py-12">
        <div className="py-2 px-4 sm:rounded-lg sm:px-10">
          <h2
            onClick={() => navigate("/")}
            className="cursor-pointer flex items-center gap-2 text-left text-2xl font-bold"
          >
            <FontAwesomeIcon icon={faHomeLgAlt} />
            <span className="relative">Login</span>
          </h2>

          <form className="grid p-2 gap-4 mt-4" onSubmit={handleSubmit}>
            <div className="relative flex flex-col items-center justify-center">
              <input
                className="peer pl-6 pr-14 py-3 border w-full relative focus:outline-emerald-500 duration-300 rounded"
                type="text"
                id="identity"
                placeholder="Username or email"
                value={formData.identity}
                onChange={handleChange}
                required
                name="identity"
              />
              <UserCircleIcon
                height={20}
                className="absolute z-10 right-4 text-gray-400 peer-focus:text-emerald-500"
              />
              {loginErrors && loginErrors.status === 404 && (
                <div className="text-red-700 rounded text-xs my-1 text-center">
                  {loginErrors.error}
                </div>
              )}
            </div>
            <div className="relative flex flex-col items-center justify-center">
              <input
                className="peer pl-6 pr-14 py-3 border w-full relative focus:outline-emerald-500 duration-300 rounded"
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                name="password"
              />
              {!showPassword ? (
                <EyeSlashIcon
                  onClick={() => setShowPassword(!showPassword)}
                  height={20}
                  className="absolute z-10 right-4 text-gray-400 peer-focus:text-emerald-500 hover:text-emerald-800 cursor-pointer duration-200"
                />
              ) : (
                <EyeIcon
                  onClick={() => setShowPassword(!showPassword)}
                  height={20}
                  className="absolute z-10 right-4 text-gray-400 peer-focus:text-emerald-500 hover:text-emerald-800 cursor-pointer duration-200"
                />
              )}
              {loginErrors && loginErrors.status === 401 && (
                <div className="text-red-700 rounded text-xs my-1 text-center">
                  {loginErrors.error}
                </div>
              )}
            </div>
            <div className="mt-4 grid font-bold rounded-md">
              <button
                className={`duration-300 bg-emerald-600 hover:bg-emerald-400 text-white rounded-lg px-8 py-2`}
                type="submit"
              >
                Sign In
              </button>
            </div>
          </form>
          <div className="text-center flex mx-auto w-max mt-6 items-center gap-4">
            <span>Not registered..?</span>
            <Link
              to="/signup"
              className="text-emerald-800 hover:text-emerald-500 no-underline"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
