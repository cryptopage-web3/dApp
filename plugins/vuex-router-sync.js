import { sync } from 'vuex-router-sync'

// export default ({ app: { store, router } }) => {
// sync(store, router)
// }

export default async ({ app }) => {
  app.router.afterEach((to, from) => {
    console.log('from', from)
    console.log('to', to)
    console.log('afterEach', afterEach)
    // Do something
  })
}
