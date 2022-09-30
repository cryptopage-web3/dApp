import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { alertModule, authModule, addressModule } from '.';
import {
  IAttributeLevel,
  IAttributeProperty,
  IAttributeStat,
  INFTCreateParams,
  INftForm,
  ISendNFTParams,
} from '~/types/nft-form';
import { validateNftForm } from '~/utils/validateNftForm';
import { IPFSService, Web3Service } from '~/services';
import { getAdaptedAttributes } from '~/utils/getAdaptedAttributes';
import { OPEN_FORUM_ID } from '~/constants';
import { EChainSlug } from '~/types';

const ipfsService = new IPFSService();

const initValues: INftForm = {
  title: '',
  description: '',
  file: null,
  externalLink: '',
  isCommentsEnable: false,
  attributes: {
    properties: [],
    levels: [],
    stats: [],
  },
  isUnlockableContent: false,
  unlockableText: '',
  isExplicit: false,
  supply: '1',
  chain: '',
};

@Module({
  name: 'nft-form',
  namespaced: true,
  stateFactory: true,
})
export default class NftFormModule extends VuexModule {
  values: INftForm = initValues;

  loading = false;

  txHash: string | null = null;

  get isValid(): boolean {
    const { title, file } = this.values;

    return Boolean(title && file);
  }

  get hasSettings(): boolean {
    const {
      externalLink,
      isCommentsEnable,
      attributes,
      isUnlockableContent,
      isExplicit,
    } = this.values;

    return Boolean(
      externalLink ||
        isCommentsEnable ||
        isUnlockableContent ||
        isExplicit ||
        attributes.properties.length ||
        attributes.levels.length ||
        attributes.stats.length,
    );
  }

  get loadingForm(): boolean {
    return this.loading;
  }

  @Mutation
  public setTitle(title: string) {
    this.values.title = title;
  }

  @Mutation
  public setDescription(description: string) {
    this.values.description = description;
  }

  @Mutation
  public setFile(file: File | null) {
    this.values.file = file;
  }

  @Mutation
  public setExternalLink(link: string) {
    this.values.externalLink = link;
  }

  @Mutation
  public setIsCommentsEnable(isEnable: boolean) {
    this.values.isCommentsEnable = isEnable;
  }

  @Mutation
  public setIsUnlockableContent(isUnlockable: boolean) {
    this.values.isUnlockableContent = isUnlockable;
  }

  @Mutation
  public setUnlockableText(text: string) {
    this.values.unlockableText = text;
  }

  @Mutation
  public setIsExplicit(isExplicit: boolean) {
    this.values.isExplicit = isExplicit;
  }

  @Mutation
  public setProperties(properties: IAttributeProperty[]) {
    this.values.attributes.properties = properties;
  }

  @Mutation
  public setStats(stats: IAttributeStat[]) {
    this.values.attributes.stats = stats;
  }

  @Mutation
  public setLevels(levels: IAttributeLevel[]) {
    this.values.attributes.levels = levels;
  }

  @Mutation
  public setSupply(supply: string) {
    this.values.supply = supply;
  }

  @Mutation
  public setChain(chain: string) {
    this.values.chain = chain;
  }

  @Mutation
  public setValues(values: INftForm) {
    this.values = values;
  }

  @Mutation
  public setTxHash(txHash: string | null) {
    this.txHash = txHash;
  }

  @Mutation
  public setLoading(loading: boolean) {
    this.loading = loading;
  }

  @Action
  public async submit() {
    /** проверяем валидность данных */

    const validateSuccess = await this.validate();

    if (!validateSuccess) {
      return;
    }

    /** owner в NFT будет из addressModule */
    /** проверяем что addressModule той же сети, что и authModule */

    const isSameChain = authModule.chainSlug === addressModule.chainSlug;
    const isOwner =
      authModule.address.toLowerCase() === addressModule.address.toLowerCase();

    if (!isSameChain) {
      alertModule.error(`Active chain - ${authModule.chainName}<br>
          You are trying ${
            isOwner ? 'create' : 'send'
          } nft to account with chain ${addressModule.chainName}<br>
          Please connect to ${addressModule.chainName}
        `);

      return;
    }

    /** пока есть возможность создать только для goerli */

    if (authModule.chainSlug !== EChainSlug.goerli) {
      alertModule.error('Available only Goerli');
      return;
    }

    /** начало процесса создания NFT */

    this.setTxHash(null);

    this.setLoading(true);

    const { file, title, description, attributes, externalLink } = this.values;

    const nftParams: INFTCreateParams = {
      name: title,
      description,
      external_url: externalLink,
      attributes: getAdaptedAttributes(attributes),
    };

    /** загружаем файл в IPFS */

    if (!file) {
      this.setLoading(false);
      return;
    }

    try {
      const isMediaFile = /(audio|video)/.test(file.type.split('/')[0]);
      const fileHash = await ipfsService.saveFile(file);

      nftParams[isMediaFile ? 'animation_url' : 'image'] =
        fileHash && `https://ipfs.io/ipfs/${fileHash}`;

      alertModule.info('Got file hash from IPFS');
    } catch {
      alertModule.error('Failed to save file into IPFS');
      this.setLoading(false);
      return;
    }

    /** загружаем NFT в IPFS */

    let nftHash = '';

    try {
      nftHash = await ipfsService.saveNFT(nftParams);

      alertModule.info('Got NFT hash from IPFS');
    } catch {
      alertModule.error('Failed to save NFT into IPFS');
      this.setLoading(false);
      return;
    }

    /** передача NFT в контракт через web3 */

    const sendNFTParams: ISendNFTParams = {
      authChainSlug: authModule.chainSlug,
      authAddress: authModule.address,
      ownerAddress: addressModule.address,
      communityId: OPEN_FORUM_ID,
      ipfsHash: nftHash,
    };

    let txHash = '';
    const self = this;

    /** создаем web3 с провайдером авторизации */

    const web3Service = new Web3Service(authModule.provider);

    web3Service.writePost({
      params: sendNFTParams,
      callbacks: {
        onTransactionHash(hash: string) {
          txHash = hash;

          alertModule.info(`${txHash}: Transaction on pending`);
        },
        onReceipt() {
          alertModule.success('Transaction completed');

          self.setTxHash(txHash);
          self.setLoading(false);
        },
        onError() {
          alertModule.error('Transaction has some error');
          self.setLoading(false);
        },
      },
    });
  }

  @Action
  public validate(): boolean {
    const status = validateNftForm(this.values, authModule.chainSlug);

    if (!status.status) {
      alertModule.error(status.error || 'Form validation error');
      return false;
    }

    return true;
  }

  @Action
  public clear() {
    this.setTxHash(null);

    this.setValues({
      title: '',
      description: '',
      file: null,
      externalLink: '',
      isCommentsEnable: false,
      attributes: {
        properties: [],
        levels: [],
        stats: [],
      },
      isUnlockableContent: false,
      unlockableText: '',
      isExplicit: false,
      supply: '1',
      chain: authModule.chainSlug,
    });
  }
}
