import Swal from "sweetalert2";

export function redirect(message, url, icono) {
  Swal.fire({
    title: message,
    icon: icono,
    timer: 1500,
    timerProgressBar: true,
    showConfirmButton: false,
    willClose: () => {
      window.location.href = url;
    },
  });
}

export function confirm(title, text, icon, textConfirm, endpoint, id, fetchData) {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    showCancelButton: true,
    confirmButtonColor: "#c2410c",
    cancelButtonColor: "#94a3b8",
    confirmButtonText: textConfirm,
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(endpoint + "/" + id, { method: "DELETE" })
        .then((response) => response.json())
        .then(() => {
          fetchData();
          Swal.fire({
            title: "Eliminado",
            text: "La incidencia fue eliminada correctamente.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
        });
    }
  });
}

export function errorAlert(message) {
  Swal.fire({
    title: "Ocurrió un error",
    text: message,
    icon: "error",
    confirmButtonColor: "#c2410c",
    confirmButtonText: "Entendido",
  });
}