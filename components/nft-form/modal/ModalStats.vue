<template>
  <div class="modal-creat-collapse mb_20">
    <a
      ref="collapse"
      href="#"
      class="modal-creat-checkbox modal-creat-collapse-link"
    >
      <div class="modal-creat-checkbox__left">
        <div class="modal-creat-checkbox__icon">
          <img src="@/assets/img/modal-creat-checkbox_icon5.svg" alt="" />
        </div>
        <div class="modal-creat-checkbox__cont">
          <div class="modal-creat-checkbox__title">Stats</div>
          <div class="modal-creat-checkbox__text">
            Numerical traits that just show as numbers
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
      <div class="modal-creat__title2 mb_10">Add Stats</div>
      <div class="modal-creat-add">
        <a
          href="#"
          class="modal-creat-add__close"
          :class="{ disabled: !isFilled, active: isFilled }"
          @click.prevent="reset"
        >
          <ModalResetIcon />
        </a>
        <div class="modal-creat-add-wrap modal-creat-add-wrap2">
          <input
            v-model="type"
            type="text"
            placeholder="Name"
            name="name"
            class="global-input modal-creat-add-input-js mr_5 mr_md_10 h_40"
          />
          <input
            v-model="value"
            type="text"
            placeholder="3"
            name="from"
            class="global-input modal-creat-add-input-js mr_5 mr_md_10 h_40"
          />
          <span class="d-inline-block mr_5 mr_md_10 h_40">of</span>
          <input
            v-model="maxValue"
            type="text"
            placeholder="5"
            name="to"
            class="global-input modal-creat-add-input-js mr_5 mr_md_10 h_40"
          />
          <a
            href="#"
            class="modal-creat-add__btn2 btn btn_default btn_large"
            :class="{ disabled: !isFilled, 'btn-blue_button': isFilled }"
            @click.prevent="add"
          >
            Apply
          </a>
        </div>
        <div class="modal-creat-add-cont">
          <div v-for="stat in stats" :key="stat.id" class="modal-creat-item1">
            <span>
              {{ stat.type }}: {{ stat.value }} of
              {{ stat.maxValue }}
            </span>
            <a href="#" @click.prevent="remove(stat.id)">
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
import { IAttributeStat } from '~/types/nft-form';

@Component({
  components: {
    ModalResetIcon,
  },
})
export default class ModalStats extends Vue {
  type = '';
  value = '';
  maxValue = '';

  get isFilled(): boolean {
    return Boolean(this.type && this.value && this.maxValue);
  }

  get stats(): IAttributeStat[] {
    return nftFormModule.values.attributes.stats;
  }

  $refs!: {
    collapse: HTMLAnchorElement;
  };

  mounted() {
    collapseInit(this.$refs.collapse);
  }

  add() {
    nftFormModule.setStats([
      ...this.stats,
      {
        id: Date.now(),
        type: this.type,
        value: this.value,
        maxValue: this.maxValue,
      },
    ]);

    this.reset();
  }

  remove(id: number) {
    nftFormModule.setStats([...this.stats.filter((stat) => stat.id !== id)]);
  }

  reset() {
    this.type = '';
    this.value = '';
    this.maxValue = '';
  }
}
</script>
