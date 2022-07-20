import { PagingResponse } from "../../../core/models/responses/paging.response";
import { BasePagingState } from "../../../core/base/base-paging-state";
import { PAGING_DEFAULT_OPTIONS } from "../../../core/constants";
import { PagingStateModel } from "../../../core/models/paging-state.model";
import { Countries } from "../../../core/models/countries.model";
import { CountriesHttpService } from "../../../core/service/http/countries-http.service";
import { Action, State, StateContext, Store } from "@ngxs/store";
import { LoadCountriesAction } from "./states.actions";
import { Injectable } from "@angular/core";
import { finalize, tap } from "rxjs/operators";

export interface CountriesStateModel extends PagingStateModel<Countries> {
  pageSubject: string;
  filter: {};
}

const initialState: CountriesStateModel = {
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

@State<CountriesStateModel>({
  name: "countries",
  defaults: initialState,
})
@Injectable()
export class CountriesState extends BasePagingState {
  constructor(
    private store: Store,
    private countriesHttpService: CountriesHttpService
  ) {
    super();
  }

  // @Action(UpdateCountriesPagingAction)
  // UpdateCountriesPagingAction(
  //   ctx: StateContext<CountriesStateModel>,
  //   { page }: UpdateCountriesPagingAction
  // ) {
  //   ctx.patchState({
  //     pageIndex: page.pageIndex,
  //     pageSize: page.pageSize,
  //   });
  //   const carrierId: string = this.store.selectSnapshot(
  //     CurrentUserState.getUserCarrierId
  //   ) as string;
  //   ctx.dispatch(new LoadCountriesAction(carrierId));
  // }

  // @Action(UpdateCountriesFilterAction)
  // UpdateCountriesFilterAction(
  //   ctx: StateContext<CountriesStateModel>,
  //   { filter }: any
  // ) {
  //   ctx.patchState({
  //     filter,
  //   });
  //   const carrierId: string = this.store.selectSnapshot(
  //     CurrentUserState.getUserCarrierId
  //   ) as string;
  //   ctx.dispatch(new LoadCountriesAction(carrierId));
  // }

  @Action(LoadCountriesAction)
  public LoadCountriesAction(
    ctx: StateContext<CountriesStateModel>,
    { carrierId }: LoadCountriesAction
  ) {
    const state = ctx.getState();
    ctx.patchState({ itemsLoading: true });

    const payload = {
      page: 1,
      limit: 20,
      filters: "",
    };

    return this.countriesHttpService.getCountries(payload, state.filter).pipe(
      tap((response: PagingResponse<Countries>) => {
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
  //   ctx: StateContext<CountriesStateModel>,
  //   { pageSubject }: SetPageSubjectAction
  // ) {
  //   ctx.patchState({
  //     pageSubject: pageSubject,
  //   });
  // }
}
