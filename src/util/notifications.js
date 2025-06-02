import { store } from 'react-notifications-component';

export const showSuccessNotification = (message) => {
  store.addNotification({
    title: 'Success',
    message,
    type: 'success',
    insert: 'top',
    container: 'top-right',
    // animationIn: ['animate__animated', 'animate__fadeIn'],
    // animationOut: ['animate__animated', 'animate__fadeOut'],
    dismiss: {
      duration: 3000,
      onScreen: true
    }
  });
};

export const showErrorNotification = (message) => {
  store.addNotification({
    title: 'Error',
    message,
    type: 'danger',
    insert: 'top',
    container: 'top-right',
    // animationIn: ['animate__animated', 'animate__fadeIn'],
    // animationOut: ['animate__animated', 'animate__fadeOut'],
    dismiss: {
      duration: 4000,
      onScreen: true
    }
  });
};

export const showWarningNotification = (message) => {
  store.addNotification({
    title: 'Warning',
    message,
    type: 'warning',
    insert: 'top',
    container: 'top-right',
    // animationIn: ['animate__animated', 'animate__fadeIn'],
    // animationOut: ['animate__animated', 'animate__fadeOut'],
    dismiss: {
      duration: 3500,
      onScreen: true
    }
  });
};
