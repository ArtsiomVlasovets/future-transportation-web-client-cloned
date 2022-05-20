import {PagingResponse} from './paging.response';
import {Load} from '../load.model';

export interface LoadBoardInfo extends PagingResponse<Load> {
  allowedOfferCurrencies: Array<string>;
}
