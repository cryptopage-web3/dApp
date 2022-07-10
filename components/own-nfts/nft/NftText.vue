<template>
  <div class="market-product-middle">
    <table class="market-product__table">
      <tbody>
        <tr>
          <td>
            <a href="#" class="market-product__title">
              {{ collectionName }}
            </a>
          </td>
          <td class="market-product__price">Price</td>
        </tr>
        <tr>
          <td>
            <a href="#" class="market-product__name">
              {{ title }}
            </a>
          </td>
          <td>
            <div class="market-product__count">
              $
              <span>{{ usdPrice | formatNumberFloatDigits }}</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';
import { INft } from '~/types';

type TNft = INft;

@Component({})
export default class NftText extends Vue {
  @Prop({ required: true })
  readonly nft!: TNft;

  get title(): string {
    return this.nft.name;
  }

  get usdPrice(): number {
    return this.nft.usdPrice;
  }

  get collectionName(): string {
    return this.nft.collectionName;
  }
}
</script>
