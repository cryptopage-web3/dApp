<template>
  <div class="modal-creat-collapse mb_20">
    <a
      ref="collapse"
      href="#"
      class="modal-creat-checkbox modal-creat-collapse-link"
    >
      <div class="modal-creat-checkbox__left">
        <div class="modal-creat-checkbox__icon">
          <img src="@/assets/img/modal-creat-checkbox_icon4.svg" alt="" />
        </div>
        <div class="modal-creat-checkbox__cont">
          <div class="modal-creat-checkbox__title">Properties</div>
          <div class="modal-creat-checkbox__text">
            Textual traits that show up as rectangles
          </div>
        </div>
      </div>
      <div class="modal-creat-collapse-link__arrow">
        <img
          src="@/assets/img/modal-creat-collapse-link_arrow_img.svg"
          alt=""
        />
      </div>
    </a>
    <div class="modal-creat-collapse-body">
      <div class="modal-creat__title2 mb_10">Add properties</div>
      <div class="modal-creat-add">
        <a
          href="#"
          class="modal-creat-add__close"
          :class="{ disabled: !isFilled, active: isFilled }"
          @click.prevent="reset"
        >
          <ModalResetIcon />
        </a>
        <div class="modal-creat-add-wrap modal-creat-add-wrap1">
          <input
            v-model="type"
            type="text"
            placeholder="Type"
            name="type"
            class="global-input modal-creat-add-input-js mr_5 mr_md_10"
          />
          <input
            v-model="value"
            type="text"
            placeholder="Name"
            name="name"
            class="global-input modal-creat-add-input-js mr_5 mr_md_10"
          />
          <a
            href="#"
            class="modal-creat-add__btn1 btn btn_default"
            :class="{ disabled: !isFilled, 'btn-blue_button': isFilled }"
            @click.prevent="add"
          >
            Apply
          </a>
        </div>
        <div class="modal-creat-add-cont">
          <div
            v-for="property in properties"
            :key="property.id"
            class="modal-creat-item1"
          >
            <span>{{ property.type }}: {{ property.value }}</span>
            <a href="#" @click.prevent="remove(property.id)">
              <img src="@/assets/img/modal-creat-item1_img.svg" alt="" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import { nftFormModule } from '~/store';
import { collapseInit } from '~/utils/nftFormCollapse';
import ModalResetIcon from '~/components/icon/nft-form/modal/ModalResetIcon.vue';
import { IAttributeProperty } from '~/types/nft-form';

@Component({
  components: {
    ModalResetIcon,
  },
})
export default class ModalExplicit extends Vue {
  type = '';
  value = '';

  get isExplicit(): boolean {
    return nftFormModule.values.isExplicit;
  }

  get isFilled(): boolean {
    return Boolean(this.type && this.value);
  }

  get properties(): IAttributeProperty[] {
    return nftFormModule.values.attributes.properties;
  }

  $refs!: {
    collapse: HTMLAnchorElement;
  };

  updateIsExplicit(e: InputEvent) {
    nftFormModule.setIsExplicit(
      (e.target as HTMLInputElement)?.checked || false,
    );
  }

  mounted() {
    collapseInit(this.$refs.collapse);
  }

  add() {
    nftFormModule.setProperties([
      ...this.properties,
      {
        id: Date.now(),
        type: this.type,
        value: this.value,
      },
    ]);

    this.reset();
  }

  remove(id: number) {
    nftFormModule.setProperties([
      ...this.properties.filter((property) => property.id !== id),
    ]);
  }

  reset() {
    this.type = '';
    this.value = '';
  }
}
</script>
