export interface PagingResponse<T> {
  items: Array<T>;
  totalItems: number;
  approved?: boolean;
}
