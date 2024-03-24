import { createContext, useEffect, useState } from "react";
import { axiosGet, axiosPost } from "../../lib/axiosLib";
import { apis } from "../../lib/apis";

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [expiredLogin, setExpiredLogin] = useState(false);

  const logout = async () => {
    setUserInfo(null);
    setExpiredLogin(false);
    await axiosPost(apis.logout)
      .then((res) => {
        console.log("Logged out succesfully");
      })
      .catch((err) => {});
  };

  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  useEffect(() => {
    // Remember user information
    axiosGet(apis.currentUser)
      .then((res) => {
        if (res?.data) {
          setUserInfo(res.data);
        }
      })
      .catch((err) => {});
  }, []);

  const contextData = {
    startLoading,
    stopLoading,
    loading,
    userInfo,
    setUserInfo,
    expiredLogin,
    setExpiredLogin,
    logout,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
}
