export default function ({ store, redirect }) {
  if (!store.state.auth.status) {
    return
  }

  const isAuth = store.getters['auth/isAuth']

  if (!isAuth) {
    redirect('/')
  }
}
