import { Page } from "./../../models/page.model";
import { Zones } from "./../../models/zones.model";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { PagingResponse } from "../../models/responses/paging.response";

@Injectable({
  providedIn: "root",
})
export class ZonesHttpService {
  constructor(private httpClient: HttpClient) {}

  getZones(pagingInfo: any, filter: any): Observable<PagingResponse<Zones>> {
    const params = {
      limit: pagingInfo.limit,
      page: pagingInfo.page,
      ...filter,
    };

    return this.httpClient.get<PagingResponse<Zones>>("catalogs/zones", {
      params,
    });
  }
}
