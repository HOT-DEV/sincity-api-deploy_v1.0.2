import { NotFoundException } from '@nestjs/common';

/**
 * Used to extend another exception to make it
 * instanceof AuthServiceInputException
 */
export class ProductServiceException extends NotFoundException {
  /**
   * Used to extend another exception to make it
   * instanceof AuthServiceInputException
   */
  constructor(message: string) {
    super(message);
  }
}
