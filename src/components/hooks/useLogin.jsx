import { useContext } from "react";
import { apiCalls } from "../../assets/apiCalls";
import { useToken } from "./useToken";
import { useSession } from "./useSession";
import { notifiers } from "../../assets/notifiers";
import { apis } from "../../lib/apis";
import { AuthContext } from "../context/AuthContext";

export function useLogin() {
  const [handleToken] = useToken();
  const [handleSession] = useSession();
  const { setExpiredLogin, setUserInfo, startLoading, stopLoading } =
    useContext(AuthContext);

  function updateUserInformation(tokenObject) {
    handleToken(tokenObject.access_token);
    setExpiredLogin(false);
    setUserInfo(handleSession());
  }

  const handleLogin = ({ payload = {}, errorCallback = () => {} }) => {

    // Mock Login
    updateUserInformation({})

    // startLoading();
    // apiCalls.postRequest({
    //   endpoint: apis.login,
    //   httpMethod: "POST",
    //   httpHeaders: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //   },
    //   httpBody: payload,
    //   successCallback: (res) => {
    //     updateUserInformation(res);
    //     stopLoading();
    //   },
    //   errorCallback: (err) => {
    //     notifiers.httpError(err);
    //     errorCallback(err);
    //     stopLoading();
    //   },
    // });
  };

  return [handleLogin];
}
