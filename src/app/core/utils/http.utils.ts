import {HttpErrorResponse} from '@angular/common/http';

export const getMessageFromHttpError = (error: HttpErrorResponse | string): string => {
  /* Custom thrown exception via throwError('string here') */
  if (typeof error === 'string') {
    return error;
  }
  /* Api response contains detailed error message */
  if (error.error?.Error) {
    return error.error.Error;
  }
  const errorMessage: string = error.message || 'Unknown';
  return `Unexpected error has occured! Details: ${errorMessage}. Status: ${error.status}`;
}
