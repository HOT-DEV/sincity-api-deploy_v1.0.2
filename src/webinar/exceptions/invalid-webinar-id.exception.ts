import { WebinarServiceException } from './webinar.exceptions';

/** Used when the user inputs an invalid token
 * when refreshing
 */
export class InvalidWebinarIdException extends WebinarServiceException {
  /** Throws exception with message 'Invalid refresh token'.
   *
   * Used when the user inputs an invalid token
   * when refreshing
   */
  constructor() {
    super('Not found Webinar, invalid ID!');
  }
}