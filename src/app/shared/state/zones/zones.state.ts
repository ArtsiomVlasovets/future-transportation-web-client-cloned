import { PagingResponse } from "./../../../core/models/responses/paging.response";
import { BasePagingState } from "./../../../core/base/base-paging-state";
import { PAGING_DEFAULT_OPTIONS } from "./../../../core/constants";
import { PagingStateModel } from "./../../../core/models/paging-state.model";
import { Zones } from "./../../../core/models/zones.model";
import { ZonesHttpService } from "./../../../core/service/http/zones-http.service";
import { Action, State, StateContext, Store } from "@ngxs/store";
import { LoadZonesAction } from "./zones.actions";
import { Injectable } from "@angular/core";
import { finalize, tap } from "rxjs/operators";

export interface ZonesStateModel extends PagingStateModel<Zones> {
  pageSubject: string;
  filter: {};
}

const initialState: ZonesStateModel = {
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

@State<ZonesStateModel>({
  name: "zones",
  defaults: initialState,
})
@Injectable()
export class ZonesState extends BasePagingState {
  constructor(
    private store: Store,
    private zonesHttpService: ZonesHttpService
  ) {
    super();
  }

  // @Action(UpdateZonesPagingAction)
  // UpdateZonesPagingAction(
  //   ctx: StateContext<ZonesStateModel>,
  //   { page }: UpdateZonesPagingAction
  // ) {
  //   ctx.patchState({
  //     pageIndex: page.pageIndex,
  //     pageSize: page.pageSize,
  //   });
  //   const carrierId: string = this.store.selectSnapshot(
  //     CurrentUserState.getUserCarrierId
  //   ) as string;
  //   ctx.dispatch(new LoadZonesAction(carrierId));
  // }

  // @Action(UpdateZonesFilterAction)
  // UpdateZonesFilterAction(
  //   ctx: StateContext<ZonesStateModel>,
  //   { filter }: any
  // ) {
  //   ctx.patchState({
  //     filter,
  //   });
  //   const carrierId: string = this.store.selectSnapshot(
  //     CurrentUserState.getUserCarrierId
  //   ) as string;
  //   ctx.dispatch(new LoadZonesAction(carrierId));
  // }

  @Action(LoadZonesAction)
  public LoadZonesAction(
    ctx: StateContext<ZonesStateModel>,
    { carrierId }: LoadZonesAction
  ) {
    const state = ctx.getState();
    ctx.patchState({ itemsLoading: true });

    const payload = {
      page: 1,
      limit: 20,
      filters: "",
    };

    return this.zonesHttpService.getZones(payload, state.filter).pipe(
      tap((response: PagingResponse<Zones>) => {
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
  //   ctx: StateContext<ZonesStateModel>,
  //   { pageSubject }: SetPageSubjectAction
  // ) {
  //   ctx.patchState({
  //     pageSubject: pageSubject,
  //   });
  // }
}
