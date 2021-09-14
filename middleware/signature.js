import { recoverPersonalSignature } from 'eth-sig-util'
import { SIGNATURE_PHRASE } from '@/constants'

/* Проверяет совпадает ли selectedAddress с восстановленным по сигнатуре recoveredAddress */
export default function ({ store, redirect }) {
  if (!process.browser) {
    return
  }

  const selectedAddress = store.getters['auth/selectedAddress']
  const signature = store.getters['auth/signature']

  if (!selectedAddress) {
    return
  }

  try {
    const recoveredAddress = recoverPersonalSignature({
      data: SIGNATURE_PHRASE,
      sig: signature
    })

    if (recoveredAddress.toLowerCase() !== selectedAddress.toLowerCase()) {
      this.$store.dispatch('auth/signout')
      redirect('/')
    }
  } catch (error) {
    this.$store.dispatch('auth/signout')
    redirect('/')
  }
}
