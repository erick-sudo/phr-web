import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { decodeToken } from "../../assets/utils";

export function useToken() {
  const { setUserInfo } = useContext(AuthContext);

  const handleToken = (token) => {
    setUserInfo(decodeToken(token));
    sessionStorage.setItem("token", token);
  };

  return [handleToken];
}
