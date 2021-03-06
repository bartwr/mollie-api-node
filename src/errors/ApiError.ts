import { MollieApiErrorLinks, Url } from '../data/global';
import { AxiosResponse } from 'axios';
import { cloneDeep, get, has } from 'lodash';
import Maybe from '../types/Maybe';

/**
 * @since 3.0.0
 */
export default class ApiError extends Error {
  public constructor(message: string, protected title?: string, protected status?: number, protected field?: string, protected links?: MollieApiErrorLinks) {
    super(message);
    this.name = 'ApiError';
  }

  /**
   * Get the error message
   *
   * @returns The error message
   *
   * @since 3.0.0
   *
   * @public ✓ This method is part of the public API
   */
  public getMessage(): string {
    return this.message;
  }

  /**
   * Get the field name that contains an error
   *
   * @returns The error field
   *
   * @since 3.0.0
   *
   * @public ✓ This method is part of the public API
   */
  public getField(): Maybe<string> {
    return this.field;
  }

  /**
   * Get the API status code
   *
   * @returns The status code
   *
   * @since 3.0.0
   *
   * @public ✓ This method is part of the public API
   */
  public getStatusCode(): Maybe<number> {
    return this.status;
  }

  /**
   * Get the documentation URL
   *
   * @returns The documentation URL
   *
   * @since 3.0.0
   *
   * @public ✓ This method is part of the public API
   */
  public getDocumentationUrl(): string {
    return this.getUrl('documentation');
  }

  /**
   * Get the dashboard URL
   *
   * @returns The dashboard URL
   *
   * @since 3.0.0
   *
   * @public ✓ This method is part of the public API
   */
  public getDashboardUrl(): string {
    return this.getUrl('dashboard');
  }

  /**
   * Check if the link exists
   *
   * @param key - Link name
   *
   * @returns Whether the link exists
   *
   * @since 3.0.0
   *
   * @public ✓ This method is part of the public API
   */
  public hasLink(key: string): boolean {
    return has(this.links, key);
  }

  /***
   * Retrieve a link by name
   *
   * @param key - The link name
   *
   * @returns A link to the resource
   *
   * @since 3.0.0
   *
   * @public ✓ This method is part of the public API
   */
  public getLink(key: string): Url {
    return get(this.links, key);
  }

  /**
   *
   * @param {string} key
   *
   * @returns {string}
   *
   * @since 3.0.0
   *
   * @public ✓ This method is part of the public API
   */
  public getUrl(key: string): string {
    return get(this.getLink(key), 'href');
  }

  public toString(): string {
    return `ApiError: ${this.message}`;
  }

  /**
   * Creates and returns an `ApiError` from the passed response.
   *
   * @returns A new `ApiError`
   *
   * @since 3.0.0
   */
  public static createFromResponse(response: AxiosResponse): ApiError {
    return new ApiError(
      get(response, 'data.detail', 'Received an error without a message'),
      get(response, 'data.title'),
      get(response, 'data.status'),
      get(response, 'data.field'),
      cloneDeep(get(response, 'data._links')),
    );
  }
}
