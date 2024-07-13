import { toast } from "react-toastify";

type Props = {
  type?: "success" | "error" | "warning";
};

export const useToast = (
  message: string,
  options: Props = { type: undefined }
) => {
  switch (options.type) {
    case "success":
      toast.success(message, { className: "custom-toast-success" });
      break;
    case "error":
      toast.error(message, { className: "custom-toast-error" });
      break;
    case "warning":
      toast.warning(message, { className: "custom-toast-warning" });
      break;
    default:
      toast(message);
      break;
  }
};
