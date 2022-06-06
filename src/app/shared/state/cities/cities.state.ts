import { PagingResponse } from "../../../core/models/responses/paging.response";
import { BasePagingState } from "../../../core/base/base-paging-state";
import { PAGING_DEFAULT_OPTIONS } from "../../../core/constants";
import { PagingStateModel } from "../../../core/models/paging-state.model";
import { Cities } from "../../../core/models/cities.model";
import { CitiesHttpService } from "../../../core/service/http/cities-http.service";
import { Action, State, StateContext, Store } from "@ngxs/store";
import { LoadCitiesAction } from "./cities.actions";
import { Injectable } from "@angular/core";
import { finalize, tap } from "rxjs/operators";

export interface CitiesStateModel extends PagingStateModel<Cities> {
  pageSubject: string;
  filter: {};
}

const initialState: CitiesStateModel = {
  items: [],
  itemsTotal: 0,
  approved: false,
  pageSize: PAGING_DEFAULT_OPTIONS.DefaultPageSize,
  pageIndex: 0,
  itemsLoading: false,
  itemsLoaded: false,
  pageSubject: "",
  filter: {},
};

@State<CitiesStateModel>({
  name: "cities",
  defaults: initialState,
})
@Injectable()
export class CitiesState extends BasePagingState {
  constructor(
    private store: Store,
    private citiesHttpService: CitiesHttpService
  ) {
    super();
  }

  // @Action(UpdateCitiesPagingAction)
  // UpdateCitiesPagingAction(
  //   ctx: StateContext<CitiesStateModel>,
  //   { page }: UpdateCitiesPagingAction
  // ) {
  //   ctx.patchState({
  //     pageIndex: page.pageIndex,
  //     pageSize: page.pageSize,
  //   });
  //   const carrierId: string = this.store.selectSnapshot(
  //     CurrentUserState.getUserCarrierId
  //   ) as string;
  //   ctx.dispatch(new LoadCitiesAction(carrierId));
  // }

  // @Action(UpdateCitiesFilterAction)
  // UpdateCitiesFilterAction(
  //   ctx: StateContext<CitiesStateModel>,
  //   { filter }: any
  // ) {
  //   ctx.patchState({
  //     filter,
  //   });
  //   const carrierId: string = this.store.selectSnapshot(
  //     CurrentUserState.getUserCarrierId
  //   ) as string;
  //   ctx.dispatch(new LoadCitiesAction(carrierId));
  // }

  @Action(LoadCitiesAction)
  public LoadCitiesAction(
    ctx: StateContext<CitiesStateModel>,
    { carrierId }: LoadCitiesAction
  ) {
    const state = ctx.getState();
    ctx.patchState({ itemsLoading: true });

    const payload = {
      page: 1,
      limit: 20,
      filters: "",
    };

    return this.citiesHttpService.getCities(payload, state.filter).pipe(
      tap((response: PagingResponse<Cities>) => {
        ctx.patchState({
          items: response.items,
          itemsTotal: response.totalItems,
          approved: response.approved,
        });
      }),
      finalize(() =>
        ctx.patchState({
          itemsLoaded: true,
          itemsLoading: false,
        })
      )
    );
  }

  // @Action(SetPageSubjectAction)
  // setPageSubjectAction(
  //   ctx: StateContext<CitiesStateModel>,
  //   { pageSubject }: SetPageSubjectAction
  // ) {
  //   ctx.patchState({
  //     pageSubject: pageSubject,
  //   });
  // }
}
