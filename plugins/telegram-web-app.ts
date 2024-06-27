if (process.browser) {
  // @ts-expect-error need nuxt types
  window.onNuxtReady((app) => {
    // console.log('Nuxt ready!');
    // @ts-expect-error need tg types
    window.Telegram.WebApp.expand();
  });
}
