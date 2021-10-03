<template>
  <div class="dropdown dropdown-profile-network">
    <div class="sidebar-profile">
      <div
        v-for="network in $provider._NETWORKS"
        :key="network"
        class="sidebar-profile__network"
        @click="changeChain(network)"
      >
        <div class="network-item">
          {{ network }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    changeChain: {
      type: Function,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar-profile__network {
  border-radius: 0;
}

.list-dropdown__network {
  border: none;
}

.sidebar-profile-network {
  position: relative;
  border-bottom: 1.6px solid #eff3f4;
}

.network-item {
  width: 100%;
  padding: 10px;
  font-weight: 500;
  padding-left: 15px;
  cursor: pointer;
}

.network-item:hover {
  background: #80808012;
}
</style>
