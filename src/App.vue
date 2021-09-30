<template>
  <div id="app" class="main">
    <div class="container">
      <div class="main-wr">
        <SidebarLeft />
        <div class="main-center">
          <router-view></router-view>
        </div>
        <SidebarRight />
      </div>
    </div>
  </div>
</template>

<script>
import SidebarLeft from '@/components/SidebarLeft.vue'
import SidebarRight from '@/components/SidebarRight.vue'
import VueStickyDirective from '@renatodeleao/vue-sticky-directive'
export default {
  name: 'App',
  components: { SidebarLeft, SidebarRight },
  directives: {
    sticky: VueStickyDirective
  },
  data() {
    return {}
  }
}
</script>
