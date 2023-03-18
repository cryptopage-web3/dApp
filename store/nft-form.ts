import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { alertModule, authModule, addressModule } from '.';
import {
  ENftFormUnlockableContentAccessDurationType,
  ENftFormUnlockableContentAccessType,
  IAttributeLevel,
  IAttributeProperty,
  IAttributeStat,
  INFTCreateParams,
  INftForm,
  ISendNFTParams,
} from '~/types/nft-form';
import { validateNftForm } from '~/utils/validateNftForm';
import { IPFSService, MetadataService, Web3Service } from '~/services';
import { getAdaptedAttributes } from '~/utils/getAdaptedAttributes';
import { OPEN_FORUM_ID } from '~/constants';
import { EChainSlug } from '~/types';
import { getSecDuration } from '~/utils/durationType';

type TNftForm = INftForm;

type TSuccessModal = {
  status: boolean;
  data?: TNftForm;
};

const ipfsService = new IPFSService();
const metadataService = new MetadataService();

const genUnlockableContentDisabledState = () => ({
  isUnlockableContent: false,
  unlockableContentAccessType: null,
  unlockableContentPrice: null,
  unlockableContentAccessDuration: null,
  unlockableContentAccessDurationType: null,
  unlockableContentDescription: '',
});

const genUnlockableContentEnabledDefaultState = () => ({
  isUnlockableContent: true,
  unlockableContentAccessType: ENftFormUnlockableContentAccessType.oneTime,
  unlockableContentPrice: 10,
  unlockableContentAccessDuration: 0,
  unlockableContentAccessDurationType:
    ENftFormUnlockableContentAccessDurationType.days,
  unlockableContentDescription: '',
});

const genInitValues = (): TNftForm => ({
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
  ...genUnlockableContentDisabledState(),
  isExplicit: false,
  supply: '1',
  chain: '',
});

const initValues: TNftForm = genInitValues();

@Module({
  name: 'nft-form',
  namespaced: true,
  stateFactory: true,
})
export default class NftFormModule extends VuexModule {
  values: TNftForm = initValues;

  loading = false;

  txHash: string | null = null;

  showModal = false;

  showDescription = false;

  forceOwner = false;

  showSuccessModal: TSuccessModal = {
    status: false,
  };

  get isValid(): boolean {
    const { title, file } = this.values;

    return Boolean(title || file);
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

    if (description) {
      this.showDescription = true;
    }
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
  public setShowModal(show: boolean) {
    this.showModal = show;
  }

  @Mutation
  public setShowSuccessModal(status: TSuccessModal) {
    this.showSuccessModal = status;
  }

  @Mutation
  public setForceOwner(force: boolean) {
    this.forceOwner = force;
  }

  @Mutation
  public setShowDescription(show: boolean) {
    this.showDescription = show;
  }

  @Mutation
  public setIsUnlockableContent(isUnlockable: boolean) {
    if (isUnlockable) {
      Object.assign(this.values, genUnlockableContentEnabledDefaultState());
    } else {
      Object.assign(this.values, genUnlockableContentDisabledState());
    }
  }

  @Mutation
  public setUnlockableContentAccessType(
    type: ENftFormUnlockableContentAccessType,
  ) {
    this.values.unlockableContentAccessType = type;
    /** сбрасываем тип периода */
    this.values.unlockableContentAccessDurationType =
      ENftFormUnlockableContentAccessDurationType.days;

    if (type === ENftFormUnlockableContentAccessType.oneTime) {
      this.values.unlockableContentAccessDuration = 0;
    } else if (type === ENftFormUnlockableContentAccessType.customDuration) {
      this.values.unlockableContentAccessDuration = 1; // 1 day
    }
  }

  @Mutation
  public setUnlockableContentPrice(newPrice: number) {
    this.values.unlockableContentPrice = newPrice;
  }

  @Mutation setUnlockableContentAccessDuration(duration: number) {
    this.values.unlockableContentAccessDuration = duration;
  }

  @Mutation setUnlockableContentAccessDurationType(
    type: ENftFormUnlockableContentAccessDurationType,
  ) {
    this.values.unlockableContentAccessDurationType = type;
  }

  @Mutation setUnlockableContentDescription(description: string) {
    this.values.unlockableContentDescription = description;
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
  public setValues(values: TNftForm) {
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

    const validateSuccess = await this.validateValues();

    if (!validateSuccess) {
      return;
    }

    /** проверяем валидность подключения */

    const connectSuccess = await this.validateConnect();

    if (!connectSuccess) {
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

    const {
      file,
      title,
      description,
      attributes,
      externalLink,
      isUnlockableContent,
      unlockableContentPrice,
      unlockableContentAccessDuration,
      unlockableContentAccessDurationType,
    } = this.values;

    const nftParams: INFTCreateParams = {
      name: title,
      description,
      external_url: externalLink,
      attributes: getAdaptedAttributes(attributes),
    };

    /** загружаем файл в IPFS */

    if (file) {
      try {
        const isMediaFile = /(audio|video)/.test(file.type.split('/')[0]);
        const fileHash = await metadataService.uploadFileToIPFS(
          file,
          isUnlockableContent,
        );

        nftParams[isMediaFile ? 'animation_url' : 'image'] =
          fileHash && `https://ipfs.io/ipfs/${fileHash}`;

        alertModule.info('Got file hash from IPFS');
      } catch {
        alertModule.error('Failed to save file into IPFS');
        this.setLoading(false);
        return;
      }
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

    const ownerAddress = this.forceOwner
      ? authModule.address
      : addressModule.address;

    const sendNFTParams: ISendNFTParams = {
      authChainSlug: authModule.chainSlug,
      authAddress: authModule.address,
      ownerAddress,
      communityId: OPEN_FORUM_ID,
      ipfsHash: nftHash,
      isEncrypted: isUnlockableContent,
      accessPrice: (unlockableContentPrice || 0) * 10 ** 18,
      accessDuration: getSecDuration(
        unlockableContentAccessDuration,
        unlockableContentAccessDurationType,
      ),
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

          self.setShowSuccessModal({
            status: true,
            data: self.values,
          });
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
  public validateConnect(): boolean {
    /** проверяем наличие авторизации */

    if (!authModule.isAuth) {
      alertModule.error('Need to connect a wallet to create NFTs');
      return false;
    }

    /** owner в NFT будет из addressModule */
    /** проверяем что addressModule той же сети, что и authModule */

    const isSameChain =
      this.forceOwner || authModule.chainSlug === addressModule.chainSlug;
    const isOwner =
      this.forceOwner ||
      authModule.address.toLowerCase() === addressModule.address.toLowerCase();

    if (!isSameChain) {
      alertModule.error(`Active chain - ${authModule.chainName}<br>
          You are trying ${
            isOwner ? 'create' : 'send'
          } nft to account with chain ${addressModule.chainName}<br>
          Please connect to ${addressModule.chainName}
        `);

      return false;
    }

    return true;
  }

  @Action
  public validateValues(): boolean {
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
    this.setShowDescription(false);

    this.setValues({
      ...genInitValues(),
      chain: authModule.chainSlug,
    });
  }
}
