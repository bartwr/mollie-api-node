import { Amount } from '../../../data/global';
import { CommonListParameters } from '../../../types/parameters';
import { RefundData } from '../../../data/refunds/data';

interface ContextParameters {
  orderId: string;
  testmode?: boolean;
}

export type CreateParameters = ContextParameters &
  Pick<RefundData, 'description'> & {
    lines: {
      /**
       * The API resource token of the order line, for example: `'odl_jp31jz'`.
       */
      id: string;
      /**
       * The number of items that should be refunded for this order line. When this parameter is omitted, the whole order
       * line will be refunded.
       *
       * Must be less than the number of items already refunded for this order line.
       */
      quantity?: number;
      /**
       * The amount that you want to refund. In almost all cases, Mollie can determine the amount automatically.
       *
       * The amount is required only if you are *partially* refunding an order line which has a non-zero `discountAmount`.
       *
       * The amount you can refund depends on various properties of the order line and the create order refund request.
       * The maximum that can be refunded is `unit price x quantity to ship`.
       *
       * The minimum amount depends on the discount applied to the line, the quantity already refunded or shipped, the
       * amounts already refunded or shipped and the quantity you want to refund.
       *
       * If you do not send an amount, Mollie will determine the amount automatically or respond with an error if the
       * amount cannot be determined automatically. The error will contain the `extra.minimumAmount` and
       * `extra.maximumAmount` properties that allow you pick the right amount.
       */
      amount?: Amount;
    }[];
  };

export type ListParameters = ContextParameters & CommonListParameters;
