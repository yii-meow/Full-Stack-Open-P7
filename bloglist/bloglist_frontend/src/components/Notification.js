import { Alert } from "@mui/material";
import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector(({ notifications }) => {
    return notifications;
  });

  return (
    notification.message && (
      <Alert
        severity={
          notification.type !== "" && notification.type === "success"
            ? "success"
            : "error"
        }
      >
        {notification.message}
      </Alert>
    )
  );
};

export default Notification;
