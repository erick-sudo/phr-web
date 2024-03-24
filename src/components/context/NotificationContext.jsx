import { createContext, useState } from "react";

export const NotificationContext = createContext({});

export function NotificationProvider({ enqueNotification, children }) {
  const [notifications, setNotifications] = useState([]);

  const enqueNotification = () => {
    setNotifications((prevNotifications) => [
      {
        id: new Date().getTime(),
        type: "success",
        message: "This is a success message!",
      },
      ...prevNotifications,
    ]);
  };

  return (
    <>
      <div className="absolute inset-x-0"></div>
      {children}
    </>
  );
}
