import {
  EChainSlug,
  EProvider,
  IConnectChangeParams,
  IConnectData,
  IConnectToProviderResponse,
} from '~/types';
import { networkHelper } from '~/utils/networkHelper';

declare const window: Window &
  typeof globalThis & {
    ethereum: any;
    BinanceChain: any;
    okexchain: any;
    tronLink: any;
    solana: any;
  };

export class AuthService {
  private provider: any = null;

  protected get metamaskInstalled(): boolean {
    return (
      typeof window !== 'undefined' &&
      typeof window?.ethereum?.on === 'function'
    );
  }

  protected get bscInstalled(): boolean {
    return (
      typeof window !== 'undefined' &&
      typeof window?.BinanceChain?.on === 'function'
    );
  }

  protected get okexInstalled(): boolean {
    return (
      typeof window !== 'undefined' &&
      typeof window?.okexchain?.on === 'function'
    );
  }

  protected get tronInstalled(): boolean {
    return (
      typeof window !== 'undefined' && typeof window?.tronLink === 'object'
    );
  }

  protected get solanaInstalled(): boolean {
    return typeof window !== 'undefined' && typeof window?.solana === 'object';
  }

  /*
   * Проверяем поддерживаемость сети
   * У провайдеров пользователь мог поменять сеть на ту, которую мы не поддерживаем
   * В результате подписки на смену сети, мы можем установить неизвестную для нас сеть в качестве активной
   * Для исключения этого в Connect проверяется isUnknownChain. В случае true делаем logout
   */
  public isSupportedByProvider(
    chainId: string | number,
    provider: EProvider,
  ): boolean {
    return networkHelper.isSupportedByProvider(chainId, provider);
  }

  public connectToProvider = async (
    provider: EProvider,
    onConnectChange: (params: IConnectChangeParams) => void,
  ): Promise<IConnectToProviderResponse> => {
    /** подключение к metamask */

    if (provider === EProvider.metamask) {
      return await this.connectToMetamask(onConnectChange);
    }

    // /** подключение к walletConnect */

    // if (provider === EProvider.walletConnect) {
    //   return await this.connectToWalletConnect();
    // }

    // /** подключение к bsc_wallet */

    // if (provider === EProvider.bscWallet) {
    //   return await this.connectToBscWallet();
    // }

    // /** подключение к okex */

    // if (provider === EProvider.okex) {
    //   return await this.connectToOkex();
    // }

    // /** подключение к tron_link */

    // if (provider === EProvider.tron) {
    //   return await this.connectToTronLink();
    // }

    // /** подключение к phantom */

    // if (provider === EProvider.phantom) {
    //   return await this.connectToPhantom();
    // }

    /** остальное не поддерживаем */

    return {
      status: 'error',
      message: {
        title: 'This provider is not available',
        text: 'Please try another provider',
      },
    };
  };

  /**
   * ======== METAMASK ========
   *
   * подключение к metamask
   */
  public connectToMetamask = async (
    onConnectChange: (params: IConnectChangeParams) => void,
  ): Promise<IConnectToProviderResponse> => {
    if (!this.metamaskInstalled) {
      return {
        status: 'error',
        message: {
          title: 'Not found MetaMask extension',
          text: 'Please install MetaMask Ext.,<br>reload page and try again',
        },
      };
    }

    try {
      await window.ethereum.send('eth_requestAccounts');

      const onChange = () => {
        onConnectChange({
          chainId: Number(window.ethereum.chainId),
          address: window.ethereum.selectedAddress,
        });
      };

      window.ethereum.on('chainChanged', onChange);
      window.ethereum.on('accountsChanged', onChange);

      this.provider = window.ethereum;

      return {
        status: 'success',
        connectData: {
          chainId: Number(window.ethereum.chainId),
          address: window.ethereum.selectedAddress,
          providerSlug: EProvider.metamask,
        },
      };
    } catch {
      return {
        status: 'error',
        message: {
          title: 'Not connected to MetaMask',
          text: 'Please choose supported chain in the MetaMask Ext.<br>and accept connect',
        },
      };
    }
  };
  /**
   * ========================
   */

  public connectToChain = async (
    connectData: IConnectData,
    chain: EChainSlug,
  ): Promise<IConnectToProviderResponse> => {
    /** проверяем поддерживаем ли данную сеть */

    const chainData = networkHelper.getChainData(chain);

    if (!chainData) {
      return {
        status: 'error',
        message: {
          title: 'Network is not allowed',
          text: 'Please try another network',
        },
      };
    }

    /** проверяем наличие активного провайдера
     * т.к. подключение к провайдеру должно быть раньше, чем к сети
     */

    if (!this.provider) {
      return {
        status: 'error',
        message: {
          title: 'Provider is not connected',
          text: 'Please reload page and try again',
        },
      };
    }

    /** WALLET_CONNECT сам устанавливает выбранную сеть */

    if (connectData.providerSlug === EProvider.walletConnect) {
      return {
        status: 'success',
        connectData,
      };
    }

    /** TRON поддерживается только провайдером TRON_LINK */

    if (chain === EChainSlug.tron) {
      if (connectData.providerSlug === EProvider.tron) {
        return {
          status: 'success',
          connectData,
        };
      }

      return {
        status: 'error',
        message: {
          title: 'Wrong provider for Tron',
          text: 'Please install and connect TronLink Ext.',
        },
      };
    }

    /** SOLANA поддерживается только провайдером PHANTOM */

    if (chain === EChainSlug.solana) {
      if (connectData.providerSlug === EProvider.phantom) {
        return {
          status: 'success',
          connectData,
        };
      }

      return {
        status: 'error',
        message: {
          title: 'Wrong provider for Solana',
          text: 'Please install and connect Phantom Ext.',
        },
      };
    }

    /** Провайдер BSC_WALLET поддерживает только сеть BSC */

    if (connectData.providerSlug === EProvider.bscWallet) {
      if (chain !== EChainSlug.bsc) {
        return {
          status: 'error',
          message: {
            title: `Wrong provider for ${chainData.chainName}`,
            text: 'Please connect to another provider',
          },
        };
      }

      try {
        /** в провайдере BSC_WALLET пытаемся переключить сеть на BSC
         * т.к. в расширении можно выбрать другие сети
         */
        await this.provider.switchNetwork('bsc-mainnet');

        return {
          status: 'success',
          connectData: {
            ...connectData,
            chainId: Number(chainData.chainId),
          },
        };
      } catch {
        return {
          status: 'error',
          message: {
            title: `Not connected to ${chainData.chainName}`,
            text: 'Please accept connect in the Binance Wallet Ext.',
          },
        };
      }
    }

    /** METAMASK и OKEX - api полностью совпадают
     * пробуем выставить выбранную сеть в расширении, какой бы она не была  */

    if (
      connectData.providerSlug === EProvider.metamask ||
      connectData.providerSlug === EProvider.okex
    ) {
      const providerTitle =
        connectData.providerSlug === EProvider.okex
          ? 'MetaX Ext.'
          : 'MetaMask Ext.';

      try {
        /** пробуем переключиться на сеть */

        await this.provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: chainData.chainId }],
        });

        return {
          status: 'success',
          connectData: {
            ...connectData,
            chainId: Number(chainData.chainId),
          },
        };
      } catch (switchError: any) {
        const CHAIN_NOT_FOUND_CODE = 4902;

        /** если это не ошибка отсутствия сети, то возвращаем ошибку */

        if (switchError.code !== CHAIN_NOT_FOUND_CODE) {
          return {
            status: 'error',
            message: {
              title: `Not connected to ${chainData.chainName}`,
              text: `Please accept connect in the ${providerTitle}`,
            },
          };
        }

        /** пробуем добавить сеть */

        try {
          await this.provider.request({
            method: 'wallet_addEthereumChain',
            params: [chainData],
          });

          return {
            status: 'success',
            connectData: {
              ...connectData,
              chainId: Number(chainData.chainId),
            },
          };
        } catch {
          return {
            status: 'error',
            message: {
              title: `Not connected to ${chainData.chainName}`,
              text: `Please accept connect in the ${providerTitle}`,
            },
          };
        }
      }
    }

    /** в остальных случаях показываем ошибку */

    return {
      status: 'error',
      message: {
        title: `Not connected to ${chainData.chainName}`,
        text: 'Please try with another network or provider',
      },
    };
  };

  public logout = async () => {
    if (!this.provider) {
      return;
    }

    this.provider.disconnect && (await this.provider.disconnect());
    this.provider.close && (await this.provider.close());

    this.provider = null;
  };
}
