import Swal, { SweetAlertIcon } from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

interface ConfirmationModalProps {
  title?: string;
  text: string;
  confirmButtonText?: string;
  icon: SweetAlertIcon;
  showConfirmButton?: boolean;
  showCancelButton?: boolean;
}

const ConfirmationModal = async ({
  title = "Are you sure?",
  text,
  confirmButtonText,
  icon,
  showConfirmButton = true,
  showCancelButton = true,
}: ConfirmationModalProps) => {
  const MySwal = withReactContent(Swal);
  const result = MySwal.fire({
    title: title,
    text,
    icon: `${icon}`,
    showConfirmButton: showConfirmButton,
    showCancelButton: showCancelButton,
    confirmButtonText,
    customClass: {
      confirmButton: `border-none ${
        icon === `warning`
          ? `bg-red-500 hover:bg-red-600`
          : `bg-black hover:bg-[#3A3B3C]`
      } text-white px-4 py-2 rounded`,
      cancelButton:
        "bg-transparent hover:bg-gray-200 text-gray-600 px-4 py-2 rounded ms-1",
    },
    buttonsStyling: false,
  });
  return await result;
};

export default ConfirmationModal;
