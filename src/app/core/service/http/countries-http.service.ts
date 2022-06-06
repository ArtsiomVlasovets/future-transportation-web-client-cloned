import { Page } from "../../models/page.model";
import { Countries } from "../../models/countries.model";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { PagingResponse } from "../../models/responses/paging.response";

@Injectable({
  providedIn: "root",
})
export class CountriesHttpService {
  constructor(private httpClient: HttpClient) {}

  getCountries(pagingInfo: any, filter: any): Observable<PagingResponse<Countries>> {
    const params = {
      limit: pagingInfo.limit,
      page: pagingInfo.page,
      ...filter,
    };

    return this.httpClient.get<PagingResponse<Countries>>("catalogs/countries", {
      params,
    });
  }
}
