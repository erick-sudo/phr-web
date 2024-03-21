import { createContext, useState } from "react";

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [expiredLogin, setExpiredLogin] = useState(false);

  const logout = () => {
    setUserInfo(null);
    sessionStorage.clear();
    setExpiredLogin(false);
  };

  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

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
