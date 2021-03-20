import { BvToastOptions } from 'bootstrap-vue';

const errorToast: BvToastOptions = {
  title: 'Oopsy-Daisy',
  variant: 'danger',
  solid: true,
  toaster: 'b-toaster-top-center',
  autoHideDelay: 10_000,
};
export default {
  // In the future we can add e.g. 'infoToast' as needed
  errorToast,
};
