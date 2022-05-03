import { environment } from "./../../environments/environment.prod";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class HttpService {
  constructor(private httpClient: HttpClient) {}

  fetchZones(payload: any): Observable<any> {
    return this.httpClient.get<any>(`catalogs/zones`, {
      params: {
        page: payload.page,
        limit: payload.limit,
        // filters: payload.filters,
      },
    });
  }
}
