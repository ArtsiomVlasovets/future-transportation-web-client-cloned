import { environment } from "./../../environments/environment.prod";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class HttpService {
  constructor(private httpClient: HttpClient) {}

  public fetchZones(payload: any): Observable<any> {
    return this.httpClient.get<any>(`catalogs/zones`, {
      params: {
        page: payload.page,
        limit: payload.limit,
      },
    });
  }

  // TODO remove
  // public remove(zone: any): void {
  //   const index = this.data.findIndex(
  //     ({ ProductID }) => ProductID === zone.ProductID
  //   );
  //   this.data.splice(index, 1);
  // }

  public save(
    formValue: any,
    isNew?: boolean,
    id?: string,
    version?: string
  ): Observable<any> {
    const payload = {
      item: {
        name: formValue?.name,
        id,
        version,
      },
    };

    // TODO will be replaced to one way
    if (isNew) {
      return this.httpClient.post<any>(`catalogs/zone`, { ...payload });
    } else {
      return this.httpClient.put<any>(`catalogs/zone`, { ...payload });
    }
  }
}
