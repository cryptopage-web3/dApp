import Vue from 'vue'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faCaretDown,
  faCaretUp,
  faTag,
  faChevronDown,
  faChevronUp,
  faChartArea,
  faStar,
  faCalendar,
  faBolt,
  faPlusCircle,
  faTimes,
  faCog,
  faComments,
  faCopy,
  faExclamationCircle
} from '@fortawesome/free-solid-svg-icons'

config.autoAddCss = false

library.add(faCaretDown)
library.add(faCaretUp)
library.add(faTag)
library.add(faChevronDown)
library.add(faChevronUp)
library.add(faChartArea)
library.add(faStar)
library.add(faCalendar)
library.add(faBolt)
library.add(faPlusCircle)
library.add(faTimes)
library.add(faCog)
library.add(faComments)
library.add(faCopy)
library.add(faExclamationCircle)

Vue.component('FontAwesomeIcon', FontAwesomeIcon)
