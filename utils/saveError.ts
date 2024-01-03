import { ErrorService } from '~/services/ErrorService';
import { EErrorType } from '~/types';

const errorService = new ErrorService();

export const saveError = (type: EErrorType, message: string): void => {
  errorService.save({
    message,
    callStack: type,
  });
};
