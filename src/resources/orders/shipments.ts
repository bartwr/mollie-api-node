import { get, startsWith } from 'lodash';

import Shipment from '../../models/Shipment';
import List from '../../models/List';
import ApiException from '../../exceptions/ApiException';
import OrdersBaseResource from './base';
import { ICreateParams, IGetParams, IListParams, IUpdateParams } from '../../types/shipment/params';
import {
  CreateCallback,
  GetCallback,
  ListCallback,
  UpdateCallback,
} from '../../types/shipment/callback';
import Order from '../../models/Order';
import Resource from '../../resource';

/**
 * The `order_shipments` resource
 *
 * @since 2.2.0
 */
export default class OrdersShipmentsResource extends OrdersBaseResource {
  public resource = 'orders_shipments';
  public model = Shipment;
  public apiName = 'Shipments API';

  /**
   * In addition to the
   * {@link https://docs.mollie.com/reference/v2/orders-api/create-order Orders API},
   * the create shipment endpoint can be used to ship order lines.
   *
   * When using Klarna Pay later and Klarna Slice it this is mandatory
   * for the order amount to be captured. An capture will automatically
   * be created for the shipment.
   *
   * The word “shipping” is used in the figurative sense here. It can also
   * mean that a service was provided or digital content was delivered.
   *
   * @param params - Create Shipment parameters
   * @param cb - Callback function, can be used instead of the returned `Promise` object
   *
   * @returns The newly created Shipment object
   *
   * @since 2.2.0
   *
   * @see https://docs.mollie.com/reference/v2/shipments-api/create-shipment
   * @public
   */
  public async create(params: ICreateParams, cb?: CreateCallback): Promise<Shipment> {
    const { orderId, ...parameters } = params;
    if (!startsWith(orderId, Order.resourcePrefix)) {
      Resource.errorHandler(
        Resource.errorHandler({ error: { message: 'The order id is invalid' } }, cb),
      );
    }
    this.setParentId(orderId);

    return super.create(parameters, cb) as Promise<Shipment>;
  }

  /**
   * Update a Shipment
   *
   * @param id - Shipment ID
   * @param params - Update Shipment parameters
   * @param cb - Callback function, can be used instead of the returned `Promise` object
   *
   * @returns {Promise<Shipment>}
   *
   * @since 2.2.0
   *
   * @see https://docs.mollie.com/reference/v2/shipments-api/update-shipment
   * @public ✓ This method is part of the public API
   */
  public async update(id: string, params: IUpdateParams, cb?: UpdateCallback): Promise<Shipment> {
    const { orderId, ...parameters } = params;
    if (!startsWith(id, Shipment.resourcePrefix)) {
      Resource.errorHandler(
        Resource.errorHandler({ error: { message: 'The shipment id is invalid' } }, cb),
      );
    }
    if (!startsWith(orderId, Order.resourcePrefix)) {
      Resource.errorHandler(
        Resource.errorHandler({ error: { message: 'The order id is invalid' } }, cb),
      );
    }
    this.setParentId(orderId);

    return super.update(id, parameters, cb) as Promise<Shipment>;
  }

  /**
   * Get a Shipment by ID
   *
   * @param id - Shipment ID
   * @param params - Get Shipment parameters
   * @param cb - Callback function, can be used instead of the returned `Promise` object
   *
   * @returns The Shipment object
   *
   * @since 2.2.0
   *
   * @see https://docs.mollie.com/reference/v2/shipments-api/get-shipment
   * @public ✓ This method is part of the public API
   */
  public async get(id: string, params?: IGetParams, cb?: GetCallback): Promise<Shipment> {
    // Using callbacks (DEPRECATED SINCE 2.2.0)
    if (typeof params === 'function' || typeof cb === 'function') {
      const orderId = get(params, 'orderId') || this.parentId;
      if (!startsWith(orderId, Order.resourcePrefix)) {
        Resource.errorHandler(
          Resource.errorHandler({ error: { message: 'The order id is invalid' } }, cb),
        );
      }

      return super.get(
        id,
        typeof params === 'function' ? null : params,
        typeof params === 'function' ? params : cb,
      ) as Promise<Shipment>;
    }

    const { orderId, ...parameters } = params;
    if (!startsWith(orderId, Order.resourcePrefix)) {
      Resource.errorHandler(
        Resource.errorHandler({ error: { message: 'The order id is invalid' } }, cb),
      );
    }
    this.setParentId(orderId);

    return super.get(id, parameters, cb) as Promise<Shipment>;
  }

  /**
   * List order shipments
   *
   * @param params - List Order parameters
   * @param cb - Callback function, can be used instead of the returned `Promise` object
   *
   * @returns A list of found Shipments
   *
   * @since 2.2.0
   *
   * @see https://docs.mollie.com/reference/v2/shipments-api/list-shipments
   * @public
   */
  public async list(params?: IListParams, cb?: ListCallback): Promise<List<Shipment>> {
    const { orderId, ...parameters } = params;
    if (!startsWith(orderId, Order.resourcePrefix)) {
      Resource.errorHandler(
        Resource.errorHandler({ error: { message: 'The order id is invalid' } }, cb),
      );
    }
    this.setParentId(orderId);

    return super.list(parameters, cb) as Promise<List<Shipment>>;
  }

  // NOT AVAILABLE

  /**
   * @deprecated This method is not available
   */
  public async cancel(): Promise<boolean> {
    throw new ApiException(`The method "cancel" does not exist on the "${this.apiName}"`);
  }

  /**
   * @deprecated This method is not available
   */
  public async delete(): Promise<boolean> {
    throw new ApiException(`The method "delete" does not exist on the "${this.apiName}"`);
  }
}
