import { toast } from "react-toastify";
export const alert = {
  success,
  error,
  clear,
};

function success(message) {
  toast(message, {
    containerId: "TOP_RIGHT",
    autoClose: 5000,
    type: "success",
  });
}

function error(message) {
  toast(message, {
    containerId: "TOP_RIGHT",
    autoClose: 5000,
    type: "error",
  });
}

function clear() {
  // toast.dismiss();
}
