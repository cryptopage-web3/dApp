<template>
  <div
    ref="modal"
    class="modal fade modal-celar-history"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-body">
          <div class="modal-top mb_20">
            <div class="modal-creat__title">Delete post</div>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <CommentCloseIcon />
            </button>
          </div>
          <div class="modal-celar-history__text">Are you sure?</div>
          <div class="modal-celar-history-btns mt_20">
            <a
              href="#"
              role="button"
              data-dismiss="modal"
              class="btn btn-blue-transparent_button btn_large w_110 mr_20"
            >
              No
            </a>
            <a
              href="#"
              role="button"
              data-dismiss="modal"
              class="btn btn-blue_button btn_large w_110"
            >
              Yes
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';
import { INft } from '~/types';
import CommentCloseIcon from '~/components/icon/nft/CommentCloseIcon.vue';

type TNft = INft;

@Component({
  components: {
    CommentCloseIcon,
  },
})
export default class NftDeleteConfirm extends Vue {
  @Prop({ required: true })
  readonly nft!: TNft;

  $refs!: {
    modal: HTMLDivElement;
  };

  show() {
    ($(this.$refs.modal) as any).modal('show');
  }
}
</script>
