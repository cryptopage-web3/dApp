<template>
  <div
    class="form-creat"
    :class="{
      'form-creat_dragging': isDragging,
      'input--filled': isOpen,
    }"
    @drop.prevent="handleDropFiles"
    @dragenter.prevent="handleDragEnter"
    @dragleave.prevent="handleDragLeave"
    @dragover.prevent
  >
    <div
      v-if="isDisabled"
      class="form-creat__block"
      @click.prevent="showDisableNotify"
    />

    <NftFormTitle :is-owner="isOwner" @focus="openForm" />
    <NftFormDescription />
    <NftFormUpload ref="refUpload" />
    <NftFormUnlockable v-show="isOpen && isUnlockable" />

    <div class="form-creat-bottom">
      <div class="form-creat-nav">
        <a
          href="#"
          class="form-creat-nav-item stroke"
          @click.prevent="uploadFile('audio')"
        >
          <NftFormAudioIcon />
        </a>
        <a
          href="#"
          class="form-creat-nav-item all"
          @click.prevent="uploadFile('image')"
        >
          <NftFormImageIcon />
        </a>
        <a
          href="#"
          class="form-creat-nav-item all"
          @click.prevent="uploadFile('video')"
        >
          <NftFormVideoIcon />
        </a>
        <a
          href="#"
          class="form-creat-nav-item form-creat-nav-item_moneta fill"
          :class="{ 'form-creat-nav-item_filled': isUnlockable }"
          @click.prevent="toggleIsUnlockable"
        >
          <NftFormMonetaIcon />
        </a>
        <a
          ref="settingBtn"
          href="#"
          role="button"
          class="form-creat-nav-item form-creat-nav-item-js fill"
          :class="{ 'form-creat-nav-item_filled': hasSettings }"
          @click.prevent="showModal"
        >
          <NftFormSettingIcon />
        </a>
      </div>
      <div class="form-creat-btns">
        <a
          href="#"
          class="btn btn-blue-transparent_button form-creat__cancel btn_large form-creat-cancel-js w_xl_100 w_sm_80 w_80 mr_5 mr_md_15"
          @click.prevent="closeForm"
        >
          Cancel
        </a>
        <div ref="sendBtn" class="d-inline-block">
          <a
            href="#"
            class="btn btn_large btn_default form-creat__plus w_xl_100 w_sm_80 w_80"
            :class="{ 'btn-blue': isValid, disabled: !isValid }"
            @click.prevent="createNft"
          >
            {{ isOwner ? 'Create' : 'Send' }}
          </a>
        </div>

        <div v-if="loadingForm" class="form-creat-btns__loading">
          <div class="spinner-border text-primary" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    </div>

    <!-- ???????????????? ?????? D&D -->
    <label class="form-creat-file__label">
      <div class="form-creat-file__cont">
        <img
          src="@/assets/img/form-creat-file_img.svg"
          alt=""
          class="form-creat-file__icon"
        />
        <div class="form-creat-file__text">Drag &amp; drop files here</div>
      </div>
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch } from 'nuxt-property-decorator';
import NftFormTitle from './NftFormTitle.vue';
import NftFormDescription from './NftFormDescription.vue';
import NftFormUpload from './NftFormUpload.vue';
import NftFormUnlockable from './NftFormUnlockable.vue';
import { addressModule, authModule, nftFormModule } from '~/store';
import NftFormAudioIcon from '~/components/icon/nft-form/NftFormAudioIcon.vue';
import NftFormImageIcon from '~/components/icon/nft-form/NftFormImageIcon.vue';
import NftFormVideoIcon from '~/components/icon/nft-form/NftFormVideoIcon.vue';
import NftFormSettingIcon from '~/components/icon/nft-form/NftFormSettingIcon.vue';
import NftFormMonetaIcon from '~/components/icon/nft-form/NftFormMonetaIcon.vue';

@Component({
  components: {
    NftFormAudioIcon,
    NftFormImageIcon,
    NftFormVideoIcon,
    NftFormSettingIcon,
    NftFormMonetaIcon,
    NftFormTitle,
    NftFormDescription,
    NftFormUpload,
    NftFormUnlockable,
  },
})
export default class NftForm extends Vue {
  isDragging = false;
  isOpen = false;
  dragCounter = 0;

  $refs!: {
    refUpload: NftFormUpload;
    sendBtn: HTMLDivElement;
    settingBtn: HTMLAnchorElement;
  };

  get isAuth(): boolean {
    return authModule.isAuth;
  }

  get isOwner(): boolean {
    return (
      authModule.address.toLowerCase() ===
        addressModule.address.toLowerCase() &&
      authModule.chainSlug === addressModule.chainSlug
    );
  }

  get isSameChain(): boolean {
    return authModule.chainSlug === addressModule.chainSlug;
  }

  get authChainName(): string {
    return authModule.chainName;
  }

  get addressChainName(): string {
    return addressModule.chainName;
  }

  get isDisabled(): boolean {
    return !this.isAuth || !this.isSameChain;
  }

  get isValid(): boolean {
    return nftFormModule.isValid;
  }

  get hasSettings(): boolean {
    return nftFormModule.hasSettings;
  }

  get loadingForm(): boolean {
    return nftFormModule.loadingForm;
  }

  get txHash(): string | null {
    return nftFormModule.txHash;
  }

  get isUnlockable(): boolean {
    return nftFormModule.values.isUnlockableContent;
  }

  toggleIsUnlockable() {
    this.openForm();
    nftFormModule.setIsUnlockableContent(!this.isUnlockable);
  }

  @Watch('isValid', { immediate: true })
  onIsValidChanged(isValid: boolean) {
    if (process.client) {
      ($(this.$refs.sendBtn) as any).tooltip(isValid ? 'disable' : 'enable');
    }
  }

  @Watch('hasSettings', { immediate: true })
  onHasSettingsChanged(hasSettings: boolean) {
    if (process.client) {
      ($(this.$refs.settingBtn) as any).tooltip(
        !hasSettings ? 'disable' : 'enable',
      );
    }
  }

  @Watch('txHash')
  onTxHashChanged(txHash: string | null) {
    if (!txHash) {
      return;
    }

    setTimeout(() => {
      this.closeForm();
      nftFormModule.clear();
      addressModule.syncAddressTransactions(txHash);
    }, 10);
  }

  mounted() {
    ($(this.$refs.sendBtn) as any).tooltip({
      trigger: 'hover',
      title: 'Name and file are required',
    });

    ($(this.$refs.settingBtn) as any).tooltip({
      trigger: 'hover',
      title: 'Has settings',
    });
    ($(this.$refs.settingBtn) as any).tooltip(
      !this.hasSettings ? 'disable' : 'enable',
    );
  }

  showDisableNotify() {
    /** ?????????????????? ??????????????????, ?????????? ???????????????? ???????????? */
    nftFormModule.validateConnect();
  }

  uploadFile(type: string) {
    this.openForm();
    this.$refs.refUpload.upload(type);
  }

  handleDropFiles(event: DragEvent) {
    if (this.isDisabled) {
      return;
    }

    const file = event.dataTransfer?.files?.[0] || null;
    this.$refs.refUpload.save(file);

    this.isDragging = false;
    this.dragCounter = 0;
  }

  handleDragEnter() {
    if (this.isDisabled) {
      return;
    }

    this.isDragging = true;
    this.dragCounter++;
  }

  handleDragLeave() {
    this.dragCounter--;

    if (this.dragCounter < 0) {
      this.dragCounter = 0;
    }

    if (this.dragCounter === 0) {
      this.isDragging = false;
    }
  }

  openForm() {
    this.isOpen = true;
  }

  closeForm() {
    this.isOpen = false;
    nftFormModule.clear();
  }

  createNft() {
    nftFormModule.submit();
  }

  showModal() {
    this.openForm();
    nftFormModule.setShowModal(true);
  }
}
</script>
