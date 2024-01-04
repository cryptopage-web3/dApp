import { ErrorService } from '~/services/ErrorService';
import { EErrorType } from '~/types';

const errorService = new ErrorService();

export const saveError = async (type: EErrorType, message: string) => {
  try {
    await errorService.save({
      message,
      callStack: type,
    });
  } catch {
    // no action
  }
};
