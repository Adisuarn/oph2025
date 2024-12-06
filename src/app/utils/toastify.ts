import { Bounce, toast } from 'react-toastify'

export enum ToastType {
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
  DEFAULT = 'default'
}

export const toastify = (message: string, type: ToastType) => { 
  toast(message, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    transition: Bounce,
    type: type
  })
}
