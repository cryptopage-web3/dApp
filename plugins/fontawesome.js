import Vue from 'vue'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'

config.autoAddCss = false

library.add(faCaretDown)
library.add(faCaretUp)

Vue.component('FontAwesomeIcon', FontAwesomeIcon)
