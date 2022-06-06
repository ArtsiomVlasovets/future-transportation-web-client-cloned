import { Page } from "../../models/page.model";
import { Cities } from "../../models/cities.model";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { PagingResponse } from "../../models/responses/paging.response";

@Injectable({
  providedIn: "root",
})
export class CitiesHttpService {
  constructor(private httpClient: HttpClient) {}

  getCities(pagingInfo: any, filter: any): Observable<PagingResponse<Cities>> {
    const params = {
      limit: pagingInfo.limit,
      page: pagingInfo.page,
      ...filter,
    };

    return this.httpClient.get<PagingResponse<Cities>>("catalogs/cities", {
      params,
    });
  }
}
