import Lunr from '~/utils/lunr'

export default ({ app }, inject) => {
  const lunr = Lunr
  inject('lunr', lunr)
}
