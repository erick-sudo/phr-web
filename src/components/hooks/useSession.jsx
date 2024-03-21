import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { decodeToken } from "../../assets/utils";

export function useSession() {
  const { setExpiredLogin } = useContext(AuthContext);

  const handleSession = () => {
    const accessToken = sessionStorage.getItem("token") || "Token";
    if (accessToken) {
      // Decode token and set user
      const decodedToken = decodeToken(accessToken);
      if (decodedToken?.header) {
        if (new Date().getTime() - decodedToken?.header?.exp * 1000 > 0) {
          setExpiredLogin(true);
        }
      }
      return decodedToken?.payload;
    }
    return null;
  };

  return [handleSession];
}
