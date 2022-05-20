export interface PagingStateModel<T = object> {
  items: Array<T>;
  itemsTotal: number;
  approved?: boolean;
  pageSize: number;
  pageIndex: number;
  itemsLoading: boolean;
  itemsLoaded: boolean; // first content load
}
