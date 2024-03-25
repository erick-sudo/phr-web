import { useContext } from "react";
import { axiosPost, axiosGet } from "../../lib/axiosLib";
import { apis } from "../../lib/apis";
import { AuthContext } from "../context/AuthContext";

export function useLogin() {
  const { setUserInfo, startLoading, stopLoading } = useContext(AuthContext);

  function updateUserInformation(userData) {
    setUserInfo(userData);
  }

  const handleLogin = async ({ payload = {}, errorCallback = () => {} }) => {
    startLoading();
    await axiosPost(apis.login, payload)
      .then(async (response) => {
        await axiosGet(apis.currentUser)
          .then((response) => {
            updateUserInformation(response.data);
          })
          .catch((axiosError) => {
            errorCallback(axiosError.response.data);
          });
      })
      .catch((axiosError) => {
        errorCallback(axiosError?.response?.data);
      });
    stopLoading();
  };

  return [handleLogin];
}
