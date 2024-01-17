import { ErrorService } from '~/services/ErrorService';
import { EErrorType } from '~/types';

const errorService = new ErrorService();

export const saveError = async (
  type: EErrorType,
  message: string,
  params: Record<string, any> = {},
) => {
  try {
    await errorService.save({
      message: JSON.stringify({
        errorText: message,
        url: location.href,
        ...params,
      }),
      callStack: type,
    });
  } catch {
    // no action
  }
};
