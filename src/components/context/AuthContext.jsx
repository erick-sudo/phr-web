import { createContext, useEffect, useState } from "react";
import { axiosGet, axiosPost } from "../../lib/axiosLib";
import { apis } from "../../lib/apis";
import { useSnackbar } from "notistack";

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [expiredLogin, setExpiredLogin] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const snackNotifier = (message, variant = "success", position = "bottom") => {
    enqueueSnackbar(message, {
      variant,
      autoHideDuration: 3000,
      anchorOrigin: position
        ? (() => {
            const V_ANCHOR_ORIGINS = ["top", "bottom"];
            const H_ANCHOR_ORIGINS = ["left", "right", "center"];
            const positions = position.split("-").slice(0, 2);
            return {
              vertical: V_ANCHOR_ORIGINS.includes("" + positions[0])
                ? positions[0]
                : "bottom",
              horizontal: H_ANCHOR_ORIGINS.includes("" + positions[1])
                ? positions[1]
                : "left",
            };
          })()
        : { vertical: "bottom", horizontal: "left" },
    });
  };

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
    snackNotifier,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
}
