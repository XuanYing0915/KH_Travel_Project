import Swal from 'sweetalert2'

export default function FavoriteSuccess(message) {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-right',
    iconColor: 'white',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,

    customClass: {
      popup: 'a-toast',
    },
    // didOpen: (toast) => {
    //   toast.addEventListener('mouseenter', Swal.stopTimer)
    //   toast.addEventListener('mouseleave', Swal.resumeTimer)
    // },
  })

  Toast.fire({
    icon: 'success',
    title: `${message} 成功`,
  })
}
