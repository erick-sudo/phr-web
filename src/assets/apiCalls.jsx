export const apiCalls = {
  getRequest: ({
    endpoint = baseUrl,
    httpMethod = "GET",
    httpHeaders = {},
    successCallback = (res) => {},
    errorCallback = (res) => {},
  }) => {
    fetch(endpoint, {
      method: httpMethod,
      headers: httpHeaders,
    })
      .then((response) => {
        if (response.status < 400) {
          response.json().then((responseData) => {
            successCallback(responseData, response.status);
          });
        } else {
          response.json().then((responseData) => {
            errorCallback(responseData, response.status);
          });
        }
      })
      .catch((error) => {
        errorCallback(
          {
            message: error?.message?.startsWith("Failed to fetch")
              ? "Please check your internet connection"
              : error.message,
          },
          -1
        );
      });
  },
  postRequest: ({
    endpoint = baseUrl,
    httpMethod = "POST",
    httpHeaders = {},
    httpBody = {},
    successCallback = (res) => {},
    errorCallback = (res) => {},
  }) => {
    fetch(endpoint, {
      method: httpMethod,
      headers: httpHeaders,
      body: JSON.stringify(httpBody),
    })
      .then((response) => {
        if (response.status < 400) {
          response.json().then((responseData) => {
            successCallback(responseData, response.status);
          });
        } else {
          response.json().then((responseData) => {
            errorCallback(responseData, response.status);
          });
        }
      })
      .catch((error) => {
        errorCallback(
          {
            message: error?.message?.startsWith("Failed to fetch")
              ? "Please check your internet connection"
              : error.message,
          },
          0
        );
      });
  },
  deleteRequest: ({
    endpoint = baseUrl,
    httpMethod = "DELETE",
    httpHeaders = {},
    successCallback = (res) => {},
    errorCallback = (res) => {},
  }) => {
    fetch(endpoint, {
      method: httpMethod,
      headers: httpHeaders,
    })
      .then((response) => {
        if (response.status < 400) {
          successCallback("Successfully Deleted", response.status);
        } else {
          response.json().then((responseData) => {
            errorCallback(responseData, response.status);
          });
        }
      })
      .catch((error) => {
        errorCallback(
          {
            message: error?.message?.startsWith("Failed to fetch")
              ? "Please check your internet connection"
              : error.message,
          },
          0
        );
      });
  },
};
