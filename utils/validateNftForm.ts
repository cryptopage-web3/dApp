import { networkHelper } from './networkHelper';
import { INftForm } from '~/types/nft-form';

interface IStatus {
  status: boolean;
  error?: string;
}

export const validateNftForm = (
  values: INftForm,
  authChainSlug: string,
): IStatus => {
  const {
    title,
    file,
    attributes,
    isUnlockableContent,
    unlockableText,
    supply,
    chain,
  } = values;

  // validate title

  if (!title) {
    return {
      status: false,
      error: 'Title: empty field',
    };
  }

  // validate file

  if (!file) {
    return {
      status: false,
      error: 'File: empty field',
    };
  }

  // validate properties

  if (attributes.properties?.length) {
    const hasEmptyField = attributes.properties.some(
      ({ type, value }) => !type || !value,
    );

    if (hasEmptyField) {
      return {
        status: false,
        error: 'Properties: has empty fields',
      };
    }
  }

  // validate levels

  if (attributes.levels?.length) {
    let levelError = '';

    attributes.levels.forEach(({ type, value, maxValue }) => {
      if (levelError) {
        return;
      }

      if (!type || !value || !maxValue) {
        levelError = 'Levels: has empty fields';
        return;
      }

      if (!isFinite(+value) || !isFinite(+maxValue)) {
        levelError = 'Levels: value is not a number';
        return;
      }

      if (+maxValue < +value) {
        levelError = 'Levels: value is greater than maximum';
      }
    });

    if (levelError) {
      return {
        status: false,
        error: levelError,
      };
    }
  }

  // validate stats

  if (attributes.stats?.length) {
    let statsError = '';

    attributes.stats.forEach(({ type, value, maxValue }) => {
      if (statsError) {
        return;
      }

      if (!type || !value || !maxValue) {
        statsError = 'Stats: has empty fields';
        return;
      }

      if (!isFinite(+value) || !isFinite(+maxValue)) {
        statsError = 'Stats: value is not a number';
        return;
      }

      if (+maxValue < +value) {
        statsError = 'Stats: value is greater than maximum';
      }
    });

    if (statsError) {
      return {
        status: false,
        error: statsError,
      };
    }
  }

  // validate unlockable content

  if (isUnlockableContent && !unlockableText) {
    return {
      status: false,
      error: 'Unlockable content: text content is empty',
    };
  }

  // validate supply

  if (!supply) {
    return {
      status: false,
      error: 'Supply: empty field',
    };
  }

  if (!isFinite(+supply)) {
    return {
      status: false,
      error: 'Supply: value is not a number',
    };
  }

  if (+supply < 1) {
    return {
      status: false,
      error: 'Supply: value should be at least 1',
    };
  }

  // validate chain

  if (chain !== authChainSlug) {
    const authChainName = networkHelper.getNetworkName(
      networkHelper.getChainId(authChainSlug),
    );
    const chainName = networkHelper.getNetworkName(
      networkHelper.getChainId(chain),
    );

    return {
      status: false,
      error: `Blockchain: you connected to ${authChainName}, so you can't create NFT with chain ${chainName}`,
    };
  }

  return {
    status: true,
  };
};
