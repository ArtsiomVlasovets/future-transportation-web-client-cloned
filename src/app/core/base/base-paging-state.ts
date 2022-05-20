import { createSelector } from "@ngxs/store";
import { PagingStateModel } from "../models/paging-state.model";

export class BasePagingState {
  static getItems<T>() {
    return createSelector([this], (state: PagingStateModel<T>) => {
      return state.items;
    });
  }

  static getItemsTotal() {
    return createSelector([this], (state: PagingStateModel) => {
      return state.itemsTotal;
    });
  }

  static getPageSize() {
    return createSelector([this], (state: PagingStateModel) => {
      return state.pageSize;
    });
  }

  static getPageIndex() {
    return createSelector([this], (state: PagingStateModel) => {
      return state.pageIndex;
    });
  }

  static getItemsLoading() {
    return createSelector([this], (state: PagingStateModel) => {
      return state.itemsLoading;
    });
  }

  static getItemsLoaded() {
    return createSelector([this], (state: PagingStateModel) => {
      return state.itemsLoaded;
    });
  }

  static getIsApproved() {
    return createSelector([this], (state: PagingStateModel) => {
      return state.approved as boolean;
    });
  }
}
