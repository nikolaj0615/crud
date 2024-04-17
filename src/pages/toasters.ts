import {toast} from 'react-toastify';

export function ErrorToast(props: string) {
    toast.error(props);
}

export function SuccessToast(props: string) {
    toast.success(props);
}

export function WarningToast(props: string) {
    toast.warning(props);
}
