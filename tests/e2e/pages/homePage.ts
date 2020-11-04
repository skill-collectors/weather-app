const { I } = inject();

export = {
  goToHome: () => {
    I.amOnPage('/');
  },
};
