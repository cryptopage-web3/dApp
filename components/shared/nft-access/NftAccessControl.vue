<template>
  <NftAccessLoading v-if="loading" />

  <div v-else-if="isEncrypted" class="profile-content__media-encrypted-wrapper">
    <div v-if="accessType === ENftTransactionAccessType.not_requested">
      <p>This post is encrypted, please check if you have access to see it</p>
      <a
        href="#"
        class="btn btn_large btn_default btn-blue"
        :class="{ 'btn-white-transparent_custom': isTransparent }"
        @click.prevent="$emit('check-access')"
      >
        Check access
      </a>
    </div>
    <div v-else-if="accessType === ENftTransactionAccessType.has_access">
      <p>This post is encrypted, but you can decrypt it</p>
      <a
        href="#"
        class="btn btn_large btn_default btn-blue"
        :class="{ 'btn-white-transparent_custom': isTransparent }"
        @click.prevent="$emit('decrypt')"
      >
        Decrypt content
      </a>
    </div>
    <div v-else-if="accessType === ENftTransactionAccessType.has_not_access">
      <div class="profile-content__media-encrypted-lock">
        <NftLockIcon />
      </div>
      <p>To see the post, you need to unblock it</p>
      <a
        href="#"
        class="btn btn_large btn_default btn-blue"
        :class="{ 'btn-white-transparent_custom': isTransparent }"
        @click.prevent="$emit('unlock')"
      >
        Unlock post for {{ accessPrice }} PAGE
        {{
          accessDuration
            ? `(${Math.round(accessDuration / (24 * 60 * 60))} days)`
            : ''
        }}
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';
import NftAccessLoading from './NftAccessLoading.vue';
import NftLockIcon from '~/components/icon/nft/NftLockIcon.vue';
import { ENftTransactionAccessType } from '~/types';

@Component({
  components: {
    NftLockIcon,
    NftAccessLoading,
  },
})
export default class NftAccessControl extends Vue {
  ENftTransactionAccessType = ENftTransactionAccessType;

  @Prop({ required: true })
  readonly loading!: boolean;

  @Prop({ required: true })
  readonly isEncrypted!: boolean;

  @Prop({ required: true })
  readonly accessType!: ENftTransactionAccessType;

  @Prop({ required: true })
  readonly accessPrice!: number;

  @Prop({ required: true })
  readonly accessDuration!: number;

  @Prop({ type: Boolean, default: false })
  readonly isTransparent!: false;
}
</script>
